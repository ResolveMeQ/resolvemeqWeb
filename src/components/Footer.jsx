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
  FiGlobe,
  FiChevronUp
} from "react-icons/fi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
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
        { name: "Features", href: "/#features" },
        { name: "How It Works", href: "/#workflow" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Go to App", href: "https://app.resolvemeq.net", external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Contact", href: "/#contact" },
        { name: "About", href: "/#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Contact", href: "/#contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Go to App", href: "https://app.resolvemeq.net", external: true },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <FiMapPin className="w-5 h-5" />,
      text: "123 Innovation Street, Tech City, TC 12345",
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      text: "+237 681 775 574",
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      text: "contact@resolvemeq.net",
    },
    {
      icon: <FiGlobe className="w-5 h-5" />,
      text: "www.resolvemeq.net",
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-indigo-600 dark:bg-primary-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-4">Stay Updated with ResolveMeQ</h2>
              <p className="text-white/80 text-lg">
                Subscribe to our newsletter for the latest updates, tips, and insights.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-md border border-gray-200/50"
              >
                <span>Subscribe</span>
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.form>

            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white/80"
              >
                Thanks for subscribing! We'll keep you updated.
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/assets/logo.png"
                alt="ResolveMeQ"
                className="h-10 w-auto object-contain"
              />
              <h3 className="logo-text text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                ResolveMeQ
              </h3>
            </div>
            <p className="text-slate-700 dark:text-gray-400 mb-6 max-w-md break-words">
              Empowering IT teams with AI-driven helpdesk automation. Transform your support experience with intelligent solutions.
            </p>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-700 dark:text-gray-400 break-words min-w-0">
                  {info.icon}
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://twitter.com"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-700 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-700 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://github.com"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-700 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 py-1.5 pr-2 rounded-md text-slate-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-primary-600 transition-colors shrink-0" />
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 py-1.5 pr-2 rounded-md text-slate-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-primary-600 transition-colors shrink-0" />
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 min-w-0"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 min-w-0">
            <p className="text-gray-500 text-center md:text-left text-sm sm:text-base">
              © {new Date().getFullYear()} ResolveMeQ. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 min-w-0">
              <a
                href="/privacy"
                className="py-2 px-1 rounded-md text-slate-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer active:scale-[0.98]"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="py-2 px-1 rounded-md text-slate-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer active:scale-[0.98]"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="py-2 px-1 rounded-md text-slate-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer active:scale-[0.98]"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-700 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <FiChevronUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
