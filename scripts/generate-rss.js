/**
 * Writes public/rss.xml from merged blog sources:
 * static src/data/blogPosts.js + GET /api/blog/ at build time.
 * Run via prebuild alongside generate-sitemap.js.
 */
const fs = require("fs");
const path = require("path");
const { loadBlogPostsForBuild } = require("./blogFeedSource");

const SITE = "https://resolvemeq.net";
const outFile = path.join(__dirname, "..", "public", "rss.xml");

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RFC 822-ish pubDate from YYYY-MM-DD */
function pubDate(isoDate) {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  return d.toUTCString();
}

async function main() {
  const { posts, authorName, apiCount, staticCount } = await loadBlogPostsForBuild();

  const items = posts
    .map((post) => {
      const link = `${SITE}/blog/${encodeURIComponent(post.slug)}`;
      const creator = post.authorName || authorName;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${escapeXml(pubDate(post.isoDate))}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <dc:creator>${escapeXml(creator)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Resolve Me Quickly — Journal</title>
    <link>${SITE}/blog</link>
    <description>Product notes, IT operations, and support automation from ResolveMeQ.</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  fs.writeFileSync(outFile, xml, "utf8");
  console.log(
    `Wrote ${posts.length} items to public/rss.xml (${apiCount} API + ${staticCount} static, merged by slug)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
