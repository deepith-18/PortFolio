import React, { useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaBook,
  FaFolderOpen,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import '../styles/SystemCore.css';
import MagnetWallpaper from './MagnetWallpaper';
import Footer from './Footer';

// (keeping PROJECTS, SKILLS_DATA, OPEN_SOURCE_DATA, CERTS_DATA, EDUCATION_DATA, ADDITIONAL_DATA as they are)
// (skipping intermediate lines for replace compatibility)
const PROJECTS = [
  {
    title: "Academor – AI in Warehouse Industry",
    image: "AI_Prediction.png",
    description: "AI-driven warehouse management system that revolutionizes inventory tracking and order processing.",
    points: [
      "📦 30% Improvement in inventory accuracy using AI stock predictions.",
      "⚙️ 40% Reduction in order processing time through automated optimization.",
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
      "Real-Time Facial Emotion Recognition: Processes 30+ FPS using OpenCV & DeepFace.",
      "7-State Emotion Telemetry: Classifies Happy, Sad, Angry, Surprised, Neutral, Fear, Disgust.",
      "Dynamic Probability Visualization: Real-time confidence bar chart telemetry."
    ],
    github: "https://github.com/deepith-18/Sentimental_analysis",
    tags: ["OpenCV", "DeepFace", "Python", "Computer Vision"]
  },
  {
    title: "Studicholic – AI-Powered Video Generation",
    image: "SHolic.png",
    description: "Innovative AI tool that converts PDFs and notes into engaging educational videos.",
    points: [
      "Document to Video Synthesis: Converts lecture PDFs and notes into animated video slides.",
      "NLP Topic Extraction: Intelligent summarization pipeline generating narrator transcripts.",
      "Synchronized Voiceover: Text-to-Speech audio integration with aligned caption streams."
    ],
    github: "https://github.com/deepith-18/StudentHolic-AI",
    tags: ["AI/ML", "NLP", "TTS", "Video Generation"]
  },
  {
    title: "Real-time Network Intrusion Detection System",
    image: "NIDS.png",
    description: "A secure, real-time network monitoring system capable of detecting attacks using authenticated cryptography.",
    points: [
      "Live Traffic Sniffing: Low-overhead socket monitoring on network interfaces via Scapy.",
      "Anomaly Signature Detection: Identifies Port Scanning and DoS attacks dynamically.",
      "Tamper-Proof Encryption: Employs Fernet Symmetric-key cryptography for immutable logs."
    ],
    github: "https://github.com/deepith-18/Network-IDS",
    tags: ["Python", "Scapy", "Flask", "Cryptography", "SocketIO"]
  },
  {
    title: "Smart Health Advisor – Diagnostic Healthcare AI",
    image: "SMA.png",
    description: "A friendly, AI-powered chatbot built with Streamlit and Google Gemini for health guidance.",
    points: [
      "Medical Dialogue Reasoning: Powered by Google Gemini Pro API for symptom analysis.",
      "Structured Medical Categorization: Synthesizes Probable Conditions, Recommended Actions, and Diet suggestions.",
      "Accessible Audio Output: Text-to-Speech synthesized via gTTS for voice recommendations."
    ],
    github: "https://github.com/deepith-18/Smart-Health-Advisor",
    tags: ["Python", "Streamlit", "Gemini API", "AI/ML"]
  },
  {
    title: "Fake Review Detection – BERT vs Traditional ML",
    image: "FRDUD.png",
    description: "A robust system for detecting fake e-commerce reviews using a dual-approach methodology.",
    points: [
      "Model Comparison Benchmark: Validated Random Forest/Naive Bayes (86% acc) against Fine-tuned BERT (98% acc).",
      "Bidirectional Transformer Power: Leveraged BERT's attention weights for deception detection.",
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
      "Interactive Step Visualizer: Real-time rendering for Bubble, Selection, Insertion, Merge, and Quick Sort.",
      "Non-Blocking Concurrency: MVC architecture with background worker threads.",
      "Live Execution Telemetry: Tracks comparison counts, array swaps, and millisecond latency."
    ],
    github: "https://github.com/deepith-18/AlgoVisPro",
    tags: ["Java", "JavaFX", "Multithreading", "MVC", "Algorithms"]
  },
  {
    title: "Code from Design – AI UI to Code Converter",
    image: "CFD.png",
    description: "An intelligent tool that transforms static UI screenshots into clean HTML, CSS, and React code.",
    points: [
      "Automated Component Generation: Converts UI mockups into clean, production-ready React code.",
      "Heuristic Layout Parsing: Custom OpenCV algorithms detect form elements with 95% precision.",
      "Sandboxed Live Preview: Secure execution environment rendering generated code safely."
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
  hobbies: ['Building Projects', 'Coding Challenges', 'Playing Strategy Games'],
};

export default function SystemCore({ onExit, onEnter, theme, setTheme }) {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="system-core-container">
      {/* Interactive Magnetic Vector Grid Background */}
      <MagnetWallpaper color="#3b82f6" opacity={0.15} />

      {/* Background Elements */}
      <div className="particles-container">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--x': `${Math.random() * 100}vw`,
            '--y': `${Math.random() * 100}vh`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${12 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Action Header Waybar Nav */}
      <div className="top-nav-actions">
        <div className="nav-left">
          <span className="fedora-badge">Fedora OS</span>
          <button className="exit-os-btn" onClick={onExit}>
            Exit to OS ➔
          </button>
        </div>

        <div className="nav-center">
          <span className="pulse-dot"></span>
          <span className="nav-title">PORTFOLIO COCKPIT v1.0.5</span>
        </div>

        <div className="nav-right">
          <button 
            className="theme-toggle-btn-fedora"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            style={{ 
              marginRight: '12px',
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.25s, transform 0.25s'
            }}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button className="enter-workshop-btn" onClick={() => window.location.hash = '#/workshop'}>
            Enter 3D Gallery ➔
          </button>
        </div>
      </div>

      {/* Dashboard Layout Grid */}
      <div className="dashboard-layout">

        {/* Left Side: Profile & Contacts */}
        <div className="profile-sidebar">
          <div className="profile-picture-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 210, 255, 0.1)', border: '2px solid rgba(0, 210, 255, 0.3)', borderRadius: '50%', width: '120px', height: '120px', margin: '0 auto 16px auto' }}>
            <FaCode size={40} color="#00d2ff" />
          </div>
          <h1 className="sidebar-title">DEEPITH</h1>
          <h2 className="sidebar-subtitle">Software Developer</h2>
          <p className="sidebar-bio">
            Adaptable Software Developer with strong programming fundamentals and a passion for understanding system architecture. Experienced in Java and Python, with a demonstrated ability to quickly learn new technologies. Eager to contribute to building robust, scalable solutions.
          </p>

          <div className="sidebar-actions">
            <a href="/DeepithN.pdf" target="_blank" rel="noreferrer" className="sidebar-resume-btn">
              <FaFilePdf style={{ marginRight: '8px' }} /> Open Resume
            </a>
          </div>

          <div className="sidebar-contact-section">
            <h3 className="section-small-title">Contact & Socials</h3>
            <div className="contact-links-grid">
              <a href="mailto:deepithdeekshith@gmail.com" className="contact-link-item">
                <FaEnvelope /> Email
              </a>
              <a href="https://github.com/deepith-18" target="_blank" rel="noreferrer" className="contact-link-item">
                <FaGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/deepithn1718/" target="_blank" rel="noreferrer" className="contact-link-item">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          <div className="sidebar-meta-grid">
            <div>
              <h4 className="section-small-title">Languages</h4>
              <p className="meta-text">{ADDITIONAL_DATA.languages.join(', ')}</p>
            </div>
            <div>
              <h4 className="section-small-title">Hobbies</h4>
              <p className="meta-text">{ADDITIONAL_DATA.hobbies.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Portfolio Sections */}
        <div className="main-content-panel">

          {/* Tab Navigation Headers */}
          <div className="dashboard-tab-headers">
            <button
              className={`dash-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FaFolderOpen /> Projects
            </button>
            <button
              className={`dash-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <FaCode /> Skills
            </button>
            <button
              className={`dash-tab-btn ${activeTab === 'opensource' ? 'active' : ''}`}
              onClick={() => setActiveTab('opensource')}
            >
              <FaBook /> Open Source
            </button>
            <button
              className={`dash-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <FaGraduationCap /> Education & Certs
            </button>
          </div>

          {/* Tab Contents */}
          <div className="dashboard-tab-content">

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="tab-pane-container fade-in">
                <div className="dashboard-projects-grid">
                  {PROJECTS.map((proj, idx) => (
                    <div key={idx} className="dashboard-project-card">
                      {proj.image && (
                        <div className="dash-proj-image-container">
                          <img 
                            src={process.env.PUBLIC_URL + '/' + proj.image} 
                            alt={proj.title} 
                            className="dash-proj-image" 
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="dash-proj-header">
                        <h3 className="dash-proj-title">{proj.title}</h3>
                        <a href={proj.github} target="_blank" rel="noreferrer" className="dash-proj-git" title="View Source">
                          <FaGithub />
                        </a>
                      </div>
                      <p className="dash-proj-desc">{proj.description}</p>
                      <ul className="dash-proj-points">
                        {proj.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                      <div className="dash-proj-tags">
                        {proj.tags.map((tag, i) => (
                          <span key={i} className="dash-proj-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="tab-pane-container fade-in">
                <div className="dashboard-skills-grid">
                  {Object.entries(SKILLS_DATA).map(([category, list]) => (
                    <div key={category} className="dashboard-skill-card">
                      <h3 className="dash-skill-category-title">{category}</h3>
                      <div className="dash-skill-chips">
                        {list.map((skill, i) => (
                          <span key={i} className="dash-skill-chip">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OPEN SOURCE TAB */}
            {activeTab === 'opensource' && (
              <div className="tab-pane-container fade-in">
                <div className="dashboard-os-list">
                  {OPEN_SOURCE_DATA.map((os, idx) => (
                    <div key={idx} className="dashboard-os-card">
                      <div className="dash-os-header">
                        <span className="dash-os-icon">{os.icon}</span>
                        <h3 className="dash-os-repo">{os.repo}</h3>
                      </div>
                      <p className="dash-os-desc">{os.desc}</p>
                      <div className="dash-os-tech">
                        {os.tech.map((t, i) => (
                          <span key={i} className="dash-os-tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION & CERTS TAB */}
            {activeTab === 'education' && (
              <div className="tab-pane-container fade-in education-certs-tab">

                {/* Education Timeline */}
                <div className="dashboard-edu-section">
                  <h3 className="dashboard-subheading"><FaGraduationCap /> Academic Timeline</h3>
                  <div className="dashboard-timeline">
                    {EDUCATION_DATA.map((edu, idx) => (
                      <div key={idx} className="dashboard-timeline-item">
                        <div className="timeline-marker" />
                        <div className="timeline-content">
                          <span className="timeline-period">{edu.period}</span>
                          <h4 className="timeline-school">{edu.school}</h4>
                          <p className="timeline-degree">{edu.degree}</p>
                          <span className="timeline-grade">{edu.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications links */}
                <div className="dashboard-certs-section">
                  <h3 className="dashboard-subheading"><FaCertificate /> Professional Certifications</h3>
                  <div className="dashboard-certs-grid">
                    {CERTS_DATA.map((cert, idx) => (
                      <a
                        key={idx}
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="dashboard-cert-card"
                      >
                        <span className="cert-card-icon">📜</span>
                        <div className="cert-card-info">
                          <span className="cert-card-name">{cert.name}</span>
                          <span className="cert-card-link-text">Verify Certificate <FaExternalLinkAlt size={10} /></span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
