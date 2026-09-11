import { Ground } from "@/components/editorial/Ground";
import { SectionHead } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { StrategicInterventionCard } from "@/components/home/StrategicInterventionCard";
import { Reveal } from "@/components/motion/Reveal";
import { interventions } from "@/data/interventions";
import { strategicPlan } from "@/data/organization";

/** Three to a row, in the published order; the tenth closes on its own. */
const PER_ROW = 3;

const rows = interventions.reduce<(typeof interventions)[]>((acc, item, i) => {
  if (i % PER_ROW === 0) acc.push([]);
  acc[acc.length - 1].push(item);
  return acc;
}, []);

/**
 * The ten strategic intervention areas.
 *
 * An index of selected work rather than ten sections: three cards to a row,
 * each one a picture until it is looked at, and the row redistributing its
 * width under the pointer so the card being read takes half of it. Ten areas
 * fit in four rows, which is the point — the reader can see the whole of
 * PKSF's work at once and then go into any part of it, instead of scrolling
 * through ten full-screen chapters to find out how many there are.
 *
 * The section head is the page's standard one, so this reads as a chapter of
 * the same publication and not as a widget dropped into it. Everything below
 * it — the widths, the reveal, the scrim — is CSS in globals.css, keyed on
 * whether the visitor actually has a pointer that can hover.
 */
export function StrategicInterventions() {
  return (
    <Ground ground="parchment" id="interventions" marker="02">
      <Container className="pt-24 md:pt-32 lg:pt-40">
        <SectionHead
          label="Strategic interventions"
          heading={
            <>
              {interventions.length} areas.
              <br />
              One national reach.
            </>
          }
          note="The published set, in full, in PKSF's own order."
          aside={
            <ProvenanceMark
              kind="verified"
              note="names and figures as published; the descriptions are shortened, not rewritten"
            />
          }
        />

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <p className="max-w-2xl text-lead text-muted">
            The Strategic Plan {strategicPlan.period} — {strategicPlan.theme} — is
            carried out through ten strategic intervention areas. PKSF finances
            and equips the work; its Partner Organisations are what reach
            households, in every one of them.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-16 pb-24 md:mt-20 md:pb-32 lg:pb-40">
        <div className="flex flex-col gap-1.5">
          {rows.map((row, r) => (
            <div
              key={row[0].slug}
              className={`si-row flex flex-col gap-1.5 md:flex-row ${
                row.length === 1 ? "si-row-single" : ""
              }`}
            >
              {row.map((item, i) => (
                <StrategicInterventionCard
                  key={item.slug}
                  item={item}
                  index={r * PER_ROW + i}
                  total={interventions.length}
                  wide={row.length === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Ground>
  );
}
