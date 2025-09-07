import React from 'react';

function Certifications() {
  return (
    <section id="certifications" className="container">
      <h2 className="section-heading"><span className="gradient-text">Expertise Validation</span></h2>
      <div className="certification-badges">
        <div className="badge">
          <i className="fab fa-napster"></i>
          NPTEL Programming in Java
        </div>
        <div className="badge">
          <i className="fab fa-napster"></i>
          NPTEL Programming in Python
        </div>
        <div className="badge">
          <i className="fas fa-brain"></i>
          LinkedIn Learning: Microsoft Careers Essential in Generative AI
        </div>
        <div className="badge">
          <i className="fas fa-coffee"></i>
          Coursera Core Java
        </div>
        <div className="badge">
          <i className="fas fa-database"></i>
          Infosys Springboard DBMS
        </div>
      </div>
    </section>
  );
}

export default Certifications;