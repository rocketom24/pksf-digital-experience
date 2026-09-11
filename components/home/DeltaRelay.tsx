import { DeltaChannels } from "@/components/delta/DeltaChannels";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
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
 * each other. Split, they still read together: the drawing spans the full
 * height of the legend and the three stages are distributed across it, so
 * source, junctions and coast sit against the stage each one names.
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
        {/* The minimum height is what spreads the three stages down the
            column, so each one reads against its own level of the drawing
            beside it rather than all three stacking at the top. */}
        <ol className="flex flex-col gap-16 lg:col-span-5 lg:min-h-[44rem] lg:justify-between lg:gap-0">
          {relay.map((stage, i) => (
            <li key={stage.name}>
              <Reveal delay={i * 0.12}>
                <span className="flex items-baseline gap-3">
                  <span className={`font-mono text-meta uppercase ${g.accent}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Meta ground={ground}>{stage.role}</Meta>
                </span>
                <h3 className="mt-3 font-display text-headline font-semibold text-balance">
                  {stage.name}
                </h3>
                <p className={`mt-4 max-w-sm text-body ${g.muted}`}>{stage.description}</p>
                {stage.figure && (
                  <p className={`mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t pt-4 ${g.border}`}>
                    <span className="font-mono text-title">{stage.figure.value}</span>
                    <span className={`font-mono text-meta uppercase ${g.muted}`}>
                      {stage.figure.label}
                      <span className="ml-2 opacity-75">{stage.figure.asOf}</span>
                    </span>
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="relative hidden lg:col-span-6 lg:col-start-7 lg:block">
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
  );
}
