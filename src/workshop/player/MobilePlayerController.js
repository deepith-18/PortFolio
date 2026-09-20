import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { resolveCollision } from './CollisionSystem';
import { joystickState } from '../ui/MobileJoystick';
import { audioManager } from '../audio/AudioManager';

const WALK_SPEED = 2.5; // m/s
const CAMERA_HEIGHT = 1.6;
const HEAD_BOB_FREQ = 8;
const HEAD_BOB_AMP = 0.05;
const LOOK_SENSITIVITY = 0.005;

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
      if (e.target.closest('.mobile-joystick-base') || e.target.closest('button') || e.target.closest('a') || !isActive) {
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
      const PI_2 = Math.PI / 2;
      euler.current.x = Math.max(-PI_2 + 0.1, Math.min(PI_2 - 0.1, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    };

    const handlePointerUp = (e) => {
      if (e.pointerId === activePointerId) {
        activePointerId = null;
      }
    };

    const domElement = gl.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [camera, gl, isActive]);

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!isActive) return;

    // 1. Calculate input vectors from Joystick
    frontVector.set(0, 0, -joystickState.forward);
    sideVector.set(-joystickState.right, 0, 0);

    // 2. Determine movement direction relative to camera rotation
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(WALK_SPEED * delta);
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
      t.current += delta * HEAD_BOB_FREQ;
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
