import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, Clock, Star } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trendingSearches = [
    "Wireless Headphones",
    "Gaming Mouse",
    "Smart Watch",
    "Laptop Stand",
    "Bluetooth Speaker"
  ];

  const suggestions = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      shops: 8,
      rating: 4.8
    },
    {
      name: "Gaming Mouse",
      category: "Gaming",
      shops: 12,
      rating: 4.7
    },
    {
      name: "Smart Watch",
      category: "Wearables",
      shops: 6,
      rating: 4.9
    },
    {
      name: "Laptop Stand",
      category: "Accessories",
      shops: 5,
      rating: 4.6
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    // TODO: Implement search functionality
    console.log("Searching for:", query);
  };

  const filteredSuggestions = suggestions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-dark-glass border-t border-glass-border">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-4">
            Find What You're Looking For
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of products from verified shops worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 sm:pl-12 pr-20 sm:pr-24 h-12 sm:h-14 text-sm sm:text-base bg-surface-dark/50 border-glass-border hover:border-neon-primary/30 focus:border-neon-primary/60 transition-all duration-300"
            />
            <Button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm bg-neon-primary hover:bg-neon-primary/80 border-0"
            >
              Search
            </Button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (searchQuery.length > 0 ? filteredSuggestions.length > 0 : false) && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-surface-dark/95 backdrop-blur-sm border-glass-border">
              <CardContent className="p-2 sm:p-3">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion.name)}
                    className="w-full text-left p-2 sm:p-3 hover:bg-neon-primary/10 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm sm:text-base font-medium text-foreground group-hover:text-neon-primary transition-colors">
                          {suggestion.name}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {suggestion.category} • {suggestion.shops} shops
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-neon-accent text-neon-accent" />
                        <span>{suggestion.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Trending Searches */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-neon-accent" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Trending Now</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {trendingSearches.map((trend, index) => (
              <button
                key={index}
                onClick={() => handleSearch(trend)}
                className="group px-3 sm:px-4 py-1.5 sm:py-2 bg-surface-dark/30 hover:bg-neon-primary/10 border border-glass-border hover:border-neon-primary/30 rounded-full transition-all duration-300"
              >
                <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-neon-primary transition-colors">
                  {trend}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;