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
 * Wraps a section in a themed background that wipes in via clip-path as it
 * enters the viewport, creating rhythm between sections (quiet → impact →
 * information → story → quiet) without shifting layout — the background is
 * an absolutely positioned layer behind the content, so content never moves.
 */
export function SectionTransition({ theme, children, className = "" }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();
  const cls = THEME_CLASSES[theme];

  return (
    <section className={`relative overflow-hidden ${cls.text} ${className}`}>
      <motion.div
        aria-hidden="true"
        className={`absolute inset-0 ${cls.bg}`}
        initial={{ clipPath: reduceMotion ? "inset(0% 0 0% 0)" : "inset(0% 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: reduceMotion ? 0 : DURATION.story, ease: EASE_EDITORIAL }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}
