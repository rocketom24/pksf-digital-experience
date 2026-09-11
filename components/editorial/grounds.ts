/**
 * The five grounds the page moves through.
 *
 * Every entry is a closed set: a background, the three ink levels that clear
 * WCAG AA on it, the one accent that clears 3:1 on it, and a hairline. The
 * accent differs per ground on purpose — terracotta reads on parchment and
 * on ink but collapses to 2.06:1 on forest, so forest takes sage instead.
 * Components pick a ground and use its tokens; they never reach for a raw
 * colour, which is what kept unreadable pairings out of Phase 3.
 *
 * Ratios (measured, see the palette comment in app/globals.css):
 *   parchment  ink 15.6 · muted 5.43 · terracotta 3.76 (large/UI only)
 *   paper      ink 17.5 · muted 6.09 · clay 5.40
 *   ink        parchment 15.6 · muted 8.03 · ember 5.76
 *   forest     paper 8.69 · muted 4.76 · sage 5.29
 *   moss       paper 6.06 · muted 4.78 · mist 4.33
 */
export type Ground = "parchment" | "paper" | "ink" | "forest" | "moss";

export type GroundTokens = {
  bg: string;
  text: string;
  muted: string;
  /** Small-text-safe accent (≥ 4.5:1). */
  accent: string;
  /** Hairline rule — decorative only, never carries text. */
  rule: string;
  /** Border utility for the same hairline. */
  border: string;
  /** Delta channels used as atmosphere behind content — deliberately quiet. */
  channel: string;
  /** Plates inside a `Frame`, which have to read as an image rather than a wash. */
  plate: string;
  /** Whether this ground is dark, for components that only need the binary. */
  dark: boolean;
};

/**
 * The same grounds as raw CSS values.
 *
 * A section that changes ground under user control (the strategic explorer)
 * cannot swap Tailwind classes: the text colour would snap while the
 * background crossfaded, and for one frame the page would be light on light.
 * Setting both as inline colour values lets the browser interpolate them
 * together, so the pairing stays legible through the whole transition.
 */
export const GROUND_VARS: Record<Ground, Record<"bg" | "text" | "muted" | "accent", string>> = {
  parchment: {
    bg: "var(--parchment)",
    text: "var(--on-light)",
    muted: "var(--on-light-muted)",
    accent: "var(--clay)",
  },
  paper: {
    bg: "var(--paper)",
    text: "var(--on-light)",
    muted: "var(--on-light-muted)",
    accent: "var(--clay)",
  },
  ink: {
    bg: "var(--ink)",
    text: "var(--on-dark)",
    muted: "var(--on-dark-muted)",
    accent: "var(--ember)",
  },
  forest: {
    bg: "var(--forest)",
    text: "var(--on-forest)",
    muted: "var(--on-forest-muted)",
    accent: "var(--sage)",
  },
  moss: {
    bg: "var(--moss)",
    text: "var(--on-moss)",
    muted: "var(--on-moss-muted)",
    accent: "var(--mist)",
  },
};

export const GROUND: Record<Ground, GroundTokens> = {
  parchment: {
    bg: "bg-parchment",
    text: "text-on-light",
    muted: "text-muted",
    accent: "text-clay",
    rule: "bg-on-light/14",
    border: "border-on-light/14",
    channel: "text-silt/65",
    plate: "text-silt",
    dark: false,
  },
  paper: {
    bg: "bg-paper",
    text: "text-on-light",
    muted: "text-muted",
    accent: "text-clay",
    rule: "bg-on-light/12",
    border: "border-on-light/12",
    channel: "text-silt/65",
    plate: "text-silt",
    dark: false,
  },
  ink: {
    bg: "bg-ink",
    text: "text-on-dark",
    muted: "text-on-dark-muted",
    accent: "text-ember",
    rule: "bg-on-dark/18",
    border: "border-on-dark/18",
    channel: "text-on-dark/30",
    plate: "text-on-dark/70",
    dark: true,
  },
  forest: {
    bg: "bg-forest",
    text: "text-on-forest",
    muted: "text-on-forest-muted",
    accent: "text-sage",
    rule: "bg-on-forest/20",
    border: "border-on-forest/20",
    channel: "text-sage/45",
    plate: "text-sage/90",
    dark: true,
  },
  moss: {
    bg: "bg-moss",
    text: "text-on-moss",
    muted: "text-on-moss-muted",
    accent: "text-mist",
    rule: "bg-on-moss/22",
    border: "border-on-moss/22",
    channel: "text-mist/40",
    plate: "text-mist/85",
    dark: true,
  },
};
