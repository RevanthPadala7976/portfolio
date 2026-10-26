import React, { useState, useEffect } from 'react';
import Navbar from './sections/Navbar/Navbar';
import HomeSection from './sections/Home/HomeSection';
import EducationSection from './sections/Education/EducationSection';
import ExperienceSection from './sections/Experience/ExperienceSection';
import SkillsSection from './sections/Skills/SkillsSection';
import ProjectsSection from './sections/Projects/ProjectsSection';
import ContactSection from './sections/Contact/ContactSection';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <HomeSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}

export default App;
