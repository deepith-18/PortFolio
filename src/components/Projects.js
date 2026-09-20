// src/components/Projects.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/ProjectsStack.css';

export const PROJECTS = [
  {
    title: "Code from Design – AI UI to Code Converter",
    image: "CFD.png",
    description: "An intelligent full-stack developer tool that instantly transforms static UI screenshots into clean, usable HTML, CSS, and React code using Computer Vision.",
    points: [
      "Automated Code Generation: Converts UI screenshots into responsive React components instantly.",
      "Heuristic UI Detection: Custom OpenCV algorithms identify form layouts with 95% precision.",
      "Secure Live Preview: Sandboxed iframe environment rendering generated code safely without errors.",
      "FastAPI & Vite: Robust framework featuring crash-proof data normalization."
    ],
    github: "https://github.com/deepith-18/Code-from-Design",
    demo: null,
    tags: ["React", "FastAPI", "OpenCV", "Python", "Automation"]
  },
  {
    title: "Fake Review Detection – BERT vs Traditional ML",
    image: "FRDUD.png",
    description: "A robust system for detecting fake e-commerce reviews using a dual-approach methodology (Classic ML vs. Deep Learning).",
    points: [
      "Comparative Analysis: Validated Random Forest/Naive Bayes (86% acc) against Fine-tuned BERT (98% acc).",
      "Transformer Power: Leveraged BERT's contextual embeddings to identify sophisticated deception.",
      "End-to-End Inference: Engineered a scalable pipeline with model persistence for real-time fraud checks.",
      "Advanced Vectorization: Combined TF-IDF for statistical features and Deep Learning for semantic context."
    ],
    github: "https://github.com/deepith-18/Major_Project",
    demo: null,
    tags: ["BERT", "NLP", "Deep Learning", "Python"]
  },
  {
    title: "Smart Health Advisor – Diagnostic Healthcare AI",
    image: "SMA.png",
    description: "A friendly, AI-powered chatbot built with Streamlit and Google Gemini to provide preliminary health guidance based on symptoms.",
    points: [
      "AI-Powered Analysis: Uses Google Gemini Pro to understand natural language and analyze symptoms.",
      "Structured Responses: Delivers clear advice in three sections: Probable Conditions, Recommended Actions, and Dietary Suggestions.",
      "Text-to-Speech: Integrated audio player using gTTS for accessible health guidance.",
      "Interactive UI: A clean, multi-page web application built with Streamlit for a seamless user experience."
    ],
    github: "https://github.com/deepith-18/Smart-Health-Advisor",
    demo: null,
    tags: ["Python", "Streamlit", "Gemini API", "AI/ML"]
  },
  {
    title: "Real-time Network Intrusion Detection System",
    image: "NIDS.png",
    description: "A secure, real-time network monitoring system capable of detecting attacks and logging threats using authenticated cryptography.",
    points: [
      "Real-time Packet Capture: Monitors live network traffic on specified interfaces using Scapy.",
      "Advanced Attack Detection: Identifies Port Scanning and DDoS (SYN/ICMP Floods) instantly.",
      "Secure Logging: Uses Fernet Symmetric-key cryptography to ensure alert logs are confidential.",
      "Interactive Dashboard: Futuristic Flask & SocketIO UI with real-time live traffic charts."
    ],
    github: "https://github.com/deepith-18/Network-IDS",
    demo: null,
    tags: ["Python", "Scapy", "Flask", "Cryptography", "SocketIO"]
  },
  {
    title: "Studicholic – AI-Powered Video Generation",
    image: "SHolic.png",
    description: "Innovative AI tool that converts PDFs and notes into engaging educational videos with automated voiceovers.",
    points: [
      "Converts PDFs or notes into engaging educational videos using generative AI models.",
      "Smart summarization and topic extraction using natural language processing.",
      "Automatically generates video files complete with TTS voiceover, subtitles, and kinetic animations.",
      "Engineered to handle multilingual conversions."
    ],
    github: "https://github.com/deepith-18/StudentHolic-AI",
    demo: null,
    tags: ["AI/ML", "NLP", "TTS", "Video Generation"]
  },
  {
    title: "Simple Sentiment Analysis",
    image: "SSA.png",
    description: "Real-time facial emotion recognition system processing 30+ FPS with 90%+ accuracy across 7 emotions.",
    points: [
      "Real-Time Facial Emotion Recognition: Processes 30+ FPS using OpenCV & DeepFace.",
      "Detects 7 emotions (Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral) with 90%+ accuracy.",
      "Dynamic Emotion Bar Chart Visualization.",
      "Optimized for HD resolution and scalable with multiple backends."
    ],
    github: "https://github.com/deepith-18/Sentimental_analysis",
    demo: null,
    tags: ["OpenCV", "DeepFace", "Python", "Computer Vision"]
  },
  {
    title: "Academor – AI in Warehouse Industry",
    image: "AI_Prediction.png",
    description: "AI-driven warehouse management system that revolutionizes inventory tracking and order processing.",
    points: [
      "30% Improvement in inventory accuracy using AI-driven stock predictions.",
      "40% Reduction in order processing time through automated workflow optimization.",
      "Real-time Data Insights enabling 25% faster decision-making for warehouse operations."
    ],
    github: "https://github.com/deepith-18/AI-for-Warehouse-Optimization",
    demo: null,
    tags: ["AI/ML", "Python", "Data Analytics", "Automation"]
  },
  {
    title: "AlgoVis Pro – JavaFX Sorting Visualizer",
    image: "ALGO.png",
    description: "A professional desktop application visualizing sorting algorithms in real-time with interactive animations and performance analytics.",
    points: [
      "Real-time Visualization: Interactive animations for Bubble, Selection, Insertion, Merge, and Quick Sort.",
      "Robust Architecture: Built using MVC patterns and Multithreading for non-blocking UI updates.",
      "Live Analytics: Tracks performance metrics like comparisons, swaps, and execution time dynamically.",
      "Advanced Controls: Adjustable animation speeds, array sizes (10-200), and dark/light themes."
    ],
    github: "https://github.com/deepith-18/AlgoVisPro",
    demo: null,
    tags: ["Java", "JavaFX", "Multithreading", "MVC", "Algorithms"]
  },
  {
    title: "Courier Management System",
    image: "CMS.png",
    description: "Comprehensive Python-based system to streamline parcel tracking and delivery operations with real-time updates.",
    points: [
      "Python-based system to streamline parcel tracking and delivery operations.",
      "Enhanced efficiency with automated order processing and real-time tracking.",
      "Designed a Tkinter-based GUI for seamless interaction.",
      "Integrated database management using SQLite/MySQL."
    ],
    github: "https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project",
    demo: null,
    tags: ["Python", "Tkinter", "MySQL", "GUI"]
  }
];

function ProjectCard({ project, index, total }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track the scroll of this individual card relative to the top of the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate subtle scaling down for the cards already stacked underneath (desktop only)
  const scaleFactor = 1 - (total - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : scaleFactor]);

  // Apply subtle overlay dimming to deeper layers to enhance contrast & depth (desktop only)
  const dimmerOpacity = useTransform(scrollYProgress, [0.1, 0.8], [0, isMobile ? 0 : 0.45]);

  return (
    <div ref={containerRef} className="project-sticky-wrapper" style={{ zIndex: index }}>
      <motion.div 
        className="project-stack-card" 
        style={{ scale }}
      >
        {/* Soft Dimming Cover overlay */}
        <motion.div className="project-stack-dimmer" style={{ opacity: dimmerOpacity }} />

        {/* Project Visual */}
        <div className="project-stack-image-box">
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-stack-img" 
            loading="lazy" 
          />
        </div>

        {/* Project Details */}
        <div className="project-stack-info">
          <div>
            <h3 className="project-stack-title">{project.title}</h3>
            <p className="project-stack-desc">{project.description}</p>
            
            <ul className="project-stack-points">
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            {/* Tech Stack Tags */}
            <div className="project-stack-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="project-stack-tag">{tag}</span>
              ))}
            </div>

            {/* Links */}
            <div className="project-stack-actions">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-stack-btn"
                >
                  <FaGithub size={18} /> View Code
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-stack-btn"
                  style={{ backgroundColor: '#2ecc71' }}
                >
                  <FaExternalLinkAlt size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '8rem 2rem', overflow: 'visible' }}>
      <h2 
        className="section-heading" 
        style={{ 
          textAlign: 'center', 
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '5rem',
          letterSpacing: '-0.04em'
        }}
      >
        <span className="gradient-text">Featured Projects</span>
      </h2>
      
      <div className="projects-stack-container">
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index + 1} 
            total={PROJECTS.length} 
          />
        ))}
      </div>
    </section>
  );
}