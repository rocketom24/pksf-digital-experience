"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GROUND } from "@/components/editorial/grounds";
import { PRIMARY_NAV } from "@/components/navigation/links";
import { useOverlay } from "@/components/navigation/useOverlay";
import { DURATION, EASE_EDITORIAL, STAGGER } from "@/components/motion/tokens";
import { SearchMark } from "@/components/ui/Marks";
import { organization } from "@/data/organization";

type SiteMenuProps = {
  open: boolean;
  onClose: () => void;
  /** Hands the reader to the search panel — the bar's other control, which is
   *  not on screen while this one covers it. */
  onSearch: () => void;
};

const g = GROUND.ink;

/**
 * The navigation, as a full-screen editorial index.
 *
 * This is the whole navigation below `lg`, where the six words do not fit
 * beside the wordmark — so it carries what the panels carry, opened out. Each
 * primary destination is a row at display size with its own destinations set
 * under it as a mono register: one tap to anything, and no disclosure to open
 * first. Above `lg` it is the long form of the same thing.
 *
 * Focus is trapped while it is open and the page behind it cannot scroll —
 * without both, a keyboard user tabs straight out of an overlay that still
 * covers the screen. Both live in `useOverlay`, shared with the search panel.
 */
export function SiteMenu({ open, onClose, onSearch }: SiteMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useOverlay(open, onClose, panelRef);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const item = {
    hidden: { opacity: 0, y: 28 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.editorial, ease: EASE_EDITORIAL },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.small, ease: EASE_EDITORIAL }}
          data-ground="ink"
          className={`fixed inset-0 z-50 flex flex-col overflow-y-auto ${g.bg} ${g.text}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex h-20 shrink-0 items-center justify-between gap-6 px-4.5 md:px-12">
            <span className="flex items-center gap-5">
              {/* The same artwork as the bar. Green on white reads on the
                  charcoal ground as well as it does on the parchment one. */}
              <Image
                src="/images/brand/pksf-logo.png"
                alt={`${organization.shortName} — ${organization.fullName}`}
                width={320}
                height={439}
                className="h-14 w-auto shrink-0"
              />
              <span className={`hidden font-mono text-meta uppercase sm:block ${g.muted}`}>
                Est. {organization.founded} · Bangladesh
              </span>
            </span>

            <span className="flex items-center gap-6 md:gap-8">
              <button
                type="button"
                onClick={onSearch}
                data-cursor="interactive"
                className="group flex items-center gap-2.5 font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
              >
                <SearchMark className="h-4 w-4 shrink-0" />
                Search
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                data-cursor="interactive"
                className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
              >
                Close
              </button>
            </span>
          </div>

          <motion.nav
            aria-label="All sections"
            initial="hidden"
            animate="shown"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.08 } },
            }}
            className="flex flex-1 flex-col justify-center px-4.5 py-10 md:px-12"
          >
            <ol>
              {PRIMARY_NAV.map((entry, i) => (
                <motion.li
                  key={entry.href + entry.label}
                  variants={item}
                  className={`border-t py-4 md:py-6 ${g.border}`}
                >
                  <div className="flex items-baseline gap-5 md:gap-8">
                    <span className={`font-mono text-meta uppercase ${g.muted}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={entry.href}
                      onClick={onClose}
                      data-cursor="interactive"
                      className="group inline-block"
                    >
                      <span className="block font-display text-headline font-semibold uppercase tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
                        {entry.label}
                      </span>
                    </Link>
                  </div>

                  {/* The panel's destinations, set as a register rather than
                      hidden behind a disclosure: on the measure this overlay
                      runs at, three short labels cost one line and save a tap
                      each. Indented to the index column so they read as
                      belonging to the word above them. */}
                  {entry.children && (
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 pl-11 md:pl-14">
                      {entry.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            data-cursor="interactive"
                            className={`font-mono text-meta uppercase underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none ${g.muted}`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ol>

            <motion.div
              variants={item}
              className={`mt-14 flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-start sm:justify-between ${g.border}`}
            >
              <p className={`max-w-md font-mono text-meta uppercase ${g.muted}`}>
                An independent, unofficial concept. Not affiliated with, endorsed
                by, or representative of {organization.fullName}.
              </p>
              <Link
                href="/design-system"
                onClick={onClose}
                data-cursor="interactive"
                className={`font-mono text-meta uppercase underline-offset-4 hover:underline ${g.accent}`}
              >
                Design system
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
