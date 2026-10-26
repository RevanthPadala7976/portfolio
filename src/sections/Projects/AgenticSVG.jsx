import React from 'react';

export const AgenticSVG = () => {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <svg
        role="img"
        aria-label="Agentic issue triage architecture diagram"
        viewBox="0 0 680 560"
        className="w-full h-full max-h-[460px] object-contain diagram-svg"
      >
        <defs>
          <marker
            id="agentic-arrow"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1.5L8 5L2 8.5"
              fill="none"
              stroke="var(--accent-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Solid Connector Arrows */}
        <g stroke="var(--accent-secondary)" strokeWidth="1.5" fill="none">
          {/* 01 -> 02 */}
          <line x1="340" y1="76" x2="340" y2="108" markerEnd="url(#agentic-arrow)" />
          {/* 02 -> 03 Left & Right */}
          <path d="M280 170 L215 204" markerEnd="url(#agentic-arrow)" />
          <path d="M400 170 L465 204" markerEnd="url(#agentic-arrow)" />
          {/* 03 Retrieval -> 03 Gate */}
          <path d="M215 266 L290 300" markerEnd="url(#agentic-arrow)" />
          <path d="M465 266 L390 300" markerEnd="url(#agentic-arrow)" />
          {/* 03 -> 04 */}
          <line x1="340" y1="360" x2="340" y2="392" markerEnd="url(#agentic-arrow)" />
          {/* 04 -> 05 */}
          <line x1="340" y1="456" x2="340" y2="488" markerEnd="url(#agentic-arrow)" />
        </g>

        {/* NODE 01: Issue Ingest */}
        <g className="diagram-node" data-stage="01">
          <rect
            x="190"
            y="22"
            width="300"
            height="54"
            rx="8"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.25"
          />
          <text x="340" y="43" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="600">
            01 &middot; GitHub Issue Ingest
          </text>
          <text x="340" y="61" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Webhook payload &middot; 1,359 LangChain issues indexed
          </text>
        </g>

        {/* NODE 02: Routing */}
        <g className="diagram-node" data-stage="02">
          <rect
            x="160"
            y="112"
            width="360"
            height="58"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="340" y="135" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="600">
            02 &middot; LLM Cascade Router &amp; Classifier
          </text>
          <text x="340" y="154" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Routes easy classification to fast/cheap models (&lt;$0.01/issue)
          </text>
        </g>

        {/* NODE 03A: Dense Vector Search */}
        <g className="diagram-node" data-stage="03">
          <rect
            x="90"
            y="208"
            width="235"
            height="58"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="207" y="231" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            03a &middot; Dense Vector Search
          </text>
          <text x="207" y="250" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Semantic similarity on Pinecone
          </text>
        </g>

        {/* NODE 03B: BM25 Lexical Search */}
        <g className="diagram-node" data-stage="03">
          <rect
            x="355"
            y="208"
            width="235"
            height="58"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="472" y="231" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            03b &middot; BM25 Lexical Search
          </text>
          <text x="472" y="250" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Exact stack traces &amp; error strings
          </text>
        </g>

        {/* NODE 03C: Duplicate Filter Gate */}
        <g className="diagram-node" data-stage="03">
          <rect
            x="175"
            y="304"
            width="330"
            height="56"
            rx="8"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.25"
          />
          <text x="340" y="326" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="600">
            03 &middot; Duplicate Filter Gate (92% Recall)
          </text>
          <text x="340" y="345" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Filters repeat reports before expensive agent runs
          </text>
        </g>

        {/* NODE 04: Workflow + Observability */}
        <g className="diagram-node" data-stage="04">
          <rect
            x="130"
            y="396"
            width="420"
            height="60"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="340" y="419" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="600">
            04 &middot; LangGraph Multi-Agent Workflow
          </text>
          <text x="340" y="439" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Localizes files &middot; Suggests assignee &middot; Drafts response
          </text>
        </g>

        {/* NODE 05: Maintainer Checkpoint & Langfuse Trace (Emphasised Focal Node) */}
        <g className="diagram-node" data-stage="05">
          <rect
            x="155"
            y="492"
            width="370"
            height="54"
            rx="8"
            fill="var(--accent-soft)"
            stroke="var(--accent)"
            strokeWidth="1.75"
          />
          <text x="340" y="514" textAnchor="middle" fill="var(--accent)" fontSize="14" fontWeight="700">
            05 &middot; Maintainer Checkpoint &amp; Langfuse Trace
          </text>
          <text x="340" y="532" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="500">
            Human approval gate &middot; Cost &amp; retrieval traced per issue
          </text>
        </g>
      </svg>
    </div>
  );
};
