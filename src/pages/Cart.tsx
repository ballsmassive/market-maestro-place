import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      brand: "TechCorp",
      price: 59.99,
      originalPrice: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      brand: "GameGear",
      price: 129.99,
      originalPrice: 159.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop"
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <ShoppingCart className="w-8 h-8 text-neon-primary" />
            <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
            <span className="text-muted-foreground">({cartItems.length} items)</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-surface-dark/50 border-glass-border">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-neon-primary">${item.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-surface-dark/50 border-glass-border sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-neon-accent">Free</span>
                  </div>
                  <div className="border-t border-glass-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-neon-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-neon-primary hover:bg-neon-primary/80">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;