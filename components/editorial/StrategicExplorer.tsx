"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { interventions, type Intervention } from "@/data/interventions";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";

type StrategicExplorerProps = {
  /** Defaults to the real, published intervention list — never invent new ones. */
  items?: Intervention[];
  className?: string;
};

/**
 * Interactive index of PKSF's strategic interventions: a numbered list of
 * triggers (buttons, so click/tap/Enter/Space and Tab all work natively)
 * and a detail panel that crossfades on selection. The panel content is
 * always real DOM, so it degrades to an instant swap with animation off.
 */
export function StrategicExplorer({ items = interventions, className = "" }: StrategicExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = items[activeIndex];

  return (
    <div className={`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 ${className}`}>
      <div
        role="tablist"
        aria-label="Strategic intervention areas"
        aria-orientation="vertical"
        className="flex gap-3 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
      >
        {items.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            id={`intervention-tab-${item.slug}`}
            aria-selected={i === activeIndex}
            aria-controls={`intervention-panel-${item.slug}`}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 border-ink/10 px-5 py-4 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-green lg:w-full lg:border-t lg:px-0 lg:py-5 lg:text-base ${
              i === activeIndex ? "text-green" : "text-ink/70 hover:text-ink"
            } rounded-full border lg:rounded-none`}
          >
            <span className="mr-3 text-muted">{String(i + 1).padStart(2, "0")}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            id={`intervention-panel-${active.slug}`}
            role="tabpanel"
            aria-labelledby={`intervention-tab-${active.slug}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.standard, ease: EASE_EDITORIAL }}
          >
            <div aria-hidden="true" className="mb-8 aspect-[16/9] w-full bg-green-soft" />
            <h3 className="font-display text-3xl md:text-4xl">{active.name}</h3>
            <p className="mt-4 max-w-xl text-lg text-muted">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
