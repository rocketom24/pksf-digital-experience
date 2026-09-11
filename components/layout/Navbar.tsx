"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SECTION_IDS } from "@/components/navigation/links";
import { SiteMenu } from "@/components/navigation/SiteMenu";
import { organization } from "@/data/organization";

/**
 * The bar carries three things: who this is, where you are, and the way in.
 *
 * There is no row of links. A page this long needs wayfinding more than it
 * needs a persistent menu, so the middle slot reports the section you are
 * currently reading and everything else lives in the overlay. The readout is
 * supplementary — the same sections are reachable from the overlay and from
 * the page itself — so nothing breaks if the observer is unsupported.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

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

  const label = NAV_LINKS.find((link) => link.href === `/#${current}`)?.label;

  return (
    <header
      // No `backdrop-filter`: a filter on this fixed ancestor would create a
      // containing block for the fixed overlay below, trapping it inside the
      // bar instead of the viewport.
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 motion-reduce:transition-none ${
        scrolled || menuOpen
          ? "border-b border-on-light/12 bg-parchment/95 text-on-light"
          : "border-b border-transparent bg-transparent text-on-dark"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4.5 md:px-12">
        <Link
          href="/"
          data-cursor="interactive"
          className="font-display text-xl font-semibold tracking-tight"
        >
          {organization.shortName}
        </Link>

        <div className="flex items-center gap-6">
          {/* `aria-live` is off: this narrates scrolling, which a screen
              reader user is already tracking through the headings. */}
          <span className="hidden font-mono text-meta uppercase opacity-60 sm:block">
            {label ?? "Independent concept"}
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor="interactive"
            aria-expanded={menuOpen}
            className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
          >
            Menu
          </button>
        </div>
      </div>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
