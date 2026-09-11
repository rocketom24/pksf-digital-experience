"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export type CursorState = "default" | "interactive" | "image" | "carousel";

/**
 * Desktop-only custom cursor. Mount once per page/section that wants it —
 * never wired into the root layout, since it must never appear on touch.
 * Reads `data-cursor="interactive" | "image" | "carousel"` off any element
 * under the pointer; anything else falls back to "default".
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [supported, setSupported] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const handleChange = () => setSupported(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!supported) return;

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setState((target?.dataset.cursor as CursorState) ?? "default");
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [supported, x, y]);

  if (!supported || !visible) return null;

  const label = state === "image" ? "View" : state === "carousel" ? "Drag" : null;
  const expanded = state !== "default";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: expanded ? 64 : 10,
        height: expanded ? 64 : 10,
        backgroundColor: "#ffffff",
      }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && (
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink">{label}</span>
      )}
    </motion.div>
  );
}
