import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Shop = () => {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  
  // Dynamic shop data based on shopId
  const getShopData = (shopId: string) => {
    const shops = {
      // Tech stores
      'alibaba-electronics': {
        name: "Alibaba Electronics",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        description: "Leading global electronics retailer specializing in gaming peripherals and computer accessories.",
        rating: 4.8,
        reviews: 1240,
        location: "Hangzhou, China",
        phone: "+86 571-1234-5678",
        email: "support@alibaba-electronics.com",
        website: "www.alibaba-electronics.com"
      },
      'conta-tech': {
        name: "Conta Tech",
        logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
        description: "Premium laptop and computing solutions for professionals and enthusiasts.",
        rating: 4.9,
        reviews: 856,
        location: "Seoul, South Korea",
        phone: "+82 2-555-0123",
        email: "info@conta-tech.com",
        website: "www.conta-tech.com"
      },
      'viewmax-pro': {
        name: "ViewMax Pro",
        logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=400&fit=crop",
        description: "High-performance gaming monitors and display solutions for immersive experiences.",
        rating: 4.7,
        reviews: 743,
        location: "Tokyo, Japan",
        phone: "+81 3-5555-0123",
        email: "support@viewmax-pro.com",
        website: "www.viewmax-pro.com"
      },
      'keycraft': {
        name: "KeyCraft",
        logo: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=1200&h=400&fit=crop",
        description: "Artisan mechanical keyboards crafted for typing enthusiasts and gamers.",
        rating: 4.6,
        reviews: 425,
        location: "Berlin, Germany",
        phone: "+49 30-555-0123",
        email: "hello@keycraft.com",
        website: "www.keycraft.com"
      },
      'soundwave-audio': {
        name: "SoundWave Audio",
        logo: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop",
        description: "Premium wireless headphones and audio equipment for audiophiles.",
        rating: 4.8,
        reviews: 932,
        location: "Los Angeles, CA",
        phone: "+1 (323) 555-0456",
        email: "support@soundwave-audio.com",
        website: "www.soundwave-audio.com"
      },
      // Fashion stores
      'stylemax': {
        name: "StyleMax",
        logo: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop",
        description: "Designer sneakers and streetwear for the fashion-forward individual.",
        rating: 4.7,
        reviews: 1450,
        location: "Milan, Italy",
        phone: "+39 02-555-0123",
        email: "info@stylemax.com",
        website: "www.stylemax.com"
      },
      'fashionhub': {
        name: "FashionHub",
        logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=400&fit=crop",
        description: "Contemporary fashion and outerwear for modern lifestyles.",
        rating: 4.5,
        reviews: 876,
        location: "Paris, France",
        phone: "+33 1-5555-0123",
        email: "hello@fashionhub.com",
        website: "www.fashionhub.com"
      },
      'timeelite': {
        name: "TimeElite",
        logo: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop",
        description: "Luxury timepieces and watches from renowned craftsmen worldwide.",
        rating: 4.9,
        reviews: 564,
        location: "Geneva, Switzerland",
        phone: "+41 22-555-0123",
        email: "contact@timeelite.com",
        website: "www.timeelite.com"
      },
      'visioncraft': {
        name: "VisionCraft",
        logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=400&fit=crop",
        description: "Designer sunglasses and optical wear with cutting-edge lens technology.",
        rating: 4.6,
        reviews: 689,
        location: "Barcelona, Spain",
        phone: "+34 93-555-0123",
        email: "info@visioncraft.com",
        website: "www.visioncraft.com"
      },
      'luxebags-co': {
        name: "LuxeBags Co",
        logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&h=400&fit=crop",
        description: "Premium handbags and accessories crafted with finest materials.",
        rating: 4.8,
        reviews: 1230,
        location: "Florence, Italy",
        phone: "+39 055-555-0123",
        email: "support@luxebags-co.com",
        website: "www.luxebags-co.com"
      },
      // Home stores
      'brewmaster': {
        name: "BrewMaster",
        logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop",
        description: "Smart coffee makers and brewing equipment for the perfect cup.",
        rating: 4.7,
        reviews: 543,
        location: "Portland, OR",
        phone: "+1 (503) 555-0789",
        email: "hello@brewmaster.com",
        website: "www.brewmaster.com"
      },
      'cleanair-pro': {
        name: "CleanAir Pro",
        logo: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
        description: "Advanced air purification systems for healthier indoor environments.",
        rating: 4.6,
        reviews: 432,
        location: "Stockholm, Sweden",
        phone: "+46 8-555-0123",
        email: "support@cleanair-pro.com",
        website: "www.cleanair-pro.com"
      },
      'autoclean': {
        name: "AutoClean",
        logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
        description: "Intelligent robot vacuums and automated cleaning solutions.",
        rating: 4.8,
        reviews: 765,
        location: "Munich, Germany",
        phone: "+49 89-555-0123",
        email: "info@autoclean.com",
        website: "www.autoclean.com"
      },
      'thermotech': {
        name: "ThermoTech",
        logo: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1200&h=400&fit=crop",
        description: "Smart thermostats and climate control systems for modern homes.",
        rating: 4.5,
        reviews: 398,
        location: "Copenhagen, Denmark",
        phone: "+45 33-555-0123",
        email: "contact@thermotech.com",
        website: "www.thermotech.com"
      },
      'lightwave': {
        name: "LightWave",
        logo: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=1200&h=400&fit=crop",
        description: "LED smart lighting solutions and home automation systems.",
        rating: 4.7,
        reviews: 621,
        location: "Amsterdam, Netherlands",
        phone: "+31 20-555-0123",
        email: "hello@lightwave.com",
        website: "www.lightwave.com"
      },
      // Legacy stores
      'alibaba-tech': {
        name: "Alibaba Tech Store",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        description: "Leading global technology retailer specializing in gaming peripherals and computer accessories.",
        rating: 4.8,
        reviews: 1240,
        location: "Hangzhou, China",
        phone: "+86 571-1234-5678",
        email: "support@alibaba-tech.com",
        website: "www.alibaba.com"
      },
      'techglobal-inc': {
        name: "TechGlobal Inc",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
        description: "International technology solutions provider with cutting-edge products for modern businesses.",
        rating: 4.9,
        reviews: 856,
        location: "San Francisco, CA",
        phone: "+1 (415) 555-0123",
        email: "info@techglobal.com",
        website: "www.techglobal.com"
      },
      'ecowear-fashion': {
        name: "EcoWear Sustainable Fashion",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        description: "Sustainable fashion for conscious consumers with eco-friendly materials and ethical production.",
        rating: 4.7,
        reviews: 2340,
        location: "Portland, OR",
        phone: "+1 (503) 555-0456",
        email: "hello@ecowear.com",
        website: "www.ecowear.com"
      }
    };
    
    return shops[shopId as keyof typeof shops] || shops['techglobal-inc'];
  };

  const shopData = getShopData(shopId || 'techglobal-inc');

  const getProducts = (shopId: string) => {
    const productsByShop = {
      // Tech stores products
      'alibaba-electronics': [
        {
          id: 1,
          title: "Wireless Gaming Mouse",
          price: 59.99,
          originalPrice: 79.99,
          rating: 4.8,
          reviews: 324,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics",
          badge: productId === "1" ? "Featured" : undefined
        },
        {
          id: 101,
          title: "RGB Gaming Mousepad",
          price: 29.99,
          originalPrice: 39.99,
          rating: 4.6,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics"
        }
      ],
      'conta-tech': [
        {
          id: 2,
          title: "Premium Laptop",
          price: 1299.99,
          originalPrice: 1849.99,
          rating: 4.9,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
          seller: "Conta Tech",
          badge: productId === "2" ? "Featured" : undefined
        },
        {
          id: 102,
          title: "Professional Workstation",
          price: 2399.99,
          originalPrice: 2999.99,
          rating: 4.8,
          reviews: 67,
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
          seller: "Conta Tech"
        }
      ],
      'viewmax-pro': [
        {
          id: 3,
          title: "4K Gaming Monitor",
          price: 399.99,
          originalPrice: 499.99,
          rating: 4.7,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
          seller: "ViewMax Pro",
          badge: productId === "3" ? "Featured" : undefined
        },
        {
          id: 103,
          title: "Ultrawide Curved Display",
          price: 649.99,
          originalPrice: 799.99,
          rating: 4.8,
          reviews: 145,
          image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
          seller: "ViewMax Pro"
        }
      ],
      'keycraft': [
        {
          id: 4,
          title: "Mechanical Keyboard",
          price: 129.99,
          originalPrice: 149.99,
          rating: 4.6,
          reviews: 167,
          image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
          seller: "KeyCraft",
          badge: productId === "4" ? "Featured" : undefined
        },
        {
          id: 104,
          title: "Custom Keycap Set",
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "KeyCraft"
        }
      ],
      'soundwave-audio': [
        {
          id: 5,
          title: "Wireless Headphones",
          price: 199.99,
          originalPrice: 299.99,
          rating: 4.8,
          reviews: 312,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
          seller: "SoundWave Audio",
          badge: productId === "5" ? "Featured" : undefined
        },
        {
          id: 105,
          title: "Premium Earbuds",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
          seller: "SoundWave Audio"
        }
      ],
      // Fashion stores products
      'stylemax': [
        {
          id: 6,
          title: "Designer Sneakers",
          price: 159.99,
          originalPrice: 259.99,
          rating: 4.7,
          reviews: 445,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          seller: "StyleMax",
          badge: productId === "6" ? "Featured" : undefined
        },
        {
          id: 106,
          title: "Limited Edition Runners",
          price: 199.99,
          originalPrice: 299.99,
          rating: 4.8,
          reviews: 298,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          seller: "StyleMax"
        }
      ],
      'fashionhub': [
        {
          id: 7,
          title: "Premium Jacket",
          price: 189.99,
          originalPrice: 379.99,
          rating: 4.5,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
          seller: "FashionHub",
          badge: productId === "7" ? "Featured" : undefined
        },
        {
          id: 107,
          title: "Designer Coat",
          price: 249.99,
          originalPrice: 399.99,
          rating: 4.6,
          reviews: 123,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
          seller: "FashionHub"
        }
      ],
      'timeelite': [
        {
          id: 8,
          title: "Luxury Watch",
          price: 899.99,
          originalPrice: 1199.99,
          rating: 4.9,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          seller: "TimeElite",
          badge: productId === "8" ? "Featured" : undefined
        },
        {
          id: 108,
          title: "Swiss Chronograph",
          price: 1299.99,
          originalPrice: 1699.99,
          rating: 4.8,
          reviews: 67,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          seller: "TimeElite"
        }
      ],
      'visioncraft': [
        {
          id: 9,
          title: "Designer Sunglasses",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
          seller: "VisionCraft",
          badge: productId === "9" ? "Featured" : undefined
        },
        {
          id: 109,
          title: "Polarized Aviators",
          price: 179.99,
          originalPrice: 249.99,
          rating: 4.7,
          reviews: 178,
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
          seller: "VisionCraft"
        }
      ],
      'luxebags-co': [
        {
          id: 10,
          title: "Premium Handbag",
          price: 299.99,
          originalPrice: 549.99,
          rating: 4.8,
          reviews: 167,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
          seller: "LuxeBags Co",
          badge: productId === "10" ? "Featured" : undefined
        },
        {
          id: 110,
          title: "Designer Clutch",
          price: 199.99,
          originalPrice: 329.99,
          rating: 4.6,
          reviews: 145,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
          seller: "LuxeBags Co"
        }
      ],
      // Home stores products
      'brewmaster': [
        {
          id: 11,
          title: "Smart Coffee Maker",
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.7,
          reviews: 298,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
          seller: "BrewMaster",
          badge: productId === "11" ? "Featured" : undefined
        },
        {
          id: 111,
          title: "Espresso Machine Pro",
          price: 399.99,
          originalPrice: 499.99,
          rating: 4.8,
          reviews: 189,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
          seller: "BrewMaster"
        }
      ],
      'cleanair-pro': [
        {
          id: 12,
          title: "Air Purifier",
          price: 299.99,
          originalPrice: 459.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          seller: "CleanAir Pro",
          badge: productId === "12" ? "Featured" : undefined
        },
        {
          id: 112,
          title: "HEPA Filter System",
          price: 399.99,
          originalPrice: 599.99,
          rating: 4.7,
          reviews: 167,
          image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop",
          seller: "CleanAir Pro"
        }
      ],
      'autoclean': [
        {
          id: 13,
          title: "Robot Vacuum",
          price: 399.99,
          originalPrice: 699.99,
          rating: 4.8,
          reviews: 345,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          seller: "AutoClean",
          badge: productId === "13" ? "Featured" : undefined
        },
        {
          id: 113,
          title: "Smart Mop Robot",
          price: 299.99,
          originalPrice: 449.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          seller: "AutoClean"
        }
      ],
      'thermotech': [
        {
          id: 14,
          title: "Smart Thermostat",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.5,
          reviews: 189,
          image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop",
          seller: "ThermoTech",
          badge: productId === "14" ? "Featured" : undefined
        },
        {
          id: 114,
          title: "WiFi Climate Controller",
          price: 199.99,
          originalPrice: 279.99,
          rating: 4.6,
          reviews: 145,
          image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop",
          seller: "ThermoTech"
        }
      ],
      'lightwave': [
        {
          id: 15,
          title: "LED Smart Bulbs",
          price: 79.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviews: 267,
          image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=400&fit=crop",
          seller: "LightWave",
          badge: productId === "15" ? "Featured" : undefined
        },
        {
          id: 115,
          title: "Smart Light Strip Kit",
          price: 99.99,
          originalPrice: 139.99,
          rating: 4.8,
          reviews: 198,
          image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=400&fit=crop",
          seller: "LightWave"
        }
      ],
      // Legacy stores products
      'alibaba-tech': [
        {
          id: 201,
          title: "Gaming Mouse Pro X1",
          price: 59.99,
          originalPrice: 79.99,
          rating: 4.8,
          reviews: 324,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics",
          badge: productId === "201" ? "Featured" : undefined
        },
        {
          id: 202,
          title: "Mechanical Keyboard RGB",
          price: 129.99,
          originalPrice: 159.99,
          rating: 4.9,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics"
        },
        {
          id: 203,
          title: "Gaming Headset Pro",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
          seller: "Alibaba Electronics"
        }
      ],
      'techglobal-inc': [
        {
          id: 204,
          title: "Wireless Laptop Stand",
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.6,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc",
          badge: productId === "204" ? "Featured" : undefined
        },
        {
          id: 205,
          title: "USB-C Hub Multiport",
          price: 45.99,
          originalPrice: 59.99,
          rating: 4.8,
          reviews: 167,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc"
        },
        {
          id: 206,
          title: "Bluetooth Speaker Pro",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.9,
          reviews: 312,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
          seller: "TechGlobal Inc"
        }
      ],
      'ecowear-fashion': [
        {
          id: 207,
          title: "Organic Cotton T-Shirt",
          price: 29.99,
          originalPrice: 39.99,
          rating: 4.5,
          reviews: 890,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion",
          badge: productId === "207" ? "Featured" : undefined
        },
        {
          id: 208,
          title: "Recycled Denim Jeans",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviews: 445,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion"
        },
        {
          id: 209,
          title: "Bamboo Fiber Hoodie",
          price: 69.99,
          originalPrice: 89.99,
          rating: 4.6,
          reviews: 278,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
          seller: "EcoWear Fashion"
        }
      ]
    };
    
    return productsByShop[shopId as keyof typeof productsByShop] || productsByShop['techglobal-inc'];
  };

  const products = getProducts(shopId || 'techglobal-inc');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Shop Banner */}
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${shopData.banner})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-6 left-6 flex items-end gap-4">
            <img 
              src={shopData.logo} 
              alt={shopData.name}
              className="w-20 h-20 rounded-lg border-2 border-white"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{shopData.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(shopData.rating) ? 'text-accent fill-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span>{shopData.rating} ({shopData.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Shop Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">About</h3>
                    <p className="text-sm text-muted-foreground">{shopData.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{shopData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{shopData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{shopData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span>{shopData.website}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                    Contact Store
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Products</h2>
                <p className="text-muted-foreground">{products.length} products available</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviews={product.reviews}
                    image={product.image}
                    seller={product.seller}
                    badge={product.badge}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;