
import React, { useRef, useState, useEffect } from 'react';

// Main component - now using a static image instead of 3D model
const HeroModel3D = () => {
  // For the image display with parallax effects
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 filter blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-green-400 filter blur-xl" />
      </div>
      
      {/* Main station image with parallax and animation effects */}
      <div 
        className="relative h-full w-full flex items-center justify-center z-20"
        style={{
          transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Using the last station image */}
          <img 
            ref={imageRef}
            src="/stations/couronne-or.jpg" 
            alt="Station de PowerBank"
            className="max-w-full max-h-full object-cover rounded-xl animate-float-slow shadow-2xl"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))"
            }}
          />
          
          {/* Overlay effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[80%] h-[80%] rounded-full bg-primary opacity-20 filter blur-2xl animate-pulse-glow" />
          </div>
        </div>
      </div>
      
      {/* Floating information card */}
      <div 
        className="absolute bottom-6 right-6 z-30 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation animate-float"
        style={{
          transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <p className="font-medium text-gradient">Station Couronne d'Or</p>
        <p className="text-sm text-muted-foreground">5 PowerBanks disponibles</p>
      </div>
    </div>
  );
};

export default HeroModel3D;
