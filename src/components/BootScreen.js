import React, { useState, useEffect } from 'react';
import '../styles/BootScreen.css';

const BOOT_LINES = [
  { text: 'DeepithOS v1.0.0 — BIOS initialized', delay: 0 },
  { text: 'CPU: Full Stack Developer @ 4.2GHz', delay: 300 },
  { text: 'RAM: 3 years experience loaded', delay: 600 },
  { text: 'Mounting /dev/skills...', delay: 900 },
  { text: '  [OK] Python, Java, React, Node, SQL', delay: 1200 },
  { text: '  [OK] Machine Learning, NLP, LLMs', delay: 1500 },
  { text: '  [OK] Kubernetes, Docker, Cloud', delay: 1800 },
  { text: 'Mounting /dev/projects...', delay: 2100 },
  { text: '  [OK] 6 projects indexed (2 legendary)', delay: 2400 },
  { text: 'Starting AI subsystem...', delay: 2700 },
  { text: '  [OK] Terminal NPC online', delay: 3000 },
  { text: 'Loading desktop environment...', delay: 3300 },
  { text: '', delay: 3600 },
  { text: 'System ready. Welcome, Recruiter.', delay: 3900, highlight: true },
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setDone(true), 800);
          setTimeout(() => setFadeOut(true), 1400);
          setTimeout(() => onComplete(), 2000);
        }
      }, line.delay);
    });
  }, [onComplete]);

  return (
    <div className={`boot-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="boot-scanlines" />
      <div className="boot-content">
        <div className="boot-logo">
          <span className="boot-logo-bracket">[</span>
          DEEPITH<span className="boot-logo-accent">OS</span>
          <span className="boot-logo-bracket">]</span>
        </div>
        <div className="boot-terminal">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={`boot-line${line.highlight ? ' highlight' : ''}`}
            >
              {line.text}
            </div>
          ))}
          {!done && <span className="boot-cursor">█</span>}
        </div>
        {done && (
          <div className="boot-enter" onClick={() => { setFadeOut(true); setTimeout(onComplete, 600); }}>
            Press <span>ENTER</span> to continue
          </div>
        )}
      </div>
    </div>
  );
}
