import React, { useState } from 'react';
import { Link } from 'react-scroll';
function Header({ theme, setTheme }) {
    // State to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to close the menu, useful for when a link is clicked
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <nav>
                <div className="container">
                    <div className="logo-container">
                        <img src="/profile.jpg" alt="Profile" className="profile-pic" />
                    </div>

                    {/* The class 'open' will be added conditionally */}
                    <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        {/* Each link now closes the menu on click */}
                        <Link to="hero" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>About Me</Link>
                        <Link to="projects" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>Projects</Link>
                        <Link to="education" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>Academic Journey</Link>
                        <Link to="skills" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>Skills</Link>
                        <Link to="certifications" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>Certifications</Link>
                        <Link to="contact" smooth={true} duration={500} activeClass="active" spy={true} offset={-70} onClick={closeMenu}>Contact Me</Link>
                    </div>

                    {/* Hamburger Menu Toggle Button */}
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
            </nav>
        </header>
    );
}

export default Header;