import { GROUND, type Ground } from "@/components/editorial/grounds";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import { Reveal } from "@/components/motion/Reveal";

type AwaitingSourceProps = {
  id?: string;
  /** Editorial index — these are a numbered set of outstanding sections. */
  index: string;
  title: string;
  /** What this section will hold once the data exists. */
  what: string;
  /** What has to be verified before anything ships here. */
  needs: string;
  ground?: Ground;
  className?: string;
};

/**
 * Honest empty state for the sections whose data files are deliberately empty
 * (stories, programmes, projects, publications, news).
 *
 * Set as a ruled editorial row rather than a card. Three cards in a row would
 * imply three equivalent, finished things; a ruled list reads as an index of
 * work outstanding, which is what it is. The title is given real display
 * scale so the gap is stated confidently instead of apologised for.
 */
export function AwaitingSource({
  id,
  index,
  title,
  what,
  needs,
  ground = "parchment",
  className = "",
}: AwaitingSourceProps) {
  const g = GROUND[ground];

  return (
    <Reveal
      className={`scroll-mt-28 border-t ${g.border} ${className}`}
    >
      <div
        id={id}
        className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
      >
        <span className={`font-mono text-meta uppercase md:col-span-1 ${g.muted}`}>{index}</span>

        <h3 className="font-display text-headline font-semibold text-balance md:col-span-5">
          {title}
        </h3>

        <div className="md:col-span-6">
          <p className={`max-w-lg text-lead ${g.muted}`}>{what}</p>
          <ProvenanceMark kind="pending" ground={ground} note={needs} className="mt-5" />
        </div>
      </div>
    </Reveal>
  );
}
