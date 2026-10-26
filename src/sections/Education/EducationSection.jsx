import React from 'react';
import './EducationSection.css';

export default function EducationSection() {
  return (
    <section id="education" className="education-section">
      <div className="education-container">
        
        {/* Section Heading */}
        <h2 className="education-heading">
          Education
        </h2>

        {/* Line 1: Header Row */}
        <div className="education-header-row">
          <div className="education-seal-wrapper">
            <img 
              src="/images/NortheasternSeal.svg" 
              alt="Northeastern University" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="education-degree">
              Master of Science in Information Systems
            </h3>
            <p className="education-school">
              Northeastern University · Boston, MA · September 2023 to December 2025
            </p>
          </div>
        </div>

        {/* Line 2: Coursework */}
        <p className="education-coursework">
          <span className="education-coursework-label">Coursework:</span> Application Engineering and Development, Database Management and Design, Program Structures and Algorithms, Design Patterns, Neural Networks and Deep Learning, Natural Language Processing, Data Science Engineering Methods and Tools, High Performance Parallel Machine Learning.
        </p>

      </div>
    </section>
  );
}
