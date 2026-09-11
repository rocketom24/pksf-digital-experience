"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, type ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  /** Delay between each child's reveal, in seconds. */
  step?: number;
};

/** Staggers the viewport-triggered reveal of each direct child. */
export function Stagger({ children, className, itemClassName, step = 0.08 }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : step } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
