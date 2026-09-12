"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { Button } from "@/components/ui/Button";
import { roster, rosterByTitle, teamSource } from "@/data/team";

const PANEL_ID = "team-roster";

/**
 * The rest of the register, on request.
 *
 * The five above are the management tier; this is everyone PKSF publishes,
 * grouped by designation and kept in the register's own order on both axes.
 * It is behind a control rather than open by default for one reason: it is
 * 349 names, and 349 names printed under five portraits is a directory with a
 * team section stuck to the top of it.
 *
 * ── What it deliberately does not do ──────────────────────────────────────
 * No photographs. PKSF publishes one for every person, and rendering 349 of
 * them would pull several hundred remote images into a page that is otherwise
 * static — for a list that is read by name. The five portraits above are the
 * five the section is about.
 *
 * ── Motion ────────────────────────────────────────────────────────────────
 * The panel fades and rises; it does not animate its own height. A height
 * transition on several thousand pixels of text means laying the whole list
 * out on every frame, and the one it would buy is a control that the reader
 * is already looking at. Nothing inside the panel is revealed on scroll
 * either: the list is far taller than the viewport, and a `whileInView`
 * reveal on something taller than the viewport can silently never fire.
 */
export function TeamRoster({ ground = "paper" }: { ground?: Ground }) {
  const [open, setOpen] = useState(false);
  const g = GROUND[ground];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        <Button
          variant="solid"
          ground={ground}
          onClick={() => setOpen((was) => !was)}
          aria-expanded={open}
          aria-controls={PANEL_ID}
          /* The triangle reads this and says "Explore" — the one word this
             control is actually offering. It overrides the Button's default
             because it is spread after it. */
          data-cursor="explore"
        >
          {open ? "Close the full register" : "Explore the full team"}
        </Button>

        <Meta ground={ground}>
          {roster.length} people · {rosterByTitle.length} designations
        </Meta>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={PANEL_ID}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: DURATION.editorial, ease: EASE_EDITORIAL }}
            className="mt-14"
          >
            <ProvenanceMark
              kind="verified"
              ground={ground}
              note={`${teamSource.label} — every name and designation as published, in PKSF's own order. Office contact details are on that page and are deliberately not reproduced here.`}
              className="max-w-2xl"
            />

            <div className={`mt-10 border-t ${g.border}`}>
              {rosterByTitle.map((group) => (
                <div
                  key={group.title}
                  className={`grid gap-x-8 gap-y-5 border-b py-8 lg:grid-cols-12 ${g.border}`}
                >
                  {/* The designation, verbatim, with the number of people
                      holding it — which is the one fact the grouping adds and
                      the register does not print. */}
                  <h4 className="lg:col-span-3">
                    <span className="font-mono text-meta uppercase">{group.title}</span>
                    <span className={`ml-3 font-mono text-meta ${g.muted}`}>
                      {String(group.names.length).padStart(2, "0")}
                    </span>
                  </h4>

                  {/* CSS columns rather than a grid: the names flow down one
                      column and into the next, which is how a register reads,
                      and it costs no JavaScript at any width. */}
                  <ul className="columns-1 gap-x-8 sm:columns-2 lg:col-span-9 lg:columns-3 [&>li]:break-inside-avoid">
                    {group.names.map((name, i) => (
                      <li
                        key={`${name}-${i}`}
                        className={`pb-2.5 text-body leading-snug ${g.muted}`}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button
                href={teamSource.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Open PKSF's staff profile on pksf.org.bd"
              >
                Open the register on pksf.org.bd
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
