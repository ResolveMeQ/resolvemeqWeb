/** @typedef {"essential" | "analytics"} ConsentChoice */

export const CONSENT_STORAGE_KEY = "resolvemeq_consent_v1";
export const CONSENT_ESSENTIAL = "essential";
export const CONSENT_ANALYTICS = "analytics";

export const COOKIE_CONSENT_OPEN_EVENT = "resolvemeq-cookie-consent-open";

export function getStoredConsent() {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (v === CONSENT_ANALYTICS || v === CONSENT_ESSENTIAL) return v;
  } catch (_) {
    /* private mode */
  }
  return null;
}

/** @param {ConsentChoice} value */
export function setStoredConsent(value) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch (_) {}
}

/** Sync Google tags with stored choice (Consent Mode v2). */
export function applyGtagConsent(consent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (consent === CONSENT_ANALYTICS) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === CONSENT_ANALYTICS;
}

export function openCookieConsentUi() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
}
