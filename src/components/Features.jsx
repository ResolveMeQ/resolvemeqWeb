import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiZap,
  FiUserCheck,
  FiTrendingUp,
  FiCode,
  FiShield,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    title: "Instant Resolution",
    description:
      "AI instantly resolves common IT issues through chat or voice interfaces",
    longDescription: "Our AI-powered system can instantly resolve up to 40% of common IT issues through natural language processing and automated workflows, reducing resolution time from hours to seconds.",
    icon: () => <FiZap className="w-6 h-6" />,
    color: "text-primary-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    stats: "40% faster",
  },
  {
    title: "Smart Escalation",
    description:
      "Automatically escalates complex cases with full context to human agents",
    longDescription: "When an issue requires human intervention, our system automatically escalates it with complete context, ticket history, and suggested solutions, ensuring seamless handoff.",
    icon: () => <FiUserCheck className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    stats: "90% context",
  },
  {
    title: "Continuous Learning",
    description:
      "Improves resolution accuracy by learning from every interaction",
    longDescription: "Our AI continuously learns from every interaction, improving its accuracy and expanding its knowledge base to handle more complex issues over time.",
    icon: () => <FiTrendingUp className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    stats: "15% monthly gain",
  },
  {
    title: "API Integration",
    description: "Seamlessly connects with your existing IT infrastructure",
    longDescription: "Integrate with your existing IT tools, ticketing systems, and knowledge bases through our comprehensive API suite, ensuring a unified support experience.",
    icon: () => <FiCode className="w-6 h-6" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    stats: "50+ integrations",
  },
  {
    title: "Enterprise Security",
    description: "SOC-2 compliant with end-to-end encryption for all data",
    longDescription: "Enterprise-grade security with SOC-2 compliance, end-to-end encryption, and granular access controls to protect your sensitive IT data.",
    icon: () => <FiShield className="w-6 h-6" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    stats: "99.99% uptime",
  },
  {
    title: "Real-time Analytics",
    description: "Track resolution rates and identify recurring issues",
    longDescription: "Comprehensive analytics dashboard providing real-time insights into support metrics, resolution rates, and recurring issues to optimize your IT operations.",
    icon: () => <FiActivity className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    stats: "30+ metrics",
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
      className={`p-6 rounded-lg cursor-pointer transition-all duration-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <motion.div layout className="flex items-start gap-4 min-w-0">
        <motion.div
          layout
          className={`${feature.bgColor} ${feature.color} p-3 rounded-lg flex-shrink-0`}
        >
          {feature.icon()}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.div layout className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <motion.h3 layout className="text-lg font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </motion.h3>
            <motion.div
              layout
              className={`text-xs font-medium px-2 py-1 rounded-md ${feature.bgColor} ${feature.color} flex-shrink-0`}
            >
              {feature.stats}
            </motion.div>
          </motion.div>
          
          <motion.p layout className="text-sm text-gray-600 dark:text-gray-400">
            {feature.description}
          </motion.p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.longDescription}
                </p>
                <motion.a
                  href="https://app.resolvemeq.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1"
                >
                  Learn more
                  <FiArrowRight className="w-4 h-4" />
                </motion.a>
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
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 min-w-0">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Enterprise-Grade Features
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful AI automation combined with enterprise security and seamless integrations
            </p>
          </motion.div>
          
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {filteredFeatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400">No features found matching "{searchTerm}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Features;
