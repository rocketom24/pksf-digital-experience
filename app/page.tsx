import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialStatement } from "@/components/editorial/EditorialStatement";
import { SectionTransition } from "@/components/editorial/SectionTransition";
import { StickyStory } from "@/components/editorial/StickyStory";
import { StrategicExplorer } from "@/components/editorial/StrategicExplorer";
import { Reveal } from "@/components/motion/Reveal";
import { AwaitingSource } from "@/components/home/AwaitingSource";
import { DigitalDirection } from "@/components/home/DigitalDirection";
import { ImpactLedger } from "@/components/home/ImpactLedger";
import { MandateRelay } from "@/components/home/MandateRelay";
import { Plate } from "@/components/home/Plate";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { ScrollCue } from "@/components/home/ScrollCue";
import { Button } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { digitalTimeline } from "@/data/digital";
import { organization } from "@/data/organization";

/** Shared vertical rhythm for the storytelling sections — see docs/art-direction.md "Spacing". */
const RHYTHM = "py-24 md:py-32 lg:py-40";

const digitalItems = digitalTimeline.map((era) => ({
  title: era.period,
  description: (
    <>
      <span className="block font-display text-2xl text-background md:text-3xl">{era.title}</span>
      {era.description && <span className="mt-3 block">{era.description}</span>}
    </>
  ),
}));

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <EditorialHero
          eyebrow="Independent concept — not affiliated with PKSF"
          title="Reach that runs through others."
          media={
            <div className="absolute inset-0 bg-ink text-background">
              <Plate variant="network" />
            </div>
          }
          description={
            <p>
              Since {organization.founded}, {organization.fullName} has worked as
              an apex development organisation in Bangladesh — channelling funds,
              capacity building and policy support to a nationwide network of
              Partner Organisations, who deliver microfinance, microenterprise
              and social development services to rural and low-income communities.
            </p>
          }
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap gap-3">
              <Button href="#interventions" inverse>
                Explore the ten interventions
              </Button>
              <Button href="#digital" variant="secondary" inverse>
                See the digital direction
              </Button>
            </div>
            <ScrollCue href="#statement" />
          </div>
        </EditorialHero>

        {/* ── Editorial statement ──────────────────────────────────────── */}
        <section id="statement" className={`scroll-mt-20 ${RHYTHM}`}>
          <Container>
            <EditorialStatement
              eyebrow="The model"
              text="PKSF does not reach communities directly. It makes it possible for others to."
              description={
                <>
                  <p>
                    That single structural fact shapes everything else: an apex
                    body sets the terms, finances the work and builds the
                    capacity, while organisations rooted in their own districts
                    carry it the last mile. Scale comes from the network, not
                    from the centre.
                  </p>
                  <ProvenanceMark
                    kind="editorial"
                    note="a reading of the organisation's published mandate"
                    className="mt-8"
                  />
                </>
              }
            />
          </Container>
        </section>

        {/* ── Impact / scale ───────────────────────────────────────────── */}
        <SectionTransition theme="dark">
          <Container className={`scroll-mt-20 ${RHYTHM}`}>
            <div id="impact" className="scroll-mt-24">
              <SectionLabel theme="dark">Scale</SectionLabel>
              <Reveal className="mt-8 max-w-3xl">
                <h2 className="font-display text-editorial">
                  What we can verify, and what we will not invent.
                </h2>
              </Reveal>
            </div>
            <ImpactLedger className="mt-20 lg:mt-28" />
          </Container>
        </SectionTransition>

        {/* ── What PKSF does ───────────────────────────────────────────── */}
        <section className={RHYTHM}>
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionLabel>What PKSF does</SectionLabel>
                <Reveal className="mt-8">
                  <h2 className="font-display text-5xl md:text-6xl">
                    Three steps between a fund and a household.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
                <p className="text-lg text-muted">
                  Apex financing is easy to describe abstractly and hard to
                  picture. The relay below is the concrete version — who holds
                  the money, who does the work, and who it is for.
                </p>
                <ProvenanceMark
                  kind="verified"
                  note="restated from the organisation's mandate"
                  className="mt-8"
                />
              </Reveal>
            </div>

            <MandateRelay className="mt-20 lg:mt-28" />
          </Container>
        </section>

        {/* ── Strategic interventions ──────────────────────────────────── */}
        <SectionTransition theme="light">
          <Container className={RHYTHM}>
            <div id="interventions" className="scroll-mt-24">
              <SectionLabel>Strategic interventions</SectionLabel>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-6">
                  <h2 className="font-display text-editorial">Ten areas, one mandate.</h2>
                </Reveal>
                <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:self-end lg:pb-3">
                  <p className="text-lg text-muted">
                    The published set of intervention areas, in full. Select one
                    to read what it covers.
                  </p>
                  <ProvenanceMark
                    kind="verified"
                    note="names as published; descriptions are editorial summaries"
                    className="mt-6"
                  />
                </Reveal>
              </div>
            </div>

            <StrategicExplorer className="mt-16 lg:mt-24" />
          </Container>
        </SectionTransition>

        {/* ── Human story ──────────────────────────────────────────────── */}
        <section id="story" className="scroll-mt-20">
          <div className="relative isolate overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <Plate variant="strata" />
            </div>
            <Container className={RHYTHM}>
              <div className="max-w-2xl bg-background/95 p-8 md:p-12 lg:ml-auto lg:p-16">
                <SectionLabel>Human story</SectionLabel>
                <Reveal className="mt-8">
                  <h2 className="font-display text-5xl md:text-6xl">
                    The people belong here. Their permission comes first.
                  </h2>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-8 text-lg text-muted">
                    This is where a single person&rsquo;s story would carry the
                    page — a name, a district, a photograph, and what changed.
                    It is also the one section where invention would do real
                    harm, so it stays open until there is a documented,
                    consented account to publish.
                  </p>
                  <p className="mt-5 text-lg text-muted">
                    Until then, the strongest true thing the concept can say is
                    the shape of the work: services delivered locally, by
                    organisations that are already there.
                  </p>
                </Reveal>
                <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
                  <Button href="#interventions" variant="secondary">
                    See what the work covers
                  </Button>
                </Reveal>
                <ProvenanceMark
                  kind="pending"
                  note="a named, consented story from a verified source"
                  className="mt-10 border-t border-ink/15 pt-6"
                />
              </div>
            </Container>
          </div>
        </section>

        {/* ── Digital transformation ───────────────────────────────────── */}
        <SectionTransition theme="dark">
          <Container className={`scroll-mt-20 ${RHYTHM}`}>
            <div id="digital" className="scroll-mt-24">
              <SectionLabel theme="dark">Digital transformation</SectionLabel>
            </div>
            <StickyStory
              className="mt-16 lg:mt-24"
              theme="dark"
              heading="From paper ledgers to an intelligent network."
              description={
                <>
                  Five published eras, three decades apart at the ends. Each one
                  changed what the network could see about itself.
                  <ProvenanceMark
                    kind="verified"
                    tone="dark"
                    note="data/digital.ts — no milestones added"
                    className="mt-8"
                  />
                </>
              }
              items={digitalItems}
            />
            <DigitalDirection className="mt-32 border-t border-background/20 pt-20 lg:mt-40" />
          </Container>
        </SectionTransition>

        {/* ── Programs, knowledge, news ────────────────────────────────── */}
        <section className={RHYTHM}>
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionLabel>The desk</SectionLabel>
                <Reveal className="mt-8">
                  <h2 className="font-display text-5xl md:text-6xl">
                    Three sections, waiting on sources.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
                <p className="text-lg text-muted">
                  Programmes, publications and news are the parts of an
                  institutional site that must be right to the item. Their data
                  files are in place and deliberately empty — the layouts below
                  describe what each will hold and what it takes to fill them.
                </p>
              </Reveal>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:mt-28">
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
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <SectionTransition theme="green">
          <Container className="py-28 md:py-40 lg:py-48">
            <div className="max-w-4xl">
              <SectionLabel theme="green">Keep reading</SectionLabel>
              <Reveal className="mt-8">
                <h2 className="font-display text-editorial">
                  Start with the work itself.
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-xl text-lg text-background/70">
                  Ten intervention areas, one digital direction, and the design
                  system this concept is built on.
                </p>
              </Reveal>
              <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-3">
                <Button href="#interventions" inverse>
                  Explore the ten interventions
                </Button>
                <Button href="/design-system" variant="secondary" inverse>
                  Open the design system
                </Button>
              </Reveal>
            </div>
          </Container>
        </SectionTransition>
      </main>

      <Footer />
    </>
  );
}
