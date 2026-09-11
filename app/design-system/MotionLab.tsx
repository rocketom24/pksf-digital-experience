"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { GROUND } from "@/components/editorial/grounds";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";

const REGISTERS = [
  {
    name: "Small",
    range: "200–400ms",
    tokens: "DURATION.fast · DURATION.small",
    use: "Hover, focus, buttons, navigation affordances.",
    duration: DURATION.small,
  },
  {
    name: "Editorial",
    range: "500–900ms",
    tokens: "DURATION.editorial · DURATION.slow",
    use: "Text and image reveals, section entrances, panel swaps.",
    duration: DURATION.editorial,
  },
  {
    name: "Cinematic",
    range: "900–1600ms",
    tokens: "DURATION.cinematic",
    use: "Hero choreography and full-screen storytelling. Used sparingly.",
    duration: DURATION.cinematic,
  },
];

/**
 * Live comparison of the three motion registers, played together so the
 * difference between them is the thing on show rather than any one curve.
 * Under reduced motion the bars simply sit at their end state.
 */
export function MotionLab({ className = "" }: { className?: string }) {
  const [run, setRun] = useState(0);
  const g = GROUND.parchment;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        data-cursor="interactive"
        className={`font-mono text-meta uppercase underline-offset-4 transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none ${g.accent}`}
      >
        Play all three ↻
      </button>

      <dl className="mt-10">
        {REGISTERS.map((register) => (
          <div
            key={register.name}
            className={`grid grid-cols-1 gap-4 border-t py-8 md:grid-cols-12 md:gap-8 ${g.border}`}
          >
            <dt className="md:col-span-3">
              <span className="font-display text-title font-semibold">{register.name}</span>
              <span className="mt-1 block font-mono text-meta uppercase text-muted">
                {register.range}
              </span>
            </dt>
            <dd className="md:col-span-4">
              <p className="text-body text-muted">{register.use}</p>
              <p className="mt-2 font-mono text-meta uppercase text-muted">{register.tokens}</p>
            </dd>
            <dd className="md:col-span-5">
              <div className={`h-10 w-full ${g.rule}`}>
                <motion.span
                  key={`${register.name}-${run}`}
                  className="block h-full origin-left bg-clay"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: register.duration,
                    ease: EASE_EDITORIAL,
                  }}
                />
              </div>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 max-w-2xl text-body text-muted">
        One easing curve throughout — a fast departure and a long settle — so
        movement has anticipation at the start and weight at the end without a
        different curve per component.
      </p>
    </div>
  );
}
