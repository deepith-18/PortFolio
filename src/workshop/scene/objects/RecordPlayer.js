import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';

export default function RecordPlayer({ position }) {
  const recordRef = useRef();
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Check proximity
    const dist = camera.position.distanceToSquared(
      new THREE.Vector3(position[0], position[1], position[2])
    );
    
    // Spin if player is within ~2 meters (4 squared)
    if (dist < 4 && recordRef.current) {
      recordRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <Box args={[0.4, 0.05, 0.4]} position={[0, 0.025, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b5a2b" />
      </Box>
      {/* Platter */}
      <Cylinder args={[0.18, 0.18, 0.02, 32]} position={[0, 0.06, 0]} castShadow>
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
      </Cylinder>
      {/* Vinyl Record */}
      <group ref={recordRef} position={[0, 0.07, 0]}>
        <Cylinder args={[0.17, 0.17, 0.01, 32]} castShadow>
          <meshStandardMaterial color="#111" roughness={0.4} />
        </Cylinder>
        {/* Record Label */}
        <Cylinder args={[0.06, 0.06, 0.012, 16]}>
          <meshBasicMaterial color="#ff5555" />
        </Cylinder>
      </group>
      {/* Tonearm */}
      <Box args={[0.02, 0.02, 0.15]} position={[0.15, 0.08, 0.05]} rotation={[0, -0.2, 0]} castShadow>
        <meshStandardMaterial color="#ccc" metalness={0.8} roughness={0.2} />
      </Box>
    </group>
  );
}
