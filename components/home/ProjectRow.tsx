"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, GROUND_VARS, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Odometer } from "@/components/home/Odometer";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { DURATION, EASE_EDITORIAL } from "@/components/motion/tokens";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/data/projects";
import { projectMedia } from "@/data/projectMedia";

export type Movement = "Focus" | "Advance" | "Signature";

type ProjectRowProps = {
  project: Project;
  /** Zero-based position in PKSF's own published order. */
  index: number;
  total: number;
  movement: Movement;
  /** The ground the row's panel is printed on. */
  ground: Ground;
  /** The intervention area this project is filed under, already resolved. */
  area: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One project, as a full-measure panel.
 *
 * Four columns, and the reading order is the hierarchy: the card it is printed
 * on, then who it is — index, acronym, official title, its one headline figure
 * — then what it does and what is on the record, then the way out to PKSF's
 * own page for it.
 *
 * The figure is the piece that moves. Where PKSF publishes two headline
 * numbers for a project the facets are a toggle, and switching them re-rolls
 * the digits rather than replacing them; where PKSF publishes one, the number
 * is simply set and there is no control. The qualification PKSF publishes with
 * the number is always underneath it — "over", "at least", "expected by" — so
 * the figure at display size can never read as a flat claim.
 *
 * Below `lg` the four columns become one. Nothing is hidden at any width: the
 * card, the figure, the description and the record are all in the document on
 * a phone, because every one of them is content rather than decoration.
 */
export function ProjectRow({
  project,
  index,
  total,
  movement,
  ground,
  area,
}: ProjectRowProps) {
  const media = projectMedia[project.slug];
  const figures = project.figures ?? [];
  const [facet, setFacet] = useState(0);
  const figure = figures[Math.min(facet, Math.max(figures.length - 1, 0))];

  const g = GROUND[ground];
  const card = GROUND[media.ground];
  const contain = media.image.fit === "contain";

  // Sized against the column, not against the page: the identity column is a
  // quarter of the measure, and a nine-letter acronym at `display` overruns it
  // and breaks at a hyphen. `headline` holds every acronym up to nine
  // characters on one line; the three longer ones drop a step and wrap.
  const nameSize = project.name.length <= 9 ? "text-headline" : "text-title";

  const facts = [
    `${project.status === "ongoing" ? "Ongoing" : "Completed"} — as published by PKSF`,
    ...(project.budget ? [project.budget] : []),
    ...(project.partners ? [project.partners.join(" · ")] : []),
    `Filed under ${area}`,
  ];

  return (
    <article
      /* Read by the custom cursor: the panels do not share the section's
         ground, so an ink row inside a paper section would otherwise be given
         the section's ink and go invisible on itself. */
      data-ground={ground}
      aria-labelledby={`project-${project.slug}`}
      /* A hairline, not a frame: it is there so the panel reads as a card
         against the section ground, and parchment on paper is a 1.06:1 edge
         that effectively is not there. Green in both directions, because the
         panel grounds run both ways — PKSF green on the light panels, pale
         mint on the dark ones, where forest green on charcoal is not an edge
         at all. `box-sizing: border-box` is global, so the border costs the
         panel no width. */
      style={{
        borderColor: g.dark
          ? "color-mix(in srgb, var(--mist) 34%, transparent)"
          : "color-mix(in srgb, var(--forest) 42%, transparent)",
      }}
      className={`overflow-hidden rounded-2xl border px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-16 ${g.bg} ${g.text}`}
    >
      <div className="grid gap-9 lg:grid-cols-12 lg:gap-x-8">
        {/* ── The picture ───────────────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            /* The accessible link to this project is the one in the action
               column, which says which project it is. This is the same
               destination reached by clicking the picture, so it is taken out
               of the tab order and out of the accessibility tree rather than
               read out a second time with no name of its own. */
            tabIndex={-1}
            aria-hidden="true"
            data-cursor="view"
            data-ground={media.ground}
            /* 16:9, full column width, at every size. It began as a narrow
               portrait card and every image actually supplied for these slots
               has been landscape — photographs at 16:9 and 3:2, and published
               project banners at 1.74:1 and 2.33:1. A 2.33:1 banner letterboxed
               into a 178px-wide portrait card is a strip of unreadable type;
               the same file across a 427px 16:9 slot is legible. */
            className={`relative block aspect-video w-full overflow-hidden rounded-lg ${card.bg} ${card.text}`}
          >
            <Frame
              ratio="bleed"
              /* A `contain` file is a published graphic carrying its own
                 text. The crop settle scales it 1.12 and would push that text
                 off its own edges, so it is dropped rather than applied to
                 something it was never meant for. */
              treatment={contain ? "plain" : "crop"}
              mask
              plate={media.plate}
              ground={media.ground}
              className="absolute inset-0 [&>div]:h-full"
            >
              {media.image.src ? (
                <Image
                  src={media.image.src}
                  alt={media.image.alt}
                  fill
                  /* A third of the measure from `lg`, where it is one of four
                     columns; the full measure below that, where the row is a
                     single column. */
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={contain ? "object-contain p-2" : "object-cover"}
                  style={{ objectPosition: media.image.focal }}
                />
              ) : null}
            </Frame>

            {/* Printed on an unfilled card, the way a plate in a portfolio
                carries its own index — it is what gives a drawn placeholder an
                identity. It is `aria-hidden` with the card; the same two
                strings are set as real text in the column beside it.
                Never printed over a real file. A photograph is an arbitrary
                ground and cream type on it needs a scrim the card has no room
                for; a published graphic already carries its own title and
                logotype, and a second one stamped across it is two pieces of
                branding fighting in one box. Either way the acronym is set at
                display size immediately to the right, so nothing is lost. */}
            {!media.image.src && (
              <span className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] opacity-85">
                  {pad(index + 1)}
                </span>
                <span className="font-display text-sm font-semibold uppercase leading-none tracking-tight">
                  {project.name}
                </span>
              </span>
            )}

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ${
                card.dark ? "ring-on-dark/20" : "ring-on-light/15"
              }`}
            />
          </a>

          {/* What is actually standing in the frame. A drawn plate is never
              allowed to pass for a photograph, a published graphic is never
              allowed to pass for one either, and a photograph with no recorded
              photographer is never allowed to pass as cleared. The page has a
              mark for a stated gap — this is the gap, stated. */}
          {!media.image.src ? (
            <ProvenanceMark
              kind="pending"
              ground={ground}
              note="image placeholder — a drawn plate, not a photograph"
              className="mt-4"
            />
          ) : media.image.credit ? (
            <p className={`mt-4 font-mono text-meta uppercase ${g.muted}`}>
              Photograph — {media.image.credit}
              {media.image.license && ` · ${media.image.license}`}
            </p>
          ) : (
            <ProvenanceMark
              kind="pending"
              ground={ground}
              note={
                contain
                  ? "published graphic, not project photography — photographer and licence not recorded"
                  : "photographer and licence not recorded"
              }
              className="mt-4"
            />
          )}
        </div>

        {/* ── Who it is ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <p className="font-mono text-meta uppercase">
            <span className={g.accent}>{movement}</span>
            <span className={g.muted}>
              {" "}
              — Project {pad(index + 1)} / {pad(total)}
            </span>
          </p>

          <h3 id={`project-${project.slug}`} className="mt-5">
            <span
              className={`block font-display ${nameSize} font-semibold uppercase text-balance`}
            >
              {project.name}
            </span>
            <span
              className={`mt-5 block max-w-md font-display text-base font-medium leading-snug text-balance ${g.muted}`}
            >
              {project.fullName}
            </span>
          </h3>

          {figure && (
            <div className="mt-9">
              <Odometer
                key={figure.facet}
                value={figure.value}
                prefix={figure.prefix}
                suffix={figure.suffix}
                className="font-display text-headline font-semibold"
              />

              {figures.length > 1 && (
                <div
                  role="group"
                  aria-label={`Figure shown for ${project.name}`}
                  /* `flex w-fit`, not `inline-flex`: the odometer beside it is
                     inline too, so an inline toggle sits on the same line as
                     the figure wherever the column is wide enough — which is
                     every width between the phone and the desktop grid. */
                  className={`mt-5 flex w-fit gap-1 rounded-full p-1 ${
                    g.dark ? "bg-on-dark/10" : "bg-on-light/8"
                  }`}
                >
                  {figures.map((f, i) => {
                    const on = i === facet;
                    return (
                      <button
                        key={f.facet}
                        type="button"
                        onClick={() => setFacet(i)}
                        aria-pressed={on}
                        data-cursor="interactive"
                        className="relative rounded-full px-3.5 py-1.5 font-mono text-meta uppercase"
                      >
                        {on && (
                          <motion.span
                            aria-hidden="true"
                            layoutId={`facet-${project.slug}`}
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: GROUND_VARS[ground].text }}
                            transition={{ duration: DURATION.small, ease: EASE_EDITORIAL }}
                          />
                        )}
                        <span
                          className={`relative ${on ? "" : g.muted}`}
                          style={on ? { color: GROUND_VARS[ground].bg } : undefined}
                        >
                          {f.facet}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Never dropped. Almost every figure PKSF publishes carries a
                  qualification, and a number this size without one reads as a
                  flat claim. */}
              <p className={`mt-5 max-w-xs font-mono text-meta leading-relaxed ${g.muted}`}>
                {figure.note}
              </p>
            </div>
          )}

          <p className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-meta uppercase">
            <span className={g.muted}>{project.duration ? "Duration" : "Status"}</span>
            <span>
              {project.duration ??
                (project.status === "ongoing" ? "Ongoing" : "Completed")}
            </span>
          </p>
        </div>

        {/* ── What it does, and what is on the record ───────────────────── */}
        <div className="lg:col-span-3">
          <p className={`text-body ${g.muted}`}>{project.summary}</p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {facts.map((fact) => (
              <li key={fact} className="flex items-start gap-3 text-body leading-snug">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 8"
                  fill="none"
                  className={`mt-[0.45em] h-2 w-2.5 shrink-0 ${g.accent}`}
                >
                  <path
                    d="M1 4 L3.6 6.6 L9 1.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{fact}</span>
              </li>
            ))}
          </ul>

          {/* Who the project is for, in PKSF's own words. It sits with the
              record rather than beside the button: it is the piece of
              published detail that differs most between projects, and it needs
              a reading measure the action column no longer has. */}
          {project.targetGroup && (
            <div className="mt-8">
              <Meta ground={ground}>Who it is for</Meta>
              <p className={`mt-3 text-body ${g.muted}`}>{project.targetGroup}</p>
            </div>
          )}
        </div>

        {/* ── The way out ──────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {project.href && (
            <Button
              href={project.href}
              variant="solid"
              ground={ground}
              target="_blank"
              rel="noreferrer"
              /* Eleven links reading "View project" in a links list say
                 nothing. The name carries the project and the destination. */
              aria-label={`View ${project.name} on pksf.org.bd`}
            >
              View project
            </Button>
          )}

          <ProvenanceMark
            kind="verified"
            ground={ground}
            note={project.source}
            className={project.href ? "mt-8" : ""}
          />
        </div>
      </div>
    </article>
  );
}
