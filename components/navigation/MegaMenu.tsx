"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { interventions } from "@/data/interventions";

type MegaMenuProps = {
  open: boolean;
};

/** Desktop dropdown panel for "Our Work", surfacing the strategic interventions. */
export function MegaMenu({ open }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-full border-t border-ink/10 bg-background shadow-lg"
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-4 px-4.5 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:px-12">
            {interventions.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="text-sm text-ink/80 transition-colors hover:text-green"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
