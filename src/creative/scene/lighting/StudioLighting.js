import React from 'react';
import { Environment } from '@react-three/drei';

export default function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Key Light: warm, soft, roughly 3000K, positioned to cast long gentle shadows */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.2} 
        color="#ffe8cc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      
      {/* Fill Light: cooler, dim, opposite to key light to fill in harsh shadows */}
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
        color="#e0edff"
      />
      
      {/* Rim Light: sharp, highlights edges from behind */}
      <spotLight 
        position={[0, 5, -8]} 
        intensity={0.8} 
        color="#ffffff" 
        angle={0.6} 
        penumbra={0.5} 
      />

      {/* Environment preset for premium reflections (fallback to studio) */}
      <Environment preset="studio" />
    </>
  );
}
