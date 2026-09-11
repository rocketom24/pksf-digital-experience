import { Ground } from "@/components/editorial/Ground";
import { GROUND, type Ground as GroundName } from "@/components/editorial/grounds";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { ProjectRow, type Movement } from "@/components/home/ProjectRow";
import { Reveal } from "@/components/motion/Reveal";
import { interventions } from "@/data/interventions";
import { projects } from "@/data/projects";

/**
 * The three movements the sequence is set in.
 *
 * These are this page's rubric and nothing else. PKSF does not group its
 * projects under these words, does not rank them, and publishes no featured
 * project — so the rubric is assigned by position in PKSF's own published
 * order and never by a judgement about the projects: the first entry opens,
 * the body of the listing advances, the last entry closes. The section says so
 * on its face rather than in a comment, because a reader who took "Focus" for
 * a PKSF category would have been misled by us.
 */
const MOVEMENTS: Record<Movement, { ground: GroundName; note: string }> = {
  Focus: {
    ground: "forest",
    note: "The listing opens.",
  },
  Advance: {
    ground: "parchment",
    note: "The portfolio, in full.",
  },
  Signature: {
    ground: "ink",
    note: "The listing closes.",
  },
};

const interventionName = (slug: string) =>
  interventions.find((item) => item.slug === slug)?.name ?? "";

/**
 * Which movement a position falls in. Derived from the length of the list, so
 * a project added to or withdrawn from PKSF's listing moves the boundaries on
 * its own — nothing here is keyed to a project by name.
 */
function movementAt(index: number, total: number): Movement {
  if (index === 0) return "Focus";
  if (index === total - 1) return "Signature";
  return "Advance";
}

/**
 * PKSF's projects, as a sequence of full-measure panels.
 *
 * It sits directly after the ten strategic intervention areas, and answers the
 * question that section leaves open: the ten areas are the framework, and
 * these are the financed, time-bound initiatives actually operating inside it.
 * Each panel carries the project's own headline figure, set large and rolled
 * into place, with the qualification PKSF publishes alongside it.
 *
 * The order is PKSF's — alphabetical by full title, as the official Projects
 * index lists it. Nothing is resequenced for effect; the opening and closing
 * moments are made by the ground each panel is printed on and by the size the
 * acronym is set at, not by moving a project to the front.
 */
export function Projects() {
  const total = projects.length;

  return (
    <Ground ground="paper" id="projects" marker="03">
      <Container className="pt-24 md:pt-32 lg:pt-40">
        <SectionHead
          label="PKSF projects"
          ground="paper"
          heading={
            <>
              From strategy
              <br />
              to action.
            </>
          }
          note="Every project, figure, partner and date is PKSF's own."
          aside={
            <ProvenanceMark
              kind="verified"
              ground="paper"
              note="PKSF — Projects, and each project's own page"
            />
          }
        />

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <p className="max-w-2xl text-lead text-muted">
            The ten intervention areas are the framework. These {total} projects
            are what is financed and running inside it — across livelihoods,
            microenterprise, climate resilience, skills, water, and extreme
            poverty. Each is time-bound and co-financed, and each is listed here
            in PKSF&rsquo;s own published order.
          </p>
        </Reveal>

        {/* The rubric, stated rather than assumed. Three words this page uses
            to set a sequence are three words a reader could easily take for a
            PKSF taxonomy. */}
        <ProvenanceMark
          kind="editorial"
          ground="paper"
          note="Focus, Advance and Signature are this page's own rubric for the sequence — PKSF does not group or rank its projects under them"
          className="mt-10 max-w-xl"
        />

        {/* The mark under each card says what that particular frame holds.
            This one says the thing none of them can say on its own. */}
        <ProvenanceMark
          kind="pending"
          ground="paper"
          note="project imagery — no photographer or licence is recorded for any of it, and three cards hold a published graphic or a logotype rather than a photograph. Each card states which."
          className="mt-3 max-w-xl"
        />
      </Container>

      <Container className="mt-16 flex flex-col gap-3 pb-24 md:mt-20 md:pb-32 lg:pb-40">
        {projects.map((project, i) => {
          const movement = movementAt(i, total);
          const { ground, note } = MOVEMENTS[movement];
          const opensMovement = movement !== movementAt(i - 1, total);

          return (
            <div key={project.slug} className="flex flex-col gap-3">
              {opensMovement && (
                <Reveal
                  className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 ${
                    i === 0 ? "" : "mt-9 md:mt-14"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-px w-8 shrink-0 ${GROUND.paper.rule}`}
                    />
                    <span className="font-mono text-meta uppercase text-clay">
                      {movement}
                    </span>
                  </span>
                  <Meta ground="paper">{note}</Meta>
                </Reveal>
              )}

              <Reveal>
                <ProjectRow
                  project={project}
                  index={i}
                  total={total}
                  movement={movement}
                  ground={ground}
                  area={interventionName(project.interventionSlug)}
                />
              </Reveal>
            </div>
          );
        })}
      </Container>
    </Ground>
  );
}
