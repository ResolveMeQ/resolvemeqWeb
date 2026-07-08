/**
 * Marketing blog API client.
 * Fetches published posts from Django; static posts in blogPosts.js remain as fallback.
 */

function trimSlash(s) {
  return (s || "").replace(/\/+$/, "");
}

function defaultApiOrigin() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.resolvemeq.net";
}

function resolveApiOrigin() {
  const fromEnv = trimSlash(process.env.REACT_APP_API_ORIGIN || process.env.REACT_APP_PUBLIC_API_URL || "");
  if (fromEnv) return fromEnv;
  return defaultApiOrigin();
}

const marketingDisabled =
  process.env.REACT_APP_MARKETING_API_DISABLED === "true" ||
  process.env.REACT_APP_MARKETING_API_DISABLED === "1";

export function getBlogApiBaseUrl() {
  if (marketingDisabled) return null;
  const explicit = process.env.REACT_APP_BLOG_API_URL?.trim();
  if (explicit) return trimSlash(explicit);
  return `${resolveApiOrigin()}/api/blog`;
}

export function normalizeBlogPost(raw) {
  if (!raw) return null;
  const imageUrl = raw.imageUrl || raw.image_url || raw.ogImage || null;
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    body: raw.body,
    category: raw.category,
    isoDate: raw.isoDate || raw.iso_date,
    date: raw.date,
    readTime: raw.readTime || raw.read_time,
    authorName: raw.authorName || raw.author_name,
    imageUrl,
    ogImage: raw.ogImage || imageUrl || null,
    isAiGenerated: Boolean(raw.isAiGenerated ?? raw.is_ai_generated),
  };
}

export async function fetchBlogPosts() {
  const base = getBlogApiBaseUrl();
  if (!base) return { ok: false, posts: [], error: "API not configured" };

  try {
    const res = await fetch(`${base}/`, { headers: { Accept: "application/json" } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, posts: [], error: data?.error || "Failed to load blog posts" };
    }
    const posts = (data.posts || []).map(normalizeBlogPost).filter(Boolean);
    return { ok: true, posts };
  } catch (_err) {
    return { ok: false, posts: [], error: "Please check your connection." };
  }
}

export async function fetchBlogPostBySlug(slug) {
  const base = getBlogApiBaseUrl();
  if (!base || !slug) return { ok: false, post: null, error: "API not configured" };

  try {
    const res = await fetch(`${base}/${encodeURIComponent(slug)}/`, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, post: null, error: data?.error || "Not found" };
    }
    return { ok: true, post: normalizeBlogPost(data.post) };
  } catch (_err) {
    return { ok: false, post: null, error: "Please check your connection." };
  }
}

/** Merge API posts with static fallback; API wins on slug collision. */
export function mergeBlogPosts(apiPosts, staticPosts) {
  const bySlug = new Map();
  for (const p of staticPosts || []) {
    if (p?.slug) bySlug.set(p.slug, p);
  }
  for (const p of apiPosts || []) {
    if (p?.slug) bySlug.set(p.slug, p);
  }
  return Array.from(bySlug.values()).sort((a, b) => {
    const da = a.isoDate || "";
    const db = b.isoDate || "";
    return db.localeCompare(da);
  });
}
