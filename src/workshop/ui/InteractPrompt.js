import React from 'react';

export default function InteractPrompt({ activeZone, isMobile, onInteract }) {
  if (!activeZone) return null;

  return (
    <div className="interact-prompt" onClick={onInteract}>
      {isMobile ? (
        <span>Tap to inspect</span>
      ) : (
        <span>Press <kbd>E</kbd> to inspect</span>
      )}
    </div>
  );
}
