import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Seller = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Start Selling on <span className="bg-gradient-hero bg-clip-text text-transparent">NeoMart</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of sellers reaching millions of customers worldwide. 
              Build your business with our powerful e-commerce platform.
            </p>
            <Button size="lg" className="bg-neon-primary hover:bg-neon-primary/80">
              Start Selling Today
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-surface-dark/50 border-glass-border">
              <CardHeader>
                <Store className="w-8 h-8 text-neon-primary mb-2" />
                <CardTitle>Your Online Store</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create a beautiful storefront with customizable themes and layouts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark/50 border-glass-border">
              <CardHeader>
                <Package className="w-8 h-8 text-neon-accent mb-2" />
                <CardTitle>Easy Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage your products, pricing, and inventory with our intuitive tools
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface-dark/50 border-glass-border">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-neon-primary mb-2" />
                <CardTitle>Analytics & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your sales, understand your customers, and grow your business
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sign Up Form */}
          <Card className="max-w-md mx-auto bg-surface-dark/50 border-glass-border">
            <CardHeader>
              <CardTitle className="text-center">Get Started as a Seller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Business Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              <Button className="w-full bg-neon-primary hover:bg-neon-primary/80">
                Create Seller Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Seller;