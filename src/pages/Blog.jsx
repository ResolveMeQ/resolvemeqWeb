import { useState, useMemo } from "react";
import { PageSeo } from "../seo/PageSeo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { BLOG_POSTS } from "../data/blogPosts";

const CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();
const TAGS = [...new Set(BLOG_POSTS.map((p) => p.category))];

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

  const recentPosts = BLOG_POSTS.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-24 pb-16">
      <PageSeo
        title="Blog | Resolve Me Quickly (ResolveMeQ)"
        description="Insights on AI-powered IT support, ticket automation, and helpdesk best practices from the Resolve Me Quickly team."
        path="/blog"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <Link to="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-6">
          ← Back to Home
        </Link>

        {/* Full-width header so sidebar and grid start on same horizontal line */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights on IT support automation, AI, and helpdesk best practices.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left Sidebar - aligned with grid */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm sticky top-28">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                    Search
                  </h3>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Company titles/keywords"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                    Categories
                  </h3>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                    Recent Articles
                  </h3>
                  {recentPosts.length > 0 ? (
                    <ul className="space-y-2">
                      {recentPosts.map((post) => (
                        <li key={post.slug}>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No recent articles</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
                    Tags
                  </h3>
                  {TAGS.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setCategory(category === tag ? "" : tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            category === tag
                              ? "bg-primary-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No tags available</p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Blog grid - same top as sidebar */}
          <div className="flex-1 min-w-0 w-full">
            {filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full"
                    >
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <FiCalendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium">
                            {post.category}
                          </span>
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                          Read more
                          <FiArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No articles match your search or category.</p>
                <button
                  type="button"
                  onClick={() => { setSearch(""); setCategory(""); }}
                  className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
