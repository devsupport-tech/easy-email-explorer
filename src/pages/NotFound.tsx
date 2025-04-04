
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="inline-block font-mono text-accent text-xl mb-6">404</div>
        <h1 className="text-4xl md:text-5xl font-medium mb-6">Page not found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          We couldn't find the page you were looking for. Perhaps it's been moved or renamed.
        </p>
        <Link to="/">
          <CustomButton variant="gradient" size="lg" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </CustomButton>
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
