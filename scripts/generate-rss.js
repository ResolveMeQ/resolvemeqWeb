/**
 * Writes public/rss.xml from src/data/blogPosts.js (same slug/title/date/excerpt order as source).
 * Run via prebuild alongside generate-sitemap.js.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://resolvemeq.net";
const blogFile = path.join(__dirname, "..", "src", "data", "blogPosts.js");
const outFile = path.join(__dirname, "..", "public", "rss.xml");

const content = fs.readFileSync(blogFile, "utf8");

function extractPosts(src) {
  const posts = [];
  const re =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?isoDate:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    posts.push({
      slug: m[1],
      title: m[2],
      isoDate: m[3],
      excerpt: m[4],
    });
  }
  return posts;
}

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

const posts = extractPosts(content);
posts.sort((a, b) => (a.isoDate < b.isoDate ? 1 : a.isoDate > b.isoDate ? -1 : 0));

const items = posts
  .map((p) => {
    const link = `${SITE}/blog/${encodeURIComponent(p.slug)}`;
    return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${escapeXml(pubDate(p.isoDate))}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
console.log(`Wrote ${posts.length} items to public/rss.xml`);
