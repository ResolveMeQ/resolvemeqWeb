import { useState, useMemo } from "react";
import { PageSeo } from "../seo/PageSeo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BLOG_POSTS } from "../data/blogPosts";

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || post.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-24">
      <PageSeo
        title="Blog | Resolve Me Quickly (ResolveMeQ)"
        description="Insights on AI-powered IT support, ticket automation, and helpdesk best practices from the Resolve Me Quickly team."
        path="/blog"
      />

      {/* Hero band — Vercel / Linear changelog-style */}
      <div className="border-b border-zinc-200/90 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-14 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-8"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4">
            Journal
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.1] mb-5">
            Field notes on support operations
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Long-form guides on routing, automation, knowledge, and metrics—written for people who
            run desks, not slide decks.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500/30"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  category === ""
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                    : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(category === cat ? "" : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    category === cat
                      ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                      : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Index list — editorial rows */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {filteredPosts.length > 0 ? (
          <ul className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
            {filteredPosts.map((post, index) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.35) }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block py-10 md:py-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950 rounded-lg -mx-2 px-2"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                    <time dateTime={post.isoDate}>{post.date}</time>
                    <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
                      ·
                    </span>
                    <span>{post.readTime}</span>
                    <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
                      ·
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{post.category}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                    Read article
                    <FiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="py-20 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">No articles match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
            >
              Clear search and category
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
