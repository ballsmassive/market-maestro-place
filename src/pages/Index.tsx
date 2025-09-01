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
      <Footer />
    </div>
  );
};

export default Index;
