import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ShopProductGrid from "@/components/ShopProductGrid";
import TrustedPartners from "@/components/TrustedPartners";
import SearchSection from "@/components/SearchSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ShopProductGrid />
      <TrustedPartners />
      
      {/* Search Section */}
      <SearchSection />
      
      <Footer />
    </div>
  );
};

export default Index;
