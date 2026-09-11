"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { EASE_EDITORIAL } from "@/components/motion/tokens";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Entrance wrapper for a page's content. A future `app/template.tsx` can
 * key an `AnimatePresence` on the pathname to also animate route changes —
 * intentionally not wired up here, since that's routing architecture for
 * whichever page actually needs it, not part of the design system itself.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16, clipPath: "inset(4% 0 0 0)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  );
}
