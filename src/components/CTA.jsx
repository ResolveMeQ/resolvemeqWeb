import { motion, AnimatePresence } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formAction = process.env.REACT_APP_FORMSPREE_ID
    ? `https://formspree.io/f/${process.env.REACT_APP_FORMSPREE_ID}`
    : "#";

  const handleSubmit = (e) => {
    if (!process.env.REACT_APP_FORMSPREE_ID) {
      e.preventDefault();
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = "https://app.resolvemeq.net";
      }, 2000);
      return;
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative min-w-0">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <FadeInDiv delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-sm text-white text-xs font-medium mb-6 border border-white/20"
              >
                <FiZap className="w-3.5 h-3.5" />
                Start Your Journey Today
              </motion.div>
            </FadeInDiv>

            <FadeInDiv delay={0.4}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to Transform Your IT Support?
              </h2>
            </FadeInDiv>

            <FadeInDiv delay={0.6}>
              <p className="text-base text-white/90 mb-10 max-w-2xl mx-auto">
                Join 500+ companies automating their helpdesk with ResolveMeQ. Get started in minutes.
              </p>
            </FadeInDiv>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <FadeInDiv delay={0.8}>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      action={formAction}
                      method="POST"
                      className="space-y-5"
                    >
                      <input
                        type="hidden"
                        name="_next"
                        value="https://app.resolvemeq.net"
                      />
                      <input type="hidden" name="_subject" value="ResolveMeQ demo request" />
                      <div>
                        <label htmlFor="email" className="block text-white text-xs font-medium mb-2 uppercase tracking-wide">
                          Work Email
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-white text-xs font-medium mb-2 uppercase tracking-wide">
                          Company Size
                        </label>
                        <select
                          id="company"
                          name="company_size"
                          required
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          <option value="" className="bg-gray-800">Select company size</option>
                          <option value="1-50" className="bg-gray-800">1-50 employees</option>
                          <option value="51-200" className="bg-gray-800">51-200 employees</option>
                          <option value="201-500" className="bg-gray-800">201-500 employees</option>
                          <option value="501+" className="bg-gray-800">501+ employees</option>
                        </select>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-md"
                      >
                        <span>Request Demo</span>
                        <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                      <p className="text-white/80 text-sm">
                        We'll be in touch shortly to schedule your demo. Redirecting you to the app...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInDiv>

            <FadeInDiv delay={1}>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Quick Setup</h3>
                    <p className="text-sm text-white/80">
                      Get started in minutes with our simple integration process
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Dedicated Support</h3>
                    <p className="text-sm text-white/80">
                      Our team of experts will guide you through every step
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/150?img=${i + 10}`}
                          alt={`Customer ${i}`}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div className="text-white/90 text-sm">
                      <span className="font-semibold text-white">500+</span> companies trust ResolveMeQ
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <FiCheck className="w-3.5 h-3.5" />
                    14-day free trial · No credit card required
                  </div>
                </div>
              </div>
            </FadeInDiv>
          </div>

          <FadeInDiv delay={1.2}>
            <div className="mt-12 text-center">
              <p className="text-sm text-white/80">
                Need more information? Contact our sales team at{" "}
                <a
                  href="mailto:sales@resolvemeq.net"
                  className="text-white font-medium hover:underline"
                >
                  sales@resolvemeq.net
                </a>
              </p>
            </div>
          </FadeInDiv>
        </div>
      </div>
    </section>
  );
};

export default CTA;
