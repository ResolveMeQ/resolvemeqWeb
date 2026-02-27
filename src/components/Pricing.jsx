import { useState } from "react";
import { motion } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { FiCheck, FiX, FiHelpCircle, FiArrowRight, FiUsers, FiMessageSquare, FiZap, FiShield, FiStar } from "react-icons/fi";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams",
      price: {
        monthly: 19,
        annual: 190,
      },
      features: [
        { text: "Up to 5 teams", included: true },
        { text: "Up to 10 members", included: true },
        { text: "Basic AI ticket routing", included: true },
        { text: "Email support", included: true },
        { text: "Basic analytics", included: true },
        { text: "Custom branding", included: false },
        { text: "Advanced AI features", included: false },
        { text: "Priority support", included: false },
      ],
      icon: <FiUsers className="w-6 h-6" />,
      cta: "Get Started",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for growing businesses",
      price: {
        monthly: 49,
        annual: 490,
      },
      features: [
        { text: "Up to 20 teams", included: true },
        { text: "Up to 50 members", included: true },
        { text: "Advanced AI ticket routing", included: true },
        { text: "Priority email support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced AI features", included: true },
        { text: "Priority support", included: false },
      ],
      icon: <FiMessageSquare className="w-6 h-6" />,
      cta: "Get Started",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: {
        monthly: 99,
        annual: 990,
      },
      features: [
        { text: "Unlimited teams & members", included: true },
        { text: "Custom AI models", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Enterprise analytics", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced AI features", included: true },
        { text: "Priority support", included: true },
        { text: "API access", included: true },
      ],
      icon: <FiZap className="w-6 h-6" />,
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const tooltips = {
    "Basic AI ticket routing": "AI-powered ticket categorization and routing based on content analysis",
    "Advanced AI features": "Includes sentiment analysis, intent detection, and automated responses",
    "Custom AI models": "Train and deploy custom AI models specific to your organization's needs",
    "Enterprise analytics": "Advanced reporting, custom dashboards, and data export capabilities",
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 min-w-0">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeInDiv delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-primary-900/40 text-indigo-700 dark:text-primary-400 text-sm font-medium mb-6 border border-indigo-200/60 dark:border-transparent"
            >
              Simple, Transparent Pricing
            </motion.div>
          </FadeInDiv>

          <FadeInDiv delay={0.4}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Choose the Perfect Plan for{" "}
              <span className="relative inline-block">
                Your Team
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </h2>
          </FadeInDiv>

          <FadeInDiv delay={0.6}>
            <p className="text-xl text-slate-700 dark:text-gray-400 mb-8">
              Start with a 14-day free trial. No credit card required.
            </p>
          </FadeInDiv>

          {/* Billing Toggle */}
          <FadeInDiv delay={0.8}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                  Annual
                </span>
                <div className="relative group">
                  <FiHelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Save with annual billing
                  </div>
                </div>
              </div>
            </div>
          </FadeInDiv>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto min-w-0">
          {pricingPlans.map((plan) => (
            <FadeInDiv key={plan.id} delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-primary-600 text-white shadow-xl"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <FiStar className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-white/20" : "bg-primary-50"
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? "text-white/80" : "text-slate-700 dark:text-gray-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-slate-700 dark:text-gray-400"}`}>
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className={`text-sm mt-1 ${plan.popular ? "text-white/80" : "text-slate-700 dark:text-gray-400"}`}>
                      Billed annually
                    </p>
                  )}
                </div>

                <motion.a
                  href="https://app.resolvemeq.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 px-6 rounded-xl font-medium text-base mb-8 inline-flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-white text-primary-600 hover:bg-gray-100 shadow-md"
                      : "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-lg border border-primary-700/30 dark:border-primary-400/20"
                  } transition-colors`}
                >
                  {plan.cta}
                  <FiArrowRight className="w-4 h-4" />
                </motion.a>

                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <FiCheck className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? "text-white" : "text-primary-600"
                        }`} />
                      ) : (
                        <FiX className="w-5 h-5 flex-shrink-0 text-gray-400" />
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          plan.popular ? "text-white/90" : "text-slate-700 dark:text-gray-400"
                        }`}>
                          {feature.text}
                        </span>
                        {tooltips[feature.text] && (
                          <div className="relative group">
                            <FiHelpCircle className={`w-4 h-4 ${
                              plan.popular ? "text-white/60" : "text-gray-400"
                            } cursor-help`} />
                            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 ${
                              plan.popular ? "bg-white text-gray-900" : "bg-gray-900 text-white"
                            } text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10`}>
                              {tooltips[feature.text]}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeInDiv>
          ))}
        </div>

        {/* Enterprise Section */}
        <FadeInDiv delay={0.4}>
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FiShield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Need a Custom Solution?</h3>
              </div>
              <p className="text-slate-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Our enterprise plan offers custom AI models, dedicated support, and advanced security features.
                Contact our sales team to discuss your specific requirements.
              </p>
              <motion.a
                href="https://app.resolvemeq.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-lg border border-primary-700/30 dark:border-primary-400/20 transition-colors"
              >
                Contact Sales
                <FiArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </FadeInDiv>
      </div>
    </section>
  );
};

export default Pricing;