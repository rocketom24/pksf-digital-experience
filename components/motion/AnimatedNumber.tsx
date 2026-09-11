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
  /**
   * `grouped` adds thousands separators; `plain` leaves the digits alone,
   * for values like years. A serializable union rather than a formatter
   * callback, so Server Components can set it — functions can't cross the
   * boundary into a Client Component.
   */
  format?: "grouped" | "plain";
};

/** Counts up to `value` once it enters the viewport. */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  format = "grouped",
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
      {format === "plain"
        ? String(Math.round(shown))
        : Math.round(shown).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
