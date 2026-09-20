import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava, faPython } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCoffee, faBrain, faRobot } from '@fortawesome/free-solid-svg-icons';

function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="certifications" 
      className="container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="section-heading"
        variants={badgeVariants}
      >
        <span className="gradient-text">Expertise Validation</span>
      </motion.h2>
      
      <motion.div 
        className="certification-badges"
        variants={containerVariants}
      >
        {/* NPTEL Java Certificate */}
        <motion.a 
          href="https://drive.google.com/file/d/1ORMZk3fh_ct3qdxtbNClBBu7oeN9aCiu/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faJava} className="cert-icon" />
          <span>NPTEL Programming in Java</span>
        </motion.a>

        {/* NPTEL Python Certificate */}
        <motion.a 
          href="https://drive.google.com/file/d/1FXAibJLrt-Y8CyefUlQ7Dh-cJH9MUrBv/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faPython} className="cert-icon" />
          <span>NPTEL Programming in Python</span>
        </motion.a>

        {/* NPTEL AI Certificate - NEW */}
        <motion.a 
          href="https://drive.google.com/file/d/1Tuki8k3H9t6U3i8Qizw33FyO-2Dx4Yzb/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faRobot} className="cert-icon" />
          <span>NPTEL Artificial Intelligence: Concepts and Techniques</span>
        </motion.a>

        {/* Microsoft AI Certificate */}
        <motion.a 
          href="https://drive.google.com/file/d/1OPN1YRGVt1Q6BNZQu9zcQO4tVVc1JxC0/view?usp=drive_link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faBrain} className="cert-icon" />
          <span>Microsoft Careers Essential in Generative AI</span>
        </motion.a>

        {/* Coursera Java Certificate */}
        <motion.a 
          href="https://drive.google.com/file/d/1HAPJYhICZS9bDl9K-KBAKwNPHrE1XC0Z/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faCoffee} className="cert-icon" />
          <span>Coursera Core Java</span>
        </motion.a>

        {/* Infosys DBMS Certificate */}
        <motion.a 
          href="https://drive.google.com/file/d/1Pqtvmyuam1wUZEOrafU4ztMcKhbvLatC/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="badge"
          variants={badgeVariants}
          whileHover={{ 
            y: -5, 
            scale: 1.02,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <FontAwesomeIcon icon={faDatabase} className="cert-icon" />
          <span>Infosys Springboard DBMS</span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}

export default Certifications;