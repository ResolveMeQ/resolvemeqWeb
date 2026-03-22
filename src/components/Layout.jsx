import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_OG_TITLE,
  DEFAULT_TITLE,
  DEFAULT_TWITTER_DESCRIPTION,
  DEFAULT_TWITTER_TITLE,
  OG_IMAGE,
  OG_SITE_NAME,
  SITE_URL,
  TWITTER_IMAGE,
} from "../seo/siteDefaults";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      {isHome && (
        <Helmet>
          <title>{DEFAULT_TITLE}</title>
          <meta name="description" content={DEFAULT_DESCRIPTION} />
          <link rel="canonical" href={`${SITE_URL}/`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${SITE_URL}/`} />
          <meta property="og:title" content={DEFAULT_OG_TITLE} />
          <meta property="og:description" content={DEFAULT_OG_DESCRIPTION} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content={OG_SITE_NAME} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={`${SITE_URL}/`} />
          <meta name="twitter:title" content={DEFAULT_TWITTER_TITLE} />
          <meta name="twitter:description" content={DEFAULT_TWITTER_DESCRIPTION} />
          <meta name="twitter:image" content={TWITTER_IMAGE} />
        </Helmet>
      )}
      <Header />
      <div className="min-w-0 overflow-x-hidden">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
