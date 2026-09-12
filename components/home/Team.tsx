import { Ground } from "@/components/editorial/Ground";
import { GROUND } from "@/components/editorial/grounds";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { LeaderCard } from "@/components/home/LeaderCard";
import { Odometer } from "@/components/home/Odometer";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { TeamRoster } from "@/components/home/TeamRoster";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { leadership, roster, teamSource } from "@/data/team";

const GROUND_NAME = "paper" as const;
const g = GROUND[GROUND_NAME];

/**
 * The statement, as a ladder.
 *
 * Three lines, each stepped further into the measure and each set a shade
 * darker than the one above it, with a hairline running the full width under
 * every one — so the block reads as a page from a register rather than as a
 * heading. The last line is the only fact in it, and it is the one set in full
 * ink.
 *
 * The ladder is the one place on this page that sets type in an opacity of
 * the ground's ink rather than in one of its three named levels. It has to
 * be: `muted` and `clay` are the only steps below full ink that this ground
 * has, and `clay` is terracotta — a middle line in it is a colour change, not
 * a tonal one, and it shouts over the line that carries the fact. Measured
 * against `--paper` (#fff8e8), the three steps are 3.26 : 4.93 : 11.90, all
 * of them clear of the 3:1 floor for display-size type, which the smallest
 * step of this clamp (40px semibold) is well inside. The single chromatic
 * note is the numeral, and it is `clay` at 6.09.
 */
const STATEMENT = [
  { text: "The work has", tone: "text-on-light/55", indent: "" },
  { text: "names attached", tone: "text-on-light/70", indent: "md:pl-[10%]" },
  { text: null, tone: "", indent: "md:pl-[22%]" },
] as const;

/**
 * PKSF, by the people it publishes.
 *
 * It sits directly after the videos, and it is the one section on the page
 * whose subject is not a programme, a figure or a project. The composition is
 * the same one the rest of the page uses — a statement at display size, one
 * lead portrait at the measure, a row under it, and a way further in — and
 * every word in it comes off a single PKSF page.
 *
 * ── The line that is ours, and the lines that are not ─────────────────────
 * The three-line statement is this page's own writing and is marked as such.
 * Everything else — the five names, their designations, their photographs,
 * their qualifications, the 349 in the statement, the register behind the
 * control — is PKSF's, verbatim, and none of it is summarised.
 *
 * ── Why five, and why not the Chairman ────────────────────────────────────
 * Five is not a design choice. The management tier PKSF's register publishes
 * is one Managing Director and four Deputy Managing Directors, and the
 * section selects by designation rather than by row number, so it follows the
 * register if that ever changes. PKSF's Chairman is published under
 * Governance rather than in this register, so he is not shown here: mixing
 * the two would put an appointment to the Governing Body in a staff list.
 */
export function Team() {
  const [managingDirector, ...deputies] = leadership;
  const total = leadership.length;

  return (
    <Ground ground={GROUND_NAME} id="team">
      <Container className="pt-24 md:pt-32 lg:pt-40">
        <SectionHead
          label="PKSF / The team"
          ground={GROUND_NAME}
          note="The management tier, exactly as PKSF's own staff register publishes it."
          aside={
            <ProvenanceMark
              kind="verified"
              ground={GROUND_NAME}
              note={`${teamSource.label}, the register PKSF stamps “updated till ${teamSource.updated}”`}
            />
          }
        />

        {/* ── The statement ──────────────────────────────────────────────
            Each line rises out from behind its own edge: the mask is the
            `overflow-hidden` wrapper and the travel is the reveal's, so it is
            the one reveal component the page already has rather than a second
            one that does the same thing with a clip path. */}
        {/* The section's heading, and it has to be one — `SectionHead` is
            given no `heading` here because this block is it. It is a `div`
            carrying the heading role rather than an `<h2>`: the per-line masks
            need block wrappers around block-level motion elements, and an
            `<h2>` may only hold phrasing content, so the markup would be
            invalid and the browser would reshape it out from under hydration. */}
        <div role="heading" aria-level={2} className="mt-16 md:mt-20">
          {STATEMENT.map((line, i) => (
            <div key={i} className={line.indent}>
              <div className="overflow-hidden pb-[0.12em]">
                <Reveal distance={70} delay={i * 0.08}>
                  <span
                    className={`block font-display text-display font-semibold uppercase ${line.tone}`}
                  >
                    {line.text ?? (
                      <>
                        to it. All{" "}
                        <Odometer
                          value={String(roster.length)}
                          className={`font-display ${g.accent}`}
                        />
                      </>
                    )}
                  </span>
                </Reveal>
              </div>
              <span aria-hidden="true" className={`block h-px ${g.rule}`} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-10 md:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <Reveal delay={0.08} className="lg:max-w-2xl">
            <p className="text-lead text-muted">
              PKSF publishes its whole staff as one register — {roster.length}{" "}
              people, each with a name, a designation and a photograph against
              it. The five below are the management tier it opens with. There is
              no biography here for any of them, because PKSF publishes none:
              what is printed under each portrait is the designation and the
              qualification lines from that same register, and nothing has been
              written to fill the space.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="lg:shrink-0">
            <ProvenanceMark
              kind="editorial"
              ground={GROUND_NAME}
              note="the three-line statement above is this page's own writing — the count in it is the register's"
              className="max-w-xs"
            />
          </Reveal>
        </div>
      </Container>

      {/* ── The Managing Director ────────────────────────────────────────
          The one portrait at the measure, and the only one that drifts under
          the pointer. Not wrapped in a viewport reveal: at this size the block
          is taller than a short viewport, and the frame opens from its own
          scroll-driven mask instead — which cannot fail the way an
          intersection reveal on a too-tall element can. */}
      <Container className="mt-20 md:mt-28">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <LeaderCard
              leader={managingDirector}
              featured
              index={0}
              total={total}
              ground={GROUND_NAME}
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Meta ground={GROUND_NAME}>Leading the register</Meta>
            <p className="mt-6 max-w-xl font-prose text-title italic">
              One Managing Director, four Deputy Managing Directors, and{" "}
              {roster.length - total} more people on the same published list.
            </p>
            <ProvenanceMark
              kind="editorial"
              ground={GROUND_NAME}
              note="a count of PKSF's own register, not a statement about how PKSF is organised"
              className="mt-8 max-w-md"
            />
          </div>
        </div>
      </Container>

      {/* ── The Deputy Managing Directors ──────────────────────────────── */}
      <Container className="mt-24 md:mt-32">
        <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className={`h-px w-8 shrink-0 ${g.rule}`} />
            <span className={`font-mono text-meta uppercase ${g.accent}`}>Deputies</span>
          </span>
          <Meta ground={GROUND_NAME}>
            Four, in the order the register lists them.
          </Meta>
        </Reveal>

        <Stagger className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {deputies.map((leader, i) => (
            <LeaderCard
              key={leader.name}
              leader={leader}
              index={i + 1}
              total={total}
              ground={GROUND_NAME}
            />
          ))}
        </Stagger>
      </Container>

      {/* ── Everyone else ─────────────────────────────────────────────── */}
      <Container className="mt-24 pb-24 md:mt-32 md:pb-32 lg:pb-40">
        <TeamRoster ground={GROUND_NAME} />

        <ProvenanceMark
          kind="pending"
          ground={GROUND_NAME}
          note="staff photography — the portraits are PKSF's own published files, loaded from pksf.org.bd; no photographer or licence is recorded for any of them"
          className="mt-16 max-w-xl"
        />
      </Container>
    </Ground>
  );
}
