
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const PowerBankModel = () => {
  // Model refs
  const meshRef = useRef<THREE.Mesh>(null);
  const batteryLevelRef = useRef<THREE.Mesh>(null);
  const brandTextRef = useRef<THREE.Mesh>(null);
  
  // Battery animation state
  const [batteryLevel, setBatteryLevel] = useState(0.5);
  const [chargingUp, setChargingUp] = useState(true);
  
  // Parallax effect based on mouse movement
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation based on mouse movement
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (state.mouse.x * Math.PI) / 5,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (state.mouse.y * Math.PI) / 10,
      0.05
    );
    
    // Animate battery level for charging effect
    if (batteryLevelRef.current) {
      if (chargingUp) {
        setBatteryLevel(prev => {
          const newLevel = prev + 0.003;
          if (newLevel >= 0.95) setChargingUp(false);
          return Math.min(newLevel, 0.95);
        });
      } else {
        setBatteryLevel(prev => {
          const newLevel = prev - 0.002;
          if (newLevel <= 0.4) setChargingUp(true);
          return Math.max(newLevel, 0.4);
        });
      }
      
      // Update battery indicator height
      batteryLevelRef.current.scale.y = batteryLevel;
      batteryLevelRef.current.position.y = -0.9 + batteryLevel * 0.9;
      
      // Update battery color based on charge level
      const material = batteryLevelRef.current.material as THREE.MeshBasicMaterial;
      material.color.setHSL(0.33 * batteryLevel, 0.9, 0.6); // Green to yellow-green
    }
  });

  // Creating parallax lightning effect
  const ChargeParticles = () => {
    const particlesRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
      if (!particlesRef.current) return;
      
      // Subtle floating movement
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Rotate based on mouse with parallax effect
      particlesRef.current.rotation.y = THREE.MathUtils.lerp(
        particlesRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 15,
        0.02
      );
    });
    
    return (
      <group ref={particlesRef} position={[0, 0, 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 2.5,
              (Math.random() - 0.5) * 0.3 + 0.4
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial 
              color={chargingUp ? "#10B981" : "#60A5FA"} 
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    );
  };

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={[0, 0, 0]}
      // Increase the size by 40% by applying a scale of 1.4
      scale={[1.4, 1.4, 1.4]}
    >
      {/* Main power bank body */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.2, 2.5, 0.5]} />
        <meshStandardMaterial 
          color="#3B82F6" 
          roughness={0.3}
          metalness={0.8}
          emissive="#1E40AF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Battery level indicator with dynamic scale */}
      <mesh 
        ref={batteryLevelRef} 
        position={[0, -0.9 + batteryLevel * 0.9, 0.26]} 
        scale={[1, batteryLevel, 1]}
      >
        <boxGeometry args={[0.8, 1.8, 0.02]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>

      {/* Charging port */}
      <mesh position={[0, -1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#1F2937" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Brand text position */}
      <mesh ref={brandTextRef} position={[0, -0.9, 0.26]}>
        <boxGeometry args={[0.8, 0.3, 0.01]} />
        <meshBasicMaterial color="#F9FAFB" />
      </mesh>
      
      {/* Charge particles for electricity effect */}
      <ChargeParticles />
      
      {/* Power indicator light */}
      <mesh position={[0.4, 1.1, 0.26]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={chargingUp ? "#10B981" : "#60A5FA"} />
      </mesh>
    </Float>
  );
};

const HeroModel3D = () => {
  // Refs for parallax container
  const containerRef = useRef<HTMLDivElement>(null);
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

      <Canvas
        className="z-20"
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 35 }}
        style={{
          transform: `translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <color attach="background" args={['#f8fafc']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <PowerBankModel />
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
      
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
