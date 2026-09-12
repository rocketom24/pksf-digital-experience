import { Ground } from "@/components/editorial/Ground";
import { GROUND } from "@/components/editorial/grounds";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { NewsCard } from "@/components/home/NewsCard";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { news, newsCenter } from "@/data/news";

const GROUND_NAME = "ink" as const;
const g = GROUND[GROUND_NAME];

/**
 * PKSF, on the record.
 *
 * It sits directly after the team and carries **no section marker**, for the
 * same reason Watch and Team do not: 01–08 are the chapters of this page's
 * own argument, and these three are PKSF speaking for itself — on film, by
 * name, and in writing.
 *
 * ── Why it is not a grid ──────────────────────────────────────────────────
 * The six photographs PKSF published with these releases are all the same
 * photograph: a line of people behind a signed folder, or a table seen down
 * its length. Laid out six-up at one size they would read as a contact sheet.
 * So the section is composed instead of gridded — one release at the full
 * measure, two at half measure dropped off one another's baseline and set at
 * a different ratio from everything around them, three at a third measure —
 * and the interest is carried by the headlines and the composition rather
 * than asked of the pictures.
 *
 * ── What is ours ──────────────────────────────────────────────────────────
 * The selection and its order. Nothing else: every headline, date, opening
 * paragraph, photograph and link is PKSF's own, off the release's own page.
 * The section says so twice — once at the head, once at the foot.
 *
 * None of the cards is wrapped in a viewport reveal. Each frame opens from
 * its own scroll-driven mask, which cannot fail the way an intersection
 * reveal on an element taller than the viewport can.
 */
export function News() {
  const [lead, ...rest] = news;
  const majors = rest.slice(0, 2);
  const minors = rest.slice(2);
  const total = news.length;

  return (
    <Ground ground={GROUND_NAME} id="news">
      <Container className="pt-24 md:pt-32 lg:pt-40">
        <SectionHead
          label="PKSF / News"
          ground={GROUND_NAME}
          heading={
            <>
              The record,
              <br />
              as PKSF issued it.
            </>
          }
          note={`${total} releases from PKSF's own News Center. Newest first.`}
          aside={
            <ProvenanceMark
              kind="verified"
              ground={GROUND_NAME}
              note={`${newsCenter.label} — every headline, date, opening paragraph and photograph is the release's own`}
            />
          }
        />
      </Container>

      {/* ── The lead release ─────────────────────────────────────────────── */}
      <Container className="mt-14 md:mt-20">
        <NewsCard item={lead} size="lead" index={0} total={total} ground={GROUND_NAME} />
      </Container>

      {/* ── Two at half measure ──────────────────────────────────────────────
          Dropped off one another's baseline from `lg` up, which is the whole
          reason this is a twelve-column grid rather than two equal columns:
          two cards level with each other at the same size is the grid this
          section is trying not to be. Below `lg` they simply stack. */}
      <Container className="mt-24 md:mt-32">
        <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <NewsCard item={majors[0]} size="major" index={1} total={total} ground={GROUND_NAME} />
          </div>
          <div className="lg:col-span-5 lg:mt-32">
            <NewsCard item={majors[1]} size="major" index={2} total={total} ground={GROUND_NAME} />
          </div>
        </div>
      </Container>

      {/* ── The rest of the selection ────────────────────────────────────── */}
      <Container className="mt-24 pb-24 md:mt-32 md:pb-32 lg:pb-40">
        <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className={`h-px w-8 shrink-0 ${g.rule}`} />
            <span className={`font-mono text-meta uppercase ${g.accent}`}>Also filed</span>
          </span>
          <Meta ground={GROUND_NAME}>
            Three more, in the order PKSF published them.
          </Meta>
        </Reveal>

        {/* Two up on a tablet, three only from `lg`. At 834 a third of the
            measure is a 242px card, and a 16:9 picture in one is a strip —
            the same trap the project cards fell into. */}
        <Stagger className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {minors.map((item, i) => (
            <NewsCard
              key={item.slug}
              item={item}
              size="minor"
              index={i + 3}
              total={total}
              ground={GROUND_NAME}
            />
          ))}
        </Stagger>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 md:mt-20">
          <Button
            href={newsCenter.url}
            variant="solid"
            ground={GROUND_NAME}
            target="_blank"
            rel="noreferrer"
          >
            The whole News Center
          </Button>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:gap-16">
          <ProvenanceMark
            kind="editorial"
            ground={GROUND_NAME}
            /* No em dash inside the note: the mark already prints one to
               introduce it, and a second reads as a stray. */
            note="the selection and its order are this page's; the releases, and every word quoted from them, are PKSF's"
            className="max-w-md"
          />
          <ProvenanceMark
            kind="pending"
            ground={GROUND_NAME}
            note="news photography — the six files are PKSF's own, loaded from pksf.org.bd; no photographer or licence is recorded for any of them"
            className="max-w-md"
          />
        </div>
      </Container>
    </Ground>
  );
}
