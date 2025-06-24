import { motion, AnimatePresence } from "framer-motion";
import { FadeInDiv } from "../animations/fadeIn";
import { useState } from "react";
import { FiMail, FiPhone, FiCalendar, FiCheck, FiArrowRight } from "react-icons/fi";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FadeInDiv delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6"
              >
                🚀 Start Your Journey Today
              </motion.div>
            </FadeInDiv>

            <FadeInDiv delay={0.4}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your{" "}
                <span className="relative inline-block">
                  IT Support
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-white"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </span>
                ?
              </h2>
            </FadeInDiv>

            <FadeInDiv delay={0.6}>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join hundreds of companies automating their helpdesk with ResolveMeQ. 
                Get started in minutes, not months.
              </p>
            </FadeInDiv>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Form */}
            <FadeInDiv delay={0.8}>
              <div className="glass-card p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                <AnimatePresence mode="wait">
                  {!isLoading ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                          Work Email
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-white text-sm font-medium mb-2">
                          Company Size
                        </label>
                        <select
                          id="company"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          <option value="" className="bg-gray-800">Select company size</option>
                          <option value="1-50" className="bg-gray-800">1-50 employees</option>
                          <option value="51-200" className="bg-gray-800">51-200 employees</option>
                          <option value="201-500" className="bg-gray-800">201-500 employees</option>
                          <option value="501+" className="bg-gray-800">501+ employees</option>
                        </select>
                      </div>

                      <motion.a
                        href="https://app.resolvemeq.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        <span>Request Demo</span>
                        <FiArrowRight className="w-5 h-5" />
                      </motion.a>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                      <p className="text-white/80">
                        We'll be in touch shortly to schedule your demo.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInDiv>

            {/* Right Column - Benefits */}
            <FadeInDiv delay={1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Quick Setup</h3>
                    <p className="text-white/80">
                      Get started in minutes with our simple integration process. No complex setup required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Dedicated Support</h3>
                    <p className="text-white/80">
                      Our team of experts will guide you through every step of your journey.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/150?img=${i + 10}`}
                          alt="User"
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div className="text-white/80 text-sm">
                      Join <span className="font-bold text-white">500+</span> companies already using ResolveMeQ
                    </div>
                  </div>
                </div>
              </div>
            </FadeInDiv>
          </div>

          <FadeInDiv delay={1.2}>
            <div className="mt-12 text-center">
              <p className="text-white/80">
                Need more information? Contact our sales team at{" "}
                <a
                  href="mailto:sales@resolvemeq.com"
                  className="text-white font-medium hover:underline"
                >
                  sales@resolvemeq.com
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
