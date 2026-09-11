"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, VIEWPORT_ONCE } from "@/components/motion/tokens";
import { THEME_CLASSES, type Theme } from "@/components/editorial/theme";

type FullBleedSectionProps = {
  /** Full-bleed media — a placeholder block or an Image; not clipped by this component. */
  media: ReactNode;
  caption?: string;
  /** Darkens the media for caption legibility. */
  overlay?: boolean;
  theme?: Theme;
  height?: "screen" | "large";
  className?: string;
};

/**
 * Full-bleed editorial media treatment with a clip-path reveal and an
 * optional caption. Accepts any media node (real imagery isn't assumed
 * yet) rather than requiring next/image, unlike `ImageReveal`.
 */
export function FullBleedSection({ media, caption, overlay = false, theme = "dark", height = "large", className = "" }: FullBleedSectionProps) {
  const reduceMotion = useReducedMotion();
  const cls = THEME_CLASSES[theme];

  return (
    <div className={`relative flex flex-col overflow-hidden ${height === "screen" ? "min-h-screen" : "min-h-[85vh]"} ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: reduceMotion ? "inset(0% 0 0 0)" : "inset(0% 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: reduceMotion ? 0 : DURATION.story, ease: EASE_EDITORIAL }}
      >
        {media}
        {overlay && <div aria-hidden="true" className="absolute inset-0 bg-ink/40" />}
      </motion.div>

      {caption && (
        <p className={`relative mt-auto max-w-md px-4.5 pb-12 text-sm ${cls.text} md:px-12`}>{caption}</p>
      )}
    </div>
  );
}
