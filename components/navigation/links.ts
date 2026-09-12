export type NavLink = { label: string; href: string };

/**
 * A destination inside a mega-menu. The gloss is the page's own description of
 * the section it points at — never a claim about PKSF that the section itself
 * does not already carry.
 */
export type NavChild = NavLink & { gloss: string };

export type NavItem = NavLink & {
  /** One line for the panel's left column. */
  blurb?: string;
  children?: NavChild[];
};

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
  { label: "Projects", href: "/#projects" },
  { label: "Human story", href: "/#story" },
  { label: "Digital", href: "/#digital" },
  { label: "The desk", href: "/#desk" },
];

/**
 * The bar's own navigation.
 *
 * Six words, four of which open a panel. It replaced a four-word coarse index
 * that only marked position: the words are the same shape, but each one is now
 * a real destination and the panels under them address the sections directly,
 * so nothing on this page is more than two moves away from the bar.
 *
 * Every `href` resolves to an element that exists — the four anchors that did
 * not (`#mission`, `#contact`) were added to the sections that already held
 * that content rather than invented as pages. No entry points at a route that
 * has not been built.
 */
export const PRIMARY_NAV: NavItem[] = [
  {
    label: "About",
    href: "/#model",
    blurb: "What PKSF is, what it has formally committed to, and who runs it.",
    children: [
      {
        label: "Overview",
        href: "/#model",
        gloss: "Three steps between a fund and a household.",
      },
      {
        label: "Mission",
        href: "/#mission",
        gloss: "The commitment, set verbatim.",
      },
      {
        label: "Leadership & team",
        href: "/#team",
        gloss: "The Managing Director, the deputies, and the full register.",
      },
    ],
  },
  {
    label: "Impact",
    href: "/#ledger",
    blurb: "What the network holds, and what it looks like at one household.",
    children: [
      {
        label: "The ledger",
        href: "/#ledger",
        gloss: "Every figure shown against its stated reporting date.",
      },
      {
        label: "Human story",
        href: "/#story",
        gloss: "The same numbers, at the scale of one person.",
      },
    ],
  },
  {
    label: "Work",
    href: "/#interventions",
    blurb: "The framework, the initiatives running inside it, and the standing instruments.",
    children: [
      {
        label: "Strategic interventions",
        href: "/#interventions",
        gloss: "The ten published areas the plan is carried out in.",
      },
      {
        label: "Projects",
        href: "/#projects",
        gloss: "Financed, time-bound initiatives, each with its own source.",
      },
      {
        label: "Programmes",
        href: "/#programs",
        gloss: "Standing instruments, delivered by Partner Organisations.",
      },
    ],
  },
  {
    label: "Knowledge",
    href: "/#knowledge",
    blurb: "What an apex institution publishes, and is judged on.",
    children: [
      {
        label: "Publications",
        href: "/#knowledge",
        gloss: "Annual reports and published files, opened on pksf.org.bd.",
      },
      {
        label: "News",
        href: "/#news",
        gloss: "Releases, summarised in PKSF's own opening words.",
      },
      {
        label: "Watch",
        href: "/#watch",
        gloss: "Films from PKSF's own YouTube channel.",
      },
      {
        label: "Digital transformation",
        href: "/#digital",
        gloss: "Five published eras, and the direction stated for 2030.",
      },
    ],
  },
  { label: "News", href: "/#news" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Which primary word each observed section belongs to. The bar marks the word
 * rather than the section, so scrolling through the page keeps reporting a
 * position instead of going blank between anchors.
 */
export const SECTION_OWNER: Record<string, string> = {
  themes: "/#model",
  model: "/#model",
  mission: "/#model",
  team: "/#model",
  interventions: "/#interventions",
  projects: "/#interventions",
  programs: "/#interventions",
  ledger: "/#ledger",
  story: "/#ledger",
  watch: "/#knowledge",
  digital: "/#knowledge",
  vision: "/#knowledge",
  desk: "/#knowledge",
  knowledge: "/#knowledge",
  news: "/#news",
  contact: "/#contact",
};

/** Section ids the navbar watches to report where the reader is. */
export const SECTION_IDS = Object.keys(SECTION_OWNER);
