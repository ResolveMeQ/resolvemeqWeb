/**
 * Build-time blog feed: merge static src/data/blogPosts.js with GET /api/blog/.
 * Used by generate-sitemap.js and generate-rss.js during prebuild.
 */
const fs = require("fs");
const path = require("path");

const blogFile = path.join(__dirname, "..", "src", "data", "blogPosts.js");

function trimSlash(value) {
  return (value || "").replace(/\/+$/, "");
}

function resolveBlogApiUrl() {
  if (
    process.env.REACT_APP_MARKETING_API_DISABLED === "true" ||
    process.env.REACT_APP_MARKETING_API_DISABLED === "1"
  ) {
    return null;
  }

  const explicit = (process.env.REACT_APP_BLOG_API_URL || "").trim();
  if (explicit) return trimSlash(explicit);

  const origin = trimSlash(
    process.env.REACT_APP_API_ORIGIN || process.env.REACT_APP_PUBLIC_API_URL || ""
  );
  if (origin) return `${origin}/api/blog`;

  // Production Netlify builds: default to live API when env is unset.
  if (process.env.NODE_ENV === "production") {
    return "https://api.resolvemeq.net/api/blog";
  }

  return "http://localhost:8000/api/blog";
}

function parseStaticAuthorName(src) {
  const match = src.match(/export const BLOG_AUTHOR_NAME = "([^"]+)"/);
  return match ? match[1] : "Nyuydine Bill";
}

function parseStaticPosts(src) {
  const posts = [];
  const re =
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?isoDate:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]*)"/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    posts.push({
      slug: match[1],
      title: match[2],
      isoDate: match[3],
      excerpt: match[4],
      source: "static",
    });
  }
  return posts;
}

function normalizeApiPost(raw) {
  if (!raw || !raw.slug) return null;
  return {
    slug: raw.slug,
    title: raw.title || raw.slug,
    isoDate: raw.isoDate || raw.iso_date || "",
    excerpt: raw.excerpt || "",
    authorName: raw.authorName || raw.author_name || "",
    source: "api",
  };
}

function mergePosts(apiPosts, staticPosts) {
  const bySlug = new Map();
  for (const post of staticPosts) {
    bySlug.set(post.slug, post);
  }
  for (const post of apiPosts) {
    bySlug.set(post.slug, post);
  }
  return Array.from(bySlug.values()).sort((a, b) => {
    const da = a.isoDate || "";
    const db = b.isoDate || "";
    return db.localeCompare(da);
  });
}

async function fetchApiPosts() {
  const base = resolveBlogApiUrl();
  if (!base) return [];

  const url = `${trimSlash(base)}/`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      console.warn(`Blog API ${url} returned ${res.status}; using static posts only.`);
      return [];
    }
    const data = await res.json();
    return (data.posts || []).map(normalizeApiPost).filter(Boolean);
  } catch (err) {
    console.warn(`Blog API fetch failed (${url}): ${err.message}; using static posts only.`);
    return [];
  }
}

async function loadBlogPostsForBuild() {
  const content = fs.readFileSync(blogFile, "utf8");
  const authorName = parseStaticAuthorName(content);
  const staticPosts = parseStaticPosts(content);
  const apiPosts = await fetchApiPosts();
  const posts = mergePosts(apiPosts, staticPosts);
  return { posts, authorName, apiCount: apiPosts.length, staticCount: staticPosts.length };
}

module.exports = {
  loadBlogPostsForBuild,
};
