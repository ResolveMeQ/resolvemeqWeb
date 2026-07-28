/**
 * Post-build static prerender for marketing routes.
 * Writes build/{path}/index.html with route-specific title, meta, canonical, and crawlable body copy.
 * Netlify serves these files before the SPA fallback (catch-all has no force=true).
 *
 * Run: node scripts/prerender.js  (also hooked via npm run postbuild)
 */
const fs = require("fs");
const path = require("path");
const { loadBlogPostsForBuild } = require("./blogFeedSource");
const {
  SITE,
  BASE,
  OG_IMAGE,
  TWITTER_IMAGE,
  MARKETING_PAGES,
  DOC_CHAPTERS,
  escapeHtml,
  loadIntros,
  paragraphsToHtml,
} = require("./seoRoutes");

const buildDir = path.join(__dirname, "..", "build");
const indexFile = path.join(buildDir, "index.html");

function upsertMetaByName(html, name, content) {
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, "i");
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function upsertMetaByProperty(html, property, content) {
  const re = new RegExp(`<meta\\s+property="${property}"[^>]*>`, "i");
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function setTitle(html, title) {
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  return html.replace(/<\/head>/i, `  <title>${escapeHtml(title)}</title>\n</head>`);
}

function setCanonical(html, href) {
  if (/id="rmq-canonical"/i.test(html)) {
    return html.replace(
      /<link[^>]*id="rmq-canonical"[^>]*>/i,
      `<link rel="canonical" id="rmq-canonical" href="${escapeHtml(href)}" />`
    );
  }
  return html.replace(
    /<\/head>/i,
    `  <link rel="canonical" id="rmq-canonical" href="${escapeHtml(href)}" />\n</head>`
  );
}

function setH1(html, text) {
  if (/id="rmq-h1"/i.test(html)) {
    return html.replace(
      /<h1[^>]*id="rmq-h1"[^>]*>[\s\S]*?<\/h1>/i,
      `<h1 id="rmq-h1" class="seo-static-h1">${escapeHtml(text)}</h1>`
    );
  }
  return html;
}

function setSeoBody(html, introHtml) {
  if (/id="rmq-seo-body"/i.test(html)) {
    return html.replace(
      /<section[^>]*id="rmq-seo-body"[^>]*>[\s\S]*?<\/section>/i,
      `<section id="rmq-seo-body" class="seo-static-body" aria-hidden="true">${introHtml}</section>`
    );
  }
  return html;
}

function injectVerification(html) {
  const token = (process.env.REACT_APP_GOOGLE_SITE_VERIFICATION || "").trim();
  if (!token) return html;
  return upsertMetaByName(html, "google-site-verification", token);
}

function renderPage(template, route, intros) {
  const canonical = route.path === "/" ? `${SITE}/` : `${SITE}${route.path}`;
  const intro = intros[route.path] || intros["/"] || "";
  let html = template;

  html = setTitle(html, route.title);
  html = setCanonical(html, canonical);
  html = upsertMetaByName(html, "description", route.description);
  html = upsertMetaByName(html, "robots", route.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = upsertMetaByProperty(html, "og:type", route.ogType || "website");
  html = upsertMetaByProperty(html, "og:url", canonical);
  html = upsertMetaByProperty(html, "og:title", route.socialTitle || route.title);
  html = upsertMetaByProperty(html, "og:description", route.description);
  html = upsertMetaByProperty(html, "og:image", OG_IMAGE);
  html = upsertMetaByName(html, "twitter:card", "summary_large_image");
  html = upsertMetaByName(html, "twitter:url", canonical);
  html = upsertMetaByName(html, "twitter:title", route.socialTitle || route.title);
  html = upsertMetaByName(html, "twitter:description", route.description);
  html = upsertMetaByName(html, "twitter:image", TWITTER_IMAGE);
  html = setH1(html, route.h1 || route.title);
  html = setSeoBody(html, paragraphsToHtml(intro));
  html = injectVerification(html);

  // Single-locale site: self-referencing hreflang (en + x-default)
  const hreflangBlock = [
    `<link rel="alternate" hreflang="en" href="${escapeHtml(canonical)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonical)}" />`,
  ].join("\n  ");
  if (/hreflang="en"/i.test(html)) {
    html = html.replace(/<link[^>]*hreflang="en"[^>]*>\s*/gi, "");
    html = html.replace(/<link[^>]*hreflang="x-default"[^>]*>\s*/gi, "");
  }
  html = html.replace(/<\/head>/i, `  ${hreflangBlock}\n</head>`);

  // Mark as prerendered so audits can detect static shells
  if (!/name="rmq-prerender"/i.test(html)) {
    html = html.replace(/<\/head>/i, '  <meta name="rmq-prerender" content="1" />\n</head>');
  }

  return html;
}

function writeRoute(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(indexFile, html, "utf8");
    return indexFile;
  }
  const dir = path.join(buildDir, routePath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "index.html");
  fs.writeFileSync(out, html, "utf8");
  return out;
}

async function main() {
  if (!fs.existsSync(indexFile)) {
    console.error("build/index.html missing — run craco build first");
    process.exit(1);
  }

  const template = fs.readFileSync(indexFile, "utf8");
  const intros = loadIntros();
  const { posts } = await loadBlogPostsForBuild();

  const routes = [
    ...MARKETING_PAGES,
    ...DOC_CHAPTERS.map((ch) => ({
      path: `/docs/${ch.slug}`,
      title: `${ch.title} — ${BASE} Docs`,
      description: `${ch.title} in the ResolveMeQ product manual. Setup and operations guidance for administrators and partners.`,
      h1: ch.title,
      socialTitle: `${ch.title} | ResolveMeQ Docs`,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} — ${BASE} Journal`,
      description: post.excerpt || `${post.title}. From the ResolveMeQ journal.`,
      h1: post.title,
      ogType: "article",
      socialTitle: post.title,
    })),
  ];

  let written = 0;
  for (const route of routes) {
    const html = renderPage(template, route, intros);
    writeRoute(route.path, html);
    written += 1;
  }

  console.log(`Prerendered ${written} routes into build/ (static HTML shells for crawlers)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
