import { Reveal } from "@/components/motion/Reveal";
import { ImpactNumber } from "@/components/ui/ImpactNumber";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { impactMetrics } from "@/data/impact";
import { interventions } from "@/data/interventions";
import { organization } from "@/data/organization";

/**
 * Scale section. `data/impact.ts` deliberately holds `null` for every
 * figure until it is checked against an official, dated PKSF source, so
 * this renders the two facts that *are* verified as counters and the rest
 * as an open ledger. No number on this page is estimated or illustrative.
 */
export function ImpactLedger({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16 ${className}`}>
      <div className="flex flex-col gap-14 lg:col-span-5">
        <div>
          <ImpactNumber
            value={organization.founded}
            label="Established"
            description="The year Palli Karma-Sahayak Foundation was founded."
            theme="dark"
            format="plain"
          />
          <ProvenanceMark kind="verified" tone="dark" note="data/journey.ts" className="mt-5" />
        </div>

        <div>
          <ImpactNumber
            value={interventions.length}
            label="Strategic intervention areas"
            description="The published set this site is organised around, in full."
            theme="dark"
          />
          <ProvenanceMark kind="verified" tone="dark" note="data/interventions.ts" className="mt-5" />
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal>
          <h3 className="font-display text-3xl md:text-4xl">The open ledger</h3>
          <p className="mt-5 max-w-lg text-lg text-background/70">
            These are the figures an institutional homepage would normally lead
            with. This concept has no authority to publish them, so each one
            stays open until it is checked against an official, dated source.
          </p>
        </Reveal>

        <dl className="mt-12">
          {impactMetrics.map((metric) => (
            <div
              key={metric.slug}
              className="flex flex-col gap-1 border-t border-background/20 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <dt className="font-display text-2xl">{metric.label}</dt>
              <dd className="text-xs font-medium uppercase tracking-[0.18em] text-background/60">
                {metric.value === null
                  ? `Not published${metric.unit ? ` (${metric.unit})` : ""}`
                  : metric.value.toLocaleString("en-US")}
              </dd>
            </div>
          ))}
        </dl>

        <ProvenanceMark
          kind="pending"
          tone="dark"
          note="official PKSF publication with a stated reporting date"
          className="mt-6 border-t border-background/20 pt-6"
        />
      </div>
    </div>
  );
}
