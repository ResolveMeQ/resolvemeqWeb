import { motion } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";

/** Copy matches FAQPage JSON-LD in public/index.html for search guideline alignment. */
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
];

const FAQ = () => (
  <section
    id="faq"
    aria-labelledby="faq-heading"
    className="py-20 bg-slate-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
  >
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <FadeInDiv delay={0.1}>
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4"
        >
          Frequently asked questions
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-sm sm:text-base">
          Quick answers about Resolve Me Quickly and how it fits your team.
        </p>
      </FadeInDiv>

      <dl className="space-y-6">
        {FAQ_ITEMS.map((item, index) => (
          <FadeInDiv key={item.question} delay={0.15 + index * 0.08}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <dt className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.question}
              </dt>
              <dd className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.answer}
              </dd>
            </motion.div>
          </FadeInDiv>
        ))}
      </dl>
    </div>
  </section>
);

export default FAQ;
