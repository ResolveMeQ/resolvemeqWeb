import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiZap,
  FiUserCheck,
  FiTrendingUp,
  FiCode,
  FiShield,
  FiActivity,
  FiArrowRight,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";

const features = [
  {
    title: "Instant resolution",
    description:
      "Deflect repetitive tickets with guided flows and answers pulled from your knowledge base—before they hit a human queue.",
    longDescription:
      "Natural-language intake maps common issues to runbooks and past resolutions. Teams typically see a meaningful drop in first-line volume within weeks, without sacrificing audit trails.",
    icon: FiZap,
    stats: "40% faster",
  },
  {
    title: "Smart escalation",
    description:
      "When AI isn’t enough, the handoff includes full context: history, attempted steps, and suggested next actions for the agent.",
    longDescription:
      "Escalation packets are structured so tier-2 and specialists spend less time interviewing the user and more time fixing the root cause. Nothing gets lost between channels.",
    icon: FiUserCheck,
    stats: "Rich context",
  },
  {
    title: "Continuous learning",
    description:
      "Every resolved ticket strengthens suggestions—scoped to your org so accuracy improves where it matters for you.",
    longDescription:
      "Feedback loops tie outcomes back to the models and knowledge you approve. You stay in control of what gets promoted to automated guidance.",
    icon: FiTrendingUp,
    stats: "Improves over time",
  },
  {
    title: "API & integrations",
    description:
      "Connect ticketing, identity, chat, and monitoring so ResolveMeQ sits inside the stack you already run.",
    longDescription:
      "REST and webhooks fit common ITSM and collaboration tools. The goal is one operational picture—not another siloed dashboard.",
    icon: FiCode,
    stats: "50+ connectors",
  },
  {
    title: "Enterprise security",
    description:
      "Encryption in transit and at rest, role-based access, and practices aligned with SOC 2 expectations for sensitive support data.",
    longDescription:
      "Granular controls for who sees what, retention you can reason about, and an architecture designed for review by security and compliance partners—not just marketing checkboxes.",
    icon: FiShield,
    stats: "SOC 2 aligned",
  },
  {
    title: "Operational analytics",
    description:
      "Volume, deflection, time-to-resolution, and recurring themes—so you can justify the program and fix systemic issues.",
    longDescription:
      "Dashboards and exports that leadership and IT ops can agree on: fewer anecdotes, clearer trends, and drill-down when something spikes.",
    icon: FiActivity,
    stats: "Real-time views",
  },
];

const FeatureRow = ({ feature, isExpanded, onClick, index, showDivider }) => {
  const Icon = feature.icon;
  return (
    <div
      className={
        showDivider
          ? "border-b border-zinc-200/80 dark:border-zinc-800/80"
          : ""
      }
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8 group transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 rounded-none"
        aria-expanded={isExpanded}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:w-36 flex-shrink-0"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200/90 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
            <Icon className="w-5 h-5" aria-hidden />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500 tabular-nums sm:mt-4">
            {feature.stats}
          </span>
        </motion.div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight pr-2">
              {feature.title}
            </h3>
            <FiChevronDown
              className={`w-5 h-5 flex-shrink-0 text-zinc-400 transition-transform mt-1 ${
                isExpanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </div>
          <p className="text-[15px] sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {feature.description}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-8 pb-7 sm:pb-8 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/25">
              <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mb-5 pt-5">
                {feature.longDescription}
              </p>
              <a
                href="https://app.resolvemeq.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group/link"
                onClick={(e) => e.stopPropagation()}
              >
                Open app
                <FiArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Features = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="features"
      className="relative py-24 md:py-32 bg-[#fafafa] dark:bg-[#09090b] overflow-x-hidden border-t border-zinc-200/60 dark:border-zinc-800/80"
    >
      {/* subtle grid like Vercel / modern product pages */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative container mx-auto px-4 sm:px-6 min-w-0 max-w-5xl">
        <header className="mb-14 md:mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4"
          >
            Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15] mb-5"
          >
            Enterprise-grade features,
            <span className="text-zinc-500 dark:text-zinc-400 font-normal"> without the clutter</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10"
          >
            One surface for deflection, escalation, integrations, and reporting—so your team spends
            time on incidents that need judgment, not on re-explaining Wi‑Fi for the ninth time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative max-w-md"
          >
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Filter capabilities…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-shadow shadow-sm"
            />
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
        >
          {filteredFeatures.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              isExpanded={expandedFeature === index}
              onClick={() =>
                setExpandedFeature(expandedFeature === index ? null : index)
              }
              index={index}
              showDivider={index < filteredFeatures.length - 1}
            />
          ))}

          {filteredFeatures.length === 0 && (
            <div className="px-8 py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No capabilities match &ldquo;{searchTerm}&rdquo;. Try another term.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
