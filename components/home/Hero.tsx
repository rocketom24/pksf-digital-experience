"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ScrollCue } from "@/components/home/ScrollCue";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { heroAsOf, heroFacts, heroImage } from "@/data/hero";
import { organization } from "@/data/organization";

/**
 * The opening.
 *
 * ── The composition ───────────────────────────────────────────────────────
 * One photograph, edge to edge, holding the whole viewport — ungraded,
 * untinted, no overall scrim on it. The type is spread across the frame the
 * way an editorial page uses its margins: a label at the head, the statement
 * through the middle, a sentence and three figures along the foot.
 *
 * The statement sits on the bare picture, in charcoal: at that size it is
 * 13.6:1 on the field's brightest pixel. The meta mono cannot — it is a
 * mustard field in full sun, and the worst ground it offers the head is
 * rgb(64,74,0) and the foot rgb(55,43,3), where haloed charcoal is 1.7:1 and
 * 1.2:1. So the two ends of the frame take a readability zone each
 * (`.hero-band-top` / `.hero-band-bottom`, globals.css).
 *
 * They are not the same colour. The head is cream and keeps the charcoal ink,
 * because the PKSF lockup sits in it — the mark is green-on-white artwork and
 * its wordmark disappears on a dark band. The foot is a charcoal scrim and
 * its type inverts to cream (`.hero-zone-ink`), which lets the figures read
 * as a printed colophon and keeps the picture's own colour: a green ground
 * multiplied into a yellow field goes olive and takes the red out of the
 * farmer's shawl, where the near-black darkens without moving a hue.
 *
 * The middle, where the statement and the farmer are, is the photograph and
 * nothing else; each zone is only as deep as the type it carries, and fades
 * from there into the picture.
 *
 * The headline is one sentence set in two voices: the claim in the display
 * grotesque at full size, and the connective clause — the part that actually
 * describes the institution — in the prose italic, set small and pushed
 * right so it reads as running *through* the statement rather than sitting
 * between two halves of it. That is the proposition about PKSF in a
 * typographic arrangement: an apex body whose reach is carried by someone
 * else. The block below says it plainly, and then shows the model itself, so
 * a visitor who reads nothing else still leaves knowing that PKSF finances
 * and equips others and the others are what reach households.
 *
 * ── Contrast ──────────────────────────────────────────────────────────────
 * Against the worst pixel each zone can put behind its own ink — the darkest
 * under the head's charcoal, the brightest under the foot's cream:
 *   #10231C on the head plateau          →  9.27 : 1   the bar, the label
 *   #FFF8E8 on the foot plateau          →  6.04 : 1   sentence, figures,
 *                                                      labels, cue, source
 *   #10231C on the field's brightest px  → 13.60 : 1   the statement
 *
 * Nothing in this section is set in a muted ink or at reduced opacity —
 * hierarchy is size, weight, tracking and placement. Quiet, not faint.
 */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * The drift. Driven by `useScroll`, never by an intersection: an element
   * the size of the viewport can go from "below" to "containing" in one jump
   * — an anchor link does exactly that — and an observer never reports it.
   * A scroll position is just a number, and a jump is another number.
   *
   * The range is exactly [0, 1]. A scroll-linked transform whose input range
   * does not span the full progress either throws or replays from the start
   * when it is handed a value outside it.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The photograph is 16% taller than the frame, so it can move a tenth of
  // its own height against the scroll without ever exposing an edge.
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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

  /**
   * The two readability zones, which arrive with the picture rather than
   * before it. They are not inside the mask — each is a child of the block it
   * protects, so that it can be exactly as deep as that block — which means
   * that at the first frame of the entrance, while the mask is still an inset
   * and the clipped strips are page ground rather than photograph, a zone
   * would otherwise paint a flat rectangle across the top and foot of the
   * frame. Fading them over the same cinematic beat hides that: by the time
   * either is legible the mask has opened under it. No `y`, unlike `fade` —
   * a gradient this soft cannot be seen to move, so moving it is only work.
   */
  const veil = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: { duration: DURATION.cinematic, ease: EASE_EDITORIAL },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      /* The target the footer's back-to-top anchor addresses. It is an id
         rather than a scripted `scrollTo` so the control is a real link:
         it works with JavaScript off, it moves keyboard focus, and it takes
         its smoothness from `scroll-behavior` in globals.css — which is
         already cancelled under `prefers-reduced-motion`. */
      id="top"
      data-ground="parchment"
      data-cursor="explore"
      /* One timeline for the whole opening, rather than three blocks each
         with a hand-tuned delay of its own. The photograph is on its own
         clock and starts at zero; the type waits 0.45s, by which point the
         mask is most of the way open, and then cascades — label, then the
         statement line by line, then the foot. Every child inherits `hidden`
         and `shown` from here, so the order is the order they are written in
         and there is no arithmetic to keep in sync. */
      initial="hidden"
      animate="shown"
      variants={{
        hidden: {},
        shown: { transition: { delayChildren: 0.45, staggerChildren: 0.14 } },
      }}
      className="on-photo relative isolate flex min-h-[100svh] flex-col justify-between overflow-x-clip px-4.5 pb-6 pt-22 md:px-12 md:pb-7"
    >
      {/* ── The photograph ─────────────────────────────────────────────────
          Two nested layers: the outer opens the mask on load, the inner
          holds the entrance scale and the scroll drift, so neither compounds
          the other's transform. Both are suppressed under reduced motion
          from globals.css — the inline style a MotionValue writes cannot be
          branched away in the render tree without a hydration mismatch. */}
      <motion.div
        className="hero-mask absolute inset-0 -z-10 overflow-hidden"
        initial={{ clipPath: "inset(12% 0% 12% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: DURATION.cinematic, ease: EASE_EDITORIAL }}
      >
        <motion.div
          className="hero-crop absolute inset-x-0 top-[-8%] h-[116%]"
          initial={{ scale: 1.09 }}
          animate={{ scale: 1 }}
          transition={{ duration: DURATION.cinematic, ease: EASE_EDITORIAL, delay: 0.05 }}
          style={{ y: drift }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={88}
            sizes="100vw"
            /* The farmer sits at about 58% across the photograph, and he is
               the only part of it dark enough to fight charcoal type. On a
               tablet, where the crop is horizontal, the window is pulled
               left so he lands further right and the type keeps the field to
               itself; on a wide viewport the crop is vertical and only the
               height offset does anything. */
            className="object-cover object-[54%_38%] md:object-[34%_34%] xl:object-[center_34%]"
          />
        </motion.div>
      </motion.div>

      {/* ── Archival label ─────────────────────────────────────────────────
          The wordmark is in the bar above this, so the label is the
          expansion of it and nothing else — a register entry, not a second
          logo. */}
      <motion.div
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-3"
      >
        {/* The head's readability zone (`.hero-band-top`, globals.css).
            Drawn as a child of the label so its plateau is exactly as deep as
            the label turns out to be — two lines on a wide screen, three on a
            tablet where the legal status wraps — and stretched up past the
            section's top padding to the edge of the viewport, so it is under
            the fixed bar as well. The bar is transparent over the hero and
            takes the same ink; the zone belongs to the photograph rather than
            to the bar, and scrolls away with it, by which point the bar has
            taken its own parchment ground. */}
        <motion.span
          aria-hidden="true"
          variants={veil}
          className="hero-band-top pointer-events-none absolute inset-x-[-100vw] -top-22 bottom-[-11rem] -z-10"
        />
        <motion.p variants={fade} className="font-mono text-meta uppercase">
          {organization.fullName}
          <span className="mt-1 block">Est. {organization.founded} · Bangladesh</span>
        </motion.p>
        <motion.p variants={fade} className="font-mono text-meta uppercase sm:text-right">
          {organization.legalStatus.replace(/\.$/, "")}
        </motion.p>
      </motion.div>

      {/* ── The statement ──────────────────────────────────────────────────
          Each line rises out of its own mask. Nothing is set on the type
          itself: no outline, and no glow either. At this size the charcoal
          carries itself against the field — 13.6:1 on its brightest pixel —
          and it never runs as far right as the farmer, the only part of the
          frame dark enough to need help. The glow also had to go for a
          second reason: the masks these lines rise out of are
          `overflow: hidden`, so they were cutting the halo off square at the
          top and foot of every line, which is exactly the hard edge the glow
          was there to avoid. */}
      <motion.h1
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
        className="my-1 max-w-[19ch] font-display text-colossal font-bold uppercase text-ink"
      >
        <span className="block overflow-hidden pb-[0.03em]">
          <motion.span variants={line} className="block">
            Reach
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.05em] pl-[0.12em] md:pl-[1.2em]">
          <motion.span
            variants={line}
            className="block font-prose text-[0.34em] font-normal normal-case italic tracking-[-0.01em]"
          >
            that runs through
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.03em]">
          <motion.span variants={line} className="block">
            Others
          </motion.span>
        </span>
      </motion.h1>

      {/* ── The foot ──────────────────────────────────────────────────────
          Spread across the frame rather than collected into a panel: a
          sentence, three figures, and the way down. The ground under it is
          the foot's readability zone, which has no edge of its own — it is
          the width of the frame and it fades upward into the picture. */}
      <motion.div
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
        /* Held to the left of the farmer. He is the one part of the frame
           dark enough to fight charcoal type, and he stands at about 58% of
           the width at every wide viewport — so the foot stops short of him
           rather than relying on the halo to rescue the third figure. */
        className="hero-zone-ink relative sm:max-w-[64%] lg:max-w-[46vw]"
      >
        {/* The foot's readability zone (`.hero-band-bottom`, globals.css).
            Drawn as a child of the foot so it is exactly as tall as what it
            protects — a sentence, three figures and the provenance — however
            those reflow, and bled past the section's own padding to the edges
            of the frame so it reads as the foot of the photograph rather than
            as a panel sitting on the left of it. The horizontal bleed is
            clipped by the section's `overflow-x-clip`. */}
        <motion.span
          aria-hidden="true"
          variants={veil}
          className="hero-band-bottom pointer-events-none absolute inset-x-[-100vw] -bottom-6 -top-40 -z-10 sm:-top-72 md:-bottom-7"
        />
        <motion.p variants={fade} className="max-w-[62ch] text-lead">
          An apex development organisation of the Government of Bangladesh. It
          finances and equips the Partner Organisations that reach households
          — it does not reach them itself.
        </motion.p>

        {/* The scale, as three figures. The number leads and the words
            follow it: at a glance this has to read as 200+ / 21.90M / 64
            before it reads as anything else. Each stands in its own column
            under a rule, so the three are three facts rather than a sentence
            with numerals in it. */}
        {/* Two columns between `sm` and `lg`: at those widths the foot is
            held to the left of the farmer, and three columns in that measure
            leaves no room for a label as long as ORGANISED MEMBERS. */}
        <motion.dl
          variants={fade}
          className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {heroFacts.map((fact) => (
            <div key={fact.label} className="border-t border-on-light/35 sm:border-on-dark/35 pt-4">
              <dt className="sr-only">{fact.label}</dt>
              <dd className="m-0">
                <span className="block font-display text-headline font-bold leading-none tracking-tight">
                  {fact.value}
                </span>
                {/* Two lines reserved at `lg`, where the three columns are
                    narrow enough that PARTNER ORGANISATIONS wraps and the
                    other two do not — without it the note under the first
                    figure drops a line below its neighbours and the three
                    stop reading as one row. */}
                <span className="mt-2 block font-mono text-meta uppercase lg:min-h-[2lh]">
                  {fact.label}
                </span>
                <span className="mt-1.5 block max-w-[30ch] text-body">{fact.note}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          variants={fade}
          className="mt-4 flex flex-col gap-4 border-t border-on-light/35 sm:border-on-dark/35 pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <ScrollCue href="#themes" ground="ink" tone="full" className="hero-cue" />
          <p className="font-mono text-meta uppercase leading-relaxed sm:text-right">
            Independent concept — not affiliated with PKSF
            <span className="mt-1 block">
              Verified — PKSF, At a Glance, {heroAsOf} · Photograph —{" "}
              {heroImage.credit},{" "}
              <a
                href={heroImage.sourceUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="underline-offset-4 hover:underline"
              >
                {heroImage.source}
              </a>
              ,{" "}
              <a
                href={heroImage.licenseUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="underline-offset-4 hover:underline"
              >
                {heroImage.license}
              </a>
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
