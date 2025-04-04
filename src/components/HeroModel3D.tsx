
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Animated background particles
const ParticlesBackground = () => {
  const particlesCount = 200;
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < particlesCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 10, // x
        (Math.random() - 0.5) * 10, // y
        (Math.random() - 0.5) * 10  // z
      );
    }
    return new Float32Array(positions);
  }, [particlesCount]);

  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      pointsRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Floating PowerBank model
const PowerBankModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 0.4, 2]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.7}
        roughness={0.2}
      />
      
      {/* LED indicator */}
      <mesh position={[0.4, 0.21, 0.8]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* USB Ports */}
      <mesh position={[0, 0.1, 0.9]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Mobile Phone Connector */}
      <mesh position={[0, 0.15, 1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </mesh>
  );
};

// Energy flow animation
const EnergyFlow = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 100;
  
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle = (Math.PI * 2 / particlesCount) * i;
      const radius = 2;
      pos.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.3,
        0
      );
    }
    return new Float32Array(pos);
  }, [particlesCount]);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#10b981"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Scene setup with camera controls
const Scene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <PowerBankModel />
      <ParticlesBackground />
      <EnergyFlow />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      <Environment preset="city" />
    </>
  );
};

// Main component
const HeroModel3D = () => {
  // For the traditional image display
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show3D, setShow3D] = useState(true);
  
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
  
  // Toggle between 3D and 2D on click (for mobile devices where 3D might be heavy)
  const toggleView = () => {
    setShow3D(!show3D);
  };

  return (
    <div 
      ref={containerRef} 
      className="h-full w-full relative overflow-hidden cursor-pointer"
      onClick={toggleView}
      style={{ perspective: '1000px' }}
    >
      {show3D ? (
        <div className="absolute inset-0 z-10">
          <Canvas
            className="canvas-three-background"
            dpr={[1, 2]}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
          >
            <Scene />
          </Canvas>
          
          <div className="absolute bottom-2 right-2 text-xs text-white/50 backdrop-blur-sm px-2 py-1 rounded-full">
            Tap to switch view
          </div>
        </div>
      ) : (
        <>
          {/* Static image fallback with parallax */}
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
                alt="PowerBank" 
                className="max-w-full max-h-full object-contain transform scale-140 animate-float-3d"
                style={{
                  filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))"
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[80%] h-[80%] rounded-full bg-green-500 opacity-20 filter blur-2xl animate-pulse-glow" />
              </div>
            </div>
          </div>
          
          <div 
            className="absolute bottom-6 right-6 z-30 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation animate-float"
            style={{
              transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <p className="font-medium text-gradient">Nouvelle génération</p>
            <p className="text-sm text-muted-foreground">Location de PowerBank</p>
          </div>
          
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground backdrop-blur-sm px-2 py-1 rounded-full">
            Tap to switch view
          </div>
        </>
      )}
    </div>
  );
};

export default HeroModel3D;
