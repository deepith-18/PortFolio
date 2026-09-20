import React, { useState, useEffect, Suspense } from 'react';
import MainPortfolio from './components/MainPortfolio';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WorkshopApp from './workshop/WorkshopApp';
import CreativeEntry from './creative/routes/CreativeEntry';
import './App.css';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  // View state: 'portfolio' (default, unified single page), 'workshop' (3D), 'desktop' (Hyprland OS)
  const [view, setView] = useState(() => {
    if (window.location.hash === '#/workshop' || window.location.pathname === '/workshop') {
      return 'workshop';
    }
    if (window.location.hash === '#/os' || window.location.hash === '#/desktop') {
      return 'desktop';
    }
    return 'portfolio';
  });

  // Global Theme: defaults to 'dark' for modern developer aesthetic
  const [theme, setTheme] = useState('dark');

  // Hyprland desktop state (only when in 'desktop' view)
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [activeWindowTitle, setActiveWindowTitle] = useState('hyprland - terminal');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setCurrentPath(path);
      setCurrentHash(hash);

      if (hash === '#/workshop' || path === '/workshop') {
        setView('workshop');
      } else if (hash === '#/os' || hash === '#/desktop') {
        setView('desktop');
      } else if (!hash || hash === '#' || hash === '#/' || hash.startsWith('#projects') || hash.startsWith('#about') || hash.startsWith('#skills') || hash.startsWith('#contact')) {
        setView('portfolio');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleReturnToPortfolio = () => {
    setView('portfolio');
    if (window.location.hash === '#/workshop' || window.location.hash === '#/os' || window.location.hash === '#/desktop') {
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch {
        window.location.hash = '';
      }
    }
  };

  const handleEnterWorkshop = () => {
    setView('workshop');
    try {
      window.history.pushState(null, '', '#/workshop');
    } catch {
      window.location.hash = '#/workshop';
    }
  };

  const handleEnterOS = () => {
    setView('desktop');
    try {
      window.history.pushState(null, '', '#/os');
    } catch {
      window.location.hash = '#/os';
    }
  };

  // Special creative studio route
  const isCreativeMode = currentPath === '/creative' || currentPath === '/studio' || currentHash === '#/creative' || currentHash === '#/studio';
  if (isCreativeMode) return <CreativeEntry />;

  // 3D Workshop Mode
  if (view === 'workshop') {
    return (
      <Suspense fallback={<div style={{ background: '#08090d', height: '100vh' }} />}>
        <WorkshopApp onBackToPortfolio={handleReturnToPortfolio} />
      </Suspense>
    );
  }

  // Simulated Hyprland OS Mode
  if (view === 'desktop') {
    return (
      <>
        <Desktop
          activeWorkspace={activeWorkspace}
          setActiveWorkspace={setActiveWorkspace}
          onFocusChange={setActiveWindowTitle}
          onLaunchRecruiterMode={handleReturnToPortfolio}
        />
        <Taskbar
          onRecruiterMode={handleReturnToPortfolio}
          recruiterMode={false}
          activeWorkspace={activeWorkspace}
          setActiveWorkspace={setActiveWorkspace}
          activeWindowTitle={activeWindowTitle}
        />
      </>
    );
  }

  // Default: Unified, Clean, Professional Main Portfolio
  return (
    <MainPortfolio
      onEnterWorkshop={handleEnterWorkshop}
      onEnterOS={handleEnterOS}
      theme={theme}
      setTheme={setTheme}
    />
  );
}