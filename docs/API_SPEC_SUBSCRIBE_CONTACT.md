# Frontend integration: Subscribe & Contact

**Canonical backend API documentation:** [MARKETING_API.md](./MARKETING_API.md)

This page summarizes how the marketing site frontend uses the backend API.

---

## Environment variables

| Variable | Description | Example (production) |
|----------|-------------|----------------------|
| `REACT_APP_SUBSCRIBE_API_URL` | Full URL for newsletter subscribe | `https://api.resolvemeq.net/api/subscribe` |
| `REACT_APP_CONTACT_API_URL` | Full URL for contact/demo request | `https://api.resolvemeq.net/api/contact` |

If either is unset, that form uses fallback behavior (e.g. Formspree for contact when `REACT_APP_FORMSPREE_ID` is set, or client-only thank-you).

---

## Request format (aligned with MARKETING_API.md)

| Form | Method | Body (JSON) |
|------|--------|--------------|
| **Subscribe** (footer) | POST | `{ "email": "user@example.com" }` |
| **Contact** (CTA) | POST | `{ "email": "user@company.com", "company_size": "51-200" }` |

`company_size` must be one of: `"1-50"`, `"51-200"`, `"201-500"`, `"501+"`.

The frontend normalizes email (trim + lowercase) before sending.

---

## Response handling

- **2xx** → Success; show thank-you (and for contact, redirect to app after delay).
- **4xx** → Show backend `error` message (e.g. "Already subscribed", "Enter a valid email address.").
- **5xx** → Show generic: "Server error. Please try again."
- **Network error** → Show: "Please check your connection."

Implementation: `src/api/subscribeContact.js`.
