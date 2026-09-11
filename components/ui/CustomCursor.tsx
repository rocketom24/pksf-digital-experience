"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";

export type CursorState = "default" | "interactive" | "view" | "drag" | "explore";

/** Only the states that say something get a word; the rest are shape alone. */
const LABEL: Partial<Record<CursorState, string>> = {
  view: "View",
  drag: "Drag",
  explore: "Explore",
};

const SIZE: Record<CursorState, number> = {
  default: 9,
  interactive: 40,
  view: 84,
  drag: 84,
  explore: 96,
};

/**
 * The cursor.
 *
 * It reads `data-cursor` off whatever is under the pointer and changes size
 * and label to match, which is the only thing it is for: saying what the
 * thing under it will do. It does not trail, orbit, or draw anything.
 *
 * It never renders for a coarse pointer, and never under reduced motion —
 * a spring-followed cursor is exactly the kind of continuous movement that
 * setting exists to stop. The native cursor is only hidden while this one is
 * actually on screen, so a pointer is never lost.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.28 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const active = fine && !reduceMotion;

  useEffect(() => {
    if (!active) return;

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setState((target?.dataset.cursor as CursorState) ?? "default");
      setVisible(true);
    }
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [active, x, y]);

  // The native cursor is only suppressed while the replacement is on screen.
  useEffect(() => {
    const on = active && visible;
    document.documentElement.classList.toggle("has-custom-cursor", on);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [active, visible]);

  if (!active || !visible) return null;

  const label = LABEL[state];
  const size = SIZE[state];

  // A ring for "this is clickable", a filled disc for everything else. Under
  // `mix-blend-difference` both read on parchment, forest and ink alike, so
  // the cursor needs no per-ground variant.
  const ring = state === "interactive";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 flex items-center justify-center rounded-full border-solid border-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{
        width: size,
        height: size,
        backgroundColor: ring ? "rgba(255,255,255,0)" : "rgb(255,255,255)",
        borderWidth: ring ? 1 : 0,
      }}
      transition={{ duration: DURATION.fast, ease: EASE_EDITORIAL }}
    >
      {label && (
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
          {label}
        </span>
      )}
    </motion.div>
  );
}
