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

/**
 * The four words the bar itself carries.
 *
 * Not a second navigation — a coarser index into the same page. Four is the
 * most a bar can hold without competing with the hero, so each one owns a
 * run of sections rather than pointing at a single anchor, and the readout
 * below says which run you are in.
 */
export const PRIMARY_LINKS: NavLink[] = [
  { label: "About", href: "/#model" },
  { label: "Impact", href: "/#ledger" },
  { label: "Work", href: "/#interventions" },
  { label: "Knowledge", href: "/#knowledge" },
];

/**
 * Which primary word each observed section belongs to. The bar marks the
 * word rather than the section, so scrolling through seven sections still
 * reports a position instead of going blank between anchors.
 */
export const SECTION_OWNER: Record<string, string> = {
  themes: "/#model",
  model: "/#model",
  ledger: "/#ledger",
  interventions: "/#interventions",
  story: "/#interventions",
  digital: "/#knowledge",
  desk: "/#knowledge",
  knowledge: "/#knowledge",
};

/** Section ids the navbar watches to report where the reader is. */
export const SECTION_IDS = Object.keys(SECTION_OWNER);
