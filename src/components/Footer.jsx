import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiChevronUp,
  FiCheck,
} from "react-icons/fi";

import { subscribeNewsletter } from "../api/subscribeContact";
import { trackEvent } from "../utils/analytics";
import { openCookieConsentUi } from "../consent/cookieConsentStorage";

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
      trackEvent("newsletter_subscribe", { placement: "footer" });
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
        { name: "Solutions", href: "/solutions" },
        { name: "Features", href: "/features" },
        { name: "How It Works", href: "/workflow" },
        { name: "Pricing", href: "/pricing" },
        { name: "Knowledge Base", href: "https://app.resolvemeq.net/knowledge-base", external: true },
        { name: "Go to App", href: "https://app.resolvemeq.net", external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "Newsletter", href: "/newsletter" },
        { name: "Contact", href: "/contact" },
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
    <footer className="relative z-20 bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <section
        id="newsletter"
        aria-labelledby="newsletter-heading"
        className="relative border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/40 overflow-hidden scroll-mt-20"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
          aria-hidden
        />
        <div className="relative container mx-auto px-4 sm:px-6 py-14 md:py-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="type-eyebrow mb-3"
              >
                Newsletter
              </motion.p>
              <motion.h2
                id="newsletter-heading"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="type-section-title mb-4"
              >
                Stay updated
                <span className="type-section-title-muted block sm:inline sm:ml-1">
                  on what we ship
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="type-lede max-w-md"
              >
                Product notes, IT automation ideas, and changelog-style updates—low frequency, no fluff.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="lg:col-span-7"
            >
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500/30 transition-shadow">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative flex-1 flex items-center min-w-0">
                      <FiMail className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" aria-hidden />
                      <input
                        id="footer-newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setSubscribeError(null);
                        }}
                        placeholder="Work email"
                        required
                        disabled={isSubmitting}
                        autoComplete="email"
                        className="w-full pl-10 pr-4 py-3.5 sm:py-3 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm focus:outline-none disabled:opacity-60 border-0"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                      className="shrink-0 px-5 sm:px-6 py-3.5 sm:py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 sm:rounded-none sm:border-l border-zinc-200 dark:border-zinc-800"
                    >
                      <span>{isSubmitting ? "Joining…" : "Subscribe"}</span>
                      <FiArrowRight className="w-4 h-4 opacity-90" />
                    </motion.button>
                  </div>
                  {subscribeError && (
                    <p className="text-sm text-red-600 dark:text-red-400 px-1">{subscribeError}</p>
                  )}
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 px-0.5">
                    No spam. Unsubscribe anytime—we don’t sell addresses.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/80 dark:bg-emerald-950/30 px-5 py-5 flex items-start gap-4"
                  role="status"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400">
                    <FiCheck className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      You’re subscribed
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      Watch your inbox for the next note. Thanks for following along.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

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
                <h3 className="type-card-title">
                  Resolve Me Quickly
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">ResolveMeQ</p>
              </div>
            </div>
            <p className="type-body mb-6 max-w-md">
              Resolve Me Quickly (ResolveMeQ) — AI-powered IT support automation. Reduce ticket resolution time by 40%, improve team efficiency by 60%. Trusted by 500+ companies.
            </p>
            <div className="space-y-2.5">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 min-w-0">
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
                className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/company/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/resolvemeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
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
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 uppercase tracking-wide">
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
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </Link>
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
          className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 min-w-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Resolve Me Quickly (ResolveMeQ). All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => openCookieConsentUi()}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left sm:text-center"
            >
              Cookie settings
            </button>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
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
