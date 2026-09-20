import React from 'react';
import { motion } from 'framer-motion';
// Added FaBug back into the imports
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaJsSquare, FaBrain, FaReact, FaNetworkWired, FaBug } from 'react-icons/fa'; 
// Removed SiBugzilla from here
import { SiMongodb, SiMysql, SiPandas, SiNumpy, SiFlask, SiNextdotjs } from 'react-icons/si';

function Skills() {
    const skillAnimation = {
        scale: 1.1,
        rotateX: 10,
        rotateY: 10,
        boxShadow: "0 5px 15px rgba(94, 234, 212, 0.3)",
        transition: { type: "spring", stiffness: 300, damping: 10 }
    };

    return (
        <section id="skills" className="container">
            <motion.h2 
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="gradient-text">Technical Arsenal</span>
            </motion.h2>
            
            {/* Programming Languages */}
            <div className="skill-category">
                <h3>Programming Languages</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaPython /> Python</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaJava /> Java</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaJsSquare /> JavaScript</motion.span>
                </div>
            </div>
            
            {/* Web Technologies */}
            <div className="skill-category">
                <h3>Web Technologies</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaHtml5 /> HTML</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaCss3Alt /> CSS</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaReact /> React</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiNextdotjs /> Next.js</motion.span>
                </div>
            </div>
            
            {/* Database Management */}
            <div className="skill-category">
                <h3>Database Management</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiMysql /> MySQL</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiMongodb /> MongoDB</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>SQLite</motion.span>
                </div>
            </div>
            
            {/* Data Science & AI */}
            <div className="skill-category">
                <h3>Data Science & AI</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiPandas /> Pandas</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiNumpy /> NumPy</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaBrain /> AI & ML</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>Data Preprocessing</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>Hugging Face</motion.span>
                </div>
            </div>

            {/* Tools & Frameworks */}
            <div className="skill-category">
                <h3>Tools & Frameworks</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaGitAlt /> Git & GitHub</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiFlask /> Flask</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>Tkinter</motion.span>
                    {/* Swapped SiBugzilla for FaBug */}
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaBug /> Bugzilla</motion.span>
                </div>
            </div>

            {/* Core Concepts */}
            <div className="skill-category">
                <h3>Core Concepts</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaNetworkWired /> System Architecture</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>DSA (Algorithms)</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>API Development</motion.span>
                </div>
            </div>
        </section>
    );
}

export default Skills;