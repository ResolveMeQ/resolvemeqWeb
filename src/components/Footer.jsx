import { motion } from "framer-motion";
import { useState } from "react";
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

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
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
        { name: "Go to App", href: "https://app.resolvemeq.net", external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#contact" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#contact" },
        { name: "Terms of Service", href: "#contact" },
        { name: "Cookie Policy", href: "#contact" },
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
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-primary-600 dark:bg-primary-700 text-white py-12">
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
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                <span>Subscribe</span>
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>

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

      <div className="container mx-auto px-4 sm:px-6 py-12 min-w-0">
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
                alt="ResolveMeQ"
                className="h-8 w-auto object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                ResolveMeQ
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Enterprise AI-powered IT support automation. Transform your support experience with intelligent solutions.
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
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/company/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://github.com/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
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
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
              © {new Date().getFullYear()} ResolveMeQ. All rights reserved.
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
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
