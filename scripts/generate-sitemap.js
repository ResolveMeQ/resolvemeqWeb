/**
 * Regenerates public/sitemap.xml from static routes + slugs in src/data/blogPosts.js.
 * Run via: npm run prebuild (before production build).
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://resolvemeq.net";
const blogFile = path.join(__dirname, "..", "src", "data", "blogPosts.js");
const outFile = path.join(__dirname, "..", "public", "sitemap.xml");

const content = fs.readFileSync(blogFile, "utf8");
const slugs = [...content.matchAll(/\bslug:\s*"([^"]+)"/g)].map((m) => m[1]);

const lastmod = new Date().toISOString().slice(0, 10);

const marketingSections = [
  "features",
  "solutions",
  "workflow",
  "pricing",
  "faq",
  "contact",
  "newsletter",
];

const entries = [
  { loc: `${SITE}/`, changefreq: "weekly", priority: "1.0" },
  ...marketingSections.map((path) => ({
    loc: `${SITE}/${path}`,
    changefreq: "weekly",
    priority: "0.9",
  })),
  { loc: `${SITE}/blog`, changefreq: "weekly", priority: "0.85" },
  ...slugs.map((slug) => ({
    loc: `${SITE}/blog/${encodeURIComponent(slug)}`,
    changefreq: "monthly",
    priority: "0.75",
  })),
  { loc: `${SITE}/privacy`, changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/terms`, changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/cookies`, changefreq: "monthly", priority: "0.7" },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const body = entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(outFile, xml, "utf8");
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`);
