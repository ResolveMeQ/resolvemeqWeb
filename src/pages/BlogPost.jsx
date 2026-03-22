import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BLOG_POSTS } from "../data/blogPosts";
import { FiCalendar, FiArrowLeft } from "react-icons/fi";
import { PageSeo } from "../seo/PageSeo";
import { OG_IMAGE, SITE_URL } from "../seo/siteDefaults";

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-24 pb-16">
        <Helmet>
          <title>Post not found | Resolve Me Quickly (ResolveMeQ)</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const pageTitle = `${post.title} | Blog | Resolve Me Quickly (ResolveMeQ)`;
  const path = `/blog/${post.slug}`;
  const postUrl = `${SITE_URL}${path}`;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.isoDate,
    author: {
      "@type": "Organization",
      name: "Resolve Me Quickly",
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
    image: [OG_IMAGE],
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-24 pb-16">
      <PageSeo
        title={pageTitle}
        description={post.excerpt}
        path={path}
        ogType="article"
        articlePublishedTime={`${post.isoDate}T12:00:00.000Z`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogPostingLd)}</script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <FiCalendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                {post.date}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {post.excerpt}
            </p>
            <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {post.body}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogPost;
