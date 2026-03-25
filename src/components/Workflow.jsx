import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMessageSquare,
  FiCpu,
  FiGitBranch,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Intake that doesn’t waste a cycle",
    subtitle: "Structured + conversational",
    description:
      "Employees describe the issue in plain language—chat, form, or whatever you already use. ResolveMeQ normalizes it into a ticket the system can reason about, without forcing a novel every time.",
    icon: FiMessageSquare,
  },
  {
    id: 2,
    title: "Match against how your org actually fixes things",
    subtitle: "Knowledge, history, policy",
    description:
      "We pull from approved articles, similar closed tickets, and the guardrails you set. The goal isn’t a generic answer—it’s the next step that fits your environment.",
    icon: FiCpu,
  },
  {
    id: 3,
    title: "Close it—or hand off with receipts",
    subtitle: "Resolve vs. escalate",
    description:
      "Common paths finish automatically. Everything else lands with a human alongside context: what was tried, what failed, and what we’d try next—so tier-2 isn’t doing discovery from zero.",
    icon: FiGitBranch,
  },
];

const FLOW_PATH =
  "M 48 110 C 100 110, 100 50, 200 50 C 300 50, 300 110, 352 110";

/** Pipeline graphic with optional signal animation along the path. */
function WorkflowDiagram({ className }) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <svg
      viewBox="0 0 400 228"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="workflow-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(59 130 246 / 0.35)" />
          <stop offset="50%" stopColor="rgb(59 130 246 / 0.55)" />
          <stop offset="100%" stopColor="rgb(59 130 246 / 0.35)" />
        </linearGradient>
        <linearGradient id="workflow-flow-dash" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(59 130 246 / 0.15)" />
          <stop offset="50%" stopColor="rgb(59 130 246 / 0.85)" />
          <stop offset="100%" stopColor="rgb(59 130 246 / 0.15)" />
        </linearGradient>
        <radialGradient id="signal-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(96 165 250)" />
          <stop offset="70%" stopColor="rgb(37 99 235)" />
          <stop offset="100%" stopColor="rgb(37 99 235 / 0)" />
        </radialGradient>
        <filter id="workflow-signal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Invisible geometry for motion paths (SMIL) */}
        <path id="workflow-path-geom" d={FLOW_PATH} fill="none" stroke="none" />
      </defs>

      {/* Soft backdrop */}
      <rect
        x="8"
        y="20"
        width="384"
        height="168"
        rx="16"
        className="fill-zinc-100/80 dark:fill-zinc-950/40 stroke-zinc-200/60 dark:stroke-zinc-800/60"
        strokeWidth="1"
      />

      {/* Base track */}
      <path
        d={FLOW_PATH}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-zinc-200 dark:text-zinc-700 opacity-90"
      />

      {/* Animated dashed “carrier” layer */}
      <path
        d={FLOW_PATH}
        stroke="url(#workflow-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 14"
        className="dark:opacity-90"
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Brighter flow overlay */}
      <path
        d={FLOW_PATH}
        stroke="url(#workflow-flow-dash)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 18"
        opacity={0.85}
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-22"
            dur="1.4s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Signal packets */}
      {animate && (
        <g filter="url(#workflow-signal-glow)">
          {[0, 0.95, 1.9].map((delay, i) => (
            <g key={i}>
              <circle r="5" fill="url(#signal-core)" opacity="0.45">
                <animateMotion dur="2.85s" repeatCount="indefinite" begin={`${delay}s`} rotate="auto">
                  <mpath href="#workflow-path-geom" />
                </animateMotion>
              </circle>
              <circle r="2.25" fill="rgb(255 255 255 / 0.95)" className="dark:fill-zinc-100">
                <animateMotion dur="2.85s" repeatCount="indefinite" begin={`${delay}s`} rotate="auto">
                  <mpath href="#workflow-path-geom" />
                </animateMotion>
              </circle>
            </g>
          ))}
        </g>
      )}

      {/* Nodes */}
      <g>
        <rect
          x="24"
          y="94"
          width="48"
          height="32"
          rx="8"
          className="stroke-zinc-300 dark:stroke-zinc-600 fill-white dark:fill-zinc-900"
          strokeWidth="1.5"
        />
        <rect
          x="176"
          y="34"
          width="48"
          height="32"
          rx="8"
          className="stroke-zinc-300 dark:stroke-zinc-600 fill-white dark:fill-zinc-900"
          strokeWidth="1.5"
        />
        <rect
          x="328"
          y="94"
          width="48"
          height="32"
          rx="8"
          className="stroke-primary-500/80 dark:stroke-primary-400/80 fill-primary-50 dark:fill-primary-950/50"
          strokeWidth="1.5"
        />
      </g>

      {/* Node ring pulses */}
      {animate && (
        <g className="text-primary-500/40 dark:text-primary-400/35">
          <circle cx="48" cy="110" r="10" fill="none" stroke="currentColor" strokeWidth="1">
            <animate attributeName="r" values="10;14;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1">
            <animate attributeName="r" values="10;14;10" dur="2.4s" repeatCount="indefinite" begin="0.35s" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" begin="0.35s" />
          </circle>
          <circle cx="352" cy="110" r="10" fill="none" stroke="currentColor" strokeWidth="1">
            <animate attributeName="r" values="10;14;10" dur="2.4s" repeatCount="indefinite" begin="0.7s" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" begin="0.7s" />
          </circle>
        </g>
      )}

      <text
        x="48"
        y="114"
        textAnchor="middle"
        className="fill-zinc-600 dark:fill-zinc-400"
        style={{ fontSize: "10px", fontWeight: 600 }}
      >
        Intake
      </text>
      <text
        x="200"
        y="54"
        textAnchor="middle"
        className="fill-zinc-600 dark:fill-zinc-400"
        style={{ fontSize: "10px", fontWeight: 600 }}
      >
        Match
      </text>
      <text
        x="352"
        y="114"
        textAnchor="middle"
        className="fill-primary-700 dark:fill-primary-300"
        style={{ fontSize: "10px", fontWeight: 600 }}
      >
        Outcome
      </text>

      <text
        x="200"
        y="206"
        textAnchor="middle"
        className="fill-zinc-400 dark:fill-zinc-500"
        style={{ fontSize: "11px" }}
      >
        One continuous path — no dead ends in the UI
      </text>
    </svg>
  );
}

const Workflow = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section
      id="workflow"
      ref={ref}
      className="relative py-24 md:py-32 bg-white dark:bg-zinc-950 overflow-x-hidden border-t border-zinc-200/60 dark:border-zinc-800/80 scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(59_130_246/0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgb(59_130_246/0.12),transparent)]"
        aria-hidden
      />

      <div className="relative container mx-auto px-4 sm:px-6 min-w-0 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy + steps */}
          <div className="lg:col-span-7">
            <motion.header
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="mb-12 md:mb-14 max-w-2xl"
            >
              <p className="type-eyebrow mb-4">How it works</p>
              <h2 className="type-section-title mb-5">
                Three steps.
                <span className="type-section-title-muted"> No mystery handoffs.</span>
              </h2>
              <p className="type-lede">
                The same story whether you’re on the service desk or the receiving end: capture cleanly,
                decide with evidence, finish or escalate without starting over.
              </p>
            </motion.header>

            <div className="relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.12 + index * 0.1 }}
                    className="relative flex gap-5 sm:gap-6 pb-12 sm:pb-14 last:pb-0"
                  >
                    {/* Timeline rail */}
                    <div className="flex flex-col items-center flex-shrink-0 w-11 sm:w-12">
                      <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 shadow-sm">
                        <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" aria-hidden />
                      </span>
                      {!isLast && (
                        <span
                          className="w-px flex-1 mt-3 bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent dark:from-zinc-600 dark:via-zinc-700 min-h-[2.5rem]"
                          aria-hidden
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="text-xs font-semibold tabular-nums text-primary-600 dark:text-primary-400">
                          {String(step.id).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                          {step.subtitle}
                        </span>
                      </div>
                      <h3 className="type-card-title mb-3">
                        {step.title}
                      </h3>
                      <p className="type-body max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Visual column */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]">
              <p className="type-eyebrow mb-4">Flow</p>
              <WorkflowDiagram className="w-full h-auto text-zinc-400 dark:text-zinc-500" />

              {/* Horizontal stepper — desktop-friendly summary */}
              <div className="mt-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="hidden sm:flex items-center justify-between gap-2 text-center">
                  {["Capture", "Decide", "Finish"].map((label, i) => (
                    <div key={label} className="flex-1 flex flex-col items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                        {i + 1}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="sm:hidden flex justify-between gap-2">
                  {["Capture", "Decide", "Finish"].map((label, i) => (
                    <div
                      key={label}
                      className="flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg bg-white/60 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800"
                    >
                      <span className="text-[10px] font-semibold text-primary-600 dark:text-primary-400">
                        {i + 1}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 text-center px-1">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust strip — qualitative, no unverifiable percentages */}
            <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-2">
                <span className="text-primary-500 dark:text-primary-400 flex-shrink-0">—</span>
                <span>Built for teams that already have a ticket system—we complement it, not replace it overnight.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500 dark:text-primary-400 flex-shrink-0">—</span>
                <span>Audit-friendly trails: what was suggested, what ran, and who touched the ticket.</span>
              </li>
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
