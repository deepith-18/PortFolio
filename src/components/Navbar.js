// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-scroll'; // Import react-scroll

function Navbar() {
    return (
        <nav>
            <div className="container">
                <a href="/" className="logo">Deekshith N</a> {/* Use regular anchor for the logo */}
                <div className="nav-links">
                    <Link to="Education" smooth={true} duration={500}>Education</Link>
                    <Link to="Projects" smooth={true} duration={500}>Projects</Link>
                    <Link to="Skills" smooth={true} duration={500}>Skills</Link>
                    <Link to="Certifications" smooth={true} duration={500}>Certifications</Link>
                    <Link to="Contact me" smooth={true} duration={500}>Contact me</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;