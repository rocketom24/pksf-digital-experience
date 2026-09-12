"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type DriftProps = {
  children: ReactNode;
  /**
   * Furthest the content travels from its laid-out position, in px. It moves
   * from `+distance` to `−distance` across the whole time the element is on
   * screen, so the element is at its true position exactly once — when it is
   * centred in the viewport.
   */
  distance?: number;
  className?: string;
  /**
   * On the layer that actually moves. Needed when the child is an
   * `<Image fill />`: a transform makes an element the containing block for
   * its absolutely-positioned descendants, so the moving layer — not the
   * ruler — is what an `fill` image resolves its box against, and a layer of
   * `height: auto` around abspos children is a zero-height box.
   */
  innerClassName?: string;
};

/**
 * Scroll parallax, for a picture or a drawing that should move against the
 * column beside it.
 *
 * ── Why `useScroll` and not `whileInView` ────────────────────────────────
 * Same reason as `Frame`'s crop: this is a continuous function of position,
 * so a scroll that jumps straight into the middle of the page — an anchor
 * link, a restored position — is just another position rather than an
 * intersection that never reported. Nothing legible ever depends on it.
 *
 * ── Why the transform is on a child ─────────────────────────────────────
 * `useScroll` measures the target's box, and a translated element reports a
 * translated box. Measuring the element that is being moved feeds its own
 * output back into its input and the picture creeps. The outer div is the
 * ruler and stays still; the inner one moves.
 *
 * ── The input range ─────────────────────────────────────────────────────
 * Exactly [0, 1]. Motion hands a scroll-linked `useTransform` to the browser
 * as a native view-timeline animation with the input range used verbatim as
 * the WAAPI keyframe offsets, and an offset outside 0–1 throws.
 *
 * ── Reduced motion ──────────────────────────────────────────────────────
 * Cancelled in CSS (`.scroll-drift` in globals.css), not by rendering a
 * different tree — the transform is a MotionValue in the inline style, and
 * switching it off in JavaScript would render something different on the
 * client than on the server. Same mechanism as `.frame-crop` and
 * `.pointer-parallax`.
 */
export function Drift({
  children,
  distance = 40,
  className = "",
  innerClassName = "",
}: DriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div className={`scroll-drift ${innerClassName}`} style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
