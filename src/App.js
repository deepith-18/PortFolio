import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import AdditionalInfo from './components/AdditionalInfo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Background from './components/Background';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <Background />
      <Cursor />
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Education />
      <Projects />
      <Skills />
      <Certifications />
      <AdditionalInfo />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;




