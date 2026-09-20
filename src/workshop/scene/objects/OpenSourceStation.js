import React, { useRef } from 'react';
import { Box, Cylinder, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Super-Realistic Open Source Hub Station
 * Enterprise server rack cluster with blinking telemetry blades and rotating holographic git graph.
 */
export default function OpenSourceStation({ position }) {
  const gitHoloRef = useRef();
  const ledRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (gitHoloRef.current) {
      gitHoloRef.current.rotation.y = t * 0.4;
      gitHoloRef.current.position.y = 1.9 + Math.sin(t * 1.5) * 0.04;
    }
    if (ledRef.current) {
      ledRef.current.material.emissiveIntensity = Math.sin(t * 6) > 0.2 ? 1.2 : 0.3;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Enterprise Server Cabinet ────────────────────────────── */}
      <Box args={[1.4, 2.4, 0.9]} position={[0, 1.2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#16181f" metalness={0.8} roughness={0.3} />
      </Box>

      {/* Smoked Acrylic Front Door */}
      <Box args={[1.32, 2.3, 0.04]} position={[0, 1.2, 0.46]}>
        <meshStandardMaterial 
          color="#0f1118" 
          metalness={0.9} 
          roughness={0.15} 
          transparent 
          opacity={0.7} 
        />
      </Box>

      {/* Server Chassis Blades */}
      {[0.4, 0.8, 1.2, 1.6, 2.0].map((y, i) => (
        <group key={i} position={[0, y, 0.42]}>
          <Box args={[1.2, 0.28, 0.06]}>
            <meshStandardMaterial color="#222631" metalness={0.7} roughness={0.4} />
          </Box>
          {/* Air intake mesh line */}
          <Box args={[0.9, 0.04, 0.02]} position={[-0.1, 0, 0.035]}>
            <meshBasicMaterial color="#0c0e12" />
          </Box>
          {/* Status LEDs */}
          <Box args={[0.02, 0.02, 0.01]} position={[0.48, 0.05, 0.035]}>
            <meshBasicMaterial color={i % 2 === 0 ? '#10b981' : '#38bdf8'} />
          </Box>
          <Box args={[0.02, 0.02, 0.01]} position={[0.52, 0.05, 0.035]}>
            <meshBasicMaterial color="#8b5cf6" />
          </Box>
        </group>
      ))}

      {/* Main Cluster Heartbeat LED */}
      <Box ref={ledRef} args={[0.06, 0.06, 0.02]} position={[-0.52, 2.2, 0.46]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.0} />
      </Box>

      {/* ── 2. Floating Holographic Git Commit Graph ─────────────────── */}
      <group ref={gitHoloRef} position={[0, 1.9, 0.85]}>
        {/* Main Git Branch Node */}
        <Cylinder args={[0.08, 0.08, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.0} />
        </Cylinder>
        <Ring args={[0.18, 0.2, 24]}>
          <meshBasicMaterial color="#c084fc" />
        </Ring>

        {/* Feature Branch Nodes */}
        <Cylinder args={[0.05, 0.05, 0.03, 16]} position={[-0.32, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
        </Cylinder>
        <Box args={[0.35, 0.015, 0.015]} position={[-0.16, 0.11, 0]} rotation={[0, 0, -0.6]}>
          <meshBasicMaterial color="#818cf8" />
        </Box>

        <Cylinder args={[0.05, 0.05, 0.03, 16]} position={[0.32, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.9} />
        </Cylinder>
        <Box args={[0.35, 0.015, 0.015]} position={[0.16, 0.09, 0]} rotation={[0, 0, 0.6]}>
          <meshBasicMaterial color="#818cf8" />
        </Box>
      </group>

      {/* Ambient Violet Glow */}
      <pointLight 
        position={[0, 1.8, 0.8]} 
        intensity={3.2} 
        color="#a855f7" 
        distance={8} 
        decay={1.4} 
      />
    </group>
  );
}
