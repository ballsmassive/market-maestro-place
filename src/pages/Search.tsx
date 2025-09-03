import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  // Mock search results - expanded to fill the page with more products
  const searchResults = [
    {
      id: 1,
      name: "Gaming Mouse Pro X1",
      brand: "TechCorp",
      brandLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.8,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      discount: 25,
      store: "techcorp-store"
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse Elite",
      brand: "GameGear",
      brandLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&h=100&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop",
      discount: 25,
      store: "gamegear-store"
    },
    {
      id: 3,
      name: "Professional Mouse V2",
      brand: "ProTech",
      brandLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1586298271473-0b212d779ff2?w=400&h=400&fit=crop",
      discount: 23,
      store: "protech-store"
    },
    {
      id: 4,
      name: "RGB Gaming Mouse Lightning",
      brand: "NeonTech",
      brandLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      price: 75.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      discount: 24,
      store: "neontech-store"
    },
    {
      id: 5,
      name: "Ultra Precision Mouse Pro",
      brand: "PrecisionTech",
      brandLogo: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop",
      price: 129.99,
      rating: 4.8,
      reviews: 432,
      image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop",
      discount: 0,
      store: "precision-store"
    },
    {
      id: 6,
      name: "Wireless Ergonomic Mouse",
      brand: "ComfortTech",
      brandLogo: "https://images.unsplash.com/photo-1607970471499-da1b3bcde742?w=100&h=100&fit=crop",
      price: 39.99,
      originalPrice: 54.99,
      rating: 4.4,
      reviews: 187,
      image: "https://images.unsplash.com/photo-1586298271473-0b212d779ff2?w=400&h=400&fit=crop",
      discount: 27,
      store: "comfort-store"
    },
    {
      id: 7,
      name: "High-Speed Gaming Mouse",
      brand: "SpeedGamer",
      brandLogo: "https://images.unsplash.com/photo-1518331647614-8b2c06b4ae40?w=100&h=100&fit=crop",
      price: 67.99,
      originalPrice: 89.99,
      rating: 4.6,
      reviews: 298,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      discount: 24,
      store: "speedgamer-store"
    },
    {
      id: 8,
      name: "Professional Office Mouse",
      brand: "OfficePro",
      brandLogo: "https://images.unsplash.com/photo-1619113991413-1a5ed8f1dc44?w=100&h=100&fit=crop",
      price: 34.99,
      rating: 4.3,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop",
      discount: 0,
      store: "office-store"
    },
    {
      id: 9,
      name: "Bluetooth Silent Mouse",
      brand: "QuietTech",
      brandLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      price: 52.99,
      originalPrice: 69.99,
      rating: 4.5,
      reviews: 223,
      image: "https://images.unsplash.com/photo-1586298271473-0b212d779ff2?w=400&h=400&fit=crop",
      discount: 24,
      store: "quiet-store"
    },
    {
      id: 10,
      name: "Multi-Device Wireless Mouse",
      brand: "ConnectPro",
      brandLogo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      price: 79.99,
      originalPrice: 109.99,
      rating: 4.7,
      reviews: 367,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      discount: 27,
      store: "connect-store"
    },
    {
      id: 11,
      name: "Ultra-Light Gaming Mouse",
      brand: "FeatherTech",
      brandLogo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      price: 94.99,
      originalPrice: 124.99,
      rating: 4.8,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop",
      discount: 24,
      store: "feather-store"
    },
    {
      id: 12,
      name: "Compact Travel Mouse",
      brand: "TravelTech",
      brandLogo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.2,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1586298271473-0b212d779ff2?w=400&h=400&fit=crop",
      discount: 25,
      store: "travel-store"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-muted-foreground">
              {searchResults.length} products found
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card className="bg-surface-dark/50 border-glass-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4" />
                    <h3 className="font-semibold">Filters</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Under $50
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          $50 - $100
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          Over $100
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Brand</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          TechCorp
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          GameGear
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          ProTech
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Results */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group bg-surface-dark/50 border-glass-border hover:border-neon-primary/30 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/shop/${product.store}?product=${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-neon-accent text-black">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img 
                            src={product.brandLogo} 
                            alt={product.brand}
                            className="w-6 h-6 rounded"
                          />
                          <span className="text-sm text-muted-foreground">{product.brand}</span>
                        </div>
                        
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-neon-primary transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-neon-accent fill-neon-accent' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-neon-primary">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        
                        <Button className="w-full bg-neon-primary hover:bg-neon-primary/80">
                          Visit Store
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;