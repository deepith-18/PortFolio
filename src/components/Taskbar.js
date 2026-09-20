// src/components/Taskbar.js
import React, { useState, useEffect } from 'react';
import '../styles/Taskbar.css';

export default function Taskbar({ 
  onRecruiterMode, 
  recruiterMode, 
  activeWorkspace = 1, 
  setActiveWorkspace,
  activeWindowTitle = "hyprland - terminal"
}) {
  const [time, setTime] = useState('');
  const [cpu, setCpu] = useState(21);
  const [mem, setMem] = useState(4.8);

  useEffect(() => {
    // Clock tick
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);

    // Randomize system resources for a tactile, responsive look
    const resourceId = setInterval(() => {
      setCpu(prev => Math.max(12, Math.min(85, prev + Math.floor(Math.random() * 9 - 4))));
      setMem(prev => Math.max(3.2, Math.min(14.2, Math.round((prev + (Math.random() * 0.4 - 0.2)) * 10) / 10)));
    }, 2000);

    return () => {
      clearInterval(id);
      clearInterval(resourceId);
    };
  }, []);

  // Format workspace names
  const WORKSPACES = [1, 2, 3];

  return (
    <div 
      className={`taskbar${recruiterMode ? ' recruiter-bottom' : ''}`}
      style={{
        top: recruiterMode ? 'auto' : 0,
        bottom: recruiterMode ? 0 : 'auto'
      }}
    >
      {recruiterMode ? (
        /* ============================================== */
        /* Recruiter Mode Taskbar Style (Clean Resume)   */
        /* ============================================== */
        <>
          <div className="taskbar-left">
            <div className="taskbar-logo">⬡ DeepithOS</div>
          </div>

          <div className="waybar-center">
            <span style={{ fontSize: '11px', color: '#666' }}>📋 Portfolio Resume Mode Active</span>
          </div>

          <div className="waybar-right">
            <button className="recruiter-btn active" onClick={onRecruiterMode}>
              📋 OS Mode
            </button>
            <div className="taskbar-clock">
              <span className="taskbar-time">{time}</span>
            </div>
          </div>
        </>
      ) : (
        /* ============================================== */
        /* OS Tiling Mode Top Status Bar Style (Waybar)  */
        /* ============================================== */
        <>
          {/* Workspaces (Fedora Hyprland setup) */}
          <div className="waybar-left">
            <span style={{ fontSize: '12px', color: '#1eda60', marginRight: '6px', fontWeight: 'bold' }}></span>
            {WORKSPACES.map(ws => (
              <button
                key={ws}
                className={`workspace-button${activeWorkspace === ws ? ' active' : ''}`}
                onClick={() => setActiveWorkspace?.(ws)}
                title={`Switch to Workspace ${ws}`}
              >
                {ws}
              </button>
            ))}
          </div>

          {/* Center Title - active window */}
          <div className="waybar-center">
            <div className="waybar-active-title">
              <span></span> {activeWindowTitle}
            </div>
          </div>

          {/* Right tray resources dashboard */}
          <div className="waybar-right">
            {/* CPU Stat */}
            <div className="sys-stat-badge">
              <span></span> CPU {cpu}%
            </div>

            {/* Memory Stat */}
            <div className="sys-stat-badge">
              <span></span> RAM {mem}GB
            </div>

            {/* Power Menu / OS Toggle button */}
            <button className="recruiter-btn" onClick={onRecruiterMode}>
              📋 Recruiter View
            </button>

            {/* Waybar Minimalist clock */}
            <div className="waybar-clock">
              <span></span> {time}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
