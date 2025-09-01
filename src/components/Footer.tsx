import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-surface-darker border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
              NeoMart
            </h3>
            <p className="text-muted-foreground">
              Your trusted global marketplace connecting businesses with customers worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-neon-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-neon-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-neon-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-neon-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* For Buyers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">For Buyers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-neon-primary transition-colors">Browse Products</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Best Deals</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Track Orders</a></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">For Sellers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-neon-primary transition-colors">Start Selling</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Seller Center</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Fee Structure</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Seller Tools</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Performance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-neon-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-neon-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 NeoMart. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-neon-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-primary text-sm transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-primary text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;