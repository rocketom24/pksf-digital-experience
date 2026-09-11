"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { interventions, type Intervention } from "@/data/interventions";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";

type StrategicExplorerProps = {
  /** Defaults to the real, published intervention list — never invent new ones. */
  items?: Intervention[];
  className?: string;
};

const index = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Interactive index of PKSF's strategic interventions, in two intentionally
 * different shapes rather than one shape shrunk down:
 *
 * - below `lg` (mobile and tablet): a vertical accordion. Ten items never
 *   fit across a phone, and a horizontal rail would hide most of the list
 *   off-screen behind a gesture, so each row expands in place instead.
 * - at `lg` and up: a vertical tablist with a crossfading detail panel,
 *   with full arrow/Home/End keyboard support and a roving tabindex.
 *
 * The two are swapped with CSS `display`, so only one is ever in the
 * accessibility tree. Panel content is always real DOM, so with animation
 * off everything degrades to an instant swap.
 */
export function StrategicExplorer({ items = interventions, className = "" }: StrategicExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(items[0]?.slug ?? null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const active = items[activeIndex];

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
    <div className={className}>
      {/* Mobile + tablet */}
      <ul className="lg:hidden">
        {items.map((item, i) => {
          const open = openSlug === item.slug;
          return (
            <li key={item.slug} className="border-t border-ink/15 last:border-b">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`intervention-accordion-${item.slug}`}
                  onClick={() => setOpenSlug(open ? null : item.slug)}
                  className="flex w-full items-center gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-current"
                >
                  <span className="text-xs font-medium tracking-[0.2em] text-ink/40">{index(i)}</span>
                  <span
                    className={`flex-1 font-display text-2xl transition-colors ${open ? "text-green" : "text-ink"}`}
                  >
                    {item.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-full border border-ink/20 text-lg leading-none transition-transform duration-200 ${
                      open ? "rotate-45" : ""
                    } motion-reduce:transition-none`}
                  >
                    +
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`intervention-accordion-${item.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_EDITORIAL }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-10">
                      <div aria-hidden="true" className="mb-6 aspect-3/2 w-full bg-green-soft sm:aspect-video" />
                      <p className="text-base text-ink/70">{item.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16">
        <div
          role="tablist"
          aria-label="Strategic intervention areas"
          aria-orientation="vertical"
          onKeyDown={handleTabKeyDown}
          className="lg:col-span-5"
        >
          {items.map((item, i) => (
            <button
              key={item.slug}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`intervention-tab-${item.slug}`}
              aria-selected={i === activeIndex}
              aria-controls={`intervention-panel-${item.slug}`}
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={`flex w-full items-baseline gap-4 border-t border-ink/15 py-5 text-left text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-current ${
                i === activeIndex ? "text-green" : "text-ink/70 hover:text-ink"
              }`}
            >
              <span className="text-xs tracking-[0.2em] text-ink/40">{index(i)}</span>
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
              tabIndex={0}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : DURATION.standard, ease: EASE_EDITORIAL }}
              className="focus-visible:outline-2 focus-visible:outline-current"
            >
              <div aria-hidden="true" className="mb-8 aspect-video w-full bg-green-soft" />
              <span className="text-xs font-medium tracking-[0.2em] text-ink/40">
                {index(activeIndex)} / {index(items.length - 1)}
              </span>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">{active.name}</h3>
              <p className="mt-4 max-w-xl text-lg text-ink/70">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
