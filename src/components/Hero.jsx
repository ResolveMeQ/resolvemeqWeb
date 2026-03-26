import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { HeroPipelineVisual } from "./HeroPipelineVisual";
import { loadFull } from "tsparticles";
import { useInView } from "react-intersection-observer";
import { trackEvent } from "../utils/analytics";
import {
  FiPlay,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase,
  FiShield,
  FiLayers,
} from "react-icons/fi";

/** Role-based trust strip—no stock faces or unverifiable counts */
const SocialProof = () => {
  const items = [
    {
      icon: FiBriefcase,
      label: "IT & service desks",
      sub: "Deflect repeat asks without losing the audit trail",
    },
    {
      icon: FiLayers,
      label: "Plugs into your stack",
      sub: "Ticketing, chat, KB—hand off with context intact",
    },
    {
      icon: FiShield,
      label: "Security-minded defaults",
      sub: "Encryption, roles, and reviews when you need them",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 }}
      className="mt-10 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <p className="type-eyebrow mb-4">
        Who it’s for
      </p>
      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, label, sub }) => (
          <li
            key={label}
            className="flex gap-3 rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 px-3 py-3 sm:flex-col sm:gap-2"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
              <Icon className="w-4 h-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                {label}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {sub}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const FloatingActionButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-8 right-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-3 rounded-xl shadow-lg z-50 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <FiChevronUp className="w-5 h-5" />
    </motion.button>
  );
};

const DEMO_VIDEO_ID = process.env.REACT_APP_HERO_DEMO_VIDEO_ID?.trim() || "";

function useNarrowViewport() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767.98px)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const fn = () => setNarrow(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return narrow;
}

const Hero = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const narrowViewport = useNarrowViewport();

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 40 });
  const containerRef = useRef(null);
  const mouseRafRef = useRef(null);
  const pendingMouseRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const flush = () => {
      mouseRafRef.current = null;
      const pending = pendingMouseRef.current;
      if (!pending || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((pending.clientX - rect.left) / rect.width) * 100,
        y: ((pending.clientY - rect.top) / rect.height) * 100,
      });
    };

    const handleMouseMove = (e) => {
      pendingMouseRef.current = e;
      if (mouseRafRef.current == null) {
        mouseRafRef.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseRafRef.current != null) cancelAnimationFrame(mouseRafRef.current);
    };
  }, [reducedMotion]);

  const showParticles = !reducedMotion && !narrowViewport;
  const particleCount = theme === "dark" ? 50 : 35;

  const particlesOptions = {
    particles: {
      number: { value: particleCount, density: { enable: true, value_area: 800 } },
      color: { value: theme === "dark" ? "#3b82f6" : "#2563eb" },
      opacity: { value: theme === "dark" ? 0.5 : 0.22 },
      size: { value: theme === "dark" ? 3 : 2.5 },
      line_linked: {
        enable: true,
        distance: 150,
        color: theme === "dark" ? "#3b82f6" : "#60a5fa",
        opacity: theme === "dark" ? 0.2 : 0.12,
        width: 1,
      },
      move: {
        enable: !reducedMotion,
        speed: reducedMotion ? 0 : 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: !reducedMotion, mode: "grab" },
        onclick: { enable: !reducedMotion, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: theme === "dark" ? 0.5 : 0.25 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  };

  const showDemoModal = () => {
    if (!DEMO_VIDEO_ID) return;
    trackEvent("hero_demo_open", { video_id: DEMO_VIDEO_ID });
    setShowVideo(true);
  };

  return (
    <section
      ref={containerRef}
      id="home"
      data-theme={theme}
      className="min-h-screen flex items-center pt-20 md:pt-0 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 scroll-mt-0"
      style={{
        background:
          theme === "dark"
            ? undefined
            : "linear-gradient(180deg, #fafafa 0%, #f4f4f5 45%, #e4e4e7 100%)",
      }}
    >
      {theme === "light" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(37, 99, 235, 0.055), 
              transparent 52%)`,
          }}
        />
      )}
      {theme === "dark" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.11), 
              transparent 52%)`,
          }}
        />
      )}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          <Particles id="tsparticles-hero" init={particlesInit} options={particlesOptions} />
        </div>
      )}

      <motion.div
        ref={ref}
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10 min-w-0 w-full"
      >
        <div className="md:w-1/2 min-w-0 w-full">
          <FadeInDiv delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 text-xs font-medium mb-6 border border-zinc-200/90 dark:border-zinc-800 shadow-sm"
              >
                <span
                  className={`w-1.5 h-1.5 bg-primary-600 rounded-full ${reducedMotion ? "" : "animate-pulse"}`}
                />
                Resolve Me Quickly — IT support automation
              </motion.div>

              <h1 className="type-display mb-6">
                Transform your IT support with{" "}
                <motion.span
                  className="text-primary-600 dark:text-primary-400 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  AI automation
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="type-display-sub mb-4"
              >
                Cut time stuck in tier-1 triage and give every ticket a clear next step—backed by
                your knowledge, your policies, and your tools.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl"
              >
                Typical outcomes teams report: 40% faster ticket resolution, 60% higher team
                efficiency—trusted by 500+ companies.
              </motion.p>
            </motion.div>
          </FadeInDiv>

          <FadeInDiv delay={0.4}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-2">
              <motion.a
                href="https://app.resolvemeq.net/register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_get_started", { placement: "hero", destination: "register" })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-xl shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-150"
                aria-label="Get started with ResolveMeQ"
              >
                Get started
                <FiArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ scale: DEMO_VIDEO_ID ? 1.02 : 1 }}
                whileTap={{ scale: DEMO_VIDEO_ID ? 0.98 : 1 }}
                onClick={showDemoModal}
                disabled={!DEMO_VIDEO_ID}
                title={!DEMO_VIDEO_ID ? "Demo video coming soon" : undefined}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-medium transition-all duration-150 ${
                  DEMO_VIDEO_ID
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700 cursor-not-allowed"
                }`}
                aria-label={DEMO_VIDEO_ID ? "Watch demo video" : "Demo video not available yet"}
              >
                <FiPlay className="w-4 h-4" />
                Watch demo
              </motion.button>
            </div>
            <p className="mt-5 text-sm text-zinc-600 dark:text-zinc-400">
              Prefer to browse first?{" "}
              <a
                href="https://app.resolvemeq.net/knowledge-base"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_outbound", { placement: "hero", destination: "knowledge_base" })}
                className="font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
              >
                Open the free knowledge base
              </a>
              <span className="text-zinc-500 dark:text-zinc-500"> — no account.</span>
            </p>
          </FadeInDiv>

          <SocialProof />
        </div>

        <div className="md:w-1/2 min-w-0 w-full">
          <HeroPipelineVisual reducedMotion={reducedMotion} />
        </div>
      </motion.div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                aria-label="Close video"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0`}
                title="ResolveMeQ product demo"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {reducedMotion ? (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 rounded-xl hover:bg-white/80 dark:hover:bg-zinc-900/80"
            aria-label="Scroll down"
          >
            <FiChevronDown className="w-8 h-8" />
          </button>
        </div>
      ) : (
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 rounded-xl hover:bg-white/80 dark:hover:bg-zinc-900/80"
            aria-label="Scroll down"
          >
            <FiChevronDown className="w-8 h-8" />
          </button>
        </motion.div>
      )}

      <FloatingActionButton />
    </section>
  );
};

export default Hero;
