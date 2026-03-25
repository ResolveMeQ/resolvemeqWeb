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
