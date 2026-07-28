# ResolveMeQ SEO operations

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) → **Add property** → URL prefix `https://resolvemeq.net`.
2. Choose **HTML tag** verification. Copy only the `content="..."` token.
3. Set Netlify env var (marketing site):
   - `REACT_APP_GOOGLE_SITE_VERIFICATION=<token>`
4. Redeploy marketing. Confirm the meta tag appears in View Source on `/`.
5. Click **Verify** in Search Console.
6. **Sitemaps** → submit `https://resolvemeq.net/sitemap.xml`.
7. Optional: add `https://app.resolvemeq.net` as a second property (public KB/community only). App `robots.txt` already blocks private routes.

Bing Webmaster Tools already uses `msvalidate.01` in `public/index.html`.

## Sitemap pings

Django pings Bing/Google when public content is published (`base/sitemap_notify.py`). Prefer Search Console coverage reports over ping status.

## Prerender

`npm run build` runs `postbuild` → `scripts/prerender.js`, which writes static HTML shells for marketing, docs, and blog routes under `build/`. Crawlers get correct title, description, canonical, Open Graph, hreflang, and body intros without executing React.

## Core Web Vitals

- Fonts load non-blocking (`display=swap` + print/onload swap).
- Hero particles idle-load after first paint.
- Header logo has explicit dimensions + `fetchPriority="high"`.
- Web Vitals (CLS, INP, LCP, FCP, TTFB) report to GA4 when analytics consent is granted.
- Netlify long-caches `/static/*` and `/assets/*`; HTML is `must-revalidate`.

## Locale / hreflang

English-only (`en` + `x-default` self-references). Add real `hreflang` variants only when localized URLs ship.

## Quick checks after deploy

```bash
curl -sL https://resolvemeq.net/pricing | grep -E 'rmq-prerender|canonical|og:title'
curl -sL https://resolvemeq.net/sitemap.xml | head
curl -sL https://resolvemeq.net/robots.txt
curl -sL https://app.resolvemeq.net/robots.txt
```
