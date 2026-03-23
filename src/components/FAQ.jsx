import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

/**
 * Questions & answers must stay in sync with FAQPage JSON-LD in public/index.html.
 */
const FAQ_ITEMS = [
  {
    question: "What is Resolve Me Quickly (ResolveMeQ)?",
    answer:
      "Resolve Me Quickly, short for ResolveMeQ, is an AI-powered IT support automation platform that helps businesses reduce ticket resolution time by 40% and improve team efficiency by 60%. It is trusted by 500+ companies.",
  },
  {
    question: "How does Resolve Me Quickly improve IT support?",
    answer:
      "ResolveMeQ uses AI to intelligently route tickets, suggest solutions, automate repetitive tasks, and provide real-time insights so your support team works faster and more efficiently.",
  },
  {
    question: "Is Resolve Me Quickly (ResolveMeQ) suitable for enterprise?",
    answer:
      "Yes. Resolve Me Quickly is built for enterprise with advanced security, custom integrations, dedicated support, and scalability for large teams and high ticket volumes.",
  },
  {
    question: "Do we have to replace our help desk or ticketing tool?",
    answer:
      "No. ResolveMeQ is designed to sit alongside the systems you already use—ticketing, chat, identity, and knowledge—and to hand work back to them with structured context. Most teams connect first, then expand automation over time.",
  },
  {
    question: "What happens when the 14-day trial ends?",
    answer:
      "You choose a plan and add a payment method when you are ready. Nothing charges automatically until you confirm upgrade in billing. Downgrades and upgrades stay in your control from the app.",
  },
  {
    question: "How is our data handled?",
    answer:
      "Data is encrypted in transit and at rest, with role-based access so only people you authorize see tickets and settings. Enterprise customers can discuss retention, regions, and review artifacts as part of onboarding.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 md:py-28 bg-white dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-800/80 scroll-mt-20 overflow-x-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-3xl">
        <header className="mb-10 md:mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15] mb-4"
          >
            Questions we hear
            <span className="text-zinc-500 dark:text-zinc-400 font-normal"> before a pilot</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto"
          >
            Straight answers—same ones we surface to search engines so there’s no fine print between
            the marketing site and reality.
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const isLast = index === FAQ_ITEMS.length - 1;
            return (
              <div
                key={item.question}
                className={
                  !isLast ? "border-b border-zinc-200/80 dark:border-zinc-800/80" : ""
                }
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    className="w-full flex items-start justify-between gap-4 px-5 py-5 sm:px-6 sm:py-5 text-left transition-colors hover:bg-white/70 dark:hover:bg-zinc-950/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500/40"
                  >
                    <span className="text-[15px] sm:text-base font-medium text-zinc-900 dark:text-zinc-100 leading-snug pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/90 dark:border-zinc-700 bg-white/80 dark:bg-zinc-950/80 text-zinc-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <FiChevronDown className="w-4 h-4" strokeWidth={2.25} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
