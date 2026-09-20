import { useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

// Define interactive areas [x, z, radius] mapping to section IDs
const INTERACTIVE_ZONES = [
  { id: 'additional',     x:   0, z:   0, radius: 2.5 },   // Hall bulletin board
  { id: 'projects',      x:   0, z: -14, radius: 3.0 },   // North room
  { id: 'skills',        x:  14, z:   0, radius: 3.0 },   // East room
  { id: 'opensource',   x:   0, z:  14, radius: 3.0 },   // South room
  { id: 'certifications', x: -14, z:   0, radius: 3.0 },  // West room
];

export default function useProximityTrigger(onTriggerChange) {
  const { camera } = useThree();
  const [activeZone, setActiveZone] = useState(null);

  useFrame(() => {
    let closestZone = null;
    let minDistance = Infinity;

    for (const zone of INTERACTIVE_ZONES) {
      const dx = camera.position.x - zone.x;
      const dz = camera.position.z - zone.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance <= zone.radius && distance < minDistance) {
        minDistance = distance;
        closestZone = zone.id;
      }
    }

    if (activeZone !== closestZone) {
      setActiveZone(closestZone);
      if (onTriggerChange) onTriggerChange(closestZone);
    }
  });

  return activeZone;
}
