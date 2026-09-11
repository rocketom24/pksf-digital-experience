"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, STAGGER, VIEWPORT_ONCE } from "@/components/motion/tokens";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  /** Delay between each child, in seconds. Defaults to the standard step. */
  step?: number;
};

/** Staggers the viewport-triggered reveal of each direct child. Same size rule as `Reveal`. */
export function Stagger({ children, className, itemClassName, step = STAGGER.standard }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: DURATION.editorial, ease: EASE_EDITORIAL },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
