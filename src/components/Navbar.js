// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', to: 'about-hero' },
        { label: 'Skills', to: 'skills' },
        { label: 'Projects', to: 'projects' },
        { label: 'Education', to: 'education' },
        { label: 'Certifications', to: 'certifications' },
        { label: 'Contact', to: 'contact' },
    ];

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className="container">
                <div className="logo-container">
                    <a href="/" className="logo">Deepith N</a>
                </div>
                <div className="desktop-nav-links">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            smooth={true}
                            duration={600}
                            offset={-80}
                            spy={true}
                            activeClass="active"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <button
                    className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>
            </div>

            {/* Mobile overlay */}
            <div className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        smooth={true}
                        duration={600}
                        offset={-80}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;