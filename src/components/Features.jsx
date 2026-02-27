import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiZap,
  FiUserCheck,
  FiTrendingUp,
  FiCode,
  FiShield,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";

const features = [
  {
    title: "Instant Resolution",
    description:
      "AI instantly resolves common IT issues through chat or voice interfaces.",
    longDescription: "Our AI-powered system can instantly resolve up to 40% of common IT issues through natural language processing and automated workflows, reducing resolution time from hours to seconds.",
    icon: () => <FiZap className="w-8 h-8" />,
    color: "text-primary-600",
    stats: "40% faster resolution",
  },
  {
    title: "Smart Escalation",
    description:
      "Automatically escalates complex cases with full context to human agents.",
    longDescription: "When an issue requires human intervention, our system automatically escalates it with complete context, ticket history, and suggested solutions, ensuring seamless handoff.",
    icon: () => <FiUserCheck className="w-8 h-8" />,
    color: "text-secondary-500",
    stats: "90% context retention",
  },
  {
    title: "Continuous Learning",
    description:
      "Improves resolution accuracy by learning from every interaction.",
    longDescription: "Our AI continuously learns from every interaction, improving its accuracy and expanding its knowledge base to handle more complex issues over time.",
    icon: () => <FiTrendingUp className="w-8 h-8" />,
    color: "text-accent-500",
    stats: "15% monthly improvement",
  },
  {
    title: "API Integration",
    description: "Seamlessly connects with your existing IT infrastructure.",
    longDescription: "Integrate with your existing IT tools, ticketing systems, and knowledge bases through our comprehensive API suite, ensuring a unified support experience.",
    icon: () => <FiCode className="w-8 h-8" />,
    color: "text-indigo-500",
    stats: "50+ integrations",
  },
  {
    title: "Enterprise Security",
    description: "SOC-2 compliant with end-to-end encryption for all data.",
    longDescription: "Enterprise-grade security with SOC-2 compliance, end-to-end encryption, and granular access controls to protect your sensitive IT data.",
    icon: () => <FiShield className="w-8 h-8" />,
    color: "text-green-500",
    stats: "99.99% uptime",
  },
  {
    title: "Real-time Analytics",
    description: "Track resolution rates and identify recurring issues.",
    longDescription: "Comprehensive analytics dashboard providing real-time insights into support metrics, resolution rates, and recurring issues to optimize your IT operations.",
    icon: () => <FiActivity className="w-8 h-8" />,
    color: "text-purple-500",
    stats: "30+ metrics tracked",
  },
];

const FeatureCard = ({ feature, isExpanded, onClick, index }) => {
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
          className={`${feature.color} p-4 rounded-lg bg-gray-100 dark:bg-white/10 flex-shrink-0`}
        >
          {feature.icon()}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.div layout className="flex flex-wrap items-center justify-between gap-2">
            <motion.h3 layout className="text-xl font-bold text-gray-900 dark:text-white">
              {feature.title}
            </motion.h3>
            <motion.div
              layout
              className={`text-sm font-medium flex-shrink-0 ${feature.color}`}
            >
              {feature.stats}
            </motion.div>
          </motion.div>
          
          <motion.p layout className="text-gray-700 dark:text-gray-300 mt-2">
            {feature.description}
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
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.longDescription}
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

const Features = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 min-w-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Modern IT Support
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with intuitive design
            to revolutionize your IT support experience.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              isExpanded={expandedFeature === index}
              onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
