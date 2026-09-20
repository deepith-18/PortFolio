// src/components/SpeedLoader.js
import React, { useState, useEffect } from 'react';
import '../styles/SpeedLoader.css';

const BOOT_MESSAGES = [
  'Initializing...',
  'Loading Workspace...',
  'System Ready.',
];

export default function SpeedLoader({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [fadeOut, setFadeOut]           = useState(false);

  useEffect(() => {
    // Cycle through 3 boot messages, ~280ms apart
    const timers = BOOT_MESSAGES.map((_, i) =>
      setTimeout(() => setMessageIndex(i), i * 280)
    );

    // Start fade-out at 900ms, call onComplete after transition (300ms)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 320);
    }, 900);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen${fadeOut ? ' boot-fade-out' : ''}`}>
      {/* Subtle scanline overlay */}
      <div className="boot-scanlines" />

      {/* Center content */}
      <div className="boot-center">
        {/* Hexagon logo mark */}
        <div className="boot-logo">
          <svg viewBox="0 0 60 60" fill="none" className="boot-hex-svg">
            <polygon
              points="30,4 54,17 54,43 30,56 6,43 6,17"
              stroke="#64ffda"
              strokeWidth="2"
              fill="none"
              className="boot-hex-outline"
            />
            <polygon
              points="30,12 46,21 46,39 30,48 14,39 14,21"
              fill="#64ffda"
              opacity="0.08"
            />
            <text
              x="50%"
              y="54%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#64ffda"
              fontFamily="'Share Tech Mono', monospace"
            >
              D
            </text>
          </svg>
        </div>

        {/* OS name */}
        <div className="boot-os-name">DeepithOS</div>

        {/* Cycling boot message */}
        <div className="boot-message">{BOOT_MESSAGES[messageIndex]}</div>

        {/* Minimal pulsing dot row */}
        <div className="boot-dots">
          <span className="boot-dot" style={{ animationDelay: '0ms' }} />
          <span className="boot-dot" style={{ animationDelay: '180ms' }} />
          <span className="boot-dot" style={{ animationDelay: '360ms' }} />
        </div>
      </div>

      {/* Bottom version tag */}
      <div className="boot-footer">
        Fedora 40 · Hyprland WM · Deepith N
      </div>
    </div>
  );
}