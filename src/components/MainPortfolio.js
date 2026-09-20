import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaSun,
  FaMoon,
  FaArrowUp,
  FaCopy,
  FaCheck,
  FaDesktop,
  FaBars,
  FaTimes,
  FaReact,
  FaDatabase,
  FaBrain,
  FaFirefoxBrowser,
  FaCheckCircle,
  FaLaptopCode,
  FaGamepad,
  FaDocker,
  FaLayerGroup
} from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';
import '../styles/MainPortfolio.css';

// ─── Data: 9 Projects ──────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    category: 'ai',
    title: "Code from Design – AI UI to Code Converter",
    image: "CFD.png",
    description: "An intelligent developer tool that transforms static UI screenshots into clean, responsive HTML, CSS, and React code using Computer Vision and deep learning.",
    points: [
      "Automated Code Generation: Converts UI mockups into clean, production-ready React components.",
      "Heuristic Layout Detection: Custom OpenCV algorithms identify form components and grids with 95% precision.",
      "Secure Live Preview: Sandboxed iframe environment rendering generated code safely without execution risks.",
      "FastAPI & Vite Architecture: High-throughput API backend with robust schema normalization."
    ],
    github: "https://github.com/deepith-18/Code-from-Design",
    tags: ["React", "FastAPI", "OpenCV", "Python", "Computer Vision"]
  },
  {
    id: 2,
    category: 'ai',
    title: "Fake Review Detection – BERT vs Traditional ML",
    image: "FRDUD.png",
    description: "A fraud detection system evaluating e-commerce product reviews using a dual-methodology comparison (Traditional Machine Learning vs. Deep Learning Transformers).",
    points: [
      "Rigorous Model Benchmark: Compared Random Forest & Naive Bayes (86% acc) against Fine-tuned BERT (98% acc).",
      "Contextual Transformer Power: Utilized BERT's bidirectional attention to identify sophisticated deceptive syntax.",
      "Scalable Pipeline: Engineered model serialization and inference pipeline for real-time analysis.",
      "NLP Feature Engineering: Blended TF-IDF statistical vectorization with dense semantic embeddings."
    ],
    github: "https://github.com/deepith-18/Major_Project",
    tags: ["BERT", "NLP", "PyTorch", "Python", "Machine Learning"]
  },
  {
    id: 3,
    category: 'ai',
    title: "Smart Health Advisor – Diagnostic Healthcare AI",
    image: "SMA.png",
    description: "An AI-driven diagnostic healthcare chatbot built with Streamlit and Google Gemini to provide preliminary health guidance and dietary analysis from reported symptoms.",
    points: [
      "AI Symptom Analysis: Leverages Google Gemini Pro API for medical dialogue reasoning.",
      "Structured Medical Categorization: Synthesizes Probable Conditions, Recommended Actions, and Diet suggestions.",
      "Audio Guidance via TTS: Integrated gTTS for accessible speech playback of diagnostic recommendations.",
      "Interactive Interface: Clean multi-page medical telemetry dashboard built in Streamlit."
    ],
    github: "https://github.com/deepith-18/Smart-Health-Advisor",
    tags: ["Gemini API", "Streamlit", "Python", "NLP", "AI/ML"]
  },
  {
    id: 4,
    category: 'systems',
    title: "Real-time Network Intrusion Detection System",
    image: "NIDS.png",
    description: "A real-time network traffic analyzer capable of intercepting malicious packet signatures and logging cryptographically secured tamper-proof alerts.",
    points: [
      "Live Packet Sniffing: Low-overhead socket monitoring using Scapy packet capture.",
      "Attack Pattern Detection: Identifies Port Scanning, SYN Floods, and DoS anomalies dynamically.",
      "Authenticated Cryptography: Utilizes Fernet Symmetric-key encryption for immutable security incident logs.",
      "Live Telemetry Dashboard: Real-time network events visualized via Flask and Socket.IO."
    ],
    github: "https://github.com/deepith-18/Network-IDS",
    tags: ["Python", "Scapy", "Flask", "Socket.IO", "Cryptography"]
  },
  {
    id: 5,
    category: 'ai',
    title: "Academor – AI in Warehouse Optimization",
    image: "AI_Prediction.png",
    description: "AI-driven warehouse automation system designed to optimize inventory tracking, demand forecasting, and pick-and-pack routing.",
    points: [
      "30% Improvement in inventory forecasting accuracy using machine learning models.",
      "40% Reduction in order processing latency through automated warehouse slotting optimization.",
      "Real-time Data Insights enabling 25% faster logistics and dispatch decision-making."
    ],
    github: "https://github.com/deepith-18/AI-for-Warehouse-Optimization",
    tags: ["AI/ML", "Python", "Data Analytics", "Forecasting"]
  },
  {
    id: 6,
    category: 'fullstack',
    title: "Courier Management System",
    image: "CMS.png",
    description: "End-to-end parcel tracking and logistics management system designed for high operational throughput and accurate tracking.",
    points: [
      "Streamlined parcel shipment tracking and automated dispatch status updates.",
      "Integrated relational database management using SQLite and MySQL.",
      "Desktop GUI engineered with Python and Tkinter for intuitive warehouse operator usage."
    ],
    github: "https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project",
    tags: ["Python", "MySQL", "Tkinter", "Database Design"]
  },
  {
    id: 7,
    category: 'ai',
    title: "Simple Sentiment Analysis & Facial Emotion AI",
    image: "SSA.png",
    description: "Real-time computer vision system performing facial emotion recognition at 30+ FPS across 7 distinct emotional states.",
    points: [
      "Real-Time Emotion Recognition: High-throughput video stream analysis via OpenCV & DeepFace.",
      "90%+ Accuracy across 7 emotions (Happy, Sad, Angry, Surprised, Neutral, Fear, Disgust).",
      "Dynamic Confidence Telemetry: Live probability distribution bar chart rendering."
    ],
    github: "https://github.com/deepith-18/Sentimental_analysis",
    tags: ["Computer Vision", "OpenCV", "DeepFace", "Python"]
  },
  {
    id: 8,
    category: 'ai',
    title: "Studicholic – AI-Powered Video Generator",
    image: "SHolic.png",
    description: "Automated educational content generator transforming PDF documents and notes into structured video lectures with synchronized narration.",
    points: [
      "Converts PDF notes into animated educational video reels using generative AI.",
      "Uses NLP for automated topic summarization and slide transcript generation.",
      "Synthesizes natural TTS voiceovers synchronized with dynamic slide transitions."
    ],
    github: "https://github.com/deepith-18/StudentHolic-AI",
    tags: ["NLP", "TTS", "Video Synthesis", "Python"]
  },
  {
    id: 9,
    category: 'systems',
    title: "AlgoVis Pro – JavaFX Algorithm Visualizer",
    image: "ALGO.png",
    description: "Multithreaded desktop application visually demonstrating classical sorting algorithms with live element tracking.",
    points: [
      "Interactive Step-by-Step Animations for Bubble, Selection, Insertion, Merge, and Quick Sort.",
      "Multithreaded Architecture: Non-blocking UI execution utilizing clean MVC pattern separation.",
      "Live Analytics: Tracks element comparisons, array swaps, and execution runtimes dynamically."
    ],
    github: "https://github.com/deepith-18/AlgoVisPro",
    tags: ["Java", "JavaFX", "Multithreading", "MVC", "Algorithms"]
  }
];

// ─── Data: Skills ──────────────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <FaCode />,
    skills: ["Python", "Java", "JavaScript (ES6+)", "C", "SQL", "HTML5 & CSS3"]
  },
  {
    title: "Frameworks & Web",
    icon: <FaReact />,
    skills: ["React.js", "Next.js", "FastAPI", "Flask", "Node.js", "Streamlit", "REST APIs"]
  },
  {
    title: "AI, ML & Computer Vision",
    icon: <FaBrain />,
    skills: ["PyTorch", "TensorFlow", "BERT & Transformers", "OpenCV", "DeepFace", "NLP", "Pandas", "NumPy", "Scikit-Learn"]
  },
  {
    title: "Database Management",
    icon: <FaDatabase />,
    skills: ["MySQL", "MongoDB", "SQLite", "Database Design", "ORM / SQLAlchemy"]
  },
  {
    title: "Tools & Infrastructure",
    icon: <FaDocker />,
    skills: ["Git & GitHub", "Docker", "Linux / Bash", "Kind / Kubernetes", "Postman", "Bugzilla", "CI/CD"]
  },
  {
    title: "Core Engineering Concepts",
    icon: <FaLayerGroup />,
    skills: ["System Architecture", "Data Structures & Algorithms", "Multithreading", "Cryptography", "MVC Pattern"]
  }
];

// ─── Data: 4 Open Source Contributions ─────────────────────────────────
const OPEN_SOURCE_WORK = [
  {
    title: "Kubernetes Controller (kro)",
    org: "kubernetes-sigs/kro",
    icon: <SiKubernetes color="#326CE5" size={28} />,
    description: "Investigated CEL expression handling in the kro Kubernetes controller. Set up a local Kind cluster, installed CRDs, ran the controller from source, and shared minimal repro cases while discussing error vs skip semantics with maintainers.",
    tags: ["Kubernetes", "CEL", "CRDs", "Kind", "Open Source"]
  },
  {
    title: "Web Platform Tests (WPT)",
    org: "W3C / WHATWG Standards",
    icon: <FaCheckCircle color="#10b981" size={28} />,
    description: "Contributed official standards conformance test suites for HTML & CSS specifications executed daily across Chromium, Firefox, and WebKit browser engines.",
    tags: ["HTML Standards", "CSS Conformance", "Browser Engines", "W3C"]
  },
  {
    title: "Mozilla Firefox",
    org: "Mozilla Corporation (Bugzilla)",
    icon: <FaFirefoxBrowser color="#f97316" size={28} />,
    description: "Investigated and filed minimal reproducible test cases for CSS Flexbox layout calculation behaviors via Mozilla Bugzilla in collaboration with core Gecko engine engineers.",
    tags: ["Bugzilla", "Gecko Engine", "CSS Flexbox", "Bug Triage"]
  },
  {
    title: "Library Maintenance & CI/CD",
    org: "Open Source Ecosystem",
    icon: <FaGithub color="#e2e8f0" size={28} />,
    description: "Collaborated with open-source maintainers to debug CI/CD failures, resolve test flakiness, and execute safe refactors using clean Git rebase workflows.",
    tags: ["CI/CD", "Git Workflows", "Automated Testing", "Refactoring"]
  }
];

// ─── Data: Education ───────────────────────────────────────────────────
const EDUCATION = [
  {
    period: "2022 - 2026",
    school: "ACS College of Engineering, Bengaluru",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    score: "CGPA: 9.31 / 10",
    highlight: "Dean's Honor Roll • Algorithms, AI & Distributed Systems Specialization"
  },
  {
    period: "2020 - 2022",
    school: "Jawahar Navodaya Vidyalaya (JNV)",
    degree: "Senior Secondary (+2 Science - PCMB)",
    score: "Percentage: 83%",
    highlight: "National premier residential school selected via nationwide merit test"
  },
  {
    period: "2019 - 2020",
    school: "Adarsha Vidyalaya",
    degree: "Secondary School Leaving Certificate (SSLC)",
    score: "Percentage: 92%",
    highlight: "Top Academic Honors in Mathematics & Science"
  }
];

// ─── Data: 6 Verified Certifications ──────────────────────────────────
const CERTIFICATIONS = [
  {
    name: "NPTEL Programming in Java",
    issuer: "IIT Kharagpur / Ministry of Education",
    link: "https://drive.google.com/file/d/1ORMZk3fh_ct3qdxtbNClBBu7oeN9aCiu/view"
  },
  {
    name: "NPTEL Programming in Python",
    issuer: "IIT Madras / NPTEL",
    link: "https://drive.google.com/file/d/1FXAibJLrt-Y8CyefUlQ7Dh-cJH9MUrBv/view"
  },
  {
    name: "NPTEL Artificial Intelligence: Concepts & Techniques",
    issuer: "IIT / NPTEL",
    link: "https://drive.google.com/file/d/1Tuki8k3H9t6U3i8Qizw33FyO-2Dx4Yzb/view"
  },
  {
    name: "Microsoft Generative AI Career Essentials",
    issuer: "Microsoft / LinkedIn Learning",
    link: "https://drive.google.com/file/d/1OPN1YRGVt1Q6BNZQu9zcQO4tVVc1JxC0/view"
  },
  {
    name: "Coursera Core Java Specialization",
    issuer: "Coursera",
    link: "https://drive.google.com/file/d/1HAPJYhICZS9bDl9K-KBAKwNPHrE1XC0Z/view"
  },
  {
    name: "Database Management Systems (DBMS)",
    issuer: "Infosys Springboard",
    link: "https://drive.google.com/file/d/1Pqtvmyuam1wUZEOrafU4ztMcKhbvLatC/view"
  }
];

// ─── Interactive Neomorphic Cursor Component ─────────────────────────────
function NeomorphicCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Strictly disable custom cursor on mobile screens or touch devices
    if (window.innerWidth <= 900) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let animId;

    const onResize = () => {
      if (window.innerWidth <= 900) {
        setIsVisible(false);
      }
    };

    const onMouseMove = (e) => {
      if (window.innerWidth <= 900) return;
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      const target = e.target;
      const isInteractive = target && (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.mp-project-card') ||
        target.closest('.mp-skill-pill') ||
        target.closest('.mp-skill-category-card') ||
        target.closest('.mp-cert-card') ||
        target.closest('.mp-filter-btn') ||
        target.closest('.terminal-tab') ||
        target.closest('.mp-stat-card') ||
        target.closest('.mp-portrait-frame')
      );
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => {
      if (window.innerWidth > 900) setIsVisible(true);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible || (typeof window !== 'undefined' && window.innerWidth <= 900)) return null;

  return (
    <>
      <div
        className="neo-cursor-light"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
      <div
        className={`neo-cursor-puck ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''}`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <span className="neo-puck-core" />
      </div>
    </>
  );
}

const ROTATING_TITLES = [
  'Software Developer',
  'AI Systems Engineer',
  'Full-Stack Engineer',
  'Backend Architect',
  'Open Source Contributor',
  'Machine Learning Engineer',
  'Cloud & DevOps Enthusiast',
];

export default function MainPortfolio({ onEnterWorkshop, onEnterOS, theme, setTheme }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('developer.ts');
  const [copiedCode, setCopiedCode] = useState(false);
  const [roleTitleIndex, setRoleTitleIndex] = useState(0);
  const [roleFading, setRoleFading] = useState(false);
  const roleTitleTimer = useRef(null);

  // Rotating role title effect
  useEffect(() => {
    const cycle = () => {
      setRoleFading(true);
      roleTitleTimer.current = setTimeout(() => {
        setRoleTitleIndex(prev => (prev + 1) % ROTATING_TITLES.length);
        setRoleFading(false);
      }, 500); // fade-out duration
    };
    const interval = setInterval(cycle, 3000);
    return () => {
      clearInterval(interval);
      if (roleTitleTimer.current) clearTimeout(roleTitleTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal: fade-in sections as they enter viewport
  useEffect(() => {
    const revealEls = document.querySelectorAll('.mp-section, .mp-hero-section, .mp-metrics-strip, .mp-interactive-hub-section, .mp-footer');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mp-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('deepithdeekshith@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyCode = () => {
    const codeSnippet = activeCodeTab === 'developer.ts'
      ? `const engineer = {
  name: "Deepith N",
  role: "Software Developer & AI Systems Engineer",
  education: { school: "ACSCE Bengaluru", degree: "B.Tech CSE", cgpa: 9.31 },
  specializations: ["Computer Vision", "Deep Learning (BERT)", "Full-Stack Web", "Network Security"],
  openSource: ["Kubernetes (kro)", "W3C / WHATWG WPT", "Mozilla Firefox"],
  availability: "Open for Full-time Roles & Internships"
};`
      : `{
  "engineer": "Deepith N",
  "status": "Ready for production",
  "metrics": { "cgpa": 9.31, "projects": 9, "contributions": ["Kubernetes", "W3C", "Mozilla"] }
}`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="main-portfolio-page recruiter-view">
      {/* ── Neomorphic Interactive Cursor ── */}
      <NeomorphicCursor />

      {/* ── Fixed Clean Navigation Bar ── */}
      <nav className={`mp-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="mp-nav-inner">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="mp-brand"
          >
            <span className="mp-brand-name">Deepith N</span>
            <span className="mp-brand-badge">PORTFOLIO</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="mp-nav-links-desktop">
            <button onClick={() => scrollToSection('about')} className="mp-nav-item">About</button>
            <button onClick={() => scrollToSection('skills')} className="mp-nav-item">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="mp-nav-item">Projects ({PROJECTS.length})</button>
            <button onClick={() => scrollToSection('opensource')} className="mp-nav-item">Open Source</button>
            <button onClick={() => scrollToSection('education')} className="mp-nav-item">Education</button>
            <button onClick={() => scrollToSection('contact')} className="mp-nav-item">Contact</button>
          </div>

          <div className="mp-nav-actions">
            {/* Quick Switch to 3D Workshop Studio */}
            <button
              onClick={onEnterWorkshop}
              className="mp-btn-mode-nav workshop-btn"
              title="Enter 3D Interactive Studio Workshop (WASD / Camera Controls)"
            >
              <FaGamepad />
              <span>3D Workshop</span>
            </button>

            {/* Quick Switch to Hyprland OS Mode */}
            <button
              onClick={onEnterOS}
              className="mp-btn-mode-nav os-btn"
              title="Launch Simulated Hyprland Linux OS Desktop"
            >
              <FaDesktop />
              <span>OS Mode</span>
            </button>

            {/* Direct Resume PDF Button */}
            <a
              href="/DeepithN.pdf"
              target="_blank"
              rel="noreferrer"
              className="mp-btn-resume-nav"
              title="Open Resume in PDF"
            >
              <FaFilePdf />
              <span>Resume</span>
            </a>

            {/* Theme Toggle */}
            <button
              className="mp-theme-btn"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title={theme === 'light' ? "Switch to Dark Theme" : "Switch to Light Theme"}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="mp-mobile-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mp-mobile-drawer">
            <div className="mp-mobile-drawer-header">
              <span className="mp-mobile-drawer-title">Navigation Menu</span>
              <button
                className="mp-mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mp-mobile-links-list">
              <button onClick={() => scrollToSection('about')} className="mp-mobile-link">
                <span>About Me</span>
                <span className="link-arrow">➔</span>
              </button>
              <button onClick={() => scrollToSection('skills')} className="mp-mobile-link">
                <span>Technical Skills ({SKILL_CATEGORIES.length} Categories)</span>
                <span className="link-arrow">➔</span>
              </button>
              <button onClick={() => scrollToSection('projects')} className="mp-mobile-link">
                <span>Featured Projects ({PROJECTS.length})</span>
                <span className="link-arrow">➔</span>
              </button>
              <button onClick={() => scrollToSection('opensource')} className="mp-mobile-link">
                <span>Open Source ({OPEN_SOURCE_WORK.length} Repos)</span>
                <span className="link-arrow">➔</span>
              </button>
              <button onClick={() => scrollToSection('education')} className="mp-mobile-link">
                <span>Education & Certifications ({CERTIFICATIONS.length})</span>
                <span className="link-arrow">➔</span>
              </button>
              <button onClick={() => scrollToSection('contact')} className="mp-mobile-link">
                <span>Contact & Connect</span>
                <span className="link-arrow">➔</span>
              </button>
            </div>

            <div className="mp-mobile-modes-grid">
              <button onClick={() => { setMobileMenuOpen(false); onEnterWorkshop(); }} className="mp-mobile-mode-card">
                <FaGamepad size={22} color="var(--mp-accent)" />
                <div>
                  <strong>Launch 3D Workshop (Game)</strong>
                  <span>Walk inside 3D virtual station</span>
                </div>
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onEnterOS(); }} className="mp-mobile-mode-card">
                <FaDesktop size={22} color="#38bdf8" />
                <div>
                  <strong>Launch Hyprland OS Mode</strong>
                  <span>Simulated draggable Linux desktop</span>
                </div>
              </button>
            </div>

            <div className="mp-mobile-actions-footer">
              <a href="/DeepithN.pdf" target="_blank" rel="noreferrer" className="mp-mobile-btn-primary">
                <FaFilePdf /> View Resume PDF
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section (Photo-Free, High-Tech Developer Terminal) ── */}
      <header id="hero" className="mp-hero-section">
        <div className="mp-ambient-glow mp-glow-1" />
        <div className="mp-ambient-glow mp-glow-2" />

        <div className="mp-container mp-hero-grid">
          {/* Hero Left: Information & Call to Actions */}
          <div className="mp-hero-content">
            <div className="mp-hero-portrait-badge">
              <div className="mp-portrait-frame">
                <img src="/Profile-u.jpg" alt="Deepith N" className="mp-portrait-img" />
              </div>
              <div className="mp-hero-status-pill">
                <span className="status-text">
                  <span className="status-text-full">OPEN FOR FULL-TIME ROLES & INTERNSHIPS</span>
                  <span className="status-text-short">OPEN FOR WORK & INTERNSHIPS</span>
                </span>
              </div>
            </div>

            <h1 className="mp-hero-title">
              Hi, I'm <span className="gradient-highlight">Deepith N</span>
            </h1>

            <h2 className="mp-hero-subtitle">
              <span className={`mp-role-rotate ${roleFading ? 'fading' : ''}`}>
                {ROTATING_TITLES[roleTitleIndex]}
              </span>
            </h2>

            <p className="mp-hero-tagline">
              Computer Science & Engineering graduate focused on building reliable, scalable, and user-centered software — from full-stack applications and backend services to intelligent systems and automation.
            </p>

            {/* Primary Action Buttons */}
            <div className="mp-hero-cta-group">
              <button onClick={() => scrollToSection('projects')} className="mp-btn-primary">
                <FaLaptopCode /> View Projects ({PROJECTS.length}) ➔
              </button>
              <a href="/DeepithN.pdf" target="_blank" rel="noreferrer" className="mp-btn-secondary">
                <FaFilePdf /> Download Resume
              </a>
              <button onClick={() => scrollToSection('contact')} className="mp-btn-ghost">
                Let's Talk
              </button>
            </div>

            {/* Interactive Modes Quick Bar */}
            <div className="mp-interactive-launcher-banner">
              <div className="launcher-label">Interactive Modes:</div>
              <div className="launcher-buttons">
                <button
                  onClick={onEnterWorkshop}
                  className="launcher-btn workshop-launcher"
                  title="Explore 3D Virtual Workshop Studio"
                >
                  <FaGamepad /> <span>3D Studio Workshop (Game)</span> ➔
                </button>
                <button
                  onClick={onEnterOS}
                  className="launcher-btn os-launcher"
                  title="Open Simulated Hyprland OS Desktop"
                >
                  <FaDesktop /> <span>Hyprland Linux OS</span> ➔
                </button>
              </div>
            </div>

            {/* Social Proof & Quick Links */}
            <div className="mp-hero-social-row">
              <span className="social-label">Profiles:</span>
              <a
                href="https://github.com/deepith-18"
                target="_blank"
                rel="noreferrer"
                className="mp-social-link"
                title="GitHub Profile"
              >
                <FaGithub /> <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/deepithn1718/"
                target="_blank"
                rel="noreferrer"
                className="mp-social-link"
                title="LinkedIn Profile"
              >
                <FaLinkedin /> <span>LinkedIn</span>
              </a>
              <a
                href="mailto:deepithdeekshith@gmail.com"
                className="mp-social-link"
                title="Send Email"
              >
                <FaEnvelope /> <span>Email</span>
              </a>
            </div>
          </div>

          {/* Hero Right: Interactive Developer Terminal (Replaces Photo!) */}
          <div className="mp-hero-terminal-wrapper">
            <div className="terminal-window">
              {/* Terminal Window Header Bar */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>

                {/* Tabs */}
                <div className="terminal-tabs">
                  <button
                    className={`terminal-tab ${activeCodeTab === 'developer.ts' ? 'active' : ''}`}
                    onClick={() => setActiveCodeTab('developer.ts')}
                  >
                    <span className="tab-icon">ts</span>
                    <span>developer.ts</span>
                  </button>
                  <button
                    className={`terminal-tab ${activeCodeTab === 'metrics.json' ? 'active' : ''}`}
                    onClick={() => setActiveCodeTab('metrics.json')}
                  >
                    <span className="tab-icon">json</span>
                    <span>metrics.json</span>
                  </button>
                </div>

                <div className="terminal-actions">
                  <button
                    className="terminal-copy-btn"
                    onClick={handleCopyCode}
                    title="Copy code to clipboard"
                  >
                    {copiedCode ? <FaCheck color="#10b981" /> : <FaCopy />}
                  </button>
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="terminal-body">
                {activeCodeTab === 'developer.ts' ? (
                  <pre className="terminal-code">
                    <code>
                      <span className="syn-line"><span className="ln">1</span><span className="syn-kw">const</span> <span className="syn-var">engineer</span>: <span className="syn-type">DeveloperProfile</span> = &#123;</span>
                      <span className="syn-line"><span className="ln">2</span>  <span className="syn-prop">name</span>: <span className="syn-str">"Deepith N"</span>,</span>
                      <span className="syn-line"><span className="ln">3</span>  <span className="syn-prop">role</span>: <span className="syn-str">"Software Developer & AI Engineer"</span>,</span>
                      <span className="syn-line"><span className="ln">4</span>  <span className="syn-prop">academics</span>: &#123;</span>
                      <span className="syn-line"><span className="ln">5</span>    <span className="syn-prop">institution</span>: <span className="syn-str">"ACS College of Engineering"</span>,</span>
                      <span className="syn-line"><span className="ln">6</span>    <span className="syn-prop">degree</span>: <span className="syn-str">"B.Tech in CSE (2022 - 2026)"</span>,</span>
                      <span className="syn-line"><span className="ln">7</span>    <span className="syn-prop">cgpa</span>: <span className="syn-num">9.31</span> <span className="syn-cmt">{"// Dean's Honor Roll"}</span></span>
                      <span className="syn-line"><span className="ln">8</span>  &#125;,</span>
                      <span className="syn-line"><span className="ln">9</span>  <span className="syn-prop">specializations</span>: [</span>
                      <span className="syn-line"><span className="ln">10</span>    <span className="syn-str">"Computer Vision & Deep Learning"</span>,</span>
                      <span className="syn-line"><span className="ln">11</span>    <span className="syn-str">"High-Performance Web Applications"</span>,</span>
                      <span className="syn-line"><span className="ln">12</span>    <span className="syn-str">"Network Security & Cryptography"</span></span>
                      <span className="syn-line"><span className="ln">13</span>  ],</span>
                      <span className="syn-line"><span className="ln">14</span>  <span className="syn-prop">openSource</span>: [<span className="syn-str">"Kubernetes (kro)"</span>, <span className="syn-str">"W3C WPT"</span>, <span className="syn-str">"Mozilla Firefox"</span>],</span>
                      <span className="syn-line"><span className="ln">15</span>  <span className="syn-prop">availableForHire</span>: <span className="syn-bool">true</span></span>
                      <span className="syn-line"><span className="ln">16</span>&#125;;</span>
                      <span className="syn-line"><span className="ln">17</span></span>
                      <span className="syn-line"><span className="ln">18</span><span className="syn-kw">export default</span> <span className="syn-var">engineer</span>; <span className="terminal-cursor" /></span>
                    </code>
                  </pre>
                ) : (
                  <pre className="terminal-code">
                    <code>
                      <span className="syn-line"><span className="ln">1</span>&#123;</span>
                      <span className="syn-line"><span className="ln">2</span>  <span className="syn-prop">"btech_cgpa"</span>: <span className="syn-num">9.31</span>,</span>
                      <span className="syn-line"><span className="ln">3</span>  <span className="syn-prop">"total_projects"</span>: <span className="syn-num">9</span>,</span>
                      <span className="syn-line"><span className="ln">4</span>  <span className="syn-prop">"open_source_contributions"</span>: [</span>
                      <span className="syn-line"><span className="ln">5</span>    <span className="syn-str">"kubernetes-sigs/kro"</span>,</span>
                      <span className="syn-line"><span className="ln">6</span>    <span className="syn-str">"web-platform-tests/wpt"</span>,</span>
                      <span className="syn-line"><span className="ln">7</span>    <span className="syn-str">"mozilla/gecko-dev"</span></span>
                      <span className="syn-line"><span className="ln">8</span>  ],</span>
                      <span className="syn-line"><span className="ln">9</span>  <span className="syn-prop">"verified_certifications"</span>: <span className="syn-num">6</span>,</span>
                      <span className="syn-line"><span className="ln">10</span>  <span className="syn-prop">"status"</span>: <span className="syn-str">"Production Ready"</span></span>
                      <span className="syn-line"><span className="ln">11</span>&#125; <span className="terminal-cursor" /></span>
                    </code>
                  </pre>
                )}
              </div>

              {/* Terminal Bottom Status Ribbon */}
              <div className="terminal-footer">
                <div className="terminal-status-left">
                  <span className="terminal-status-dot" />
                  <span>TypeScript 5.3</span>
                  <span className="sep">•</span>
                  <span>UTF-8</span>
                </div>
                <div className="terminal-status-right">
                  <span>✓ 0 errors</span>
                  <span className="sep">•</span>
                  <span>Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Metric Highlights Strip ── */}
      <section className="mp-metrics-strip">
        <div className="mp-container">
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-icon"><FaGraduationCap color="var(--mp-accent)" /></span>
              <div className="metric-info">
                <span className="metric-val">9.31 / 10</span>
                <span className="metric-label">B.Tech CGPA (Dean's Honor Roll)</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="metric-icon"><FaLaptopCode color="#38bdf8" /></span>
              <div className="metric-info">
                <span className="metric-val">9 Projects</span>
                <span className="metric-label">AI, Systems & Web Applications</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="metric-icon"><FaLayerGroup color="#a855f7" /></span>
              <div className="metric-info">
                <span className="metric-val">4 Major Repos</span>
                <span className="metric-label">Kubernetes, W3C & Mozilla Contributor</span>
              </div>
            </div>

            <div className="metric-card">
              <span className="metric-icon"><FaCertificate color="#f59e0b" /></span>
              <div className="metric-info">
                <span className="metric-val">6 Certifications</span>
                <span className="metric-label">NPTEL, IIT, Microsoft & Infosys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="mp-section mp-about-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">BACKGROUND & FOCUS</span>
            <h2 className="mp-section-title">About Me</h2>
            <p className="mp-section-desc">Who I am, what I build, and my approach to software engineering.</p>
          </div>

          <div className="mp-about-grid">
            <div className="mp-about-card main-bio">
              <h3>Building Software That Solves Real Problems</h3>
              <p>
                I'm a Computer Science & Engineering graduate focused on building reliable, scalable, and user-centered software. I enjoy turning ideas into practical solutions through clean code, thoughtful system design, and modern development technologies.
              </p>
              <p>
                From backend services and full-stack applications to automation and intelligent systems, I'm driven by curiosity, continuous learning, and a strong foundation in software engineering. I focus on writing maintainable code, understanding systems from the ground up, and building products that are both functional and meaningful.
              </p>
              <div className="mp-bio-highlights">
                <div className="highlight-pill">Full-Stack Systems & APIs</div>
                <div className="highlight-pill">Distributed Systems Architecture</div>
                <div className="highlight-pill">Deep Learning & Computer Vision</div>
              </div>
            </div>

            <div className="mp-about-card meta-info">
              <h3>Key Information</h3>
              <div className="mp-meta-list">
                <div className="mp-meta-row">
                  <span className="meta-k">Location:</span>
                  <span className="meta-v">Bengaluru, Karnataka, India</span>
                </div>
                <div className="mp-meta-row">
                  <span className="meta-k">Education:</span>
                  <span className="meta-v">B.Tech in CSE (2022 - 2026)</span>
                </div>
                <div className="mp-meta-row">
                  <span className="meta-k">Languages:</span>
                  <span className="meta-v">English, Hindi, Kannada</span>
                </div>
                <div className="mp-meta-row">
                  <span className="meta-k">Interests:</span>
                  <span className="meta-v">AI/ML, Distributed Systems, Open Source, Cryptography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="mp-section mp-skills-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">TECHNICAL ARSENAL</span>
            <h2 className="mp-section-title">Skills & Technologies</h2>
            <p className="mp-section-desc">Languages, libraries, frameworks, and infrastructure tools I use regularly.</p>
          </div>

          <div className="mp-skills-grid">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="mp-skill-category-card">
                <div className="skill-cat-header">
                  <div className="skill-cat-icon">{cat.icon}</div>
                  <h3 className="skill-cat-title">{cat.title}</h3>
                </div>
                <div className="skill-badge-cloud">
                  {cat.skills.map((s, i) => (
                    <span key={i} className="skill-badge-pill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section id="projects" className="mp-section mp-projects-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">PORTFOLIO WORK</span>
            <h2 className="mp-section-title">Featured Projects ({PROJECTS.length})</h2>
            <p className="mp-section-desc">Explore all 9 tangible projects spanning AI/ML, Full-Stack applications, and Network Security.</p>
          </div>

          {/* Filter Tabs */}
          <div className="mp-filter-tabs">
            <button
              className={`mp-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              className={`mp-filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              AI & Machine Learning (5)
            </button>
            <button
              className={`mp-filter-btn ${activeFilter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setActiveFilter('fullstack')}
            >
              Full-Stack & Web (2)
            </button>
            <button
              className={`mp-filter-btn ${activeFilter === 'systems' ? 'active' : ''}`}
              onClick={() => setActiveFilter('systems')}
            >
              Systems & Security (2)
            </button>
          </div>

          {/* Projects Grid */}
          <div className="mp-projects-grid">
            {filteredProjects.map((p) => (
              <article key={p.id} className="mp-project-card">
                <div className="mp-proj-media">
                  <img
                    src={'/' + p.image.replace(/^\//, '')}
                    alt={p.title}
                    className="mp-proj-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="mp-proj-fallback" style={{ display: 'none' }}>
                    <FaCode size={36} color="var(--mp-accent)" />
                    <span>{p.title}</span>
                  </div>
                  <div className="mp-proj-overlay">
                    <a href={p.github} target="_blank" rel="noreferrer" className="mp-proj-quicklink">
                      <FaGithub /> View Source Code
                    </a>
                  </div>
                </div>

                <div className="mp-proj-body">
                  <div className="mp-proj-header">
                    <h3 className="mp-proj-title">{p.title}</h3>
                    <a href={p.github} target="_blank" rel="noreferrer" className="mp-proj-gitbtn" title="View Source on GitHub">
                      <FaGithub size={18} />
                    </a>
                  </div>

                  <p className="mp-proj-description">{p.description}</p>

                  <ul className="mp-proj-highlights">
                    {p.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>

                  <div className="mp-proj-tags">
                    {p.tags.map((tag, i) => (
                      <span key={i} className="mp-proj-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Source Section (4 Real Projects) ── */}
      <section id="opensource" className="mp-section mp-opensource-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">COMMUNITY & ECOSYSTEM</span>
            <h2 className="mp-section-title">Open Source Contributions</h2>
            <p className="mp-section-desc">Active contributions to Kubernetes controllers, Web standards (W3C), and Mozilla browser rendering.</p>
          </div>

          <div className="mp-os-grid">
            {OPEN_SOURCE_WORK.map((os, idx) => (
              <div key={idx} className="mp-os-card">
                <div className="mp-os-header">
                  <div className="mp-os-icon-wrap">{os.icon}</div>
                  <div>
                    <h3 className="mp-os-title">{os.title}</h3>
                    <span className="mp-os-org">{os.org}</span>
                  </div>
                </div>
                <p className="mp-os-desc">{os.description}</p>
                <div className="mp-os-tags">
                  {os.tags.map((t, i) => (
                    <span key={i} className="mp-os-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education & Certifications Section ── */}
      <section id="education" className="mp-section mp-education-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">CREDENTIALS</span>
            <h2 className="mp-section-title">Education & Certifications</h2>
            <p className="mp-section-desc">Academic record and verified technical certifications from premier institutions.</p>
          </div>

          <div className="mp-edu-cert-grid">
            {/* Timeline */}
            <div className="mp-edu-column">
              <h3 className="column-subheading"><FaGraduationCap /> Academic Timeline</h3>
              <div className="mp-timeline">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="mp-timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-body">
                      <span className="timeline-period">{edu.period}</span>
                      <h4 className="timeline-school">{edu.school}</h4>
                      <p className="timeline-degree">{edu.degree}</p>
                      <span className="timeline-score">{edu.score}</span>
                      <p className="timeline-highlight">{edu.highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications (6 Verified) */}
            <div className="mp-certs-column">
              <h3 className="column-subheading"><FaCertificate /> Verified Certifications ({CERTIFICATIONS.length})</h3>
              <div className="mp-certs-list">
                {CERTIFICATIONS.map((cert, idx) => (
                  <a
                    key={idx}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mp-cert-card"
                  >
                    <div className="cert-card-left">
                      <span className="cert-medal"><FaCertificate color="var(--mp-accent)" /></span>
                      <div>
                        <h4 className="cert-name">{cert.name}</h4>
                        <span className="cert-issuer">{cert.issuer}</span>
                      </div>
                    </div>
                    <div className="cert-card-right">
                      <span>Verify <FaExternalLinkAlt size={10} /></span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive 3D Workshop & OS Simulator Showcase Banner ── */}
      <section className="mp-section mp-interactive-hub-section">
        <div className="mp-container">
          <div className="mp-interactive-hub-card">
            <div className="interactive-hub-header">
              <span className="hub-badge">INTERACTIVE EXPERIENCES</span>
              <h2 className="hub-title">Ready to Test the 3D Studio or Hyprland OS?</h2>
              <p className="hub-desc">
                Step inside the 3D virtual workspace or explore the simulated Linux desktop with draggable windows and terminal emulator. You can return back to this portfolio anytime with a single click.
              </p>
            </div>
            <div className="interactive-hub-grid">
              <div className="hub-feature-box">
                <div className="hub-feature-icon"><FaGamepad color="var(--mp-accent)" /></div>
                <h3>3D Virtual Studio Workshop</h3>
                <p>Immersive 3D environment built with Three.js & React Three Fiber. Walk around using WASD controls, examine stations, and interact with the scene.</p>
                <button onClick={onEnterWorkshop} className="mp-btn-primary hub-action-btn">
                  <FaGamepad /> Enter 3D Workshop Now ➔
                </button>
              </div>

              <div className="hub-feature-box">
                <div className="hub-feature-icon"><FaDesktop color="#38bdf8" /></div>
                <h3>Simulated Hyprland OS</h3>
                <p>Interactive Linux desktop simulation with tiled draggable windows, functional Waybar taskbar, and interactive terminal commands.</p>
                <button onClick={onEnterOS} className="mp-btn-secondary hub-action-btn">
                  <FaDesktop /> Launch Hyprland OS Mode ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="mp-section mp-contact-section">
        <div className="mp-container">
          <div className="mp-section-header">
            <span className="mp-section-tag">GET IN TOUCH</span>
            <h2 className="mp-section-title">Let's Connect</h2>
            <p className="mp-section-desc">I am currently open to software engineering opportunities, internships, and collaborations.</p>
          </div>

          <div className="mp-contact-card">
            <div className="contact-direct-info">
              <h3>Start a Conversation</h3>
              <p>Have an open role, an exciting project, or want to connect? Reach out directly:</p>

              <div className="contact-method-box">
                <div className="contact-method-row">
                  <FaEnvelope className="contact-icon" />
                  <span className="contact-value">deepithdeekshith@gmail.com</span>
                  <button
                    onClick={handleCopyEmail}
                    className="copy-btn"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <FaCheck color="#10b981" /> : <FaCopy />}
                    <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                <div className="contact-method-row">
                  <FaLinkedin className="contact-icon" />
                  <a
                    href="https://www.linkedin.com/in/deepithn1718/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-value link"
                  >
                    linkedin.com/in/deepithn1718
                  </a>
                </div>

                <div className="contact-method-row">
                  <FaGithub className="contact-icon" />
                  <a
                    href="https://github.com/deepith-18"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-value link"
                  >
                    github.com/deepith-18
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-cta-wrapper">
              <a href="mailto:deepithdeekshith@gmail.com" className="mp-btn-primary send-mail-btn">
                <FaEnvelope /> Compose Email Directly
              </a>
              <a href="/DeepithN.pdf" target="_blank" rel="noreferrer" className="mp-btn-secondary download-cv-btn">
                <FaFilePdf /> View & Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mp-footer">
        <div className="mp-container mp-footer-inner">
          <div className="footer-left">
            <span className="footer-brand">Deepith N</span>
            <p>© {new Date().getFullYear()} Deepith N • Built with React & modern web standards.</p>
          </div>
          <div className="footer-right">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="footer-back-to-top"
              title="Back to Top"
            >
              <FaArrowUp /> Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
