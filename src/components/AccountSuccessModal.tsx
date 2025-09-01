import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

interface AccountSuccessModalProps {
  open: boolean;
  onClose: () => void;
  userEmail?: string;
  onStartSelling: () => void;
  onContinueBrowsing: () => void;
}

const AccountSuccessModal = ({
  open,
  onClose,
  userEmail,
  onStartSelling,
  onContinueBrowsing
}: AccountSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 border-0 bg-transparent overflow-hidden">
        <div className="relative bg-gradient-dark-glass backdrop-blur-xl border border-glass-border rounded-2xl p-8 animate-scale-in">
          {/* Background glow effects */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
          
          {/* Success icon with neon glow */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon-intense animate-glow-pulse">
                <Sparkles className="w-10 h-10 text-surface-darker" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome to the Future! 🚀
            </h2>
            <p className="text-muted-foreground text-lg">
              Your account is ready, {userEmail?.split('@')[0]}
            </p>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-foreground/80 text-lg leading-relaxed">
              Choose your path in our digital marketplace ecosystem
            </p>
          </div>

          {/* Action cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Start Selling Card */}
            <div 
              className="group relative overflow-hidden rounded-xl bg-gradient-shop-card border border-neon-primary/20 p-6 cursor-pointer transition-all duration-500 hover:shadow-neon hover:scale-105 hover:border-neon-primary/40"
              onClick={onStartSelling}
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-neon-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-neon-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-primary/30 transition-colors">
                  <Store className="w-8 h-8 text-neon-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-primary transition-colors">
                  Start Selling
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Launch your digital storefront and join thousands of successful merchants
                </p>
                <div className="flex items-center text-neon-primary group-hover:gap-3 gap-2 transition-all">
                  <span className="text-sm font-semibold">Begin Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Continue Browsing Card */}
            <div 
              className="group relative overflow-hidden rounded-xl bg-gradient-shop-card border border-neon-cyan/20 p-6 cursor-pointer transition-all duration-500 hover:shadow-neon-accent hover:scale-105 hover:border-neon-cyan/40"
              onClick={onContinueBrowsing}
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-accent to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-neon-cyan/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-cyan/30 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-neon-cyan" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-cyan transition-colors">
                  Explore Products
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Discover amazing products from verified sellers worldwide
                </p>
                <div className="flex items-center text-neon-cyan group-hover:gap-3 gap-2 transition-all">
                  <span className="text-sm font-semibold">Start Shopping</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Skip option */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onContinueBrowsing}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              I'll decide later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSuccessModal;