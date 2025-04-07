
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Battery, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroModel3D from './HeroModel3D';

const Hero = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current || isMobile) return;

      const {
        clientX,
        clientY
      } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      circleRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
      circleRef.current.style.transition = 'transform 0.3s ease-out';
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      <div ref={circleRef} className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/15 filter blur-[80px] -translate-y-1/2 -translate-x-1/2 animate-pulse-subtle" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 filter blur-[60px] animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-primary/10 filter blur-[70px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className={`order-2 lg:order-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="text-gradient">Fini les achats</span> de batteries portables ! 
                <span className="block mt-2">Passez à la location !</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Des solutions de recharge innovantes, fiables et accessibles pour vos smartphones et appareils électroniques dans tout le canton de Vaud.
              </p>
              
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Battery className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Charge ultra-rapide</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Technologie innovante pour smartphones</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full group transition-all duration-300 hover:pr-7" asChild>
                  <Link to="/produits">
                    Découvrir nos solutions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full transition-all duration-300 hover:bg-primary/10" asChild>
                  <Link to="/stations">
                    <MapPin className="mr-2 h-4 w-4" />
                    Nos bornes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative h-[400px]">
              <div className="glass-panel rounded-3xl overflow-hidden h-full p-1 shadow-elevation transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
                <div className="rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 h-full relative">
                  <HeroModel3D />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent mix-blend-overlay" />
                </div>
              </div>
              
              <div 
                className="absolute -bottom-6 -left-6 glass-panel rounded-2xl p-4 backdrop-blur-md shadow-elevation transition-all duration-500"
                style={{ 
                  animation: `fade-in 0.5s ease-out forwards ${isVisible ? '0.8s' : '0s'}`,
                  opacity: 0,
                  transform: 'translateY(10px)' 
                }}
              >
                <p className="font-medium">100% Disponible</p>
                <p className="text-sm text-muted-foreground">Powerbanks prêts à l'emploi</p>
              </div>
              
              <div 
                className="absolute -top-6 -right-6 glass-panel rounded-2xl p-4 backdrop-blur-md shadow-elevation transition-all duration-500"
                style={{ 
                  animation: `fade-in 0.5s ease-out forwards ${isVisible ? '1s' : '0s'}`,
                  opacity: 0,
                  transform: 'translateY(10px)' 
                }}
              >
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
