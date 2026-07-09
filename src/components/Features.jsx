import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiZap,
  FiUserCheck,
  FiCheckSquare,
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
      "Deflect repetitive tickets with guided flows and answers pulled from your knowledge base, before they hit a human queue.",
    longDescription:
      "Natural-language intake maps common issues to runbooks and KB articles. The AI returns step-by-step guidance with confidence scores and citations, not generic chatbot text. Dashboard metrics show deflection rate for your workspace.",
    icon: FiZap,
    stats: "KB-grounded AI",
  },
  {
    title: "Real escalation, not a black hole",
    description:
      "When AI isn’t enough, a real person picks it up, with the full history, attempted steps, and predictive routing suggestions on the escalation queue.",
    longDescription:
      "No re-explaining the problem. Agents claim tickets atomically, see routing hints based on category history and workload, and reply in the same conversation the employee started.",
    icon: FiUserCheck,
    stats: "Human-backed",
  },
  {
    title: "Multi-step workflows",
    description:
      "Onboarding, offboarding, provisioning, curated playbooks with SLAs, step claims, connector auto-checks, and per-step AI assistant.",
    longDescription:
      "Human-authored templates, not LLM-invented processes. Each step has owners and due dates; Slack/Teams notify assignees. Okta, Google, and M365 can verify account state. Employee onboarding playbook ships out of the box.",
    icon: FiCheckSquare,
    stats: "Playbooks + SLAs",
  },
  {
    title: "Automation rules",
    description:
      "Trigger workflows, escalations, notifications, and outbound webhooks when tickets match your conditions, no custom fork.",
    longDescription:
      "Rules fire on ticket created, status changed, low confidence, and more. Every execution is logged. Pair with outbound webhooks for SIEM, ITSM, or partner systems.",
    icon: FiTrendingUp,
    stats: "Rules engine",
  },
  {
    title: "API & integrations",
    description:
      "Slack, Teams, Okta, Google Workspace, Microsoft 365, Jira Cloud, Partner REST API, and signed outbound webhooks.",
    longDescription:
      "Partner API keys (scoped tickets, workflows, rules) let external systems create intake and track playbooks. Full setup in our documentation, no GitHub required.",
    icon: FiCode,
    stats: "8+ live connectors",
  },
  {
    title: "Enterprise security",
    description:
      "Immutable compliance audit log with CSV export, role-based access, agent circuit breaker, and MSP multi-client mode.",
    longDescription:
      "Append-only audit events for tickets, workflows, rules, and MSP actions. Settings → Security for browse and export. Agent outages fail gracefully within 30 seconds, not hung tickets.",
    icon: FiShield,
    stats: "Audit-ready",
  },
  {
    title: "Operational analytics",
    description:
      "Deflection by category, AI confidence calibration vs outcomes, workflow bottleneck detection, and CSV export.",
    longDescription:
      "See which categories automate well, whether high-confidence buckets actually resolve without escalation, and which playbook steps stall. Built for quarterly business reviews, not vanity charts.",
    icon: FiActivity,
    stats: "Calibration built-in",
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
            <h3 className="type-card-title pr-2">
              {feature.title}
            </h3>
            <FiChevronDown
              className={`w-5 h-5 flex-shrink-0 text-zinc-400 transition-transform mt-1 ${
                isExpanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </div>
            <p className="type-body max-w-2xl">
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
              <p className="type-body max-w-2xl mb-5 pt-5">
                {feature.longDescription}
              </p>
              <Link
                to="/docs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group/link"
                onClick={(e) => e.stopPropagation()}
              >
                Read the docs
                <FiArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
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
            className="type-eyebrow mb-4"
          >
            Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="type-section-title mb-5"
          >
            Enterprise-grade features,
            <span className="type-section-title-muted"> without the clutter</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="type-lede mb-10"
          >
            One surface for deflection, escalation, integrations, and reporting, so your team spends
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
