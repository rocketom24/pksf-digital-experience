import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DeltaChannels } from "@/components/delta/DeltaChannels";
import { Frame } from "@/components/editorial/Frame";
import { Ground } from "@/components/editorial/Ground";
import { GROUND, type Ground as GroundName } from "@/components/editorial/grounds";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { StrategicExplorer } from "@/components/editorial/StrategicExplorer";
import { Plate } from "@/components/home/Plate";
import { ProvenanceMark, type Provenance } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MotionLab } from "@/app/design-system/MotionLab";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The visual laboratory for the PKSF Digital Experience concept — grounds, type, motion registers, the delta, image treatments and interaction states.",
};

const RHYTHM = "py-24 md:py-32";

/** Measured against each ground. See the palette comment in app/globals.css. */
const GROUNDS: {
  name: GroundName;
  hex: string;
  role: string;
  text: string;
  muted: string;
  accent: string;
}[] = [
  {
    name: "parchment",
    hex: "#F5EEDC",
    role: "Soft cream. The light ground — reading, indexes, the desk.",
    text: "deep forest 10.88:1",
    muted: "8.39:1",
    accent: "clay 5.57:1",
  },
  {
    name: "paper",
    hex: "#FFF8E8",
    role: "Warm paper. Insets and one intervention.",
    text: "deep forest 11.90:1",
    muted: "9.18:1",
    accent: "clay 6.09:1",
  },
  {
    name: "ink",
    hex: "#10231C",
    role: "Charcoal. Statements, ledger, close.",
    text: "paper 15.51:1",
    muted: "11.00:1",
    accent: "ember 7.33:1",
  },
  {
    name: "forest",
    hex: "#006A4E",
    role: "PKSF green. Primary — the delta, the vision.",
    text: "paper 6.26:1",
    muted: "5.10:1",
    accent: "gold 4.70:1",
  },
  {
    name: "moss",
    hex: "#3F7030",
    role: "Leaf green. Secondary — land, growth, the human story.",
    text: "paper 5.56:1",
    muted: "4.90:1",
    accent: "mist 4.91:1",
  },
];

const SUPPORTING = [
  { name: "gold", hex: "#EDD98C", use: "Pale mustard. Accent on forest. Small text safe." },
  { name: "mist", hex: "#DDEFE5", use: "Pale mint. Accent on moss. Small text safe." },
  { name: "silt", hex: "#B49A72", use: "Delta channels and hairlines. Never text." },
  { name: "clay", hex: "#9E4222", use: "Deep terracotta. Accent on light grounds. Small text safe." },
  { name: "terracotta", hex: "#D95D39", use: "Large text and UI on light grounds only." },
  { name: "ember", hex: "#D6A63A", use: "Golden mustard. Accent on ink. Small text safe." },
];

const TYPE_SCALE = [
  { token: "text-colossal", clamp: "4rem → 13rem", use: "Short words holding the viewport." },
  {
    token: "text-statement",
    clamp: "2.6rem → 11.5rem",
    use: "The same job for a long word — OPPORTUNITY fits a phone on one line.",
  },
  { token: "text-display", clamp: "2.5rem → 6.5rem", use: "Section headings, statements." },
  { token: "text-headline", clamp: "2rem → 3.75rem", use: "Sub-sections, menu items." },
  { token: "text-title", clamp: "1.5rem → 2.25rem", use: "Names in a list, ledger rows." },
  { token: "text-lead", clamp: "1.125rem → 1.375rem", use: "Lead prose, in the serif." },
  { token: "text-body", clamp: "1.0625rem", use: "Body prose." },
  { token: "text-meta", clamp: "0.8125rem", use: "Mono metadata, uppercase, 0.14em, medium." },
];

const PROVENANCE: Provenance[] = ["verified", "editorial", "direction", "pending"];

export default function DesignSystem() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-medium focus:text-on-dark"
      >
        Skip to content
      </a>

      <CustomCursor />
      <Navbar />

      <main id="main">
        {/* ── Opening ──────────────────────────────────────────────────── */}
        <Ground ground="ink">
          <div className="relative isolate [overflow-x:clip]">
            <DeltaChannels
              branching={[3, 2, 2]}
              spread={1180}
              seed={11}
              motionMode="entrance"
              className={`absolute inset-0 -z-10 h-full w-full ${GROUND.ink.channel}`}
            />
            <Container className="flex min-h-[70svh] flex-col justify-end pb-16 pt-32">
              <Meta ground="ink">Design system</Meta>
              <h1 className="mt-8 max-w-[14ch] font-display text-display font-bold uppercase">
                Delta, canopy and sunlight
              </h1>
              <p className={`mt-8 max-w-xl text-lead ${GROUND.ink.muted}`}>
                The working parts of the PKSF concept: five grounds and the ink
                levels that are legible on each, three faces with three jobs,
                three motion registers, and the delta the page is built around.
              </p>
            </Container>
          </div>
        </Ground>

        {/* ── Grounds ──────────────────────────────────────────────────── */}
        <Ground ground="parchment" id="ds-colour">
          <Container className={RHYTHM}>
            <SectionHead
              label="01 — Grounds"
              heading="A ground is a closed set, not a colour."
              note="Each ground ships with the three ink levels and the one accent that clear WCAG AA on it."
            />

            <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-5">
              {GROUNDS.map((item) => {
                const g = GROUND[item.name];
                return (
                  <Reveal key={item.name} className={`${g.bg} ${g.text} p-6`}>
                    <p className="font-display text-title font-semibold capitalize">{item.name}</p>
                    <p className={`mt-1 font-mono text-meta uppercase ${g.muted}`}>{item.hex}</p>
                    <p className={`mt-5 text-body ${g.muted}`}>{item.role}</p>
                    <dl className="mt-6 space-y-1 font-mono text-meta uppercase">
                      <div className="flex justify-between gap-3">
                        <dt className={g.muted}>Text</dt>
                        <dd>{item.text}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={g.muted}>Muted</dt>
                        <dd className={g.muted}>{item.muted}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={g.muted}>Accent</dt>
                        <dd className={g.accent}>{item.accent}</dd>
                      </div>
                    </dl>
                  </Reveal>
                );
              })}
            </div>

            <h3 className="mt-20">
              <Meta>Supporting</Meta>
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {SUPPORTING.map((swatch) => (
                <li
                  key={swatch.name}
                  className={`flex items-start gap-4 border-t py-5 ${GROUND.parchment.border}`}
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 size-8 shrink-0 rounded-full"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span>
                    <span className="block font-display text-base font-semibold capitalize">
                      {swatch.name}
                    </span>
                    <span className="mt-1 block font-mono text-meta uppercase text-muted">
                      {swatch.hex}
                    </span>
                    <span className="mt-2 block text-body text-muted">{swatch.use}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-2xl text-body text-muted">
              There is no single brand accent. Deep terracotta clears 5.57:1 on
              parchment but only 1.03:1 on PKSF green, and on that ground there
              is no headroom for a second green either — only a shift of hue
              reads as an accent, so forest takes the gold. Picking the accent
              from the ground, rather than from the brand, is what keeps every
              pairing legible.
            </p>
          </Container>
        </Ground>

        {/* ── Ground sequence ──────────────────────────────────────────── */}
        <Ground ground="ink">
          <Container className={RHYTHM}>
            <SectionHead
              label="02 — Sequence"
              heading="The page alternates rather than tints."
              ground="ink"
              note="Nine bands, no two adjacent the same. A section never inherits the register of the one before it."
            />
            <ol className="mt-16 flex h-32 w-full overflow-hidden rounded-sm">
              {(
                [
                  "ink",
                  "forest",
                  "parchment",
                  "ink",
                  "moss",
                  "ink",
                  "forest",
                  "parchment",
                  "ink",
                ] as GroundName[]
              ).map((name, i) => {
                const g = GROUND[name];
                return (
                  <li
                    key={`${name}-${i}`}
                    className={`flex flex-1 items-end p-2 ${g.bg} ${g.text}`}
                  >
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] opacity-90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className={`mt-6 max-w-2xl text-body ${GROUND.ink.muted}`}>
              Backgrounds are painted statically, never revealed on scroll. A
              reveal that carries a section&rsquo;s ground can silently fail to
              fire when the viewport jumps inside it — an anchor link does
              exactly that — and the result is unreadable text with no
              recovery. Transitions are carried by type and by the delta.
            </p>
          </Container>
        </Ground>

        {/* ── Typography ───────────────────────────────────────────────── */}
        <Ground ground="parchment" id="ds-type">
          <Container className={RHYTHM}>
            <SectionHead
              label="03 — Type"
              heading="Grotesque display, serif prose, mono data."
              note="The inversion is the point: this is an institution whose output is documents, so the reading voice is a serif."
            />

            <div className={`mt-16 grid grid-cols-1 gap-px border-t md:grid-cols-3 ${GROUND.parchment.border}`}>
              {[
                {
                  face: "Bricolage Grotesque",
                  cls: "font-display",
                  job: "Every display line and all interface text. Ink traps and flared joints, so it still has a voice at 13rem.",
                  sample: "Reach",
                },
                {
                  face: "Newsreader",
                  cls: "font-prose",
                  job: "Prose. Optical sizing, set with the leading a serif needs on screen.",
                  sample: "through",
                },
                {
                  face: "IBM Plex Mono",
                  cls: "font-mono",
                  job: "Years, indices, counts, provenance — everything that used to live in a paper ledger.",
                  sample: "1989",
                },
              ].map((item) => (
                <div key={item.face} className="py-8 md:pr-8">
                  <p className={`${item.cls} text-[3.5rem] leading-none`}>{item.sample}</p>
                  <p className="mt-6 font-display text-base font-semibold">{item.face}</p>
                  <p className="mt-2 max-w-xs text-body text-muted">{item.job}</p>
                </div>
              ))}
            </div>

            <dl className="mt-20">
              {TYPE_SCALE.map((step) => (
                <div
                  key={step.token}
                  className={`grid grid-cols-1 items-baseline gap-2 border-t py-5 md:grid-cols-12 md:gap-8 ${GROUND.parchment.border}`}
                >
                  <dt className="font-mono text-meta uppercase md:col-span-3">{step.token}</dt>
                  <dd className="font-mono text-meta uppercase text-muted md:col-span-3">
                    {step.clamp}
                  </dd>
                  <dd className="text-body text-muted md:col-span-6">{step.use}</dd>
                </div>
              ))}
            </dl>

            <div className={`mt-20 border-t pt-12 ${GROUND.parchment.border}`}>
              <Meta>In use</Meta>
              <p className="mt-8 font-display text-colossal font-bold uppercase leading-[0.82]">
                Delta
              </p>
              <p className="mt-6 font-display text-display font-semibold">
                Three steps between a fund and a household.
              </p>
              <p className="mt-6 max-w-xl text-lead text-muted">
                An apex development organisation that finances and equips a
                nationwide network of Partner Organisations — and reaches
                households only through them.
              </p>
              <p className="mt-6 font-mono text-meta uppercase text-muted">
                1990–2005 · 2016 · 2022 · 2023–24 · 2025+
              </p>
            </div>
          </Container>
        </Ground>

        {/* ── The delta ────────────────────────────────────────────────── */}
        <Ground ground="forest" id="ds-delta" rule>
          <Container className={RHYTHM}>
            <SectionHead
              label="04 — The delta"
              heading="The signature is a diagram, not an ornament."
              ground="forest"
              note="One channel upstream, distributaries that divide, a coastline. It is the shape of apex financing and the geography of the country at once."
            />

            <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
              {(
                [
                  { label: "branching [2, 2, 2]", branching: [2, 2, 2], seed: 1 },
                  { label: "branching [6, 3]", branching: [6, 3], seed: 4 },
                  { label: "branching [3, 2, 2]", branching: [3, 2, 2], seed: 11 },
                ] as const
              ).map((variant) => (
                <div key={variant.label}>
                  <DeltaChannels
                    branching={[...variant.branching]}
                    seed={variant.seed}
                    nodes="junctions"
                    className={`aspect-square w-full ${GROUND.forest.channel}`}
                  />
                  <p className={`mt-4 font-mono text-meta uppercase ${GROUND.forest.muted}`}>
                    {variant.label}
                  </p>
                </div>
              ))}
            </div>

            <p className={`mt-12 max-w-2xl text-body ${GROUND.forest.muted}`}>
              Channels are drawn by <code className="font-mono">useScroll</code>,
              never by an intersection reveal, so a jump in scroll position is
              just another position. Stroke weight thins downstream because that
              is what happens to a distributary. The whole layer is decorative
              and <code className="font-mono">aria-hidden</code>: no text
              depends on it having run.
            </p>
          </Container>
        </Ground>

        {/* ── Motion ───────────────────────────────────────────────────── */}
        <Ground ground="parchment" id="ds-motion">
          <Container className={RHYTHM}>
            <SectionHead
              label="05 — Motion"
              heading="Three registers, and nothing outside them."
              note="A duration typed inline is a bug. The registers are what make separate sections feel like one system."
            />
            <MotionLab className="mt-16" />
          </Container>
        </Ground>

        {/* ── Image architecture ───────────────────────────────────────── */}
        <Ground ground="ink" id="ds-image">
          <Container className={RHYTHM}>
            <SectionHead
              label="06 — Image architecture"
              heading="Every future photograph already has its frame."
              ground="ink"
              note="Plates hold the ratio and treatment a photograph will get, so adding real imagery changes one line and no layouts."
            />

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Frame ratio="portrait" plate="weave" ground="ink" caption="portrait · weave" />
              <Frame ratio="landscape" plate="strata" ground="ink" caption="landscape · strata" />
              <Frame ratio="square" plate="delta" ground="ink" caption="square · delta" />
              <Frame
                ratio="portrait"
                plate="strata"
                ground="ink"
                treatment="fade"
                caption="portrait · fade, for type over media"
                overlay={
                  <p className="font-display text-title font-semibold">Type sits here</p>
                }
              />
            </div>

            <p className={`mt-10 max-w-2xl text-body ${GROUND.ink.muted}`}>
              No stock photography of rural Bangladesh appears anywhere in this
              concept. Generic imagery would read as real beneficiaries and real
              projects, which is the one invention that would do actual harm —
              so the slots are held by drawn plates until there is documented,
              consented material.
            </p>
          </Container>
        </Ground>

        {/* ── Plates ───────────────────────────────────────────────────── */}
        <Ground ground="moss">
          <Container className={RHYTHM}>
            <SectionHead
              label="07 — Plates"
              heading="Three drawings from one landscape."
              ground="moss"
              note="Channels, sediment bands, and the weave of the fibre crops grown on them."
            />
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {(["delta", "strata", "weave"] as const).map((variant) => (
                <div key={variant}>
                  <div className={`aspect-4/3 w-full overflow-hidden ${GROUND.moss.channel}`}>
                    <Plate variant={variant} />
                  </div>
                  <p className={`mt-4 font-mono text-meta uppercase ${GROUND.moss.muted}`}>
                    {variant}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Ground>

        {/* ── Controls and marks ───────────────────────────────────────── */}
        <Ground ground="parchment" id="ds-controls">
          <Container className={RHYTHM}>
            <SectionHead
              label="08 — Controls"
              heading="Two shapes of action, and no third."
              note="The editorial default is built entirely from currentColor, so it inherits any ground and never needs a per-theme variant."
            />

            <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div>
                <Meta>On parchment</Meta>
                <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
                  <Button href="#ds-colour">Editorial link</Button>
                  <Button href="#ds-type" variant="solid" ground="parchment">
                    Solid
                  </Button>
                </div>
              </div>
              <div className={`${GROUND.forest.bg} ${GROUND.forest.text} p-8`}>
                <Meta ground="forest">On forest — same components</Meta>
                <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
                  <Button href="#ds-colour">Editorial link</Button>
                  <Button href="#ds-type" variant="solid" ground="forest">
                    Solid
                  </Button>
                </div>
              </div>
            </div>

            <div className={`mt-20 border-t pt-12 ${GROUND.parchment.border}`}>
              <Meta>Provenance marks</Meta>
              <p className="mt-6 max-w-2xl text-body text-muted">
                Every factual claim on the site carries one of four labels. The
                mark is shaped as well as coloured, so the states stay
                distinguishable on any ground and to anyone who does not read
                the colour.
              </p>
              <ul className="mt-8 space-y-4">
                {PROVENANCE.map((kind) => (
                  <li key={kind}>
                    <ProvenanceMark kind={kind} note="what the label is attached to" />
                  </li>
                ))}
              </ul>
            </div>

            <div className={`mt-20 border-t pt-12 ${GROUND.parchment.border}`}>
              <Meta>Cursor</Meta>
              <p className="mt-6 max-w-2xl text-body text-muted">
                The cursor reads <code className="font-mono">data-cursor</code>{" "}
                off whatever is under the pointer and changes size and label to
                match. It never renders for a coarse pointer and never under
                reduced motion. Hover each field below on a mouse to see the
                state.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px lg:grid-cols-4">
                {(["interactive", "view", "drag", "explore"] as const).map((state) => (
                  <div
                    key={state}
                    data-cursor={state}
                    className={`flex h-32 items-end p-4 ${GROUND.paper.bg}`}
                  >
                    <span className="font-mono text-meta uppercase text-muted">{state}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Ground>

        {/* ── Strategic interaction ────────────────────────────────────── */}
        <Ground ground="parchment" id="ds-strategic">
          <Container className="pb-12 pt-24 md:pt-32">
            <SectionHead
              label="09 — Strategic interaction"
              heading="The ground changes with the selection."
              note="Background and text are interpolated together as colour values, so no frame of the transition is light on light."
            />
          </Container>
        </Ground>
        <StrategicExplorer />

        {/* ── Reduced motion ───────────────────────────────────────────── */}
        <Ground ground="ink" id="ds-reduced">
          <Container className={RHYTHM}>
            <SectionHead
              label="10 — Reduced motion"
              heading="The whole story, without the choreography."
              ground="ink"
              note="Nothing is removed when motion is off. Sequences become lists, tracks become stacks, and every ground is already painted."
            />
            <dl className="mt-16">
              {[
                ["Statement sequence", "The sticky track collapses to the three words as a stacked list."],
                ["Digital timeline", "The horizontal track is replaced by the vertical sequence, in CSS rather than from a hook."],
                ["Delta channels", "Drawn complete on first paint instead of against scroll."],
                ["Ground shifts", "Change instantly rather than interpolating."],
                ["Cursor", "Does not render at all — a spring-followed pointer is exactly what the setting exists to stop."],
                ["Progress hairline", "Hidden."],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className={`grid grid-cols-1 gap-2 border-t py-5 md:grid-cols-12 md:gap-8 ${GROUND.ink.border}`}
                >
                  <dt className="font-display text-base font-semibold md:col-span-4">{term}</dt>
                  <dd className={`text-body md:col-span-8 ${GROUND.ink.muted}`}>{detail}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Ground>
      </main>

      <Footer />
    </>
  );
}
