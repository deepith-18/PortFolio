import React, { useState, useEffect } from 'react';

export default function OnboardingHint({ isMobile }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('workshop_onboarded');
    if (!hasSeen) {
      setVisible(true);
      // Automatically dismiss after 6 seconds, or they can click it
      const t = setTimeout(() => {
        setVisible(false);
        localStorage.setItem('workshop_onboarded', 'true');
      }, 6000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('workshop_onboarded', 'true');
  };

  return (
    <div className="onboarding-hint" onClick={dismiss}>
      <div className="onboarding-content">
        {isMobile ? (
          <>
            <span className="onboarding-badge">TOUCH</span>
            <p>Use joystick to move.<br/>Drag anywhere to look.</p>
          </>
        ) : (
          <>
            <span className="onboarding-badge">KEYS</span>
            <p>WASD to move.<br/>Mouse to look.</p>
          </>
        )}
      </div>
    </div>
  );
}
