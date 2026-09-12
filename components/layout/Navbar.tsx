"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { PRIMARY_NAV, SECTION_IDS, SECTION_OWNER } from "@/components/navigation/links";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { SiteMenu } from "@/components/navigation/SiteMenu";
import { Magnetic } from "@/components/motion/Magnetic";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { SearchMark } from "@/components/ui/Marks";
import { organization } from "@/data/organization";

/** How long the panel survives the pointer leaving it. Short enough not to
 *  hang around, long enough to cross the gap between a word and its panel. */
const CLOSE_DELAY = 160;

const panelId = (href: string) => `nav-panel-${href.replace(/\W+/g, "-")}`;

/**
 * The bar carries six words, a way to search, and the way in.
 *
 * The words are real destinations now rather than a coarse index: four of them
 * open a panel that addresses the sections under them directly, so nothing on
 * this page is more than two moves from the top of the screen. It is still
 * almost invisible until you look for it — no boxes, no rules, metadata size —
 * and over the hero photograph it is transparent and sits in the plateau of the
 * hero's top scrim. Once the page has scrolled, or anything is open, it takes
 * the parchment ground and a hairline.
 *
 * One marker slides between the words: it rests under whichever section the
 * reader is in and travels to whatever the pointer is over, returning when the
 * pointer leaves. That is the whole hover state — there is no dimming of the
 * inactive words, because over the hero the bar floats on a graded photograph
 * where the mono is 5.07:1 at full ink and under it at any reduced opacity.
 *
 * Below `lg` the words are hidden rather than compressed: six of them will not
 * fit beside a wordmark on an 834px measure, and the overlay is the same
 * navigation with the panels opened out as groups.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openHref, setOpenHref] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;

    // A band across the upper third of the viewport: whatever sits in it is
    // what the reader is looking at. Keyed on the top of each section so a
    // section taller than the screen still reports correctly.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closePanel = useCallback(() => {
    cancelClose();
    setOpenHref(null);
    setHoveredHref(null);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenHref(null);
      setHoveredHref(null);
    }, CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Escape closes the panel; ⌘K / Ctrl-K and `/` open search, but never while
  // the visitor is typing into something — `/` is a character before it is a
  // shortcut.
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel();

      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");

      const shortcut =
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey);

      if (!shortcut) return;
      event.preventDefault();
      closePanel();
      setMenuOpen(false);
      setSearchOpen(true);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closePanel]);

  const activeHref = current ? SECTION_OWNER[current] : undefined;
  // What the sliding marker sits under: the pointer wins over the open panel,
  // and the open panel wins over where the reader actually is.
  const markedHref = hoveredHref ?? openHref ?? activeHref;
  const open = PRIMARY_NAV.find((item) => item.href === openHref && item.children?.length);
  const light = scrolled || menuOpen || searchOpen || Boolean(open);

  return (
    <header
      // No `backdrop-filter`: a filter on this fixed ancestor would create a
      // containing block for the fixed overlays below, trapping them inside
      // the bar instead of the viewport.
      data-ground="parchment"
      className="fixed inset-x-0 top-0 z-40"
    >
      {/* The bar and its panel are one hover region, so crossing the seam
          between a word and the panel it opened never closes it. Focus
          leaving the region closes it too, which is what a keyboard reader
          tabbing past the last destination expects.

          This element is also what the bar *is*, once the page has moved: at
          the top it is the full measure of the window, and after 24px of
          scroll it contracts to an inset panel with its own edge. That is not
          decoration — the bar is opaque and fixed, so everything it does not
          cover is content the reader gets back. The horizontal timeline in
          "Digital transformation" is where that is worth the most: its panels
          are centred in the window, and the top line of each one — the index
          and its "Delivered" label — used to pass behind a full-width bar.

          The panels below are `absolute inset-x-0` against this box, so they
          take the contracted measure with it and stay attached to the bar. */}
      <div
        onPointerLeave={scheduleClose}
        onPointerEnter={cancelClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closePanel();
        }}
        className={`relative mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          scrolled
            ? "compact mt-2.5 w-[calc(100%-1.5rem)] max-w-[1180px] rounded-2xl md:w-[calc(100%-4rem)]"
            : "mt-0 w-full max-w-[1440px] rounded-none"
        } ${open ? "rounded-b-none" : ""} ${
          light
            ? `border border-on-light/12 bg-parchment text-on-light ${
                scrolled ? "shadow-[0_10px_40px_-24px_rgba(20,20,18,0.55)]" : "border-x-transparent border-t-transparent"
              }`
            : "on-photo border border-transparent bg-transparent"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            scrolled ? "h-14 px-5 md:px-8" : "h-20 px-4.5 md:px-12"
          }`}
        >
          <div className="flex items-center gap-10 lg:gap-12">
            <Link
              href="/"
              data-cursor="nav"
              onPointerEnter={closePanel}
              aria-label={`${organization.shortName} — ${organization.fullName}`}
              className="flex items-center"
            >
              {/* PKSF's own lockup, rendered as artwork rather than recoloured.
                  An earlier version masked it with `currentColor` to get a
                  reverse of it, which silently destroyed it: the hexagon's
                  interior is opaque white in the source file, not transparent,
                  so the mask filled the whole shape and it came out a solid
                  blob. The mark is green on white by design and reads on both
                  grounds the bar uses — the sunlit field and the parchment —
                  so it is simply drawn as it is. */}
              <Image
                src="/images/brand/pksf-logo.png"
                alt=""
                aria-hidden="true"
                width={320}
                height={439}
                priority
                className={`w-auto shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  scrolled ? "h-10" : "h-14"
                }`}
              />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-baseline gap-7 xl:gap-9">
                {PRIMARY_NAV.map((item) => {
                  const hasPanel = Boolean(item.children?.length);
                  const id = panelId(item.href);
                  return (
                    // The `li` is deliberately **not** positioned. Its panel is
                    // rendered inside it — which is what makes Tab go from a
                    // word into its own destinations and then on to the next
                    // word, rather than across all six words first — and the
                    // panel has to size against the bar, not against a 60px
                    // word. With the `li` static, `absolute inset-x-0 top-full`
                    // resolves against the bar's own `relative` wrapper.
                    <li
                      key={item.href + item.label}
                      onPointerEnter={() => {
                        cancelClose();
                        setHoveredHref(item.href);
                        setOpenHref(hasPanel ? item.href : null);
                      }}
                    >
                      <Link
                        href={item.href}
                        data-cursor="nav"
                        aria-current={item.href === activeHref ? "true" : undefined}
                        aria-expanded={hasPanel ? item.href === openHref : undefined}
                        aria-controls={hasPanel && item.href === openHref ? id : undefined}
                        onFocus={() => {
                          cancelClose();
                          setHoveredHref(item.href);
                          setOpenHref(hasPanel ? item.href : null);
                        }}
                        onClick={closePanel}
                        className="relative block font-mono text-meta uppercase"
                      >
                        <Magnetic>{item.label}</Magnetic>

                        {item.href === markedHref && (
                          <motion.span
                            // One element for the whole row: Motion animates it
                            // between the words rather than fading a rule in
                            // under each one, which is what makes the bar read
                            // as a single instrument.
                            layoutId="nav-marker"
                            aria-hidden="true"
                            className="absolute -bottom-1.5 left-0 block h-px w-full bg-current"
                            transition={{ duration: DURATION.small, ease: EASE_EDITORIAL }}
                          />
                        )}
                      </Link>

                      <AnimatePresence>
                        {hasPanel && item.href === openHref && (
                          <MegaMenu id={id} item={item} onNavigate={closePanel} />
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <button
              type="button"
              onClick={() => {
                closePanel();
                setSearchOpen(true);
              }}
              onPointerEnter={closePanel}
              data-cursor="nav"
              aria-expanded={searchOpen}
              aria-keyshortcuts="Control+K Meta+K"
              className="group flex items-center gap-2.5 font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
            >
              <SearchMark className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 motion-reduce:transition-none" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => {
                closePanel();
                setMenuOpen(true);
              }}
              onPointerEnter={closePanel}
              data-cursor="nav"
              aria-expanded={menuOpen}
              className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
            >
              Menu
            </button>
          </div>
        </div>

      </div>

      <SiteMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
