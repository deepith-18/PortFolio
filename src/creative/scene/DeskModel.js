import React from 'react';

export default function DeskModel() {
  return (
    <mesh receiveShadow position={[0, -0.5, 0]}>
      {/* A large box to represent the desk surface */}
      <boxGeometry args={[15, 1, 10]} />
      <meshStandardMaterial 
        color="#3d2817" // Dark, warm wood color fallback
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}
