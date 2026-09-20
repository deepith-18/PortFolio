import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import RoomModel from './RoomModel';
import RoomLighting from './lighting/RoomLighting';
import PlayerController from '../player/PlayerController';
import MobilePlayerController from '../player/MobilePlayerController';
import MobileJoystick from '../ui/MobileJoystick';
import useResponsiveControls from '../hooks/useResponsiveControls';
import useProximityTrigger from '../hooks/useProximityTrigger';
import InteractPrompt from '../ui/InteractPrompt';
import InfoPanel from '../ui/InfoPanel';
import OnboardingHint from '../ui/OnboardingHint';
import { audioManager } from '../audio/AudioManager';

function InteractionManager({ onZoneChange }) {
  useProximityTrigger(onZoneChange);
  return null;
}

export default function WorkshopScene() {
  const { isMobile } = useResponsiveControls();
  const [activeZone, setActiveZone] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    audioManager.setMuted(newMuted);
    setIsMuted(newMuted);
  };

  // Forward zone changes to spatial audio engine
  const handleZoneChange = React.useCallback((zone) => {
    setActiveZone(zone);
    audioManager.setZone(zone);
  }, []);

  const handleInteract = () => {
    if (activeZone) setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
  };

  // Keyboard 'E' listener for desktop
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyE' && activeZone && !panelOpen) {
        setPanelOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeZone, panelOpen]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      {/* Background Blur when panel is open */}
      <div className={`workshop-blur ${panelOpen ? 'active' : ''}`} />

      <Canvas 
        shadows={!isMobile} 
        dpr={isMobile ? Math.min(window.devicePixelRatio, 2) : [1, 2]} 
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDarkMode ? 1.15 : 1.05
        }}
      >
        <Suspense fallback={null}>
          <RoomLighting isDarkMode={isDarkMode} />
          <RoomModel isDarkMode={isDarkMode} />
          {!isMobile && <PlayerController isActive={!panelOpen} />}
          {isMobile && <MobilePlayerController isActive={!panelOpen} />}
          <InteractionManager onZoneChange={handleZoneChange} />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      {isMobile && !panelOpen && <MobileJoystick />}
      
      {!panelOpen && (
        <InteractPrompt 
          activeZone={activeZone} 
          isMobile={isMobile} 
          onInteract={handleInteract} 
        />
      )}

      {panelOpen && (
        <InfoPanel activeZone={activeZone} onClose={handleClose} />
      )}

      <OnboardingHint isMobile={isMobile} />

      {/* Theme Toggle */}
      <button className="workshop-theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      {/* Mute Toggle */}
      <button className="workshop-mute-btn" onClick={handleToggleMute}>
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}
