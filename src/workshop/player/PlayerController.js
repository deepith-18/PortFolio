import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import useKeyboardControls from './useKeyboardControls';
import { resolveCollision } from './CollisionSystem';
import { audioManager } from '../audio/AudioManager';

// ─── Kinematics & Physics Tuning ───────────────────────────────────────
const WALK_SPEED    = 3.8;   // m/s
const SPRINT_SPEED  = 6.4;   // m/s
const ACCEL_SMOOTH  = 12.0;  // Inertia / acceleration responsiveness
const DECEL_SMOOTH  = 14.0;  // Friction / stopping responsiveness
const CAMERA_HEIGHT = 1.62;  // Realistic eye height in meters
const GRAVITY       = -18.5; // m/s²
const JUMP_FORCE    = 6.2;   // m/s
const GROUND_Y      = CAMERA_HEIGHT;

export default function PlayerController({ isActive = true }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const { keys, jumpPressed } = useKeyboardControls();
  const [isLocked, setIsLocked] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Velocity vectors for realistic momentum & inertia
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const currentSpeed = useRef(0);

  // Vertical physics (jump + gravity + landing spring)
  const vy = useRef(0);
  const isGrounded = useRef(true);
  const landingDip = useRef(0); // Camera compression upon landing

  // Camera sway & head-bobbing state
  const bobTimer = useRef(0);
  const cameraRoll = useRef(0); // Dynamic lean when strafing

  // Drag-to-look support when not locked
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, CAMERA_HEIGHT, 2.5);
    camera.lookAt(0, CAMERA_HEIGHT, 0);
  }, [camera]);

  // Handle drag-to-look when pointer lock is not active
  useEffect(() => {
    const dom = gl.domElement;
    const onPointerDown = (e) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e) => {
      if (!isDragging.current || isLocked) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      camera.rotation.y -= dx * 0.003;
      const newPitch = camera.rotation.x - dy * 0.003;
      camera.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newPitch));
    };
    const onPointerUp = () => {
      isDragging.current = false;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl.domElement, isLocked, camera]);

  const targetVelocity = useRef(new THREE.Vector3());
  const moveDirection  = useRef(new THREE.Vector3());
  const forwardVector  = useRef(new THREE.Vector3());
  const sideVector     = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Cap large delta spikes to maintain physics stability
    const dt = Math.min(delta, 0.05);

    if (!isActive) return;

    // ── 1. Realistic Input & Direction Calculation ──────────────────
    const moveZ = Number(keys.backward) - Number(keys.forward);
    const moveX = Number(keys.right) - Number(keys.left);
    const isMoving = moveZ !== 0 || moveX !== 0;
    const isSprinting = keys.sprint && keys.forward && !keys.backward;

    if (isMoving && !hasMoved) {
      setHasMoved(true);
    }

    const maxSpeed = isSprinting ? SPRINT_SPEED : WALK_SPEED;

    // Compute direction relative to camera heading (yaw only)
    forwardVector.current.set(0, 0, moveZ);
    sideVector.current.set(moveX, 0, 0);
    moveDirection.current.addVectors(forwardVector.current, sideVector.current);

    if (isMoving) {
      moveDirection.current.normalize();
      // Apply camera yaw rotation (ignore pitch so player moves strictly on XZ plane)
      const euler = new THREE.Euler(0, camera.rotation.y, 0, 'YXZ');
      moveDirection.current.applyEuler(euler);
      targetVelocity.current.copy(moveDirection.current).multiplyScalar(maxSpeed);
    } else {
      targetVelocity.current.set(0, 0, 0);
    }

    // ── 2. Smooth Inertia & Momentum (Acceleration / Deceleration) ──
    const smoothFactor = isMoving ? ACCEL_SMOOTH : DECEL_SMOOTH;
    velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, targetVelocity.current.x, smoothFactor * dt);
    velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, targetVelocity.current.z, smoothFactor * dt);

    // Current horizontal velocity magnitude
    currentSpeed.current = Math.hypot(velocity.current.x, velocity.current.z);

    // Apply collision resolution along world axes
    const currentX = camera.position.x;
    const currentZ = camera.position.z;
    const nextX    = currentX + velocity.current.x * dt;
    const nextZ    = currentZ + velocity.current.z * dt;

    const finalPos = resolveCollision(currentX, currentZ, nextX, nextZ);
    camera.position.x = finalPos.x;
    camera.position.z = finalPos.z;

    // If collision stopped us on an axis, cancel that component of momentum
    if (Math.abs(finalPos.x - nextX) > 0.001) velocity.current.x = 0;
    if (Math.abs(finalPos.z - nextZ) > 0.001) velocity.current.z = 0;

    // ── 3. Realistic Jump, Gravity & Landing Compression ────────────
    if (jumpPressed.current && isGrounded.current) {
      vy.current = JUMP_FORCE;
      isGrounded.current = false;
      jumpPressed.current = false; // consume
    }

    if (!isGrounded.current) {
      vy.current += GRAVITY * dt;
      camera.position.y += vy.current * dt;

      if (camera.position.y <= GROUND_Y) {
        camera.position.y = GROUND_Y;
        // Realistic landing impact compression (dip)
        landingDip.current = Math.min(0.08, Math.abs(vy.current) * 0.012);
        vy.current = 0;
        isGrounded.current = true;
        audioManager.playFootstep();
      }
    }

    // Recover from landing dip
    if (landingDip.current > 0.001) {
      landingDip.current = THREE.MathUtils.lerp(landingDip.current, 0, 10 * dt);
    } else {
      landingDip.current = 0;
    }

    // ── 5. Dynamic Camera Roll (Subtle Leaning on Strafe) ───────────
    let targetRoll = -moveX * (isSprinting ? 0.016 : 0.01);

    // ── 4. Super Realistic Double-Pendulum Head Bobbing & Footsteps ─
    if (isGrounded.current) {
      const speedRatio = currentSpeed.current / WALK_SPEED;

      if (currentSpeed.current > 0.3) {
        const bobFrequency = isSprinting ? 12.0 : 8.5;
        const bobAmplitudeY = isSprinting ? 0.055 : 0.038;
        const bobAmplitudeX = bobAmplitudeY * 0.45;

        const prevTimer = bobTimer.current;
        bobTimer.current += dt * bobFrequency * Math.max(0.6, speedRatio);

        const verticalBob = Math.sin(bobTimer.current) * bobAmplitudeY;
        const horizontalSway = Math.cos(bobTimer.current * 0.5) * bobAmplitudeX;

        // Apply natural harmonic bobbing to camera eye height and lateral sway
        camera.position.y = GROUND_Y + verticalBob - landingDip.current;
        targetRoll += horizontalSway * 0.12;

        // Sound trigger at bottom of footstep stride
        if (Math.sin(prevTimer) < 0 && Math.sin(bobTimer.current) >= 0) {
          audioManager.playFootstep();
        }
      } else {
        // Smoothly ease camera back to level resting eye height
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, GROUND_Y - landingDip.current, 12 * dt);
        bobTimer.current = 0;
      }
    }

    cameraRoll.current = THREE.MathUtils.lerp(cameraRoll.current, targetRoll, 10 * dt);
    camera.rotation.z = cameraRoll.current;
  });

  // Catch pointer lock errors and unhandled rejections gracefully
  useEffect(() => {
    const handlePointerLockError = (e) => {
      e.stopPropagation?.();
      e.preventDefault?.();
    };
    const handleRejection = (e) => {
      const reason = String(e.reason?.message || e.reason || '');
      if (reason.toLowerCase().includes('pointer lock') || e.reason?.name === 'SecurityError') {
        e.preventDefault?.();
        e.stopPropagation?.();
      }
    };
    const handleError = (e) => {
      const msg = String(e?.message || '');
      if (msg.toLowerCase().includes('pointer lock')) {
        e.preventDefault?.();
        e.stopImmediatePropagation?.();
      }
    };

    document.addEventListener('pointerlockerror', handlePointerLockError);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('error', handleError, true);
    return () => {
      document.removeEventListener('pointerlockerror', handlePointerLockError);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  const handlePromptClick = () => {
    try {
      const res = controlsRef.current?.lock();
      if (res && typeof res.catch === 'function') {
        res.catch(() => {});
      }
    } catch (e) {
      // Graceful fallback: drag-to-look remains available
    }
  };

  return (
    <>
      <PointerLockControls
        ref={controlsRef}
        selector="#workshop-lock-btn"
        onLock={() => setIsLocked(true)}
        onUnlock={() => setIsLocked(false)}
      />

      {!isLocked && !hasMoved && (
        <Html center>
          <div 
            id="workshop-lock-btn"
            className="pointer-lock-prompt"
            onClick={handlePromptClick}
          >
            <div className="prompt-title">Click to Lock Mouse Look</div>
            <div className="prompt-keys">
              <span><strong>W A S D</strong> — Walk</span>
              <span className="key-sep">•</span>
              <span><strong>Shift</strong> — Sprint</span>
              <span className="key-sep">•</span>
              <span><strong>Space</strong> — Jump</span>
              <span className="key-sep">•</span>
              <span><strong>Drag / Mouse</strong> — Look</span>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
