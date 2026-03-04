/**
 * Subscribe & Contact API client for the marketing site.
 * Canonical API spec: docs/MARKETING_API.md
 *
 * Set in .env:
 *   REACT_APP_SUBSCRIBE_API_URL  e.g. https://api.resolvemeq.net/api/subscribe
 *   REACT_APP_CONTACT_API_URL    e.g. https://api.resolvemeq.net/api/contact
 */

const SUBSCRIBE_URL = process.env.REACT_APP_SUBSCRIBE_API_URL || null;
const CONTACT_URL = process.env.REACT_APP_CONTACT_API_URL || null;

function getErrorMessage(res, data, fallback) {
  if (res.status >= 500) return "Server error. Please try again.";
  return data?.error || data?.message || fallback;
}

export const subscribeNewsletter = async (email) => {
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
