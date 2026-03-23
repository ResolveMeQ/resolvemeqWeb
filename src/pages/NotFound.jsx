import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { PageSeo } from "../seo/PageSeo";

const NotFound = () => (
  <main className="min-h-[70vh] bg-zinc-50 dark:bg-zinc-950 pt-28 pb-20">
    <PageSeo
      title="Page not found | Resolve Me Quickly (ResolveMeQ)"
      description="The page you requested does not exist. Browse the journal or return home."
      path="/404"
      noindex
    />
    <div className="container mx-auto px-4 sm:px-6 max-w-lg text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
        This page isn’t here
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
        The link may be wrong, or we moved something. Try the journal or the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <FiHome className="w-4 h-4" aria-hidden />
          Home
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" aria-hidden />
          Journal
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;
