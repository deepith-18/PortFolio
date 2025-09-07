import React from 'react';

function AdditionalInfo() {
  return (
    <section id="additional" className="container">
      <h2 className="section-heading"><span className="gradient-text">Profile Details, Interests, and Hobbies</span></h2>
      <div className="projects-grid">
        <div className="project-card">
          <h3 className="project-title">Languages</h3>
          <ul className="project-details">
            <li>English</li>
            <li>Hindi</li>
            <li>Kannada</li>
          </ul>
        </div>
        <div className="project-card">
          <h3 className="project-title">Interests</h3>
          <ul className="project-details">
            <li>Data Engineering</li>
            <li>Competitive Programming & DSA</li>
            <li>Cloud Computing</li>
            <li>Blockchain </li>
          </ul>
        </div>
        <div className="project-card">
          <h3 className="project-title">Hobbies</h3>
          <ul className="project-details">
            <li> Building Side Projects</li>
            <li>Coding Challenges</li>
            <li>Playing Strategy Games</li>
            <li> Teaching & Mentoring</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AdditionalInfo;
