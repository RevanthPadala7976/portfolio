import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ExperienceSection.css';

const EXPERIENCES = [
  {
    id: "saayam",
    dates: "Mar 2026 - Present",
    start: [2026, 2], // Mar = 2 (0-indexed month)
    end: 'Present',
    title: "Software Engineer, AI Systems",
    company: "Saayam For All",
    location: "Boston, MA",
    logo: null,
    metricValue: "97.2%",
    metricLabel: "urgent-case recall",
    summary: "A community relief platform coordinating emergency food, medical, and housing assistance. Requests were bottlenecked on manual triage, and beneficiary data was reaching systems that had no business seeing it.",
    bullets: [
      "Built an intake gateway that strips PII with Microsoft Presidio and custom rules before requests reach downstream systems, then runs structured LLM triage with deterministic fallback routing, reaching 97.2% recall on urgent cases.",
      "Exposed state assistance policies and historical case precedents through a hybrid retrieval service on PostgreSQL and pgvector, pairing HNSW dense search with full-text search and iterative index scans, served over a Model Context Protocol server.",
      "Enforced beneficiary data isolation with row-level security at the database layer instead of application filters, with a React console that switches roles live to demonstrate ACL enforcement.",
      "Deployed on AWS EC2 with Terraform and Docker Compose."
    ],
    tags: ["Python", "PostgreSQL", "pgvector", "Presidio", "MCP", "Terraform", "Docker", "AWS EC2", "React", "TypeScript"]
  },
  {
    id: "cecil",
    dates: "Jan 2025 - Aug 2025",
    start: [2025, 0],
    end: [2025, 7],
    title: "Backend Engineer, ML Platform",
    company: "Cecil Labs",
    location: "Cambridge, MA",
    logo: "/images/cecil-logo.png",
    metricValue: "820ms → 340ms",
    metricLabel: "p95 at 200 RPS",
    summary: "A two-sided marketplace matching athletes with brands, where a ranking is only useful if both sides want the match.",
    bullets: [
      "Architected the two-sided matching service in Flask on Azure App Service and integrated it with the React frontend, scoring athlete and brand pairs in both directions and combining them with a harmonic mean to reduce one-sided affinity bias.",
      "Designed a three-stage retrieval pipeline on Cosmos DB using attribute filters, DiskANN vector search, and weighted re-ranking, reaching 0.87 Recall@10 against exact kNN over 25k synthetic profiles and cutting retrieval time from 580ms to 240ms.",
      "Traced 60% of p95 latency to repeated embedding reads using per-stage timing in Application Insights, then moved those reads to Redis with background queues, cutting p95 from 820ms to 340ms at 200 RPS and Cosmos DB RU/s by 45%.",
      "Secured 28 Flask endpoints with JWT authentication, refresh-token rotation, and role-based access control, verified by 60+ pytest integration tests.",
      "Wrote GitHub Actions pipelines that block deploys failing API contract tests or dropping Recall@10 below 0.82, releasing with zero downtime via App Service staging slot swaps."
    ],
    tags: ["Python", "Flask", "React", "Azure App Service", "Cosmos DB", "DiskANN", "Redis", "Application Insights", "GitHub Actions", "pytest"]
  },
  {
    id: "cognizant",
    dates: "Feb 2021 - Jul 2023",
    start: [2021, 1],
    end: [2023, 6],
    title: "Software Engineer",
    company: "Cognizant",
    location: "Chennai, India",
    logo: "/images/cognizant-logo.webp",
    metricValue: "2.5M+",
    metricLabel: "monthly transactions",
    summary: "An enterprise timekeeping platform serving 10,000+ users globally, where a bad release had a payroll consequence.",
    bullets: [
      "Engineered RESTful microservices with Spring Boot, Spring Data JPA, and Hibernate, sustaining 99.95% uptime at 2.5M+ monthly transactions.",
      "Implemented stateless role-based access control with Spring Security and JWT, removing server-side session bottlenecks and cutting authorization latency by 40%. ",
      "Automated containerized deployments with Docker and Jenkins to AWS, cutting deployment turnaround from four hours to fifteen minutes.",
      "Built unit and integration test suites with JUnit and Mockito, taking service-layer coverage to 88%."
    ],
    tags: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "Spring Security", "Docker", "Jenkins", "AWS", "JUnit", "Mockito"]
  }
];

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export default function ExperienceSection() {
  const [activeRoleId, setActiveRoleId] = useState(null);

  const currentDate = new Date();
  const totalMonths = (currentDate.getFullYear() - 2021) * 12 + currentDate.getMonth();

  const getTimelineStyle = (startArr, endArr) => {
    const startMonths = (startArr[0] - 2021) * 12 + startArr[1];
    const endMonths = endArr === 'Present' 
      ? totalMonths 
      : (endArr[0] - 2021) * 12 + endArr[1];
    
    return {
      left: `${(startMonths / totalMonths) * 100}%`,
      width: `${((endMonths - startMonths) / totalMonths) * 100}%`
    };
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="experience-heading">
            Experience
          </h2>
        </div>

        {/* Timeline Rail (Desktop Only) */}
        <div 
          className="experience-timeline"
          role="img" 
          aria-label="Timeline showing chronological sequence of roles from 2021 to present, with a concurrent Master's degree overlapping recent experience."
        >
          {/* Lanes Container */}
          <div className="relative h-[68px]">
            {/* Lane 1: Roles (Top: 0) */}
            {EXPERIENCES.map(exp => (
              <button 
                key={exp.id}
                onClick={() => document.getElementById(exp.id)?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={() => setActiveRoleId(exp.id)}
                onMouseLeave={() => setActiveRoleId(null)}
                onFocus={() => setActiveRoleId(exp.id)}
                onBlur={() => setActiveRoleId(null)}
                className={`experience-role-bar ${activeRoleId === null || activeRoleId === exp.id ? 'opacity-100' : 'opacity-40'}`}
                style={getTimelineStyle(exp.start, exp.end)}
                aria-label={`Jump to ${exp.title} at ${exp.company}, ${exp.dates}`}
              >
                <div className="experience-role-bar-label">
                  {exp.company}
                </div>
              </button>
            ))}

            {/* Lane 2: Degree (Top: 40px) */}
            <div 
              className="experience-degree-bar"
              style={getTimelineStyle([2023, 8], [2025, 11])}
            >
              <div className="experience-degree-bar-label">
                MS Information Systems
              </div>
            </div>
          </div>

          {/* Axis */}
          <div className="experience-axis">
            {YEARS.map(year => {
              const leftPct = ((year - 2021) * 12 / totalMonths) * 100;
              if (leftPct > 100) return null;
              return (
                <div key={year} className="absolute top-0" style={{ left: `${leftPct}%` }}>
                  <div className="experience-axis-tick" />
                  <div className="experience-axis-year">
                    {year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience Blocks */}
        <div className="flex flex-col">
          {EXPERIENCES.map((exp, index) => (
            <React.Fragment key={exp.id}>
              {index !== 0 && (
                <hr className="experience-divider" />
              )}

              <motion.div 
                id={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setActiveRoleId(exp.id)}
                onMouseLeave={() => setActiveRoleId(null)}
                className={`experience-entry ${activeRoleId === null || activeRoleId === exp.id ? 'opacity-100' : 'opacity-40'}`}
              >
                {/* Dates Rail */}
                <div className="experience-dates">
                  {exp.dates}
                </div>

                {/* Content Block */}
                <div className="space-y-5">
                  {/* Header with Logo */}
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <div className="experience-logo-wrapper">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="experience-role-title">
                        {exp.title}
                      </h3>
                      <p className="experience-company-line">
                        {exp.company} <span className="font-normal text-gray-500">· {exp.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Metric Highlight */}
                  <div className="experience-metric-row">
                    <span className="experience-metric-value">
                      {exp.metricValue}
                    </span>
                    <span className="experience-metric-label">
                      {exp.metricLabel}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="experience-summary">
                    {exp.summary}
                  </p>

                  {/* Bullets */}
                  <ul className="experience-bullets">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Stack Tags */}
                  <div className="experience-tags">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="experience-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
