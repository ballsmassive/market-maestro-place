import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  badge?: string;
}

const ProductCard = ({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  seller,
  badge
}: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-neon hover:-translate-y-1 bg-gradient-shop-card border border-glass-border hover:border-neon-primary/40 animate-fade-in overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-32 sm:h-36 md:h-40 object-cover"
          />
          {badge && (
            <span className="absolute top-1.5 left-1.5 bg-neon-accent/20 text-neon-accent border border-neon-accent/30 px-1.5 py-0.5 rounded text-xs font-medium backdrop-blur-sm">
              {badge}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1.5 right-1.5 w-7 h-7 bg-glass-bg hover:bg-neon-primary/10 border border-glass-border hover:border-neon-primary/40 transition-all"
          >
            <Heart className="h-3.5 w-3.5 text-neon-primary" />
          </Button>
          
          {/* Glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-foreground mb-1.5 text-sm leading-tight line-clamp-2 group-hover:text-neon-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-1 mb-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2.5 w-2.5 ${
                    i < Math.floor(rating)
                      ? "fill-neon-accent text-neon-accent"
                      : "text-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">({reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-base font-bold text-neon-primary">${price}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-2.5 truncate">by {seller}</p>

          <Button 
            className="w-full h-8 text-xs bg-neon-primary/10 border border-neon-primary/30 text-neon-primary hover:bg-neon-primary/20 hover:border-neon-primary/50 transition-all group/btn" 
            variant="outline"
          >
            <span>Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;