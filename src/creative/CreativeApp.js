import React, { useState, Suspense, useEffect } from 'react';
import IntroOverlay from './ui/IntroOverlay';
import LoadingScreen from './ui/LoadingScreen';
import ModeSwitchButton from './ui/ModeSwitchButton';
import DeskScene from './scene/DeskScene';
import './styles/creative.css';

export default function CreativeApp() {
  const [entered, setEntered] = useState(false);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    // Only mount the scene after user clicks enter to save resources
    if (entered) {
      // Small delay to let the intro fade out first before blocking thread with WebGL load
      const t = setTimeout(() => {
        setShowScene(true);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [entered]);

  return (
    <div className="creative-root">
      <IntroOverlay onEnter={() => setEntered(true)} />
      
      {entered && <ModeSwitchButton />}
      
      {showScene && (
        <Suspense fallback={<LoadingScreen />}>
          <DeskScene />
        </Suspense>
      )}
    </div>
  );
}
