import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { organization } from "@/data/organization";
import { interventions } from "@/data/interventions";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="flex min-h-screen flex-col justify-end bg-ink px-4.5 pb-24 pt-32 text-background md:px-12">
          <SectionLabel className="mb-8 text-background/60">
            Independent concept — since {organization.founded}
          </SectionLabel>
          <TextReveal
            as="h1"
            text="A closer look at PKSF's story."
            className="max-w-5xl font-display text-hero"
          />
          <Reveal delay={0.3} className="mt-8 max-w-xl text-lg text-background/70">
            <p>
              An unofficial editorial concept exploring {organization.fullName}
              &nbsp;— its reach, its interventions, and its digital transformation.
            </p>
          </Reveal>
        </section>

        <Section>
          <Container>
            <SectionLabel>Foundation check</SectionLabel>
            <Reveal className="mt-6 max-w-3xl">
              <h2 className="font-display text-editorial">This is the foundation, not the finished site.</h2>
            </Reveal>

            <div className="mt-16 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div className="col-span-4 md:col-span-3 lg:col-span-4">
                <AnimatedNumber value={interventions.length} className="font-display text-editorial" />
                <p className="mt-2 text-sm text-muted">Strategic intervention categories</p>
              </div>
              <div className="col-span-4 md:col-span-5 lg:col-span-8">
                <p className="max-w-xl text-lg text-muted">
                  Design system, motion primitives, navigation shell and data
                  architecture are in place. Homepage sections, internal pages
                  and verified content come next.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button href="/about" variant="primary">
                    Read the art direction
                  </Button>
                  <Button href="/work" variant="secondary">
                    See interventions
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section spacious={false} className="bg-green-soft">
          <Container>
            <SectionLabel>The ten strategic interventions</SectionLabel>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {interventions.map((item) => (
                <li key={item.slug} className="border-t border-ink/10 py-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
