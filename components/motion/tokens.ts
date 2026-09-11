/**
 * The motion grammar. Three registers, and nothing outside them.
 *
 *   small      200–400ms  hover, focus, buttons, navigation affordances
 *   editorial  500–900ms  text and image reveals, section entrances
 *   cinematic  900–1600ms major transitions, hero choreography, the delta
 *
 * Every animation in the project reads its duration from here. A duration
 * typed inline is a bug: the registers are what make separate sections feel
 * like one system, and they are the first thing to drift.
 *
 * The easing is a single expo-out curve — fast departure, long settle. It
 * gives movement anticipation at the start and weight at the end without
 * needing a different curve per component.
 */

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

/** For elements that overshoot slightly before settling — used sparingly. */
export const EASE_SETTLE = [0.34, 1.3, 0.64, 1] as const;

export const DURATION = {
  /** Hover, focus, small UI feedback. */
  fast: 0.24,
  /** Buttons, navigation, accordion rows. */
  small: 0.36,
  /** Standard viewport reveals — text, images, section entrances. */
  editorial: 0.72,
  /** Slower editorial beats: statement lines, panel swaps. */
  slow: 0.9,
  /** Hero choreography and full-screen storytelling. */
  cinematic: 1.25,
} as const;

/**
 * Shared viewport config for `whileInView`.
 *
 * Only for elements **smaller than the viewport**. A taller element that goes
 * from below the viewport to containing it in one jump — an anchor link, a
 * restored scroll position — never reports an intersection change, and with
 * `once: true` never recovers. Anything taller than the viewport, and
 * anything whose absence would hurt legibility, must be driven by
 * `useScroll` or painted statically instead.
 */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px" } as const;

/** Staggers, as multiples of the editorial register. */
export const STAGGER = {
  tight: 0.05,
  standard: 0.09,
  loose: 0.16,
} as const;
