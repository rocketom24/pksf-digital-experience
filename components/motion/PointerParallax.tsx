"use client";

import { motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

type PointerParallaxProps = {
  children: ReactNode;
  /** Furthest the content drifts from centre, in px, on each axis. */
  travel?: number;
  /** Scale held while the pointer is over the frame. */
  scale?: number;
  className?: string;
};

/**
 * A frame whose picture drifts under the pointer.
 *
 * Pointer position inside the element is mapped to a small translation and a
 * slight scale, both run through a soft spring so the picture lags the hand
 * instead of tracking it — the movement reads as a camera settling, and at
 * rest there is none of it.
 *
 * ── Why these numbers ─────────────────────────────────────────────────────
 * The scale is what lets the picture move at all: a frame that is not
 * oversized has nothing to drift into, and would show its own edge. 1.06 with
 * 8px of travel is the smallest pair that still reads as movement, and it is
 * deliberately small here — the thumbnails this wraps are PKSF's own artwork
 * with a logotype printed along the foot, and every pixel of scale is a pixel
 * cropped off it. At the full measure 1.06 takes 11px off each edge of a
 * 756px-tall frame, against a logotype strip roughly 95px deep.
 *
 * ── Reduced motion ────────────────────────────────────────────────────────
 * Cancelled in CSS (`.pointer-parallax` in globals.css), not by rendering a
 * different tree. The transform is a MotionValue written straight into the
 * inline style, so switching it off in JavaScript would mean rendering
 * something different on the client than on the server — which is the
 * hydration mismatch the rest of this project's motion layer is built to
 * avoid. Same reason, and same fix, as `.frame-crop` and `.hero-crop`.
 *
 * ── Touch ─────────────────────────────────────────────────────────────────
 * Only a mouse drives it. A touch pointer fires `pointermove` on a tap, which
 * would leave the picture shoved to one side after a scroll gesture with no
 * pointer left on screen to bring it back.
 */
const SPRING = { stiffness: 110, damping: 20, mass: 0.7 } as const;

export function PointerParallax({
  children,
  travel = 8,
  scale = 1.06,
  className = "",
}: PointerParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const s = useMotionValue(1);

  const springX: MotionValue<number> = useSpring(x, SPRING);
  const springY: MotionValue<number> = useSpring(y, SPRING);
  const springS: MotionValue<number> = useSpring(s, SPRING);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;

    // −1 … 1 from the centre of the frame, on each axis.
    const dx = (event.clientX - box.left) / box.width - 0.5;
    const dy = (event.clientY - box.top) / box.height - 0.5;

    // Against the pointer, not with it: the picture pulls back as the hand
    // comes in, which is what makes the frame feel like it has depth rather
    // than like a sticker being dragged around.
    x.set(-dx * travel * 2);
    y.set(-dy * travel * 2);
    s.set(scale);
  }

  function handleLeave(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    x.set(0);
    y.set(0);
    s.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`pointer-parallax ${className}`}
      style={{ x: springX, y: springY, scale: springS }}
    >
      {children}
    </motion.div>
  );
}
