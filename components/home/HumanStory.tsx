import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { PointerParallax } from "@/components/motion/PointerParallax";
import { Reveal } from "@/components/motion/Reveal";
import { Rise } from "@/components/motion/Rise";
import { Button } from "@/components/ui/Button";
import { stories } from "@/data/stories";

type HumanStoryProps = { ground?: Ground; className?: string };

/**
 * One person, as PKSF published her.
 *
 * Pinned image storytelling: the frame holds while the account beside it
 * scrolls, which is the shape a portrait and a first-person record want. The
 * frame is reserved for the photograph published with the account — until
 * that is sourced it holds a plate, and the caption says which.
 *
 * ── The composition, and why the figures moved ────────────────────────────
 * The picture used to sit in a five-column well at 3:2, which made it a
 * 527px card with the better part of a thousand pixels of bare ground under
 * it — the one photograph of a named person on this page, set smaller than
 * the news thumbnails. It is at the full half-measure now, and the three
 * published figures were moved under it: they are what the account is
 * evidenced by, they fill the pinned column to the depth of the text beside
 * it, and at this size each figure reads as a figure rather than as a row of
 * a table.
 *
 * The ratio stays 3:2 — the photograph's own — so no crop is invented for a
 * published picture of a real person. Under the pointer it drifts inside its
 * frame, the same treatment the lead news picture gets, and nothing on the
 * card depends on that having happened.
 *
 * Every fact below comes from PKSF's own write-up, linked. There is no
 * quotation, because the source carries none: attributing an invented
 * sentence to a named woman in Pabna would be the one invention on this page
 * that does real harm.
 */
export function HumanStory({ ground = "moss", className = "" }: HumanStoryProps) {
  const g = GROUND[ground];
  const story = stories[0];

  return (
    <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 ${className}`}>
      <div className="lg:col-span-6">
        {/* `sticky` — the frame holds while the account beside it scrolls.
            Nothing here clips or scrolls internally, so the stickiness
            survives the section wrapper. */}
        <div className="lg:sticky lg:top-28">
          <Frame
            ratio={story.image ? "photo" : "portrait"}
            plate="weave"
            treatment={story.image ? "plain" : "crop"}
            mask
            ground={ground}
            caption={
              story.image
                ? story.source
                : `Reserved for the photograph published with this account — ${story.source}`
            }
          >
            {story.image && (
              /* `absolute inset-0` because `<Image fill>` needs a positioned
                 box the size of the frame, and the parallax wrapper is now
                 that box. `plain` rather than `crop` above for the same
                 reason the lead news frame is: two transforms on one picture
                 read as a wobble rather than as a camera. */
              <PointerParallax className="absolute inset-0">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </PointerParallax>
            )}
          </Frame>

          {/* The published figures from the same account, under the picture
              they belong to. */}
          {story.facts && (
            <dl className={`mt-12 border-t ${g.border}`}>
              {story.facts.map((fact, i) => (
                <Reveal
                  key={fact.label}
                  delay={i * 0.08}
                  className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b py-6 ${g.border}`}
                >
                  <dt className="font-mono text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none tracking-tight">
                    {fact.value}
                  </dt>
                  <dd className={`font-mono text-meta uppercase ${g.muted}`}>{fact.label}</dd>
                </Reveal>
              ))}
            </dl>
          )}
        </div>
      </div>

      <div className="lg:col-span-5 lg:col-start-8 lg:py-16">
        <Meta ground={ground}>Human story</Meta>

        {/* `role="heading"` on a div rather than an `<h2>`: the mask needs a
            block wrapper around a block-level motion element, and an `<h2>`
            takes phrasing content only. Same reason as Team's ladder. */}
        <div role="heading" aria-level={2} className="mt-8">
          <Rise distance={80}>
            <span className="block max-w-2xl font-display text-display font-semibold text-balance">
              {story.name}
            </span>
          </Rise>
        </div>

        <Reveal delay={0.1} className="mt-6">
          <p className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-meta uppercase ${g.accent}`}>
            {story.age && <span>{story.age}</span>}
            <span aria-hidden="true" className={`h-px w-8 shrink-0 ${g.rule}`} />
            <span>{story.location}</span>
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10">
          {/* Set at lead size rather than body: this is the account itself,
              and it is the only prose in the section. */}
          <p className={`max-w-xl text-lead ${g.muted}`}>{story.summary}</p>
        </Reveal>

        <Reveal delay={0.22} className={`mt-12 border-t pt-8 ${g.border}`}>
          <Button href={story.url} target="_blank" rel="noreferrer">
            Read the account on PKSF
          </Button>
        </Reveal>

        <ProvenanceMark
          kind="verified"
          ground={ground}
          note={`${story.source}, published ${story.published}. No sentence here is attributed to her as a quotation.`}
          className="mt-12 max-w-md"
        />
      </div>
    </div>
  );
}
