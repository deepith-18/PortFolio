import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Octahedron } from '@react-three/drei';

export default function EasterEgg({ position }) {
  const eggRef = useRef();

  useFrame((state) => {
    if (eggRef.current) {
      eggRef.current.rotation.y += 0.01;
      eggRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={position} ref={eggRef}>
      <Octahedron args={[0.08]} castShadow>
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
      </Octahedron>
      <pointLight distance={1} intensity={0.5} color="#00ffcc" />
    </group>
  );
}
