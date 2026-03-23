import { Helmet } from "react-helmet-async";
import {
  OG_IMAGE,
  OG_SITE_NAME,
  SITE_URL,
  TWITTER_IMAGE,
} from "./siteDefaults";

/**
 * Per-route title, description, canonical, Open Graph, and Twitter cards.
 * @param {object} props
 * @param {string} props.title - Full document title
 * @param {string} props.description - Meta description
 * @param {string} props.path - Path only, e.g. "/blog" or "/blog/my-post"
 * @param {"website"|"article"} [props.ogType]
 * @param {string} [props.ogImage] - Absolute URL
 * @param {string} [props.twitterImage] - Absolute URL
 * @param {string} [props.articlePublishedTime] - ISO 8601 for og:article:published_time
 * @param {string} [props.socialTitle] - og/twitter title when shorter than the document title
 * @param {boolean} [props.noindex]
 */
export function PageSeo({
  title,
  description,
  path,
  ogType = "website",
  ogImage = OG_IMAGE,
  twitterImage = TWITTER_IMAGE,
  articlePublishedTime,
  socialTitle,
  noindex,
}) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${normalized}`;
  const ogTwitterTitle = socialTitle ?? title;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTwitterTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={OG_SITE_NAME} />

      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={ogTwitterTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
    </Helmet>
  );
}
