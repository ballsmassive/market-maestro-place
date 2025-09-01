import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Shop = () => {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  
  // Mock shop data
  const shopData = {
    name: "TechCorp Store",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    description: "Leading technology retailer specializing in gaming peripherals and computer accessories.",
    rating: 4.8,
    reviews: 1240,
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    email: "support@techcorp.com",
    website: "www.techcorp.com"
  };

  const products = [
    {
      id: 1,
      name: "Gaming Mouse Pro X1",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.8,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      discount: 25,
      featured: productId === "1"
    },
    {
      id: 2,
      name: "Mechanical Keyboard RGB",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      discount: 19
    },
    {
      id: 3,
      name: "Gaming Headset Pro",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      discount: 25
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Shop Banner */}
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${shopData.banner})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-6 left-6 flex items-end gap-4">
            <img 
              src={shopData.logo} 
              alt={shopData.name}
              className="w-20 h-20 rounded-lg border-2 border-white"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{shopData.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(shopData.rating) ? 'text-neon-accent fill-neon-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span>{shopData.rating} ({shopData.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Shop Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-surface-dark/50 border-glass-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{shopData.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-neon-primary" />
                      <span>{shopData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-neon-primary" />
                      <span>{shopData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-neon-primary" />
                      <span>{shopData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="w-4 h-4 text-neon-primary" />
                      <span>{shopData.website}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-neon-primary hover:bg-neon-primary/80">
                    Contact Store
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Products</h2>
                <p className="text-muted-foreground">{products.length} products available</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`group bg-surface-dark/50 border-glass-border hover:border-neon-primary/30 transition-all duration-300 ${product.featured ? 'ring-2 ring-neon-primary' : ''}`}
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
                        {product.featured && (
                          <Badge className="absolute top-2 right-2 bg-neon-primary text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
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
                          Add to Cart
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

export default Shop;