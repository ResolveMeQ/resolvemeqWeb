import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import { HOME_PAGE_SECTION_IDS } from "../utils/scrollToSection";
import { SECTION_ID_TO_PATH } from "../seo/marketingSectionSeo";
import { SITE_URL } from "../seo/siteDefaults";

function canonicalHrefForPathname(pathname) {
  let p = pathname && pathname.length ? pathname : "/";
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1) || "/";
  const base = SITE_URL.replace(/\/$/, "");
  return p === "/" ? `${base}/` : `${base}${p}`;
}

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const el = document.getElementById("rmq-canonical");
    if (!el) return;
    el.setAttribute("href", canonicalHrefForPathname(pathname));
  }, [pathname]);

  useEffect(() => {
    document.getElementById("rmq-h1")?.remove();
    document.getElementById("rmq-seo-body")?.remove();
  }, []);

  useEffect(() => {
    // In SPA navigation, scroll position is preserved by default.
    // For normal page routes (privacy, terms, blog, etc.), reset to top.
    // For hash navigation, let section scrolling handle positioning.
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname, location.hash]);

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) return;

    if (
      pathname !== "/" &&
      HOME_PAGE_SECTION_IDS.has(id) &&
      !document.getElementById(id)
    ) {
      const path = SECTION_ID_TO_PATH[id];
      if (path) navigate(path, { replace: true });
      else navigate(`/#${id}`, { replace: true });
    }
  }, [pathname, location.hash, navigate]);

  return (
    <>
      <Header />
      <div className="min-w-0 overflow-x-hidden">
        <Outlet />
      </div>
      <Footer />
      <CookieConsentBanner />
    </>
  );
};

export default Layout;
