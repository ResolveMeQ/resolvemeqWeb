import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import { HOME_PAGE_SECTION_IDS } from "../utils/scrollToSection";
import { SECTION_ID_TO_PATH } from "../seo/marketingSectionSeo";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

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
