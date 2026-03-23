import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";
import { submitContactRequest } from "../api/subscribeContact";
import { trackEvent } from "../utils/analytics";

const highlights = [
  {
    icon: FiCalendar,
    title: "Live in days, not quarters",
    text: "Connect ticketing and knowledge first—expand automation as you gain confidence.",
  },
  {
    icon: FiPhone,
    title: "Humans stay in the loop",
    text: "Escalations land with context so tier-2 isn’t interviewing from scratch.",
  },
];

const CTA = () => {
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const useContactApi = !!process.env.REACT_APP_CONTACT_API_URL;
  const formAction = !useContactApi && process.env.REACT_APP_FORMSPREE_ID
    ? `https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_ID}`
    : "#";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (useContactApi) {
      setSubmitError(null);
      setIsSubmitting(true);
      const result = await submitContactRequest(email.trim(), companySize);
      setIsSubmitting(false);
      if (result.ok || result.error === "API not configured") {
        trackEvent("contact_form_submit", { method: "api" });
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = "https://app.resolvemeq.net";
        }, 2000);
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.");
      }
      return;
    }
    if (!process.env.REACT_APP_FORMSPREE_ID) {
      trackEvent("contact_form_submit", { method: "demo_redirect" });
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = "https://app.resolvemeq.net";
      }, 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-20"
    >
      {/* Canvas — deep neutral + restrained brand light (Vercel / Linear-style closer) */}
      <div
        className="absolute inset-0 bg-zinc-950 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgb(37_99_235/0.22),transparent)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,rgb(37_99_235/0.28),transparent)] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none opacity-40"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,56rem)] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 min-w-0 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center">
          {/* Copy */}
          <div className="lg:col-span-5 xl:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-4"
            >
              Get started
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-semibold text-white tracking-tight leading-[1.12] mb-6"
            >
              Ready to transform{" "}
              <span className="text-zinc-400 font-normal block sm:inline sm:ml-1">
                your IT support?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg"
            >
              Start a trial on your own timeline—or drop your work email and we’ll route you to the
              right next step. No spam, no twenty-field forms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10"
            >
              <a
                href="https://app.resolvemeq.net/register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_get_started", { placement: "contact_section", destination: "register" })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-colors shadow-lg shadow-black/20"
              >
                Open the app
                <FiExternalLink className="w-4 h-4 opacity-70" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Compare plans
                <FiArrowRight className="w-4 h-4 opacity-80" />
              </a>
            </motion.div>

            <ul className="space-y-6">
              {highlights.map(({ icon: Icon, title, text }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex gap-4"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300">
                    <Icon className="w-5 h-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-8 text-xs text-zinc-600"
            >
              14-day trial · No card to start · Cancel anytime from billing
            </motion.p>
          </div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="lg:col-span-7 xl:col-span-6 w-full"
          >
            <div className="rounded-2xl border border-zinc-200/10 bg-white p-6 sm:p-8 md:p-9 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] dark:bg-zinc-100">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">
                  Request a walkthrough
                </h3>
                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                  We’ll use this to personalize your demo—not to add you to a generic nurture stream.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    action={useContactApi ? undefined : formAction}
                    method={useContactApi ? "post" : "POST"}
                    className="space-y-5"
                  >
                    {!useContactApi && (
                      <>
                        <input type="hidden" name="_next" value="https://app.resolvemeq.net" />
                        <input type="hidden" name="_subject" value="ResolveMeQ demo request" />
                      </>
                    )}
                    {submitError && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {submitError}
                      </p>
                    )}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2"
                      >
                        Work email
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                          disabled={isSubmitting}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500/40 transition-shadow disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2"
                      >
                        Company size
                      </label>
                      <select
                        id="company"
                        name="company_size"
                        required
                        value={companySize}
                        onChange={(e) => {
                          setCompanySize(e.target.value);
                          setSubmitError(null);
                        }}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500/40 disabled:opacity-60"
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1–50</option>
                        <option value="51-200">51–200</option>
                        <option value="201-500">201–500</option>
                        <option value="501+">501+</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-60 shadow-sm"
                    >
                      <span>{isSubmitting ? "Sending…" : "Request demo"}</span>
                      <FiArrowRight className="w-4 h-4 opacity-90" />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="text-center py-10 px-2"
                  >
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <FiCheck className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">You’re on the list</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs mx-auto">
                      We’ll follow up shortly. Redirecting you to the app…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center lg:text-left space-y-2 text-sm text-zinc-500"
            >
              <p>
                Prefer to self-serve?{" "}
                <a
                  href="https://app.resolvemeq.net/knowledge-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white font-medium underline underline-offset-2 decoration-white/20 hover:decoration-white/40"
                >
                  Browse the knowledge base
                </a>{" "}
                — no signup.
              </p>
              <p>
                Sales:{" "}
                <a
                  href="mailto:sales@resolvemeq.net"
                  className="text-zinc-300 hover:text-white font-medium underline underline-offset-2 decoration-white/20 hover:decoration-white/40"
                >
                  sales@resolvemeq.net
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
