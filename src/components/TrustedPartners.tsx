import { Shield, Verified } from "lucide-react";

const TrustedPartners = () => {
  // Get brand logos from actual companies in the system
  const partners = [
    {
      name: "Alibaba Electronics",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "Conta Tech",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "ViewMax Pro",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "KeyCraft",
      logo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "SoundWave Audio",
      logo: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "StyleMax",
      logo: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "FashionHub",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "TimeElite",
      logo: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "VisionCraft",
      logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "LuxeBags Co",
      logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "BrewMaster",
      logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center"
    },
    {
      name: "CleanAir Pro",
      logo: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=100&h=100&fit=crop&crop=center"
    }
  ];

  // Triple for continuous seamless scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-trust-dark border-t border-glass-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <div className="p-2 sm:p-3 rounded-full bg-neon-primary/10 border border-neon-primary/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neon-primary animate-glow-pulse" />
            </div>
            <Verified className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neon-accent animate-neon-pulse" />
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
            Trusted by Leading Organizations
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our platform is the preferred choice for innovative companies and established enterprises worldwide
          </p>
        </div>

        {/* Sliding Logos Container */}
        <div className="relative w-full">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-r from-surface-darker to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-l from-surface-darker to-transparent z-10"></div>
          
          {/* Sliding logos track */}
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-16 animate-slide-logos">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative">
                  {/* Neon border container */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full sm:rounded-xl p-0.5 bg-gradient-neon-border group-hover:animate-glow-pulse transition-all duration-300">
                    <div className="w-full h-full rounded-full sm:rounded-xl overflow-hidden bg-surface-dark border border-glass-border group-hover:border-neon-primary/40 transition-all duration-300">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full sm:rounded-xl bg-neon-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                </div>
                
                {/* Company name - hidden on mobile, visible on larger screens */}
                <p className="hidden sm:block text-xs md:text-sm text-center mt-2 md:mt-3 text-muted-foreground group-hover:text-neon-primary transition-colors duration-300">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mt-8 sm:mt-12 md:mt-16">
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-neon-accent animate-neon-pulse"></div>
            <span>500+ Verified Partners</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-neon-primary animate-neon-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Global Enterprise Solutions</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-neon-purple animate-neon-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Secure & Reliable Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;