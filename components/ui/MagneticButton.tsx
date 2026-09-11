"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { type ReactNode, useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the button follows the pointer, 0–1. */
  strength?: number;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>;

/** Button that subtly follows the cursor within its bounds on hover. */
export function MagneticButton({ children, className = "", strength = 0.35, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 });

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-background transition-colors duration-200 hover:bg-green-deep focus-visible:outline-2 focus-visible:outline-green ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
