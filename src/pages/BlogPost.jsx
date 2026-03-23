import { useParams, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BLOG_POSTS } from "../data/blogPosts";
import { FiArrowLeft, FiClock, FiChevronDown } from "react-icons/fi";
import { PageSeo } from "../seo/PageSeo";
import { OG_IMAGE, SITE_URL } from "../seo/siteDefaults";
import { buildBlogArticleParts } from "../utils/renderBlogBody";

const HEADER_OFFSET = 72;

function resolveShareImage(post) {
  if (!post?.ogImage) return OG_IMAGE;
  const o = post.ogImage;
  if (o.startsWith("http://") || o.startsWith("https://")) return o;
  const path = o.startsWith("/") ? o : `/${o}`;
  return `${SITE_URL}${path}`;
}

const BlogPost = () => {
  const { slug } = useParams();
  const location = useLocation();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const articleRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { toc, nodes } = useMemo(
    () => (post ? buildBlogArticleParts(post.body) : { toc: [], nodes: [] }),
    [post]
  );

  const updateProgress = useCallback(() => {
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = el.offsetHeight;
    const view = window.innerHeight;
    const scrollY = window.scrollY;
    const start = top - HEADER_OFFSET;
    const end = top + height - view * 0.35;
    const range = end - start;
    if (range <= 0) {
      setProgress(scrollY >= top ? 100 : 0);
      return;
    }
    const p = ((scrollY - start) / range) * 100;
    setProgress(Math.min(100, Math.max(0, p)));
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress, slug]);

  if (!post) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-16">
        <PageSeo
          title="Article not found | Resolve Me Quickly (ResolveMeQ)"
          description="That journal link may be outdated or the article was moved."
          path={location.pathname || `/blog/${slug}`}
          noindex
        />
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center py-20">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Article not found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm">
            That link may be outdated or the post was moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to journal
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const pageTitle = `${post.title} | Blog | Resolve Me Quickly (ResolveMeQ)`;
  const path = `/blog/${post.slug}`;
  const postUrl = `${SITE_URL}${path}`;
  const shareImage = resolveShareImage(post);

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    url: postUrl,
    datePublished: post.isoDate,
    author: {
      "@type": "Organization",
      name: "Resolve Me Quickly",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Resolve Me Quickly",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    image: [shareImage],
  };

  const tocNav = (
    <nav aria-label="On this page">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500 mb-3">
        On this page
      </p>
      <ul className="space-y-1 text-sm border-l border-zinc-200 dark:border-zinc-800">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block py-1.5 pl-3 -ml-px border-l-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-primary-500/70 transition-colors leading-snug"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-20">
      <PageSeo
        title={pageTitle}
        socialTitle={post.title}
        description={post.excerpt}
        path={path}
        ogType="article"
        ogImage={shareImage}
        twitterImage={shareImage}
        articlePublishedTime={`${post.isoDate}T12:00:00.000Z`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogPostingLd)}</script>
      </Helmet>

      {/* Reading progress — sits under fixed header */}
      <div
        className="fixed left-0 right-0 z-[45] h-[3px] bg-zinc-200/90 dark:bg-zinc-800 top-16 md:top-[4.5rem] pointer-events-none"
        aria-hidden
      >
        <div
          className="h-full bg-primary-600 dark:bg-primary-500 transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <article ref={articleRef} className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-10"
        >
          <FiArrowLeft className="w-4 h-4" />
          Journal
        </Link>

        <header className="mb-10 md:mb-12 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 mb-6">
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
              {post.category}
            </span>
            <time dateTime={post.isoDate} className="tabular-nums">
              {post.date}
            </time>
            <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5" aria-hidden />
              {post.readTime}
            </span>
          </div>

          {/* Author byline */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
              <img
                src="/assets/logo.png"
                alt=""
                className="h-7 w-7 object-contain"
                width="28"
                height="28"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Resolve Me Quickly
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                Editorial · IT operations & support
              </p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15] mb-8">
            {post.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-primary-500/50 pl-5">
            {post.excerpt}
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Mobile TOC */}
          {toc.length > 0 && (
            <div className="lg:hidden mb-10 -mt-2">
              <details className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  On this page
                  <FiChevronDown className="w-4 h-4 text-zinc-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">{tocNav}</div>
              </details>
            </div>
          )}

          {/* Desktop sticky TOC */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-28">{tocNav}</div>
            </aside>
          )}

          <div
            className={`min-w-0 max-w-2xl ${
              toc.length > 0 ? "lg:col-span-8 xl:col-span-9" : "lg:col-span-12"
            }`}
          >
            <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-10 md:pt-12">
              {nodes}
            </div>

            <footer className="mt-16 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">More from the journal</p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                View all articles
              </Link>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
