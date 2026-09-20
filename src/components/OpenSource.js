import React from 'react';
import { motion } from 'framer-motion';
import { FaFirefoxBrowser, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';

function OpenSource() {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="open-source" className="container">
      <motion.h2 
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="gradient-text">Open Source Contributions</span>
      </motion.h2>

      <div className="projects-grid">
        
        {/* Contribution 1: WPT */}
        <motion.div 
          className="project-card"
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
        >
          <div className="card-header">
            <FaCheckCircle size={40} color="#4CAF50" />
            <h3>Web Platform Tests (WPT)</h3>
          </div>
          <p>
            Authored and contributed conformance tests for HTML & CSS to the Web Platform Tests suite used by major browser engines including Chromium, Firefox, and WebKit.
          </p>
          <div className="tech-stack">
            <span>HTML</span>
            <span>CSS</span>
            <span>Web Standards</span>
          </div>
        </motion.div>

        {/* Contribution 2: Firefox Bug */}
        <motion.div 
          className="project-card"
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -10 }}
        >
          <div className="card-header">
            <FaFirefoxBrowser size={40} color="#FF7139" />
            <h3>Mozilla Firefox (Bug Investigation)</h3>
          </div>
          <p>
            Identified and reported a CSS Flexbox rendering issue in Firefox with a minimal reproducible test case, collaborating with Mozilla engineers via Bugzilla.
          </p>
          <div className="tech-stack">
            <span>Bugzilla</span>
            <span>Flexbox</span>
            <span>Browser Rendering</span>
          </div>
        </motion.div>

        {/* Contribution 3: Kubernetes / kro */}
        <motion.div 
          className="project-card"
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -10 }}
        >
          <div className="card-header">
            <SiKubernetes size={40} color="#326CE5" />
            <h3>Kubernetes Controller (kro)</h3>
          </div>
          <p>
            Investigated CEL expression handling in the kro Kubernetes controller by reproducing includeWhen evaluation behavior on the latest main branch. Set up a local Kind cluster, installed CRDs, ran the controller from source, and shared minimal repro cases while discussing error vs skip semantics with maintainers.
          </p>
          <div className="tech-stack">
            <span>Kubernetes</span>
            <span>CEL</span>
            <span>Controllers</span>
            <span>Open Source</span>
          </div>
        </motion.div>

        {/* Contribution 4: CI/CD & Libraries */}
        <motion.div 
          className="project-card"
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <div className="card-header">
            <FaGithub size={40} color="#fff" />
            <h3>Library Maintenance & CI/CD</h3>
          </div>
          <p>
            Collaborated with maintainers across open-source projects to debug CI/CD failures, resolve test instability, and perform safe refactors using advanced Git workflows.
          </p>
          <div className="tech-stack">
            <span>CI/CD</span>
            <span>Git Rebase</span>
            <span>Testing</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default OpenSource;
