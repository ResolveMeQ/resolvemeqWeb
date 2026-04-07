import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import IntegrationsStrip from "../components/IntegrationsStrip";
import Solutions from "../components/Solutions";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import { PageSeo } from "../seo/PageSeo";
import { getMarketingPageSeo, getSectionIdFromMarketingPath } from "../seo/marketingSectionSeo";
import { scrollToSection } from "../utils/scrollToSection";

const MarketingHome = () => {
  const { pathname, hash } = useLocation();
  const seo = getMarketingPageSeo(pathname);

  useEffect(() => {
    const hashId = hash.replace(/^#/, "");
    const pathSection = getSectionIdFromMarketingPath(pathname);
    const target = hashId || pathSection;
    if (!target) return undefined;
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) scrollToSection(target);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [pathname, hash]);

  return (
    <main>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        socialTitle={seo.socialTitle}
      />
      <Hero />
      <Solutions />
      <Features />
      <IntegrationsStrip />
      <Workflow />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
};

export default MarketingHome;
