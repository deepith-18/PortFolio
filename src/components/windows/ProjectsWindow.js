import React, { useState } from 'react';
import '../../styles/windows/ProjectsWindow.css';

const PROJECTS = [
  {
    id: 1, rarity: 'legendary', rarityLabel: '◆ LEGENDARY',
    name: 'Code from Design',
    icon: 'CV',
    type: 'AI UI to Code',
    desc: 'Intelligent full-stack developer tool transforming UI screenshots into clean HTML, CSS, and React code using OpenCV computer vision and FastAPI heuristics with sandboxed iframe previews.',
    stack: ['React', 'FastAPI', 'OpenCV', 'Python', 'Automation'],
    difficulty: 'Legendary',
    status: 'Live',
    link: 'https://github.com/deepith-18/Code-from-Design',
  },
  {
    id: 2, rarity: 'legendary', rarityLabel: '◆ LEGENDARY',
    name: 'Fake Review Detection',
    icon: 'NLP',
    type: 'BERT vs Classic ML',
    desc: 'Comparative NLP review fraud analysis system validating traditional machine learning models (86% accuracy) against fine-tuned context-aware BERT transformer models (98% accuracy).',
    stack: ['BERT', 'NLP', 'Deep Learning', 'Python', 'Scikit-learn'],
    difficulty: 'Expert',
    status: 'Completed',
    link: 'https://github.com/deepith-18/Major_Project',
  },
  {
    id: 3, rarity: 'legendary', rarityLabel: '◆ LEGENDARY',
    name: 'Smart Health Advisor',
    icon: 'AI',
    type: 'Gemini Pro AI',
    desc: 'AI chatbot using stream lit and Google Gemini Pro NLP to analyze symptoms and provide probables, recommended actions, and dietary guidance with gTTS audio guidance.',
    stack: ['Python', 'Streamlit', 'Gemini API', 'AI/ML', 'gTTS'],
    difficulty: 'Expert',
    status: 'Live',
    link: 'https://github.com/deepith-18/Smart-Health-Advisor',
  },
  {
    id: 4, rarity: 'epic', rarityLabel: '◇ EPIC',
    name: 'Real-time Network IDS',
    icon: 'SYS',
    type: 'Flask / SocketIO',
    desc: 'Scapy packet-monitoring threat logging system detecting port scanning and DDoS attacks instantly with secure Fernet symmetric alert encryption logs and live dashboards.',
    stack: ['Python', 'Scapy', 'Flask', 'Cryptography', 'SocketIO'],
    difficulty: 'Hard',
    status: 'Completed',
    link: 'https://github.com/deepith-18/Network-IDS',
  },
  {
    id: 5, rarity: 'epic', rarityLabel: '◇ EPIC',
    name: 'Studicholic Video Gen',
    icon: 'GEN',
    type: 'AI Video Generator',
    desc: 'Innovative generative tool converting textbook files and notes into engaging educational videos complete with TTS voiceover synthesizers, Kinetic subtitles, and animation streams.',
    stack: ['AI/ML', 'NLP', 'TTS', 'Video Generation', 'Python'],
    difficulty: 'Hard',
    status: 'Completed',
    link: 'https://github.com/deepith-18/StudentHolic-AI',
  },
  {
    id: 6, rarity: 'epic', rarityLabel: '◇ EPIC',
    name: 'Simple Sentiment Analysis',
    icon: 'ML',
    type: 'Computer Vision',
    desc: 'Real-time webcam sentiment and facial expression tracking running at 30+ FPS with 90%+ classification accuracy across 7 core emotions using DeepFace and OpenCV pipelines.',
    stack: ['OpenCV', 'DeepFace', 'Python', 'Computer Vision'],
    difficulty: 'Medium',
    status: 'Completed',
    link: 'https://github.com/deepith-18/Sentimental_analysis',
  },
  {
    id: 7, rarity: 'rare', rarityLabel: '○ RARE',
    name: 'Academor Warehouse AI',
    icon: 'LOG',
    type: 'AI Logistics',
    desc: 'Autonomous stock logging route manager using historical machine learning predictions to boost logistics inventory tracking accuracy by 30% and reduce workflows by 40%.',
    stack: ['AI/ML', 'Python', 'Data Analytics', 'Automation'],
    difficulty: 'Hard',
    status: 'Completed',
    link: 'https://github.com/deepith-18/AI-for-Warehouse-Optimization',
  },
  {
    id: 8, rarity: 'rare', rarityLabel: '○ RARE',
    name: 'AlgoVis Pro Visualizer',
    icon: 'ALGO',
    type: 'JavaFX / MVC',
    desc: 'Professional Java sorting visualizer rendering live step animations (Bubble, Selection, Quick, Merge Sort) with multithreaded UI and dynamic performance comparison metrics.',
    stack: ['Java', 'JavaFX', 'Multithreading', 'MVC', 'Algorithms'],
    difficulty: 'Medium',
    status: 'Completed',
    link: 'https://github.com/deepith-18/AlgoVisPro',
  },
  {
    id: 9, rarity: 'rare', rarityLabel: '○ RARE',
    name: 'Courier DBMS System',
    icon: 'DBMS',
    type: 'Python / DBMS',
    desc: 'Delivery dispatch platform streamlining client shipping details, parcel weights, and tracking updates with a clean Tkinter GUI and integrated SQL database engines.',
    stack: ['Python', 'Tkinter', 'MySQL', 'SQLite', 'GUI'],
    difficulty: 'Medium',
    status: 'Completed',
    link: 'https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project',
  }
];

export default function ProjectsWindow() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.rarity === filter);

  return (
    <div className="projects-win">
      {/* Sidebar filter */}
      <div className="proj-sidebar">
        <div className="proj-sidebar-title">INVENTORY</div>
        {['all', 'legendary', 'epic', 'rare'].map(f => (
          <button
            key={f}
            className={`proj-filter-btn rarity-${f}${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Items' : f.toUpperCase()}
          </button>
        ))}
        <div className="proj-count">{filtered.length} items</div>
      </div>

      {/* Grid */}
      <div className="proj-grid-area">
        <div className="proj-grid">
          {filtered.map(p => (
            <div
              key={p.id}
              className={`proj-card rarity-border-${p.rarity}${selected?.id === p.id ? ' selected' : ''}`}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
            >
              <div className="proj-card-rarity">{p.rarityLabel}</div>
              <div className="proj-card-icon">{p.icon}</div>
              <div className="proj-card-name">{p.name}</div>
              <div className="proj-card-type">{p.type}</div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className={`proj-detail rarity-detail-${selected.rarity}`}>
            <div className="proj-detail-header">
              <span className="proj-detail-icon">{selected.icon}</span>
              <div>
                <div className="proj-detail-name">{selected.name}</div>
                <div className={`proj-detail-rarity rarity-text-${selected.rarity}`}>{selected.rarityLabel}</div>
              </div>
              <button className="proj-detail-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="proj-detail-section">
              <div className="proj-detail-label">MISSION BRIEFING</div>
              <p className="proj-detail-desc">{selected.desc}</p>
            </div>
            <div className="proj-detail-section">
              <div className="proj-detail-label">TECH STACK</div>
              <div className="proj-detail-stack">
                {selected.stack.map(s => (
                  <span key={s} className="proj-stack-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="proj-detail-attrs">
              <div className="proj-attr"><span>Difficulty</span><span>{selected.difficulty}</span></div>
              <div className="proj-attr"><span>Status</span><span className="attr-green">{selected.status}</span></div>
              {selected.link && (
                <div className="proj-attr">
                  <span>Source Code</span>
                  <span>
                    <a 
                      href={selected.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#64ffda', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      GitHub ↗
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
