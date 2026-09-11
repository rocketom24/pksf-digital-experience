"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, VIEWPORT_ONCE } from "@/components/motion/tokens";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type SectionTransitionProps = {
  theme: Theme;
  children: ReactNode;
  className?: string;
};

/**
 * Themed section that marks the change of register between sections
 * (quiet → impact → information → story → quiet).
 *
 * The theme background is painted statically on the section. It used to be
 * a full-height layer that wiped in on `whileInView`, which broke badly: a
 * target taller than the viewport that goes from "below the viewport" to
 * "containing the viewport" in a single jump — an anchor link, a fast
 * scroll — never reports an intersection change, so the wipe never ran and
 * never recovered, leaving light-on-light text unreadable for the rest of
 * the session. The transition is now carried by a hairline that draws
 * across the top edge: if that reveal is ever missed, the cost is one
 * invisible rule rather than the whole section's content.
 */
export function SectionTransition({ theme, children, className = "" }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();
  const cls = THEME_CLASSES[theme];

  // No `overflow-hidden`: it would make this element a scroll container and
  // silently break `position: sticky` for anything inside (StickyStory).
  // Nothing needs clipping now that the wipe layer is a top-edge hairline.
  return (
    <section className={`relative ${cls.bg} ${cls.text} ${className}`}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-current opacity-20"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: reduceMotion ? 0 : DURATION.story, ease: EASE_EDITORIAL }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}
