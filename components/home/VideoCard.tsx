import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { Meta } from "@/components/editorial/SectionHead";
import { PointerParallax } from "@/components/motion/PointerParallax";
import { thumbnailUrl, watchUrl, type Video } from "@/data/videos";

type VideoCardProps = {
  video: Video;
  /** Leads the section: full measure, display-size title, larger play mark. */
  featured?: boolean;
  /** Zero-based position, printed as the card's index. */
  index: number;
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The official YouTube mark.
 *
 * Drawn as two paths rather than one — the body in YouTube red, the play
 * triangle knocked out in white on top of it — so the shape is the official
 * one at any fill rule the browser applies. It is never recoloured, never
 * restyled and never redrawn into something that only resembles it.
 *
 * `#FF0000` is the brand red and is stated literally for that reason: it is
 * not part of this page's palette and must not drift with it.
 */
function YouTubeMark({ className = "" }: { className?: string }) {
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

/**
 * The play affordance.
 *
 * A right-pointing wedge on a disc, which is the one shape a reader already
 * knows means "this is a film". It carries its own ground rather than relying
 * on a scrim across the picture: three of these four thumbnails are PKSF's
 * own artwork with type and a logotype printed into them, and a gradient laid
 * over the foot of the frame would cover the logotype up.
 *
 * Under the pointer the ring opens and the wedge settles forward — the whole
 * movement is about two pixels, which is the point.
 */
function PlayMark({ featured = false }: { featured?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex items-center justify-center`}
    >
      <span
        className={`flex items-center justify-center rounded-full border bg-ink/45 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-editorial)] border-on-dark/45 group-hover:border-on-dark/85 group-hover:bg-ink/60 motion-safe:group-hover:scale-105 ${
          featured
            ? "size-[clamp(3.75rem,7.5vw,6.75rem)]"
            : /* A third of a tablet measure is a 250px card. A mark sized off
                 the viewport rather than off the card fills 40% of it there,
                 and lands on top of the YouTube badge. */
              "size-[clamp(2.25rem,5vw,3.25rem)]"
        }`}
      >
        <svg
          viewBox="0 0 12 14"
          fill="currentColor"
          className={`ml-[0.12em] text-on-dark transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:translate-x-[0.06em] ${
            featured ? "w-[26%]" : "w-[28%]"
          }`}
        >
          <path d="M0 0.7 L12 7 L0 13.3 Z" />
        </svg>
      </span>
    </span>
  );
}

/**
 * One PKSF video, as a card that opens the real thing on YouTube.
 *
 * There is no embed. A YouTube iframe is roughly a megabyte of third-party
 * script per video and would have loaded four of them into a page that is
 * otherwise static — so the card is the video's own thumbnail at full
 * resolution, and the click goes to the video on YouTube. Nothing about the
 * page's weight depends on how many videos the section grows to hold.
 *
 * The whole card is one link, so it is one stop for a keyboard reader and the
 * title is its accessible name. The thumbnail is never cropped: three of the
 * four are letterboxed inside their 16:9 file and carry PKSF's own Bangla
 * logotype along the foot, and the crop settle used elsewhere on this page
 * would take it off the frame. Under the pointer the picture moves — barely,
 * and only where there is a pointer that can hover and no reduced-motion
 * request.
 */
export function VideoCard({ video, featured = false, index, total }: VideoCardProps) {
  return (
    <article className="group">
      <a
        href={watchUrl(video.id)}
        target="_blank"
        rel="noreferrer"
        data-cursor="view"
        className="block"
      >
        <div className="relative overflow-hidden rounded-lg bg-ink">
          <Frame
            ratio="wide"
            /* `plain`, not `crop`. See the note on PlayMark: these files carry
               their own printed type and a logotype strip, and scaling them
               1.12 pushes both off their own edges. */
            treatment="plain"
            mask
            ground="ink"
            plate="delta"
          >
            {featured ? (
              /* The featured frame drifts under the pointer — it is the one
                 picture on the page big enough for the movement to be worth
                 having, and the one the section is built around. `absolute
                 inset-0` because `<Image fill>` needs a positioned box the
                 size of the frame, and the parallax wrapper is now that box. */
              <PointerParallax className="absolute inset-0">
                <Image
                  src={thumbnailUrl(video.id)}
                  alt={video.alt}
                  fill
                  sizes="(min-width: 1440px) 1344px, 100vw"
                  className="object-cover"
                  /* Not `priority`. The section sits some fifteen thousand
                     pixels down the page, and preloading its picture only
                     competes with the hero photograph for the first
                     connections — the browser logs it as preloaded and
                     unused. */
                />
              </PointerParallax>
            ) : (
              <Image
                src={thumbnailUrl(video.id)}
                alt={video.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                /* The small cards do not track the pointer: three frames
                   drifting independently in one row is three things moving
                   where one would do. They take a scale and a hair of rise
                   instead — the rise is upward, so the crop it costs comes off
                   the top of the file rather than off the logotype at its
                   foot. */
                className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] motion-safe:group-hover:-translate-y-[0.6%] motion-safe:group-hover:scale-[1.035]"
              />
            )}
          </Frame>

          {/* Small, opaque, and carrying its own ground — the thumbnails run
              from a black letterbox bar to a white logotype strip, and nothing
              laid over them can rely on what is underneath. */}
          <span
            /* Branding, not content. The link already ends with "watch on
               YouTube", so reading the wordmark as well would open every one
               of these links with the same word. */
            aria-hidden="true"
            className={`pointer-events-none absolute flex items-center gap-2 rounded-full bg-ink/85 py-1.5 ${
              featured ? "left-4 top-4 pl-3 pr-3.5 md:left-6 md:top-6" : "left-3 top-3 pl-2.5 pr-3"
            }`}
          >
            <YouTubeMark className={featured ? "size-4 shrink-0" : "size-3 shrink-0"} />
            <span
              className={`font-display font-semibold leading-none tracking-tight text-on-dark ${
                featured ? "text-sm" : "text-xs"
              }`}
            >
              YouTube
            </span>
          </span>

          <PlayMark featured={featured} />
        </div>

        <div className={featured ? "mt-8 max-w-4xl md:mt-10" : "mt-6"}>
          <Meta ground="ink">
            <span className="text-ember">{pad(index + 1)}</span> / {pad(total)} —{" "}
            {featured ? "Featured" : "Also on the channel"}
          </Meta>

          <h3
            className={`mt-4 font-display font-semibold text-balance ${
              featured ? "text-headline" : "text-lg leading-snug"
            }`}
          >
            {video.title}
          </h3>

          {/* PKSF publishes in Bangla and in English, and this page is set in
              English throughout. The Bangla line is here so the section is not
              the one place on the site where the institution's own language is
              missing. `lang` is on the element, not assumed from the script,
              so a screen reader switches voice for it. */}
          <p
            lang="bn"
            /* The display face is set at a 0.98 line-height, so a descender on
               the last line of the title reaches into whatever follows it.
               The featured title is set large enough for that to matter. */
            className={`font-bangla text-on-dark-muted ${
              featured ? "mt-6 text-lead" : "mt-3 text-base leading-relaxed"
            }`}
          >
            {video.bangla}
          </p>

          {video.banglaSource === "pksf" && (
            <p className="mt-2">
              <Meta ground="ink">PKSF&rsquo;s own Bangla title</Meta>
            </p>
          )}

          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-meta uppercase text-on-dark-muted">
            <time dateTime={video.publishedISO}>{video.published}</time>
            <span aria-hidden="true">·</span>
            <span>
              <span className="sr-only">Running time </span>
              {video.duration}
            </span>
          </p>
        </div>

        {/* The link opens a new tab and leaves this site. Said once, in the
            link itself, rather than left for the reader to discover. */}
        <span className="sr-only">
          {" "}
          — watch on YouTube, opens in a new tab
        </span>
      </a>
    </article>
  );
}
