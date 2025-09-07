// src/components/Hero.js (Updated)
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Animate children one by one
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };

    return (
        <motion.section
            id="hero"
            className="hero container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.p className="small-heading" variants={itemVariants}>
                Hey there! I'm
            </motion.p>
            <motion.h1 className="big-heading" variants={itemVariants}>
                Deepith N
            </motion.h1>
            <motion.div variants={itemVariants}>
                <h2 className="sub-heading">
                    <TypeAnimation
                        sequence={[
                            'A Software Developer',
                            2000,
                            'A Problem Solver',
                            2000,
                            'An Innovator',
                            2000,
                            'A Technology Explorer',
                            2000,
                            'A Creative Thinker',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        className="highlight"
                        repeat={Infinity}
                    />
                </h2>
            </motion.div>
            <motion.p className="description" variants={itemVariants}>
                Enthusiastic Software Developer with a strong foundation in Data Engineering, Machine Learning, and AI. Skilled in Python, Java, C, SQL, and web technologies, with experience in building scalable applications and efficient data pipelines. Passionate about solving complex problems and leveraging technology to drive innovation. Certified by Microsoft, NPTEL, and Infosys SpringBoard, continuously expanding knowledge to stay ahead in the tech industry.
            </motion.p>
            <motion.div variants={itemVariants}>
                <button
                    className="cta-button"
                    onClick={() => {
                        window.open('/Deepith_Resume.pdf', '_blank');
                    }}
                    data-cursor-tooltip="Download CV" // <-- Tooltip added here
                >
                    View My Resume
                </button>
            </motion.div>
        </motion.section>
    );
}

export default Hero;