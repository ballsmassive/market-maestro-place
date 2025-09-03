import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Upload, Store, Mail, User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    contactPerson: "",
    logo: null as File | null,
    agreeTerms: false,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      toast.success("Logo uploaded successfully!");
    }
  };

  const sendVerificationEmail = async () => {
    if (!formData.businessEmail) {
      toast.error("Please enter your business email");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('email-otp', {
        body: {
          email: formData.businessEmail,
          action: 'send'
        }
      });

      if (error) {
        console.error('Error sending verification:', error);
        toast.error("Failed to send verification code. Please try again.");
        return;
      }

      if (data?.success) {
        toast.success("Verification code sent to your email!");
        setShowVerification(true);
      } else {
        toast.error(data?.message || "Failed to send verification code");
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async () => {
    if (!verificationCode) {
      toast.error("Please enter verification code");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('email-otp', {
        body: {
          email: formData.businessEmail,
          action: 'verify',
          code: verificationCode
        }
      });

      if (error) {
        console.error('Error verifying code:', error);
        toast.error("Failed to verify code. Please try again.");
        return;
      }

      if (data?.success) {
        toast.success("Email verified successfully!");
        navigate("/seller/dashboard");
      } else {
        toast.error(data?.message || "Invalid verification code");
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.businessEmail || !formData.contactPerson) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    sendVerificationEmail();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join <span className="bg-gradient-hero bg-clip-text text-transparent">NeoMart</span> as a Seller
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your journey with us and reach millions of customers worldwide
            </p>
          </div>

          {!showVerification ? (
            /* Registration Form */
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Store className="w-6 h-6 text-primary" />
                  Business Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Business Name *
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    {/* Contact Person */}
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Contact Person *
                      </Label>
                      <Input
                        id="contactPerson"
                        placeholder="Your full name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Business Email Address *
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="business@company.com"
                      value={formData.businessEmail}
                      onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-sm text-muted-foreground">
                      We'll send a verification code to this email address
                    </p>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Business Logo
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {formData.logo ? formData.logo.name : "Click to upload your business logo"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <span className="text-primary hover:underline cursor-pointer">
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline cursor-pointer">
                        Privacy Policy
                      </span>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Register & Verify Email"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Email Verification */
            <Card className="max-w-md mx-auto bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center">
                  <ShieldCheck className="w-6 h-6 text-primary mx-auto" />
                  Verify Your Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  We've sent a verification code to{" "}
                  <span className="font-medium text-foreground">{formData.businessEmail}</span>
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button 
                  onClick={verifyEmail}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={sendVerificationEmail}
                  className="w-full"
                  disabled={isLoading}
                >
                  Resend Code
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerRegister;