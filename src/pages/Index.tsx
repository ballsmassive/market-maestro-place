import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ShopProductGrid from "@/components/ShopProductGrid";
import SellerSpotlight from "@/components/SellerSpotlight";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ShopProductGrid />
      <SellerSpotlight />
      
      {/* Bottom Category Section for confused users */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-dark-glass border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-4">
              Still looking for something?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Browse our popular categories to find exactly what you need
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
