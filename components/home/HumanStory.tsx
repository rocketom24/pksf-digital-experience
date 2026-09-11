import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
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
      <div className="lg:col-span-5">
        {/* `self-start` plus `sticky` — the frame holds while the account
            beside it scrolls. Nothing here clips or scrolls internally, so
            the stickiness survives the section wrapper. */}
        <div className="lg:sticky lg:top-24">
          <Frame
            ratio={story.image ? "photo" : "portrait"}
            plate="weave"
            treatment="crop"
            mask
            ground={ground}
            caption={
              story.image
                ? story.source
                : `Reserved for the photograph published with this account — ${story.source}`
            }
          >
            {story.image && (
              <Image
                src={story.image.src}
                alt={story.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            )}
          </Frame>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:py-16">
        <Meta ground={ground}>Human story</Meta>

        <Reveal className="mt-8">
          <h2 className="max-w-2xl font-display text-display font-semibold text-balance">
            {story.name}
          </h2>
          <p className={`mt-5 font-mono text-meta uppercase ${g.accent}`}>
            {story.age ? `${story.age} — ` : ""}
            {story.location}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <p className={`max-w-lg text-lead ${g.muted}`}>{story.summary}</p>
        </Reveal>

        {story.facts && (
          <Reveal delay={0.18} className="mt-12">
            <dl className={`border-t ${g.border}`}>
              {story.facts.map((fact) => (
                <div
                  key={fact.label}
                  className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b py-4 ${g.border}`}
                >
                  <dt className="font-mono text-title">{fact.value}</dt>
                  <dd className={`font-mono text-meta uppercase ${g.muted}`}>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <Reveal delay={0.24} className="mt-12">
          <Button href={story.url} target="_blank" rel="noreferrer">
            Read the account on PKSF
          </Button>
        </Reveal>

        <ProvenanceMark
          kind="verified"
          ground={ground}
          note={`${story.source}, published ${story.published}. No sentence here is attributed to her as a quotation.`}
          className={`mt-14 border-t pt-6 ${g.border}`}
        />
      </div>
    </div>
  );
}
