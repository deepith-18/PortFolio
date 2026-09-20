import React from 'react';
import { projects } from '../data/projects';

export default function ProjectPanel({ activeZone, onClose }) {
  if (!activeZone || !projects[activeZone]) return null;

  const project = projects[activeZone];

  return (
    <div className="project-panel-overlay">
      <div className="project-panel">
        <button className="project-panel-close" onClick={onClose}>
          ✕
        </button>
        <div className="project-panel-content">
          <h2 className="project-title">{project.title}</h2>
          <h3 className="project-tagline">{project.tagline}</h3>
          
          <p className="project-description">{project.description}</p>
          
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>

          <div className="project-links">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link">
                GitHub
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link primary">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
