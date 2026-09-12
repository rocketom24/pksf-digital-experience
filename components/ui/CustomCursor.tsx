"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";

/**
 * There is no `drag` state. Nothing on this page is dragged or
 * horizontally scrolled — the timeline that looks like a rail is driven by
 * vertical scroll — and a cursor that offers to be dragged over something
 * that cannot be is worse than one that says nothing.
 */
export type CursorState = "default" | "interactive" | "nav" | "view" | "explore";

const FOLLOW = { stiffness: 900, damping: 40, mass: 0.2 } as const;

/** Only the states that say something get a word; the rest are shape alone. */
const LABEL: Partial<Record<CursorState, string>> = {
  nav: "Open",
  view: "View",
  explore: "Explore",
};

/** How far the marker opens for each state. The triangle never changes shape. */
const SCALE: Record<CursorState, number> = {
  default: 1,
  interactive: 1.45,
  nav: 1.25,
  view: 1.25,
  explore: 1.25,
};

/**
 * The cursor.
 *
 * A triangle, because the whole page is a delta: a distributary channel
 * splitting is the same wedge, and the marker under the reader's hand is the
 * smallest instance of it. It is drawn with its apex exactly on the pointer,
 * so it is a real pointing device and not a dot that happens to follow one.
 *
 * It reads `data-cursor` off whatever is under the pointer and opens, or
 * takes a word, to say what that thing will do — which is the only thing it
 * is for. It does not trail, orbit, or draw anything.
 *
 * Colour comes from the nearest `data-ground`, not from a constant: the page
 * runs across five grounds and a photograph, and a single fixed ink goes
 * invisible on at least two of them. The wedge is filled in the ground's ink
 * and stroked in the ground's own background, which is what keeps it legible
 * over the hero photograph, where neither the fill nor the ground alone can
 * be relied on.
 *
 * It never renders for a coarse pointer, and never under reduced motion — a
 * spring-followed cursor is exactly the kind of continuous movement that
 * setting exists to stop. The native cursor is only hidden while this one is
 * actually on screen, so a pointer is never lost.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [ground, setGround] = useState<Ground>("parchment");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  /**
   * Enough lag to feel weighted, not enough to lose the apex off the target.
   *
   * Tightened from 520/42/0.28: at that setting a fast traverse left the apex
   * visibly trailing the real pointer, which is the one thing a pointing
   * device cannot do — a marker drawn with its apex *on* the pointer has to be
   * where the pointer is. Still overdamped, so it never overshoots and never
   * wobbles to a stop: critical damping here is 2√(k·m) = 2√(900 × 0.2) ≈ 26.8
   * and this sits at 40. The weight is in the mass, not in the lateness.
   */
  const springX = useSpring(x, FOLLOW);
  const springY = useSpring(y, FOLLOW);

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

      const target = event.target as HTMLElement | null;
      const marker = target?.closest<HTMLElement>("[data-cursor]");
      setState((marker?.dataset.cursor as CursorState) ?? "default");

      const band = target?.closest<HTMLElement>("[data-ground]");
      setGround((band?.dataset.ground as Ground) ?? "parchment");

      setVisible(true);
    }
    const hide = () => {
      setVisible(false);
      setPressed(false);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
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
  const g = GROUND[ground];
  const ink = g.dark ? "var(--on-dark)" : "var(--on-light)";
  const back = g.dark ? "var(--ink)" : "var(--parchment)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100 flex items-start gap-2.5"
      style={{ x: springX, y: springY }}
    >
      <motion.svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        className="block shrink-0 origin-top-left"
        initial={false}
        animate={{ scale: SCALE[state] * (pressed ? 0.82 : 1) }}
        transition={{ duration: DURATION.fast, ease: EASE_EDITORIAL }}
      >
        {/* Apex on the origin, symmetric about the 45° diagonal — the same
            wedge the delta splits into, at its smallest. */}
        <path
          d="M0.6 0.6 L14 6 L6 14 Z"
          fill={ink}
          stroke={back}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </motion.svg>

      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: DURATION.fast, ease: EASE_EDITORIAL }}
            // A solid chip, not text on whatever is behind it: over the hero
            // photograph a bare word is unreadable half the time.
            className="mt-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.14em]"
            style={{ backgroundColor: back, color: ink }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
