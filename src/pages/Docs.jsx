import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBook, FiClock, FiArrowRight } from "react-icons/fi";
import { PageSeo } from "../seo/PageSeo";
import { MANUAL_CATEGORIES, PRODUCT_MANUAL } from "../data/productManual";

const Docs = () => {
  const grouped = MANUAL_CATEGORIES.map((cat) => ({
    ...cat,
    chapters: PRODUCT_MANUAL.filter((ch) => ch.category === cat.id),
  }));

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] pt-24 pb-20">
      <PageSeo
        title="Documentation, Resolve Me Quickly (ResolveMeQ)"
        description="Complete product manual: tickets, AI chat, workflows, automation rules, integrations, analytics, MSP mode, security audit log, and Partner API."
        path="/docs"
        socialTitle="Documentation | ResolveMeQ"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-8"
        >
          ← Back to Home
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="type-eyebrow mb-3">Documentation</p>
          <h1 className="type-section-title mb-4">
            ResolveMeQ product manual
          </h1>
          <p className="type-lede">
            Everything you need to run tickets, AI-assisted resolution, workflows,
            automation, and enterprise controls, written for admins, agents, and integration
            partners. No external wiki required.
          </p>
          <a
            href="https://app.resolvemeq.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            Open the app
            <FiArrowRight className="w-4 h-4" />
          </a>
        </header>

        <div className="space-y-12">
          {grouped.map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">
                {section.label}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.chapters.map((ch, index) => (
                  <motion.div
                    key={ch.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={`/docs/${ch.slug}`}
                      className="group block h-full rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 p-6 shadow-sm hover:border-primary-500/40 dark:hover:border-primary-500/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                          <FiBook className="w-5 h-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {ch.title}
                          </h3>
                          <p className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                            <FiClock className="w-3.5 h-3.5" />
                            {ch.readMinutes} min read
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {ch.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Docs;
