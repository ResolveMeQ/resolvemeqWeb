/**
 * Sync SEO for the SPA HTML shell before React hydrates.
 * Keeps canonical, title, and primary meta aligned with the URL so crawlers
 * that execute this script do not treat every route as a duplicate of /.
 *
 * When editing marketing copy, keep in sync with:
 * - src/seo/marketingSectionSeo.js
 * - src/seo/siteDefaults.js
 * - Blog / legal PageSeo components
 * - src/data/blogPosts.js (journal article titles / H1s by slug)
 * - public/seo-intros.js (first-paint body copy for word count / crawlers)
 */
(function () {
  var SITE = "https://resolvemeq.net";
  function normPath(p) {
    if (!p) return "/";
    p = String(p).split("?")[0].split("#")[0];
    if (p.length > 1 && p.slice(-1) === "/") p = p.slice(0, -1) || "/";
    return p || "/";
  }
  var path = normPath(window.location.pathname);
  var canonical = SITE + (path === "/" ? "/" : path);

  var BASE = "Resolve Me Quickly (ResolveMeQ)";
  var DEFAULT_TITLE = BASE + " - AI-Powered IT Support Automation";
  var DEFAULT_DESC =
    "Resolve Me Quickly (ResolveMeQ) uses AI to deflect tickets, speed resolution, and keep context on escalation. Try it free.";
  var DEFAULT_OG_DESC =
    "Resolve Me Quickly (ResolveMeQ): AI IT support automation—deflect tickets, resolve faster, escalate with full context.";
  var TW_TITLE_SHORT = BASE + " - AI-Powered IT Support";

  /** Journal post H1s — keep in sync with src/data/blogPosts.js titles */
  var BLOG_H1_BY_SLUG = {
    "how-ai-transforms-it-support": "How AI Is Transforming IT Support in 2025",
    "best-practices-ticket-routing": "Best Practices for Smart Ticket Routing",
    "reducing-support-costs-with-automation": "Reducing Support Costs Without Sacrificing Quality",
    "building-internal-knowledge-base": "Building an Internal Knowledge Base That Actually Gets Used",
    "measuring-it-support-metrics": "The IT Support Metrics That Matter Most",
  };

  var byPath = {
    "/": {
      title: DEFAULT_TITLE,
      desc: DEFAULT_DESC,
      ogTitle: DEFAULT_TITLE,
      twTitle: TW_TITLE_SHORT,
      h1: "Transform your IT support with AI automation",
    },
    "/features": {
      title: "Features — " + BASE,
      desc: "AI ticket deflection, smart escalation with full context, integrations, and analytics. See how ResolveMeQ fits your IT stack.",
      ogTitle: "Features | " + BASE,
      twTitle: "Features | " + BASE,
      h1: "Features for smarter IT support",
    },
    "/solutions": {
      title: "Solutions — " + BASE,
      desc: "IT support automation by industry, team, household, or individual—tailored flows without replacing your help desk.",
      ogTitle: "Solutions | " + BASE,
      twTitle: "Solutions | " + BASE,
      h1: "IT support automation solutions",
    },
    "/workflow": {
      title: "How it works — " + BASE,
      desc: "From intake to resolution: how ResolveMeQ normalizes requests, suggests fixes from your knowledge, and escalates with context.",
      ogTitle: "How it works | " + BASE,
      twTitle: "How it works | " + BASE,
      h1: "How ResolveMeQ works",
    },
    "/pricing": {
      title: "Pricing — " + BASE,
      desc: "Plans for teams of every size. 14-day trial, no card to start. Compare Starter, Pro, and Enterprise.",
      ogTitle: "Pricing | " + BASE,
      twTitle: "Pricing | " + BASE,
      h1: "Pricing and plans",
    },
    "/faq": {
      title: "FAQ — " + BASE,
      desc: "Answers about ResolveMeQ: enterprise fit, trials, data handling, and how we work alongside your existing tools.",
      ogTitle: "FAQ | " + BASE,
      twTitle: "FAQ | " + BASE,
      h1: "Frequently asked questions",
    },
    "/contact": {
      title: "Contact & demo — " + BASE,
      desc: "Request a walkthrough or open the app. Sales, knowledge base, and trial links—no spam, no twenty-field forms.",
      ogTitle: "Contact | " + BASE,
      twTitle: "Contact | " + BASE,
      h1: "Contact and demos",
    },
    "/newsletter": {
      title: "Newsletter — " + BASE,
      desc: "Product notes, IT automation ideas, and changelog-style updates from ResolveMeQ—low frequency, no fluff.",
      ogTitle: "Newsletter | " + BASE,
      twTitle: "Newsletter | " + BASE,
      h1: "Newsletter",
    },
    "/blog": {
      title: "Blog | " + BASE,
      desc: "Insights on AI-powered IT support, ticket automation, and helpdesk best practices from the Resolve Me Quickly team.",
      ogTitle: "Blog | " + BASE,
      twTitle: "Blog | " + BASE,
      h1: "Field notes on support operations",
    },
    "/privacy": {
      title: "Privacy Policy | " + BASE,
      desc: "Resolve Me Quickly (ResolveMeQ) Privacy Policy. How we collect, use, and protect your data.",
      ogTitle: "Privacy Policy | " + BASE,
      twTitle: "Privacy Policy | " + BASE,
      h1: "Privacy Policy",
    },
    "/terms": {
      title: "Terms of Service | " + BASE,
      desc: "Resolve Me Quickly (ResolveMeQ) Terms of Service. Rules for using our website and services.",
      ogTitle: "Terms of Service | " + BASE,
      twTitle: "Terms of Service | " + BASE,
      h1: "Terms of Service",
    },
    "/cookies": {
      title: "Cookie Policy | " + BASE,
      desc: "Resolve Me Quickly (ResolveMeQ) Cookie Policy. How we use cookies and similar technologies.",
      ogTitle: "Cookie Policy | " + BASE,
      twTitle: "Cookie Policy | " + BASE,
      h1: "Cookie Policy",
    },
  };

  function introForPath(p) {
    var M = window.__RMQ_INTROS;
    if (!M) return "";
    return M[p] || M["__default__"] || "";
  }

  function pick() {
    if (byPath[path]) {
      return Object.assign({}, byPath[path], { intro: introForPath(path) });
    }
    if (path.indexOf("/blog/") === 0) {
      var slug = path.slice(6);
      var articleH1 = BLOG_H1_BY_SLUG[slug];
      return {
        title: articleH1 ? articleH1 + " | Blog | " + BASE : "Journal article — " + BASE,
        desc:
          "Field notes on IT support operations, routing, knowledge, and metrics from the ResolveMeQ journal.",
        ogTitle: articleH1 ? articleH1 + " | " + BASE : "Journal — " + BASE,
        twTitle: articleH1 ? articleH1 + " | " + BASE : "Journal — " + BASE,
        h1: articleH1 || "ResolveMeQ journal article",
        intro: introForPath(path),
      };
    }
    return {
      title: DEFAULT_TITLE,
      desc: DEFAULT_DESC,
      ogTitle: DEFAULT_TITLE,
      twTitle: TW_TITLE_SHORT,
      h1: "Resolve Me Quickly (ResolveMeQ)",
      intro: introForPath(path),
    };
  }
  var seo = pick();
  var ogDesc = DEFAULT_OG_DESC;
  if (path !== "/" && seo.desc) ogDesc = seo.desc;

  document.title = seo.title;

  function setMetaByName(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }
  function setMetaByProperty(prop, content) {
    var el = document.querySelector('meta[property="' + prop + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", prop);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  setMetaByName("title", seo.title);
  setMetaByName("description", seo.desc);
  setMetaByProperty("og:type", "website");
  setMetaByProperty("og:url", canonical);
  setMetaByProperty("og:title", seo.ogTitle || seo.title);
  setMetaByProperty("og:description", ogDesc);
  setMetaByName("twitter:card", "summary_large_image");
  setMetaByName("twitter:url", canonical);
  setMetaByName("twitter:title", seo.twTitle || seo.title);
  setMetaByName("twitter:description", ogDesc);

  var link = document.getElementById("rmq-canonical");
  if (link) link.setAttribute("href", canonical);

  var h1El = document.getElementById("rmq-h1");
  if (h1El) {
    h1El.textContent = seo.h1 || BASE;
  }

  function fillSeoBody(text) {
    var el = document.getElementById("rmq-seo-body");
    if (!el || !text) return;
    el.textContent = "";
    String(text)
      .split(/\n\n+/)
      .forEach(function (block) {
        var t = block.replace(/\s+/g, " ").trim();
        if (!t) return;
        var p = document.createElement("p");
        p.textContent = t;
        el.appendChild(p);
      });
  }
  fillSeoBody(seo.intro || "");
})();
