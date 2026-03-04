import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiTwitter, 
  FiLinkedin, 
  FiGithub, 
  FiMail, 
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiChevronUp
} from "react-icons/fi";
import { handleHashLink } from "../utils/scrollToSection";

import { subscribeNewsletter } from "../api/subscribeContact";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeError(null);
    setIsSubmitting(true);
    const result = await subscribeNewsletter(email.trim());
    setIsSubmitting(false);
    if (result.ok) {
      setEmail("");
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
    } else if (result.error === "API not configured") {
      setEmail("");
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
    } else {
      setSubscribeError(result.error || "Something went wrong. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#workflow" },
        { name: "Pricing", href: "#pricing" },
        { name: "Knowledge Base", href: "https://app.resolvemeq.net/knowledge-base", external: true },
        { name: "Go to App", href: "https://app.resolvemeq.net", external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#contact" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <FiMapPin className="w-4 h-4" />,
      text: "123 Innovation Street, Tech City, TC 12345",
    },
    {
      icon: <FiPhone className="w-4 h-4" />,
      text: "+237 681 775 574",
    },
    {
      icon: <FiMail className="w-4 h-4" />,
      text: "contact@resolvemeq.net",
    },
  ];

  return (
    <footer className="relative z-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-primary-600 dark:bg-primary-700 text-white py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold mb-3 tracking-tight">Stay Updated</h2>
              <p className="text-white/90 text-sm">
                Subscribe to our newsletter for the latest updates and insights
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10"
            >
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubscribeError(null); }}
                  placeholder="you@company.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm disabled:opacity-70"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="px-5 py-2.5 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm disabled:opacity-70"
              >
                <span>{isSubmitting ? "Subscribing…" : "Subscribe"}</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>

            {subscribeError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-white/90 text-sm">
                {subscribeError}
              </motion.p>
            )}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white/90 text-sm"
              >
                Thanks for subscribing!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 min-w-0 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 min-w-0"
          >
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="Resolve Me Quickly - ResolveMeQ"
                className="h-8 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Resolve Me Quickly
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">ResolveMeQ</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Resolve Me Quickly (ResolveMeQ) — AI-powered IT support automation. Reduce resolution time by 40%, improve team efficiency. Trusted by 500+ companies.
            </p>
            <div className="space-y-2.5">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 min-w-0">
                  {info.icon}
                  <span className="break-words">{info.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="https://twitter.com/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/company/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://github.com/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
            </div>
          </motion.div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ) : link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 min-w-0"
        >
          <div className="flex items-center gap-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Resolve Me Quickly (ResolveMeQ). All rights reserved.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <FiChevronUp size={18} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
