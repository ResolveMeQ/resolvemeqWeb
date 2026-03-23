import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  applyGtagConsent,
  CONSENT_ANALYTICS,
  CONSENT_ESSENTIAL,
  COOKIE_CONSENT_OPEN_EVENT,
  getStoredConsent,
  setStoredConsent,
} from "../consent/cookieConsentStorage";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  useEffect(() => {
    const onOpen = () => setVisible(true);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
  }, []);

  const choose = useCallback((choice) => {
    setStoredConsent(choice);
    applyGtagConsent(choice);
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-desc"
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-3xl mx-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-700/90 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.5)]">
            <div className="p-4 sm:p-5">
              <h2
                id="cookie-consent-heading"
                className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight"
              >
                Cookies & privacy
              </h2>
              <p
                id="cookie-consent-desc"
                className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                We use essential cookies so the site works. With your permission we also use Google Analytics
                to understand traffic and improve the experience. See our{" "}
                <Link
                  to="/cookies"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
                .
              </p>
              <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => choose(CONSENT_ESSENTIAL)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={() => choose(CONSENT_ANALYTICS)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
                >
                  Accept analytics
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
