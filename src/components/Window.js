// src/components/Window.js
import React, { useState, useCallback, useEffect } from 'react';
import '../styles/Window.css';

export default function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isMinimized = false,
  isActive = false,
  onFocus,
  className = '',
}) {
  const [maximized, setMaximized] = useState(false);

  const handleFocus = useCallback(() => {
    onFocus?.(id);
  }, [id, onFocus]);

  // Auto-maximize on small screens (<768px) to guarantee readability on mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMaximized(true);
    }
  }, []);

  const toggleMaximize = () => {
    setMaximized(prev => !prev);
    handleFocus();
  };

  if (isMinimized) return null;

  // Tiling layouts are relative and occupy 100% of their split container,
  // while maximized layouts are absolute fullscreen overlays.
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
  const TASKBAR_H = 38;     // Taskbar height (always at top)
  const DOCK_H = 56;          // Bottom dock height (mobile)
  const style = maximized
    ? { 
        position: 'fixed', 
        left: 0, 
        // Icons are hidden when window is open, so window starts just below the Taskbar
        top: `${TASKBAR_H}px`, 
        width: '100vw', 
        // On mobile: fill from taskbar to above the dock
        // On desktop: fill entire space below taskbar
        height: isMobileView 
          ? `calc(100vh - ${TASKBAR_H}px - ${DOCK_H}px)` 
          : `calc(100vh - ${TASKBAR_H}px)`, 
        zIndex: 9999, 
        borderRadius: 0 
      }
    : { 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        zIndex: isActive ? 10 : 2 
      };

  const isTerminal = id === 'terminal' || title.toLowerCase().includes('terminal');

  return (
    <div
      className={`os-window${isActive ? ' active-focused' : ''} ${className}`}
      style={style}
      onMouseDown={handleFocus}
      onClick={handleFocus}
    >
      {/* Title bar */}
      <div 
        className="os-window-titlebar" 
        onDoubleClick={toggleMaximize}
      >
        <div className="os-window-controls">
          <button
            className="os-btn-dot close"
            onClick={(e) => { e.stopPropagation(); onClose?.(id); }}
            title="Close"
          />
          <button
            className="os-btn-dot minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize?.(id); }}
            title="Minimize"
          />
          <button
            className="os-btn-dot maximize"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            title="Maximize"
          />
        </div>
        
        <div className="os-window-title">
          {icon && <span className="os-window-icon">{icon}</span>}
          <span className="window-accent">{id}</span> — {title}
        </div>
        
        {/* Mobile: large visible close + minimize buttons */}
        <div className="os-window-mobile-controls">
          <button
            className="os-mobile-btn minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize?.(id); }}
            title="Minimize"
          >─</button>
          <button
            className="os-mobile-btn close"
            onClick={(e) => { e.stopPropagation(); onClose?.(id); }}
            title="Close"
          >✕</button>
        </div>

        {/* Desktop spacer (hidden on mobile) */}
        <div className="os-window-desktop-spacer" />
      </div>

      {/* Content */}
      <div className={`os-window-body${isTerminal ? ' terminal-body' : ''}`}>
        {children}
      </div>
    </div>
  );
}
