import { useState } from "react";
import { trackEvent } from "../utils/analytics";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiHelpCircle,
  FiArrowRight,
  FiUsers,
  FiMessageSquare,
  FiZap,
  FiShield,
  FiCreditCard,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Small teams proving out deflection without a heavy rollout.",
    price: { monthly: 19, annual: 190 },
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
    icon: FiUsers,
    cta: "Start trial",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "The tier most teams land on once volume and expectations grow.",
    price: { monthly: 49, annual: 490 },
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
    icon: FiMessageSquare,
    cta: "Start trial",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Security reviews, custom terms, and the integrations your stack demands.",
    price: { monthly: 99, annual: 990 },
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
    icon: FiZap,
    cta: "Talk to sales",
    popular: false,
  },
];

const tooltips = {
  "Basic AI ticket routing":
    "AI-powered ticket categorization and routing based on content analysis",
  "Advanced AI features":
    "Includes sentiment analysis, intent detection, and automated responses",
  "Custom AI models":
    "Train and deploy custom AI models specific to your organization's needs",
  "Enterprise analytics":
    "Advanced reporting, custom dashboards, and data export capabilities",
};

function perMonthFromAnnualPrice(annualUsd) {
  return Math.round(annualUsd / 12);
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 bg-[#fafafa] dark:bg-[#09090b] overflow-x-hidden border-t border-zinc-200/60 dark:border-zinc-800/80 scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]"
        aria-hidden
      />

      <div className="relative container mx-auto px-4 sm:px-6 min-w-0 max-w-6xl">
        <header className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="type-eyebrow mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="type-section-title mb-5"
          >
            Predictable seats.
            <span className="type-section-title-muted"> No spreadsheet gymnastics.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="type-lede mb-10"
          >
            14-day trial on paid tiers. No card to start. Switch billing cadence whenever your finance
            team stops debating “monthly vs. annual.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 p-1 shadow-inner"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/80 dark:border-zinc-700"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAnnual(true);
                trackEvent("pricing_billing_toggle", { period: "annual" });
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2 ${
                isAnnual
                  ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/80 dark:border-zinc-700"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Annual
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                −15%
              </span>
            </button>
          </motion.div>
        </header>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 max-w-7xl mx-auto min-w-0 items-stretch">
          {pricingPlans.map((plan, idx) => {
            const Icon = plan.icon;
            const annual = plan.price.annual;
            const monthly = plan.price.monthly;
            const displayAmount = isAnnual ? annual : monthly;
            const period = isAnnual ? "year" : "mo";
            const equiv = isAnnual ? perMonthFromAnnualPrice(annual) : null;

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.08 + idx * 0.06 }}
                className={`relative flex flex-col h-full rounded-2xl border bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-7 sm:p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)] ${
                  plan.popular
                    ? "border-primary-500/40 dark:border-primary-500/35 ring-1 ring-primary-500/20 z-[1] md:scale-[1.02] md:-my-1"
                    : "border-zinc-200/90 dark:border-zinc-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-50 dark:bg-primary-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 mb-4">
                    <Icon className="w-5 h-5" aria-hidden />
                  </span>
                  <h3 className="type-card-title">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-4xl sm:text-[2.5rem] font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
                      ${displayAmount}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      /{period}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 tabular-nums">
                      Billed annually · ~${equiv}/mo effective
                    </p>
                  )}
                </div>

                <motion.a
                  href={
                    plan.id === "enterprise"
                      ? "https://app.resolvemeq.net/billing"
                      : "https://app.resolvemeq.net/register"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm mb-6 inline-flex items-center justify-center gap-2 transition-colors ${
                    plan.popular
                      ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {plan.cta}
                  <FiArrowRight className="w-4 h-4 opacity-80" />
                </motion.a>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          <FiCheck className="w-3 h-3" strokeWidth={2.5} />
                        </span>
                      ) : (
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-600">
                          <FiX className="w-3 h-3" />
                        </span>
                      )}
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span
                          className={`text-sm leading-snug text-zinc-700 dark:text-zinc-300 ${
                            !feature.included && "text-zinc-400 line-through decoration-zinc-300 dark:decoration-zinc-600"
                          }`}
                        >
                          {feature.text}
                        </span>
                        {tooltips[feature.text] && (
                          <span className="relative group inline-flex">
                            <FiHelpCircle
                              className="w-3.5 h-3.5 text-zinc-400 cursor-help flex-shrink-0"
                              aria-label="More info"
                            />
                            <span
                              role="tooltip"
                              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs leading-snug text-zinc-700 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                            >
                              {tooltips[feature.text]}
                            </span>
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Payments & billing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-14 md:mt-16 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/60 backdrop-blur-sm p-6 sm:p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-500 mb-6 flex items-center gap-2">
              <FiCreditCard className="w-4 h-4 text-zinc-400" aria-hidden />
              Payments & billing
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 text-sm">
              <div className="flex gap-3">
                <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">14-day trial</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                    No credit card to start
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiCheck className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Secure checkout</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                    Powered by Dodo Payments
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiRefreshCw className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Flexible plans</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                    Upgrade or downgrade in-app
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiDownload className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Invoices & receipts</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                    Download from billing history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise footnote — avoids duplicating full CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/50 px-4 py-3 sm:px-5 sm:py-3.5">
            <FiShield className="w-4 h-4 text-zinc-500 flex-shrink-0" aria-hidden />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-left sm:text-center">
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">Volume, SSO, or custom terms?</span>{" "}
              Enterprise includes deeper security reviews and tailored rollout—
              <a
                href="https://app.resolvemeq.net/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
              >
                open billing
              </a>{" "}
              or talk to sales from there.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
