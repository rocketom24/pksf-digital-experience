"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  /** Text shown before/after the number, e.g. "+" or "%". */
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
};

/** Counts up to `value` once it enters the viewport. */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  formatter = (n) => Math.round(n).toLocaleString("en-US"),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  const shown = reduceMotion ? (inView ? value : 0) : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter(shown)}
      {suffix}
    </span>
  );
}
