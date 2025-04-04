
import React, { useRef } from 'react';

// Main component using the provided charging station image
const HeroModel3D = () => {
  // For the image display
  const imageRef = useRef<HTMLImageElement>(null);
  
  return (
    <div 
      className="h-full w-full relative overflow-hidden bg-white" // Keeping the white background
    >
      {/* Main charging station image without parallax and animation effects */}
      <div className="relative h-full w-full flex items-center justify-center z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Using the provided charging station image - static at 160% size */}
          <img 
            ref={imageRef}
            src="/lovable-uploads/a18995fa-57e7-4901-b5bd-708fd76ad058.png" 
            alt="PowerBank Charging Station"
            className="max-w-[160%] max-h-[160%] object-contain rounded-xl shadow-2xl"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))"
            }}
          />
        </div>
      </div>
      
      {/* Floating information card */}
      <div 
        className="absolute bottom-6 right-6 z-30 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation"
        style={{
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
