"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Restrained 2px reading-progress bar pinned to the viewport top. Purely
 * decorative (aria-hidden) — never the only way to gauge position, and
 * never intercepts scroll or pointer events.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-green motion-reduce:hidden"
      style={{ scaleX }}
    />
  );
}
