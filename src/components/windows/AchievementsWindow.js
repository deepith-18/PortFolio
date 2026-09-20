import React, { useState, useEffect } from 'react';
import '../../styles/windows/AchievementsWindow.css';

const ACHIEVEMENTS = [
  { id: 1, icon: '🎓', title: 'NPTEL Certified',           desc: 'Data Science course certification',                rarity: 'gold',   delay: 0 },
  { id: 2, icon: '💼', title: 'Microsoft Career Essentials', desc: 'AI & Career development program',                rarity: 'gold',   delay: 150 },
  { id: 3, icon: '🏢', title: 'Internship Complete',         desc: 'Shipped production ML systems',                  rarity: 'gold',   delay: 300 },
  { id: 4, icon: '🤖', title: 'AI Builder',                  desc: 'Built 2 legendary AI projects',                  rarity: 'purple', delay: 450 },
  { id: 5, icon: '🌐', title: 'Open Source Contributor',     desc: 'PR merged in kubernetes-sigs/kro',               rarity: 'purple', delay: 600 },
  { id: 6, icon: '🖥️', title: 'OS Architect',                desc: 'Built a portfolio as an operating system',       rarity: 'purple', delay: 750 },
  { id: 7, icon: '📊', title: 'Data Wrangler',               desc: 'Processed and analyzed large datasets',          rarity: 'blue',   delay: 900 },
  { id: 8, icon: '⚙️',  title: 'Kubernetes Explorer',         desc: 'Worked with K8s CRDs and controllers',           rarity: 'blue',   delay: 1050 },
  { id: 9, icon: '🔒', title: '???',                          desc: 'Hidden achievement. Keep exploring.',            rarity: 'secret', delay: 1200, locked: true },
];

export default function AchievementsWindow() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    ACHIEVEMENTS.forEach((a) => {
      setTimeout(() => {
        setVisible(prev => [...prev, a.id]);
      }, a.delay);
    });
  }, []);

  return (
    <div className="ach-win">
      <div className="ach-header">
        <span className="ach-count">{ACHIEVEMENTS.filter(a => !a.locked).length} / {ACHIEVEMENTS.length} unlocked</span>
        <div className="ach-progress-bar">
          <div
            className="ach-progress-fill"
            style={{ width: `${(ACHIEVEMENTS.filter(a => !a.locked).length / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="ach-grid">
        {ACHIEVEMENTS.map(a => (
          <div
            key={a.id}
            className={`ach-card rarity-${a.rarity}${a.locked ? ' locked' : ''}${visible.includes(a.id) ? ' visible' : ''}`}
          >
            <div className="ach-icon">{a.icon}</div>
            <div className="ach-body">
              <div className="ach-title">{a.title}</div>
              <div className="ach-desc">{a.locked ? '???' : a.desc}</div>
            </div>
            {!a.locked && (
              <div className={`ach-badge rarity-badge-${a.rarity}`}>✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
