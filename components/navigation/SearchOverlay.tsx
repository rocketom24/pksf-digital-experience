"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { GROUND } from "@/components/editorial/grounds";
import { PRIMARY_NAV } from "@/components/navigation/links";
import { searchSite, type SearchEntry } from "@/components/navigation/searchIndex";
import { useOverlay } from "@/components/navigation/useOverlay";
import { DURATION, EASE_EDITORIAL, STAGGER } from "@/components/motion/tokens";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const g = GROUND.ink;

/** Shown before anything is typed — the six ways in, in the bar's own order. */
const SUGGESTED = PRIMARY_NAV.map((item) => item.label);

/**
 * Search, as the same full-screen editorial panel the site menu is.
 *
 * It searches the data the page is built from — sections, the ten intervention
 * areas, projects, programmes, publications, releases, films, the leadership
 * and the published figures — so every result is something PKSF has published
 * or something this page actually sets. Nothing is fetched: the index is the
 * same modules the sections render from.
 *
 * The field takes focus on open, Escape closes, and the arrow keys walk the
 * results and move real focus onto them — so Enter is the browser following a
 * link rather than a second key handler that has to be kept in step with it.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLOListElement>(null);
  const [query, setQuery] = useState("");

  useOverlay(open, onClose, panelRef);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    return () => setQuery("");
  }, [open]);

  const results = useMemo(() => searchSite(query), [query]);

  /** Arrow keys walk the result list; Home goes back to the field. */
  function handleKey(event: React.KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = resultsRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links?.length) return;

    event.preventDefault();
    const list = Array.from(links);
    const at = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowUp" && at <= 0) {
      inputRef.current?.focus();
      return;
    }
    const next = event.key === "ArrowDown" ? at + 1 : at - 1;
    list[Math.max(0, Math.min(list.length - 1, next))]?.focus();
  }

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
          role="dialog"
          aria-modal="true"
          aria-label="Search this site"
          onKeyDown={handleKey}
          className={`fixed inset-0 z-50 flex flex-col ${g.bg} ${g.text}`}
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-4.5 md:px-12">
            <span className={`font-mono text-meta uppercase ${g.muted}`}>Search</span>
            <button
              type="button"
              onClick={onClose}
              data-cursor="interactive"
              className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
            >
              Close
            </button>
          </div>

          <div className="shrink-0 px-4.5 md:px-12">
            {/* The field is the page's display type, not a widget: it is the
                only thing on the screen and there is nothing for it to be
                consistent with except the headings. */}
            <label htmlFor="site-search" className="sr-only">
              Search sections, projects, publications and releases
            </label>
            {/* `type="text"`, not `type="search"`. A search input is given two
                behaviours by the browser that both fight this panel: Chrome
                binds Escape to clearing the field, which swallows the key that
                is supposed to close the dialog, and it draws its own clear
                button in the UA's blue at the end of a field set in the
                page's display face. The focus ring is globals.css's, on
                purpose — it is the one ring the whole site uses. */}
            <input
              ref={inputRef}
              id="site-search"
              type="text"
              inputMode="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              autoComplete="off"
              spellCheck={false}
              data-cursor="interactive"
              className={`w-full border-b bg-transparent pb-5 font-display text-display font-semibold tracking-tight placeholder:opacity-30 ${g.border}`}
            />

            <p className={`mt-5 font-mono text-meta uppercase ${g.muted}`}>
              {query.trim()
                ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                : `Try: ${SUGGESTED.join(" · ")}`}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4.5 pb-16 pt-10 md:px-12">
            {query.trim() && !results.length && (
              <p className={`max-w-xl text-lead ${g.muted}`}>
                Nothing on this page matches that. The search only covers what is
                published here — PKSF&rsquo;s own site carries more.
              </p>
            )}

            {results.length > 0 && (
              <motion.ol
                ref={resultsRef}
                initial="hidden"
                animate="shown"
                variants={{
                  hidden: {},
                  shown: { transition: { staggerChildren: STAGGER.tight } },
                }}
              >
                {results.map((item) => (
                  <ResultRow key={item.id} item={item} onNavigate={onClose} />
                ))}
              </motion.ol>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const row = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.small, ease: EASE_EDITORIAL },
  },
};

function ResultRow({ item, onNavigate }: { item: SearchEntry; onNavigate: () => void }) {
  const inner = (
    <>
      <span className={`shrink-0 font-mono text-meta uppercase sm:w-40 ${g.accent}`}>
        {item.kind}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-title font-medium transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none">
          {item.title}
        </span>
        {item.gloss && <span className={`mt-2 block text-body ${g.muted}`}>{item.gloss}</span>}
      </span>
      {/* The outbound mark is the same arrow, turned — not U+2197. That
          codepoint has an emoji presentation and Chrome on Windows takes it
          even with a U+FE0E selector, so the mark arrives as a blue tile in
          the middle of a mono register. Rotating the one glyph the page
          already uses keeps both arrows in the same face. */}
      <span
        aria-hidden="true"
        className={`shrink-0 font-mono text-meta ${g.muted} ${item.external ? "-rotate-45" : ""}`}
      >
        →
      </span>
    </>
  );

  const className =
    "group flex items-baseline gap-4 py-5 sm:gap-8 outline-none focus-visible:opacity-100";

  return (
    <motion.li variants={row} className={`border-t ${g.border}`}>
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="view"
          className={className}
        >
          {inner}
        </a>
      ) : (
        <Link href={item.href} onClick={onNavigate} data-cursor="interactive" className={className}>
          {inner}
        </Link>
      )}
    </motion.li>
  );
}
