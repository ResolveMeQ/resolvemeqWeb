import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import {
  FiMessageSquare,
  FiSearch,
  FiCheckCircle,
  FiChevronDown,
  FiCheck,
  FiClock,
  FiUsers,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Submit Your Issue",
    description: "Describe your IT problem through chat or voice interface.",
    longDescription: "Start by describing your IT issue through our intuitive chat interface or voice command system. Our AI understands natural language and can handle multiple issues simultaneously.",
    icon: () => <FiMessageSquare className="w-8 h-8" />,
    stats: "2 min average submission",
    color: "text-primary-600",
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Our AI analyzes the issue and searches for solutions.",
    longDescription: "Our advanced AI system analyzes your issue, searches through our knowledge base, and identifies the most relevant solutions based on similar past cases and best practices.",
    icon: () => <FiSearch className="w-8 h-8" />,
    stats: "5 sec average analysis",
    color: "text-secondary-500",
  },
  {
    id: 3,
    title: "Instant Resolution",
    description: "Get immediate resolution or smart escalation to human agents.",
    longDescription: "Receive instant resolution for common issues or get seamlessly escalated to human agents with full context when needed. Our system ensures no information is lost during handoff.",
    icon: () => <FiCheckCircle className="w-8 h-8" />,
    stats: "40% instant resolution rate",
    color: "text-accent-500",
  },
];

const StepCard = ({ step, isExpanded, onClick, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={`p-8 rounded-xl cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg dark:shadow-none ${
        isExpanded ? "md:col-span-2" : ""
      }`}
    >
      <motion.div layout className="flex items-start gap-6 min-w-0">
        <motion.div
          layout
          className={`${step.color} p-4 rounded-lg bg-gray-100 dark:bg-white/10 flex-shrink-0`}
        >
          {step.icon()}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.div layout className="flex flex-wrap items-center justify-between gap-2">
            <motion.h3 layout className="text-xl font-bold text-gray-900 dark:text-white">
              {step.title}
            </motion.h3>
            <motion.div
              layout
              className={`text-sm font-medium flex-shrink-0 ${step.color}`}
            >
              {step.stats}
            </motion.div>
          </motion.div>
          
          <motion.p layout className="text-gray-700 dark:text-gray-300 mt-2">
            {step.description}
          </motion.p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300">
                  {step.longDescription}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-primary-600 dark:text-primary-400 font-medium flex items-center gap-2"
                >
                  Learn more
                  <FiChevronDown className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Workflow = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="workflow" className="py-20 bg-gray-50 dark:bg-gray-900 overflow-x-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How ResolveMeQ Works
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A seamless, AI-powered workflow that transforms IT support
          </p>
        </motion.div>

        <div className="relative">
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                isExpanded={activeStep === index}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 sm:gap-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-full">
            <div className="flex items-center gap-2 min-w-0">
              <FiClock className="w-5 h-5 text-indigo-600 dark:text-primary-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">Avg. Resolution Time: 15min</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <FiUsers className="w-5 h-5 text-indigo-600 dark:text-primary-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">10,000+ Users Supported</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <FiCheck className="w-5 h-5 text-indigo-600 dark:text-primary-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">98% Satisfaction Rate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
