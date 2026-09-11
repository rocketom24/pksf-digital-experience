export type NavLink = { label: string; href: string };

/**
 * Every entry points at a section that exists on the homepage. Dedicated
 * routes (`/about`, `/work/<slug>`, …) are not built yet, and linking to them
 * 404s and fills the console with failed prefetches — so the navigation
 * addresses the page it has until those routes are real.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Themes", href: "/#themes" },
  { label: "The model", href: "/#model" },
  { label: "The ledger", href: "/#ledger" },
  { label: "Interventions", href: "/#interventions" },
  { label: "Human story", href: "/#story" },
  { label: "Digital", href: "/#digital" },
  { label: "The desk", href: "/#desk" },
];

/** Section ids the navbar watches to report where the reader is. */
export const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("/#", ""));
