import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Shirt, 
  Home, 
  Car, 
  Gamepad2, 
  Dumbbell,
  Book,
  Heart
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, count: "125K+" },
  { name: "Fashion", icon: Shirt, count: "85K+" },
  { name: "Home & Garden", icon: Home, count: "95K+" },
  { name: "Automotive", icon: Car, count: "45K+" },
  { name: "Gaming", icon: Gamepad2, count: "35K+" },
  { name: "Sports", icon: Dumbbell, count: "55K+" },
  { name: "Books", icon: Book, count: "65K+" },
  { name: "Health", icon: Heart, count: "40K+" },
];

const CategoryGrid = () => {
  const handleCategoryClick = (categoryName: string) => {
    const categoryPath = categoryName.toLowerCase().replace(/\s+/g, '-').replace('&', '');
    window.location.href = `/category/${categoryPath}`;
  };

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover millions of products across diverse categories from trusted sellers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="group cursor-pointer transition-all duration-300 hover:shadow-product hover:-translate-y-1 bg-gradient-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {category.count} products
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;