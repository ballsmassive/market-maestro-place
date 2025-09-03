import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: {
    name: string;
    logo: string;
    verified: boolean;
  };
  category: string;
  discount?: number;
}

const Category = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // Mock products data - in real app, this would come from API
  const allProducts: Product[] = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 2543,
      image: "/placeholder.svg",
      seller: { name: "TechStore Pro", logo: "/placeholder.svg", verified: true },
      category: "electronics",
      discount: 20,
    },
    {
      id: 2,
      title: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 1876,
      image: "/placeholder.svg",
      seller: { name: "GamerHub", logo: "/placeholder.svg", verified: true },
      category: "electronics",
      discount: 28,
    },
    {
      id: 3,
      title: "Smartphone Case Premium",
      price: 24.99,
      rating: 4.3,
      reviews: 892,
      image: "/placeholder.svg",
      seller: { name: "PhoneGuard", logo: "/placeholder.svg", verified: false },
      category: "electronics",
    },
    {
      id: 4,
      title: "4K Ultra HD Monitor",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 1234,
      image: "/placeholder.svg",
      seller: { name: "DisplayPro", logo: "/placeholder.svg", verified: true },
      category: "electronics",
      discount: 25,
    },
    {
      id: 5,
      title: "Designer Cotton T-Shirt",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviews: 567,
      image: "/placeholder.svg",
      seller: { name: "FashionForward", logo: "/placeholder.svg", verified: true },
      category: "fashion",
      discount: 33,
    },
    {
      id: 6,
      title: "Leather Crossbody Bag",
      price: 89.99,
      rating: 4.6,
      reviews: 423,
      image: "/placeholder.svg",
      seller: { name: "BagBoutique", logo: "/placeholder.svg", verified: false },
      category: "fashion",
    },
    {
      id: 7,
      title: "Smart Garden Planter",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.2,
      reviews: 298,
      image: "/placeholder.svg",
      seller: { name: "GreenThumb Co", logo: "/placeholder.svg", verified: true },
      category: "home",
      discount: 25,
    },
    {
      id: 8,
      title: "Car Dash Cam HD",
      price: 119.99,
      rating: 4.5,
      reviews: 756,
      image: "/placeholder.svg",
      seller: { name: "AutoTech", logo: "/placeholder.svg", verified: true },
      category: "automotive",
    },
    // Add more products for other categories...
  ];

  useEffect(() => {
    const categoryKey = categoryName?.toLowerCase().replace(/\s+/g, '').replace('&', '');
    let filteredProducts = allProducts;
    
    // Map category names to keys
    const categoryMap: { [key: string]: string } = {
      'electronics': 'electronics',
      'fashion': 'fashion',
      'homegarden': 'home',
      'automotive': 'automotive',
      'gaming': 'electronics', // Gaming products are in electronics
      'sports': 'sports',
      'books': 'books',
      'health': 'health',
    };

    const mappedCategory = categoryMap[categoryKey || ''];
    if (mappedCategory) {
      filteredProducts = allProducts.filter(product => product.category === mappedCategory);
    }

    setProducts(filteredProducts);
  }, [categoryName]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const getCategoryTitle = () => {
    return categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {getCategoryTitle()}
            </h1>
            <p className="text-muted-foreground">
              {products.length} products found
            </p>
          </div>

          {/* Products Grid - 4 per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                        -{product.discount}%
                      </Badge>
                    )}
                    
                    {/* Heart Icon */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background/90"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2">
                    {/* Seller Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={product.seller.logo}
                        alt={product.seller.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-xs text-muted-foreground">
                        {product.seller.name}
                      </span>
                      {product.seller.verified && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          ✓
                        </Badge>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full mt-3 bg-primary hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle add to cart
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;