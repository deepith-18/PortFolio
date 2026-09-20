import React, { useState, useEffect } from 'react';
import LoadingScreen from './ui/LoadingScreen';
import WorkshopScene from './scene/WorkshopScene';
import { audioManager } from './audio/AudioManager';
import './styles/workshop.css';

export default function WorkshopApp({ onBackToPortfolio }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);

  useEffect(() => {
    const unsub = audioManager.addListener((muted) => {
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const handleExit = (e) => {
    if (e) e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      if (onBackToPortfolio) {
        onBackToPortfolio();
      } else {
        window.location.hash = '';
      }
    }, 350);
  };

  const handleToggleAudio = () => {
    const newMuted = audioManager.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <div className={`workshop-root ${isExiting ? 'workshop-fade-out' : 'workshop-fade-in'}`}>
      {/* Sleek Top Cyberpunk / Studio HUD Bar */}
      <div className="workshop-hud-topbar">
        <button className="workshop-hud-back-btn" onClick={handleExit} title="Return to Main Portfolio">
          <span className="hud-back-arrow">←</span>
          <span className="hud-back-label">Back to Portfolio</span>
        </button>

        <div className="workshop-hud-status-badge">
          <span className="hud-status-dot" />
          <span className="hud-status-text">DEEPITH 3D STUDIO // V2.4</span>
        </div>

        <div className="workshop-hud-controls-group">
          <button 
            className={`workshop-hud-audio-btn ${!isMuted ? 'active' : ''}`}
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            <span className="hud-audio-icon">{isMuted ? '🔇' : '🔊'}</span>
            <span className="hud-audio-text">{isMuted ? 'Audio: Muted' : 'Ambient: Active'}</span>
            {!isMuted && (
              <span className="hud-equalizer-bars">
                <span className="hud-eq-bar b1" />
                <span className="hud-eq-bar b2" />
                <span className="hud-eq-bar b3" />
              </span>
            )}
          </button>

          <div className="workshop-hud-guide-pill">
            <span className="hud-guide-key">W A S D</span>
            <span className="hud-guide-desc">Move</span>
            <span className="hud-guide-separator">•</span>
            <span className="hud-guide-key">Mouse</span>
            <span className="hud-guide-desc">Look</span>
          </div>
        </div>
      </div>

      {/* 3D Scene renders immediately with native lighting — zero blank waiting */}
      <React.Suspense fallback={<LoadingScreen />}>
        <WorkshopScene />
      </React.Suspense>
    </div>
  );
}
