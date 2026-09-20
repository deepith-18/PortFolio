// src/components/LaptopScreen.js
// Clean Minimalist entry screen inside the Three.js laptop view.

import React, { useState, useEffect } from 'react';

export default function LaptopScreen({ onEnterFedora, onEnterWorkshop }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setTilt({ x: x * 2.5, y: -y * 2.5 }); // Subtle 2.5 degree max tilt
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="ls-root">
      {/* CRT scanlines / vignette overlay */}
      <div className="ls-scanlines" />
      <div className="ls-vignette" />

      {/* Tilting & Parallax Interactive Container */}
      <div 
        className="ls-parallax-container"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`,
        }}
      >
        {/* Profile Monogram (pulsing soft blue halo) */}
        <div className="ls-avatar-wrapper" style={{ transform: `translate3d(${tilt.x * -1}px, ${tilt.y * -1}px, 15px)` }}>
          <div className="ls-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1829', color: '#00d2ff', fontWeight: 'bold', fontSize: '24px' }}>DN</div>
          <div className="ls-avatar-halo" />
        </div>

        {/* Identity & Subtitles */}
        <div className="ls-header-section" style={{ transform: `translate3d(${tilt.x * -0.5}px, ${tilt.y * -0.5}px, 8px)` }}>
          <h1 className="ls-name">DEEPITH N</h1>
          <p className="ls-subtitle">SOFTWARE DEVELOPER</p>
          <p className="ls-tagline">"Crafting Interactive Experiences"</p>
        </div>

        {/* Action Buttons Column */}
        <div className="ls-actions-list" style={{ transform: `translate3d(${tilt.x * 0.3}px, ${tilt.y * 0.3}px, 5px)` }}>
          
          <div className="ls-divider-line">━━━━━━━━━━━━━━━━━━</div>

          {/* Action 1: Resume PDF */}
          <a
            href="/Deepith-4.pdf"
            target="_blank"
            rel="noreferrer"
            className="ls-btn ls-btn-resume"
          >
            <span className="ls-icon ls-icon-resume">📄</span>
            <span className="ls-btn-text">Resume PDF</span>
          </a>

          <div className="ls-divider-line">━━━━━━━━━━━━━━━━━━</div>

          {/* Action 2: Enter Fedora OS */}
          <button
            onClick={onEnterFedora}
            className="ls-btn ls-btn-fedora"
          >
            <span className="ls-icon ls-icon-fedora">💻</span>
            <span className="ls-btn-text">Enter Fedora OS</span>
            <div className="ls-scan-sweeper" />
          </button>

          <div className="ls-divider-line">━━━━━━━━━━━━━━━━━━</div>

          {/* Action 3: Explore 3D Workshop */}
          <button
            onClick={onEnterWorkshop}
            className="ls-btn ls-btn-workshop"
          >
            <div className="ls-cube-container">
              <div className="ls-wireframe-cube">
                <div className="cube-face face-front" />
                <div className="cube-face face-back" />
                <div className="cube-face face-left" />
                <div className="cube-face face-right" />
                <div className="cube-face face-top" />
                <div className="cube-face face-bottom" />
              </div>
            </div>
            <span className="ls-btn-text">Explore 3D Workshop</span>
          </button>

          <div className="ls-divider-line">━━━━━━━━━━━━━━━━━━</div>
        </div>

        {/* Status Indicator */}
        <div className="ls-status-section" style={{ transform: `translate3d(${tilt.x * -0.2}px, ${tilt.y * -0.2}px, 2px)` }}>
          <span className="ls-status-dot" />
          <span className="ls-status-text">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
