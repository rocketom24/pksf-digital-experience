"use client";

import { motion } from "motion/react";
import { DeltaChannels } from "@/components/delta/DeltaChannels";
import { GROUND } from "@/components/editorial/grounds";
import { ScrollCue } from "@/components/home/ScrollCue";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { organization } from "@/data/organization";

const GROUND_NAME = "ink" as const;

/**
 * The opening.
 *
 * The headline is one sentence set in two voices: the claim in the display
 * grotesque at full size, and the connective clause — the part that actually
 * describes the institution — in the prose italic, set small and pushed right
 * so it reads as running *through* the statement rather than sitting between
 * two halves of it. That is the whole proposition about PKSF in a
 * typographic arrangement: an apex body whose reach is carried by someone
 * else.
 *
 * Behind it, the delta draws itself on load. There are no buttons here. A
 * hero with a heading, a paragraph and two calls to action is the shape this
 * page is trying not to be; the navigation and the scroll cue are the
 * affordances, and the type carries the rest.
 */
export function Hero() {
  const g = GROUND[GROUND_NAME];

  // Entrance only — the hero is above the fold, so this runs on mount rather
  // than on an intersection, which cannot mis-fire.
  const line = {
    hidden: { y: "110%" },
    shown: {
      y: 0,
      transition: { duration: DURATION.cinematic, ease: EASE_EDITORIAL },
    },
  };

  const fade = {
    hidden: { opacity: 0, y: 12 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.editorial, ease: EASE_EDITORIAL },
    },
  };

  return (
    <section
      className={`relative isolate flex min-h-[100svh] flex-col justify-between [overflow-x:clip] px-4.5 pb-10 pt-28 md:px-12 md:pb-14 ${g.bg} ${g.text}`}
      data-cursor="explore"
    >
      <DeltaChannels
        branching={[3, 2, 2]}
        spread={1180}
        seed={11}
        motionMode="entrance"
        /* Dimmer on a phone: the viewBox is stretched into a tall narrow box,
           so the same channels arrive as a dense field of near-vertical lines. */
        className={`absolute inset-x-0 top-[-10%] -z-10 h-[130%] w-full opacity-50 md:opacity-100 ${g.channel}`}
      />

      <motion.div
        initial="hidden"
        animate="shown"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-wrap items-start justify-between gap-6"
      >
        <motion.p variants={fade} className={`font-mono text-meta uppercase ${g.muted}`}>
          {organization.fullName}
          <span className="mt-1 block">
            Established {organization.founded} — Bangladesh
          </span>
        </motion.p>
        <motion.p
          variants={fade}
          className={`max-w-[22ch] font-mono text-meta uppercase sm:text-right ${g.muted}`}
        >
          Independent concept — not affiliated with PKSF
        </motion.p>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="shown"
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
        className="my-16 max-w-[19ch] font-display text-colossal font-bold uppercase"
      >
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span variants={line} className="block">
            Reach
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.06em] pl-[0.12em] md:pl-[1.2em]">
          <motion.span
            variants={line}
            className="block font-prose text-[0.34em] font-normal normal-case italic tracking-[-0.01em]"
          >
            that runs through
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.04em]">
          <motion.span variants={line} className="block">
            Others
          </motion.span>
        </span>
      </motion.h1>

      <motion.div
        initial="hidden"
        animate="shown"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
        className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
      >
        <motion.div variants={fade} className="order-2 lg:order-1">
          <ScrollCue href="#themes" ground={GROUND_NAME} />
        </motion.div>

        <motion.div variants={fade} className="order-1 max-w-md lg:order-2">
          <p className={`text-lead ${g.muted}`}>
            An apex development organisation that finances and equips a
            nationwide network of Partner Organisations — and reaches
            households only through them.
          </p>
          <ProvenanceMark
            kind="editorial"
            ground={GROUND_NAME}
            note="a reading of the published mandate"
            className="mt-5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
