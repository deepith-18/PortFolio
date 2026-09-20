import React from 'react';
import '../../styles/windows/QuestLogWindow.css';

const COMMITS = [
  { hash: 'a1b2c3d', date: 'Sep 2021', msg: 'init: enrolled in Computer Science Engineering', type: 'init', note: 'Main quest began.' },
  { hash: 'e4f5a6b', date: 'Jan 2022', msg: 'feat: completed Data Structures & Algorithms', type: 'feat', note: '+1200 XP' },
  { hash: '7c8d9e0', date: 'Aug 2022', msg: 'feat: built first web project with HTML/CSS/JS', type: 'feat' },
  { hash: 'f1a2b3c', date: 'Jan 2023', msg: 'feat: shipped first ML project — classification model', type: 'feat', note: 'AI arc unlocked' },
  { hash: '4d5e6f7', date: 'Jun 2023', msg: 'feat: developed Fake Review Detection system (94% acc)', type: 'feat', note: '◆ LEGENDARY' },
  { hash: 'a8b9c0d', date: 'Jan 2024', msg: 'feat: built AI Resume Screener — NLP pipeline', type: 'feat', note: '◆ LEGENDARY' },
  { hash: '1e2f3a4', date: 'May 2024', msg: 'feat: internship completed — production ML systems', type: 'feat', note: '🏆 Achievement' },
  { hash: 'b5c6d7e', date: 'Sep 2024', msg: 'chore: started contributing to kubernetes-sigs/kro', type: 'chore', note: 'Open source arc' },
  { hash: '8f9a0b1', date: 'Jan 2025', msg: 'feat: launched DeepithOS portfolio v1', type: 'feat' },
  { hash: 'c2d3e4f', date: 'May 2026', msg: 'quest: seeking Data Engineer role — ACTIVE', type: 'active', note: '⚔ Main quest' },
];

const TYPE_COLORS = {
  init:   '#8b949e',
  feat:   '#1eda60',
  chore:  '#ffd700',
  fix:    '#ff5f57',
  active: '#b060ff',
};

export default function QuestLogWindow() {
  return (
    <div className="quest-win">
      <div className="quest-header">
        <span className="quest-cmd">git log --oneline --graph deepith/career</span>
      </div>
      <div className="quest-log">
        {COMMITS.map((c, i) => (
          <div key={c.hash} className={`commit-row${c.type === 'active' ? ' active' : ''}`}>
            <div className="commit-graph">
              <div className="commit-line" style={i === 0 ? { top: '50%' } : i === COMMITS.length - 1 ? { bottom: '50%' } : {}} />
              <div className="commit-dot" style={{ background: TYPE_COLORS[c.type] }} />
            </div>
            <div className="commit-body">
              <div className="commit-meta">
                <span className="commit-hash">{c.hash}</span>
                <span className="commit-date">{c.date}</span>
                {c.note && <span className="commit-note">{c.note}</span>}
              </div>
              <div className="commit-msg">
                <span className="commit-type" style={{ color: TYPE_COLORS[c.type] }}>
                  {c.msg.split(':')[0]}:
                </span>
                <span className="commit-text">{c.msg.split(':').slice(1).join(':')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
