import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import './HomeSection.css';

const RECENT_WORK = [
  {
    id: 'saayam',
    company: 'Saayam For All',
    platform: 'AI intake and retrieval gateway',
    description: 'PII stripping and structured LLM triage at 97.2% urgent-case recall, over a hybrid retrieval service with isolation enforced in Postgres rather than application code.'
  },
  {
    id: 'cecil',
    company: 'Cecil Labs',
    platform: 'Athlete-brand matching platform',
    description: 'Two-sided ranking over a three-stage retrieval pipeline, with p95 cut from 820ms to 340ms at 200 RPS.'
  },
  {
    id: 'cognizant',
    company: 'Cognizant',
    platform: 'Enterprise timekeeping platform',
    description: 'Spring Boot microservices processing 2.5M+ transactions a month at 99.95% uptime, serving 10,000+ users globally.'
  }
];

export default function HomeSection() {
  const [hideScrollCue, setHideScrollCue] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHideScrollCue(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className="home-grid">
          
          {/* Left Column: Profile Photo + Name, Headline, Stack line, Socials + Button */}
          <div className="home-left-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Photo + Name Side-by-Side */}
              <div className="home-identity">
                <div className="home-avatar-wrapper">
                  <img 
                    src="/images/profile-photo.jpg" 
                    alt="Revanth Padala" 
                    className="home-avatar-img"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="home-name">
                    Revanth Padala
                  </div>
                  <p className="home-role">
                    SOFTWARE ENGINEER, BACKEND AND AI SYSTEMS
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="home-headline">
                I build systems that keep AI products running in production.
              </h1>

              {/* Stack line */}
              <p className="home-stack-line">
                Java · Spring Boot · Python · FastAPI · Kafka · AWS · Azure
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="home-actions"
            >
              {/* Social Links Row */}
              <div className="home-socials">
                <a
                  href="https://www.linkedin.com/in/revanth-padala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="home-social-pill"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
                    <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/>
                  </svg>
                  <span className="text-[14px] font-semibold">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/RevanthPadala7976"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="home-social-pill"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
                    <path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"/>
                  </svg>
                  <span className="text-[14px] font-semibold">GitHub</span>
                </a>

                <a
                  href="mailto:padala.r@northeastern.edu"
                  aria-label="Email"
                  className="home-social-pill"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
                    <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
                  </svg>
                  <span className="text-[14px] font-semibold">Email</span>
                </a>
              </div>

              {/* Primary CTA */}
              <Link 
                to="experience"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="home-cta-btn"
              >
                View my experience
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Currently line, Intro paragraph, Recent work rows */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="home-right-col"
          >
            <p className="home-currently">
              Currently building a PII-safe intake pipeline and a permission-aware retrieval service for a community relief platform.
            </p>

            <p className="home-intro">
              Three years building production software. Java and Spring Boot microservices at enterprise scale, then Python and Flask at an early-stage startup where I owned a platform end to end: schema design, APIs, infrastructure, deployment. Lately the work has been AI infrastructure: retrieval, agent orchestration, and enforcing data boundaries where they actually hold.
            </p>

            <div className="w-full">
              <div className="home-recent-label">
                RECENT WORK
              </div>

              <div className="home-recent-list">
                {RECENT_WORK.map((work) => (
                  <Link
                    key={work.id}
                    to={work.id}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="group home-work-row"
                  >
                    <div className="pr-4">
                      <div className="home-work-title">
                        <span>{work.company}</span>
                        <span className="home-work-sep">·</span>
                        <span className="home-work-platform">{work.platform}</span>
                      </div>
                      <p className="home-work-desc">
                        {work.description}
                      </p>
                    </div>
                    <ArrowRight className="home-work-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator (Always fully visible in laptop/desktop viewport, centered) */}
      <button
        type="button"
        onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className={`home-scroll-btn ${
          hideScrollCue ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <span className="home-scroll-label">
          SCROLL
        </span>
        <span className="home-scroll-capsule">
          <span className="scroll-dot" />
        </span>
      </button>
    </section>
  );
}
