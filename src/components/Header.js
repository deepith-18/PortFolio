import React, { useState } from 'react';
import { Link } from 'react-scroll';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header>
            <nav>
                <div className="container">
                    <div className="logo-container">
                        <span className="logo">Deepith N</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav-links">
                        <Link to="hero" smooth={true} duration={500} offset={-70}>About Me</Link>
                        <Link to="projects" smooth={true} duration={500} offset={-70}>Projects</Link>
                        <Link to="education" smooth={true} duration={500} offset={-70}>Academic Journey</Link>
                        <Link to="skills" smooth={true} duration={500} offset={-70}>Skills</Link>
                        <Link to="certifications" smooth={true} duration={500} offset={-70}>Certifications</Link>
                        <Link to="contact" smooth={true} duration={500} offset={-70}>Contact Me</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="hero" smooth={true} duration={500} onClick={closeMenu}>About Me</Link>
                    <Link to="projects" smooth={true} duration={500} onClick={closeMenu}>Projects</Link>
                    <Link to="education" smooth={true} duration={500} onClick={closeMenu}>Academic Journey</Link>
                    <Link to="skills" smooth={true} duration={500} onClick={closeMenu}>Skills</Link>
                    <Link to="certifications" smooth={true} duration={500} onClick={closeMenu}>Certifications</Link>
                    <Link to="contact" smooth={true} duration={500} onClick={closeMenu}>Contact Me</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;