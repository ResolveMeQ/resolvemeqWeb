import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useInView } from "react-intersection-observer";
import { FiPlay, FiArrowRight, FiChevronDown, FiChevronUp } from "react-icons/fi";

const AnimatedSphere = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-[300px] md:h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color={theme === 'dark' ? "#3b82f6" : "#2563eb"}
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.2}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

const SocialProof = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="flex items-center gap-6 mt-10"
  >
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((i) => (
        <motion.img
          key={i}
          src={`https://i.pravatar.cc/150?img=${i + 10}`}
          alt={`Customer ${i}`}
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
          whileHover={{ scale: 1.15, zIndex: 1 }}
        />
      ))}
    </div>
    <div className="text-sm text-gray-700 dark:text-gray-300">
      <span className="font-semibold text-primary-600 dark:text-primary-400">500+</span> companies trust ResolveMeQ
    </div>
  </motion.div>
);

const FloatingActionButton = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg shadow-lg z-50 transition-colors"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
  >
    <FiChevronUp className="w-5 h-5" />
  </motion.button>
);

const Hero = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particlesOptions = {
    particles: {
      number: { value: theme === 'dark' ? 50 : 35, density: { enable: true, value_area: 800 } },
      color: { value: theme === 'dark' ? "#3b82f6" : "#2563eb" },
      opacity: { value: theme === 'dark' ? 0.5 : 0.22 },
      size: { value: theme === 'dark' ? 3 : 2.5 },
      line_linked: {
        enable: true,
        distance: 150,
        color: theme === 'dark' ? "#3b82f6" : "#60a5fa",
        opacity: theme === 'dark' ? 0.2 : 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
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
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: theme === 'dark' ? 0.5 : 0.25 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  };

  return (
    <section
      ref={containerRef}
      id="home"
      data-theme={theme}
      className="min-h-screen flex items-center pt-20 md:pt-0 relative overflow-hidden bg-gray-50 dark:bg-gray-950"
      style={{
        background: theme === 'dark'
          ? undefined
          : `linear-gradient(180deg, #fafbfd 0%, #f8fafc 50%, #f1f5f9 100%)`,
      }}
    >
      {theme === 'light' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(37, 99, 235, 0.06), 
              transparent 50%)`,
          }}
        />
      )}
      {theme === 'dark' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.12), 
              transparent 50%)`,
          }}
        />
      )}
      <div className="absolute inset-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>

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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-medium mb-6 border border-primary-200 dark:border-primary-800/50"
              >
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                Enterprise AI Support Automation
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6 break-words tracking-tight">
                Transform Your IT Support with{" "}
                <motion.span
                  className="text-primary-600 dark:text-primary-400 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  AI Automation
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400 rounded-full"
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
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Reduce ticket resolution time by{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  40%
                </span>
                {" "}and improve team efficiency by{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  60%
                </span>
                {" "}with enterprise-grade AI automation
              </motion.p>
            </motion.div>
          </FadeInDiv>

          <FadeInDiv delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <motion.a
                href="https://app.resolvemeq.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-150"
                aria-label="Get Started"
              >
                Get Started
                <FiArrowRight className="w-4 h-4" />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-150"
                aria-label="Watch Demo"
              >
                <FiPlay className="w-4 h-4" />
                Watch Demo
              </motion.button>
            </div>
          </FadeInDiv>

          <SocialProof />
        </div>

        <div className="md:w-1/2 min-w-0 w-full">
          <AnimatedSphere />
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
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
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
                src="https://www.youtube.com/embed/your-video-id"
                title="Product Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80"
          aria-label="Scroll down"
        >
          <FiChevronDown className="w-8 h-8" />
        </button>
      </motion.div>

      <FloatingActionButton />
    </section>
  );
};

export default Hero;
