import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Verified, TrendingUp } from "lucide-react";
import ProductCard from "./ProductCard";

interface Shop {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
  rating: number;
  totalProducts: number;
  badge?: string;
  description: string;
}

interface Product {
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  badge?: string;
}

interface ShopData {
  shop: Shop;
  products: Product[];
}

const ShopProductGrid = () => {
  const shopsData: ShopData[] = [
    {
      shop: {
        id: "1",
        name: "TechGlobal Inc",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
        isVerified: true,
        rating: 4.9,
        totalProducts: 1250,
        badge: "Top Seller",
        description: "Premium electronics and cutting-edge technology solutions"
      },
      products: [
        {
          title: "Premium Wireless Bluetooth Headphones with Noise Cancellation",
          price: 199.99,
          originalPrice: 299.99,
          rating: 4.8,
          reviews: 2847,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
          seller: "TechGlobal Inc",
          badge: "Best Seller"
        },
        {
          title: "Smart Home Security Camera System with AI Detection",
          price: 149.99,
          rating: 4.7,
          reviews: 856,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
          seller: "TechGlobal Inc"
        },
        {
          title: "Wireless Gaming Mouse with RGB Lighting",
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.6,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
          seller: "TechGlobal Inc",
          badge: "Gaming"
        },
        {
          title: "USB-C Hub with Multiple Ports",
          price: 49.99,
          rating: 4.5,
          reviews: 567,
          image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
          seller: "TechGlobal Inc"
        }
      ]
    },
    {
      shop: {
        id: "2",
        name: "EcoWear Sustainable Fashion",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center",
        isVerified: true,
        rating: 4.7,
        totalProducts: 890,
        badge: "Eco-Friendly",
        description: "Sustainable fashion for conscious consumers"
      },
      products: [
        {
          title: "Organic Cotton T-Shirt Collection - Sustainable Fashion",
          price: 29.99,
          originalPrice: 39.99,
          rating: 4.6,
          reviews: 1203,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
          seller: "EcoWear",
          badge: "Eco-Friendly"
        },
        {
          title: "Recycled Denim Jeans - Zero Waste",
          price: 89.99,
          originalPrice: 120.00,
          rating: 4.5,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
          seller: "EcoWear",
          badge: "Sustainable"
        },
        {
          title: "Bamboo Fiber Hoodie - Soft & Sustainable",
          price: 69.99,
          rating: 4.8,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
          seller: "EcoWear"
        },
        {
          title: "Hemp Canvas Backpack - Durable & Eco",
          price: 59.99,
          originalPrice: 79.99,
          rating: 4.4,
          reviews: 298,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
          seller: "EcoWear",
          badge: "Limited"
        }
      ]
    },
    {
      shop: {
        id: "3",
        name: "Artisan Woods",
        logo: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=100&h=100&fit=crop&crop=center",
        isVerified: true,
        rating: 4.8,
        totalProducts: 456,
        badge: "Handcrafted",
        description: "Premium handcrafted wooden furniture and decor"
      },
      products: [
        {
          title: "Handcrafted Wooden Coffee Table - Sustainable Design",
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.8,
          reviews: 423,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
          seller: "Artisan Woods",
          badge: "Handmade"
        },
        {
          title: "Solid Oak Bookshelf - Custom Made",
          price: 459.99,
          rating: 4.9,
          reviews: 178,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          seller: "Artisan Woods",
          badge: "Custom"
        },
        {
          title: "Walnut Wood Dining Set - 6 Chairs",
          price: 899.99,
          originalPrice: 1199.99,
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
          seller: "Artisan Woods"
        },
        {
          title: "Reclaimed Wood Wall Art - Rustic Style",
          price: 149.99,
          rating: 4.6,
          reviews: 267,
          image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
          seller: "Artisan Woods",
          badge: "Rustic"
        }
      ]
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {shopsData.map((shopData, shopIndex) => (
          <div key={shopData.shop.id} className="mb-16 last:mb-0">
            {/* Shop Header */}
            <Card className="mb-8 bg-gradient-shop-card border border-glass-border hover:border-neon-primary/30 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    {/* Shop Logo with neon border */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-neon-primary/20 group-hover:border-neon-primary/60 transition-colors shadow-neon">
                        <img 
                          src={shopData.shop.logo} 
                          alt={shopData.shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {shopData.shop.isVerified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-primary rounded-full flex items-center justify-center shadow-neon">
                          <Verified className="w-3 h-3 text-surface-darker" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-neon-primary transition-colors">
                          {shopData.shop.name}
                        </h3>
                        {shopData.shop.badge && (
                          <Badge className="bg-neon-accent/20 text-neon-accent border-neon-accent/30">
                            {shopData.shop.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{shopData.shop.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-neon-accent text-neon-accent" />
                          <span>{shopData.shop.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-neon-primary" />
                          <span>{shopData.shop.totalProducts.toLocaleString()} products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-neon-primary/30 text-neon-primary hover:bg-neon-primary/10 hover:border-neon-primary/60 transition-all group/btn"
                  >
                    <span>Visit Store</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid - 2 Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {shopData.products.map((product, productIndex) => (
                <div 
                  key={productIndex}
                  className="animate-fade-in"
                  style={{ animationDelay: `${productIndex * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <Button 
                variant="ghost" 
                className="group text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 border border-neon-cyan/30 hover:border-neon-cyan/60 transition-all"
              >
                <span>See more from {shopData.shop.name}</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProductGrid;