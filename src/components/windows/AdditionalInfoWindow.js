import React from 'react';
import { FaLanguage, FaLightbulb, FaGamepad, FaCertificate } from 'react-icons/fa';
import '../../styles/windows/AdditionalInfoWindow.css';

export default function AdditionalInfoWindow() {
  return (
    <div className="addinfo-win">
      <div className="addinfo-grid">
        <div className="addinfo-card">
          <div className="card-header">
            <FaLanguage size={24} color="#64ffda" />
            <h3>Languages</h3>
          </div>
          <ul className="card-list">
            <li>English</li>
            <li>Hindi</li>
            <li>Kannada</li>
          </ul>
        </div>

        <div className="addinfo-card">
          <div className="card-header">
            <FaLightbulb size={24} color="#e6f1ff" />
            <h3>Areas of Interest</h3>
          </div>
          <ul className="card-list">
            <li>Artificial Intelligence (AI) & ML</li>
            <li>Software Development</li>
            <li>System Architecture</li>
            <li>Data Structures & Algorithms (DSA)</li>
            <li>Data Engineering & Preprocessing</li>
            <li>Cloud Computing</li>
            <li>AWS</li>
            <li>Blockchain</li>
          </ul>
        </div>

        <div className="addinfo-card">
          <div className="card-header">
            <FaCertificate size={24} color="#ffdb4d" />
            <h3>Certifications & Awards</h3>
          </div>
          <ul className="card-list">
            <li>Participant, Google Hackathon</li>
            <li>Career Essentials in Generative AI (LinkedIn)</li>
            <li>Core Java (Coursera)</li>
            <li>Computer Networks (NPTEL)</li>
            <li>Artificial Intelligence (NPTEL)</li>
            <li>Database Management (Infosys Springboard)</li>
          </ul>
        </div>

        <div className="addinfo-card">
          <div className="card-header">
            <FaGamepad size={24} color="#ff7139" />
            <h3>Hobbies</h3>
          </div>
          <ul className="card-list">
            <li>Building Projects</li>
            <li>Coding Challenges</li>
            <li>Playing Strategy Games</li>
            <li>Teaching & Mentoring</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
