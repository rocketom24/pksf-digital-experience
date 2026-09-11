import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Stagger } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverCard } from "@/components/ui/HoverCard";
import { ImpactNumber } from "@/components/ui/ImpactNumber";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { InteractiveCarousel, type CarouselItem } from "@/components/ui/InteractiveCarousel";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialStatement } from "@/components/editorial/EditorialStatement";
import { SplitSection } from "@/components/editorial/SplitSection";
import { FullBleedSection } from "@/components/editorial/FullBleedSection";
import { MediaTextSection } from "@/components/editorial/MediaTextSection";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { StickyStory } from "@/components/editorial/StickyStory";
import { SectionTransition } from "@/components/editorial/SectionTransition";
import { StrategicExplorer } from "@/components/editorial/StrategicExplorer";
import { organization } from "@/data/organization";
import { interventions } from "@/data/interventions";
import { impactMetrics } from "@/data/impact";
import { PlaygroundSection } from "./PlaygroundSection";
import { Placeholder } from "./Placeholder";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Internal visual and interaction laboratory for the PKSF Digital Experience concept — not a public page.",
  robots: { index: false, follow: false },
};

const carouselItems: CarouselItem[] = interventions.map((item) => ({
  id: item.slug,
  label: item.name,
  content: (
    <div>
      <Placeholder label={item.name} tone="green" />
      <p className="mt-4 font-display text-xl">{item.name}</p>
    </div>
  ),
}));

export default function DesignSystemPage() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <PageTransition>
        <main>
          <section className="flex min-h-[70vh] flex-col justify-end bg-ink px-4.5 pb-16 pt-32 text-background md:px-12">
            <SectionLabel theme="dark" className="mb-8">Phase 2 — internal only, not the homepage</SectionLabel>
            <TextReveal
              as="h1"
              text="Design System"
              className="max-w-4xl font-display text-hero"
            />
            <Reveal delay={0.3} className="mt-8 max-w-xl text-lg text-background/70">
              <p>
                Every reusable editorial component, motion primitive and interaction pattern for
                the PKSF Digital Experience concept, in one lab. Phase 3 assembles the homepage
                from what&rsquo;s demonstrated here.
              </p>
            </Reveal>
          </section>

          {/* 01 — Typography */}
          <PlaygroundSection index="01" title="Typography" description="Display serif for statements, Manrope for everything functional.">
            <div className="flex flex-col gap-10">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Hero — text-hero, font-display</p>
                <p className="font-display text-hero leading-none">Story first.</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Editorial statement — text-editorial, font-display</p>
                <p className="font-display text-editorial leading-none">A closer look.</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Large statement — text-4xl, font-display</p>
                <p className="font-display text-4xl">Institutional credibility, told with care.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Body — text-lg</p>
                  <p className="max-w-md text-lg text-ink">
                    {organization.mandate}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Label / metadata</p>
                  <SectionLabel>Section label</SectionLabel>
                  <p className="mt-4 text-sm text-muted">Metadata line — text-sm, text-muted</p>
                </div>
              </div>
            </div>
          </PlaygroundSection>

          {/* 02 — Color */}
          <PlaygroundSection index="02" title="Color" description="Green is an accent, not a wash — see docs/art-direction.md.">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { name: "Background", cls: "bg-background border border-ink/10", fg: "text-ink" },
                { name: "Ink", cls: "bg-ink", fg: "text-background" },
                { name: "Muted", cls: "bg-muted", fg: "text-background" },
                { name: "White", cls: "bg-white border border-ink/10", fg: "text-ink" },
                { name: "Green", cls: "bg-green", fg: "text-background" },
                { name: "Green deep", cls: "bg-green-deep", fg: "text-background" },
                { name: "Green soft", cls: "bg-green-soft", fg: "text-ink" },
                { name: "Sand", cls: "bg-sand", fg: "text-ink" },
                { name: "Clay", cls: "bg-clay", fg: "text-background" },
                { name: "Sky", cls: "bg-sky", fg: "text-ink" },
              ].map((swatch) => (
                <div key={swatch.name} className={`flex aspect-square flex-col justify-end p-4 ${swatch.cls}`}>
                  <span className={`text-xs font-medium uppercase tracking-[0.15em] ${swatch.fg}`}>{swatch.name}</span>
                </div>
              ))}
            </div>
          </PlaygroundSection>

          {/* 03 — Buttons & Links */}
          <PlaygroundSection index="03" title="Buttons & Links" description="Movement is capped and always keyboard-equivalent — never hover-only.">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" href="#">Primary</Button>
                <Button variant="secondary" href="#">Secondary</Button>
                <Button variant="ghost" href="#">Ghost link</Button>
              </div>
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Magnetic button — try with a mouse, then Tab to it</p>
                <MagneticButton>Explore the interventions</MagneticButton>
              </div>
            </div>
          </PlaygroundSection>

          {/* 04 — Editorial Text */}
          <PlaygroundSection index="04" title="Editorial Text" description="Line-reveal on viewport entry; screen readers read the real sentence, not split fragments.">
            <div className="flex flex-col gap-16">
              <EditorialStatement
                eyebrow="Statement"
                text="Modern does not mean excessive."
                description="EditorialStatement pairs an eyebrow, a TextReveal headline and an optional supporting line."
              />
              <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3" itemClassName="border-t border-ink/10 pt-6">
                {["Motion should communicate hierarchy.", "Whitespace creates a premium feeling.", "Accessibility is part of the design."].map((line) => (
                  <p key={line} className="text-lg">{line}</p>
                ))}
              </Stagger>
            </div>
          </PlaygroundSection>

          {/* 05 — Media */}
          <PlaygroundSection index="05" title="Media" description="Clip-path reveals, no layout shift — real imagery arrives in Phase 3.">
            <div className="flex flex-col gap-16">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">ImageReveal — masked reveal + subtle scale, next/image only</p>
                <div className="max-w-xs bg-ink/5 p-12">
                  <ImageReveal src="/next.svg" alt="" width={200} height={48} imageClassName="w-full" />
                </div>
              </div>
              <SplitSection media={<Placeholder label="SplitSection media" tone="sky" />}>
                <h3 className="font-display text-3xl">SplitSection</h3>
                <p className="mt-4 max-w-sm text-muted">Media on one side, content on the other. Stacks on mobile, reverses via a prop.</p>
              </SplitSection>
              <MediaTextSection
                media={<Placeholder label="MediaTextSection media" tone="clay" />}
                eyebrow="Stacked"
                title="MediaTextSection"
                description="Full-width media, then a text block — or text first via mediaPosition."
              />
              <FullBleedSection
                media={<div aria-hidden="true" className="h-full w-full bg-sand" />}
                caption="FullBleedSection: near-full-viewport media with an editorial caption."
                height="large"
              />
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Parallax — subtle scroll-linked drift, decorative only</p>
                <div className="flex h-40 items-center justify-center overflow-hidden bg-ink/5">
                  <Parallax offset={24} className="w-40">
                    <Placeholder label="Drifts on scroll" tone="clay" className="aspect-square" />
                  </Parallax>
                </div>
              </div>
            </div>
          </PlaygroundSection>

          {/* 06 — Impact */}
          <PlaygroundSection index="06" title="Impact" description="Real, verified numbers only — everything else is explicitly labeled as a demo value.">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              <ImpactNumber value={organization.founded} label="Established" description={`${organization.shortName} was established in ${organization.founded}.`} />
              <ImpactNumber value={interventions.length} label="Strategic intervention areas" description="The ten published categories, counted from data/interventions.ts." />
              <ImpactNumber value={128} suffix="+" label="Demo value" description="Illustrative only — not a verified PKSF figure." />
            </div>
            <div className="mt-16 flex items-baseline gap-3 border-t border-ink/10 pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Raw AnimatedNumber primitive —</p>
              <AnimatedNumber value={interventions.length} suffix=" areas" className="font-display text-2xl" />
            </div>
            <div className="mt-8 border-t border-ink/10 pt-8">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Verified metrics — pending source</p>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {impactMetrics.map((metric) => (
                  <li key={metric.slug} className="border-t border-ink/10 pt-4 text-sm text-muted">
                    {metric.label} — {metric.value === null ? "awaiting verified source" : metric.value}
                  </li>
                ))}
              </ul>
            </div>
          </PlaygroundSection>

          {/* 07 — Cards */}
          <PlaygroundSection index="07" title="Cards" description="Title, description and arrow are always visible — hover/focus only adds motion.">
            <EditorialGrid columns={2}>
              {interventions.slice(0, 4).map((item, i) => (
                <HoverCard
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  number={String(i + 1).padStart(2, "0")}
                  title={item.name}
                  description={item.description}
                />
              ))}
            </EditorialGrid>
          </PlaygroundSection>

          {/* 08 — Storytelling */}
          <PlaygroundSection index="08" title="Storytelling" description="StickyStory and HorizontalScroll — both driven by native scroll, nothing intercepted.">
            <div className="flex flex-col gap-24">
              <StickyStory
                eyebrow="StickyStory"
                heading="Anchored on the left, scrolling on the right."
                description="CSS `position: sticky` holds the heading — no scroll listeners."
                items={[
                  { title: "Design system", description: "Motion primitives, editorial components and tokens, defined once." },
                  { title: "Navigation shell", description: "Transparent-to-solid navbar, mega menu, mobile menu, search overlay." },
                  { title: "Data architecture", description: "Typed, verified data files — never invented figures." },
                ]}
              />
              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">HorizontalScroll — desktop pins &amp; pans; mobile swipes natively</p>
                <HorizontalScroll>
                  {interventions.slice(0, 4).map((item) => (
                    <div key={item.slug} className="flex h-full flex-col justify-center">
                      <Placeholder label={item.name} tone="green" className="aspect-video" />
                      <h4 className="mt-6 font-display text-3xl">{item.name}</h4>
                      <p className="mt-2 max-w-md text-muted">{item.description}</p>
                    </div>
                  ))}
                </HorizontalScroll>
              </div>
            </div>
          </PlaygroundSection>

          {/* 09 — Strategic Explorer */}
          <PlaygroundSection index="09" title="Strategic Explorer" description="The real ten intervention areas — select with click, tap, or Tab + Enter/Space.">
            <StrategicExplorer />
          </PlaygroundSection>

          {/* 10 — Carousel */}
          <PlaygroundSection index="10" title="Carousel" description="One scroll-snap track underneath drag, swipe, buttons and arrow keys.">
            <InteractiveCarousel items={carouselItems} ariaLabel="Strategic intervention areas carousel" />
          </PlaygroundSection>

          {/* 11 — Navigation */}
          <PlaygroundSection index="11" title="Navigation" description="The header above is built from exactly these components — transparent on load, solid once scrolled.">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="border border-ink/10 p-6">
                <h4 className="font-display text-xl">Navbar</h4>
                <p className="mt-2 text-sm text-muted">Transparent over the hero, solid once `scrollY &gt; 32`. Try scrolling this page.</p>
              </div>
              <div className="border border-ink/10 p-6">
                <h4 className="font-display text-xl">Mega menu</h4>
                <p className="mt-2 text-sm text-muted">Hover or focus &ldquo;Our Work&rdquo; above — staggered reveal, Escape to close. Positioned `fixed` to the header, so it isn&rsquo;t previewable boxed-in here.</p>
              </div>
              <div className="border border-ink/10 p-6">
                <h4 className="font-display text-xl">Mobile menu &amp; search</h4>
                <p className="mt-2 text-sm text-muted">&ldquo;Menu&rdquo; and &ldquo;Search&rdquo; above open full-screen overlays — both focus-manage and close on Escape.</p>
              </div>
            </div>
          </PlaygroundSection>

          {/* 12 — Themes */}
          <div className="flex flex-col">
            <SectionTransition theme="green">
              <Container className="py-20 md:py-28">
                <SectionLabel theme="green" className="mb-6">12 — Themes · Green</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl">Impact</h2>
                <p className="mt-4 max-w-md text-background/70">SectionTransition paints a themed panel and draws a hairline across its top edge as it enters — background only, content never shifts.</p>
              </Container>
            </SectionTransition>
            <SectionTransition theme="dark">
              <Container className="py-20 md:py-28">
                <SectionLabel theme="dark" className="mb-6">Dark</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl">Information</h2>
              </Container>
            </SectionTransition>
            <SectionTransition theme="light">
              <Container className="py-20 md:py-28">
                <SectionLabel className="mb-6">Light</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl">Quiet</h2>
              </Container>
            </SectionTransition>
          </div>

          {/* 13 — Accessibility & Reduced Motion */}
          <PlaygroundSection index="13" title="Accessibility & Reduced Motion" description="Every motion primitive checks useReducedMotion() and substitutes an instant, fully accessible state.">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ul className="flex flex-col gap-3 text-sm text-muted">
                <li>— Reveals settle instantly with reduced motion, no opacity/position left mid-transition.</li>
                <li>— TextReveal always renders the full real sentence in the DOM; only the visual mask animates.</li>
                <li>— MagneticButton ignores touch pointers and reduced motion — keyboard activation is unaffected either way.</li>
                <li>— CustomCursor never mounts on coarse pointers and never intercepts clicks (pointer-events: none).</li>
                <li>— HorizontalScroll and InteractiveCarousel are native-scroll-driven, so Page Down / swipe / trackpad all just work.</li>
                <li>— Overlays (mobile menu, search) move focus in on open, close on Escape, and never trap Tab.</li>
              </ul>
              <div className="border border-ink/10 p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Try it</p>
                <p className="text-sm text-muted">
                  Enable &ldquo;Reduce motion&rdquo; in your OS accessibility settings and reload — every reveal, the
                  mega menu stagger, the carousel and the section themes above simplify or disable their motion
                  automatically.
                </p>
              </div>
            </div>
          </PlaygroundSection>

          <div id="editorial-hero-demo">
            <EditorialHero
              eyebrow="EditorialHero — demo"
              title="Everything responds. Nothing screams."
              description="The last reusable primitive: a full-height hero with eyebrow, headline, description and optional CTAs."
              theme="dark"
            >
              <Button variant="primary" href="#">Back to top</Button>
            </EditorialHero>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </>
  );
}
