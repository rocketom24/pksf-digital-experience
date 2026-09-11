"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileMenu, type NavLink } from "@/components/navigation/MobileMenu";
import { SearchOverlay } from "@/components/navigation/SearchOverlay";
import { organization } from "@/data/organization";

// Every entry points at a section that exists. Dedicated routes (/about,
// /work/<slug>, …) are not built yet, and linking to them 404s and fills the
// console with failed prefetches — so the nav addresses the homepage instead
// until those pages are real.
const links: NavLink[] = [
  { label: "About", href: "/#statement" },
  { label: "Our Work", href: "/#interventions" },
  { label: "Impact", href: "/#impact" },
  { label: "Knowledge", href: "/#knowledge" },
  { label: "Digital", href: "/#digital" },
  { label: "News", href: "/#news" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 32);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = scrolled || menuOpen || searchOpen;

  return (
    // No backdrop-blur here: a `filter`/`backdrop-filter` on this fixed ancestor would
    // create a new containing block for the fixed-position MegaMenu/MobileMenu/
    // SearchOverlay below, trapping them inside this 80px bar instead of the viewport.
    // `bg-background/95` alone gives a near-solid state without that side effect.
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-background/95 text-ink shadow-sm" : "bg-transparent text-white"
      }`}
    >
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight">
          {organization.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((link) =>
            link.label === "Our Work" ? (
              <div
                key={link.href}
                onMouseEnter={() => setWorkOpen(true)}
                onMouseLeave={() => setWorkOpen(false)}
                onFocus={() => setWorkOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) setWorkOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setWorkOpen(false);
                    event.currentTarget.querySelector("a")?.focus();
                  }
                }}
                className="relative"
              >
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  aria-expanded={workOpen}
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
                <MegaMenu open={workOpen} />
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="text-sm font-medium transition-opacity hover:opacity-70">
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-sm font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-current"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-sm font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-current"
          >
            Menu
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
