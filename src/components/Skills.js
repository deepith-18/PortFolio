import React from 'react';
// Import motion for animations
import { motion } from 'framer-motion';
// Icons for skills - FaReact has been added here
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaJsSquare, FaBrain, FaReact } from 'react-icons/fa'; 
import { SiMongodb, SiMysql, SiPandas, SiNumpy, SiFlask, SiNextdotjs } from 'react-icons/si';
function Skills() {
    // Define the animation object once to keep the code clean (DRY principle)
    const skillAnimation = {
        scale: 1.1,
        rotateX: 10,
        rotateY: 10,
        boxShadow: "0 5px 15px rgba(94, 234, 212, 0.3)", // A nice teal glow
        transition: { type: "spring", stiffness: 300, damping: 10 }
    };

    return (
        <section id="skills" className="container">
            {/* Added motion back to the heading for consistency */}
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
                    {/* All spans are now motion.span with the 3D animation */}
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaPython /> Python</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaJava /> Java</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaJsSquare /> JavaScript</motion.span>
                    {/* The "C" skill tag has been removed as requested */}
                </div>
            </div>
            
            {/* Web Technologies */}
            <div className="skill-category">
                <h3>Web Technologies</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaHtml5 /> HTML</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaCss3Alt /> CSS</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaJsSquare /> JavaScript</motion.span>
                     <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaReact /> React</motion.span>
                </div>
            </div>
            
            {/* Database Management */}
            <div className="skill-category">
                <h3>Database Management</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiMysql /> MySQL</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiMongodb /> MongoDB</motion.span>
                </div>
            </div>
            
            {/* Data Science & Data Engineering */}
            <div className="skill-category">
                <h3>Data Science & Data Engineering</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiPandas /> Pandas</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiNumpy /> NumPy</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>Data Preprocessing & Feature Engineering</motion.span>
                </div>
            </div>
            
            {/* Tools & Frameworks */}
            <div className="skill-category">
                <h3>Tools & Frameworks</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>Tkinter</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiNextdotjs /> Next.js</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><SiFlask /> Flask</motion.span>
                </div>
            </div>
            
            {/* Miscellaneous */}
            <div className="skill-category">
                <h3>Miscellaneous</h3>
                <div className="skills-container">
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaGitAlt /> Git & GitHub</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}><FaBrain /> Hugging Face</motion.span>
                    <motion.span className="skill-tag skill-card" whileHover={skillAnimation}>API Development</motion.span>
                </div>
            </div>
        </section>
    );
}

export default Skills;