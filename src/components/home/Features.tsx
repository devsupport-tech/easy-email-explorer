
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Layers, Sparkles, Shield, Leaf, Zap } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="glass-card p-6 rounded-xl transition-all duration-700 transform opacity-0 translate-y-10"
    >
      <div className="mb-4 bg-accent/10 p-3 rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Minimalist Design",
      description: "Clean aesthetics with every element serving a purpose, eliminating visual clutter and distractions.",
      icon: <Layers className="h-6 w-6 text-accent" />,
    },
    {
      title: "Intuitive Experience",
      description: "Natural, intuitive interfaces that feel familiar and require minimal learning for users.",
      icon: <Sparkles className="h-6 w-6 text-accent" />,
    },
    {
      title: "Robust Protection",
      description: "Built with security at its core, keeping your data safe without compromising on usability.",
      icon: <Shield className="h-6 w-6 text-accent" />,
    },
    {
      title: "Sustainable Approach",
      description: "Environmentally conscious design with long-lasting quality that reduces waste and consumption.",
      icon: <Leaf className="h-6 w-6 text-accent" />,
    },
    {
      title: "High Performance",
      description: "Optimized for speed and efficiency, delivering smooth interactions and fast response times.",
      icon: <Zap className="h-6 w-6 text-accent" />,
    },
    {
      title: "Quality Assurance",
      description: "Meticulously tested to ensure consistent performance and reliability across all situations.",
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
    },
  ];

  return (
    <section id="features" className="section-padding bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Less, but <span className="text-gradient">better</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Our design philosophy embraces simplicity and removes the unnecessary, allowing the essential to shine through with perfect clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title} 
              description={feature.description} 
              icon={feature.icon}
              delay={100 * index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <CustomButton variant="outline" size="lg">
            Explore All Features
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Features;
