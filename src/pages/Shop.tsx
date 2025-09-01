import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Shop = () => {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  
  // Dynamic shop data based on shopId
  const getShopData = (shopId: string) => {
    const shops = {
      'alibaba-tech': {
        name: "Alibaba Tech Store",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        description: "Leading global technology retailer specializing in gaming peripherals and computer accessories.",
        rating: 4.8,
        reviews: 1240,
        location: "Hangzhou, China",
        phone: "+86 571-1234-5678",
        email: "support@alibaba-tech.com",
        website: "www.alibaba.com"
      },
      'techglobal-inc': {
        name: "TechGlobal Inc",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
        description: "International technology solutions provider with cutting-edge products for modern businesses.",
        rating: 4.9,
        reviews: 856,
        location: "San Francisco, CA",
        phone: "+1 (415) 555-0123",
        email: "info@techglobal.com",
        website: "www.techglobal.com"
      },
      'ecowear-fashion': {
        name: "EcoWear Sustainable Fashion",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        description: "Sustainable fashion for conscious consumers with eco-friendly materials and ethical production.",
        rating: 4.7,
        reviews: 2340,
        location: "Portland, OR",
        phone: "+1 (503) 555-0456",
        email: "hello@ecowear.com",
        website: "www.ecowear.com"
      }
    };
    
    return shops[shopId as keyof typeof shops] || shops['techglobal-inc'];
  };

  const shopData = getShopData(shopId || 'techglobal-inc');

  const getProducts = (shopId: string) => {
    const productsByShop = {
      'alibaba-tech': [
        {
          id: 1,
          title: "Gaming Mouse Pro X1",
          price: 59.99,
          originalPrice: 79.99,
          rating: 4.8,
          reviews: 324,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics",
          badge: productId === "1" ? "Featured" : undefined
        },
        {
          id: 2,
          title: "Mechanical Keyboard RGB",
          price: 129.99,
          originalPrice: 159.99,
          rating: 4.9,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics"
        },
        {
          id: 3,
          title: "Gaming Headset Pro",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics"
        }
      ],
      'techglobal-inc': [
        {
          id: 4,
          title: "Wireless Laptop Stand",
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc",
          badge: productId === "4" ? "Featured" : undefined
        },
        {
          id: 5,
          title: "USB-C Hub Multiport",
          price: 45.99,
          originalPrice: 59.99,
          rating: 4.8,
          reviews: 167,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc"
        },
        {
          id: 6,
          title: "Bluetooth Speaker Pro",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.9,
          reviews: 312,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc"
        }
      ],
      'ecowear-fashion': [
        {
          id: 7,
          title: "Organic Cotton T-Shirt",
          price: 29.99,
          originalPrice: 39.99,
          rating: 4.5,
          reviews: 890,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion",
          badge: productId === "7" ? "Featured" : undefined
        },
        {
          id: 8,
          title: "Recycled Denim Jeans",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviews: 445,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion"
        },
        {
          id: 9,
          title: "Bamboo Fiber Hoodie",
          price: 69.99,
          originalPrice: 89.99,
          rating: 4.6,
          reviews: 278,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion"
        }
      ]
    };
    
    return productsByShop[shopId as keyof typeof productsByShop] || productsByShop['techglobal-inc'];
  };

  const products = getProducts(shopId || 'techglobal-inc');

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
                      className={`w-4 h-4 ${i < Math.floor(shopData.rating) ? 'text-accent fill-accent' : 'text-gray-300'}`}
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
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">About</h3>
                    <p className="text-sm text-muted-foreground">{shopData.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{shopData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{shopData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{shopData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>{shopData.website}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
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
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviews={product.reviews}
                    image={product.image}
                    seller={product.seller}
                    badge={product.badge}
                  />
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