"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
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
 * The headline is one sentence set in two voices — BEHIND / every hand that /
 * REACHES. The two display words are what PKSF is and what PKSF is not: it is
 * the institution behind the reach, and the reaching is done by a hand that is
 * not its own. The clause that names that hand is in the prose italic, set
 * small and pushed right, so the eye reads the two positions first and the
 * relation between them second. That is the proposition about PKSF in a
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

/** The lens the photograph drifts on under the pointer. Same as `PointerParallax`. */
const LENS = { stiffness: 110, damping: 20, mass: 0.7 } as const;

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

  /**
   * The pointer drift. Same idea as `PointerParallax` on the video and news
   * frames, written out here rather than wrapped around the picture, because
   * the picture is the bottom layer of the section and the type sits on top of
   * it: a wrapper around the `<Image>` would only be hit where no line of type
   * covers it, so the drift would cut in and out as the hand crossed the
   * headline. The section is the ancestor of everything in the frame, so
   * listening there is the only way it can follow the hand across the whole
   * photograph.
   *
   * Its own layer, so it compounds with neither the entrance scale nor the
   * scroll drift. `pointer-parallax` is the class the reduced-motion block in
   * globals.css already cancels transforms on — the same reason it exists for
   * the frames.
   */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerScale = useMotionValue(1);
  const hoverX = useSpring(pointerX, LENS);
  const hoverY = useSpring(pointerY, LENS);
  const hoverScale = useSpring(pointerScale, LENS);

  function trackPointer(event: PointerEvent<HTMLElement>) {
    // Mouse only. A touch pointer fires `pointermove` on a tap and then leaves
    // the picture shoved to one side with no pointer left to bring it back.
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    // Against the hand, not with it — the frame reads as having depth rather
    // than as a sticker being dragged.
    pointerX.set(-((event.clientX - box.left) / box.width - 0.5) * 28);
    pointerY.set(-((event.clientY - box.top) / box.height - 0.5) * 20);
    pointerScale.set(1.04);
  }

  function releasePointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    pointerX.set(0);
    pointerY.set(0);
    pointerScale.set(1);
  }

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
      onPointerMove={trackPointer}
      onPointerLeave={releasePointer}
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
      /* `pt-32` clears the fixed bar by about 48px rather than the 8px `pt-22`
         left — the bar is ~80px deep, and a register starting directly under
         it reads as a third row of the navigation rather than as the head of
         the page. */
      className="on-photo relative isolate flex min-h-[100svh] flex-col justify-between overflow-x-clip px-4.5 pb-6 pt-32 md:px-12 md:pb-7 md:pt-36"
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
          <motion.div
            className="pointer-parallax absolute inset-0"
            style={{ x: hoverX, y: hoverY, scale: hoverScale }}
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
          /* The top offset has to match the section's own top padding, or the
             strip between the viewport edge and where the zone starts is bare
             photograph with the navigation sitting on it. */
          className="hero-band-top pointer-events-none absolute inset-x-[-100vw] -top-32 bottom-[-11rem] -z-10 md:-top-36"
        />
        {/* The institution's own name in its own script, opposite the English
            register. It leads on the short name because that is the one PKSF
            itself prints — every Bangla release in its news centre writes the
            institution as পিকেএসএফ — and the expansion sits under it at
            reading size. Set in `--font-bangla` (Tiro Bangla): none of the
            three Latin faces this page uses carries Bengali at all, so Bangla
            in them falls back to whatever the device happens to have. */}
        <motion.p variants={fade} lang="bn" className="font-bangla">
          <span className="block text-title font-bold leading-none">
            {organization.banglaShortName}
          </span>
          <span className="mt-2 block text-body leading-snug">
            {organization.banglaFullName}
          </span>
        </motion.p>

        {/* The English register, all of it on this side now: the legal status
            first, because it is what the institution is, and the name and
            founding under it as the entry that names it.

            Two lines, not three. Right-aligned mono sets ragged-left, and
            three rows of it at three different lengths reads as a stack of
            unrelated labels; the name and the founding are one register entry
            and belong on one line, which leaves the block as a statement and
            the entry that names it. It wraps back to two rows below `lg`,
            where the measure can no longer hold it. */}
        <motion.p variants={fade} className="font-mono text-meta uppercase sm:text-right">
          {organization.legalStatus.replace(/\.$/, "")}
          <span className="mt-2 block">
            {organization.fullName} · Est. {organization.founded} · Bangladesh
          </span>
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
        /* An explicit gap above, not the `justify-between` one: the section's
           content is taller than the frame on a short viewport, so there is no
           free space left for `justify-between` to distribute and the register
           ends up sitting on the cap-line of the first word. */
        className="mb-1 mt-7 max-w-[19ch] font-display text-colossal font-bold uppercase text-ink md:mt-10"
      >
        <span className="block overflow-hidden pb-[0.03em]">
          <motion.span variants={line} className="block">
            Behind
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.05em] pl-[0.12em] md:pl-[1.2em]">
          <motion.span
            variants={line}
            className="block font-prose text-[0.34em] font-normal normal-case italic tracking-[-0.01em]"
          >
            every hand that
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.03em]">
          <motion.span variants={line} className="block">
            Reaches
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

        {/* The same sentence in Bangla, under the English rather than beside
            it: this is the line repeated, not a second claim. It is this
            page's own rendering of its own English — PKSF publishes no Bangla
            version of it — and the colophon below says so. */}
        <motion.p
          variants={fade}
          lang="bn"
          className="mt-3 max-w-[62ch] font-bangla text-body leading-relaxed"
        >
          পিকেএসএফ অর্থায়ন ও সক্ষমতা জোগায়; ঘরে ঘরে পৌঁছায় সহযোগী সংস্থাগুলো।
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
            {/* The Bangla carries two different provenances and the page does
                not flatten them: the short name is PKSF's own, and the
                expansion is not printed anywhere on pksf.org.bd. Set in the
                Bangla face inside the mono line, because mono has no Bengali
                either. */}
            <span className="mt-1 block normal-case">
              <span className="uppercase">Bangla — </span>
              <span lang="bn" className="font-bangla">
                পিকেএসএফ
              </span>
              <span className="uppercase">
                {" "}
                is PKSF&rsquo;s own; the expansion and the line above are this
                page&rsquo;s rendering
              </span>
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
