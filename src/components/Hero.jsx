import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useInView } from "react-intersection-observer";
import { FiPlay, FiArrowRight, FiChevronDown } from "react-icons/fi";

const AnimatedSphere = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-[300px] md:h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color={theme === 'dark' ? "#6366F1" : "#4F46E5"}
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
    className="flex items-center gap-6 mt-8"
  >
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((i) => (
        <motion.img
          key={i}
          src={`https://i.pravatar.cc/150?img=${i + 10}`}
          alt={`User ${i}`}
          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
          whileHover={{ scale: 1.2, zIndex: 1 }}
        />
      ))}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400">
      <span className="font-semibold text-primary-600 dark:text-primary-400">500+</span> companies trust us
    </div>
  </motion.div>
);

const FloatingActionButton = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg z-50"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
  >
    <FiArrowRight className="w-6 h-6" />
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
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: theme === 'dark' ? "#6366F1" : "#4F46E5" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 150,
        color: theme === 'dark' ? "#6366F1" : "#4F46E5",
        opacity: 0.2,
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
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center pt-20 md:pt-0 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          ${theme === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.15)'}, 
          transparent 50%)`,
      }}
    >
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
        className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10"
      >
        <div className="md:w-1/2">
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
                className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
              >
                🚀 The Future of IT Support
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                Transform Your IT Support with{" "}
                <motion.span
                  className="text-primary-600 dark:text-primary-400 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  AI
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400"
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
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10"
              >
                Resolve Me Quick automates{" "}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  40%+
                </span>{" "}
                of repetitive IT tickets, freeing your team to focus on what matters
              </motion.p>
            </motion.div>
          </FadeInDiv>

          <SocialProof />

          <FadeInDiv delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.a
                href="https://app.resolvemeq.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group"
                aria-label="Get Started"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow relative overflow-hidden group"
                aria-label="Watch Demo"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiPlay className="w-5 h-5" />
                  Watch Demo
                </span>
              </motion.button>
            </div>
          </FadeInDiv>
        </div>

        <div className="md:w-1/2">
          <AnimatedSphere />
        </div>
      </motion.div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
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
          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
