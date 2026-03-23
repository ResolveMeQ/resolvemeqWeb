import { hasAnalyticsConsent } from "../consent/cookieConsentStorage";

/**
 * GA4 via gtag.js (loaded in public/index.html). Respects cookie consent.
 * @param {string} name — event name (use snake_case per GA4 conventions)
 * @param {Record<string, string|number|boolean>} [params]
 */
export function trackEvent(name, params) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const g = window.gtag;
  if (typeof g !== "function") return;
  g("event", name, params || {});
}
