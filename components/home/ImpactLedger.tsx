import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { impactMetrics } from "@/data/impact";
import { interventions } from "@/data/interventions";
import { organization } from "@/data/organization";

type ImpactLedgerProps = { ground?: Ground; className?: string };

/**
 * The open ledger.
 *
 * `data/impact.ts` holds `null` for every headline figure until it is checked
 * against an official, dated PKSF source. Rather than hide that, the gap is
 * the composition: the two facts that *are* verifiable are set at the scale a
 * homepage normally reserves for its impact numbers, and the four that are
 * not are listed underneath with the word that belongs there. Nothing here is
 * estimated, rounded or illustrative.
 *
 * The figures are set in the mono, not counted up. A year is not a quantity,
 * and animating it upward would make it look like one.
 */
export function ImpactLedger({ ground = "ink", className = "" }: ImpactLedgerProps) {
  const g = GROUND[ground];

  const verified = [
    {
      value: String(organization.founded),
      label: "Established",
      note: "The year Palli Karma-Sahayak Foundation was founded.",
      source: "data/journey.ts",
    },
    {
      value: String(interventions.length),
      label: "Strategic intervention areas",
      note: "The published set this page is organised around, in full.",
      source: "data/interventions.ts",
    },
  ];

  return (
    <div className={`grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <div className="flex flex-col gap-14 lg:col-span-5">
        {verified.map((fact, i) => (
          <Reveal key={fact.label} delay={i * 0.1}>
            <p className="font-mono text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.04em]">
              {fact.value}
            </p>
            <h3 className="mt-5 font-display text-title font-semibold">{fact.label}</h3>
            <p className={`mt-3 max-w-sm text-body ${g.muted}`}>{fact.note}</p>
            <ProvenanceMark kind="verified" ground={ground} note={fact.source} className="mt-5" />
          </Reveal>
        ))}
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal>
          <Meta ground={ground}>Not published here</Meta>
          <p className={`mt-6 max-w-lg text-lead ${g.muted}`}>
            These are the figures an institutional homepage leads with. This
            concept has no authority to publish them, so each one stays open
            until it is checked against an official, dated source.
          </p>
        </Reveal>

        <dl className="mt-12">
          {impactMetrics.map((metric, i) => (
            <Reveal
              key={metric.slug}
              delay={0.06 * i}
              className={`flex flex-col gap-1 border-t py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${g.border}`}
            >
              <dt className="font-display text-title font-medium">{metric.label}</dt>
              <dd className={`font-mono text-meta uppercase ${g.muted}`}>
                {metric.value === null
                  ? `Not published${metric.unit ? ` (${metric.unit})` : ""}`
                  : metric.value.toLocaleString("en-US")}
              </dd>
            </Reveal>
          ))}
        </dl>

        <ProvenanceMark
          kind="pending"
          ground={ground}
          note="an official PKSF publication with a stated reporting date"
          className={`mt-6 border-t pt-6 ${g.border}`}
        />
      </div>
    </div>
  );
}
