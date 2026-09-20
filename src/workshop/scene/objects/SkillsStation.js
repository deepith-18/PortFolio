import React, { useRef } from 'react';
import { Box, Cylinder, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Super-Realistic Skills & Tech Core Station
 * Replaces simple floating cubes with a high-tech holographic skill reactor pedestal.
 */
export default function SkillsStation({ position }) {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.6;
      coreRef.current.position.y = 1.6 + Math.sin(t * 1.5) * 0.06;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Hexagonal Milled Carbon Pedestal ────────────────────── */}
      <Cylinder args={[1.0, 1.15, 0.25, 6]} position={[0, 0.125, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Recessed Emerald Floor Ring */}
      <Ring args={[0.95, 1.05, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.255, 0]}>
        <meshBasicMaterial color="#10b981" />
      </Ring>

      {/* Slotted Tech Pillar */}
      <Cylinder args={[0.55, 0.7, 0.85, 6]} position={[0, 0.68, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#222733" metalness={0.7} roughness={0.35} />
      </Cylinder>

      {/* Glowing Vertical Circuit Traces */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, i) => (
        <Box 
          key={i} 
          args={[0.025, 0.75, 0.02]} 
          position={[Math.sin(angle) * 0.58, 0.68, Math.cos(angle) * 0.58]}
        >
          <meshBasicMaterial color="#34d399" />
        </Box>
      ))}

      {/* Pedestal Top Emissive Core Well */}
      <Cylinder args={[0.42, 0.42, 0.04, 24]} position={[0, 1.12, 0]}>
        <meshStandardMaterial color="#064e3b" emissive="#059669" emissiveIntensity={0.8} />
      </Cylinder>

      {/* ── 2. Floating Holographic Tech Reactor & Skill Polyhedra ── */}
      <group ref={coreRef} position={[0, 1.6, 0]}>
        {/* Core Octahedron / Reactor Cube */}
        <Box args={[0.35, 0.35, 0.35]}>
          <meshStandardMaterial 
            color="#059669" 
            emissive="#10b981" 
            emissiveIntensity={1.0} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </Box>

        {/* Orbiting Tech Nodes (Frontend, Backend, DevOps, AI) */}
        <Box args={[0.12, 0.12, 0.12]} position={[0.55, 0.2, 0.2]}>
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
        </Box>
        <Box args={[0.12, 0.12, 0.12]} position={[-0.55, -0.15, 0.3]}>
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.8} />
        </Box>
        <Box args={[0.12, 0.12, 0.12]} position={[0.2, -0.3, -0.55]}>
          <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.8} />
        </Box>
        <Box args={[0.12, 0.12, 0.12]} position={[-0.3, 0.35, -0.4]}>
          <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.8} />
        </Box>
      </group>

      {/* Gyroscopic Energy Rings */}
      <group ref={ringRef} position={[0, 1.6, 0]}>
        <Ring args={[0.72, 0.75, 32]}>
          <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
        </Ring>
      </group>

      {/* Emerald Tech Ambient Light */}
      <pointLight 
        position={[0, 2.0, 0]} 
        intensity={3.2} 
        color="#34d399" 
        distance={8} 
        decay={1.4} 
      />
    </group>
  );
}
