import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockProducts = [
  {
    id: 1,
    title: 'Premium Cement - 50kg',
    brand: 'BuildStrong',
    category: 'Construction',
    rating: 4.5,
    reviews: 234,
    price: 450,
    image: '/assets/cement.jpg',
    tag: 'Fast Delivery',
    description: 'High-grade Portland cement for construction and renovation projects',
  },
  {
    id: 2,
    title: 'Ceramic Floor Tiles - Premium',
    brand: 'TileMax',
    category: 'Construction',
    rating: 4.6,
    reviews: 156,
    price: 125,
    originalPrice: 150,
    image: '/assets/tiles.jpg',
    tag: '17% OFF',
    description: 'Premium ceramic tiles with anti-slip surface and water resistance',
  },
  {
    id: 3,
    title: 'Scandinavian Oak Dining Table',
    brand: 'Nordic Home',
    category: 'Furniture',
    rating: 4.8,
    reviews: 124,
    price: 45999,
    originalPrice: 52999,
    image: '/assets/dining.jpg',
    tag: 'Bestseller',
    description: 'Handcrafted solid oak dining table with minimalist Scandinavian design',
  },
  {
    id: 4,
    title: 'Electrical Installation Service',
    brand: 'PowerPro',
    category: 'Services',
    rating: 4.7,
    reviews: 92,
    price: 2500,
    image: '/assets/electrician.jpg',
    tag: 'Fast Delivery',
    description: 'Certified electrical installation and repair services with safety guarantee',
  },
  {
    id: 5,
    title: 'Luxury Sectional Sofa',
    brand: 'ComfortPlus',
    category: 'Furniture',
    rating: 4.7,
    reviews: 89,
    price: 89999,
    image: '/assets/sofa.jpg',
    description: 'Ultra-comfortable sectional sofa with premium upholstery and modular design',
  },
  {
    id: 6,
    title: 'Professional Plumbing Service',
    brand: 'FixIt Pro',
    category: 'Services',
    rating: 4.9,
    reviews: 78,
    price: 1500,
    image: '/assets/plumber.jpg',
    description: 'Professional plumbing services with 1-year warranty and 24/7 support',
  },
  {
    id: 7,
    title: 'Smart LED Ceiling Light',
    brand: 'SmartLite',
    category: 'Lighting',
    rating: 4.4,
    reviews: 67,
    price: 8999,
    originalPrice: 11999,
    image: '/assets/light.jpg',
    tag: '25% OFF',
    description: 'WiFi-enabled smart LED ceiling light with app control and voice commands',
  },
];

const MarketDemo = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">HomeySpace Marketplace</h1>
        <p className="text-gray-500 mb-10">Complete marketplace for furniture, construction materials, and home services</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 border border-gray-200"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="mt-2 text-green-600 font-bold">
                    ₹{product.price.toLocaleString()} {product.originalPrice && <span className="text-sm line-through text-gray-400 ml-2">₹{product.originalPrice.toLocaleString()}</span>}
                  </p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Cart ({cart.length})</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{item.title}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketDemo;
