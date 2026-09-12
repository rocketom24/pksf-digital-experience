import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { PointerParallax } from "@/components/motion/PointerParallax";
import type { NewsItem } from "@/data/news";

/**
 * Three weights, and no fourth.
 *
 * `lead` runs at the full measure and is the only card that drifts under the
 * pointer. `major` is a half-measure card at 3:2 — a different ratio from
 * everything around it, which is what stops the section reading as a grid.
 * `minor` is a third-measure card back at 16:9.
 */
type Size = "lead" | "major" | "minor";

type NewsCardProps = {
  item: NewsItem;
  size?: Size;
  /** Zero-based position, printed as the card's index. */
  index: number;
  total: number;
  ground?: Ground;
};

const pad = (n: number) => String(n).padStart(2, "0");

const RATIO = { lead: "wide", major: "photo", minor: "wide" } as const;

const HEADLINE: Record<Size, string> = {
  lead: "text-headline",
  major: "text-title",
  minor: "text-xl leading-tight md:text-2xl",
};

const SIZES: Record<Size, string> = {
  lead: "(min-width: 1440px) 1344px, 100vw",
  major: "(min-width: 1024px) 50vw, 100vw",
  minor: "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
};

/**
 * One PKSF release, as an editorial card.
 *
 * Everything on it is PKSF's: the headline verbatim, the date the release
 * carries, PKSF's own opening paragraph cut at a sentence, and the photograph
 * PKSF published with it. Nothing is summarised and no category has been
 * invented to sort it under — PKSF files these releases under nothing but a
 * date, so the date is the only label the card gets.
 *
 * ── What moves, and what it is for ────────────────────────────────────────
 * The frame opens from its own scroll-driven mask, so a card is never blank
 * because an intersection observer did not fire. Under the pointer the
 * picture takes a small scale, the rule under the headline draws out from the
 * left, and the read affordance steps right. The `lead` card additionally
 * drifts under the pointer. All of it is `motion-safe`, all of it is off the
 * card's own `group`, and none of it carries information: the card is
 * complete and readable with none of it having run.
 *
 * The whole card is one link, so it is one stop for a keyboard reader and the
 * headline is its accessible name. That is also why the read affordance is a
 * `span` rather than a `Button` — a second anchor inside this one would be
 * invalid markup and would break hydration.
 */
export function NewsCard({ item, size = "minor", index, total, ground = "ink" }: NewsCardProps) {
  const g = GROUND[ground];
  const lead = size === "lead";

  const picture = (
    <Image
      src={item.image.src}
      alt={item.image.alt}
      fill
      sizes={SIZES[size]}
      /* These are wide ceremony photographs where the subject is a line of
         people across the middle of the frame, so a centred crop is the right
         one and the hover scale costs nothing that is being read. Not
         `priority`: the section sits far enough down the page that preloading
         it only competes with the hero photograph. */
      className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-[1.04]"
    />
  );

  const frame = (
    <div className="relative overflow-hidden rounded-lg bg-ink">
      <Frame
        ratio={RATIO[size]}
        /* `crop` on the smaller cards: the scroll settle is what gives a row
           of them its movement. The lead frame takes `plain` instead, because
           it already drifts under the pointer and two transforms on one
           picture read as a wobble rather than as a camera. */
        treatment={lead ? "plain" : "crop"}
        mask
        ground={ground}
        plate="delta"
      >
        {lead ? (
          /* `absolute inset-0` because `<Image fill>` needs a positioned box
             the size of the frame, and the parallax wrapper is now that box. */
          <PointerParallax className="absolute inset-0">{picture}</PointerParallax>
        ) : (
          picture
        )}
      </Frame>

      {/* The pictures run from a red stage curtain to a white office wall, so
          the card's own edge cannot be left to whatever is at the edge of the
          file. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ${
          g.dark ? "ring-on-dark/20" : "ring-on-light/12"
        }`}
      />

      {/* The date, on the picture. Small, opaque, carrying its own ground —
          nothing laid over these files can rely on what is underneath. It is
          `aria-hidden` because the same date is set under the headline, where
          it is a real `<time>`. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full bg-ink/85 font-mono text-meta uppercase text-on-dark ${
          lead ? "left-4 top-4 px-3.5 py-1.5 md:left-6 md:top-6" : "left-3 top-3 px-3 py-1"
        }`}
      >
        {item.displayDate}
      </span>
    </div>
  );

  return (
    <article className="group flex flex-col">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="view"
        className="block"
      >
        {frame}

        <div className={lead ? "mt-8 max-w-4xl md:mt-10" : "mt-6"}>
          <Meta ground={ground}>
            <span className={g.accent}>{pad(index + 1)}</span> / {pad(total)} —{" "}
            <time dateTime={item.date}>{item.displayDate}</time>
          </Meta>

          <h3 className={`mt-4 font-display font-semibold text-balance ${HEADLINE[size]}`}>
            {/* The rule is on the headline, not on the card: it is the one
                line a reader is here for, and the hover points at it. */}
            <span className="relative inline">
              {item.title}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-x-100 ${
                  g.dark ? "bg-on-dark/50" : "bg-on-light/40"
                }`}
              />
            </span>
          </h3>

          {/* PKSF's own opening. Clamped on the two smaller weights so a row
              of cards keeps one baseline — the full paragraph is one click
              away, and cutting it here would be editing a release. */}
          <p
            className={`${g.muted} ${
              lead ? "mt-6 text-lead" : size === "major" ? "mt-5 text-body" : "mt-4 text-body line-clamp-3"
            }`}
          >
            {item.summary}
          </p>

          <span
            aria-hidden="true"
            className={`relative mt-7 inline-flex items-center gap-3 pb-2 font-display text-body font-medium ${g.text}`}
          >
            Read on pksf.org.bd
            <span className="transition-transform duration-300 ease-[var(--ease-editorial)] motion-safe:group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-x-100" />
          </span>
        </div>

        {/* The link leaves this site and opens a new tab. Said once, inside
            the link, rather than left for the reader to find out. */}
        <span className="sr-only"> — read the full release on pksf.org.bd, opens in a new tab</span>
      </a>
    </article>
  );
}
