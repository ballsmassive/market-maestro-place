import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail, Chrome } from 'lucide-react';

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'verify' | 'phone'>('signin');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (isSignUp: boolean) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          }
        });
        if (error) throw error;
        toast({
          title: "Check your email",
          description: "We've sent you a verification link.",
        });
        setAuthMode('verify');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google Sign In Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
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
      setAuthMode('verify');
    } catch (error: any) {
      toast({
        title: "Phone Authentication Error",
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
      navigate('/');
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

  const sendMagicLink = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
      toast({
        title: "Magic link sent",
        description: "Check your email for the sign-in link.",
      });
    } catch (error: any) {
      toast({
        title: "Magic Link Error", 
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authMode === 'verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
              Verify Your Code
            </CardTitle>
            <CardDescription>
              Enter the verification code we sent to your {phone ? 'phone' : 'email'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              onClick={phone ? handleVerifyOTP : () => {}} 
              disabled={loading || verificationCode.length !== 6}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setAuthMode('signin')}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-hero bg-clip-text text-transparent">
            Welcome to Neo Mart
          </CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
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
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                onClick={() => handleEmailAuth(false)} 
                disabled={loading || !email || !password}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button 
                variant="outline" 
                onClick={sendMagicLink}
                disabled={loading || !email}
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Magic Link
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
              </div>
              <Button 
                onClick={() => handleEmailAuth(true)} 
                disabled={loading || !email || !password}
                className="w-full"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
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
                onClick={handlePhoneAuth} 
                disabled={loading || !phone}
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                {loading ? 'Sending code...' : 'Send SMS Code'}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full mt-4"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}