/**
 * Shared route list + SEO fields for post-build prerender.
 * Keep titles/descriptions aligned with src/seo/marketingSectionSeo.js and public/seo-boot.js.
 */
const SITE = "https://resolvemeq.net";
const OG_IMAGE = `${SITE}/assets/og-image.png`;
const TWITTER_IMAGE = `${SITE}/assets/twitter-image.png`;

const BASE = "Resolve Me Quickly (ResolveMeQ)";

const MARKETING_PAGES = [
  {
    path: "/",
    title: "Resolve Me Quickly (ResolveMeQ) - AI-Powered IT Support Automation",
    description:
      "Resolve Me Quickly (ResolveMeQ) uses AI to deflect tickets, speed resolution, and keep context on escalation. Try it free.",
    h1: "Resolve Me Quickly (ResolveMeQ)",
    priority: "1.0",
  },
  {
    path: "/features",
    title: `Features — ${BASE}`,
    description:
      "AI ticket deflection, smart escalation with full context, integrations, and analytics. See how ResolveMeQ fits your IT stack.",
    h1: "ResolveMeQ Features",
  },
  {
    path: "/solutions",
    title: `Solutions — ${BASE}`,
    description:
      "IT support automation by industry, team, household, or individual—tailored flows without replacing your help desk.",
    h1: "ResolveMeQ Solutions",
  },
  {
    path: "/workflow",
    title: `How it works — ${BASE}`,
    description:
      "From intake to resolution: how ResolveMeQ normalizes requests, suggests fixes from your knowledge, and escalates with context.",
    h1: "How ResolveMeQ Works",
  },
  {
    path: "/pricing",
    title: `Pricing — ${BASE}`,
    description:
      "Plans for teams of every size. 14-day trial, no card to start. Compare Starter, Pro, and Enterprise.",
    h1: "ResolveMeQ Pricing",
  },
  {
    path: "/faq",
    title: `FAQ — ${BASE}`,
    description:
      "Answers about ResolveMeQ: enterprise fit, trials, data handling, and how we work alongside your existing tools.",
    h1: "ResolveMeQ FAQ",
  },
  {
    path: "/contact",
    title: `Contact & demo — ${BASE}`,
    description:
      "Request a walkthrough or open the app. Sales, knowledge base, and trial links—no spam, no twenty-field forms.",
    h1: "Contact ResolveMeQ",
  },
  {
    path: "/newsletter",
    title: `Newsletter — ${BASE}`,
    description:
      "Product notes, IT automation ideas, and changelog-style updates from ResolveMeQ—low frequency, no fluff.",
    h1: "ResolveMeQ Newsletter",
  },
  {
    path: "/blog",
    title: `Journal — ${BASE}`,
    description:
      "Product notes, IT operations, and support automation from ResolveMeQ—practical write-ups for service desks.",
    h1: "ResolveMeQ Journal",
  },
  {
    path: "/docs",
    title: `Documentation — ${BASE}`,
    description:
      "Complete ResolveMeQ product manual: tickets, AI chat, knowledge base, workflows, automation, integrations, analytics, MSP mode, and Partner API.",
    h1: "ResolveMeQ Documentation",
  },
  {
    path: "/privacy",
    title: `Privacy Policy — ${BASE}`,
    description: "How ResolveMeQ collects, uses, and protects personal data on resolvemeq.net and app.resolvemeq.net.",
    h1: "Privacy Policy",
  },
  {
    path: "/terms",
    title: `Terms of Service — ${BASE}`,
    description: "Terms governing use of ResolveMeQ websites and software.",
    h1: "Terms of Service",
  },
  {
    path: "/cookies",
    title: `Cookie Policy — ${BASE}`,
    description: "Cookies and similar technologies used on ResolveMeQ properties, and how to manage consent.",
    h1: "Cookie Policy",
  },
];

/** Keep in sync with src/data/productManual.js */
const DOC_CHAPTERS = [
  { slug: "overview", title: "Platform overview" },
  { slug: "getting-started", title: "Getting started" },
  { slug: "tickets-and-ai", title: "Tickets and AI chat" },
  { slug: "knowledge-base", title: "Knowledge base" },
  { slug: "workflows", title: "Workflows" },
  { slug: "automation-rules", title: "Automation rules" },
  { slug: "integrations", title: "Integrations" },
  { slug: "analytics", title: "Analytics" },
  { slug: "msp-mode", title: "MSP mode" },
  { slug: "workspace-permissions", title: "Workspace permissions" },
  { slug: "security-and-audit", title: "Security and audit" },
  { slug: "partner-api", title: "Partner API" },
];

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loadIntros() {
  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, "..", "public", "seo-intros.js");
  const src = fs.readFileSync(file, "utf8");
  const sandbox = { window: {} };
  // eslint-disable-next-line no-new-func
  const run = new Function("window", src + "\n;return window.__RMQ_INTROS;");
  return run(sandbox.window) || {};
}

function paragraphsToHtml(text) {
  return String(text || "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n");
}

module.exports = {
  SITE,
  BASE,
  OG_IMAGE,
  TWITTER_IMAGE,
  MARKETING_PAGES,
  DOC_CHAPTERS,
  escapeHtml,
  loadIntros,
  paragraphsToHtml,
};
