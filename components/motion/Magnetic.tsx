"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Maximum pull, in px. Small on purpose — see below. */
  strength?: number;
  className?: string;
};

/**
 * A control that leans toward the pointer while it is over it.
 *
 * Dialled to 4px, which is deliberately under the height of the type it moves:
 * a nav word that chases the cursor across its own width stops being a word in
 * a line and becomes a toy, and the bar has six of them side by side. At this
 * amplitude it reads as weight under the hand rather than as movement.
 *
 * The pull is spring-followed, so it settles rather than snapping back, and it
 * is skipped entirely under `prefers-reduced-motion` — continuous
 * pointer-tracked movement is exactly what that setting is for. The wrapper is
 * `inline-block` so it never changes the layout of the row it sits in.
 */
export function Magnetic({ children, strength = 4, className = "" }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        // Never branch the rendered tree on the motion preference — the server
        // does not know it and React throws the subtree away over the
        // mismatch. The same element is always rendered; it simply never
        // receives an offset. Coarse pointers are skipped too: they report a
        // single contact point at the moment of the tap, and pulling the label
        // out from under the finger is not helpful.
        if (reduceMotion || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - (box.left + box.width / 2)) / (box.width / 2)) * strength);
        y.set(((event.clientY - (box.top + box.height / 2)) / (box.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
