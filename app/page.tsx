import { DeltaChannels } from "@/components/delta/DeltaChannels";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Ground } from "@/components/editorial/Ground";
import { IndexRow } from "@/components/editorial/IndexRow";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { StatementSequence, type StatementWord } from "@/components/editorial/StatementSequence";
import { DeltaRelay } from "@/components/home/DeltaRelay";
import { DigitalDirection } from "@/components/home/DigitalDirection";
import { DigitalTimeline } from "@/components/home/DigitalTimeline";
import { Hero } from "@/components/home/Hero";
import { HumanStory } from "@/components/home/HumanStory";
import { ImpactLedger } from "@/components/home/ImpactLedger";
import { News } from "@/components/home/News";
import { Projects } from "@/components/home/Projects";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { StrategicInterventions } from "@/components/home/StrategicInterventions";
import { Team } from "@/components/home/Team";
import { Watch } from "@/components/home/Watch";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
import { Button } from "@/components/ui/Button";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { interventions } from "@/data/interventions";
import { organization, strategicPlan } from "@/data/organization";
import { programs } from "@/data/programs";
import { publications } from "@/data/publications";

/** Shared vertical rhythm for the storytelling sections. */
const RHYTHM = "py-24 md:py-32 lg:py-40";

/** A zero-based position, as a two-digit index. */
const pad = (i: number) => String(i + 1).padStart(2, "0");

/** A length, as a two-digit count. Not `pad` — that takes an index. */
const count = (n: number) => String(n).padStart(2, "0");

const interventionName = (slug: string) =>
  interventions.find((item) => item.slug === slug)?.name ?? "";

/**
 * The three strategic objectives of the Strategic Plan 2025–2030, held on the
 * statement stage. The single word is a heading this page supplies — it has to
 * be one short word to hold the viewport — and the objective under it is
 * PKSF's own wording, unaltered. The provenance line says which is which.
 */
const THEMES: StatementWord[] = strategicPlan.objectives.map((objective) => ({
  word: objective.label,
  gloss: objective.objective,
}));

/**
 * The closing line, broken into the lines it was already breaking into under
 * `max-w-[14ch]` — so each one can rise from behind its own edge instead of
 * the block arriving whole. Same five words, same order.
 */
const CLOSING = ["The network", "is the", "reach"] as const;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-medium focus:text-on-dark"
      >
        Skip to content
      </a>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />

        {/* ── Giant statement ──────────────────────────────────────────── */}
        <Ground ground="ink" id="themes" marker="01">
          <StatementSequence
            words={THEMES}
            label={`Strategic Plan ${strategicPlan.period} — ${strategicPlan.theme}`}
            ground="ink"
            footnote={
              <ProvenanceMark
                kind="verified"
                ground="ink"
                note={`the three objectives, as published in the ${strategicPlan.source}. The single word above each one is this page's heading, not PKSF's.`}
              />
            }
          />
        </Ground>

        {/* ── Strategic interventions ──────────────────────────────────────
            Third, directly after the objectives. The objectives say what the
            plan is for; the ten areas are where it is actually carried out,
            and a reader who has just been handed three abstractions should
            meet the concrete work next rather than three sections later. */}
        <StrategicInterventions />

        {/* ── Projects ─────────────────────────────────────────────────────
            Fourth, immediately after the ten areas. The areas are the
            framework; these are the financed, time-bound initiatives running
            inside it, so the two belong next to each other rather than with
            three sections between them. */}
        <Projects />

        {/* ── Watch ────────────────────────────────────────────────────────
            Directly after the projects, and deliberately not numbered: the
            markers 01–08 are the sequence the navigation addresses, and this
            section is PKSF speaking in its own voice rather than another
            chapter of the page's argument. */}
        <Watch />

        {/* ── The team ─────────────────────────────────────────────────────
            Directly after the videos, and unnumbered for the same reason
            Watch is: 01–08 are the chapters of the page's argument, and these
            two are PKSF in its own voice and its own register. */}
        <Team />

        {/* ── News ─────────────────────────────────────────────────────────
            Directly after the team, and unnumbered for the same reason Watch
            and Team are: 01–08 are the chapters of the page's argument, and
            these three are PKSF speaking for itself. It used to be a fourth
            index inside "The desk"; it is a section now, and the index there
            was removed rather than duplicated — `#news` can only address one
            element. */}
        <News />

        {/* The full-screen vision panel that used to sit here was removed on
            request. PKSF's vision statement is no longer set anywhere on this
            page; `organization.vision` is still in the data and is what a
            replacement would read from. */}

        {/* ── The model ────────────────────────────────────────────────── */}
        <Ground ground="parchment" id="model" marker="04">
          <Container className={RHYTHM}>
            <SectionHead
              label="The model"
              heading="Three steps between a fund and a household."
              note="PKSF does not reach communities directly. It makes it possible for others to."
              aside={<ProvenanceMark kind="verified" note="PKSF — About Us" />}
            />

            {/* The mission, verbatim. It is a formal commitment, so it is set
                as a quotation rather than restated in the page's own voice.

                It runs to the full measure rather than to `max-w-4xl`: it is
                the one sentence PKSF has formally committed to, and at 56rem
                it was a six-line block in the left half of a 1,344px section
                with nothing in the right half. Opening it to the measure is
                the whole change — not one word of it moves. */}
            <Reveal className="mt-20 lg:mt-28">
              <figure className="m-0">
                <Meta>The mission</Meta>
                <blockquote className="mt-8 border-t border-on-light/14 pt-10">
                  <p className="max-w-6xl font-prose text-headline italic">
                    &ldquo;{organization.mission}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-8">
                  <ProvenanceMark kind="verified" note="PKSF — Our Mission, verbatim" />
                </figcaption>
              </figure>
            </Reveal>

            <DeltaRelay className="mt-24 lg:mt-32" />
          </Container>
        </Ground>

        {/* ── The ledger ───────────────────────────────────────────────── */}
        <Ground ground="ink" id="ledger" marker="05">
          <Container className={RHYTHM}>
            <SectionHead
              label="The ledger"
              heading="What the network holds, on one stated day."
              ground="ink"
              note="Every figure is published by PKSF against a reporting date, and is shown with it."
              aside={
                <ProvenanceMark
                  kind="verified"
                  ground="ink"
                  note="PKSF — At a Glance, 30 April 2026"
                />
              }
            />
            <ImpactLedger ground="ink" className="mt-20 lg:mt-28" />
          </Container>
        </Ground>

        {/* ── Human story ──────────────────────────────────────────────── */}
        <Ground ground="moss" id="story" marker="06">
          <Container className={RHYTHM}>
            <HumanStory ground="moss" />
          </Container>
        </Ground>

        {/* ── Digital transformation ───────────────────────────────────── */}
        <Ground ground="ink" id="digital" marker="07">
          <Container className="pt-24 md:pt-32 lg:pt-40">
            <SectionHead
              label="Digital transformation"
              heading="From paper ledgers to an intelligent network."
              ground="ink"
              note="Five published eras. Each one changed what the network could see about itself."
              aside={
                <ProvenanceMark
                  kind="verified"
                  ground="ink"
                  note="PKSF — Digital Transformation; no milestones added"
                />
              }
            />
          </Container>
          <DigitalTimeline ground="ink" className="mt-20 px-4.5 pb-24 md:px-12 lg:mt-0 lg:px-0 lg:pb-0" />
        </Ground>

        {/* ── Vision ───────────────────────────────────────────────────── */}
        <Ground ground="forest" id="vision" rule>
          <Container className={RHYTHM}>
            <DigitalDirection ground="forest" />
          </Container>
        </Ground>

        {/* ── The desk ─────────────────────────────────────────────────── */}
        <Ground ground="parchment" id="desk" marker="08">
          <Container className={RHYTHM}>
            <SectionHead
              label="The desk"
              heading="The instruments, and what they are published against."
              note="Programmes are PKSF's standing instruments. The projects running inside them, and the releases that report on them, are sections of their own, above."
              aside={
                <ProvenanceMark kind="verified" note="PKSF — Programs and Annual Reports" />
              }
            />

            {/* ── Programmes ───────────────────────────────────────────── */}
            <div id="programs" className="mt-20 scroll-mt-28 lg:mt-28">
              {/* The same head the other indexes on this page use — an accent
                  rule, the list's name, and how many rows are under it — so
                  the desk's two lists are announced rather than just
                  starting. The count is the array's length, not a typed
                  number. */}
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                <h3 className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-on-light/14" />
                  <span className="font-mono text-meta uppercase text-clay">01 — Programmes</span>
                </h3>
                <Meta>{count(programs.length)} standing instruments</Meta>
              </Reveal>

              <p className="mt-8 max-w-xl text-lead text-muted">
                The standing instruments, each filed under one of the ten
                intervention areas. Delivered by Partner Organisations, not by
                PKSF.
              </p>

              <div className="mt-12 border-b border-on-light/14">
                {programs.map((program, i) => (
                  <IndexRow
                    key={program.slug}
                    index={pad(i)}
                    title={program.name}
                    kicker={program.fullName ?? interventionName(program.interventionSlug)}
                    footer={
                      program.fullName ? (
                        <Meta>{interventionName(program.interventionSlug)}</Meta>
                      ) : undefined
                    }
                  >
                    {program.summary}
                  </IndexRow>
                ))}
              </div>
            </div>

            {/* The projects used to be indexed here as well. They are now a
                section of their own, directly after the intervention areas —
                the same eleven entries listed twice on one page was one list
                too many, and `#projects` can only address one of them. */}

            {/* ── Knowledge ────────────────────────────────────────────── */}
            <div id="knowledge" className="mt-24 scroll-mt-28 lg:mt-32">
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                <h3 className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-on-light/14" />
                  <span className="font-mono text-meta uppercase text-clay">02 — Knowledge</span>
                </h3>
                <Meta>{count(publications.length)} published files</Meta>
              </Reveal>

              <p className="mt-8 max-w-xl text-lead text-muted">
                What an apex institution publishes, and is judged on. Links go
                to PKSF&rsquo;s own files.
              </p>

              <div className="mt-12 border-b border-on-light/14">
                {publications.map((publication, i) => (
                  <IndexRow
                    key={publication.slug}
                    index={pad(i)}
                    title={publication.title}
                    kicker={`${publication.type} — ${publication.year}`}
                    footer={
                      <Button href={publication.url} target="_blank" rel="noreferrer">
                        Open on pksf.org.bd
                      </Button>
                    }
                  >
                    {publication.note}
                  </IndexRow>
                ))}
              </div>
            </div>

            {/* The news used to be indexed here as a third list. It is now a
                section of its own, directly after the team — the same
                releases set twice on one page was one list too many, and
                `#news` can only address one of them. */}
          </Container>
        </Ground>

        {/* ── Final statement ──────────────────────────────────────────────
            The last thing the page says, so it is the delta's last
            appearance too: the drawing that has carried the relay since "The
            model" sits behind the closing line at the section's own channel
            tone, converging upward — the network resolving back into the one
            channel it came from. It is decorative and `aria-hidden`, and the
            statement is fully painted without it.

            The three lines are the same five words, broken where the
            `max-w-[14ch]` measure was already breaking them, so each one can
            rise out from behind its own edge. */}
        <Ground ground="ink">
          <DeltaChannels
            branching={[5, 3]}
            spread={1200}
            seed={9}
            flip
            className="absolute inset-x-0 bottom-0 top-1/4 text-on-dark/30"
          />

          <Container className="relative py-28 md:py-36 lg:py-44">
            <Reveal>
              <Meta ground="ink">In closing</Meta>
            </Reveal>

            <div role="heading" aria-level={2} className="mt-12">
              {CLOSING.map((line, i) => (
                <Rise key={line} distance={110} delay={i * 0.1}>
                  <span className="block font-display text-colossal font-bold uppercase">
                    {line}
                  </span>
                </Rise>
              ))}
            </div>

            <Reveal delay={0.24} className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6">
              <Button href="#interventions" variant="solid" ground="ink">
                Explore the ten interventions
              </Button>
              <Button href={organization.website} target="_blank" rel="noreferrer">
                Visit pksf.org.bd
              </Button>
            </Reveal>

            <ProvenanceMark
              kind="editorial"
              ground="ink"
              note="a reading of the published mandate — PKSF reaches households through its Partner Organisations"
              className="mt-14 max-w-md"
            />
          </Container>
        </Ground>
      </main>

      <Footer />
    </>
  );
}
