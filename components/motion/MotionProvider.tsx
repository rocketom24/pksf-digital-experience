"use client";

import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

/**
 * Reduced motion is handled here, once, rather than by each component asking
 * `useReducedMotion()` and branching on the answer.
 *
 * That branching is a hydration bug waiting to happen: the server has no idea
 * what the visitor's motion preference is, so it always renders the
 * full-motion tree, and a client that prefers reduced motion then renders a
 * different one. React reports a mismatch and throws the whole subtree away.
 *
 * `reducedMotion="user"` moves the decision into Motion's runtime, after
 * hydration: the markup is identical either way, and transform animations are
 * skipped to their end state while opacity still fades. Where a whole
 * composition has to change — a pinned track becoming a list — the swap is
 * done in CSS with `motion-safe:` / `motion-reduce:`, which the server and
 * client also agree on because neither of them decides it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
