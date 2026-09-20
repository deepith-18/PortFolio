import React, { useState } from 'react';
import '../../styles/windows/SkillsWindow.css';

const SKILL_TREE = [
  {
    branch: 'Programming & Core',
    color: '#ffd700',
    skills: [
      { name: 'Python', level: 5, unlocked: true },
      { name: 'Java', level: 4, unlocked: true },
      { name: 'JavaScript', level: 4, unlocked: true },
      { name: 'DSA (Algorithms)', level: 4, unlocked: true },
    ],
  },
  {
    branch: 'Web Technologies',
    color: '#61dafb',
    skills: [
      { name: 'React', level: 4, unlocked: true },
      { name: 'Next.js', level: 3, unlocked: true },
      { name: 'HTML5 & CSS3', level: 4, unlocked: true },
      { name: 'API Development', level: 4, unlocked: true },
    ],
  },
  {
    branch: 'Data Science & AI',
    color: '#1eda60',
    skills: [
      { name: 'AI & ML', level: 4, unlocked: true },
      { name: 'Data Preprocessing', level: 4, unlocked: true },
      { name: 'Pandas & NumPy', level: 4, unlocked: true },
      { name: 'Hugging Face', level: 3, unlocked: true },
    ],
  },
  {
    branch: 'Databases & Infra',
    color: '#b060ff',
    skills: [
      { name: 'MySQL & SQLite', level: 4, unlocked: true },
      { name: 'MongoDB', level: 3, unlocked: true },
      { name: 'System Architecture', level: 4, unlocked: true },
      { name: 'Docker & Kubernetes', level: 3, unlocked: true },
    ],
  },
  {
    branch: 'Tools & Frameworks',
    color: '#ff7e5f',
    skills: [
      { name: 'Git & GitHub', level: 4, unlocked: true },
      { name: 'Flask', level: 3, unlocked: true },
      { name: 'Tkinter', level: 3, unlocked: true },
      { name: 'Bugzilla', level: 3, unlocked: true },
    ],
  },
];

export default function SkillsWindow() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="skills-win">
      <div className="skills-header">
        <span className="skills-title-mono">TECHNICAL SKILL TREE</span>
        <span className="skills-subtitle">Hover a skill node to inspect attributes</span>
      </div>

      <div className="skills-tree">
        {SKILL_TREE.map(branch => (
          <div key={branch.branch} className="skill-branch">
            <div className="branch-label" style={{ color: branch.color }}>
              <span className="branch-dot" style={{ background: branch.color }} />
              {branch.branch}
            </div>
            <div className="branch-skills">
              {branch.skills.map(skill => (
                <div
                  key={skill.name}
                  className={`skill-node${skill.unlocked ? ' unlocked' : ' locked'}`}
                  style={skill.unlocked ? { borderColor: branch.color + '60', '--glow': branch.color } : {}}
                  onMouseEnter={() => setHoveredSkill({ ...skill, color: branch.color })}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-node-name">{skill.name}</div>
                  <div className="skill-node-bar">
                    {[1,2,3,4,5].map(n => (
                      <span
                        key={n}
                        className="skill-pip"
                        style={n <= skill.level && skill.unlocked ? { background: branch.color } : {}}
                      />
                    ))}
                  </div>
                  {!skill.unlocked && <div className="skill-lock">🔒</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredSkill && (
        <div className="skill-tooltip" style={{ borderColor: hoveredSkill.color }}>
          <div className="skill-tooltip-name" style={{ color: hoveredSkill.color }}>
            {hoveredSkill.name}
          </div>
          <div className="skill-tooltip-level">
            Level {hoveredSkill.level} / 5
          </div>
          <div className="skill-tooltip-bar">
            {'█'.repeat(hoveredSkill.level)}{'░'.repeat(5 - hoveredSkill.level)}
          </div>
          <div className="skill-tooltip-status">
            {hoveredSkill.unlocked ? '✓ Unlocked' : '🔒 In progress'}
          </div>
        </div>
      )}
    </div>
  );
}
