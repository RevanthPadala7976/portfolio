import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { AgenticSVG } from './AgenticSVG';
import { PaymentSVG } from './PaymentSVG';
import './ProjectsSection.css';

const GithubButton = ({ url }) => {
  if (!url) return null;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="projects-github-btn"
    >
      <Github className="w-3.5 h-3.5" />
      <span>View on GitHub</span>
      <ArrowUpRight className="projects-github-btn-arrow" />
    </a>
  );
};

const FLAGSHIP_PROJECTS = [
  {
    id: 'agentic-issue-automation',
    number: '01',
    eyebrow: 'PROJECT 01 · AI AGENT PIPELINE',
    title: 'Agentic Issue Automation',
    stack: 'Python · FastAPI · LangGraph · Pinecone · Redis · PostgreSQL',
    githubUrl: 'https://github.com/RevanthPadala7976/Agentic_AI_IssueAutomation',
    lead: "Open-source maintainers spend most of their triage time on work that isn't judgment: spotting duplicates, guessing which files an issue touches, and writing the same clarifying reply for the fifth time. On busy repositories like LangChain this piles up faster than volunteers can handle it, and real bugs get buried under repeat reports.",
    metrics: [
      { value: '92%', label: 'duplicate recall' },
      { value: '<$0.01', label: 'per issue' },
    ],
    stages: [
      {
        num: '02',
        title: 'Routing',
        text: 'A GitHub webhook delivers the issue to an LLM cascade router, which classifies it and sends easy cases to fast, low-cost models while reserving larger ones for ambiguous cases. That keeps the average under a cent per issue.',
      },
      {
        num: '03',
        title: 'Retrieval and deduplication',
        text: 'The issue is matched against 1,359 indexed LangChain issues using hybrid retrieval. Dense vector search on Pinecone captures semantic similarity; BM25 catches the exact stack traces and error strings that embeddings tend to miss. A duplicate filter gate at 92% recall stops repeat reports before anything expensive runs.',
      },
      {
        num: '04',
        title: 'Workflow and checkpoint',
        text: 'What passes the gate moves through a stateful LangGraph workflow that localizes the likely files, suggests an assignee from git history, and drafts a response. It then pauses for human approval. Nothing posts to GitHub automatically, because one bad bot comment is usually enough for a maintainer to uninstall a tool.',
      },
      {
        num: '05',
        title: 'Observability',
        text: 'Every run is traced in Langfuse, so a bad output can be traced back to the retrieval step that caused it, with cost and latency tracked per issue.',
      },
    ],
  },
  {
    id: 'distributed-payment-gateway',
    number: '02',
    eyebrow: 'PROJECT 02 · DISTRIBUTED EVENT STREAM',
    title: 'Resilient Distributed Payment Gateway',
    stack: 'Java · Spring Boot · Kafka · PostgreSQL · Redis · Kubernetes',
    githubUrl: 'https://github.com/RevanthPadala7976/payment-gateway',
    lead: 'Payment systems fail in specific ways: the same charge submitted twice, a message lost between services, a downstream processor that degrades instead of going down cleanly. I built this to handle all three rather than the happy path.',
    metrics: [
      { value: '3500+', label: 'TPS' },
      { value: '<1ms', label: 'lock acquisition' },
    ],
    stages: [
      {
        num: '01',
        title: 'Idempotent admission',
        text: 'A request returns 202 immediately so client threads never block on settlement. Before anything is persisted, a Redis lock on the idempotency key acquired in under a millisecond rejects retries, eliminating duplicate charges during the client retry storms that follow a timeout.',
      },
      {
        num: '02',
        title: 'Transactional outbox',
        text: "The payment ledger row and its outbox event are written in the same PostgreSQL transaction, so nothing publishes to the message bus that didn't commit to the ledger.",
      },
      {
        num: '03',
        title: 'Partitioned event stream',
        text: 'Outbox events stream into a partitioned Kafka topic and are consumed by worker groups sustaining 3,500+ transactions per second with zero message loss.',
      },
      {
        num: '04',
        title: 'Circuit breaking and failover',
        text: 'Each downstream call is wrapped in a Resilience4j circuit breaker: when the primary processor starts timing out, traffic shifts to a fallback rather than piling up. Terminal failures land in a dead letter queue instead of disappearing.',
      },
      {
        num: '05',
        title: 'Autoscaling under load',
        text: 'Deployed on Kubernetes with horizontal pod autoscaling and connection pooling, holding sub-50ms P99 transaction latency under load. Failure behaviour is verified with chaos injection against the primary processor rather than assumed.',
      },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16">
          <h2 className="projects-heading">
            Projects
          </h2>
        </div>

        {/* Two Flagship Entries */}
        <div className="projects-flagship-list">
          {FLAGSHIP_PROJECTS.map((proj, idx) => (
            <React.Fragment key={proj.id}>
              {idx > 0 && <hr className="projects-flagship-divider" />}

              <article className="projects-flagship-row">
                {/* Left Column (~55%): Sticky Card */}
                <div className="projects-showcase-card">
                  <div className="projects-card-header">
                    <div className="flex flex-col min-w-0">
                      <span className="projects-card-eyebrow">{proj.eyebrow}</span>
                      <h3 className="projects-flagship-title">{proj.title}</h3>
                      <p className="projects-flagship-stack">{proj.stack}</p>
                    </div>

                    {proj.githubUrl && (
                      <div className="shrink-0">
                        <GithubButton url={proj.githubUrl} />
                      </div>
                    )}
                  </div>

                  <hr className="projects-card-rule" />

                  <div className="projects-diagram-box">
                    {idx === 0 ? <AgenticSVG /> : <PaymentSVG />}
                  </div>

                  <span className="projects-watermark-num" aria-hidden="true">
                    {proj.number}
                  </span>
                </div>

                {/* Right Column (~40%): Stage-Structured Prose */}
                <div className="projects-writeup">
                  <p className="projects-writeup-lead">{proj.lead}</p>

                  <hr className="projects-prose-rule" />

                  <div className="projects-metrics-bar">
                    {proj.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="projects-metric-value">{m.value}</div>
                        <div className="projects-metric-label">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <hr className="projects-prose-rule" />

                  <div className="projects-stages-list">
                    {proj.stages.map((stage) => (
                      <div
                        key={stage.num}
                        className="projects-stage-block"
                        data-stage={stage.num}
                      >
                        <span className="projects-stage-num">{stage.num}</span>
                        <div className="projects-stage-content">
                          <h4 className="projects-stage-title">{stage.title}</h4>
                          <p className="projects-detail-p">{stage.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </React.Fragment>
          ))}
        </div>

        {/* Explorations */}
        <div className="projects-explorations-wrapper">
          <h3 className="projects-explorations-heading">Explorations</h3>
          
          <div className="projects-explorations-grid">
            {/* Card 1 */}
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="projects-card"
            >
              <div className="projects-card-img-wrapper">
                <img src="/images/AutonomousDriving.png" width="1600" height="1000" loading="lazy" alt="Autonomous Driving Perception" className="projects-card-img" />
              </div>
              <div className="projects-card-body">
                <h4 className="projects-card-title">
                  <span>Autonomous Driving Perception</span>
                  <ArrowUpRight className="projects-card-arrow" />
                </h4>
                <p className="projects-card-desc">
                  Object detection over multi-camera driving footage, with front and rear frames annotated by class and confidence.
                </p>
                <div className="projects-card-tags">
                  Python &middot; YOLO &middot; OpenCV
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a 
              href="https://github.com/RevanthPadala7976/Text-to-Image-Generation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="projects-card"
            >
              <div className="projects-card-img-wrapper">
                <img src="/images/text-to-image.png" width="890" height="556" loading="lazy" alt="Text-to-Image Generation" className="projects-card-img" />
              </div>
              <div className="projects-card-body">
                <h4 className="projects-card-title">
                  <span>Text-to-Image Generation</span>
                  <ArrowUpRight className="projects-card-arrow" />
                </h4>
                <p className="projects-card-desc">
                  A diffusion pipeline that turns natural-language prompts into images.
                </p>
                <div className="projects-card-tags">
                  Python &middot; PyTorch &middot; Diffusers
                </div>
              </div>
            </a>

            {/* Card 3 */}
            <a 
              href="https://github.com/RevanthPadala7976/Stock_Price_Analyzer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="projects-card md:col-span-2 xl:col-span-1"
            >
              <div className="projects-card-img-wrapper">
                <img src="/images/stock-analyzer-card.png" width="1600" height="1000" loading="lazy" alt="Stock Price Analyzer" className="projects-card-img" />
              </div>
              <div className="projects-card-body">
                <h4 className="projects-card-title">
                  <span>Stock Price Analyzer</span>
                  <ArrowUpRight className="projects-card-arrow" />
                </h4>
                <p className="projects-card-desc">
                  Ingests financial ticker streams, computes rolling Z-scores, and flags unusual price velocity deviations in real time.
                </p>
                <div className="projects-card-tags">
                  Python &middot; Pandas &middot; WebSockets &middot; SciPy
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
