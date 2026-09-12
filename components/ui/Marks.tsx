/**
 * The marks.
 *
 * Two kinds of glyph live here and they are not interchangeable.
 *
 * **Brand marks** — `FacebookMark`, `YouTubeMark` — are the platforms' own
 * artwork, drawn from the official path at the official colour. The colour is
 * stated literally rather than taken from a token for exactly that reason: it
 * is not part of this page's palette and must never drift with it. They are
 * never recoloured, never restyled and never redrawn into something that only
 * resembles them, which is why every one of them is placed on a disc of its
 * own ground (`ChannelDisc`, Footer) instead of being tinted to suit whatever
 * it lands on.
 *
 * **Wayfinding glyphs** — `GlobeMark`, `MailMark`, `PhoneMark`, `RocketMark` —
 * are this page's own drawing and are set in `currentColor`, so they inherit
 * the ground they are used on the same way the rest of the type does. They are
 * stroked rather than filled, at a weight that matches the hairline rules the
 * page already draws.
 */

type MarkProps = { className?: string };

/** Stroked glyphs share one weight, one join and one cap. */
const STROKE = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Facebook's own mark — the rounded "f" knocked out of the brand disc, drawn
 * as a single path so the letterform is the hole in the circle rather than a
 * second shape laid on top of it. `#1877F2` is Facebook's brand blue.
 */
export function FacebookMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

/**
 * YouTube's own mark. Two paths rather than one — the body in YouTube red,
 * the play triangle knocked out in white on top of it — so the shape is the
 * official one whatever fill rule the browser applies. `#FF0000` is the brand
 * red, stated literally for the same reason as Facebook's blue.
 */
export function YouTubeMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12z" />
    </svg>
  );
}

/** A published site. A globe, with one meridian and one parallel — enough to
 *  read as a world at 20px, and no more lines than that. */
export function GlobeMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9s1.3-6.4 3.9-9z" />
    </svg>
  );
}

/** A query that is run. The lens is offset up-left so the handle falls on the
 *  optical centre of the box — a centred circle with a tail reads as sitting
 *  high at the 16px the bar uses it at. */
export function SearchMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 21 21" />
    </svg>
  );
}

/** An address that is written to. The envelope is drawn open-flap rather than
 *  sealed, so the diagonal reads as a fold and not as a cross through a box. */
export function MailMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 7.5 12 13.4l8.5-5.9" />
    </svg>
  );
}

/** A number that is dialled. The classic handset, because a modern slab is
 *  indistinguishable from the mail rectangle above it at this size. */
export function PhoneMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...STROKE}>
      <path d="M8.1 3.5H5.3A2.3 2.3 0 0 0 3 5.9c0 8.4 6.7 15.1 15.1 15.1a2.3 2.3 0 0 0 2.4-2.3v-2.8l-4.6-1.5-1.9 2.3a14.6 14.6 0 0 1-6.2-6.2l2.3-1.9z" />
    </svg>
  );
}

/**
 * The way back up.
 *
 * A rocket, drawn as a filled ogive with the porthole knocked out in the
 * ground's own colour rather than in white — the same trick the hero's lockup
 * needed, for the same reason: a white hole in a cream glyph on a green ground
 * is a third colour nobody chose. `hole` is that ground.
 *
 * The exhaust is a separate path with its own class so the footer can grow it
 * on hover without touching the body. It is drawn but scaled to nothing at
 * rest, so there is no layout shift when it fires and no second element to
 * keep in sync.
 */
export function RocketMark({
  className = "",
  hole = "var(--forest)",
}: MarkProps & { hole?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true" className={className}>
      {/* Exhaust. Two paths on one origin at the nozzle exit, so both grow
          downward out of it together: the gold plume, and a paper-coloured
          core inside it. The core is what makes the flame read — a single
          gold wedge eleven pixels tall is 4.7:1 on forest and at that size it
          registers as a smudge rather than as fire. */}
      <g className="rocket-flame origin-[12px_24px] transition-transform duration-300 ease-[var(--ease-editorial)] motion-reduce:transition-none">
        <path fill="var(--gold)" d="M8.9 23.7 12 32l3.1-8.3z" />
        <path fill="var(--paper)" d="M10.5 23.7 12 28.6l1.5-4.9z" />
      </g>
      {/* Fins. Swept rather than straight, and carried well clear of the body
          — a thin sliver beside the hull disappears at the size this is
          actually used (40px in the footer's disc), and without fins the
          ogive reads as a bell. At three quarters so the body still reads as
          the solid part. */}
      <path
        fill="currentColor"
        fillOpacity="0.75"
        d="M6.6 14.4C3.6 17.4 2 20.6 1.6 24.2l5-2.4zm10.8 0c3 3 4.6 6.2 5 9.8l-5-2.4z"
      />
      {/* Body. */}
      <path
        fill="currentColor"
        d="M12 1.2c4 4.9 6 10.3 6 16.2v4.4H6v-4.4c0-5.9 2-11.3 6-16.2z"
      />
      {/* The nozzle, so the hull does not end on a flat cut. */}
      <path fill="currentColor" fillOpacity="0.75" d="M8.4 21.8h7.2l-1.1 2.6H9.5z" />
      <circle cx="12" cy="11" r="2.7" fill={hole} />
    </svg>
  );
}
