import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, ArrowRight } from "lucide-react";

const SellerSpotlight = () => {
  const topSellers = [
    {
      name: "TechGlobal Inc",
      rating: 4.9,
      sales: "25K+",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
      category: "Electronics",
      badge: "Top Seller",
      joinedYear: 2019
    },
    {
      name: "EcoWear",
      rating: 4.8,
      sales: "15K+",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      category: "Sustainable Fashion",
      badge: "Eco Certified",
      joinedYear: 2020
    },
    {
      name: "Artisan Woods",
      rating: 4.9,
      sales: "8K+",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      category: "Handmade Furniture",
      badge: "Artisan",
      joinedYear: 2018
    }
  ];

  return (
    <section className="py-16 bg-gradient-trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Seller Spotlight
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Meet our top-rated sellers who bring quality products and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topSellers.map((seller, index) => (
            <Card key={index} className="bg-background/10 backdrop-blur-sm border-primary-foreground/20">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-marketplace-accent text-accent-foreground">
                    <Award className="h-3 w-3 mr-1" />
                    {seller.badge}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-primary-foreground mb-2">
                  {seller.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-marketplace-accent text-marketplace-accent" />
                  <span className="text-primary-foreground/90 font-medium">
                    {seller.rating}
                  </span>
                  <span className="text-primary-foreground/70">
                    ({seller.sales} sales)
                  </span>
                </div>
                
                <p className="text-primary-foreground/80 mb-3">
                  {seller.category}
                </p>
                
                <p className="text-sm text-primary-foreground/70 mb-4">
                  Selling since {seller.joinedYear}
                </p>
                
                <Button variant="secondary" size="sm" className="w-full">
                  View Store
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
            Join Our Seller Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SellerSpotlight;