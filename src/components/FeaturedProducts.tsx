import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      title: "Premium Wireless Bluetooth Headphones with Noise Cancellation",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviews: 2847,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      seller: "TechGlobal Inc",
      badge: "Best Seller"
    },
    {
      title: "Organic Cotton T-Shirt Collection - Sustainable Fashion",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.6,
      reviews: 1203,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      seller: "EcoWear",
      badge: "Eco-Friendly"
    },
    {
      title: "Smart Home Security Camera System with AI Detection",
      price: 149.99,
      rating: 4.7,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      seller: "SecureHome Pro"
    },
    {
      title: "Professional Chef's Knife Set - Japanese Steel",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.9,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop",
      seller: "Culinary Masters",
      badge: "Premium"
    },
    {
      title: "Fitness Tracker with Heart Rate Monitor",
      price: 79.99,
      rating: 4.5,
      reviews: 1847,
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=300&fit=crop",
      seller: "FitTech Solutions"
    },
    {
      title: "Handcrafted Wooden Coffee Table - Sustainable Design",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      seller: "Artisan Woods",
      badge: "Handmade"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover hand-picked products from our most trusted sellers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;