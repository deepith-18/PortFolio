import React from 'react';
import { motion } from 'framer-motion';

function Projects() {
    // Variants for the container to orchestrate animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    // Variants for each project card
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <motion.section
            id="projects"
            className="container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Animate when 10% of the section is in view
        >
            <h2 className="section-heading">
                <span className="gradient-text">Projects</span>
            </h2>
            <motion.div
                className="projects-grid"
                variants={containerVariants}
            >
                {/* Project Card 1 */}
                <motion.div
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px rgba(94, 234, 212, 0.2)" }}
                    data-cursor-tooltip="View Project" // <-- Tooltip added here
                >
                    <h3 className="project-title">Academor – AI in Warehouse Industry</h3>
                    <ul className="project-details">
                        <li>📦 30% Improvement in inventory accuracy using AI-driven stock predictions.</li>
                        <li>⚙️ 40% Reduction in order processing time through automated workflow optimization.</li>
                        <li>📊 Real-time Data Insights enabling 25% faster decision-making for warehouse operations.</li>
                        <li><a href="You_repo_link" target="_blank" rel="noopener noreferrer">🔗 GitHub Repository</a></li>
                    </ul>
                </motion.div>

                {/* Project Card 2 */}
                <motion.div
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px rgba(94, 234, 212, 0.2)" }}
                    data-cursor-tooltip="View Project" // <-- Tooltip added here
                >
                    <h3 className="project-title">Courier Management System</h3>
                    <ul className="project-details">
                        <li>🚚 Python-based system to streamline parcel tracking and delivery operations.</li>
                        <li>📈 Enhanced efficiency with automated order processing and real-time tracking.</li>
                        <li>🖥️ Designed a Tkinter-based GUI for seamless interaction.</li>
                        <li>🗃️ Integrated database management using SQLite/MySQL.</li>
                        <li><a href="https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project" target="_blank" rel="noopener noreferrer">🔗 GitHub Repository</a></li>
                    </ul>
                </motion.div>

                {/* Project Card 3 */}
                <motion.div
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px rgba(94, 234, 212, 0.2)" }}
                    data-cursor-tooltip="View Project" // <-- Tooltip added here
                >
                    <h3 className="project-title">Simple Sentiment Analysis</h3>
                    <ul className="project-details">
                        <li>🚀 Real-Time Facial Emotion Recognition: Processes 30+ FPS using OpenCV & DeepFace.</li>
                        <li>🧠 Detects 7 emotions (Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral) with 90%+ accuracy.</li>
                        <li>📊 Dynamic Emotion Bar Chart Visualization.</li>
                        <li>⚡ Optimized for HD resolution and scalable with multiple backends.</li>
                        <li><a href="https://github.com/deepith-18/Sentimental_analysis" target="_blank" rel="noopener noreferrer">🔗 GitHub Repository</a></li>
                    </ul>
                </motion.div>

                {/* Project Card 4 */}
                <motion.div
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px rgba(94, 234, 212, 0.2)" }}
                    data-cursor-tooltip="View Project" // <-- Tooltip added here
                >
                     <h3 className="project-title">Studicholic – AI-Powered Video Generation</h3>
                    <ul className="project-details">
                        <li>🎓 Converts PDFs or notes into engaging educational videos using AI.</li>
                        <li>🧠 Uses NLP for smart topic extraction and content summarization.</li>
                        <li>🎞️ Automatically generates videos with TTS voiceover, animations, and subtitles.</li>
                        <li>🌐 Designed to support multilingual video generation in future versions.</li>
                        <li><a href="https://github.com/deepith-18/StudentHolic-AI" target="_blank" rel="noopener noreferrer">🔗 GitHub Repository</a></li>
                    </ul>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default Projects;