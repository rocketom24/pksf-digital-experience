"use client";

import { motion } from "motion/react";
import { DURATION, EASE_EDITORIAL, STAGGER, VIEWPORT_ONCE } from "@/components/motion/tokens";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type OdometerProps = {
  /** The number exactly as published. Digits roll; separators are painted. */
  value: string;
  /** Painted before and after the digits, and never rolled. */
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * A figure that counts itself up.
 *
 * Each digit is a column of the ten numerals behind a one-em window; arriving
 * at the figure is the column sliding to the right one. It runs when the
 * figure enters the viewport, and again whenever the value changes — which is
 * what the facet toggle does, so switching from a reach figure to a financing
 * figure re-rolls the number rather than swapping it.
 *
 * Three things keep it honest rather than decorative:
 *
 *   · The value is a string, so the published form — the separators, the
 *     decimal — is what is set, not a re-derivation of it.
 *   · The whole figure is announced once, as text, on the wrapper. The rolling
 *     columns are hidden from assistive technology; a screen reader that read
 *     them would read every numeral of every column.
 *   · The movement is a transform, so `reducedMotion="user"` on the page's
 *     MotionConfig skips it to its end state. Under reduced motion the number
 *     is simply set. Nothing about the figure depends on the roll having run.
 */
export function Odometer({ value, prefix, suffix, className = "" }: OdometerProps) {
  const label = `${prefix ?? ""}${value}${suffix ?? ""}`;

  return (
    // `tabular-nums` so every numeral in a column is the same width as the
    // invisible one sizing the window — without it the digits jitter sideways
    // as they roll.
    <span className={`inline-flex items-baseline leading-none tabular-nums ${className}`}>
      {/* The figure, once, as text. The columns below are hidden from
          assistive technology: read out, they are every numeral of every
          column, in order. */}
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" className="inline-flex items-baseline">
        {prefix && <span className="opacity-60">{prefix}</span>}

        {[...value].map((char, i) =>
          /\d/.test(char) ? (
            <Digit key={i} digit={Number(char)} index={i} />
          ) : (
            <span key={i} className="opacity-60">
              {char}
            </span>
          )
        )}

        {suffix && <span className="opacity-60">{suffix}</span>}
      </span>
    </span>
  );
}

function Digit({ digit, index }: { digit: number; index: number }) {
  return (
    // An invisible numeral sits in flow to size the window; the rolling column
    // is absolute over it. Sizing the window in `em` instead would need a
    // hard-coded advance width per typeface, and would drift the moment the
    // display face changed.
    <span className="relative inline-block h-[1em] overflow-hidden align-baseline">
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: "0%" }}
        whileInView={{ y: `-${digit * 10}%` }}
        viewport={VIEWPORT_ONCE}
        transition={{
          duration: DURATION.cinematic,
          // Left to right, so the figure resolves the way it is read.
          delay: index * STAGGER.tight,
          ease: EASE_EDITORIAL,
        }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] leading-[1em]">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
