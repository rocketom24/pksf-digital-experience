import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { Drift } from "@/components/motion/Drift";
import { GROUND } from "@/components/editorial/grounds";
import { Plate } from "@/components/home/Plate";
import { ProvenanceMark } from "@/components/home/ProvenanceMark";
import type { Intervention } from "@/data/interventions";
import { interventionMedia } from "@/data/interventionMedia";

type StrategicInterventionCardProps = {
  item: Intervention;
  /** Zero-based position in the published order. */
  index: number;
  total: number;
  /** Alone on its row, so it spans the full measure rather than half of it. */
  wide?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One strategic intervention area, as a selected-work card.
 *
 * Untouched, the card is the picture and nothing else. Under the pointer the
 * row gives it half its width, the two cards beside it give up a quarter
 * each, and the card says what it is: its number, its name, and the one
 * figure PKSF publishes against it, with the period that figure was reported
 * for. The reporting date is never dropped — without it the figure reads as
 * current rather than as of a stated day.
 *
 * The widths and the reveal are both CSS (`.si-row` / `.si-card` /
 * `.si-detail` in globals.css), which is what lets them be conditioned on
 * `@media (hover: hover)`: where there is no pointer that can hover, the card
 * simply carries its type all the time. Nothing here is conditioned on
 * JavaScript, and the type is in the document either way, so a screen reader
 * reads all ten areas whatever the input device.
 *
 * The card is focusable because it discloses something and has nothing else
 * to focus: a keyboard reader has no pointer to reveal it with.
 */
export function StrategicInterventionCard({
  item,
  index,
  total,
  wide = false,
}: StrategicInterventionCardProps) {
  const media = interventionMedia[item.slug];
  const { image } = media;

  return (
    <article
      tabIndex={0}
      data-cursor="explore"
      aria-labelledby={`intervention-${item.slug}`}
      /* The area's own ground is painted on the card, not on a band of the
         page. Ten cards on one parchment section would otherwise be ten
         drawn plates with nothing to read against — the plates are set in
         `currentColor` and take their tone from the ground they sit on. This
         is what keeps the colour story from Phase 5 once the sequence is a
         grid: the grid is the palette. */
      /* Square on a phone rather than 4:5. Every photograph in this set is
         landscape, and a portrait card throws away the outer third of each
         one and then enlarges what is left — a square keeps the crop honest
         and still leaves room for the type, which is what sets the floor on
         the height here. */
      className={`si-card group relative aspect-square overflow-hidden sm:aspect-3/2 md:aspect-auto md:h-full ${
        GROUND[media.ground].bg
      }`}
    >
      <Frame
        ratio="bleed"
        treatment="crop"
        mask
        ground={media.ground}
        className="absolute inset-0 [&>div]:h-full"
      >
        {image.src ? (
          /* The picture drifts against its own card as the row passes the
             viewport — down the page it rises, back up it falls, and it is at
             its laid-out position exactly once, when the card is centred.
             That is what makes ten cards read as ten depths rather than as a
             flat grid that happens to scroll.

             It is a layer of its own rather than more movement on `Frame`'s
             crop: the crop is a settle that finishes at scale 1, so by the
             time the card is leaving there is no oversize left to move
             inside. This layer is 118% of the card and hung 9% above it, so
             its own headroom is ~9% of the card's height against 20px of
             travel — the edge is never reachable at any card size this
             section uses. The travel is small on purpose; a card in a row of
             three is not a hero, and a picture that visibly slides inside a
             tile reads as a broken sticky rather than as depth. */
          <Drift
            distance={20}
            className="absolute inset-x-0 top-[-9%] h-[118%]"
            innerClassName="h-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              /* Half the measure is the widest a card in a row of three ever
                 gets — that is its hovered width, not its resting one, and
                 asking for the resting width would fetch a picture that goes
                 soft the moment it is looked at. A card alone on its row is
                 already the full measure. */
              sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover"
              style={{ objectPosition: image.focal }}
            />
          </Drift>
        ) : (
          <Plate variant={media.plate} className="h-full w-full" />
        )}
      </Frame>

      <div className="si-detail pointer-events-none absolute inset-0 text-on-dark">
        <span aria-hidden="true" className="si-scrim absolute inset-0" />

        <div className="si-detail-body absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-7 text-center md:px-8 md:pb-9">
          <p className="font-mono text-meta uppercase text-ember">
            {pad(index + 1)}
            <span className="text-on-dark-muted"> / {pad(total)}</span>
          </p>

          <h3
            id={`intervention-${item.slug}`}
            className="mt-3 font-display text-title font-semibold text-balance"
          >
            {item.name}
          </h3>

          {item.stat && (
            <>
              <p className="mt-3 max-w-md text-body text-on-dark-muted">
                <span className="font-mono font-medium text-on-dark">{item.stat.value}</span>{" "}
                {item.stat.label}
              </p>
              {/* Never dropped: without the period, the figure reads as
                  current rather than as of a stated day. */}
              <p className="mt-2 font-mono text-meta uppercase text-on-dark-muted">
                {item.stat.asOf}
              </p>
            </>
          )}

          {/* Provenance, on the card itself rather than in a colophon nobody
              reads. A drawn plate is not a photograph and is never allowed to
              pass for one; a photograph with no recorded photographer is not
              allowed to pass as cleared. The page already has a mark for a
              stated gap — here it is centred to sit under the figure. */}
          {!image.src ? (
            <p className="mt-4 font-mono text-meta uppercase text-on-dark-muted">
              Image placeholder
            </p>
          ) : image.credit ? (
            <p className="mt-4 font-mono text-meta uppercase text-on-dark-muted">
              Photograph — {image.credit}
              {image.license && ` · ${image.license}`}
            </p>
          ) : (
            <ProvenanceMark
              kind="pending"
              ground="ink"
              note="photographer and licence not yet recorded"
              className="mt-4 justify-center"
            />
          )}
        </div>
      </div>
    </article>
  );
}
