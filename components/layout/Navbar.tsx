"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRIMARY_LINKS, SECTION_IDS, SECTION_OWNER } from "@/components/navigation/links";
import { SiteMenu } from "@/components/navigation/SiteMenu";
import { organization } from "@/data/organization";

/**
 * The bar carries three things: who this is, roughly where you are, and the
 * way in.
 *
 * Four words and a wordmark, set at metadata size with no boxes, no rules and
 * no icons. It is meant to be almost invisible until you look for it — over
 * the hero photograph it is transparent and sits in the plateau of the hero's
 * top scrim, so it stays legible without a bar of its own; once the page has
 * scrolled it takes the parchment ground and a hairline.
 *
 * The four words are a coarse index, not a second navigation: each owns a run
 * of sections, so the readout keeps reporting a position all the way down the
 * page instead of going blank between anchors. Everything else lives in the
 * overlay. The marking is supplementary — the same sections are reachable
 * from the overlay and from the page itself — so nothing breaks if the
 * observer is unsupported.
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

  const activeHref = current ? SECTION_OWNER[current] : undefined;
  const light = scrolled || menuOpen;

  return (
    <header
      // No `backdrop-filter`: a filter on this fixed ancestor would create a
      // containing block for the fixed overlay below, trapping it inside the
      // bar instead of the viewport.
      // Transparent over the hero, which is a photograph — so the bar takes
      // the same halo the hero's own type uses (`.on-photo`, globals.css)
      // rather than a bar of colour laid across the top of the picture. It
      // sits in the plateau of the hero's cream head zone, which the hero
      // draws and scrolls away with; by then the bar has taken its own
      // parchment ground. The head zone is light rather than dark for the
      // sake of the lockup: the mark is green-on-white artwork and its
      // wordmark vanishes on a dark band.
      data-ground="parchment"
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 motion-reduce:transition-none ${
        light
          ? "border-b border-on-light/12 bg-parchment/95 text-on-light"
          : "on-photo border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-8 px-4.5 md:px-12">
        <div className="flex items-center gap-10 lg:gap-14">
          <Link
            href="/"
            data-cursor="nav"
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
              className="h-14 w-auto shrink-0"
            />
          </Link>

          {/* Hidden on a phone rather than collapsed into a second control:
              the overlay already is the phone navigation, and two ways in
              from a 390px bar is one too many. */}
          <nav aria-label="Sections" className="hidden sm:block">
            <ul className="flex items-baseline gap-7 lg:gap-9">
              {PRIMARY_LINKS.map((link) => {
                const active = link.href === activeHref;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-cursor="nav"
                      aria-current={active ? "true" : undefined}
                      /* No dimming for the inactive words. Over the hero the
                         bar floats on a graded photograph where the mono is
                         5.07:1 at full ink and under the bar at any reduced
                         opacity, so the current section is marked by a rule
                         instead — which is a second channel anyway, rather
                         than a difference in lightness alone. */
                      className="relative block font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-70 motion-reduce:transition-none"
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1.5 left-0 block h-px w-full bg-current"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          data-cursor="nav"
          aria-expanded={menuOpen}
          className="font-mono text-meta uppercase transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
        >
          Menu
        </button>
      </div>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
