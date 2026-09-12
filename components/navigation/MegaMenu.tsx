"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { type NavItem } from "@/components/navigation/links";
import { DURATION, EASE_EDITORIAL, STAGGER } from "@/components/motion/tokens";

type MegaMenuProps = {
  item: NavItem;
  /** Fires when a destination inside the panel is taken. */
  onNavigate: () => void;
  id: string;
};

/**
 * How many columns a set of destinations runs at. Tailwind reads these as
 * literals, so the map exists rather than an interpolated class.
 *
 * Four does **not** run as four columns. Eight of the twelve columns divided
 * four ways is 216px, and "transformation" set at `text-title` is 290px of one
 * unbreakable word — it ran straight out of the panel. Four runs as two by
 * two, which keeps every title at the size the three-column panels set it at
 * rather than shrinking the type in one panel only.
 */
const COLUMNS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2",
};

const panel = {
  hidden: { opacity: 0, y: -10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.small,
      ease: EASE_EDITORIAL,
      staggerChildren: STAGGER.tight,
      delayChildren: 0.04,
    },
  },
  gone: { opacity: 0, y: -10, transition: { duration: DURATION.fast, ease: EASE_EDITORIAL } },
};

const cell = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION.small, ease: EASE_EDITORIAL } },
  gone: { opacity: 0, transition: { duration: DURATION.fast } },
};

/**
 * The panel under a primary word.
 *
 * It is a section of the page rather than a dropdown: the parchment ground the
 * bar takes once it has scrolled, a hairline at the foot, the statement on the
 * left and the destinations ruled across the right. Nothing in it is a card —
 * the page has no cards, and a navigation that invents a component the site
 * does not otherwise use announces itself as a widget.
 *
 * It is absolutely positioned under a `fixed` header with no `backdrop-filter`
 * anywhere above it, so it escapes the bar's 80px row without needing a portal.
 * Two panels are briefly on screen when the pointer moves from one word to the
 * next; they are stacked in the same place and cross-fade, which is why the
 * exit is shorter than the entrance.
 */
export function MegaMenu({ item, onNavigate, id }: MegaMenuProps) {
  const children = item.children ?? [];

  return (
    <motion.div
      id={id}
      variants={panel}
      initial="hidden"
      animate="shown"
      exit="gone"
      data-ground="parchment"
      className="absolute inset-x-0 top-full border-b border-on-light/12 bg-parchment text-on-light"
    >
      <Container className="py-12 lg:py-16">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <motion.div variants={cell} className="lg:col-span-4">
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-on-light/14" />
              <span className="font-mono text-meta uppercase text-clay">{item.label}</span>
            </span>
            {item.blurb && <p className="mt-6 max-w-sm text-lead text-muted">{item.blurb}</p>}
          </motion.div>

          <ul className={`grid gap-x-10 gap-y-8 lg:col-span-8 ${COLUMNS[children.length] ?? ""}`}>
            {children.map((child, i) => (
              <motion.li key={child.href + child.label} variants={cell}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  data-cursor="interactive"
                  className="group block h-full border-t border-on-light/14 pt-5"
                >
                  <span className="font-mono text-meta uppercase text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-title font-medium tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transition-none">
                      {child.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="translate-x-0 text-clay opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-2 block text-body text-muted">{child.gloss}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </motion.div>
  );
}
