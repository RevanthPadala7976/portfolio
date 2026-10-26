import React, { useState, useEffect, useRef } from 'react';
import './SkillsSection.css';

const SKILLS_DATA = [
  // Interface
  { name: 'JavaScript', layer: 'Interface', core: false, contexts: ['Projects'] },
  { name: 'HTML/CSS', layer: 'Interface', core: false, contexts: ['Projects'] },
  { name: 'React', layer: 'Interface', core: false, contexts: ['Saayam For All', 'Cecil Labs', 'Projects'] },

  // API
  { name: 'Spring Boot', layer: 'API', core: true, contexts: ['Saayam For All', 'Cognizant', 'Projects'] },
  { name: 'FastAPI', layer: 'API', core: true, contexts: ['Projects'] },
  { name: 'Flask', layer: 'API', core: false, contexts: ['Cecil Labs'] },
  { name: 'REST APIs', layer: 'API', core: false, contexts: ['Saayam For All', 'Cecil Labs', 'Cognizant'] },
  { name: 'Spring Security', layer: 'API', core: false, contexts: ['Cognizant', 'Projects'] },
  { name: 'JWT', layer: 'API', core: false, contexts: ['Cecil Labs', 'Cognizant', 'Projects'] },

  // Services
  { name: 'Java', layer: 'Services', core: true, contexts: ['Saayam For All', 'Cognizant'] },
  { name: 'Python', layer: 'Services', core: true, contexts: ['Saayam For All', 'Cecil Labs', 'Projects'] },
  { name: 'Microservices', layer: 'Services', core: false, contexts: ['Saayam For All', 'Cognizant'] },
  { name: 'Kafka', layer: 'Services', core: false, contexts: ['Projects'] },
  { name: 'Design patterns', layer: 'Services', core: false, contexts: ['Cognizant', 'Projects'] },
  { name: 'OOP', layer: 'Services', core: false, contexts: ['Cognizant', 'Projects'] },
  { name: 'System design', layer: 'Services', core: false, contexts: ['Cecil Labs', 'Projects'] },
  { name: 'Data structures and algorithms', layer: 'Services', core: false, contexts: ['Projects'] },

  // AI infrastructure
  { name: 'LangGraph', layer: 'AI infrastructure', core: true, contexts: ['Projects'] },
  { name: 'RAG', layer: 'AI infrastructure', core: true, contexts: ['Saayam For All', 'Projects'] },
  { name: 'Pinecone', layer: 'AI infrastructure', core: false, contexts: ['Projects'] },
  { name: 'Hybrid search', layer: 'AI infrastructure', core: false, contexts: ['Saayam For All', 'Cecil Labs', 'Projects'] },
  { name: 'LangChain', layer: 'AI infrastructure', core: false, contexts: ['Projects'] },
  { name: 'LLM cascade routing', layer: 'AI infrastructure', core: false, contexts: ['Saayam For All', 'Projects'] },
  { name: 'Langfuse observability', layer: 'AI infrastructure', core: false, contexts: ['Projects'] },
  { name: 'KMeans clustering', layer: 'AI infrastructure', core: false, contexts: ['Projects'] },
  { name: 'Cosine similarity ranking', layer: 'AI infrastructure', core: false, contexts: ['Cecil Labs'] },
  { name: 'DistilBERT', layer: 'AI infrastructure', core: false, contexts: ['Projects'] },

  // Data
  { name: 'PostgreSQL', layer: 'Data', core: true, contexts: ['Saayam For All', 'Projects'] },
  { name: 'Redis', layer: 'Data', core: true, contexts: ['Cecil Labs', 'Projects'] },
  { name: 'MySQL', layer: 'Data', core: false, contexts: ['Cognizant'] },
  { name: 'CosmosDB', layer: 'Data', core: false, contexts: ['Cecil Labs'] },
  { name: 'MongoDB', layer: 'Data', core: false, contexts: ['Projects'] },
  { name: 'DynamoDB', layer: 'Data', core: false, contexts: ['Projects'] },
  { name: 'Hibernate', layer: 'Data', core: false, contexts: ['Cognizant'] },
  { name: 'Spring Data JPA', layer: 'Data', core: false, contexts: ['Cognizant'] },
  { name: 'SQL', layer: 'Data', core: false, contexts: ['Saayam For All', 'Cecil Labs', 'Cognizant', 'Projects'] },

  // Platform
  { name: 'Docker', layer: 'Platform', core: true, contexts: ['Saayam For All', 'Cognizant', 'Projects'] },
  { name: 'AWS (EC2, S3, Lambda, RDS, API Gateway, Transcribe)', layer: 'Platform', core: true, contexts: ['Saayam For All', 'Cognizant'] },
  { name: 'Kubernetes', layer: 'Platform', core: false, contexts: ['Projects'] },
  { name: 'Terraform', layer: 'Platform', core: false, contexts: ['Saayam For All', 'Cecil Labs'] },
  { name: 'Azure', layer: 'Platform', core: false, contexts: ['Cecil Labs'] },
  { name: 'GitHub Actions', layer: 'Platform', core: false, contexts: ['Cecil Labs', 'Projects'] },
  { name: 'Jenkins', layer: 'Platform', core: false, contexts: ['Cognizant'] },
  { name: 'CI/CD', layer: 'Platform', core: false, contexts: ['Cecil Labs', 'Cognizant', 'Projects'] },
  { name: 'Git', layer: 'Platform', core: false, contexts: ['Saayam For All', 'Cecil Labs', 'Cognizant', 'Projects'] },
  { name: 'JUnit', layer: 'Platform', core: false, contexts: ['Cognizant'] },
  { name: 'Mockito', layer: 'Platform', core: false, contexts: ['Cognizant'] },

  // Tools and workflow
  { name: 'Claude', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'Cursor', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'GitHub Copilot', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'AI-assisted code review', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'Agentic workflows', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'Jupyter', layer: 'Tools and workflow', core: false, contexts: ['Cecil Labs', 'Projects'] },
  { name: 'Streamlit', layer: 'Tools and workflow', core: false, contexts: ['Projects'] },
  { name: 'IntelliJ', layer: 'Tools and workflow', core: false, contexts: ['Saayam For All', 'Cognizant'] },
  { name: 'VS Code', layer: 'Tools and workflow', core: false, contexts: ['Cecil Labs', 'Projects'] },
  { name: 'Agile', layer: 'Tools and workflow', core: false, contexts: ['Cognizant', 'Projects'] }
];

const ARCHITECTURE_LAYERS = ['Interface', 'API', 'Services', 'AI infrastructure', 'Data', 'Platform'];
const WORKFLOW_LAYER = 'Tools and workflow';
const FILTER_CONTEXTS = ['Saayam For All', 'Cecil Labs', 'Cognizant', 'Projects'];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState(null);
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const bandRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !dotRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const validBands = bandRefs.current.filter(Boolean);
        
        const keyframes = validBands.reduce((acc, band) => {
          const bandRect = band.getBoundingClientRect();
          const yCenter = (bandRect.top - containerTop) + (bandRect.height / 2);
          acc.push({ transform: `translateY(${yCenter}px)` });
          return acc;
        }, [{ transform: `translateY(0px)` }]);

        dotRef.current.animate(keyframes, {
          duration: 2000,
          easing: 'ease-in-out',
          fill: 'forwards'
        });
      }
    }, { threshold: 0.4 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFilter = (context) => {
    setActiveFilter(prev => prev === context ? null : context);
  };

  const renderBand = (layer, index, isWorkflow = false) => {
    const items = SKILLS_DATA.filter(skill => skill.layer === layer);
    if (!items.length) return null;

    return (
      <section 
        key={layer}
        ref={el => bandRefs.current[index] = el}
        className={`skills-band ${isWorkflow ? 'skills-band-workflow' : 'skills-band-standard'}`}
      >
        <h3 className="skills-layer-title">
          {layer}
        </h3>
        <ul className="skills-chip-list">
          {items.map((skill) => {
            const isDimmed = activeFilter && !skill.contexts.includes(activeFilter);
            return (
              <li 
                key={skill.name}
                className={`skills-chip ${skill.core ? 'skills-chip-core' : 'skills-chip-regular'} ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              >
                {skill.name}
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="skills-heading">
            Skills
          </h2>
          <p className="skills-subtitle">
            Where each thing sits in a system I'd build.
          </p>
        </div>

        {/* Optional Filter Rail */}
        <div className="skills-filter-rail" role="group" aria-label="Filter skills by context">
          {FILTER_CONTEXTS.map(context => (
            <button
              key={context}
              onClick={() => toggleFilter(context)}
              className={`skills-filter-btn ${activeFilter === context ? 'skills-filter-btn-active' : 'skills-filter-btn-inactive'}`}
            >
              {context}
            </button>
          ))}
        </div>

        {/* The Stack */}
        <div className="skills-stack-wrapper" ref={containerRef}>
          
          {/* The Descending Dot Gutter (Desktop Only) */}
          <div className="skills-gutter" aria-hidden="true">
            <div 
              ref={dotRef}
              className="skills-gutter-dot"
            />
          </div>

          {/* Stack Layers */}
          <div className="flex flex-col gap-3">
            {ARCHITECTURE_LAYERS.map((layer, index) => renderBand(layer, index))}
            
            <div className="mt-6">
              {renderBand(WORKFLOW_LAYER, ARCHITECTURE_LAYERS.length, true)}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
