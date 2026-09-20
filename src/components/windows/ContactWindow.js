import React from 'react';
import '../../styles/windows/ContactWindow.css';

export default function ContactWindow() {
  return (
    <div className="contact-win-desktop">
      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-icon">📩</div>
          <h3>Got Mail?</h3>
          <p className="contact-email">deepithdeekshith@gmail.com</p>
          <a
            href="mailto:deepithdeekshith@gmail.com"
            className="contact-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email Me
          </a>
        </div>

        <div className="contact-card">
          <div className="contact-icon">💻</div>
          <h3>For Collaborations</h3>
          <p className="contact-sub">Let's build something awesome together.</p>
          <a
            href="https://github.com/deepith-18"
            className="contact-btn github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
