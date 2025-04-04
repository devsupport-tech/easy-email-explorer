
import React, { useState, useEffect } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { ArrowLeftCircle, ArrowRightCircle, PlusCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Smart Speaker",
    description: "Crystal clear sound with intuitive voice controls in a minimalist design that complements any space.",
    price: "$299",
    image: "https://images.unsplash.com/photo-1589003077984-89623ada37af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    color: "#f8fafc"
  },
  {
    id: 2,
    name: "Modern Desk Lamp",
    description: "Elegant lighting solution with touch controls and adaptive brightness for perfect illumination.",
    price: "$149",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    color: "#f1f5f9"
  },
  {
    id: 3,
    name: "Wireless Charger",
    description: "Seamless charging experience with a beautiful form that enhances your desk or nightstand.",
    price: "$79",
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e458?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    color: "#f8fafc"
  }
];

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const handleNext = () => {
    if (isAnimating) return;
    
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setActiveProduct((prev) => (prev - 1 + products.length) % products.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeProduct, isAnimating]);

  const product = products[activeProduct];

  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            Our Products
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Beautiful <span className="text-gradient">functionality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Products that harmonize form and function, designed with purpose to enhance your daily life while bringing aesthetic joy.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-elevated bg-white mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-80 lg:h-[500px] overflow-hidden" style={{ backgroundColor: product.color }}>
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-contain p-6 transition-all duration-500 ease-apple ${
                  isAnimating
                    ? direction === 'right'
                      ? 'opacity-0 translate-x-20'
                      : 'opacity-0 -translate-x-20'
                    : 'opacity-100 translate-x-0'
                }`}
              />
            </div>
            
            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div
                className={`transition-all duration-500 ease-apple ${
                  isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-medium mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <p className="text-2xl font-mono mb-8">{product.price}</p>
                
                <div className="flex flex-wrap gap-4">
                  <CustomButton variant="gradient" size="lg" className="flex-1 sm:flex-none">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Cart
                  </CustomButton>
                  <CustomButton variant="outline" size="lg" className="flex-1 sm:flex-none">
                    Details
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 flex space-x-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white hover:text-accent transition-colors shadow-subtle"
              aria-label="Previous product"
            >
              <ArrowLeftCircle className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground hover:bg-white hover:text-accent transition-colors shadow-subtle"
              aria-label="Next product"
            >
              <ArrowRightCircle className="h-5 w-5" />
            </button>
          </div>
          
          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-6 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeProduct ? 'right' : 'left');
                  setActiveProduct(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeProduct === index 
                    ? 'bg-accent w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
