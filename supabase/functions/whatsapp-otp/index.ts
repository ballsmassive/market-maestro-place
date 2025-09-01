import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WhatsAppSendRequest {
  phone: string
  message: string
}

interface WhatsAppVerifyRequest {
  phone: string
  code: string
}

interface WhatsAppSendResponse {
  sent: boolean
  expires_in_seconds: number
}

interface WhatsAppVerifyResponse {
  verified: boolean
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Invalid or expired token')
    }

    const { action, phone, code, message } = await req.json()

    const whatsappApiUrl = Deno.env.get('WHATSAPP_API_BASE_URL')
    const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY')

    if (!whatsappApiUrl || !whatsappApiKey) {
      throw new Error('WhatsApp API configuration missing')
    }

    console.log(`WhatsApp OTP ${action} request for user ${user.id}, phone: ${phone}`)

    if (action === 'send') {
      // Clean up expired verifications first
      await supabase.rpc('cleanup_expired_verifications')

      // Check rate limiting - max 3 attempts per 10 minutes
      const { data: recentAttempts } = await supabase
        .from('phone_verifications')
        .select('id')
        .eq('user_id', user.id)
        .eq('phone_number', phone)
        .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString())
        .limit(3)

      if (recentAttempts && recentAttempts.length >= 3) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'rate_limited',
            message: 'Too many attempts. Please wait 10 minutes before trying again.'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Call WhatsApp API to send OTP
      const whatsappResponse = await fetch(`${whatsappApiUrl}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': whatsappApiKey,
        },
        body: JSON.stringify({
          phone,
          message: message || `Your verification code from Neo Mart: Please verify your account.`
        } as WhatsAppSendRequest)
      })

      if (!whatsappResponse.ok) {
        const errorText = await whatsappResponse.text()
        console.error('WhatsApp API error:', errorText)
        throw new Error(`WhatsApp API error: ${whatsappResponse.status}`)
      }

      const whatsappData: WhatsAppSendResponse = await whatsappResponse.json()

      if (!whatsappData.sent) {
        throw new Error('Failed to send WhatsApp message')
      }

      // Store verification record in database
      const { error: insertError } = await supabase
        .from('phone_verifications')
        .insert({
          user_id: user.id,
          phone_number: phone,
          status: 'pending',
          attempts: 1,
          expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
        })

      if (insertError) {
        console.error('Database insert error:', insertError)
        throw new Error('Failed to store verification record')
      }

      console.log(`WhatsApp OTP sent successfully to ${phone}`)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Verification code sent via WhatsApp',
          expires_in_seconds: 300
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } else if (action === 'verify') {
      // Call WhatsApp API to verify OTP
      const whatsappResponse = await fetch(`${whatsappApiUrl}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': whatsappApiKey,
        },
        body: JSON.stringify({
          phone,
          code
        } as WhatsAppVerifyRequest)
      })

      const whatsappData: WhatsAppVerifyResponse = await whatsappResponse.json()

      // Update verification record
      if (whatsappData.verified) {
        // Mark as verified
        const { error: updateError } = await supabase
          .from('phone_verifications')
          .update({
            status: 'verified',
            verified_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('phone_number', phone)
          .eq('status', 'pending')

        if (updateError) {
          console.error('Database update error:', updateError)
        }

        // Update user profile to mark phone as verified
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone_number: phone,
            phone_verified: true
          })
          .eq('user_id', user.id)

        if (profileError) {
          console.error('Profile update error:', profileError)
        }

        console.log(`Phone ${phone} verified successfully for user ${user.id}`)

        return new Response(
          JSON.stringify({ 
            success: true, 
            verified: true,
            message: 'Phone number verified successfully!'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else {
        // Mark attempt as failed
        const { error: updateError } = await supabase
          .from('phone_verifications')
          .update({ 
            attempts: supabase.sql`attempts + 1`,
            status: 'failed'
          })
          .eq('user_id', user.id)
          .eq('phone_number', phone)
          .eq('status', 'pending')

        if (updateError) {
          console.error('Database update error:', updateError)
        }

        return new Response(
          JSON.stringify({ 
            success: false, 
            verified: false,
            error: 'invalid_code',
            message: 'Invalid verification code. Please try again.'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

    } else {
      throw new Error('Invalid action. Use "send" or "verify"')
    }

  } catch (error) {
    console.error('WhatsApp OTP error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'server_error',
        message: error.message || 'An unexpected error occurred'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})