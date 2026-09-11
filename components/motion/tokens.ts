/**
 * Shared motion timing/easing — see docs/art-direction.md "Motion".
 * Centralized so editorial components don't each hardcode magic numbers.
 */

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** Fast interactions — hover, focus, small UI feedback. */
  fast: 0.2,
  /** Standard viewport reveals. */
  standard: 0.7,
  /** Hero-scale entrances. */
  hero: 1,
  /** Large storytelling transitions. */
  story: 1.3,
} as const;

export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px" } as const;
