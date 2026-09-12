import Image from "next/image";
import { Frame } from "@/components/editorial/Frame";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { PointerParallax } from "@/components/motion/PointerParallax";
import type { Leader } from "@/data/team";

type LeaderCardProps = {
  leader: Leader;
  /** Leads the section: the portrait runs to half the measure and drifts. */
  featured?: boolean;
  /** Zero-based position in the management tier. */
  index: number;
  total: number;
  ground?: Ground;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One member of the management tier.
 *
 * Everything printed here is on PKSF's own register and nothing else is:
 * the photograph PKSF publishes, the name as PKSF spells it, the designation
 * verbatim, and the qualification lines PKSF prints beside them. There is no
 * biography, no tenure, no "what they bring to the work" — PKSF publishes
 * none of that, and a team section is exactly where a page like this would be
 * tempted to write some.
 *
 * The portrait is a `Frame`, so it opens from its own scroll-driven mask like
 * every other picture on the page. The featured portrait additionally drifts
 * under the pointer; the four beside it do not, for the same reason the small
 * video cards do not — four frames tracking one hand is three too many.
 *
 * The hover is two things and stops there: the picture takes a small scale,
 * and the rule under the name draws out from the left. Both are pure CSS off
 * the card's own `group`, both are `motion-safe`, and neither carries
 * information — the card is complete without either having run.
 */
export function LeaderCard({
  leader,
  featured = false,
  index,
  total,
  ground = "paper",
}: LeaderCardProps) {
  const g = GROUND[ground];

  const portrait = (
    <div className="relative overflow-hidden rounded-lg">
      <Frame
        ratio="portrait"
        /* `crop`, not `plain`: these are headshots with room at every edge, so
           the settle costs nothing that is being read. The published files are
           roughly 2:3, so the 3:4 frame is already cropping them — doing it
           through the frame rather than with a fixed height keeps all five
           portraits on one baseline whatever PKSF re-uploads. */
        treatment="crop"
        mask
        ground={ground}
        plate="delta"
      >
        <Image
          src={leader.photo}
          alt={leader.name}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 40vw, 100vw"
              : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          }
          /* Top-weighted: PKSF's files are full-length-ish portraits and a
             centred 3:4 crop takes the chin off several of them. */
          className="object-cover object-[center_22%] transition-transform duration-700 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-[1.04]"
        />
      </Frame>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ${
          g.dark ? "ring-on-dark/20" : "ring-on-light/12"
        }`}
      />
    </div>
  );

  return (
    <article className="group flex flex-col">
      {featured ? (
        /* `PointerParallax` is the positioned box the frame lives in, so the
           drift moves the whole frame rather than the picture inside a frame
           that stays put — the mask would clip it back into place. */
        <PointerParallax travel={6} scale={1.02}>
          {portrait}
        </PointerParallax>
      ) : (
        portrait
      )}

      <div className={featured ? "mt-9 md:mt-11" : "mt-7"}>
        <Meta ground={ground}>
          <span className={g.accent}>{pad(index + 1)}</span> / {pad(total)}
        </Meta>

        <h3
          className={`mt-4 font-display font-semibold text-balance ${
            featured ? "text-headline" : "text-title"
          }`}
        >
          {/* The rule is on the name, not on the card: it is the one line of
              this card a reader is looking for, and the hover points at it. */}
          <span className="relative inline-block">
            {leader.name}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-editorial)] motion-safe:group-hover:scale-x-100 ${
                g.dark ? "bg-on-dark/50" : "bg-on-light/40"
              }`}
            />
          </span>
        </h3>

        <p className={`mt-5 font-mono text-meta uppercase ${g.accent}`}>{leader.title}</p>

        {/* PKSF prints these lines beside the name in its own register. They
            are set as the list they are rather than run together into a
            sentence, because joining them would be writing. */}
        <ul className={`mt-6 flex flex-col gap-1.5 ${featured ? "max-w-md" : ""}`}>
          {leader.education.map((line) => (
            <li key={line} className={`text-body leading-snug ${g.muted}`}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
