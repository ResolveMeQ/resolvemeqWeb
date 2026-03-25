import { DEFAULT_DESCRIPTION, DEFAULT_OG_TITLE, DEFAULT_TITLE } from "./siteDefaults";

/** Pathname (with leading slash) → scroll target id on the marketing page */
export const MARKETING_PATH_TO_SECTION = {
  "/": null,
  "/features": "features",
  "/solutions": "solutions",
  "/workflow": "workflow",
  "/pricing": "pricing",
  "/faq": "faq",
  "/contact": "contact",
  "/newsletter": "newsletter",
};

/** Section id → canonical path for internal links and redirects */
export const SECTION_ID_TO_PATH = Object.fromEntries(
  Object.entries(MARKETING_PATH_TO_SECTION)
    .filter(([, id]) => id != null)
    .map(([path, id]) => [id, path])
);

/**
 * @param {string} pathname - `location.pathname`
 * @returns {string | null} element id to scroll to, or null for home top
 */
export function getSectionIdFromMarketingPath(pathname) {
  return MARKETING_PATH_TO_SECTION[pathname] ?? null;
}

const BASE = "Resolve Me Quickly (ResolveMeQ)";

/** @returns {{ title: string, description: string, path: string, socialTitle?: string }} */
export function getMarketingPageSeo(pathname) {
  const path = pathname === "" ? "/" : pathname;

  const pages = {
    "/": {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path: "/",
      socialTitle: DEFAULT_OG_TITLE,
    },
    "/features": {
      title: `Features — ${BASE}`,
      description:
        "AI ticket deflection, smart escalation with full context, integrations, and analytics. See how ResolveMeQ fits your IT stack.",
      path: "/features",
      socialTitle: `Features | ${BASE}`,
    },
    "/solutions": {
      title: `Solutions — ${BASE}`,
      description:
        "IT support automation by industry, team, household, or individual—tailored flows without replacing your help desk.",
      path: "/solutions",
      socialTitle: `Solutions | ${BASE}`,
    },
    "/workflow": {
      title: `How it works — ${BASE}`,
      description:
        "From intake to resolution: how ResolveMeQ normalizes requests, suggests fixes from your knowledge, and escalates with context.",
      path: "/workflow",
      socialTitle: `How it works | ${BASE}`,
    },
    "/pricing": {
      title: `Pricing — ${BASE}`,
      description:
        "Plans for teams of every size. 14-day trial, no card to start. Compare Starter, Pro, and Enterprise.",
      path: "/pricing",
      socialTitle: `Pricing | ${BASE}`,
    },
    "/faq": {
      title: `FAQ — ${BASE}`,
      description:
        "Answers about ResolveMeQ: enterprise fit, trials, data handling, and how we work alongside your existing tools.",
      path: "/faq",
      socialTitle: `FAQ | ${BASE}`,
    },
    "/contact": {
      title: `Contact & demo — ${BASE}`,
      description:
        "Request a walkthrough or open the app. Sales, knowledge base, and trial links—no spam, no twenty-field forms.",
      path: "/contact",
      socialTitle: `Contact | ${BASE}`,
    },
    "/newsletter": {
      title: `Newsletter — ${BASE}`,
      description:
        "Product notes, IT automation ideas, and changelog-style updates from ResolveMeQ—low frequency, no fluff.",
      path: "/newsletter",
      socialTitle: `Newsletter | ${BASE}`,
    },
  };

  const fallback = pages["/"];
  return pages[path] ?? fallback;
}
