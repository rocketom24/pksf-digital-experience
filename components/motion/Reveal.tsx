"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, VIEWPORT_ONCE } from "@/components/motion/tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel before settling, in px. */
  distance?: number;
  /** Defaults to the editorial register. */
  duration?: number;
  delay?: number;
};

/**
 * Viewport-triggered fade and rise, for editorial blocks.
 *
 * Only for content **smaller than the viewport**. An intersection reveal on a
 * taller element never fires when the scroll position jumps from "below it"
 * to "inside it" — which is what an anchor link does — and with `once: true`
 * it never recovers, leaving the content invisible for the rest of the
 * session. Anything full-height uses `useScroll` instead, and anything
 * carrying a background is painted statically.
 */
export function Reveal({
  children,
  className,
  distance = 22,
  duration = DURATION.editorial,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  );
}
