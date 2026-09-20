import React, { useRef, useEffect } from 'react';

// Global state for joystick to avoid re-rendering React on every frame
export const joystickState = { forward: 0, right: 0 };

export default function MobileJoystick() {
  const baseRef = useRef(null);
  const stickRef = useRef(null);

  useEffect(() => {
    const base = baseRef.current;
    const stick = stickRef.current;
    if (!base || !stick) return;

    let active = false;
    let identifier = null;

    const maxDistance = 40; // Max pixels the stick can move from center

    const handleStart = (e) => {
      // Prevent default to stop scrolling
      e.preventDefault();
      active = true;
      identifier = e.pointerId;
      updateStick(e);
    };

    const handleMove = (e) => {
      if (!active || e.pointerId !== identifier) return;
      e.preventDefault();
      updateStick(e);
    };

    const handleEnd = (e) => {
      if (e.pointerId !== identifier) return;
      e.preventDefault();
      active = false;
      identifier = null;
      
      // Reset stick visually
      stick.style.transform = `translate(-50%, -50%)`;
      // Reset state
      joystickState.forward = 0;
      joystickState.right = 0;
    };

    const updateStick = (e) => {
      const rect = base.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = e.clientX - centerX;
      let dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

      // Normalize to [-1, 1]
      // Forward is negative Y in screen space
      joystickState.right = dx / maxDistance;
      joystickState.forward = -(dy / maxDistance); 
    };

    base.addEventListener('pointerdown', handleStart, { passive: false });
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleEnd, { passive: false });
    window.addEventListener('pointercancel', handleEnd, { passive: false });

    return () => {
      base.removeEventListener('pointerdown', handleStart);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, []);

  return (
    <div className="mobile-joystick-base" ref={baseRef}>
      <div className="mobile-joystick-stick" ref={stickRef}></div>
    </div>
  );
}
