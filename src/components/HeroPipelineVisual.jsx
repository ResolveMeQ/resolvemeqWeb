import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const VB = { w: 520, h: 260 };

/** Ticket → triage → knowledge pulses → resolved / escalated — matches design.txt */
export function HeroPipelineVisual({ reducedMotion }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pipe = isDark ? "rgba(63, 63, 70, 0.95)" : "rgba(161, 161, 170, 0.85)";
  const ticketCore = isDark ? "#60a5fa" : "#2563eb";
  const ticketGlow = isDark ? "rgba(96, 165, 250, 0.45)" : "rgba(37, 99, 235, 0.35)";
  const nodeFill = isDark ? "rgba(39, 39, 42, 0.92)" : "rgba(255, 255, 255, 0.9)";
  const nodeStroke = isDark ? "rgba(82, 82, 91, 0.9)" : "rgba(228, 228, 231, 0.95)";
  const labelColor = isDark ? "#a1a1aa" : "#71717a";
  const pulseLine = isDark ? "rgba(96, 165, 250, 0.55)" : "rgba(37, 99, 235, 0.45)";
  const resolved = isDark ? "#4ade80" : "#16a34a";
  const escalate = isDark ? "#fbbf24" : "#d97706";
  /** Chip fill is dark / light; generic label gray is too low-contrast on the pill. */
  const contextChipText = isDark ? "#f4f4f5" : "#27272a";

  const nodes = [
    { id: "kb", x: 158, y: 54, label: "KB" },
    { id: "chat", x: 218, y: 54, label: "Chat" },
    { id: "api", x: 168, y: 206, label: "API" },
    { id: "logs", x: 228, y: 206, label: "Logs" },
  ];

  const overlayRef = useRef(null);
  const [overlaySize, setOverlaySize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const el = overlayRef.current;
    if (!el) return undefined;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setOverlaySize({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="w-full h-[300px] md:h-[400px] relative flex items-center justify-center rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-br from-zinc-100/90 to-zinc-50 dark:from-zinc-900/80 dark:to-zinc-950 overflow-hidden">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full max-h-[min(400px,55vh)]"
          aria-hidden
        >
          <defs>
            <filter id="rp-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
            </filter>
          </defs>
          <line x1={44} y1={132} x2={476} y2={132} stroke={pipe} strokeWidth={2} strokeLinecap="round" />
          <text x={44} y={108} fill={labelColor} fontSize={10} fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
            Triage
          </text>
          {nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={14} fill={nodeFill} stroke={nodeStroke} strokeWidth={1} />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fill={labelColor}
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                {n.label}
              </text>
              <line
                x1={n.x}
                y1={n.y + 14}
                x2={200}
                y2={124}
                stroke={pulseLine}
                strokeWidth={1}
                opacity={0.35}
              />
            </g>
          ))}
          <circle cx={200} cy={132} r={5} fill={ticketCore} opacity={0.95} />
          <path
            d="M 332 78 l 4 4 8 -10"
            fill="none"
            stroke={resolved}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={338} cy={72} r={16} fill="none" stroke={resolved} strokeWidth={1.5} opacity={0.5} />
          <rect x={392} y={122} width={52} height={18} rx={4} fill={nodeFill} stroke={nodeStroke} strokeWidth={1} />
          <text
            x={418}
            y={135}
            textAnchor="middle"
            fill={contextChipText}
            fontSize={9}
            fontWeight={600}
            fontFamily="system-ui, sans-serif"
          >
            Context
          </text>
        </svg>
        <span className="sr-only">
          Illustration: a ticket moves through triage, connects to knowledge sources, and resolves or carries context.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] relative flex items-center justify-center rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-br from-zinc-100/90 to-zinc-50 dark:from-zinc-900/80 dark:to-zinc-950 overflow-hidden">
      {/* Fixed aspect box so % positions match the SVG viewBox (Chromium often ignores SVG SMIL; HTML + Framer is reliable). */}
      <div className="relative w-full aspect-[520/260] max-h-[min(400px,55vh)]">
        <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full block" aria-hidden>
          <line x1={44} y1={132} x2={476} y2={132} stroke={pipe} strokeWidth={2} strokeLinecap="round" />
          <text x={44} y={108} fill={labelColor} fontSize={10} fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
            Triage
          </text>
          <text x={400} y={108} fill={labelColor} fontSize={10} fontFamily="system-ui, sans-serif" letterSpacing="0.06em" textAnchor="end">
            Resolved
          </text>

          {nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={14} fill={nodeFill} stroke={nodeStroke} strokeWidth={1} />
              <text
                x={n.x}
                y={n.y + 3}
                textAnchor="middle"
                fill={labelColor}
                fontSize={9}
                fontFamily="system-ui, sans-serif"
              >
                {n.label}
              </text>
            </g>
          ))}

          <KnowledgePulses nodes={nodes} pulseLine={pulseLine} />

          <ResolveBadge resolved={resolved} delay={0} />
          <ResolveBadge resolved={resolved} delay={8.4} />
          <EscalateChip escalate={escalate} nodeFill={nodeFill} chipTextColor={contextChipText} />
        </svg>

        <div ref={overlayRef} className="pointer-events-none absolute inset-0">
          <TicketDot
            variant="resolve"
            delay={0}
            ticketCore={ticketCore}
            ticketGlow={ticketGlow}
            overlayW={overlaySize.w}
            overlayH={overlaySize.h}
          />
          <TicketDot
            variant="escalate"
            delay={4.2}
            ticketCore={ticketCore}
            ticketGlow={ticketGlow}
            overlayW={overlaySize.w}
            overlayH={overlaySize.h}
          />
          <TicketDot
            variant="resolve"
            delay={8.4}
            ticketCore={ticketCore}
            ticketGlow={ticketGlow}
            overlayW={overlaySize.w}
            overlayH={overlaySize.h}
          />
        </div>
      </div>
      <span className="sr-only">
        Animation: tickets enter triage, pull context from connected nodes, then resolve or exit with context.
      </span>
    </div>
  );
}

function KnowledgePulses({ nodes, pulseLine }) {
  const hubX = 198;
  const hubY = 128;
  return (
    <>
      {nodes.map((n, i) => {
        const sx = n.x;
        const sy = n.y + (n.y < hubY ? 14 : -14);
        const d = `M ${sx} ${sy} L ${hubX} ${hubY}`;
        return (
          <motion.path
            key={`pulse-${n.id}`}
            d={d}
            fill="none"
            stroke={pulseLine}
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.1 + i * 0.12,
              times: [0, 0.15, 0.55, 1],
            }}
          />
        );
      })}
    </>
  );
}

const TICKET_KF = {
  resolve: {
    cx: [12, 28, 52, 88, 140, 175, 198, 218, 248, 268, 292, 318, 338, 352, 352],
    cy: [118, 128, 132, 132, 132, 132, 132, 132, 132, 132, 118, 88, 62, 52, 52],
    r: [3.2, 4, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.2, 4.2, 3.8, 3.2, 2.8, 2.2, 2.2],
    opacity: [0, 0.85, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 0.85, 0.35, 0],
  },
  escalate: {
    cx: [12, 28, 52, 88, 140, 175, 198, 218, 248, 268, 310, 368, 412, 438, 452],
    cy: [148, 138, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132],
    r: [3.2, 4, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.2, 4.2, 4.2, 4, 3.8, 3.2, 2.8],
    opacity: [0, 0.85, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 0.7, 0],
  },
};

const TICKET_TIMES = [0, 0.04, 0.08, 0.14, 0.22, 0.3, 0.38, 0.44, 0.5, 0.56, 0.62, 0.72, 0.82, 0.92, 1];

function ResolveBadge({ resolved, delay }) {
  const duration = 12;
  return (
    <g>
      <motion.path
        d="M 332 72 l 5 5 10 -12"
        fill="none"
        stroke={resolved}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 1, 1, 1] }}
        transition={{ duration, repeat: Infinity, delay, times: TICKET_TIMES }}
      />
      <circle cx={338} cy={66} r={18} fill="none" stroke={resolved} strokeWidth={1.2} opacity={0.35} />
    </g>
  );
}

function EscalateChip({ escalate, nodeFill, chipTextColor }) {
  const duration = 12;
  return (
    <motion.g
      initial={false}
      animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.85, 1, 1, 0.4] }}
      transition={{ duration, repeat: Infinity, delay: 4.2, times: TICKET_TIMES }}
    >
      <rect x={398} y={122} width={56} height={20} rx={5} fill={nodeFill} stroke={escalate} strokeWidth={1.2} />
      <text
        x={426}
        y={136}
        textAnchor="middle"
        fill={chipTextColor}
        fontSize={9}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
      >
        Context
      </text>
    </motion.g>
  );
}

const DOT = 10;
const HALF = DOT / 2;

/** Tickets as DOM layers — pixel `x`/`y` from measured box (Framer skips SVG cx/cy; % strings are flaky). */
function TicketDot({ variant, delay, ticketCore, ticketGlow, overlayW, overlayH }) {
  const duration = 12;
  const kf = TICKET_KF[variant];
  const scale = kf.r.map((r) => r / 3.6);

  if (overlayW <= 0 || overlayH <= 0) {
    return null;
  }

  const xPx = kf.cx.map((cx) => cx * (overlayW / VB.w) - HALF);
  const yPx = kf.cy.map((cy) => cy * (overlayH / VB.h) - HALF);

  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full will-change-transform"
      style={{
        width: DOT,
        height: DOT,
        background: `radial-gradient(circle at 32% 32%, ${ticketGlow}, ${ticketCore} 70%)`,
        boxShadow: `0 0 14px ${ticketGlow}, 0 0 4px ${ticketCore}`,
      }}
      initial={false}
      animate={{
        x: xPx,
        y: yPx,
        scale,
        opacity: kf.opacity,
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: TICKET_TIMES,
      }}
    />
  );
}
