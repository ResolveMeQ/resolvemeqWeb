/**
 * Regenerates public/sitemap.xml — offline/fallback only.
 * Production: resolvemeq.net/sitemap.xml is proxied to Django (live DB sitemap).
 * Run via: npm run prebuild
 */
const fs = require("fs");
const path = require("path");
const { loadBlogPostsForBuild } = require("./blogFeedSource");

const SITE = "https://resolvemeq.net";
const outFile = path.join(__dirname, "..", "public", "sitemap.xml");

const marketingSections = [
  "features",
  "solutions",
  "workflow",
  "pricing",
  "faq",
  "contact",
  "newsletter",
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const buildDate = new Date().toISOString().slice(0, 10);
  const { posts, apiCount, staticCount } = await loadBlogPostsForBuild();

  const entries = [
    { loc: `${SITE}/`, changefreq: "weekly", priority: "1.0", lastmod: buildDate },
    ...marketingSections.map((section) => ({
      loc: `${SITE}/${section}`,
      changefreq: "weekly",
      priority: "0.9",
      lastmod: buildDate,
    })),
    { loc: `${SITE}/blog`, changefreq: "weekly", priority: "0.85", lastmod: buildDate },
    ...posts.map((post) => ({
      loc: `${SITE}/blog/${encodeURIComponent(post.slug)}`,
      changefreq: "monthly",
      priority: "0.75",
      lastmod: post.isoDate || buildDate,
    })),
    { loc: `${SITE}/privacy`, changefreq: "monthly", priority: "0.7", lastmod: buildDate },
    { loc: `${SITE}/terms`, changefreq: "monthly", priority: "0.7", lastmod: buildDate },
    { loc: `${SITE}/cookies`, changefreq: "monthly", priority: "0.7", lastmod: buildDate },
  ];

  const body = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  fs.writeFileSync(outFile, xml, "utf8");
  console.log(
    `Wrote ${entries.length} URLs to public/sitemap.xml (${posts.length} blog posts: ${apiCount} API + ${staticCount} static, merged by slug)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
