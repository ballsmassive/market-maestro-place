import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

const Hero = () => {
  const [currentPhase, setCurrentPhase] = useState<'splash' | 'slideshow'>('splash');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showKnowMore, setShowKnowMore] = useState(false);

  // Sample product data with brand info
  const products = [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      brand: "TechFlow",
      brandLogo: "🎮",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center",
      rating: 4.8
    },
    {
      id: 2,
      name: "Premium Headphones",
      brand: "SoundWave",
      brandLogo: "🎧", 
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
      rating: 4.9
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      brand: "FitTech",
      brandLogo: "⌚",
      discount: "20% OFF", 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
      rating: 4.7
    },
    {
      id: 4,
      name: "Professional Camera",
      brand: "LensMax",
      brandLogo: "📷",
      discount: "15% OFF",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&crop=center", 
      rating: 4.6
    }
  ];

  const brands = ["TechFlow", "SoundWave", "FitTech", "LensMax", "StyleCraft", "HomeEssentials"];

  useEffect(() => {
    // Switch to slideshow after splash
    const splashTimer = setTimeout(() => {
      setCurrentPhase('slideshow');
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (currentPhase === 'slideshow') {
      const slideTimer = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % products.length);
      }, 4000);

      return () => clearInterval(slideTimer);
    }
  }, [currentPhase, products.length]);

  const currentProduct = products[currentProductIndex];

  const handleKnowMoreClick = () => {
    // Navigate to brand shop - placeholder for now
    console.log(`Navigating to ${currentProduct.brand} shop`);
  };

  if (currentPhase === 'splash') {
    return (
      <section className="relative h-screen bg-gradient-hero overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-neon-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative text-center z-10">
          <div className="animate-splash-text">
            <Sparkles className="h-16 w-16 text-neon-primary mx-auto mb-6 animate-neon-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
                Neo Mart
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-8">
              Your Gateway to Premium Brands
            </p>
          </div>

          {/* Brand logos cascade */}
          <div className="flex justify-center gap-8 mt-12">
            {brands.map((brand, index) => (
              <div
                key={brand}
                className="animate-brand-cascade bg-glass-bg border border-glass-border rounded-xl px-6 py-3 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="text-primary-foreground font-semibold">{brand}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-primary-foreground/80 animate-brand-cascade" style={{ animationDelay: '1.5s' }}>
            Trusted by millions worldwide
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-screen bg-gradient-hero overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setShowKnowMore(true)}
      onMouseLeave={() => setShowKnowMore(false)}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Product slideshow */}
      <div className="relative w-full max-w-4xl mx-auto px-4 animate-product-slide-in">
        <div className="relative bg-glass-bg/20 backdrop-blur-xl border border-glass-border rounded-3xl p-8 shadow-neon">
          
          {/* Product Image */}
          <div className="relative mb-6 group">
            <img 
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-80 object-cover rounded-2xl shadow-elegant transform transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-gradient-neon px-4 py-2 rounded-full shadow-neon-intense animate-glow-pulse">
              <span className="text-black font-bold text-lg">{currentProduct.discount}</span>
            </div>

            {/* Know More Button (on hover) */}
            {showKnowMore && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center animate-fade-in">
                <Button 
                  onClick={handleKnowMoreClick}
                  className="bg-neon-primary hover:bg-neon-primary/80 text-black font-bold px-8 py-4 text-lg shadow-neon-intense animate-glow-pulse"
                >
                  Know More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              {currentProduct.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(currentProduct.rating) 
                      ? 'text-neon-accent fill-current' 
                      : 'text-muted-foreground'
                  }`} 
                />
              ))}
              <span className="text-primary-foreground/80 ml-2">{currentProduct.rating}</span>
            </div>
          </div>

          {/* Brand Info - Bottom Left */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-glass-bg/80 backdrop-blur-sm border border-glass-border rounded-xl px-4 py-3 shadow-neon">
            <div className="text-2xl">{currentProduct.brandLogo}</div>
            <div>
              <div className="text-sm text-primary-foreground/70">By</div>
              <div className="text-lg font-bold text-neon-primary">{currentProduct.brand}</div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProductIndex 
                    ? 'bg-neon-primary shadow-neon' 
                    : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;