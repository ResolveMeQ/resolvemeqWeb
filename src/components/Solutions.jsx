import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { consumePendingSolutionsTab } from "../utils/scrollToSection";
import {
  FiBriefcase,
  FiUsers,
  FiHome,
  FiUser,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

const TABS = [
  { id: "industry", label: "By industry", icon: FiBriefcase },
  { id: "team", label: "By team", icon: FiUsers },
  { id: "household", label: "Household", icon: FiHome },
  { id: "individual", label: "Individual", icon: FiUser },
];

const CONTENT = {
  industry: {
    headline: "Regulated volume, thin IT, or lots of locations",
    lede:
      "ResolveMeQ is your front line for everyday IT requests: password resets, VPN, access, hardware triage, and repeat “how do I…?” questions—routed correctly before they clog your queue.",
    outcomes: [
      "Fewer tickets stuck in “unknown owner” limbo",
      "Consistent answers that match your policies",
      "Audit-friendly handoff when something needs a human",
    ],
    cards: [
      {
        title: "Healthcare & life sciences",
        text: "Clinical and corporate staff get fast, policy-aware guidance; sensitive paths stay with your approved tools.",
      },
      {
        title: "Financial services",
        text: "High expectations for response time and control—automate the routine without bypassing risk rules.",
      },
      {
        title: "Retail & logistics",
        text: "Stores, warehouses, and drivers ping IT around the clock. Give them one reliable place to start.",
      },
      {
        title: "Professional services",
        text: "Partners and consultants lose billable minutes to IT friction. Cut the wait on standard requests.",
      },
      {
        title: "Education",
        text: "Semester spikes and device diversity—deflect repeat questions and route lab vs. admin issues cleanly.",
      },
      {
        title: "Tech & SaaS",
        text: "Your own employees still file IT tickets. Keep internal helpdesk response times from becoming a joke.",
      },
    ],
  },
  team: {
    headline: "Who internally owns “support” at your org",
    lede:
      "Whether you run a formal service desk or someone wears IT part-time, ResolveMeQ captures the request, suggests fixes from your knowledge, and only escalates with context attached.",
    outcomes: [
      "Level 1 stops re-typing the same reply",
      "Engineers see summaries, not novels",
      "Leadership gets volume and theme signals, not anecdotes",
    ],
    cards: [
      {
        title: "IT & service desk",
        text: "The default fit: triage chat, suggested resolutions, and clean escalation to your ticket system.",
      },
      {
        title: "Security & compliance",
        text: "Phishing reports, access reviews, and policy questions—steer people to the right workflow first.",
      },
      {
        title: "HR & people ops",
        text: "Onboarding laptops, MFA lockouts, and app access—reduce back-and-forth between HR and IT.",
      },
      {
        title: "Operations & facilities",
        text: "When “something’s broken” could be IT, vendor, or building—start with structured intake.",
      },
      {
        title: "Office of the CIO",
        text: "Prove deflection and time-to-first-response without a science project every quarter.",
      },
      {
        title: "No dedicated IT (SMB)",
        text: "The owner or ops lead becomes the bottleneck. Give staff a guided path before it lands in Slack @-hell.",
      },
    ],
  },
  household: {
    headline: "One roof, several laptops, and recurring “can you fix this?”",
    lede:
      "Families with remote workers, students, and shared Wi‑Fi see the same few problems on repeat. ResolveMeQ gives everyone a calm, step-by-step place to start—without turning the household group chat into tier‑1 support.",
    outcomes: [
      "Less ad-hoc screen sharing for the same Wi‑Fi / printer issues",
      "Older adults get plain language, not jargon",
      "You keep a simple record of what was tried",
    ],
    cards: [
      {
        title: "Remote worker + family",
        text: "Work machine issues vs. home network confusion—separate flows so nobody mixes profiles.",
      },
      {
        title: "Students & parents",
        text: "School portals, MFA on shared devices, and “the camera broke again” during exam week.",
      },
      {
        title: "Multi-generational homes",
        text: "Bigger text, slower steps, and fewer assumptions—still the same underlying automation.",
      },
      {
        title: "Renters & shared housing",
        text: "Router access is messy; start with checks that don’t need landlord credentials.",
      },
      {
        title: "Home office upgrade cycles",
        text: "New monitor, dock, or headset—guided setup instead of trial-and-error drivers.",
      },
      {
        title: "Side projects under one roof",
        text: "Separate “personal business” IT from day-job devices with clear boundaries in the flow.",
      },
    ],
  },
  individual: {
    headline: "Solo operator, freelancer, or power user",
    lede:
      "You don’t have a helpdesk—you are the helpdesk. ResolveMeQ is the checklist-driven assistant for recurring device, account, and connectivity problems so you stop searching the same three forums every month.",
    outcomes: [
      "Less context switching between vendor status pages",
      "Repeatable fixes you can actually remember",
      "Optional escalation path when you’re out of patience",
    ],
    cards: [
      {
        title: "Freelancers & consultants",
        text: "Client SSO, VPN splits, and invoice tools—keep personal and client identities from colliding.",
      },
      {
        title: "Creators & media",
        text: "Large files, sync tools, and “why is Premiere angry again”—structured triage beats random reboots.",
      },
      {
        title: "Students & career switchers",
        text: "Cheap hardware, strict deadlines—get unblocked on lab software and submission portals.",
      },
      {
        title: "Job seekers",
        text: "Video tools, background noise, and “my mic works in Zoom but not Teams”—narrow it fast.",
      },
      {
        title: "Traveling workers",
        text: "Hotel Wi‑Fi, tethering, and VPN drops—lightweight checks that fit a carry-on lifestyle.",
      },
      {
        title: "Privacy-minded individuals",
        text: "You still want support; you don’t want data sprayed across random chat apps. Centralized, structured intake.",
      },
    ],
  },
};

const Solutions = () => {
  const [active, setActive] = useState("industry");

  const applyTab = useCallback((tabId) => {
    if (TABS.some((t) => t.id === tabId)) setActive(tabId);
  }, []);

  useEffect(() => {
    const onSetTab = (e) => applyTab(e.detail);
    window.addEventListener("solutions-set-tab", onSetTab);
    return () => window.removeEventListener("solutions-set-tab", onSetTab);
  }, [applyTab]);

  useEffect(() => {
    const pending = consumePendingSolutionsTab();
    if (pending) applyTab(pending);
  }, [applyTab]);

  const data = CONTENT[active];

  return (
    <section
      id="solutions"
      className="relative py-20 md:py-24 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 scroll-mt-20"
      aria-labelledby="solutions-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 mb-3">
            Where you fit
          </p>
          <h2
            id="solutions-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
          >
            IT support that actually tells people what to do next
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            ResolveMeQ isn’t a slide deck about “AI.” It’s the place employees, family members, or you
            open when something breaks: we capture the problem, suggest fixes from what already worked
            for your org (or your home runbook), and hand off cleanly when a human still needs to step in.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-2 p-1 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full md:w-fit mb-10"
          role="tablist"
          aria-label="Choose how you want to explore solutions"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`solutions-tab-${id}`}
                aria-controls={`solutions-panel-${id}`}
                onClick={() => applyTab(id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-w-0 ${
                  selected
                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200/80 dark:border-gray-700"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0 opacity-80" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`solutions-panel-${active}`}
            aria-labelledby={`solutions-tab-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          >
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                {data.headline}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                {data.lede}
              </p>
              <ul className="space-y-3">
                {data.outcomes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiCheck className="w-3 h-3" aria-hidden />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.resolvemeq.net/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
              >
                See how it fits your setup
                <FiArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 p-px overflow-hidden">
                <div className="grid sm:grid-cols-2 gap-px">
                  {data.cards.map((card) => (
                    <div
                      key={card.title}
                      className="bg-white dark:bg-gray-950 p-5 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-900/90 transition-colors min-h-[7.5rem]"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        {card.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Solutions;
