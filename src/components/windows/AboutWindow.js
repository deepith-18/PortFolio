import React, { useState } from 'react';
import '../../styles/windows/AboutWindow.css';

const STATS = [
  { label: 'Python', level: 5, max: 5, color: '#3572A5' },
  { label: 'Java', level: 4, max: 5, color: '#b07219' },
  { label: 'React', level: 4, max: 5, color: '#61dafb' },
  { label: 'Machine Learning', level: 4, max: 5, color: '#1eda60' },
  { label: 'SQL', level: 4, max: 5, color: '#e38c00' },
  { label: 'Node.js', level: 3, max: 5, color: '#68a063' },
];

const SPECIALIZATIONS = ['Software Developer', 'Machine Learning', 'Full Stack Developer'];

export default function AboutWindow() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="about-win">
      {/* Left panel */}
      <div className="about-left">
        <div className="char-avatar">
          <div className="char-avatar-inner">DN</div>
          <div className="char-level-badge">Lv.21</div>
        </div>
        <div className="char-name">Deepith N</div>
        <div className="char-class">Software Developer</div>
        <div className="char-specs">
          {SPECIALIZATIONS.map(s => (
            <span key={s} className="char-spec-tag">{s}</span>
          ))}
        </div>
        <div className="char-xp-section">
          <div className="char-xp-label">
            <span>EXP</span>
            <span>8,400 / 10,000</span>
          </div>
          <div className="char-xp-bar">
            <div className="char-xp-fill" style={{ width: '84%' }} />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="about-right">
        <div className="about-tabs">
          {['profile', 'stats', 'lore'].map(t => (
            <button
              key={t}
              className={`about-tab${activeTab === t ? ' active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="about-section">
            <p className="about-bio">
              A developer passionate about building scalable software, intelligent systems, and impactful digital experiences.
              Experienced in developing web applications, working with data, and exploring AI-driven solutions.
              Always learning, always building, and excited to contribute to innovative teams and challenging projects.
            </p>
            <p className="about-bio" style={{ marginTop: '12px', borderTop: '1px dashed #30363d', paddingTop: '12px', color: '#c9d1d9' }}>
              Software developer who builds across the full stack — web applications, intelligent systems, data pipelines, cloud infrastructure, and everything in between. I pick up new technology fast, care deeply about clean architecture, and consistently ship projects that go beyond coursework. Currently in my Completed B tech and , open to roles across software development, AI, and backend systems.
            </p>
            <div className="about-attrs">
              <div className="attr-row"><span className="attr-key">Location</span><span className="attr-val">Bengaluru, India</span></div>
              <div className="attr-row"><span className="attr-key">Education</span><span className="attr-val">B.E. Computer Science</span></div>
              <div className="attr-row"><span className="attr-key">Status</span><span className="attr-val attr-green">Open to work</span></div>
              <div className="attr-row"><span className="attr-key">Alignment</span><span className="attr-val">Lawful Builder</span></div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="about-section">
            {STATS.map(stat => (
              <div key={stat.label} className="stat-row">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{
                      width: `${(stat.level / stat.max) * 100}%`,
                      background: stat.color,
                    }}
                  />
                </div>
                <span className="stat-level">{'█'.repeat(stat.level)}{'░'.repeat(stat.max - stat.level)}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'lore' && (
          <div className="about-section lore-section">
            <div className="lore-entry">
              <span className="lore-year">2022</span>
              <span className="lore-text">
                Started the engineering journey and built a strong foundation in computer science.
              </span>
            </div>

            <div className="lore-entry">
              <span className="lore-year">2023</span>
              <span className="lore-text">
                Explored programming, data structures, and software development through academic and personal projects.
              </span>
            </div>

            <div className="lore-entry">
              <span className="lore-year">2024</span>
              <span className="lore-text">
                Built full-stack applications, explored AI technologies, and expanded technical expertise.
              </span>
            </div>

            <div className="lore-entry">
              <span className="lore-year">2025</span>
              <span className="lore-text">
                Completed an internship, developed real-world projects, and strengthened problem-solving skills.
              </span>
            </div>

            <div className="lore-entry active">
              <span className="lore-year">2026</span>
              <span className="lore-text">
                Open to opportunities in software development, building innovative solutions, and growing as an engineer.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
