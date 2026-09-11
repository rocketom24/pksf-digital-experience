"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

/** Full-screen search shell. No search logic wired yet — foundation only. */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
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
          className="fixed inset-0 z-50 flex flex-col bg-background text-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="flex justify-end px-4.5 py-6 md:px-12">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-current"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 items-center px-4.5 md:px-12">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search the site…"
              className="w-full border-b border-ink/20 bg-transparent font-display text-4xl placeholder:text-ink/30 focus:outline-none sm:text-6xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
