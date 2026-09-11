"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Children, type ReactNode, useRef } from "react";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Desktop: vertical scroll pins the section and drives horizontal progress
 * via transform — the browser stays in full control of scrolling (nothing
 * is intercepted or prevented), so this is not scroll-jacking; the user
 * continues past it with the same scroll gesture. Mobile: a native
 * touch-swipeable row, no pinning. Reduced motion: a plain vertical stack.
 */
export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(items.length - 1) * 100}vw`]);

  if (reduceMotion) {
    return (
      <div className={`flex flex-col gap-8 ${className}`}>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:hidden ${className}`}>
        {items.map((item, i) => (
          <div key={i} className="w-[85vw] shrink-0 snap-start">
            {item}
          </div>
        ))}
      </div>

      <div ref={trackRef} className="relative hidden md:block" style={{ height: `${items.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            {items.map((item, i) => (
              <div key={i} className="w-screen shrink-0 px-12">
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
