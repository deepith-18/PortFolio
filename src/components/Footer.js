import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="container">
        <div className="social-links">
          <a href="https://github.com/deepith-18" target="_blank" rel="noopener noreferrer" data-cursor-tooltip="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/deepithn1718/" target="_blank" rel="noopener noreferrer" data-cursor-tooltip="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://x.com/DeepithD19" target="_blank" rel="noopener noreferrer" data-cursor-tooltip="Twitter/X">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/deepithn/" target="_blank" rel="noopener noreferrer" data-cursor-tooltip="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <p>By Deepith N | © 2025 All Rights are Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;