
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

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
                Solutions de recharge pour véhicules électriques
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Des solutions de recharge innovantes, fiables et accessibles pour les particuliers et les entreprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full">
                  Découvrir nos solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Contactez-nous
                </Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="glass-panel rounded-3xl overflow-hidden p-1 shadow-elevation">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MDM1OTcyOA&ixlib=rb-1.2.1&q=80&w=1600" 
                    alt="Recharge de véhicule électrique" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 backdrop-blur-md animate-fade-in shadow-elevation" style={{ animationDelay: '0.8s' }}>
                <p className="font-medium">100% Renouvelable</p>
                <p className="text-sm text-muted-foreground">Énergie verte</p>
              </div>
              
              <div className="absolute -top-6 -right-6 glass-panel rounded-2xl p-4 backdrop-blur-md animate-fade-in shadow-elevation" style={{ animationDelay: '1s' }}>
                <p className="font-medium">Certifié Suisse</p>
                <p className="text-sm text-muted-foreground">Qualité garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
