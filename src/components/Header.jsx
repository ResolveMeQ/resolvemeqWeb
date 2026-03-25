import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiChevronDown, FiLogIn, FiUserPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { navigateToSolutionsTab } from "../utils/scrollToSection";
import { trackEvent } from "../utils/analytics";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      name: "Product",
      dropdown: [
        { name: "Features", to: "/features" },
        { name: "How It Works", to: "/workflow" },
        { name: "Pricing", to: "/pricing" },
      ],
    },
    {
      name: "Solutions",
      dropdown: [
        { name: "By industry", to: "/solutions", tab: "industry" },
        { name: "By team", to: "/solutions", tab: "team" },
        { name: "Household", to: "/solutions", tab: "household" },
        { name: "Individual", to: "/solutions", tab: "individual" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      data-theme={theme}
      data-scrolled={isScrolled}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-sm border-b border-zinc-200 dark:border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 min-w-0">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <motion.img
              src="/assets/logo.png"
              alt="Resolve Me Quickly - ResolveMeQ"
              className="h-8 w-auto object-contain"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            />
            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              ResolveMeQ
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownClick(index)}
                      className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                      <FiChevronDown className={`w-4 h-4 transform transition-transform ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.to}
                              onClick={(e) => {
                                if (subItem.tab) {
                                  e.preventDefault();
                                  navigateToSolutionsTab(subItem.tab, navigate);
                                }
                                setActiveDropdown(null);
                              }}
                              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.href ? (
                  <Link to={item.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ) : item.to ? (
                  <Link to={item.to}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            <motion.a
              href="https://app.resolvemeq.net/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              <FiLogIn className="w-4 h-4" />
              <span>Log in</span>
            </motion.a>

            <motion.a
              href="https://app.resolvemeq.net/signup"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_get_started", { placement: "header", destination: "signup" })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-150"
            >
              <FiUserPlus className="w-4 h-4" />
              <span>Get Started</span>
            </motion.a>
          </div>

          <div className="flex lg:hidden items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            <button
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white dark:bg-zinc-900 rounded-lg mt-4 shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDropdownClick(navItems.indexOf(item))}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          {item.name}
                          <FiChevronDown className={`w-4 h-4 transform transition-transform ${
                            activeDropdown === navItems.indexOf(item) ? "rotate-180" : ""
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === navItems.indexOf(item) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.to}
                                  onClick={(e) => {
                                    if (subItem.tab) {
                                      e.preventDefault();
                                      navigateToSolutionsTab(subItem.tab, navigate);
                                    }
                                    setIsOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                  className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.href ? (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ) : item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <a
                  href="https://app.resolvemeq.net/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Log in</span>
                </a>
                <a
                  href="https://app.resolvemeq.net/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cta_get_started", { placement: "header_mobile", destination: "signup" })}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-150"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
