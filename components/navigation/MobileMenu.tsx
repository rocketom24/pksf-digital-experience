"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type NavLink = { label: string; href: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

/** Full-screen mobile/primary navigation overlay. */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink text-background"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex justify-end px-4.5 py-6 md:px-12">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="text-sm font-medium uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-green"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-4.5 md:px-12">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-5xl leading-tight sm:text-6xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
