import { Ground } from "@/components/editorial/Ground";
import { Meta, SectionHead } from "@/components/editorial/SectionHead";
import { Container } from "@/components/layout/Container";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { VideoCard } from "@/components/home/VideoCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { channel, videos } from "@/data/videos";

/**
 * PKSF, on film.
 *
 * It sits directly after the projects, and it is the only place on the page
 * where PKSF speaks in its own voice and its own picture rather than through
 * this page's typography: four videos PKSF published itself, opened on
 * PKSF's own channel.
 *
 * One video leads at the full measure and three follow under it, which is the
 * proportion the section is for — a documentary is not a card in a grid. The
 * lead is PKSF's own choice rather than ours: it is the video PKSF has placed
 * in the video gallery on its own homepage.
 *
 * Nothing is embedded. Four YouTube iframes would have been the heaviest
 * thing on a page whose hero is a 3200px photograph, for four videos most
 * readers will not play — so each card is the video's own thumbnail and the
 * click goes to YouTube. See the note in VideoCard.
 */
export function Watch() {
  const [featured, ...rest] = videos;
  const total = videos.length;

  return (
    <Ground ground="ink" id="watch">
      <Container className="pt-24 md:pt-32 lg:pt-40">
        <SectionHead
          label="PKSF / Watch"
          ground="ink"
          heading={
            <>
              What the work
              <br />
              looks like.
            </>
          }
          note="Four videos, published by PKSF on its own channel."
          aside={
            <ProvenanceMark
              kind="verified"
              ground="ink"
              note={`PKSF — ${channel.handle} on YouTube; every title, length, date and thumbnail is the video's own`}
            />
          }
        />
      </Container>

      {/* ── The featured video ───────────────────────────────────────────
          Not wrapped in a viewport reveal: at the full measure this frame is
          taller than a short viewport, and an intersection reveal on
          something taller than the viewport never fires when the scroll
          position jumps inside it. The frame opens from its own mask instead,
          which is driven by scroll position and cannot fail that way. */}
      <Container className="mt-14 md:mt-20">
        <VideoCard video={featured} featured index={0} total={total} />
      </Container>

      {/* ── The rest of the selection ────────────────────────────────────── */}
      <Container className="mt-20 pb-24 md:mt-28 md:pb-32 lg:pb-40">
        <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-on-dark/18" />
            <span className="font-mono text-meta uppercase text-ember">More</span>
          </span>
          <Meta ground="ink">Three more, from the same channel.</Meta>
        </Reveal>

        <Stagger className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-5 lg:gap-x-8">
          {rest.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i + 1} total={total} />
          ))}
        </Stagger>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-6 md:mt-20">
          <Button
            href={channel.url}
            variant="solid"
            ground="ink"
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${channel.name} on YouTube`}
          >
            All videos on YouTube
          </Button>
        </Reveal>

        {/* The section's one unverifiable line, stated rather than left to be
            assumed. PKSF published these four under English titles; the Bangla
            under three of them is this page's, and the fourth says on its own
            card that it is PKSF's. */}
        <ProvenanceMark
          kind="editorial"
          ground="ink"
          note="the Bangla line under each title is this page's own rendering — PKSF published these four videos under English titles. The one line that is PKSF's own says so on its card."
          className="mt-12 max-w-xl"
        />
      </Container>
    </Ground>
  );
}
