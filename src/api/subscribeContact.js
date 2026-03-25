/**
 * Subscribe & Contact API client for the marketing site.
 * Canonical API spec: ResolveMeQ/docs/MARKETING_API.md
 *
 * URLs resolve automatically from REACT_APP_API_ORIGIN (defaults below) unless you
 * override with full URLs:
 *   REACT_APP_SUBSCRIBE_API_URL
 *   REACT_APP_CONTACT_API_URL
 *
 * Set REACT_APP_MARKETING_API_DISABLED=true to turn off API calls (e.g. static demo).
 */

function trimSlash(s) {
  return (s || "").replace(/\/+$/, "");
}

/** Default API host: local Django in dev, production API in production builds. */
function defaultApiOrigin() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.resolvemeq.net";
}

function resolveApiOrigin() {
  const fromEnv = trimSlash(process.env.REACT_APP_API_ORIGIN || process.env.REACT_APP_PUBLIC_API_URL || "");
  if (fromEnv) return fromEnv;
  return defaultApiOrigin();
}

const marketingDisabled =
  process.env.REACT_APP_MARKETING_API_DISABLED === "true" ||
  process.env.REACT_APP_MARKETING_API_DISABLED === "1";

function resolveSubscribeUrl() {
  if (marketingDisabled) return null;
  const explicit = process.env.REACT_APP_SUBSCRIBE_API_URL?.trim();
  if (explicit) return explicit;
  return `${resolveApiOrigin()}/api/subscribe`;
}

function resolveContactUrl() {
  if (marketingDisabled) return null;
  const explicit = process.env.REACT_APP_CONTACT_API_URL?.trim();
  if (explicit) return explicit;
  return `${resolveApiOrigin()}/api/contact`;
}

export const getSubscribeApiUrl = () => resolveSubscribeUrl();
export const getContactApiUrl = () => resolveContactUrl();

/** True when newsletter POST target is configured (default: yes). */
export const isSubscribeApiConfigured = () => Boolean(getSubscribeApiUrl());
/** True when contact/demo POST target is configured (default: yes). */
export const isContactApiConfigured = () => Boolean(getContactApiUrl());

function getErrorMessage(res, data, fallback) {
  if (res.status >= 500) return "Server error. Please try again.";
  return data?.error || data?.message || fallback;
}

export const subscribeNewsletter = async (email) => {
  const SUBSCRIBE_URL = getSubscribeApiUrl();
  if (!SUBSCRIBE_URL) return { ok: false, error: "API not configured" };

  try {
    const res = await fetch(SUBSCRIBE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, ...data };
    return { ok: false, error: getErrorMessage(res, data, "Subscription failed") };
  } catch (_err) {
    return { ok: false, error: "Please check your connection." };
  }
};

export const submitContactRequest = async (email, companySize) => {
  const CONTACT_URL = getContactApiUrl();
  if (!CONTACT_URL) return { ok: false, error: "API not configured" };

  try {
    const res = await fetch(CONTACT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        company_size: companySize,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, ...data };
    return { ok: false, error: getErrorMessage(res, data, "Request failed") };
  } catch (_err) {
    return { ok: false, error: "Please check your connection." };
  }
};
