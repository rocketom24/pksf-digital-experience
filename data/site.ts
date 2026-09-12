/**
 * The site's own identity — not PKSF's.
 *
 * Everything in the rest of `data/` is a fact about Palli Karma-Sahayak
 * Foundation, carried from a PKSF source. This file is the opposite: it is what
 * *this page* says about itself, and it is kept separate for that reason.
 *
 * The page is an independent concept. It is not PKSF's site, it is not
 * commissioned by PKSF and it is not endorsed by PKSF, so every string here
 * that a reader meets before the page itself — a browser tab, a search result,
 * a link preview pasted into a chat — has to say so on its own. A preview is
 * often the only thing seen, and a preview that reads as an official PKSF
 * property would be a false claim no on-page disclaimer can reach.
 */

export const site = {
  /** The tab, and the search result's heading. */
  title: "PKSF Digital Experience — Independent Concept",
  /** The short form: the OG `site_name`, and the name an app would install as. */
  name: "PKSF Digital Experience",
  description:
    "An independent digital experience concept for Palli Karma-Sahayak Foundation (PKSF), exploring a modern way to present its mission, impact, programs, projects, knowledge and people.",
  /** Said in full once, in the words PKSF uses for itself. */
  subject: "Palli Karma-Sahayak Foundation (PKSF)",
  /** The disclaimer, in the one wording used everywhere it appears. */
  disclaimer: "An independent concept. Not affiliated with or endorsed by PKSF.",
} as const;

/**
 * Where the site is being served from, resolved at build time.
 *
 * Metadata needs absolute URLs — `og:image` and `og:url` are fetched by
 * machines that have no page to resolve a relative path against — so the origin
 * has to be known when the page is prerendered rather than when it is viewed.
 *
 * The order matters:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — set this once a custom domain is attached, and it
 *    wins over everything below. It is the only one of the three that survives
 *    moving off Vercel.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — the project's *stable* production
 *    domain, which Vercel sets on every deployment including previews. Using it
 *    rather than `VERCEL_URL` is deliberate: `VERCEL_URL` is the unique
 *    per-deployment hostname, so a canonical built from it would point at a
 *    frozen deployment that is replaced by the next push, and every preview
 *    would advertise itself as a separate site.
 * 3. `localhost` — a local `next build`, where nothing external will read it.
 *
 * Neither Vercel variable needs to be added by hand; both are injected by the
 * platform. Note `VERCEL_PROJECT_PRODUCTION_URL` is a bare hostname, so the
 * scheme is added here.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/**
 * Whether this build is the real production deployment.
 *
 * Preview deployments serve the same pages on a different hostname, which is a
 * duplicate of the site as far as a crawler is concerned. They are told not to
 * index rather than left to compete with production for the same result.
 */
export const isProductionDeployment =
  process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production";
