// src/components/Education.js (Updated)
import React from 'react';
import { motion } from 'framer-motion';

function Education() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <motion.section
            id="education"
            className="container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="section-heading"><span className="gradient-text">Education Details</span></h2>
            <motion.div
                className="education-timeline"
                variants={containerVariants}
            >
                <motion.div className="education-item" variants={itemVariants}>
                    <h3 className="project-title">ACS College Of Engineering (2022-2026)</h3>
                    <p>B.Tech in Computer Science and Engineering <br />
                        GPA: 9.17</p>
                </motion.div>
                <motion.div className="education-item" variants={itemVariants}>
                    <h3 className="project-title">Jawahar Navodaya Vidyalaya (2021-2022)</h3>
                    <p>+1 & +2 Courses <br />
                        Percentage: 83%</p>
                </motion.div>
                <motion.div className="education-item" variants={itemVariants}>
                    <h3 className="project-title">Adarsha Vidyalaya (2015-2020)</h3>
                    <p>SSLC <br />
                        Percentage: 92%</p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default Education;