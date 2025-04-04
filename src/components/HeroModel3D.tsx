
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const PowerBankModel = () => {
  // Simple box model to represent a power bank
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (state.mouse.x * Math.PI) / 10,
      0.1
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (state.mouse.y * Math.PI) / 10,
      0.1
    );
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={1}
    >
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

      {/* Battery level indicator */}
      <mesh position={[0, 0.2, 0.26]}>
        <boxGeometry args={[0.8, 1.8, 0.02]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>

      {/* Brand text position */}
      <mesh position={[0, -0.9, 0.26]}>
        <boxGeometry args={[0.8, 0.3, 0.01]} />
        <meshBasicMaterial color="#F9FAFB" />
      </mesh>
    </Float>
  );
};

const HeroModel3D = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 35 }}
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
      
      {/* Overlay text */}
      <div className="absolute bottom-6 right-6 z-10 glass-panel rounded-xl p-3 text-center backdrop-blur-md shadow-elevation animate-float">
        <p className="font-medium text-gradient">Nouvelle génération</p>
        <p className="text-sm text-muted-foreground">Innovation PowerBank</p>
      </div>
    </div>
  );
};

export default HeroModel3D;
