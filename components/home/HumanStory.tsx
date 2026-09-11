import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type HumanStoryProps = { ground?: Ground; className?: string };

/**
 * The section a person's story will hold.
 *
 * It is built as pinned image storytelling now, so the arrangement does not
 * change when there is a photograph: the frame sticks for the length of the
 * text beside it, which is the shape a portrait and an account want. Today
 * the frame holds a plate.
 *
 * This is the one section where invention would do real harm — a fabricated
 * beneficiary, or stock photography that reads as one, is a lie about a real
 * person. So it stays open, and says what it is waiting for.
 */
export function HumanStory({ ground = "moss", className = "" }: HumanStoryProps) {
  const g = GROUND[ground];

  return (
    <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 ${className}`}>
      <div className="lg:col-span-5">
        {/* `self-start` plus `sticky` — the frame holds while the account
            beside it scrolls. Nothing here clips or scrolls internally, so
            the stickiness survives the section wrapper. */}
        <div className="lg:sticky lg:top-24">
          <Frame
            ratio="portrait"
            plate="weave"
            treatment="crop"
            ground={ground}
            caption="Reserved for a documented, consented portrait"
          />
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:py-16">
        <Meta ground={ground}>Human story</Meta>

        <Reveal className="mt-8">
          <h2 className="max-w-2xl font-display text-display font-semibold text-balance">
            The people belong here. Their permission comes first.
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 space-y-6">
          <p className={`max-w-lg text-lead ${g.muted}`}>
            This is where one person&rsquo;s account would carry the page — a
            name, a district, a photograph, and what changed. It is also the
            one section where invention would do real harm, so it stays open
            until there is a documented, consented account to publish.
          </p>
          <p className={`max-w-lg text-lead ${g.muted}`}>
            Until then, the strongest true thing this concept can say is the
            shape of the work: services delivered locally, by organisations
            that are already there.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <Button href="#interventions">See what the work covers</Button>
        </Reveal>

        <ProvenanceMark
          kind="pending"
          ground={ground}
          note="a named, consented account from a verified source"
          className={`mt-14 border-t pt-6 ${g.border}`}
        />
      </div>
    </div>
  );
}
