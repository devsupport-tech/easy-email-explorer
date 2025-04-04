
import React, { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  isActive: boolean;
}

const testimonials = [
  {
    quote: "The thoughtful design of this product has simplified my daily routine. Every detail feels intentional and considered.",
    author: "Alex Morgan",
    role: "Design Director",
    company: "Artisan Studios"
  },
  {
    quote: "I've never experienced technology that feels so intuitive. It's like it anticipates what I need before I even realize it.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "Horizon Tech"
  },
  {
    quote: "Beautiful, functional, and durable. This is what happens when designers truly understand the needs of their users.",
    author: "Michael Rivera",
    role: "Creative Lead",
    company: "Elysium Design"
  }
];

const Testimonial = ({ quote, author, role, company, isActive }: TestimonialProps) => (
  <div 
    className={`transition-all duration-700 ease-apple absolute inset-0 flex flex-col justify-center ${
      isActive ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-20 z-0'
    }`}
  >
    <Quote className="h-12 w-12 text-accent/20 mb-6" />
    <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light mb-8 max-w-2xl">
      "{quote}"
    </p>
    <div>
      <p className="font-medium text-lg">{author}</p>
      <p className="text-muted-foreground">
        {role}, {company}
      </p>
    </div>
  </div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  return (
    <section id="testimonials" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            What people are <span className="text-gradient">saying</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our users' experiences reflect our commitment to creating products that seamlessly integrate into their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Quotes */}
          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                isActive={activeIndex === index}
              />
            ))}
            
            {/* Pagination */}
            <div className="absolute bottom-0 left-0 flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index 
                      ? 'bg-accent w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative Image */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 rounded-2xl overflow-hidden animate-float">
                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/5 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    <div className="w-2/3 h-2/3 rounded-full bg-white shadow-elevated z-10 animate-pulse-subtle"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-xl bg-accent/20 blur-sm"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
