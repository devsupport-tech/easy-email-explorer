
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Mouse } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || "1");
        (el as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center pt-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl parallax" data-speed="0.5"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl parallax" data-speed="0.8"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl parallax" data-speed="0.3"></div>
      </div>
      
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hero Content */}
          <div className="order-2 lg:order-1 animate-slide-up animation-delay-300">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
              Minimalist Design Excellence
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-tight mb-6 text-balance">
              <span className="text-gradient">Form</span> follows <br className="hidden lg:block" />
              <span className="text-gradient">function</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-md leading-relaxed">
              Experience the perfect balance of beauty and usability, guided by the design principle that the shape of everything should primarily relate to its intended function.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <CustomButton variant="gradient" size="lg" className="group">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </CustomButton>
              <CustomButton variant="outline" size="lg">
                Learn More
              </CustomButton>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
              <div className="w-full h-full bg-white rounded-2xl shadow-elevated overflow-hidden">
                <div className="bg-gradient-to-br from-accent/5 to-primary/10 w-full h-full flex items-center justify-center">
                  <div className="w-3/4 aspect-square rounded-full bg-white shadow-elevated animate-float flex items-center justify-center">
                    <div className="w-2/3 aspect-square rounded-full bg-accent/20 animate-pulse-subtle flex items-center justify-center">
                      <div className="w-1/2 aspect-square rounded-full bg-white shadow-subtle"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-lg shadow-subtle rotate-12 parallax" data-speed="1.5"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-sm parallax" data-speed="1.2"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center animate-pulse-subtle">
        <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
        <Mouse className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
