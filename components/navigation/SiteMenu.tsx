"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GROUND } from "@/components/editorial/grounds";
import { NAV_LINKS } from "@/components/navigation/links";
import { DURATION, EASE_EDITORIAL, STAGGER } from "@/components/motion/tokens";
import { organization } from "@/data/organization";

type SiteMenuProps = {
  open: boolean;
  onClose: () => void;
};

const g = GROUND.ink;

/**
 * The navigation, as a full-screen editorial index.
 *
 * The bar itself carries a wordmark and one word, so the page is never
 * topped by a row of competing links. Everything else lives here, at a size
 * that makes the list of sections a composition in its own right.
 *
 * Focus is trapped while it is open and the page behind it cannot scroll —
 * without both, a keyboard user tabs straight out of an overlay that still
 * covers the screen.
 */
export function SiteMenu({ open, onClose }: SiteMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    // Lock the page behind the overlay, restoring the exact scrollbar width
    // so nothing shifts sideways when it opens.
    const { body, documentElement } = document;
    const gutter = window.innerWidth - documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
    };
  }, [open, onClose]);

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
          <div className="flex h-20 items-center justify-between px-4.5 md:px-12">
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
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              data-cursor="interactive"
              className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60"
            >
              Close
            </button>
          </div>

          <motion.nav
            initial="hidden"
            animate="shown"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: STAGGER.tight, delayChildren: 0.08 } },
            }}
            className="flex flex-1 flex-col justify-center px-4.5 py-10 md:px-12"
          >
            <ol>
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.href} variants={item} className={`border-t ${g.border}`}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    data-cursor="interactive"
                    className="group flex items-baseline gap-5 py-3.5 md:gap-8 md:py-5"
                  >
                    <span className={`font-mono text-meta uppercase ${g.muted}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-headline font-semibold uppercase tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 motion-reduce:transition-none">
                      {link.label}
                    </span>
                  </Link>
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
