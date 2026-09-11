"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel distance in px before settling. */
  distance?: number;
  /** Reveal duration in seconds — see docs/art-direction.md "Motion". */
  duration?: number;
  delay?: number;
};

/** Viewport-triggered fade + rise reveal for editorial content blocks. */
export function Reveal({
  children,
  className,
  distance = 24,
  duration = 0.7,
  delay = 0,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduceMotion ? 0 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
