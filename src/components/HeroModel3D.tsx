
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PowerIcon, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Main component using the provided charging station image
const HeroModel3D = () => {
  // For the image display with parallax effects
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle mouse movement for container parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x: x - 0.5, y: y - 0.5 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle reset power bank and open station
  const handleOpenStation = () => {
    setIsLoading(true);
    toast.success("Ouverture de la station en cours...");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("La station est ouverte et les powerbanks ont été réinitialisés!");
    }, 2000);
  };

  return (
    <div 
      ref={containerRef} 
      className="h-full w-full relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background elements with parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-green-400 filter blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-500 filter blur-xl" />
      </div>
      
      {/* Main charging station image with parallax and animation effects */}
      <div 
        className="relative h-full w-full flex items-center justify-center z-20"
        style={{
          transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Using the provided charging station image - increased by 160% */}
          <img 
            ref={imageRef}
            src="/lovable-uploads/a18995fa-57e7-4901-b5bd-708fd76ad058.png" 
            alt="PowerBank Charging Station"
            className="max-w-[160%] max-h-[160%] object-contain rounded-xl animate-float-slow shadow-2xl"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))"
            }}
          />
          
          {/* Overlay effect with green glow matching the image - increased to match image size */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[128%] h-[128%] rounded-full bg-green-500 opacity-20 filter blur-2xl animate-pulse-glow" />
          </div>
        </div>
      </div>
      
      {/* Primary CTA for resetting/opening station */}
      <div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40"
        style={{
          transform: `translateX(calc(-50% + ${mousePosition.x * -15}px)) translateY(${mousePosition.y * -15}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <Button 
          size="lg" 
          className="rounded-full px-6 py-6 h-auto bg-green-600 hover:bg-green-700 animate-green-glow shadow-lg flex items-center gap-3"
          onClick={handleOpenStation}
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <PowerIcon className="h-5 w-5" />
          )}
          <span className="font-bold text-base">{isLoading ? "Ouverture en cours..." : "Ouvrir la Station & Réinitialiser"}</span>
        </Button>
      </div>
      
      {/* Floating information card - updated to remove the "4 PowerBanks disponibles" text */}
      <div 
        className="absolute bottom-6 right-6 z-30 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation animate-float"
        style={{
          transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
          transition: 'transform 0.15s ease-out',
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid rgba(0, 255, 0, 0.3)'
        }}
      >
        <p className="font-medium text-white">
          <span className="text-green-500 font-bold">RENT</span> A POWERBANK
        </p>
      </div>
    </div>
  );
};

export default HeroModel3D;
