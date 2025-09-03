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
    <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Bold Text & CTA */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-4">
                  <span className="block">{currentProduct.discount}</span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-yellow-300">
                    on Premium Brands
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                  Discover millions of products from trusted sellers worldwide. Limited time offer!
                </p>
              </div>

              {/* Large CTA Button */}
              <button
                onClick={handleKnowMoreClick}
                className="
                  bg-yellow-400 hover:bg-yellow-300 
                  text-black font-bold 
                  px-8 py-4 sm:px-12 sm:py-6 
                  text-lg sm:text-xl md:text-2xl
                  rounded-full
                  transition-all duration-300
                  hover:scale-105 hover:shadow-2xl
                  shadow-xl
                  cursor-pointer
                  flex items-center justify-center gap-3
                  mx-auto lg:mx-0
                  max-w-xs sm:max-w-sm
                "
              >
                <span>Shop Now</span>
                <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>

              {/* Terms */}
              <p className="text-sm text-white/70 mt-4">
                Terms apply. Limited time offer.
              </p>
            </div>

            {/* Right Side - Product Showcase */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 lg:p-8 shadow-2xl">
                
                {/* Featured Product */}
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Featured Today</h3>
                  <p className="text-white/80">{currentProduct.name}</p>
                </div>

                {/* Product Image */}
                <div className="relative group mb-6">
                  <div className="w-full h-48 sm:h-64 lg:h-80 overflow-hidden rounded-xl">
                    <img 
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Floating Discount Badge */}
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-pulse">
                    {currentProduct.discount}
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(currentProduct.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-white/30'
                        }`} 
                      />
                    ))}
                    <span className="text-white ml-2 font-semibold">{currentProduct.rating}</span>
                  </div>
                  
                  {/* Brand */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <img 
                      src={currentProduct.brandLogo} 
                      alt={`${currentProduct.brand} logo`}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-yellow-300 font-semibold">{currentProduct.brand}</span>
                  </div>

                  {/* Shop Button */}
                  <button
                    onClick={handleKnowMoreClick}
                    className="
                      bg-gradient-to-r from-pink-500 to-purple-600 
                      hover:from-pink-600 hover:to-purple-700
                      text-white font-bold 
                      px-6 py-3 
                      rounded-full
                      transition-all duration-300
                      hover:scale-105 hover:shadow-xl
                      w-full
                    "
                  >
                    Explore {currentProduct.brand}
                  </button>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentProductIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentProductIndex 
                        ? 'bg-yellow-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;