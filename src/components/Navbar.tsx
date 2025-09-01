import { Search, ShoppingCart, User, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
              Neo Mart
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products, categories, or businesses..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="animate-fade-in"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="animate-fade-in">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="outline" size="sm" className="animate-fade-in">
              Sell on Neo Mart
            </Button>
            <Button variant="ghost" size="icon" className="animate-fade-in">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden animate-fade-in">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;