import React from 'react';

export const PaymentSVG = () => {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <svg
        role="img"
        aria-label="Resilient distributed payment gateway architecture diagram"
        viewBox="0 0 680 560"
        className="w-full h-full max-h-[460px] object-contain diagram-svg"
      >
        <defs>
          <marker
            id="pay-arrow"
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

        {/* Solid Connectors */}
        <g fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5">
          {/* Client -> Ingress */}
          <line x1="215" y1="70" x2="255" y2="70" markerEnd="url(#pay-arrow)" />
          {/* Ingress -> Redis Lock */}
          <line x1="455" y1="70" x2="490" y2="70" markerEnd="url(#pay-arrow)" />
          {/* Ingress -> Postgres Atomic TX */}
          <line x1="355" y1="100" x2="355" y2="136" markerEnd="url(#pay-arrow)" />
          {/* Postgres Outbox -> Kafka Partition Lanes */}
          <line x1="355" y1="218" x2="355" y2="254" markerEnd="url(#pay-arrow)" />
          {/* Kafka -> Circuit Breaker Consumer */}
          <line x1="355" y1="340" x2="355" y2="376" markerEnd="url(#pay-arrow)" />
          {/* Circuit Breaker -> Primary Processor (Left) */}
          <path d="M270 436 L185 468" markerEnd="url(#pay-arrow)" />
          {/* Circuit Breaker -> Fallback + DLQ (Right) */}
          <path d="M440 436 L510 468" markerEnd="url(#pay-arrow)" />
        </g>

        {/* NODE 01A: Client Request */}
        <g className="diagram-node" data-stage="01">
          <rect x="42" y="42" width="173" height="58" rx="8" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.25" />
          <text x="128" y="65" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            01 &middot; Client Request
          </text>
          <text x="128" y="83" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            POST /payments &rarr; 202
          </text>
        </g>

        {/* NODE 01B: Spring Boot Ingress */}
        <g className="diagram-node" data-stage="01">
          <rect
            x="260"
            y="42"
            width="195"
            height="58"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="357" y="65" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            Spring Boot Ingress
          </text>
          <text x="357" y="83" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Async non-blocking admission
          </text>
        </g>

        {/* NODE 01C: Redis Lock (Emphasised Focal Node) */}
        <g className="diagram-node" data-stage="01">
          <rect
            x="495"
            y="42"
            width="148"
            height="58"
            rx="8"
            fill="var(--accent-soft)"
            stroke="var(--accent)"
            strokeWidth="1.75"
          />
          <text x="569" y="65" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Redis Lock (&lt;1ms)
          </text>
          <text x="569" y="83" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontWeight="500">
            Idempotency Key Gate
          </text>
        </g>

        {/* NODE 02: PostgreSQL Single-Transaction Commit */}
        <g className="diagram-node" data-stage="02">
          <rect
            x="105"
            y="140"
            width="485"
            height="76"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="347" y="162" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            02 &middot; PostgreSQL Transactional Outbox Commit
          </text>
          <rect x="125" y="172" width="210" height="34" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
          <text x="230" y="193" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="500">
            Payment Ledger Row
          </text>
          <text x="347" y="194" textAnchor="middle" fill="var(--accent)" fontSize="14" fontWeight="700">
            +
          </text>
          <rect x="360" y="172" width="210" height="34" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
          <text x="465" y="193" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="500">
            Transactional Outbox Event
          </text>
        </g>

        {/* NODE 03: Partitioned Kafka Stream */}
        <g className="diagram-node" data-stage="03">
          <rect
            x="95"
            y="258"
            width="505"
            height="80"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="347" y="280" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            03 &middot; Partitioned Kafka Stream (3,500+ TPS)
          </text>
          <rect x="115" y="292" width="145" height="34" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
          <text x="187" y="313" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontWeight="500">
            Partition 0 &rarr; Worker A
          </text>
          <rect x="275" y="292" width="145" height="34" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
          <text x="347" y="313" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontWeight="500">
            Partition 1 &rarr; Worker B
          </text>
          <rect x="435" y="292" width="145" height="34" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
          <text x="507" y="313" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontWeight="500">
            Partition 2 &rarr; Worker C
          </text>
        </g>

        {/* NODE 04: Payment Consumers + Resilience4j Circuit Breaker */}
        <g className="diagram-node" data-stage="04">
          <rect
            x="165"
            y="380"
            width="365"
            height="56"
            rx="8"
            fill="var(--surface-tint)"
            stroke="var(--accent-secondary)"
            strokeWidth="1.25"
          />
          <text x="347" y="402" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            04 &middot; Resilience4j Circuit Breaker &amp; Failover
          </text>
          <text x="347" y="421" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Detects downstream latency spikes &amp; trips under chaos injection
          </text>
        </g>

        {/* NODE 05A: Primary Payment Processor */}
        <g className="diagram-node" data-stage="05">
          <rect
            x="55"
            y="472"
            width="255"
            height="58"
            rx="8"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.25"
          />
          <text x="182" y="495" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            05 &middot; Primary Processor
          </text>
          <text x="182" y="514" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            K8s HPA &middot; Sub-50ms P99 latency
          </text>
        </g>

        {/* NODE 05B: Fallback Processor + Kafka DLQ */}
        <g className="diagram-node" data-stage="05">
          <rect
            x="365"
            y="472"
            width="270"
            height="58"
            rx="8"
            fill="var(--surface)"
            stroke="var(--border-strong)"
            strokeWidth="1.25"
          />
          <text x="500" y="495" textAnchor="middle" fill="var(--ink)" fontSize="13.5" fontWeight="600">
            Fallback Processor + Kafka DLQ
          </text>
          <text x="500" y="514" textAnchor="middle" fill="var(--ink-muted)" fontSize="11.5" fontWeight="400">
            Auto-failover on timeout &middot; Zero lost charges
          </text>
        </g>
      </svg>
    </div>
  );
};
