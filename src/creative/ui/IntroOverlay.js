import React, { useState } from 'react';

export default function IntroOverlay({ onEnter }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Give it a tiny delay for the fade animation to start before mounting heavy 3D stuff if needed,
    // or just call onEnter immediately and let the parent handle it.
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div className={`intro-overlay ${clicked ? 'hidden' : ''}`}>
      <div className="intro-bg-glow"></div>
      <div className="intro-desk-line"></div>
      
      <div className="intro-content">
        <h1 className="intro-name">Deepith N</h1>
        <h2 className="intro-subtitle">SOFTWARE DEVELOPER</h2>
        
        <p className="intro-tagline">
          Designing software that connects ideas, people, and intelligent systems.
        </p>

        <button className="intro-cta-btn" onClick={handleClick}>
          Enter the studio
          <div className="intro-cta-arrow">↓</div>
        </button>
      </div>
    </div>
  );
}
