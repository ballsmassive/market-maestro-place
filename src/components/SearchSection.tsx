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
    console.log("Searching for:", query);
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  // Handle product suggestion click
  const handleProductClick = (product: string) => {
    console.log(`Navigating to products for: ${product}`);
    window.location.href = `/search?q=${encodeURIComponent(product)}`;
  };

  const filteredSuggestions = suggestions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-dark-glass border-t border-glass-border">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
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
                onClick={() => handleProductClick(trend)}
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