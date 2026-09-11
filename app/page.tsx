import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Frame } from "@/components/editorial/Frame";
import { Ground } from "@/components/editorial/Ground";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { StatementSequence, type StatementWord } from "@/components/editorial/StatementSequence";
import { StrategicExplorer } from "@/components/editorial/StrategicExplorer";
import { AwaitingSource } from "@/components/home/AwaitingSource";
import { DeltaRelay } from "@/components/home/DeltaRelay";
import { DigitalDirection } from "@/components/home/DigitalDirection";
import { DigitalTimeline } from "@/components/home/DigitalTimeline";
import { Hero } from "@/components/home/Hero";
import { HumanStory } from "@/components/home/HumanStory";
import { ImpactLedger } from "@/components/home/ImpactLedger";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { interventions } from "@/data/interventions";

/** Shared vertical rhythm for the storytelling sections. */
const RHYTHM = "py-24 md:py-32 lg:py-40";

/**
 * Three themes read across the ten published intervention areas. Each gloss
 * names the areas it is drawn from, so the reading is checkable against
 * `data/interventions.ts` rather than asserted. These are not PKSF slogans
 * and the sequence is marked as an editorial reading wherever it appears.
 */
const THEMES: StatementWord[] = [
  {
    word: "Opportunity",
    gloss:
      "Inclusive Finance and Microenterprise Development — access to capital, and a route to grow something with it.",
  },
  {
    word: "Resilience",
    gloss:
      "Climate Action and Building Resilience — livelihoods that survive the shock, and recover after it.",
  },
  {
    word: "Capacity",
    gloss:
      "Human Capacity, and Knowledge, Communication & Advocacy — the skills of the network, and the evidence it works from.",
  },
];

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
            label="What the work is organised around"
            ground="ink"
            footnote={
              <ProvenanceMark
                kind="editorial"
                ground="ink"
                note={`a reading across the ${interventions.length} published intervention areas — not an official slogan`}
              />
            }
          />
        </Ground>

        {/* ── Full-screen visual ───────────────────────────────────────── */}
        <Ground ground="forest">
          <div className="relative flex min-h-[88svh] flex-col justify-end pb-24 md:pb-32">
            <Frame
              ratio="bleed"
              plate="delta"
              ground="forest"
              className="absolute inset-0 -z-10 [&>div]:h-full"
            />
            <Container>
              <Reveal>
                {/* Set past the measure on purpose: the line runs off the
                    right edge the way the network runs past the centre. The
                    section clips on x, so it never produces a scrollbar. */}
                <p className="max-w-[16ch] font-display text-display font-bold uppercase md:max-w-[24ch]">
                  Everything it funds arrives through someone else
                </p>
              </Reveal>
              <ProvenanceMark
                kind="editorial"
                ground="forest"
                note="a reading of the published mandate"
                className="mt-8"
              />
            </Container>
          </div>
        </Ground>

        {/* ── The model ────────────────────────────────────────────────── */}
        <Ground ground="parchment" id="model" marker="02">
          <Container className={RHYTHM}>
            <SectionHead
              label="The model"
              heading="Three steps between a fund and a household."
              note="PKSF does not reach communities directly. It makes it possible for others to."
              aside={
                <ProvenanceMark kind="verified" note="restated from the published mandate" />
              }
            />
            <DeltaRelay className="mt-24 lg:mt-32" />
          </Container>
        </Ground>

        {/* ── The ledger ───────────────────────────────────────────────── */}
        <Ground ground="ink" id="ledger" marker="03">
          <Container className={RHYTHM}>
            <SectionHead
              label="The ledger"
              heading="What can be verified, and what will not be invented."
              ground="ink"
              note="Two figures are checkable from the published record. Four are not, and are left open."
            />
            <ImpactLedger ground="ink" className="mt-20 lg:mt-28" />
          </Container>
        </Ground>

        {/* ── Strategic interventions ──────────────────────────────────── */}
        <Ground ground="parchment" marker="04">
          <Container className="pb-16 pt-24 md:pt-32 lg:pt-40">
            <SectionHead
              label="Strategic interventions"
              heading={`${interventions.length} areas, one mandate.`}
              note="The published set, in full. Choose one to read what it covers."
              aside={
                <ProvenanceMark
                  kind="verified"
                  note="names as published; descriptions are editorial summaries"
                />
              }
            />
          </Container>
        </Ground>
        {/* The explorer owns its own ground, which changes with the selection. */}
        <section id="interventions" className="scroll-mt-16">
          <StrategicExplorer />
        </section>

        {/* ── Human story ──────────────────────────────────────────────── */}
        <Ground ground="moss" id="story" marker="05">
          <Container className={RHYTHM}>
            <HumanStory ground="moss" />
          </Container>
        </Ground>

        {/* ── Digital transformation ───────────────────────────────────── */}
        <Ground ground="ink" id="digital" marker="06">
          <Container className="pt-24 md:pt-32 lg:pt-40">
            <SectionHead
              label="Digital transformation"
              heading="From paper ledgers to an intelligent network."
              ground="ink"
              note="Five published eras. Each one changed what the network could see about itself."
              aside={
                <ProvenanceMark kind="verified" ground="ink" note="data/digital.ts — no milestones added" />
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
        <Ground ground="parchment" id="desk" marker="07">
          <Container className={RHYTHM}>
            <SectionHead
              label="The desk"
              heading="Three sections, waiting on sources."
              note="Programmes, publications and news must be right to the item. Their data files are in place and deliberately empty."
            />

            <div className="mt-20 border-b border-on-light/14 lg:mt-28">
              <AwaitingSource
                id="programs"
                index="01"
                title="Programmes & projects"
                what="A curated selection of live programmes and projects, each filed under one of the ten intervention areas, with its own scope and location."
                needs="official programme and project listings"
              />
              <AwaitingSource
                id="knowledge"
                index="02"
                title="Knowledge"
                what="Research, evaluations, annual reports and policy work — the evidence base an apex institution publishes and is judged on."
                needs="a publication index with titles, years and links"
              />
              <AwaitingSource
                id="news"
                index="03"
                title="News & updates"
                what="A restrained, dated editorial list of announcements and institutional activity, newest first."
                needs="officially issued, dated releases"
              />
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
              <Button href="/design-system">Open the design system</Button>
            </Reveal>
            <ProvenanceMark
              kind="editorial"
              ground="ink"
              note="a reading of the published mandate"
              className="mt-12"
            />
          </Container>
        </Ground>
      </main>

      <Footer />
    </>
  );
}
