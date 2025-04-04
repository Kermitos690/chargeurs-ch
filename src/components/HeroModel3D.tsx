
import React, { useRef, useState, useEffect } from 'react';

const HeroModel3D = () => {
  // Refs for parallax container
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
      style={{
        perspective: '1000px'
      }}
    >
      {/* Parallax background elements */}
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
      
      {/* Connection lines showing wireless charging technology */}
      <svg 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{
          transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <g opacity="0.3">
          <path d="M50,50 C100,100 200,120 300,180" stroke="#10B981" strokeWidth="1" fill="none" />
          <path d="M350,200 C250,150 150,90 70,60" stroke="#3B82F6" strokeWidth="1" fill="none" />
          <path d="M100,300 C200,250 250,200 350,150" stroke="#8B5CF6" strokeWidth="1" fill="none" />
        </g>
      </svg>

      {/* Charging station image with parallax effect */}
      <div 
        className="relative h-full w-full flex items-center justify-center z-20"
        style={{
          transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            ref={imageRef}
            src="/lovable-uploads/478a170b-6b38-4e9e-acf6-4aee7c34d07b.png" 
            alt="Charging Station" 
            className="max-w-full max-h-full object-contain transform scale-140 animate-float-3d"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))"
            }}
          />
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[80%] h-[80%] rounded-full bg-green-500 opacity-20 filter blur-2xl animate-pulse-glow" />
          </div>
        </div>
      </div>
      
      {/* Overlay text with parallax effect */}
      <div 
        className="absolute bottom-6 right-6 z-30 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation animate-float"
        style={{
          transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <p className="font-medium text-gradient">Nouvelle génération</p>
        <p className="text-sm text-muted-foreground">Innovation PowerBank</p>
      </div>
    </div>
  );
};

export default HeroModel3D;
