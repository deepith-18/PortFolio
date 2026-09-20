import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { resolveCollision } from './CollisionSystem';
import { joystickState } from '../ui/MobileJoystick';
import { audioManager } from '../audio/AudioManager';

const BASE_WALK_SPEED = 2.6; // m/s
const CAMERA_HEIGHT = 1.6;
const HEAD_BOB_FREQ = 8;
const HEAD_BOB_AMP = 0.04;
const LOOK_SENSITIVITY = 0.006;

export default function MobilePlayerController({ isActive = true }) {
  const { camera, gl } = useThree();
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, CAMERA_HEIGHT, 2.5);
    camera.lookAt(0, CAMERA_HEIGHT, 0);
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera]);

  // Touch look rotation logic
  useEffect(() => {
    let activePointerId = null;
    let lastX = 0;
    let lastY = 0;

    const handlePointerDown = (e) => {
      // Ignore if clicking on joystick or UI buttons
      if (
        e.target.closest('.mobile-joystick-container') || 
        e.target.closest('.mobile-action-buttons') || 
        e.target.closest('button') || 
        e.target.closest('a') || 
        !isActive
      ) {
        return;
      }

      activePointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (e.pointerId !== activePointerId || !isActive) return;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      euler.current.y -= deltaX * LOOK_SENSITIVITY;
      euler.current.x -= deltaY * LOOK_SENSITIVITY;

      // Clamp pitch
      const maxPitch = Math.PI / 2.3;
      euler.current.x = Math.max(-maxPitch, Math.min(maxPitch, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    };

    const handlePointerUp = (e) => {
      if (e.pointerId === activePointerId) {
        activePointerId = null;
      }
    };

    const domElement = gl.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [camera, gl, isActive]);

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!isActive) return;

    // Reset look requested by UI button
    if (joystickState.resetLookRequested) {
      euler.current.set(0, 0, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler.current);
      joystickState.resetLookRequested = false;
    }

    // 1. Calculate input vectors from Joystick
    frontVector.set(0, 0, -joystickState.forward);
    sideVector.set(-joystickState.right, 0, 0);

    // Speed multiplier from sprint toggle
    const currentSpeed = BASE_WALK_SPEED * (joystickState.sprint || 1);

    // 2. Determine movement direction relative to camera rotation
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed * delta);
    // Ignore pitch for movement direction, only yaw
    const yawQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), euler.current.y);
    direction.applyQuaternion(yawQuaternion);

    // 3. Propose new position
    const currentX = camera.position.x;
    const currentZ = camera.position.z;
    const nextX = currentX + direction.x;
    const nextZ = currentZ + direction.z;

    // 4. Resolve collisions
    const finalPos = resolveCollision(currentX, currentZ, nextX, nextZ);

    camera.position.x = finalPos.x;
    camera.position.z = finalPos.z;

    // 5. Head bob & Footsteps
    const isMoving = Math.abs(joystickState.forward) > 0.1 || Math.abs(joystickState.right) > 0.1;
    if (isMoving) {
      const prevT = t.current;
      t.current += delta * HEAD_BOB_FREQ * (joystickState.sprint || 1);
      camera.position.y = CAMERA_HEIGHT + Math.sin(t.current) * HEAD_BOB_AMP;

      if (Math.sin(prevT) < 0 && Math.sin(t.current) >= 0) {
        audioManager.playFootstep();
      }
    } else {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, CAMERA_HEIGHT, 0.1);
      t.current = 0;
    }
  });

  return null;
}
