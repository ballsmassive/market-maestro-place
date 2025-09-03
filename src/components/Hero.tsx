import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentPhase, setCurrentPhase] = useState<'splash' | 'slideshow'>('splash');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showKnowMore, setShowKnowMore] = useState(false);

  // Product categories with 10-minute rotation
  const productCategories = {
    tech: [
      {
        id: 1,
        name: "Wireless Gaming Mouse",
        brand: "Alibaba Electronics",
        brandLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center",
        rating: 4.8,
        brandId: "alibaba-electronics"
      },
      {
        id: 2,
        name: "Premium Laptop",
        brand: "Conta Tech",
        brandLogo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center",
        rating: 4.9,
        brandId: "conta-tech"
      },
      {
        id: 3,
        name: "4K Gaming Monitor",
        brand: "ViewMax Pro",
        brandLogo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center",
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&crop=center",
        rating: 4.7,
        brandId: "viewmax-pro"
      },
      {
        id: 4,
        name: "Mechanical Keyboard",
        brand: "KeyCraft",
        brandLogo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop&crop=center",
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center",
        rating: 4.6,
        brandId: "keycraft"
      },
      {
        id: 5,
        name: "Wireless Headphones",
        brand: "SoundWave Audio",
        brandLogo: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop&crop=center",
        discount: "35% OFF",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
        rating: 4.8,
        brandId: "soundwave-audio"
      }
    ],
    fashion: [
      {
        id: 6,
        name: "Designer Sneakers",
        brand: "StyleMax",
        brandLogo: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100&h=100&fit=crop&crop=center",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
        rating: 4.7,
        brandId: "stylemax"
      },
      {
        id: 7,
        name: "Premium Jacket",
        brand: "FashionHub",
        brandLogo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&crop=center",
        rating: 4.5,
        brandId: "fashionhub"
      },
      {
        id: 8,
        name: "Luxury Watch",
        brand: "TimeElite",
        brandLogo: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=100&h=100&fit=crop&crop=center",
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
        rating: 4.9,
        brandId: "timeelite"
      },
      {
        id: 9,
        name: "Designer Sunglasses",
        brand: "VisionCraft",
        brandLogo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=100&h=100&fit=crop&crop=center",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&crop=center",
        rating: 4.6,
        brandId: "visioncraft"
      },
      {
        id: 10,
        name: "Premium Handbag",
        brand: "LuxeBags Co",
        brandLogo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center",
        discount: "45% OFF",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop&crop=center",
        rating: 4.8,
        brandId: "luxebags-co"
      }
    ],
    home: [
      {
        id: 11,
        name: "Smart Coffee Maker",
        brand: "BrewMaster",
        brandLogo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center",
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center",
        rating: 4.7,
        brandId: "brewmaster"
      },
      {
        id: 12,
        name: "Air Purifier",
        brand: "CleanAir Pro",
        brandLogo: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=100&h=100&fit=crop&crop=center",
        discount: "35% OFF",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
        rating: 4.6,
        brandId: "cleanair-pro"
      },
      {
        id: 13,
        name: "Robot Vacuum",
        brand: "AutoClean",
        brandLogo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
        rating: 4.8,
        brandId: "autoclean"
      },
      {
        id: 14,
        name: "Smart Thermostat",
        brand: "ThermoTech",
        brandLogo: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=100&h=100&fit=crop&crop=center",
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop&crop=center",
        rating: 4.5,
        brandId: "thermotech"
      },
      {
        id: 15,
        name: "LED Smart Bulbs",
        brand: "LightWave",
        brandLogo: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=100&h=100&fit=crop&crop=center",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=300&fit=crop&crop=center",
        rating: 4.7,
        brandId: "lightwave"
      }
    ]
  };

  // Get current category based on 10-minute intervals
  const getCurrentCategory = () => {
    const categories = Object.keys(productCategories);
    const now = new Date().getTime();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const categoryIndex = Math.floor(now / tenMinutes) % categories.length;
    return categories[categoryIndex] as keyof typeof productCategories;
  };

  const [currentCategory, setCurrentCategory] = useState(getCurrentCategory);
  const products = productCategories[currentCategory];

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

  // Check for category changes every minute
  useEffect(() => {
    const categoryTimer = setInterval(() => {
      const newCategory = getCurrentCategory();
      if (newCategory !== currentCategory) {
        setCurrentCategory(newCategory);
        setCurrentProductIndex(0); // Reset to first product of new category
      }
    }, 60000); // Check every minute

    return () => clearInterval(categoryTimer);
  }, [currentCategory]);

  const currentProduct = products[currentProductIndex];

  const handleKnowMoreClick = () => {
    console.log('Product clicked:', currentProduct.name);
    // Map brand names to actual shop IDs
    const brandToShopMap: { [key: string]: string } = {
      'Alibaba Electronics': 'alibaba-electronics',
      'Conta Tech': 'conta-tech', 
      'ViewMax Pro': 'viewmax-pro',
      'KeyCraft': 'keycraft',
      'SoundWave Audio': 'soundwave-audio',
      'StyleMax': 'stylemax',
      'FashionHub': 'fashionhub',
      'TimeElite': 'timeelite',
      'VisionCraft': 'visioncraft',
      'LuxeBags Co': 'luxebags-co',
      'BrewMaster': 'brewmaster',
      'CleanAir Pro': 'cleanair-pro',
      'AutoClean': 'autoclean',
      'ThermoTech': 'thermotech',
      'LightWave': 'lightwave'
    };
    
    const shopId = brandToShopMap[currentProduct.brand] || 'techglobal-inc';
    console.log('Navigating to:', `/shop/${shopId}?product=${currentProduct.id}`);
    navigate(`/shop/${shopId}?product=${currentProduct.id}`);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleProductClick called');
    handleKnowMoreClick();
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
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary-foreground mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-neon-primary via-neon-accent to-neon-secondary bg-clip-text text-transparent">
                NeoMart
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-primary-foreground/90 mb-8">
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
    <section className="relative h-[20vh] sm:h-[25vh] lg:h-[30vh] bg-gradient-hero">
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Compact Amazon-style Product Banner */}
      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl animate-product-slide-in">
          
          {/* Horizontal Product Layout */}
          <div className="flex items-center bg-glass-bg/20 backdrop-blur-xl border border-glass-border rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-neon h-full">
            
            {/* Product Image - Left Side */}
            <div className="relative group flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 overflow-hidden rounded-lg">
                <img 
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Discount Badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-neon px-1.5 py-0.5 rounded-full shadow-neon-intense">
                <span className="text-black font-bold text-xs">{currentProduct.discount}</span>
              </div>
            </div>

            {/* Product Info - Center */}
            <div className="flex-1 px-4 sm:px-6 flex flex-col justify-center min-h-0">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-primary-foreground leading-tight truncate">
                {currentProduct.name}
              </h2>
              
              {/* Rating - Compact */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${
                      i < Math.floor(currentProduct.rating) 
                        ? 'text-neon-accent fill-current' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                ))}
                <span className="text-primary-foreground/80 ml-1 text-xs">{currentProduct.rating}</span>
              </div>
              
              {/* Brand Info - Inline */}
              <div className="flex items-center gap-2 mt-1">
                <img 
                  src={currentProduct.brandLogo} 
                  alt={`${currentProduct.brand} logo`}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-xs text-neon-primary font-medium">{currentProduct.brand}</span>
              </div>
            </div>

            {/* Action Section - Right Side */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              {/* Shop Now Button - Compact */}
              <button
                onClick={() => {
                  console.log('🚀 SHOP NOW CLICKED!', currentProduct.name);
                  handleKnowMoreClick();
                }}
                className="
                  bg-gradient-neon hover:bg-gradient-neon/90 
                  text-black font-bold 
                  transition-all duration-300 
                  hover:scale-105 hover:shadow-neon-glow
                  px-4 py-2 sm:px-6 sm:py-3
                  text-xs sm:text-sm
                  rounded-lg
                  shadow-neon-intense 
                  cursor-pointer select-none
                  flex items-center gap-1.5
                  touch-manipulation
                "
                type="button"
              >
                Shop Now
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              
              {/* Navigation Dots - Vertical on mobile, horizontal on desktop */}
              <div className="flex sm:flex-row flex-col items-center gap-1">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${
                      index === currentProductIndex 
                        ? 'bg-neon-primary shadow-neon' 
                        : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;