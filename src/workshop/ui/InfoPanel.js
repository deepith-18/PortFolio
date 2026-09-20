import React, { useState } from 'react';

const PROJECTS = [
  {
    title: "Academor – AI in Warehouse Industry",
    image: "AI_Prediction.png",
    description: "AI-driven warehouse management system that revolutionizes inventory tracking and order processing.",
    points: [
      "📦 30% Improvement in inventory accuracy using AI-driven stock predictions.",
      "⚙️ 40% Reduction in order processing time through automated workflow optimization.",
      "📊 Real-time Data Insights enabling 25% faster decision-making."
    ],
    github: "https://github.com/deepith-18/AI-for-Warehouse-Optimization",
    tags: ["AI/ML", "Python", "Data Analytics", "Automation"]
  },
  {
    title: "Courier Management System",
    image: "CMS.png",
    description: "Comprehensive Python-based system to streamline parcel tracking and delivery operations.",
    points: [
      "🚚 Python-based system to streamline parcel tracking and delivery operations.",
      "📈 Enhanced efficiency with automated order processing and real-time tracking.",
      "🗃️ Integrated database management using SQLite/MySQL."
    ],
    github: "https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project",
    tags: ["Python", "Tkinter", "MySQL", "GUI"]
  },
  {
    title: "Simple Sentiment Analysis",
    image: "SSA.png",
    description: "Real-time facial emotion recognition system processing 30+ FPS with 90%+ accuracy across 7 emotions.",
    points: [
      "Real-Time Facial Emotion Recognition: High-throughput video stream analysis via OpenCV & DeepFace.",
      "7-State Classification: Identifies Happy, Sad, Angry, Surprised, Neutral, Fear, Disgust.",
      "Dynamic Confidence Telemetry: Live probability distribution bar chart rendering."
    ],
    github: "https://github.com/deepith-18/Sentimental_analysis",
    tags: ["OpenCV", "DeepFace", "Python", "Computer Vision"]
  },
  {
    title: "Studicholic – AI-Powered Video Generation",
    image: "SHolic.png",
    description: "Innovative AI tool that converts PDFs and notes into engaging educational videos.",
    points: [
      "Automated Video Synthesis: Converts lecture notes and PDFs into structured video slides.",
      "NLP Summarization: Extracts key technical themes and generates voiceover scripts.",
      "Multi-Modal Audio Integration: Synchronized text-to-speech audio narration with animated subtitles."
    ],
    github: "https://github.com/deepith-18/StudentHolic-AI",
    tags: ["AI/ML", "NLP", "TTS", "Video Generation"]
  },
  {
    title: "Real-time Network Intrusion Detection System",
    image: "NIDS.png",
    description: "A secure, real-time network monitoring system capable of detecting attacks using authenticated cryptography.",
    points: [
      "Live Packet Sniffing: Low-overhead socket monitoring using Scapy packet capture.",
      "Attack Pattern Detection: Identifies Port Scanning, SYN Floods, and DoS anomalies dynamically.",
      "Authenticated Cryptography: Utilizes Fernet Symmetric-key encryption for immutable security incident logs."
    ],
    github: "https://github.com/deepith-18/Network-IDS",
    tags: ["Python", "Scapy", "Flask", "Cryptography", "SocketIO"]
  },
  {
    title: "Smart Health Advisor – Diagnostic Healthcare AI",
    image: "SMA.png",
    description: "A friendly, AI-powered chatbot built with Streamlit and Google Gemini for health guidance.",
    points: [
      "AI Symptom Analysis: Leverages Google Gemini Pro API for medical dialogue reasoning.",
      "Structured Medical Categorization: Synthesizes Probable Conditions, Recommended Actions, and Diet suggestions.",
      "Audio Guidance via TTS: Integrated gTTS for accessible speech playback of diagnostic recommendations."
    ],
    github: "https://github.com/deepith-18/Smart-Health-Advisor",
    tags: ["Python", "Streamlit", "Gemini API", "AI/ML"]
  },
  {
    title: "Fake Review Detection – BERT vs Traditional ML",
    image: "FRDUD.png",
    description: "A robust system for detecting fake e-commerce reviews using a dual-approach methodology.",
    points: [
      "Rigorous Model Benchmark: Compared Random Forest & Naive Bayes (86% acc) against Fine-tuned BERT (98% acc).",
      "Contextual Transformer Power: Utilized BERT's bidirectional attention to identify sophisticated deceptive syntax.",
      "Scalable Pipeline: Engineered model serialization and inference pipeline for real-time analysis."
    ],
    github: "https://github.com/deepith-18/Major_Project",
    tags: ["BERT", "NLP", "Deep Learning", "Python"]
  },
  {
    title: "AlgoVis Pro – JavaFX Sorting Visualizer",
    image: "ALGO.png",
    description: "A professional desktop application visualizing sorting algorithms in real-time.",
    points: [
      "Algorithm Execution Engine: Step-by-step visualizer for Bubble, Selection, Insertion, Merge, and Quick Sort.",
      "Concurrent Architecture: MVC pattern with multi-threaded execution for smooth 60 FPS rendering.",
      "Telemetry Dashboard: Live counters tracking comparisons, swaps, and total execution latency."
    ],
    github: "https://github.com/deepith-18/AlgoVisPro",
    tags: ["Java", "JavaFX", "Multithreading", "MVC", "Algorithms"]
  },
  {
    title: "Code from Design – AI UI to Code Converter",
    image: "CFD.png",
    description: "An intelligent tool that transforms static UI screenshots into clean HTML, CSS, and React code.",
    points: [
      "Automated Code Generation: Converts UI mockups into clean, production-ready React components.",
      "Heuristic Layout Detection: Custom OpenCV algorithms identify form components and grids with 95% precision.",
      "Secure Live Preview: Sandboxed iframe environment rendering generated code safely without execution risks."
    ],
    github: "https://github.com/deepith-18/Code-from-Design",
    tags: ["React", "FastAPI", "OpenCV", "Python", "Automation"]
  }
];

const SKILLS_DATA = {
  'Programming Languages': ['Python', 'Java', 'JavaScript'],
  'Web Technologies': ['HTML', 'CSS', 'React', 'Next.js'],
  'Database Management': ['MySQL', 'MongoDB', 'SQLite'],
  'Data Science & AI': ['Pandas', 'NumPy', 'AI & ML', 'Data Preprocessing', 'Hugging Face'],
  'Tools & Frameworks': ['Git & GitHub', 'Flask', 'Tkinter', 'Bugzilla'],
  'Core Concepts': ['System Architecture', 'DSA (Algorithms)', 'API Development'],
};

const OPEN_SOURCE_DATA = [
  {
    icon: '✅',
    repo: 'Web Platform Tests (WPT)',
    tech: ['HTML', 'CSS', 'Web Standards'],
    desc: 'Authored and contributed conformance tests for HTML & CSS to the WPT suite used by Chromium, Firefox, and WebKit.'
  },
  {
    icon: '🦊',
    repo: 'Mozilla Firefox – Bug Investigation',
    tech: ['Bugzilla', 'Flexbox', 'Browser Rendering'],
    desc: 'Identified and reported a CSS Flexbox rendering issue in Firefox with a minimal reproducible test case, collaborating with Mozilla engineers via Bugzilla.'
  },
  {
    icon: '☸️',
    repo: 'Kubernetes Controller (kro)',
    tech: ['Kubernetes', 'CEL', 'Controllers', 'Open Source'],
    desc: 'Investigated CEL expression handling in the kro Kubernetes controller. Set up a local Kind cluster, installed CRDs, ran the controller from source, and shared minimal repro cases with maintainers.'
  },
  {
    icon: '🛠️',
    repo: 'Library Maintenance & CI/CD',
    tech: ['CI/CD', 'Git Rebase', 'Testing'],
    desc: 'Collaborated with maintainers across open-source projects to debug CI/CD failures, resolve test instability, and perform safe refactors using advanced Git workflows.'
  },
];

const CERTS_DATA = [
  { name: 'NPTEL Programming in Java', link: 'https://drive.google.com/file/d/1ORMZk3fh_ct3qdxtbNClBBu7oeN9aCiu/view' },
  { name: 'NPTEL Programming in Python', link: 'https://drive.google.com/file/d/1FXAibJLrt-Y8CyefUlQ7Dh-cJH9MUrBv/view' },
  { name: 'NPTEL Artificial Intelligence: Concepts and Techniques', link: 'https://drive.google.com/file/d/1Tuki8k3H9t6U3i8Qizw33FyO-2Dx4Yzb/view' },
  { name: 'Microsoft Generative AI Career Essentials', link: 'https://drive.google.com/file/d/1OPN1YRGVt1Q6BNZQu9zcQO4tVVc1JxC0/view' },
  { name: 'Coursera Core Java', link: 'https://drive.google.com/file/d/1HAPJYhICZS9bDl9K-KBAKwNPHrE1XC0Z/view' },
  { name: 'Infosys Springboard DBMS', link: 'https://drive.google.com/file/d/1Pqtvmyuam1wUZEOrafU4ztMcKhbvLatC/view' },
];

const EDUCATION_DATA = [
  {
    school: 'ACS College Of Engineering',
    period: '2022 – 2026',
    degree: 'B.Tech in Computer Science and Engineering',
    grade: 'SGPA: 9.31',
  },
  {
    school: 'Jawahar Navodaya Vidyalaya',
    period: '2020 – 2022',
    degree: '+2 Courses',
    grade: 'Percentage: 83%',
  },
  {
    school: 'Adarsha Vidyalaya',
    period: '2019 – 2020',
    degree: 'SSLC',
    grade: 'Percentage: 92%',
  },
];
const ADDITIONAL_DATA = {
  languages: ['English', 'Hindi', 'Kannada'],
  interests: [
    'Artificial Intelligence (AI) & ML',
    'Software Development',
    'System Architecture',
    'Data Structures & Algorithms (DSA)',
    'Data Engineering & Preprocessing',
    'Cloud Computing',
    'AWS',
    'Blockchain',
  ],
  awards: [
    'Participant – Google Hackathon',
    'Career Essentials in Generative AI (LinkedIn)',
    'Core Java (Coursera)',
    'Computer Networks (NPTEL)',
    'Artificial Intelligence (NPTEL)',
    'Database Management (Infosys Springboard)',
  ],
  hobbies: ['Building Projects', 'Coding Challenges', 'Playing Strategy Games', 'Teaching & Mentoring'],
};


function ProjectsPanel() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const p = PROJECTS[selected];
    return (
      <div className="project-detail-view">
        <button className="info-back-btn" onClick={() => setSelected(null)}>
          <span>←</span> Back to all projects
        </button>

        <div className="project-detail-hero">
          <img src={`/${p.image}`} alt={p.title} className="project-detail-img" />
          <div className="project-detail-hero-gradient" />
        </div>

        <h3 className="project-detail-title">{p.title}</h3>
        <p className="project-detail-desc">{p.description}</p>

        <div className="project-detail-points">
          <h4 className="project-detail-subhead">Key Highlights</h4>
          <ul>
            {p.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        <div className="project-detail-tags-wrap">
          <h4 className="project-detail-subhead">Technologies</h4>
          <div className="project-tags-row">
            {p.tags.map(t => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="project-detail-actions">
          <a href={p.github} target="_blank" rel="noreferrer" className="project-link-primary">
            View Source on GitHub ↗
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="info-project-grid">
      {PROJECTS.map((p, i) => (
        <div key={i} className="info-project-card" onClick={() => setSelected(i)}>
          <div className="info-project-thumb-wrap">
            <img src={`/${p.image}`} alt={p.title} className="info-project-thumb" />
            <div className="info-project-card-badge">0{i + 1}</div>
          </div>
          <div className="info-project-card-body">
            <h4 className="info-project-card-title">{p.title}</h4>
            <p className="info-project-card-desc">{p.description}</p>
            <div className="info-project-card-tags">
              {p.tags.slice(0, 3).map(t => (
                <span key={t} className="project-tag">{t}</span>
              ))}
              {p.tags.length > 3 && (
                <span className="project-tag-more">+{p.tags.length - 3}</span>
              )}
            </div>
            <div className="info-project-card-footer">
              <span className="info-project-view-link">View Details ➔</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div>
      {Object.entries(SKILLS_DATA).map(([cat, skills]) => (
        <div key={cat} style={{ marginBottom: '1.2rem' }}>
          <h4 style={{ color: 'rgba(255,230,200,0.6)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{cat}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {skills.map(s => <span key={s} className="project-tag">{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function OpenSourcePanel() {
  return (
    <div>
      {OPEN_SOURCE_DATA.map((o, i) => (
        <div key={i} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.8rem', border: '1px solid rgba(255,230,200,0.1)' }}>
          <div style={{ fontWeight: 600, color: '#ffecd6', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
            {o.icon} {o.repo}
          </div>
          <p style={{ color: '#aaa', fontSize: '0.82rem', marginBottom: '0.5rem', lineHeight: 1.5 }}>{o.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {o.tech.map(t => <span key={t} className="project-tag" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertsPanel() {
  return (
    <div>
      <h4 style={{ color: 'rgba(255,230,200,0.5)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Certifications</h4>
      {CERTS_DATA.map((c, i) => (
        <a key={i} href={c.link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.6rem', border: '1px solid rgba(255,230,200,0.1)', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,230,200,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <span style={{ fontSize: '1.2rem' }}>🏅</span>
          <div style={{ fontWeight: 600, color: '#ffecd6', fontSize: '0.88rem' }}>{c.name} <span style={{ color: '#60a5fa', fontSize: '0.75rem' }}>↗</span></div>
        </a>
      ))}

      <h4 style={{ color: 'rgba(255,230,200,0.5)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '1.2rem 0 0.8rem' }}>Education</h4>
      {EDUCATION_DATA.map((e, i) => (
        <div key={i} style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.6rem', border: '1px solid rgba(255,230,200,0.1)', borderLeft: '3px solid rgba(255,230,200,0.4)' }}>
          <div style={{ fontWeight: 600, color: '#ffecd6', fontSize: '0.9rem' }}>{e.school}</div>
          <div style={{ color: '#aaa', fontSize: '0.78rem', marginTop: '2px' }}>{e.period}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginTop: '4px' }}>{e.degree}</div>
          <div style={{ color: '#10b981', fontSize: '0.78rem', marginTop: '2px', fontWeight: 600 }}>{e.grade}</div>
        </div>
      ))}
    </div>
  );
}

function AdditionalPanel() {
  const Section = ({ title, items, tag }) => (
    <div style={{ marginBottom: '1.2rem' }}>
      <h4 style={{ color: 'rgba(255,230,200,0.5)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{title}</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {items.map((item, i) => (
          tag ? (
            <span key={i} className="project-tag" style={{ fontSize: '0.8rem' }}>{item}</span>
          ) : (
            <div key={i} style={{ width: '100%', padding: '0.5rem 0.8rem', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', border: '1px solid rgba(255,230,200,0.08)' }}>
              {item}
            </div>
          )
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Section title="🌐 Languages" items={ADDITIONAL_DATA.languages} tag />
      <Section title="💡 Areas of Interest" items={ADDITIONAL_DATA.interests} tag />
      <Section title="🎮 Hobbies" items={ADDITIONAL_DATA.hobbies} tag />
      <Section title="🏆 Awards & Recognition" items={ADDITIONAL_DATA.awards} />
    </div>
  );
}

// ---- Zone Config ----
const ZONES = {
  projects: { title: 'Featured Projects', icon: '🖥️', Component: ProjectsPanel },
  skills: { title: 'Technical Skills', icon: '⚙️', Component: SkillsPanel },
  opensource: { title: 'Open Source Contributions', icon: '🌐', Component: OpenSourcePanel },
  certifications: { title: 'Certifications & Education', icon: '🎓', Component: CertsPanel },
  additional: { title: 'Profile & Interests', icon: '📌', Component: AdditionalPanel },
};

export default function InfoPanel({ activeZone, onClose }) {
  if (!activeZone || !ZONES[activeZone]) return null;
  const { title, icon, Component } = ZONES[activeZone];

  return (
    <div className="project-panel-overlay" onClick={onClose}>
      <div className="project-panel" onClick={(e) => e.stopPropagation()}>
        <button className="project-panel-close" onClick={onClose} aria-label="Close modal">✕</button>
        <div className="project-panel-content">
          <div className="project-panel-header">
            <span className="project-panel-badge">{icon} Exhibition Station</span>
            <h2 className="project-title">{title}</h2>
          </div>
          <div className="project-description">
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
}
