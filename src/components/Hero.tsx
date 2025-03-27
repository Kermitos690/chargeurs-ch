
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      // Get cursor position relative to the viewport
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      // Apply parallax effect
      circleRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Gradient background elements */}
      <div 
        ref={circleRef}
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 filter blur-[80px] -translate-y-1/2 -translate-x-1/2 animate-pulse-subtle"
      />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/15 filter blur-[60px] animate-float" />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Location de Powerbanks à Portée de Main
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Ne laissez plus jamais votre batterie vous lâcher. Trouvez une borne et empruntez une powerbank en quelques secondes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/stations">
                  <Button size="lg" className="rounded-full">
                    Trouver une borne
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/subscriptions">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Nos abonnements
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="glass-panel rounded-3xl overflow-hidden p-1 shadow-elevation">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80" 
                    alt="Location de powerbank portable" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 backdrop-blur-md animate-fade-in shadow-elevation" style={{ animationDelay: '0.8s' }}>
                <p className="font-medium">100+ Bornes</p>
                <p className="text-sm text-muted-foreground">Partout en Suisse</p>
              </div>
              
              <div className="absolute -top-6 -right-6 glass-panel rounded-2xl p-4 backdrop-blur-md animate-fade-in shadow-elevation" style={{ animationDelay: '1s' }}>
                <p className="font-medium">24/7 Disponible</p>
                <p className="text-sm text-muted-foreground">À tout moment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
