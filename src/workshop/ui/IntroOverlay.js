import React, { useState } from 'react';
import { audioManager } from '../audio/AudioManager';

export default function IntroOverlay({ onEnter, onBack }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    audioManager.init();
    setClicked(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div className={`workshop-intro ${clicked ? 'hidden' : ''}`}>
      <div className="workshop-intro-glasscard">
        <div className="workshop-intro-tag">INTERACTIVE 3D WORKSPACE</div>
        <h1 className="workshop-title">Deepith's Studio</h1>
        <p className="workshop-subtitle">
          Explore interactive project holograms, skill stations, and engineering blueprints in a 3D environment.
        </p>

        <div className="workshop-intro-actions">
          <button className="workshop-enter-btn" onClick={handleClick}>
            <span>Enter 3D Experience</span>
            <span className="btn-arrow">→</span>
          </button>
          {onBack && (
            <button className="workshop-back-secondary-btn" onClick={onBack}>
              ← Back to Main Portfolio
            </button>
          )}
        </div>

        <div className="workshop-intro-instructions">
          <span>Desktop: Use <strong>WASD / Arrow Keys</strong> to move & <strong>Mouse</strong> to rotate camera.</span>
          <span>Press <strong>[E]</strong> or click on stations to inspect details.</span>
        </div>
      </div>
    </div>
  );
}
