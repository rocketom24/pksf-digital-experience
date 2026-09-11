"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { interventions, type Intervention } from "@/data/interventions";
import { Frame } from "@/components/editorial/Frame";
import { GROUND_VARS, type Ground } from "@/components/editorial/grounds";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import type { PlateVariant } from "@/components/home/Plate";

type StrategicExplorerProps = {
  /** Defaults to the real, published intervention list — never invent new ones. */
  items?: Intervention[];
  className?: string;
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Each intervention gets its own ground, so moving through the ten is a
 * journey across the palette rather than ten states of one panel. The
 * assignment groups the areas loosely by register — the economic ones on
 * forest, the land ones on moss, the human ones on ink, digital on paper —
 * which gives the sequence a rhythm instead of a cycle. It is a visual
 * grouping only and is never presented as a published taxonomy.
 */
const GROUNDS: Ground[] = [
  "forest", // Inclusive Finance
  "moss", // Climate Action
  "forest", // Microenterprise Development
  "ink", // Extreme Poverty
  "ink", // Human Capacity
  "paper", // Digital Transformation
  "moss", // Agricultural Development
  "forest", // Strategic Alliances
  "moss", // Building Resilience
  "ink", // Knowledge, Communication & Advocacy
];

const PLATES: PlateVariant[] = ["delta", "strata", "weave"];

type FactsProps = {
  item: Intervention;
  vars: (typeof GROUND_VARS)[Ground];
  className?: string;
};

/**
 * The published evidence under an area: one figure with the period it was
 * reported for, and the programmes and projects PKSF files here.
 *
 * Set as a ruled row and a mono list rather than a card and a set of chips —
 * the explorer is one composition that changes state, and boxing the
 * supporting facts would break it into a dashboard. The reporting date is
 * never dropped: without it the figure reads as current rather than as of a
 * stated day.
 */
function InterventionFacts({ item, vars, className = "" }: FactsProps) {
  if (!item.stat && !item.examples) return null;

  return (
    <div
      className={`border-t pt-6 ${className}`}
      style={{ borderColor: "color-mix(in srgb, currentColor 18%, transparent)" }}
    >
      {item.stat && (
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-title" style={{ color: vars.accent }}>
            {item.stat.value}
          </span>
          <span className="max-w-sm font-mono text-meta uppercase" style={{ color: vars.muted }}>
            {item.stat.label}
            <span className="ml-2 opacity-75">— {item.stat.asOf}</span>
          </span>
        </p>
      )}

      {item.examples && (
        <ul
          className={`flex flex-wrap gap-x-6 gap-y-2 ${item.stat ? "mt-6" : ""}`}
          style={{ color: vars.muted }}
        >
          {item.examples.map((example) => (
            <li key={example} className="font-mono text-meta uppercase">
              {example}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The ten strategic intervention areas.
 *
 * Two intentionally different compositions rather than one shrunk down:
 *
 * - `lg` and up: a vertical index on the left and a full stage on the right,
 *   where the selected area takes over the whole section — ground colour,
 *   an oversized numeral behind the title, a new plate. Full roving-tabindex
 *   keyboard support (arrows, Home, End).
 * - below `lg`: an accordion, because ten items never fit across a phone and
 *   a horizontal rail would hide eight of them behind a gesture. The ground
 *   still changes with the selection, so the colour story survives on mobile.
 *
 * The two are swapped with `display`, so only one is ever in the
 * accessibility tree. Panel content is always real DOM; with animation off
 * everything degrades to an instant swap of fully-painted states.
 */
export function StrategicExplorer({ items = interventions, className = "" }: StrategicExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = items[activeIndex];
  const ground = GROUNDS[activeIndex % GROUNDS.length];
  const vars = GROUND_VARS[ground];

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    let next: number;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = activeIndex === last ? 0 : activeIndex + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = activeIndex === 0 ? last : activeIndex - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div
      /* The ground here changes with the selection, so the cursor reads it
         from the live attribute rather than from a fixed section. */
      data-ground={ground}
      className={`ground-shift [overflow-x:clip] ${className}`}
      style={{ backgroundColor: vars.bg, color: vars.text }}
    >
      {/* ── Mobile and tablet ─────────────────────────────────────────── */}
      <ul className="px-4.5 py-16 md:px-12 lg:hidden">
        {items.map((item, i) => {
          const open = i === activeIndex && mobileOpen;
          return (
            <li
              key={item.slug}
              className="border-t border-current/20 last:border-b"
              style={{ borderColor: "color-mix(in srgb, currentColor 22%, transparent)" }}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`intervention-panel-${item.slug}`}
                  onClick={() => {
                    if (i === activeIndex) setMobileOpen((v) => !v);
                    else {
                      setActiveIndex(i);
                      setMobileOpen(true);
                    }
                  }}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span
                    className="font-mono text-meta uppercase"
                    style={{ color: open ? vars.accent : vars.muted }}
                  >
                    {pad(i)}
                  </span>
                  <span className="flex-1 font-display text-title font-semibold text-balance">
                    {item.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-full border text-lg leading-none transition-transform duration-200 motion-reduce:transition-none ${
                      open ? "rotate-45" : ""
                    }`}
                    style={{ borderColor: "color-mix(in srgb, currentColor 30%, transparent)" }}
                  >
                    +
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`intervention-panel-${item.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DURATION.small, ease: EASE_EDITORIAL }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10">
                      {/* 16:9 rather than 4:3 — at full column width on a
                          tablet a 4:3 frame is taller than the rest of the
                          open row put together. */}
                      <Frame
                        ratio="wide"
                        plate={PLATES[i % PLATES.length]}
                        ground={ground}
                        className="mb-6"
                      />
                      <p className="text-lead" style={{ color: vars.muted }}>
                        {item.description}
                      </p>
                      <InterventionFacts item={item} vars={vars} className="mt-8" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* ── Desktop ───────────────────────────────────────────────────── */}
      <div className="hidden px-4.5 py-24 md:px-12 lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="lg:col-span-4">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-mono text-meta uppercase" style={{ color: vars.accent }}>
              {pad(activeIndex)}
            </span>
            <span className="font-mono text-meta uppercase" style={{ color: vars.muted }}>
              of {pad(items.length - 1)}
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1"
              style={{ backgroundColor: "color-mix(in srgb, currentColor 22%, transparent)" }}
            >
              <motion.span
                className="block h-full origin-left bg-current"
                animate={{ scaleX: (activeIndex + 1) / items.length }}
                transition={{ duration: DURATION.editorial, ease: EASE_EDITORIAL }}
              />
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Strategic intervention areas"
            aria-orientation="vertical"
            onKeyDown={handleTabKeyDown}
          >
            {items.map((item, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={item.slug}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`intervention-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls={`intervention-stage-${item.slug}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  data-cursor="interactive"
                  className="group flex w-full items-baseline gap-4 border-t py-4 text-left"
                  style={{
                    borderColor: "color-mix(in srgb, currentColor 18%, transparent)",
                    color: selected ? vars.accent : vars.muted,
                  }}
                >
                  <span className="font-mono text-meta uppercase">{pad(i)}</span>
                  <span
                    className={`font-display text-xl transition-[opacity,transform] duration-200 group-hover:translate-x-1 motion-reduce:transition-none ${
                      selected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The stage. The numeral is set at display scale behind the title so
            the two overlap — the composition changes shape, not just colour,
            as the selection moves down a list of ten. */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              id={`intervention-stage-${active.slug}`}
              role="tabpanel"
              aria-labelledby={`intervention-tab-${active.slug}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: DURATION.editorial, ease: EASE_EDITORIAL }}
            >
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[0.08em] -top-[0.28em] select-none font-display text-colossal font-bold leading-none"
                  style={{ color: "color-mix(in srgb, currentColor 13%, transparent)" }}
                >
                  {pad(activeIndex)}
                </span>
                <h3 className="relative max-w-3xl font-display text-display font-semibold text-balance">
                  {active.name}
                </h3>
              </div>

              <p className="relative mt-8 max-w-xl text-lead" style={{ color: vars.muted }}>
                {active.description}
              </p>

              <InterventionFacts item={active} vars={vars} className="relative mt-10" />

              <Frame
                ratio="wide"
                plate={PLATES[activeIndex % PLATES.length]}
                treatment="crop"
                ground={ground}
                className="mt-12"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
