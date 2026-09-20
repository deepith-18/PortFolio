// src/components/Desktop.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import QuestLogWindow from './windows/QuestLogWindow';
import AchievementsWindow from './windows/AchievementsWindow';
import TerminalWindow from './windows/TerminalWindow';
import OpenSourceWindow from './windows/OpenSourceWindow';
import AdditionalInfoWindow from './windows/AdditionalInfoWindow';
import ContactWindow from './windows/ContactWindow';
import MagnetWallpaper from './MagnetWallpaper';
import '../styles/Desktop.css';

// Stunning custom gradient SVG Icons for high-fidelity desktop look
// ctx prop makes gradient IDs unique per render location (avoids SVG ID clashes between icon grid & dock)
function OSIcon({ id, size = 42, ctx = 'g' }) {
  // Unique gradient ID per context+id combo
  const gid = `grad-${ctx}-${id}`;
  const gradients = {
    about: ['#3b82f6', '#1d4ed8'],
    projects: ['#ff7e5f', '#feb47b'],
    skills: ['#10b981', '#059669'],
    opensource: ['#a855f7', '#6b21a8'],
    questlog: ['#f59e0b', '#d97706'],
    achievements: ['#eab308', '#ca8a04'],
    terminal: ['#06b6d4', '#0891b2'],
    additional: ['#fbbf24', '#f59e0b'],
    contact: ['#06b6d4', '#0891b2'],
    recruiter: ['#ec4899', '#8b5cf6']
  };

  const colors = gradients[id] || ['#94a3b8', '#64748b'];

  const svgStyle = {
    width: size,
    height: size,
    filter: `drop-shadow(0 4px 10px rgba(${id === 'skills' ? '16,185,129' : id === 'about' ? '59,130,246' : '100,255,218'}, 0.45))`
  };

  const svgs = {
    about: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <circle cx="12" cy="12" r="11" fill={`url(#${gid})`} opacity="0.15" stroke={`url(#${gid})`} strokeWidth="1.5" />
        <circle cx="12" cy="8" r="4" fill={`url(#${gid})`} />
        <path d="M4 19C4 15 8 13 12 13C16 13 20 15 20 19" stroke={`url(#${gid})`} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    projects: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <path d="M3 6C3 4.89543 3.89543 4 5 4H9.5L11.5 6.5H19C20.1046 6.5 21 7.39543 21 8.5V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <path d="M8 12H16M10 16H14" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    skills: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <rect x="4" y="4" width="16" height="16" rx="3" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill={`url(#${gid})`} />
        <path d="M9 1V4M15 1V4M9 20V23M15 20V23M1 9H4M1 15H4M20 9H23M20 15H23" stroke={`url(#${gid})`} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    questlog: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <path d="M4 19.5C4 18.12 5.12 17 6.5 17H20V3H6.5C5.12 3 4 4.12 4 5.5V19.5ZM4 19.5C4 20.88 5.12 22 6.5 22H20" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7H16M8 11H14" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    achievements: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <path d="M6 9H4.5C3.12 9 2 7.88 2 6.5C2 5.12 3.12 4 4.5 4H6V9ZM18 9H19.5C20.88 9 22 7.88 22 6.5C22 5.12 20.88 4 19.5 4H18V9Z" fill={`url(#${gid})`} opacity="0.3" stroke={`url(#${gid})`} strokeWidth="1.5" />
        <path d="M6 4V10C6 13.31 8.69 16 12 16C15.31 16 18 13.31 18 10V4H6Z" fill={`url(#${gid})`} opacity="0.15" stroke={`url(#${gid})`} strokeWidth="2" />
        <path d="M12 16V20M8 20H16" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="16" rx="2" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <path d="M7 9L10 12L7 15" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="17" y2="15" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    opensource: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <circle cx="12" cy="12" r="11" fill={`url(#${gid})`} opacity="0.15" stroke={`url(#${gid})`} strokeWidth="1.5" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill={`url(#${gid})`} />
      </svg>
    ),
    additional: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <rect x="4" y="4" width="16" height="16" rx="3" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <path d="M8 8H16M8 12H16M8 16H13" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    contact: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <rect x="3" y="5" width="18" height="14" rx="2" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <path d="M3 7L12 13L21 7" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    recruiter: (
      <svg viewBox="0 0 24 24" fill="none" style={svgStyle}>
        <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]} /><stop offset="100%" stopColor={colors[1]} /></linearGradient></defs>
        <rect x="2" y="6" width="20" height="12" rx="4" fill={`url(#${gid})`} opacity="0.2" stroke={`url(#${gid})`} strokeWidth="2" />
        <circle cx="15" cy="11" r="1.5" fill={`url(#${gid})`} />
        <circle cx="17" cy="13" r="1.5" fill={`url(#${gid})`} />
        <path d="M5 12h4M7 10v4" stroke={`url(#${gid})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  };

  return svgs[id] || <div style={{ fontSize: size }}>👾</div>;
}

// Interactive real-time desktop background widgets to cover wallpaper text
function ConkyWidget({ activeWorkspace, activeWindowCount }) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="desktop-conky-widget">
      <div className="conky-clock">{time}</div>
      <div className="conky-date">{date}</div>
      
      <div className="conky-stats-grid">
        <div className="conky-stat-row">
          <span className="conky-label">Host:</span>
          <span className="conky-value">DeepithOS-PC</span>
        </div>
        <div className="conky-stat-row">
          <span className="conky-label">OS:</span>
          <span className="conky-value">Fedora 40 (Hyprland WM)</span>
        </div>
        <div className="conky-stat-row">
          <span className="conky-label">Shell:</span>
          <span className="conky-value">zsh + starship</span>
        </div>
        <div className="conky-stat-row">
          <span className="conky-label">Workspace:</span>
          <span className="conky-value">Virtual Screen {activeWorkspace}</span>
        </div>
        <div className="conky-stat-row">
          <span className="conky-label">Active Tiles:</span>
          <span className="conky-value">{activeWindowCount} open</span>
        </div>
      </div>

      <div className="conky-quest-card">
        <div className="conky-quest-title">
          <span>⚡</span> ACTIVE QUEST
        </div>
        <div className="conky-quest-desc">
          Seeking a Data Engineering / Full Stack Developer internship to build robust data processing pipelines and modern responsive systems.
        </div>
      </div>
    </div>
  );
}

const DESKTOP_ICONS = [
  { id: 'recruiter',    label: 'RecruiterMode.exe', desc: '🎮 Recruiter Mode' },
  { id: 'about',        label: 'About.exe',      desc: 'Character profile' },
  { id: 'projects',     label: 'Projects.exe',   desc: 'Inventory list' },
  { id: 'skills',       label: 'Skills.exe',     desc: 'Skill tree tree' },
  { id: 'opensource',   label: 'OpenSource.exe', desc: 'Open source contributions' },
  { id: 'additional',   label: 'AdditionalInfo.exe', desc: 'Profile details & interests' },
  { id: 'contact',      label: 'Contact.exe',    desc: 'Connect & collaborate' },
  { id: 'questlog',     label: 'QuestLog.exe',   desc: 'Timeline timeline' },
  { id: 'achievements', label: 'Achievements.exe',desc: 'Certifications' },
  { id: 'terminal',     label: 'Terminal.exe',   desc: 'Interactive shell' },
];

const WINDOW_MAP = {
  about:        { component: AboutWindow,        title: 'About.exe — Character Profile', icon: '👾' },
  projects:     { component: ProjectsWindow,     title: 'Projects.exe — Inventory',      icon: '🎒' },
  skills:       { component: SkillsWindow,       title: 'Skills.exe — Skill Tree',       icon: '🌳' },
  opensource:   { component: OpenSourceWindow,   title: 'OpenSource.exe — Contributions', icon: '🌍' },
  additional:   { component: AdditionalInfoWindow, title: 'AdditionalInfo.exe — Profile Details', icon: '⭐' },
  contact:      { component: ContactWindow,      title: 'Contact.exe — Connect',         icon: '📬' },
  questlog:     { component: QuestLogWindow,     title: 'QuestLog.exe — Timeline',       icon: '📜' },
  achievements: { component: AchievementsWindow, title: 'Achievements.exe',              icon: '🏆' },
  terminal:     { component: TerminalWindow,     title: 'Terminal.exe — DeepithOS Shell',icon: '💻' },
};

export default function Desktop({ 
  activeWorkspace = 1, 
  setActiveWorkspace, 
  onFocusChange,
  onLaunchRecruiterMode
}) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  // Keep isMobile in sync with window resize
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Pre-open all windows on initial boot
  const [openWindows, setOpenWindows] = useState({
    about: true,
    questlog: true,
    projects: true,
    skills: true,
    achievements: true,
    terminal: true,
    opensource: true,
    additional: true,
    contact: true
  });
  
  const [minimized, setMinimized] = useState({});
  const [focusedWindowId, setFocusedWindowId] = useState('about');
  const [notifications, setNotifications] = useState([]);
  
  // Dynamic window mapping to virtual workspaces. 
  // Clicking or launching an app will open it in the active workspace!
  const [windowWorkspaces, setWindowWorkspaces] = useState({
    about: 1,
    questlog: 1,
    projects: 2,
    skills: 2,
    opensource: 2,
    achievements: 3,
    terminal: 3,
    additional: 3,
    contact: 3
  });

  // Wofi Launcher Modal visibility
  const [showWofi, setShowWofi] = useState(false);
  const [wofiSearch, setWofiSearch] = useState('');
  const wofiInputRef = useRef(null);

  // Notify parent of initial window focus
  useEffect(() => {
    onFocusChange?.('about.exe');
  }, [onFocusChange]);

  const openWindow = useCallback((id) => {
    setOpenWindows(prev => ({ ...prev, [id]: true }));
    setMinimized(prev => ({ ...prev, [id]: false }));
    setFocusedWindowId(id);
    
    // Assign the opened window to the current active workspace!
    setWindowWorkspaces(prev => ({ ...prev, [id]: activeWorkspace }));
    onFocusChange?.(`${id}.exe`);
    pushNotification(` OS: floating window "${id}" opened in Workspace ${activeWorkspace}`);
  }, [activeWorkspace, onFocusChange]);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
    if (focusedWindowId === id) {
      setFocusedWindowId(null);
      onFocusChange?.('fedora - desktop');
    }
  }, [focusedWindowId, onFocusChange]);

  const minimizeWindow = useCallback((id) => {
    setMinimized(prev => ({ ...prev, [id]: true }));
    if (focusedWindowId === id) {
      setFocusedWindowId(null);
      onFocusChange?.('fedora - desktop');
    }
  }, [focusedWindowId, onFocusChange]);

  const focusWindow = useCallback((id) => {
    setFocusedWindowId(id);
    onFocusChange?.(`${id}.exe`);
  }, [onFocusChange]);

  // Dock item clicked action
  const handleDockItemClick = useCallback((id) => {
    if (id === 'recruiter') {
      setIsFadingOut(true);
      pushNotification(" OS: Launching 3D Career Universe... Fading out OS");
      setTimeout(() => {
        onLaunchRecruiterMode?.();
      }, 1000);
      return;
    }

    const isOpen = openWindows[id];
    const isMin = minimized[id];
    const isFocused = focusedWindowId === id;

    if (!isOpen) {
      openWindow(id);
    } else if (isMin) {
      // Restore
      setMinimized(prev => ({ ...prev, [id]: false }));
      setFocusedWindowId(id);
      // Bring to current workspace if minimized
      setWindowWorkspaces(prev => ({ ...prev, [id]: activeWorkspace }));
      onFocusChange?.(`${id}.exe`);
    } else if (isFocused) {
      // Toggle minimize if already focused
      minimizeWindow(id);
    } else {
      // Bring focus and pull to current workspace!
      setFocusedWindowId(id);
      setWindowWorkspaces(prev => ({ ...prev, [id]: activeWorkspace }));
      onFocusChange?.(`${id}.exe`);
    }
  }, [openWindows, minimized, focusedWindowId, activeWorkspace, openWindow, minimizeWindow, onFocusChange, onLaunchRecruiterMode]);

  const pushNotification = (msg) => {
    const key = Date.now();
    setNotifications(prev => [...prev, { key, msg }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.key !== key));
    }, 2800);
  };

  // Keyboard Shortcuts Trigger (Linux Hyprland style)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Wofi Launcher: Alt+Space
      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        setShowWofi(prev => !prev);
      }
      
      // Close Focused Window: Alt+Q
      if (e.altKey && e.code === 'KeyQ') {
        e.preventDefault();
        if (focusedWindowId) {
          closeWindow(focusedWindowId);
          pushNotification(` OS: killed focused window "${focusedWindowId}"`);
        }
      }

      // Workspace Switch: Alt+1, Alt+2, Alt+3
      if (e.altKey && ['Digit1', 'Digit2', 'Digit3'].includes(e.code)) {
        e.preventDefault();
        const ws = parseInt(e.code.replace('Digit', ''));
        setActiveWorkspace?.(ws);
        pushNotification(` Workspace: switched to workspace ${ws}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedWindowId, closeWindow, setActiveWorkspace]);

  // Focus Wofi search input when modal opens
  useEffect(() => {
    if (showWofi && wofiInputRef.current) {
      wofiInputRef.current.focus();
    }
  }, [showWofi]);

  // Filter apps in Wofi Launcher search
  const filteredApps = DESKTOP_ICONS.filter(app => 
    app.label.toLowerCase().includes(wofiSearch.toLowerCase()) || 
    app.desc.toLowerCase().includes(wofiSearch.toLowerCase())
  );

  // Compute active windows currently open on the active workspace
  const activeWindowsInWorkspace = Object.entries(openWindows)
    .filter(([id, isOpen]) => isOpen && !minimized[id] && windowWorkspaces[id] === activeWorkspace)
    .map(([id]) => id);

  // Render a specific window helper
  const renderTiledWindow = (id) => {
    const cfg = WINDOW_MAP[id];
    if (!cfg) return null;
    const ContentComponent = cfg.component;

    return (
      <Window
        key={id}
        id={id}
        title={cfg.title}
        icon={cfg.icon}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        isActive={focusedWindowId === id}
        onFocus={focusWindow}
      >
        <ContentComponent />
      </Window>
    );
  };

  // Determine Tiling Layout Grid Structure

  const renderTilingGrid = () => {
    const list = activeWindowsInWorkspace;
    if (list.length === 0) return null;

    // Mobile Responsive Layout: Only render the currently focused window at 100% fullscreen
    // to prevent extremely squished vertical panels!
    if (isMobile) {
      const activeFocusedId = list.includes(focusedWindowId) ? focusedWindowId : list[0];
      return (
        <div className="desktop-tiling-area">
          {renderTiledWindow(activeFocusedId)}
        </div>
      );
    }

    // Desktop Layout: Auto-tiling screen partitions
    if (list.length === 1) {
      return (
        <div className="desktop-tiling-area">
          {renderTiledWindow(list[0])}
        </div>
      );
    }

    if (list.length === 2) {
      return (
        <div className="desktop-tiling-area">
          <div className="tiling-col">
            {renderTiledWindow(list[0])}
          </div>
          <div className="tiling-col">
            {renderTiledWindow(list[1])}
          </div>
        </div>
      );
    }

    // Master-Stack Layout (3+ Windows)
    return (
      <div className="desktop-tiling-area">
        {/* Left column: Master window */}
        <div className="tiling-col" style={{ flex: 1.2 }}>
          {renderTiledWindow(list[0])}
        </div>

        {/* Right column: Stack containing remaining active windows */}
        <div className="tiling-col">
          {list.slice(1).map(id => (
            <div key={id} style={{ flex: 1, minHeight: 0 }}>
              {renderTiledWindow(id)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // On mobile: hide icon grid when any window is open (phone home screen behavior)
  const hasActiveWindow = isMobile && activeWindowsInWorkspace.length > 0;

  return (
    <div 
      className={`desktop${isFadingOut ? ' desktop-fading-out' : ''}${hasActiveWindow ? ' has-active-window' : ''}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Mountain_dark.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Floating Exit to Portfolio Bar */}
      <div style={{
        position: 'fixed',
        top: '12px',
        left: '20px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(94, 234, 212, 0.35)',
        padding: '6px 16px',
        borderRadius: '30px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }}>
        <button
          onClick={onLaunchRecruiterMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#5eead4',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.85rem'
          }}
        >
          ← Return to Main Portfolio
        </button>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          HYPRLAND DEMO
        </span>
      </div>

      {/* Caching Needle Pointer grid background */}
      <MagnetWallpaper />

      {/* Modern Live Conky Background Widget (hides static empty text of wallpaper) */}
      <ConkyWidget 
        activeWorkspace={activeWorkspace} 
        activeWindowCount={activeWindowsInWorkspace.length} 
      />

      {/* Real OS Desktop Shortcuts Grid (renders behind windows, zIndex: 2) */}
      <div className="desktop-icons">
        {DESKTOP_ICONS.map(icon => (
          <div
            key={icon.id}
            className="desktop-icon"
            onClick={() => handleDockItemClick(icon.id)}
            onDoubleClick={() => handleDockItemClick(icon.id)}
            title={`Launch ${icon.label} in current Workspace`}
          >
            {/* High-Fidelity SVG Icon Base */}
            <div className="desktop-icon-img">
              <OSIcon id={icon.id} size={44} ctx="grid" />
            </div>
            
            {/* Authentic shortcut link arrow indicator */}
            <div className="desktop-icon-shortcut-arrow" />
            
            <div className="desktop-icon-label">{icon.label}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Master-Stack Window Manager Tiling Area */}
      {renderTilingGrid()}

      {/* ==================================================== */}
      {/* 2. Glassmorphic App Dock Panel (GNOME/macOS style)  */}
      {/* ==================================================== */}
      <div className="os-dock-container">
        {DESKTOP_ICONS.map(app => {
          const isOpen = openWindows[app.id] && !minimized[app.id];
          const isFocused = focusedWindowId === app.id && isOpen;
          
          return (
            <div
              key={app.id}
              className={`os-dock-item${isFocused ? ' focused' : ''}`}
              onClick={() => handleDockItemClick(app.id)}
              title={`Toggle ${app.label}`}
            >
              <OSIcon id={app.id} size={34} ctx="dock" />
              
              {/* Glowing activity dots */}
              {isOpen && (
                <div className={`os-dock-dot${isFocused ? ' focused' : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* WOFI APP LAUNCHER OVERLAY (Alt+Space)              */}
      {/* ==================================================== */}
      {showWofi && (
        <div className="wofi-launcher-overlay" onClick={() => setShowWofi(false)}>
          <div className="wofi-launcher-box" onClick={e => e.stopPropagation()}>
            <input
              ref={wofiInputRef}
              type="text"
              className="wofi-search-input"
              placeholder="Search developers apps... (e.g. projects, term)"
              value={wofiSearch}
              onChange={e => setWofiSearch(e.target.value)}
            />

            <div className="wofi-apps-list">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => (
                  <button
                    key={app.id}
                    className="wofi-app-item"
                    onClick={() => {
                      handleDockItemClick(app.id);
                      setShowWofi(false);
                      setWofiSearch('');
                    }}
                  >
                    <span className="wofi-app-item-emoji">
                      <OSIcon id={app.id} size={22} ctx="wofi" />
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{app.label}</span>
                    <span className="wofi-app-item-desc">{app.desc}</span>
                  </button>
                ))
              ) : (
                <div style={{ padding: '20px', color: '#ff7139', textAlign: 'center', fontSize: '11px' }}>
                  No developer executable matches search
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OS Notifications banner */}
      <div className="os-notifications">
        {notifications.map(n => (
          <div key={n.key} className="os-notif">{n.msg}</div>
        ))}
      </div>
    </div>
  );
}
