import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail, Chrome } from 'lucide-react';

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'method' | 'email' | 'phone-verify' | 'complete'>('method');
  const [authMethod, setAuthMethod] = useState<'email' | 'google'>('email');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  
  useEffect(() => {
    if (user && authStep === 'complete') {
      navigate('/');
    }
    // Handle Google OAuth redirect - if user is authenticated but still on method step, move to phone verification
    if (user && authStep === 'method') {
      setUserProfile(user);
      setAuthStep('phone-verify');
      toast({
        title: "Google Sign In Successful!",
        description: "Now please verify your phone number.",
      });
    }
  }, [user, navigate, authStep]);

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/auth`;
      
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          }
        });
        if (error) throw error;
        
        if (data.user) {
          setUserProfile(data.user);
          setAuthStep('phone-verify');
          toast({
            title: "Account created!",
            description: "Now please verify your phone number.",
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.user) {
          setUserProfile(data.user);
          setAuthStep('phone-verify');
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      if (error) {
        if (error.message.includes('provider is not enabled')) {
          toast({
            title: "Google Sign In Not Available",
            description: "Google authentication needs to be configured in Supabase. Please contact support or use email authentication.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      toast({
        title: "Google Sign In Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerification = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      if (error) throw error;
      toast({
        title: "SMS sent",
        description: "Check your phone for the verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Phone Verification Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: verificationCode,
        type: 'sms'
      });
      if (error) throw error;
      
      setAuthStep('complete');
      toast({
        title: "Phone verified!",
        description: "Welcome to Neo Mart!",
      });
      
      // Small delay before redirect
      setTimeout(() => navigate('/'), 1000);
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Choose authentication method
  if (authStep === 'method') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
              Welcome to Neo Mart
            </CardTitle>
            <CardDescription>
              Choose how you'd like to sign in or create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  setAuthMethod('email');
                  setAuthStep('email');
                }}
                className="w-full"
                variant="outline"
              >
                <Mail className="w-4 h-4 mr-2" />
                Continue with Email
              </Button>
              <Button 
                onClick={() => {
                  setAuthMethod('google');
                  handleGoogleAuth();
                }}
                className="w-full"
                variant="outline"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Email authentication (if email method chosen)
  if (authStep === 'email') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription>
              Enter your email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
              />
            </div>
            <Button 
              onClick={handleEmailAuth} 
              disabled={loading || !email || !password}
              className="w-full"
            >
              {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setAuthStep('method')}
              className="w-full"
            >
              Back to Methods
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Phone verification
  if (authStep === 'phone-verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
              Verify Your Phone
            </CardTitle>
            <CardDescription>
              {verificationCode ? 'Enter the verification code sent to your phone' : 'Enter your phone number to receive a verification code'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!verificationCode ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
                <Button 
                  onClick={handlePhoneVerification} 
                  disabled={loading || !phone}
                  className="w-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </Button>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={loading || verificationCode.length !== 6}
                  className="w-full"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setVerificationCode('')}
                  className="w-full"
                >
                  Change Phone Number
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
            Loading...
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}