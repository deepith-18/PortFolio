import React, { useRef } from 'react';
import { Box, Cylinder, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Super-Realistic Certifications & Honors Vitrine Pedestal
 * Polished black marble base with brushed gold bezel, glass casing, and floating rotating gold credential seal.
 */
export default function CertificationsStation({ position }) {
  const trophyRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (trophyRef.current) {
      trophyRef.current.rotation.y = t * 0.5;
      trophyRef.current.position.y = 1.75 + Math.sin(t * 1.6) * 0.04;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(t) * 0.1;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Polished Black Marble & Brushed Gold Vitrine Base ──── */}
      {/* Heavy lower plinth */}
      <Box args={[1.2, 0.25, 1.2]} position={[0, 0.125, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#121418" roughness={0.2} metalness={0.8} />
      </Box>

      {/* Recessed gold floor ring */}
      <Ring args={[0.9, 0.98, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.255, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.8} />
      </Ring>

      {/* Main Vitrine Pedestal Pillar */}
      <Cylinder args={[0.45, 0.52, 0.9, 16]} position={[0, 0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1e222a" roughness={0.3} metalness={0.7} />
      </Cylinder>

      {/* Brushed Gold Collar */}
      <Cylinder args={[0.5, 0.5, 0.06, 16]} position={[0, 1.15, 0]} castShadow>
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
      </Cylinder>

      {/* ── 2. Glass Display Case ────────────────────────────────────── */}
      <Box args={[0.9, 1.1, 0.9]} position={[0, 1.72, 0]} castShadow>
        <meshStandardMaterial 
          color="#0f172a" 
          roughness={0.05} 
          metalness={0.9} 
          transparent 
          opacity={0.25} 
        />
      </Box>

      {/* ── 3. Floating Golden Trophy & Honors Medallion ────────────── */}
      <group ref={trophyRef} position={[0, 1.75, 0]}>
        {/* Floating Gold Medal Seal */}
        <Cylinder args={[0.24, 0.24, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#ffd700" 
            metalness={0.95} 
            roughness={0.1} 
            emissive="#b45309" 
            emissiveIntensity={0.4} 
          />
        </Cylinder>
        {/* Inner Medal Ring */}
        <Cylinder args={[0.18, 0.18, 0.05, 24]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Star / Crest Emblem */}
        <Box args={[0.12, 0.12, 0.06]}>
          <meshStandardMaterial color="#fff" emissive="#fde68a" emissiveIntensity={0.6} />
        </Box>
      </group>

      {/* Floating Orbiting Ring */}
      <group ref={ringRef} position={[0, 1.75, 0]}>
        <Ring args={[0.42, 0.44, 32]}>
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
        </Ring>
      </group>

      {/* Amber Warm Showcase Spotlight */}
      <pointLight 
        position={[0, 2.2, 0]} 
        intensity={3.2} 
        color="#fbbf24" 
        distance={8} 
        decay={1.4} 
      />
    </group>
  );
}
