import React, { useState, useEffect, useCallback } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/LaptopLanding.css';

export default function LaptopLanding({ onEnterFedora, onEnterWorkshop, theme, setTheme }) {
  const [transition,  setTransition]  = useState(null);
  const [flashActive, setFlashActive] = useState(false);
  const [workshopExit,setWorkshopExit]= useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const triggerFedora = useCallback(() => {
    if (transition) return;
    setTransition('fedora');
    setTimeout(() => setFlashActive(true), 600);
    setTimeout(() => onEnterFedora(), 1200);
  }, [transition, onEnterFedora]);

  const triggerWorkshop = useCallback(() => {
    if (transition) return;
    setTransition('workshop');
    setWorkshopExit(true);
    setTimeout(() => { onEnterWorkshop(); }, 950);
  }, [transition, onEnterWorkshop]);

  return (
    <div className={`ll-root ${mounted ? 'll-mounted' : ''} ${transition ? `ll-transition-${transition}` : ''}`}>
      {/* Decorative Blueprint Grid & Orbs */}
      <div className="ll-blueprint-grid" />
      <div className="ll-ambient-orb ll-orb-1" />
      <div className="ll-ambient-orb ll-orb-2" />
      <div className="ll-ambient-orb ll-orb-3" />

      {/* Tech Corner Markers */}
      <div className="ll-tech-marker ll-marker-tl" />
      <div className="ll-tech-marker ll-marker-tr" />
      <div className="ll-tech-marker ll-marker-bl" />
      <div className="ll-tech-marker ll-marker-br" />

      {/* Theme Toggle Button */}
      <button 
        className="ll-theme-toggle" 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle Theme"
        title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>

      {/* OS Boot Flash */}
      <div className={`ll-flash${flashActive ? ' ll-flash-active' : ''}`} />
      
      {/* Workshop Exit Fade */}
      <div className={`ll-workshop-exit${workshopExit ? ' ll-workshop-exit-active' : ''}`} />

      {/* Main Luxury Presentation Wrapper */}
      <div className="ll-presentation-wrapper">
        {/* Top Header Presentation Block */}
        <div className="ll-header-block">
          {/* Developer Monogram (Rotating blue ring on hover) */}
          <div className="ll-profile-wrap">
            <div className="ll-avatar ll-avatar-monogram">DN</div>
            <div className="ll-avatar-halo" />
          </div>

          <h1 className="ll-name">DEEPITH N</h1>
          <p className="ll-role">SOFTWARE DEVELOPER</p>
          <p className="ll-tagline">"Building immersive digital experiences through code and creativity."</p>
        </div>

        {/* Horizontal / Vertical Panels Layout */}
        <div className="ll-panels-grid">
          
          {/* Panel 1: Resume PDF */}
          <a
            href="/Deepith-4.pdf"
            target="_blank"
            rel="noreferrer"
            className="ll-panel-card ll-card-resume"
          >
            <div className="ll-card-header">
              <span className="ll-card-icon">📄</span>
              <h2 className="ll-card-title">Resume PDF</h2>
            </div>
            <p className="ll-card-subtitle">View my professional resume.</p>
          </a>

          {/* Panel 2: Enter Fedora OS (Highlighted Primary Action) */}
          <button
            onClick={triggerFedora}
            className="ll-panel-card ll-card-fedora ll-card-primary"
          >
            <div className="ll-card-header">
              <span className="ll-card-icon">💻</span>
              <h2 className="ll-card-title">OS Mode</h2>
            </div>
            <p className="ll-card-subtitle">Enter the interactive portfolio experience.</p>
            <div className="ll-sweeper" />
          </button>

          {/* Panel 3: Explore 3D Workshop */}
          <button
            onClick={triggerWorkshop}
            className="ll-panel-card ll-card-workshop"
          >
            <div className="ll-card-header">
              <div className="ll-cube-container">
                <div className="ll-wireframe-cube">
                  <div className="cube-face face-front" />
                  <div className="cube-face face-back" />
                  <div className="cube-face face-left" />
                  <div className="cube-face face-right" />
                  <div className="cube-face face-top" />
                  <div className="cube-face face-bottom" />
                </div>
              </div>
              <h2 className="ll-card-title">Explore 3D Workshop</h2>
            </div>
            <p className="ll-card-subtitle">Step inside my creative 3D workspace.</p>
          </button>

        </div>

        {/* Bottom System Status */}
        <div className="ll-status-block">
          <span className="ll-status-dot" />
          <span className="ll-status-text">SYSTEM: ONLINE</span>
        </div>
      </div>
    </div>
  );
}
