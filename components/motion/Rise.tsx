"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, VIEWPORT_ONCE } from "@/components/motion/tokens";

type RiseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel, in px. May exceed the line's height — see below. */
  distance?: number;
};

/**
 * A line that rises out from behind its own edge.
 *
 * ── Why the observer is on the mask and not on the line ───────────────────
 * The obvious way to write this is a plain `overflow-hidden` wrapper around a
 * `Reveal`, which is what Team's statement ladder does inline. It has a trap
 * in it, and the trap is silent.
 *
 * An IntersectionObserver clips the target's rect by every **ancestor**
 * overflow clip before deciding whether it intersects. A line that starts
 * translated further down than its own mask is tall is therefore entirely
 * outside its clipping ancestor, its visible rect is empty, and it never
 * reports as in view — so `whileInView` never fires and the line stays
 * invisible for the rest of the session. It cannot become visible until it is
 * revealed and it cannot be revealed until it is visible. Reproduced in
 * Chrome: a `text-headline` line (59px at 1440) under a 64px travel never
 * appeared, while the two-line label beside it (118px) did.
 *
 * So the mask is the observed element — an element's own overflow does not
 * clip its own intersection rect, only an ancestor's does — and the line
 * inside it follows by variant. That is the same shape `Stagger` uses, and it
 * makes the travel independent of the line's height: any `distance` is safe,
 * at any breakpoint, for one word or for a heading that clamps down to 40px
 * on a phone.
 *
 * `pb-[0.12em]` is what keeps a descender from being clipped by the mask.
 *
 * Two rules come with it, both inherited from the reveal grammar:
 *   · it renders block elements, so it cannot go inside an `<h2>` or a `<p>`
 *     — anything needing a heading role takes `role="heading"` on a `div`;
 *   · it is viewport-triggered, so it is only for a line **smaller than the
 *     viewport**. One line of display type always is.
 */
export function Rise({ children, className = "", delay = 0, distance = 64 }: RiseProps) {
  return (
    <motion.div
      className={`overflow-hidden pb-[0.12em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: DURATION.slow, delay, ease: EASE_EDITORIAL },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
