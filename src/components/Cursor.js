// src/components/Cursor.js
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const PARTICLE_COUNT = 18;
const PARTICLE_SPREAD = 120;

// A single Star Particle component
const Particle = ({ id, x, y, removeParticle }) => {
  // Generate unique random properties for each particle's animation
  const randomX = (Math.random() - 0.5) * PARTICLE_SPREAD;
  const randomY = (Math.random() - 0.5) * PARTICLE_SPREAD;
  const randomDuration = 0.6 + Math.random() * 0.9;
  const randomRotate = Math.random() * 360;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      initial={{
        x: x - 12,
        y: y - 12,
        scale: 1,
        opacity: 1,
        rotate: 0,
      }}
      animate={{
        x: x + randomX,
        y: y + randomY,
        scale: 0,
        opacity: 0,
        rotate: randomRotate,
      }}
      transition={{
        duration: randomDuration,
        ease: 'easeOut',
      }}
      onAnimationComplete={() => removeParticle(id)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0L14.098 9.90201L24 12L14.098 14.098L12 24L9.90199 14.098L0 12L9.90199 9.90201L12 0Z"
          // --- KEY CHANGE IS HERE ---
          // We replaced the random HSL color with "white"
          fill="white"
        />
      </svg>
    </motion.div>
  );
};

// The main Cursor component that manages the particles
const Cursor = () => {
  const [particles, setParticles] = useState([]);
  const lastSpawnTimeRef = React.useRef(0);

  const removeParticle = useCallback((id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addParticle = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    const newParticle = { id, x, y };
    setParticles((prev) => [...prev, newParticle].slice(-PARTICLE_COUNT));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastSpawnTimeRef.current > 30) {
        addParticle(e.clientX, e.clientY);
        lastSpawnTimeRef.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [addParticle]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <Particle
          key={p.id}
          id={p.id}
          x={p.x}
          y={p.y}
          removeParticle={removeParticle}
        />
      ))}
    </AnimatePresence>
  );
};

export default Cursor;