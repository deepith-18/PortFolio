import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import DeskModel from './DeskModel';
import StudioLighting from './lighting/StudioLighting';
import useResponsiveCamera from '../hooks/useResponsiveCamera';

function Placeholders() {
  const handleHotspotClick = (id) => {
    console.log(`Clicked project object: ${id}`);
    // Phase 2 will trigger panel open here
  };

  return (
    <>
      {/* Notebook */}
      <mesh position={[-2, 0.25, 1]} castShadow receiveShadow onClick={(e) => { e.stopPropagation(); handleHotspotClick('notebook'); }}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Record Player */}
      <mesh position={[2, 0.5, -1]} castShadow receiveShadow onClick={(e) => { e.stopPropagation(); handleHotspotClick('record_player'); }}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Model Building */}
      <mesh position={[0, 1, -2]} castShadow receiveShadow onClick={(e) => { e.stopPropagation(); handleHotspotClick('model_building'); }}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Lamp Placeholder */}
      <mesh position={[-3, 2, -2]} castShadow receiveShadow onClick={(e) => { e.stopPropagation(); handleHotspotClick('lamp'); }}>
        <coneGeometry args={[1, 2, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </>
  );
}

function CameraSetup() {
  const { isMobile } = useResponsiveCamera();

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={isMobile ? [0, 8, 12] : [0, 6, 8]} 
        fov={isMobile ? 60 : 45} 
      />
      <OrbitControls 
        enablePan={false}
        enableZoom={!isMobile} // Disable pinch zoom on mobile
        minPolarAngle={Math.PI / 6} // Don't allow camera to go too high
        maxPolarAngle={Math.PI / 2.2} // Don't allow camera to go below desk
        minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation (-45 deg)
        maxAzimuthAngle={Math.PI / 4} // Limit horizontal rotation (45 deg)
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function DeskScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <CameraSetup />
        
        <Suspense fallback={null}>
          <StudioLighting />
          <DeskModel />
          <Placeholders />
        </Suspense>
      </Canvas>
    </div>
  );
}
