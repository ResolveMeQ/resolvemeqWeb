const SOLUTIONS_TAB_STORAGE_KEY = "resolvemeq-pending-solutions-tab";

/** Section ids on the marketing home page (for /blog#foo → /#foo when no local anchor exists). */
export const HOME_PAGE_SECTION_IDS = new Set([
  "home",
  "contact",
  "features",
  "workflow",
  "pricing",
  "faq",
  "solutions",
  "newsletter",
]);

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

function isHomePath(pathname) {
  return pathname === "/" || pathname === "";
}

/**
 * @param {React.MouseEvent} e
 * @param {string} hash e.g. "#contact"
 * @param {import("react-router-dom").NavigateFunction} [navigate] pass from useNavigate() so blog/policy routes reach home sections
 */
export const handleHashLink = (e, hash, navigate) => {
  e.preventDefault();
  const sectionId = hash.replace(/^#/, "");
  if (!isHomePath(window.location.pathname)) {
    if (typeof navigate === "function") {
      navigate(`/#${sectionId}`);
    } else {
      window.location.assign(`/#${sectionId}`);
    }
    return;
  }
  scrollToSection(sectionId);
  window.history.pushState(null, "", `#${sectionId}`);
};

/** Opens #solutions and switches the Solutions section tab (used by header nav). */
export const navigateToSolutionsTab = (tabId, navigate) => {
  if (!isHomePath(window.location.pathname)) {
    sessionStorage.setItem(SOLUTIONS_TAB_STORAGE_KEY, tabId);
    if (typeof navigate === "function") {
      navigate("/#solutions");
    } else {
      window.location.assign("/#solutions");
    }
    return;
  }
  scrollToSection("solutions");
  window.history.pushState(null, "", "#solutions");
  window.dispatchEvent(new CustomEvent("solutions-set-tab", { detail: tabId }));
};

/** Call once from Solutions on mount after navigating from another route with a tab pre-selected. */
export const consumePendingSolutionsTab = () => {
  const v = sessionStorage.getItem(SOLUTIONS_TAB_STORAGE_KEY);
  if (v) sessionStorage.removeItem(SOLUTIONS_TAB_STORAGE_KEY);
  return v;
};
