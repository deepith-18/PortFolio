// src/components/LaptopScene.js
// 3D laptop with float animation, mouse-driven tilt, matching cherry red chasis,
// dynamic pink backlights, and fully 3D interactive screen UI (eliminates CSS overflow alignment bugs).

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import LaptopScreen from './LaptopScreen';

/* ── Laptop dimensions ── */
const BASE_W = 3.4;
const BASE_H = 0.13;
const BASE_D = 2.2;
const LID_W  = 3.4;
const LID_H  = 2.05;
const LID_D  = 0.10;
const HINGE_ANGLE = -0.28; // ≈ 106° open

/* ════════════════════════════════════════════
   Camera transition controller
════════════════════════════════════════════ */
function CameraController({ transition }) {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  const defaultY = isMobile ? 2.8 : 2.2;
  const defaultZ = isMobile ? 7.0 : 4.8;

  const startPos  = useRef(new THREE.Vector3(0, defaultY, defaultZ));
  const endPos    = useRef(new THREE.Vector3(0, defaultY, defaultZ));
  const progress  = useRef(1);
  const prevTrans = useRef(null);

  // Handle fov adjustment dynamically
  useEffect(() => {
    camera.fov = isMobile ? 54 : 48;
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  // Handle transitions and size changes
  useEffect(() => {
    if (transition === prevTrans.current) {
      if (!transition) {
        startPos.current.copy(camera.position);
        endPos.current.set(0, defaultY, defaultZ);
        progress.current = 0;
      }
      return;
    }
    prevTrans.current = transition;
    startPos.current.copy(camera.position);
    progress.current = 0;

    if (transition === 'fedora') {
      endPos.current.set(0, isMobile ? 2.6 : 2.0, isMobile ? 3.3 : 2.2);
    } else if (transition === 'workshop') {
      endPos.current.set(0, isMobile ? 11 : 8, isMobile ? 22 : 16);
    } else {
      endPos.current.set(0, defaultY, defaultZ);
    }
  }, [transition, isMobile, defaultY, defaultZ, camera]);

  useFrame((_, delta) => {
    if (progress.current >= 1) return;
    progress.current = Math.min(1, progress.current + delta * 0.72);
    const p = progress.current;
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    camera.position.lerpVectors(startPos.current, endPos.current, e);
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

/* ════════════════════════════════════════════
   Floor click → expanding ripple
════════════════════════════════════════════ */
function Ripple({ position, onDone }) {
  const meshRef  = useRef();
  const prog     = useRef(0);

  useFrame((_, delta) => {
    prog.current += delta * 1.3;
    if (!meshRef.current) return;
    const p = Math.min(prog.current, 1);
    meshRef.current.scale.setScalar(p * 5.5);
    meshRef.current.material.opacity = (1 - p) * 0.45;
    if (prog.current >= 1) onDone();
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.92, 1.0, 32]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ════════════════════════════════════════════
   Simple keyboard surface
════════════════════════════════════════════ */
const KEY_ROWS = [
  { z: -0.60, count: 14, w: 2.85 },
  { z: -0.42, count: 13, w: 2.68 },
  { z: -0.24, count: 12, w: 2.50 },
  { z: -0.06, count: 11, w: 2.32 },
  { z:  0.14, count:  9, w: 1.95 },
];

function KeyboardSurface() {
  const keys = [];
  KEY_ROWS.forEach((row) => {
    const keyW = (row.w - 0.035 * row.count) / row.count;
    for (let ki = 0; ki < row.count; ki++) {
      const x = -row.w / 2 + ki * (keyW + 0.035) + keyW / 2;
      keys.push({ x, z: row.z, keyW });
    }
  });

  return (
    <group position={[0, BASE_H / 2 + 0.001, 0]}>
      {/* Space Gray anodized aluminum keyboard deck */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.0, 1.85]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.18} roughness={0.38} />
      </mesh>

      {/* Keys - premium matte charcoal with clean electric blue backlight */}
      {keys.map(({ x, z: kz, keyW }, idx) => (
        <mesh key={idx} position={[x, 0.005, kz]}>
          <boxGeometry args={[keyW, 0.005, 0.105]} />
          <meshStandardMaterial
            color="#18181b"
            emissive="#00f0ff"
            emissiveIntensity={0.08}
            metalness={0.15}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Trackpad - matte space-gray glass */}
      <mesh position={[0, 0.002, 0.66]}>
        <boxGeometry args={[0.95, 0.003, 0.58]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.1} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════
   Laptop 3D mesh
════════════════════════════════════════════ */
function LaptopMesh({ mouseRef, laptopGroupRef, onEnterFedora, onEnterWorkshop }) {
  const groupRef    = useRef();
  const screenLight = useRef();
  const rgbL1       = useRef();
  const rgbL2       = useRef();
  const rgbL3       = useRef();

  // Expose group ref to parent
  React.useEffect(() => {
    if (laptopGroupRef && groupRef.current) {
      laptopGroupRef.current = groupRef.current;
    }
  });

  const rotX = useRef(0);
  const rotY = useRef(0);

  // Real world metallic Space Gray / Silver aluminum chasis
  const aluminum = { color: '#e2e8f0', metalness: 0.18, roughness: 0.38 };

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    rotX.current += (-my * 0.022 - rotX.current) * 0.045;
    rotY.current += ( mx * 0.036 - rotY.current) * 0.045;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.09;
      groupRef.current.rotation.x = rotX.current;
      groupRef.current.rotation.y = rotY.current;
    }

    if (screenLight.current) {
      screenLight.current.intensity = 1.0 + Math.sin(t * 1.4) * 0.15;
    }

    // Dynamic clean electric-blue reflections under keyboard keys
    const cycleColor = (ref, hue) => {
      if (!ref.current) return;
      ref.current.color.setHSL(hue, 0.9, 0.65);
      ref.current.intensity = 0.15 + Math.sin(t * 1.8) * 0.03;
    };
    cycleColor(rgbL1, 0.52); // electric blue
    cycleColor(rgbL2, 0.55); // deep cyan
    cycleColor(rgbL3, 0.50); // sky blue
  });

  return (
    <group ref={groupRef}>

      {/* ── Base body ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        <meshStandardMaterial {...aluminum} />
      </mesh>

      {/* Front lip - polished anodized chrome accent */}
      <mesh position={[0, BASE_H / 2 - 0.012, BASE_D / 2 - 0.04]}>
        <boxGeometry args={[BASE_W, 0.024, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Keyboard surface */}
      <KeyboardSurface />

      {/* Keyboard backlight bounces - Electric Blue */}
      <pointLight ref={rgbL1} color="#00f0ff" intensity={0.12} distance={1.4} position={[-1.0, 0.18, 0]} />
      <pointLight ref={rgbL2} color="#00f0ff" intensity={0.12} distance={1.4} position={[ 0.0, 0.18, 0]} />
      <pointLight ref={rgbL3} color="#00f0ff" intensity={0.12} distance={1.4} position={[ 1.0, 0.18, 0]} />

      {/* ── Lid assembly ── */}
      <group position={[0, BASE_H / 2, -BASE_D / 2]} rotation={[HINGE_ANGLE, 0, 0]}>
        <group position={[0, LID_H / 2, 0]}>

          {/* Silver lid */}
          <mesh castShadow>
            <boxGeometry args={[LID_W, LID_H, LID_D]} />
            <meshStandardMaterial {...aluminum} />
          </mesh>

          {/* Inner glass bezel frame (premium glossy black border) */}
          <mesh position={[0, 0, LID_D / 2 + 0.002]}>
            <boxGeometry args={[LID_W - 0.18, LID_H - 0.18, 0.004]} />
            <meshStandardMaterial color="#090d16" metalness={0.92} roughness={0.08} />
          </mesh>

          {/* Active screen surface — HTML overlay inside 3D screen */}
          <group position={[0, 0, LID_D / 2 + 0.004]}>
            <Html
              transform
              occlude
              distanceFactor={1.16}
              style={{
                width: '560px',
                height: '324px',
                background: 'none',
                border: 'none',
              }}
            >
              <LaptopScreen
                onEnterFedora={onEnterFedora}
                onEnterWorkshop={onEnterWorkshop}
              />
            </Html>
          </group>

          {/* Glass glare */}
          <mesh position={[0, 0.3, LID_D / 2 + 0.007]}>
            <planeGeometry args={[LID_W - 0.38, (LID_H - 0.3) / 3]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.03} roughness={0} metalness={1} />
          </mesh>

          {/* Screen glow — breathes brighter - Electric Blue */}
          <pointLight
            ref={screenLight}
            color="#00f0ff"
            intensity={0.4}
            distance={4}
            position={[0, -0.6, 0.3]}
            decay={2}
          />

          {/* Subtle bottom screen logo glow strip */}
          <mesh position={[0, -LID_H / 2 + 0.02, LID_D / 2 + 0.001]}>
            <boxGeometry args={[LID_W - 0.1, 0.006, 0.002]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>

        {/* Chrome Hinge barrels */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * (LID_W / 2 - 0.14), 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.038, 0.22, 18]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>

    </group>
  );
}

/* ════════════════════════════════════════════
   Invisible click-capture floor plane
════════════════════════════════════════════ */
function ClickFloor({ onRipple }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.065, 0]}
      onClick={(e) => { e.stopPropagation(); onRipple(e.point); }}
    >
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
  );
}

/* ════════════════════════════════════════════
   LaptopScene — exported root
════════════════════════════════════════════ */
export default function LaptopScene({ mouseRef, laptopGroupRef, transition, onEnterFedora, onEnterWorkshop }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((point) => {
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, { id, position: point }]);
  }, []);

  const removeRipple = useCallback((id) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  }, []);

  return (
    <>
      <CameraController transition={transition} />
      <ClickFloor onRipple={addRipple} />
      <LaptopMesh
        mouseRef={mouseRef}
        laptopGroupRef={laptopGroupRef}
        onEnterFedora={onEnterFedora}
        onEnterWorkshop={onEnterWorkshop}
      />
      {ripples.map(r => (
        <Ripple key={r.id} position={r.position} onDone={() => removeRipple(r.id)} />
      ))}
    </>
  );
}
