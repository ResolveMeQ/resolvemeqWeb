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
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 min-w-0">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeInDiv delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-medium mb-6 border border-primary-200 dark:border-primary-800/50"
            >
              Simple, Transparent Pricing
            </motion.div>
          </FadeInDiv>

          <FadeInDiv delay={0.4}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Choose the Perfect Plan
            </h2>
          </FadeInDiv>

          <FadeInDiv delay={0.6}>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
              Start with a 14-day free trial. No credit card required.
            </p>
          </FadeInDiv>

          <FadeInDiv delay={0.8}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                  Annual
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Save 15%</span>
              </div>
            </div>
          </FadeInDiv>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto min-w-0">
          {pricingPlans.map((plan, idx) => (
            <FadeInDiv key={plan.id} delay={0.2 + idx * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-lg p-8 h-full flex flex-col ${
                  plan.popular
                    ? "bg-primary-600 text-white shadow-lg ring-2 ring-primary-500"
                    : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-sm">
                      <FiStar className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-white/20" : "bg-primary-50 dark:bg-primary-900/20"
                  }`}>
                    <span className={plan.popular ? "text-white" : "text-primary-600 dark:text-primary-400"}>
                      {plan.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                      /{isAnnual ? "year" : "mo"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className={`text-xs mt-1 ${plan.popular ? "text-white/70" : "text-gray-500 dark:text-gray-500"}`}>
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
                  className={`w-full py-3 px-6 rounded-lg font-medium text-sm mb-6 inline-flex items-center justify-center gap-2 transition-all duration-150 ${
                    plan.popular
                      ? "bg-white text-primary-600 hover:bg-gray-50 shadow-md"
                      : "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-sm"
                  }`}
                >
                  {plan.cta}
                  <FiArrowRight className="w-4 h-4" />
                </motion.a>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <FiCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.popular ? "text-white" : "text-green-600 dark:text-green-400"
                        }`} />
                      ) : (
                        <FiX className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          plan.popular ? "text-white/90" : "text-gray-700 dark:text-gray-300"
                        } ${!feature.included && "line-through opacity-50"}`}>
                          {feature.text}
                        </span>
                        {tooltips[feature.text] && (
                          <div className="relative group">
                            <FiHelpCircle className={`w-3.5 h-3.5 ${
                              plan.popular ? "text-white/60" : "text-gray-400"
                            } cursor-help`} />
                            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 ${
                              plan.popular ? "bg-white text-gray-900" : "bg-gray-900 text-white"
                            } text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg pointer-events-none`}>
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

        <FadeInDiv delay={0.4}>
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 md:p-10 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <FiShield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Need a Custom Solution?</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Our enterprise plan offers custom AI models, dedicated support, and advanced security features. Contact our sales team to discuss your specific requirements.
              </p>
              <motion.a
                href="https://app.resolvemeq.net"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 shadow-md transition-all duration-150"
              >
                Contact Sales
                <FiArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </FadeInDiv>
      </div>
    </section>
  );
};

export default Pricing;
