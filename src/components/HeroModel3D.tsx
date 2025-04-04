
import React, { useRef } from 'react';

// Main component using the provided charging station image
const HeroModel3D = () => {
  // For the image display
  const imageRef = useRef<HTMLImageElement>(null);
  
  return (
    <div 
      className="h-full w-full relative overflow-hidden bg-white" // Keeping the white background
    >
      {/* Main charging station image with electric glow effect */}
      <div className="relative h-full w-full flex items-center justify-center z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Using the provided charging station image with electric glow */}
          <img 
            ref={imageRef}
            src="/lovable-uploads/a18995fa-57e7-4901-b5bd-708fd76ad058.png" 
            alt="PowerBank Charging Station"
            className="max-w-[160%] max-h-[160%] object-contain rounded-xl electric-glow"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))"
            }}
          />
        </div>
      </div>
      
      {/* Floating information card with electric blue gradient styling */}
      <div 
        className="absolute bottom-6 right-6 z-30 glass-panel-electric rounded-xl p-3 text-center backdrop-blur-md shadow-elevation-electric animate-electric-pulse"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 174, 219, 0.7), rgba(15, 87, 109, 0.7))',
          border: '1px solid rgba(51, 195, 240, 0.3)'
        }}
      />
    </div>
  );
};

export default HeroModel3D;
