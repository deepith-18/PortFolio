import React, { useRef } from 'react';
import { Box, Cylinder, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Super-Realistic Holographic Developer Command Console
 * Replaces the old makeshift board with an architectural tech centerpiece.
 */
export default function AdditionalInfoStation({ position }) {
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const pulseRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.4;
    if (ringRef2.current) ringRef2.current.rotation.z = -t * 0.3;
    if (pulseRef.current) {
      pulseRef.current.position.y = 1.65 + Math.sin(t * 1.8) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* ── 1. Heavy Milled Titanium Octagonal Pedestal Base ── */}
      <Cylinder args={[0.9, 1.05, 0.22, 16]} position={[0, 0.11, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Recessed Glowing Base Ring */}
      <Ring args={[0.92, 1.02, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.225, 0]}>
        <meshBasicMaterial color="#06b6d4" />
      </Ring>

      {/* Main Console Pillar */}
      <Cylinder args={[0.42, 0.55, 0.85, 12]} position={[0, 0.65, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#232731" metalness={0.7} roughness={0.35} />
      </Cylinder>

      {/* Vertical LED Inset Stripes on Pedestal */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <Box 
          key={i} 
          args={[0.02, 0.75, 0.02]} 
          position={[Math.sin(angle) * 0.44, 0.65, Math.cos(angle) * 0.44]}
        >
          <meshBasicMaterial color="#38bdf8" />
        </Box>
      ))}

      {/* Angled Control Console Desk Surface */}
      <group position={[0, 1.08, 0]} rotation={[-0.22, 0, 0]}>
        <Box args={[1.3, 0.06, 0.7]} castShadow receiveShadow>
          <meshStandardMaterial color="#171920" metalness={0.85} roughness={0.25} />
        </Box>

        {/* Smoked Glass Interface Panel */}
        <Box args={[1.22, 0.015, 0.62]} position={[0, 0.035, 0]}>
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.9} 
            roughness={0.15} 
            emissive="#082f49" 
            emissiveIntensity={0.5} 
          />
        </Box>

        {/* Touch HUD Display Wireframes / Status Lines */}
        <Box args={[0.5, 0.005, 0.02]} position={[-0.3, 0.046, -0.15]}>
          <meshBasicMaterial color="#38bdf8" />
        </Box>
        <Box args={[0.4, 0.005, 0.015]} position={[-0.35, 0.046, -0.08]}>
          <meshBasicMaterial color="#06b6d4" />
        </Box>
        <Box args={[0.45, 0.005, 0.015]} position={[-0.32, 0.046, -0.01]}>
          <meshBasicMaterial color="#38bdf8" />
        </Box>

        {/* System Status Indicators (Pulsing Green / Blue LEDs) */}
        <Box args={[0.04, 0.01, 0.04]} position={[0.45, 0.046, -0.2]}>
          <meshBasicMaterial color="#10b981" />
        </Box>
        <Box args={[0.04, 0.01, 0.04]} position={[0.52, 0.046, -0.2]}>
          <meshBasicMaterial color="#38bdf8" />
        </Box>
      </group>

      {/* ── 2. Floating 3D Holographic Projection Display ────── */}
      <group ref={pulseRef} position={[0, 1.65, 0]}>
        {/* Hologram Emitter Lens */}
        <Cylinder args={[0.18, 0.22, 0.04, 16]} position={[0, -0.32, 0]}>
          <meshBasicMaterial color="#06b6d4" />
        </Cylinder>

        {/* Rotating Telemetry Ring 1 */}
        <group ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
          <Ring args={[0.62, 0.64, 32]}>
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </Ring>
        </group>

        {/* Counter-Rotating Telemetry Ring 2 */}
        <group ref={ringRef2} rotation={[-Math.PI / 3, 0, 0]}>
          <Ring args={[0.54, 0.55, 32]}>
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} />
          </Ring>
        </group>

        {/* Holographic Header Panel */}
        <Box args={[1.35, 0.36, 0.01]} position={[0, 0.12, 0]}>
          <meshStandardMaterial 
            color="#0284c7" 
            emissive="#0284c7" 
            emissiveIntensity={0.8} 
            transparent 
            opacity={0.35} 
            roughness={0.1}
          />
        </Box>
        {/* Hologram Glowing Border */}
        <Box args={[1.38, 0.015, 0.02]} position={[0, 0.3, 0]}><meshBasicMaterial color="#38bdf8" /></Box>
        <Box args={[1.38, 0.015, 0.02]} position={[0, -0.06, 0]}><meshBasicMaterial color="#38bdf8" /></Box>
        <Box args={[0.015, 0.36, 0.02]} position={[-0.68, 0.12, 0]}><meshBasicMaterial color="#38bdf8" /></Box>
        <Box args={[0.015, 0.36, 0.02]} position={[0.68, 0.12, 0]}><meshBasicMaterial color="#38bdf8" /></Box>

        {/* Hologram Text Simulation Blocks (Clean High-Tech Lines) */}
        <Box args={[0.7, 0.04, 0.015]} position={[-0.2, 0.2, 0.01]}><meshBasicMaterial color="#ffffff" /></Box>
        <Box args={[0.85, 0.02, 0.015]} position={[-0.12, 0.12, 0.01]}><meshBasicMaterial color="#7dd3fc" /></Box>
        <Box args={[0.9, 0.015, 0.015]} position={[-0.1, 0.04, 0.01]}><meshBasicMaterial color="#38bdf8" /></Box>
      </group>

      {/* Downward Console Floor Glow */}
      <pointLight 
        position={[0, 1.4, 0]} 
        intensity={2.8} 
        color="#38bdf8" 
        distance={6} 
        decay={1.6} 
      />
    </group>
  );
}
