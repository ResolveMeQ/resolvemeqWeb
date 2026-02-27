import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon, FiChevronDown, FiLogIn, FiUserPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      name: "Product",
      href: "/#features",
      dropdown: [
        { name: "Features", href: "/#features" },
        { name: "How It Works", href: "/#workflow" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Testimonials", href: "/#testimonials" },
      ],
    },
    {
      name: "Solutions",
      href: "/#pricing",
      dropdown: [
        { name: "Starter", href: "/#pricing" },
        { name: "Pro", href: "/#pricing" },
        { name: "Enterprise", href: "/#pricing" },
      ],
    },
    { name: "Contact", href: "/#contact" },
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
          ? theme === 'light'
            ? "bg-slate-900 shadow-lg border-b border-slate-800"
            : "bg-white dark:bg-gray-900/95 backdrop-blur-sm shadow-md dark:shadow-lg border-b border-gray-200 dark:border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 min-w-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <motion.img
              src="/assets/logo.png"
              alt="ResolveMeQ"
              className="h-8 sm:h-9 w-auto object-contain"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            />
            <span className="logo-text text-xl sm:text-2xl font-bold inline bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              ResolveMeQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownClick(index)}
                      className="flex items-center gap-1 font-medium dark:text-gray-200 hover:text-indigo-400 dark:hover:text-primary-400 transition-colors"
                      style={
                        theme === 'light'
                          ? isScrolled
                            ? { color: '#fff' }
                            : { color: '#0f172a' }
                          : undefined
                      }
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
                          className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                            theme === 'light' && isScrolled
                              ? "bg-slate-800 border border-slate-700"
                              : "bg-white dark:bg-gray-800"
                          }`}
                        >
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 transition-colors ${
                                theme === 'light' && isScrolled
                                  ? "text-slate-200 hover:bg-slate-700 hover:text-white"
                                  : "dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                              style={
                                theme === 'light' && !isScrolled
                                  ? { color: '#0f172a' }
                                  : undefined
                              }
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-medium dark:text-gray-200 hover:text-indigo-400 dark:hover:text-primary-400 transition-colors"
                    style={
                      theme === 'light'
                        ? isScrolled
                          ? { color: '#fff' }
                          : { color: '#0f172a' }
                        : undefined
                    }
                  >
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={
                theme === 'light'
                  ? isScrolled
                    ? { color: '#fff' }
                    : { color: '#0f172a' }
                  : undefined
              }
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            <motion.a
              href="https://app.resolvemeq.net/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                theme === 'light'
                  ? isScrolled
                    ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  : "dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <FiLogIn className="w-4 h-4" />
              <span>Log in</span>
            </motion.a>

            <motion.a
              href="https://app.resolvemeq.net/signup"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 px-5 py-3"
            >
              <FiUserPlus className="w-4 h-4" />
              <span>Get Started</span>
            </motion.a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={
                theme === 'light'
                  ? isScrolled
                    ? { color: '#fff' }
                    : { color: '#0f172a' }
                  : undefined
              }
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            <button
              className="p-2 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={
                theme === 'light'
                  ? isScrolled
                    ? { color: '#fff' }
                    : { color: '#0f172a' }
                  : undefined
              }
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 rounded-lg mt-4 shadow-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDropdownClick(navItems.indexOf(item))}
                          className="flex items-center justify-between w-full px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
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
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <a
                  href="https://app.resolvemeq.net/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Log in</span>
                </a>
                <a
                  href="https://app.resolvemeq.net/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 btn-primary rounded-xl"
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
