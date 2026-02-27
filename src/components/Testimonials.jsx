import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare, FiTrendingUp, FiUsers } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechCorp Inc.",
    content: "ResolveMeQ has transformed our IT support operations. The AI-powered system handles 40% of our tickets instantly, and the smart escalation ensures our team focuses on complex issues.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metrics: {
      resolutionTime: "75% faster",
      satisfaction: "95% satisfaction",
      costReduction: "40% lower costs",
    },
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateTech",
    content: "The integration was seamless, and the results were immediate. Our support team is now more efficient, and our employees get faster resolutions to their IT issues.",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metrics: {
      resolutionTime: "60% faster",
      satisfaction: "92% satisfaction",
      costReduction: "35% lower costs",
    },
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "IT Manager",
    company: "Global Solutions",
    content: "The AI's ability to understand and resolve complex issues is impressive. It's like having an additional team member who's available 24/7.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    metrics: {
      resolutionTime: "80% faster",
      satisfaction: "98% satisfaction",
      costReduction: "45% lower costs",
    },
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`relative h-full flex flex-col p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
        isActive 
          ? "bg-white dark:bg-slate-800 shadow-xl dark:shadow-2xl dark:shadow-black/20 ring-2 ring-indigo-500/30 dark:ring-indigo-400/40 scale-[1.02]" 
          : "bg-white/90 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200 dark:border-slate-700/80 hover:shadow-lg dark:hover:border-slate-600"
      }`}
    >
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-indigo-400/20 dark:text-indigo-400/15">
        <FiMessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        <div className="flex-shrink-0 flex items-center gap-4 sm:block">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-md"
            />
            {isActive && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-indigo-500 dark:bg-indigo-400 rounded-full p-1.5 shadow-lg">
                <FiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-amber-400 sm:hidden">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="hidden sm:flex items-center gap-0.5 text-amber-400 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            "{testimonial.content}"
          </blockquote>
          
          <div className="mb-4 sm:mb-6">
            <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
          
          <div className="mt-auto grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
            {Object.entries(testimonial.metrics).map(([key, value]) => (
              <div key={key} className="text-center py-2 px-2 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/50">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-300 mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4 border border-indigo-500/20 dark:border-indigo-400/20">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
            Trusted by IT Leaders
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join hundreds of companies that have transformed their IT support with ResolveMeQ
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl border border-gray-200 dark:border-slate-600/80 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all z-10 hover:scale-105"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={current === index}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl border border-gray-200 dark:border-slate-600/80 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all z-10 hover:scale-105"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 sm:mt-10 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrent(index);
                }}
                className={`rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-indigo-500 dark:bg-indigo-400 w-8 sm:w-10 h-2 sm:h-2.5 shadow-sm" 
                    : "bg-gray-300 dark:bg-slate-600 w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-gray-400 dark:hover:bg-slate-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 p-6 sm:p-8 bg-white dark:bg-slate-800/80 rounded-2xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-slate-700/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 dark:border-indigo-400/20">
                <FiUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">500+ Companies</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 dark:border-indigo-400/20">
                <FiTrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">45% Avg. Ticket Reduction</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 dark:border-indigo-400/20">
                <FiStar className="w-5 h-5 text-amber-400 dark:text-amber-400 fill-amber-400" />
              </div>
              <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">4.9/5 Customer Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
