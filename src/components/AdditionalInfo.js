import React from 'react';
import { motion } from 'framer-motion';
import { FaLanguage, FaLightbulb, FaGamepad, FaCertificate } from 'react-icons/fa';

function AdditionalInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      id="additional" 
      className="container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="section-heading">
        <span className="gradient-text">Profile Details & Interests</span>
      </h2>
      
      <motion.div className="projects-grid" variants={containerVariants}>
        
        {/* Languages (Preserved) */}
        <motion.div className="project-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="card-header">
            <FaLanguage size={30} color="#64ffda" />
            <h3 className="project-title">Languages</h3>
          </div>
          <ul className="project-details">
            <li>English</li>
            <li>Hindi</li>
            <li>Kannada</li>
          </ul>
        </motion.div>

        {/* Interests (Merged Resume + Previous) */}
        <motion.div className="project-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="card-header">
            <FaLightbulb size={30} color="#e6f1ff" />
            <h3 className="project-title">Areas of Interest</h3>
          </div>
          <ul className="project-details">
            <li>Artificial Intelligence (AI) & ML</li>
            <li>Software Development</li>
            <li>System Architecture</li>
            <li>Data Structures & Algorithms (DSA)</li>
            <li>Data Engineering & Preprocessing</li>
            <li>Cloud Computing</li>
            <li>AWS</li>
            <li>Blockchain</li>
          </ul>
        </motion.div>

        {/* Certifications & Awards (Added from Resume) */}
        <motion.div className="project-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="card-header">
            <FaCertificate size={30} color="#ffdb4d" />
            <h3 className="project-title">Certifications & Awards</h3>
          </div>
          <ul className="project-details">
            <li>Participant, Google Hackathon</li>
            <li>Career Essentials in Generative AI (LinkedIn)</li>
            <li>Core Java (Coursera)</li>
            <li>Computer Networks (NPTEL)</li>
            <li>Artificial Intelligence (NPTEL)</li>
            <li>Database Management (Infosys Springboard)</li>
          </ul>
        </motion.div>

        {/* Hobbies (Preserved) */}
        <motion.div className="project-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="card-header">
            <FaGamepad size={30} color="#ff7139" />
            <h3 className="project-title">Hobbies</h3>
          </div>
          <ul className="project-details">
            <li>Building  Projects</li>
            <li>Coding Challenges</li>
            <li>Playing Strategy Games</li>
            <li>Teaching & Mentoring</li>
          </ul>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}

export default AdditionalInfo;