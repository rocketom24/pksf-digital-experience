import { DeltaChannels } from "@/components/delta/DeltaChannels";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
import { relay } from "@/data/organization";

type DeltaRelayProps = { ground?: Ground; className?: string };

/**
 * The relay, drawn as what it is.
 *
 * One channel divides into a network, and the network divides again before it
 * reaches the coast. The branching is the content: PKSF publishes 200+
 * Partner Organisations running roughly 17,000 branch offices, so the drawing
 * shows a network dividing rather than a countable set of end points, and the
 * published counts sit against the stages they belong to.
 *
 * The legend and the drawing occupy separate columns. An earlier version laid
 * the labels over a full-width delta, and the second generation of channels
 * ran straight through the descriptions — the diagram and the reading fought
 * each other.
 *
 * ── Why the drawing is pinned rather than stretched ───────────────────────
 * It used to be an `absolute inset-0` layer stretched down a column whose
 * height the three stages set, with the stages spread across it by
 * `min-h-[44rem]` and `justify-between`. Two things were wrong with that.
 * The stages are taller than 44rem at every width the layout applies at, so
 * `justify-between` had nothing to distribute and `gap-0` was the gap that
 * actually applied — one stage's figure ran straight into the next stage's
 * label, with 18px between them. And a delta stretched over 1,100px of column
 * draws its two generations so far apart that neither is on screen with the
 * other.
 *
 * So the stages carry a real, generous gap, and the drawing is pinned at a
 * height it can be read at. It holds while the three stages pass it, which is
 * also the truer picture: the relay is one structure the whole section is
 * describing, not three separate diagrams.
 */
export function DeltaRelay({ ground = "parchment", className = "" }: DeltaRelayProps) {
  const g = GROUND[ground];

  return (
    <div className={`relative ${className}`}>
      {/* Below `lg` the drawing has no column of its own, so it sits behind
          the stages as atmosphere. It is decorative either way. */}
      <DeltaChannels
        branching={[6, 3]}
        spread={880}
        seed={4}
        className={`absolute inset-0 opacity-30 lg:hidden ${g.channel}`}
      />

      <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        <ol className="flex flex-col gap-20 lg:col-span-5 lg:gap-32">
          {relay.map((stage, i) => (
            <li key={stage.name} className={`border-t pt-8 ${g.border}`}>
              <Reveal delay={i * 0.08}>
                <span className="flex items-baseline gap-4">
                  <span className={`font-mono text-title leading-none ${g.accent}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Meta ground={ground}>{stage.role}</Meta>
                </span>
              </Reveal>

              <Rise className="mt-5" delay={i * 0.08 + 0.06}>
                <h3 className="font-display text-headline font-semibold text-balance">
                  {stage.name}
                </h3>
              </Rise>

              <Reveal delay={i * 0.08 + 0.12}>
                <p className={`mt-5 max-w-sm text-lead ${g.muted}`}>{stage.description}</p>
              </Reveal>

              {/* The published count for this stage, given the weight of a
                  figure rather than of a footnote — it is the one piece of
                  evidence the stage carries. */}
              {stage.figure && (
                <Reveal delay={i * 0.08 + 0.18}>
                  <p className={`mt-8 border-t pt-5 ${g.border}`}>
                    <span className="block font-mono text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none tracking-[-0.03em]">
                      {stage.figure.value}
                    </span>
                    <span className={`mt-3 block font-mono text-meta uppercase ${g.muted}`}>
                      {stage.figure.label}
                      <span className="ml-2 opacity-75">{stage.figure.asOf}</span>
                    </span>
                  </p>
                </Reveal>
              )}
            </li>
          ))}
        </ol>

        {/* Pinned at a height the two generations can be read at once, and
            held while the three stages pass it. */}
        <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
          <div className="sticky top-28 h-[34rem]">
            <DeltaChannels
              branching={[6, 3]}
              spread={880}
              seed={4}
              nodes="junctions"
              className={`absolute inset-0 ${g.channel}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
