import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  action: "send" | "verify";
  code?: string;
}

interface SendOTPResponse {
  success: boolean;
  message: string;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { email, action, code }: SendOTPRequest = await req.json();

    console.log(`Email OTP request: ${action} for ${email}`);

    if (action === "send") {
      // Clean up expired verifications first
      await supabase
        .from("email_verifications")
        .update({ status: "expired" })
        .lt("expires_at", new Date().toISOString())
        .eq("status", "pending");

      // Generate 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store verification code in database (expires in 10 minutes)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      
      const { error: dbError } = await supabase
        .from("email_verifications")
        .insert({
          email,
          code: verificationCode,
          expires_at: expiresAt,
          status: "pending"
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to store verification code");
      }

      // Send email using Resend
      const emailResponse = await resend.emails.send({
        from: "NeoMart <onboarding@resend.dev>",
        to: [email],
        subject: "Verify Your Email - NeoMart Seller Registration",
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #333; text-align: center;">Welcome to NeoMart!</h1>
            <p style="font-size: 16px; color: #666; text-align: center;">
              Please use the following verification code to complete your seller registration:
            </p>
            <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h2 style="font-size: 32px; font-weight: bold; letter-spacing: 4px; margin: 0; color: #333;">
                ${verificationCode}
              </h2>
            </div>
            <p style="color: #999; font-size: 14px; text-align: center;">
              This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
        `,
      });

      console.log("Email sent successfully:", emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Verification code sent successfully" 
        } as SendOTPResponse),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );

    } else if (action === "verify") {
      if (!code) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Verification code is required" 
          } as SendOTPResponse),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Find valid verification code
      const { data: verification, error: findError } = await supabase
        .from("email_verifications")
        .select("*")
        .eq("email", email)
        .eq("code", code)
        .eq("status", "pending")
        .gt("expires_at", new Date().toISOString())
        .single();

      if (findError || !verification) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Invalid or expired verification code" 
          } as SendOTPResponse),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Mark verification as completed
      const { error: updateError } = await supabase
        .from("email_verifications")
        .update({ status: "verified" })
        .eq("id", verification.id);

      if (updateError) {
        console.error("Update error:", updateError);
        throw new Error("Failed to update verification status");
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email verified successfully" 
        } as SendOTPResponse),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Invalid action" 
      } as SendOTPResponse),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in email-otp function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "Internal server error" 
      } as SendOTPResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);