// src/components/LaptopBackground.js
// Infinite light room environment: fog, clean grid floor, studio lighting, floating glass/chrome objects

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Floating glass-like wireframe cube ─── */
function FloatingCube({ position, scale = 0.35, color = '#94a3b8', rotSpeed = [0.25, 0.4, 0.15] }) {
  const meshRef = useRef();
  const t0 = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime + t0.current;
    meshRef.current.rotation.x += rotSpeed[0] * 0.01;
    meshRef.current.rotation.y += rotSpeed[1] * 0.01;
    meshRef.current.rotation.z += rotSpeed[2] * 0.01;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.45) * 0.18;
    meshRef.current.material.opacity = 0.35 + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

/* ─── Floating glass-like wireframe sphere ─── */
function FloatingSphere({ position, scale = 0.45, color = '#64748b' }) {
  const meshRef = useRef();
  const t0 = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime + t0.current;
    meshRef.current.rotation.y += 0.006;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.38) * 0.22;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 10, 7]} />
      <meshStandardMaterial
        color={color}
        wireframe
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

/* ─── Floating glass-like code panel ─── */
function CodePanel({ position, rotation = [0, 0, 0] }) {
  const meshRef = useRef();
  const t0 = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime + t0.current;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.32) * 0.12;
    meshRef.current.material.opacity = 0.08 + Math.sin(t * 0.65) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[0.75, 0.48]} />
      <meshStandardMaterial
        color="#cbd5e1"
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Grid floor with subtle light office slate aesthetic ─── */
function GridFloor() {
  return (
    <>
      {/* Primary grid - electric blue */}
      <gridHelper
        args={[60, 60, '#00f0ff', '#030712']}
        position={[0, -0.07, 0]}
      />
      {/* Larger secondary grid for depth */}
      <gridHelper
        args={[60, 12, '#1e3a8a', '#0f172a']}
        position={[0, -0.071, 0]}
      />
    </>
  );
}

/* ─── Ground glow plane ─── */
function GroundGlow() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.material.opacity = 0.18 + Math.sin(clock.elapsedTime * 0.4) * 0.04;
  });
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.068, 0]}>
      <planeGeometry args={[12, 8]} />
      <meshStandardMaterial
        color="#0284c7"
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

export default function LaptopBackground() {
  return (
    <>
      {/* Cyber Space Blue studio fog */}
      <fog attach="fog" args={['#030712', 10, 30]} />

      {/* ─── Lighting setup ─── */}
      {/* Sky-blue ambient fill */}
      <ambientLight intensity={0.7} color="#bae6fd" />

      {/* Main key spotlight from top-front-right */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Soft electric cyan light bounce from front-left */}
      <pointLight position={[-6, 4, 3]} intensity={1.2} color="#00f0ff" distance={20} decay={2} />

      {/* Cool royal blue light bounce from back-right */}
      <pointLight position={[6, 4, -3]} intensity={0.8} color="#0284c7" distance={20} decay={2} />

      {/* Subtle floor backlight */}
      <pointLight position={[0, -1, 0]} intensity={0.3} color="#1e3a8a" distance={6} decay={2} />

      {/* ─── Floor ─── */}
      <GridFloor />
      <GroundGlow />

      {/* ─── Floating glass/chrome objects ─── */}
      {/* Left cluster */}
      <FloatingCube
        position={[-5.5, 2.2, -4.5]}
        scale={0.38}
        color="#00f0ff"
        rotSpeed={[0.18, 0.42, 0.12]}
      />
      <FloatingCube
        position={[-4.0, 3.8, -7.0]}
        scale={0.55}
        color="#60a5fa"
        rotSpeed={[0.12, 0.28, 0.38]}
      />

      {/* Right cluster */}
      <FloatingCube
        position={[5.8, 1.8, -3.5]}
        scale={0.30}
        color="#00f0ff"
        rotSpeed={[0.32, 0.18, 0.44]}
      />
      <FloatingSphere position={[4.5, 3.2, -7.5]} scale={0.52} color="#60a5fa" />

      {/* Back center */}
      <FloatingCube
        position={[0.5, 4.5, -9.0]}
        scale={0.65}
        color="#00f0ff"
        rotSpeed={[0.1, 0.35, 0.2]}
      />

      {/* Holographic code panels */}
      <CodePanel position={[-6.5, 1.8, -2.5]} rotation={[0,  0.35, 0]} />
      <CodePanel position={[ 6.2, 2.2, -3.2]} rotation={[0, -0.40, 0]} />
      <CodePanel position={[-2.5, 3.5, -8.5]} rotation={[0,  0.15, 0]} />
    </>
  );
}
