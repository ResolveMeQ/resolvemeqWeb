import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { PageSeo } from "../seo/PageSeo";
import { SITE_URL } from "../seo/siteDefaults";
import {
  PRODUCT_MANUAL,
  getManualBySlug,
} from "../data/productManual";
import { buildManualArticleParts } from "../utils/renderManualBody";

const DocsArticle = () => {
  const { slug } = useParams();
  const chapter = getManualBySlug(slug);

  const { toc, nodes } = useMemo(
    () => (chapter?.body ? buildManualArticleParts(chapter.body) : { toc: [], nodes: [] }),
    [chapter]
  );

  if (!chapter) {
    return <Navigate to="/docs" replace />;
  }

  const currentIndex = PRODUCT_MANUAL.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? PRODUCT_MANUAL[currentIndex - 1] : null;
  const next =
    currentIndex < PRODUCT_MANUAL.length - 1
      ? PRODUCT_MANUAL[currentIndex + 1]
      : null;

  const techArticleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: chapter.title,
    description: chapter.description,
    url: `${SITE_URL}/docs/${chapter.slug}`,
    author: { "@type": "Organization", name: "ResolveMeQ" },
    publisher: { "@type": "Organization", name: "ResolveMeQ" },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-20">
      <PageSeo
        title={`${chapter.title} — ResolveMeQ Documentation`}
        description={chapter.description}
        path={`/docs/${chapter.slug}`}
        socialTitle={`${chapter.title} | ResolveMeQ Docs`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(techArticleLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <nav
                className="sticky top-28 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-5"
                aria-label="On this page"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  On this page
                </p>
                <ul className="space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <article className={toc.length > 0 ? "lg:col-span-9" : "lg:col-span-12 max-w-3xl mx-auto"}>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline mb-8"
            >
              <FiArrowLeft className="w-4 h-4" />
              All documentation
            </Link>

            <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-3">
                {chapter.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {chapter.description}
              </p>
              <p className="flex items-center gap-2 text-sm text-zinc-500">
                <FiClock className="w-4 h-4" />
                {chapter.readMinutes} min read
              </p>
            </header>

            <div className="max-w-none">{nodes}</div>

            <nav
              className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid sm:grid-cols-2 gap-4"
              aria-label="Documentation pagination"
            >
              {prev ? (
                <Link
                  to={`/docs/${prev.slug}`}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-xs text-zinc-500">Previous</span>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/docs/${next.slug}`}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors sm:text-right"
                >
                  <span className="text-xs text-zinc-500">Next</span>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          </article>
        </div>
      </div>
    </main>
  );
};

export default DocsArticle;
