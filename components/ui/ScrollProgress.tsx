"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * A 2px reading-progress hairline pinned to the viewport top.
 *
 * Painted white through `mix-blend-difference` rather than in a brand colour:
 * the page runs across five grounds and no fixed accent stays visible on all
 * of them. Purely decorative — never the only way to gauge position, never
 * interactive, and hidden entirely under reduced motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-white mix-blend-difference motion-reduce:hidden"
      style={{ scaleX }}
    />
  );
}
