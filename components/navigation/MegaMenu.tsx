"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { interventions } from "@/data/interventions";
import { EASE_EDITORIAL } from "@/components/motion/tokens";

type MegaMenuProps = {
  open: boolean;
};

/** Desktop dropdown panel for "Our Work", surfacing the strategic interventions with a staggered reveal. */
export function MegaMenu({ open }: MegaMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
          className="fixed left-0 right-0 top-20 border-t border-ink/10 bg-background shadow-lg"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.04 } } }}
            className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-2 px-4.5 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:px-12"
          >
            {interventions.map((item) => (
              <motion.div
                key={item.slug}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.4, ease: EASE_EDITORIAL } },
                }}
              >
                <Link
                  href={`/work/${item.slug}`}
                  className="font-display text-xl text-ink/80 transition-colors hover:text-green focus-visible:text-green"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
