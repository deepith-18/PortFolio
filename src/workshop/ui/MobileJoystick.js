import React, { useRef, useEffect, useState } from 'react';

// Global state for joystick and mobile controls to avoid re-rendering R3F on every frame
export const joystickState = { 
  forward: 0, 
  right: 0, 
  sprint: 1, 
  resetLookRequested: false 
};

export default function MobileJoystick({ onInteract, activeZone }) {
  const baseRef = useRef(null);
  const stickRef = useRef(null);
  const [isSprinting, setIsSprinting] = useState(false);

  useEffect(() => {
    const base = baseRef.current;
    const stick = stickRef.current;
    if (!base || !stick) return;

    let active = false;
    let identifier = null;
    const maxDistance = 45; // Max pixels the stick moves from center

    const updateStick = (clientX, clientY) => {
      const rect = base.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      stick.style.transform = `translate(${dx}px, ${dy}px)`;

      // Normalize [-1, 1]
      joystickState.right = dx / maxDistance;
      joystickState.forward = -(dy / maxDistance);
    };

    const handlePointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      active = true;
      identifier = e.pointerId;
      try {
        base.setPointerCapture(e.pointerId);
      } catch {}
      updateStick(e.clientX, e.clientY);
    };

    const handlePointerMove = (e) => {
      if (!active || e.pointerId !== identifier) return;
      e.preventDefault();
      e.stopPropagation();
      updateStick(e.clientX, e.clientY);
    };

    const handlePointerUp = (e) => {
      if (e.pointerId !== identifier && active) return;
      e.preventDefault();
      e.stopPropagation();
      active = false;
      identifier = null;

      try {
        base.releasePointerCapture(e.pointerId);
      } catch {}

      stick.style.transform = `translate(0px, 0px)`;
      joystickState.forward = 0;
      joystickState.right = 0;
    };

    base.addEventListener('pointerdown', handlePointerDown);
    base.addEventListener('pointermove', handlePointerMove);
    base.addEventListener('pointerup', handlePointerUp);
    base.addEventListener('pointercancel', handlePointerUp);

    return () => {
      base.removeEventListener('pointerdown', handlePointerDown);
      base.removeEventListener('pointermove', handlePointerMove);
      base.removeEventListener('pointerup', handlePointerUp);
      base.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const toggleSprint = () => {
    setIsSprinting(prev => {
      const next = !prev;
      joystickState.sprint = next ? 1.85 : 1.0;
      return next;
    });
  };

  const handleResetLook = () => {
    joystickState.resetLookRequested = true;
    setTimeout(() => {
      joystickState.resetLookRequested = false;
    }, 100);
  };

  return (
    <div className="mobile-controls-overlay">
      {/* ── Virtual Joystick (Bottom Left) ── */}
      <div className="mobile-joystick-container">
        <div className="mobile-joystick-base" ref={baseRef}>
          <div className="joystick-ring-decor">
            <span className="joystick-arrow arrow-n">▲</span>
            <span className="joystick-arrow arrow-e">►</span>
            <span className="joystick-arrow arrow-s">▼</span>
            <span className="joystick-arrow arrow-w">◄</span>
          </div>
          <div className="mobile-joystick-stick" ref={stickRef}>
            <div className="stick-inner-glow" />
          </div>
        </div>
        <div className="joystick-label">DRAG TO MOVE</div>
      </div>

      {/* ── Action Buttons (Bottom Right) ── */}
      <div className="mobile-action-buttons">
        {/* Sprint / Speed Boost */}
        <button 
          className={`mobile-action-btn sprint-btn ${isSprinting ? 'active' : ''}`}
          onClick={toggleSprint}
          title="Toggle Sprint"
        >
          <span className="action-btn-icon">⚡</span>
          <span className="action-btn-text">{isSprinting ? 'FAST' : 'WALK'}</span>
        </button>

        {/* Reset Camera Look */}
        <button 
          className="mobile-action-btn reset-btn"
          onClick={handleResetLook}
          title="Reset Camera Angle"
        >
          <span className="action-btn-icon">🎯</span>
          <span className="action-btn-text">RESET</span>
        </button>

        {/* Interact / Inspect Station Button */}
        {activeZone && (
          <button 
            className="mobile-action-btn interact-btn pulse-action"
            onClick={onInteract}
            title="Inspect Station"
          >
            <span className="action-btn-icon">🔍</span>
            <span className="action-btn-text">INSPECT</span>
          </button>
        )}
      </div>

      {/* Hint for touch-look */}
      <div className="mobile-touch-hint">
        <span>Touch right screen to rotate view</span>
      </div>
    </div>
  );
}
