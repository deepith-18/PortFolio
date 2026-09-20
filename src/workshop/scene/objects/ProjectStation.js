import React, { useRef } from 'react';
import { Box, Cylinder, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Super-Realistic Projects Exhibition Station
 * Features an ultrawide developer command rig with glowing code displays and rotating holographic node.
 */
export default function ProjectStation({ position }) {
  const holoRef = useRef();

  useFrame((state) => {
    if (holoRef.current) {
      holoRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      holoRef.current.position.y = 2.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Architectural Heavy Desk Rig ────────────────────────── */}
      {/* Carbon & titanium desktop */}
      <Box args={[2.6, 0.08, 1.1]} position={[0, 0.76, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e222b" metalness={0.7} roughness={0.3} />
      </Box>

      {/* Slat wood underside modesty panel */}
      <Box args={[2.4, 0.65, 0.04]} position={[0, 0.38, -0.42]} castShadow>
        <meshStandardMaterial color="#8a5c30" roughness={0.6} />
      </Box>

      {/* Dual Heavy Matte Black Steel Legs */}
      <Box args={[0.08, 0.72, 0.9]} position={[-1.15, 0.36, 0]} castShadow>
        <meshStandardMaterial color="#121418" metalness={0.8} roughness={0.4} />
      </Box>
      <Box args={[0.08, 0.72, 0.9]} position={[1.15, 0.36, 0]} castShadow>
        <meshStandardMaterial color="#121418" metalness={0.8} roughness={0.4} />
      </Box>

      {/* ── 2. Curved Ultrawide Studio Display Array ───────────────── */}
      {/* Heavy display arm mount */}
      <Cylinder args={[0.04, 0.04, 0.5, 12]} position={[0, 1.05, -0.32]} castShadow>
        <meshStandardMaterial color="#121418" metalness={0.9} />
      </Cylinder>

      {/* Center 34" Ultrawide Display */}
      <group position={[0, 1.35, -0.28]}>
        {/* Bezel frame */}
        <Box args={[1.8, 0.75, 0.04]} castShadow>
          <meshStandardMaterial color="#181a20" metalness={0.8} roughness={0.2} />
        </Box>
        {/* OLED Screen Surface */}
        <Box args={[1.74, 0.69, 0.01]} position={[0, 0, 0.02]}>
          <meshStandardMaterial 
            color="#09182a" 
            emissive="#0284c7" 
            emissiveIntensity={0.6} 
            roughness={0.1}
          />
        </Box>
        {/* Code terminal simulated editor rows */}
        <Box args={[0.8, 0.018, 0.015]} position={[-0.4, 0.22, 0.03]}><meshBasicMaterial color="#38bdf8" /></Box>
        <Box args={[0.6, 0.018, 0.015]} position={[-0.5, 0.14, 0.03]}><meshBasicMaterial color="#a78bfa" /></Box>
        <Box args={[0.9, 0.018, 0.015]} position={[-0.35, 0.06, 0.03]}><meshBasicMaterial color="#34d399" /></Box>
        <Box args={[0.5, 0.018, 0.015]} position={[-0.55, -0.02, 0.03]}><meshBasicMaterial color="#f472b6" /></Box>
        <Box args={[0.7, 0.018, 0.015]} position={[-0.45, -0.1, 0.03]}><meshBasicMaterial color="#fbbf24" /></Box>
      </group>

      {/* ── 3. Desktop Accessories (Keyboard, Trackpad, Studio Sound) ─ */}
      {/* Felt desk mat */}
      <Box args={[1.4, 0.006, 0.5]} position={[0, 0.804, 0.1]} receiveShadow>
        <meshStandardMaterial color="#181a1f" roughness={0.9} />
      </Box>
      {/* Mechanical 75% Keyboard */}
      <Box args={[0.38, 0.018, 0.14]} position={[-0.1, 0.815, 0.14]} castShadow>
        <meshStandardMaterial color="#2d3139" metalness={0.5} roughness={0.4} />
      </Box>
      {/* Ergonomic Wireless Mouse */}
      <Box args={[0.07, 0.025, 0.11]} position={[0.26, 0.815, 0.14]} castShadow>
        <meshStandardMaterial color="#1a1d24" metalness={0.4} roughness={0.3} />
      </Box>

      {/* ── 4. Floating Holographic Project Emblem ───────────────────── */}
      <group ref={holoRef} position={[0, 2.2, -0.28]}>
        <Ring args={[0.22, 0.25, 24]}>
          <meshBasicMaterial color="#38bdf8" />
        </Ring>
        <Box args={[0.16, 0.16, 0.16]}>
          <meshStandardMaterial 
            color="#0284c7" 
            emissive="#38bdf8" 
            emissiveIntensity={0.8} 
            metalness={0.8} 
            roughness={0.2}
          />
        </Box>
      </group>

      {/* Downward Project Light Wash */}
      <pointLight 
        position={[0, 2.4, 0]} 
        intensity={3.2} 
        color="#60a5fa" 
        distance={9} 
        decay={1.4} 
      />
    </group>
  );
}
