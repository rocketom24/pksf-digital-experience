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
import { Projects } from "@/components/home/Projects";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { StrategicInterventions } from "@/components/home/StrategicInterventions";
import { Watch } from "@/components/home/Watch";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { interventions } from "@/data/interventions";
import { news } from "@/data/news";
import { organization, strategicPlan } from "@/data/organization";
import { programs } from "@/data/programs";
import { publications } from "@/data/publications";

/** Shared vertical rhythm for the storytelling sections. */
const RHYTHM = "py-24 md:py-32 lg:py-40";

const pad = (i: number) => String(i + 1).padStart(2, "0");

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
                as a quotation rather than restated in the page's own voice. */}
            <Reveal className="mt-20 lg:mt-28">
              <figure className="m-0 max-w-4xl">
                <Meta>The mission</Meta>
                <blockquote className="mt-6">
                  <p className="font-prose text-headline italic">
                    &ldquo;{organization.mission}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6">
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
              note="Programmes are PKSF's standing instruments. The projects running inside them are a section of their own, above."
              aside={
                <ProvenanceMark
                  kind="verified"
                  note="PKSF — Programs, Annual Reports and News Center"
                />
              }
            />

            {/* ── Programmes ───────────────────────────────────────────── */}
            <div id="programs" className="mt-20 scroll-mt-28 lg:mt-28">
              <h3>
                <Meta>01 — Programmes</Meta>
              </h3>
              <p className="mt-6 max-w-xl text-lead text-muted">
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
              <h3>
                <Meta>02 — Knowledge</Meta>
              </h3>
              <p className="mt-6 max-w-xl text-lead text-muted">
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

            {/* ── News ─────────────────────────────────────────────────── */}
            <div id="news" className="mt-24 scroll-mt-28 lg:mt-32">
              <h3>
                <Meta>03 — News</Meta>
              </h3>
              <p className="mt-6 max-w-xl text-lead text-muted">
                A short, dated selection issued by PKSF. Newest first.
              </p>

              <div className="mt-12 border-b border-on-light/14">
                {news.map((item, i) => (
                  <IndexRow
                    key={item.slug}
                    index={pad(i)}
                    title={item.title}
                    kicker={item.displayDate}
                    footer={
                      <Button href={item.url} target="_blank" rel="noreferrer">
                        Read on pksf.org.bd
                      </Button>
                    }
                  >
                    {item.summary}
                  </IndexRow>
                ))}
              </div>
            </div>
          </Container>
        </Ground>

        {/* ── Final statement ──────────────────────────────────────────── */}
        <Ground ground="ink">
          <Container className="py-28 md:py-36 lg:py-44">
            <Meta ground="ink">In closing</Meta>
            <Reveal className="mt-10">
              <p className="max-w-[14ch] font-display text-colossal font-bold uppercase">
                The network is the reach
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-6">
              <Button href="#interventions">Explore the ten interventions</Button>
              <Button href={organization.website} target="_blank" rel="noreferrer">
                Visit pksf.org.bd
              </Button>
            </Reveal>
            <ProvenanceMark
              kind="editorial"
              ground="ink"
              note="a reading of the published mandate — PKSF reaches households through its Partner Organisations"
              className="mt-12"
            />
          </Container>
        </Ground>
      </main>

      <Footer />
    </>
  );
}
