import Link from "next/link";
import { type ReactNode } from "react";

type HoverCardProps = {
  href: string;
  title: string;
  description: string;
  /** Editorial index, e.g. "01". Optional. */
  number?: string;
  image?: ReactNode;
  className?: string;
};

/**
 * Editorial link card: title/description/arrow always visible (not
 * hover-only) with a subtle hover/focus shift. CSS-driven (group-hover /
 * group-focus-visible) so the same transition responds to mouse, keyboard
 * focus and touch taps alike — no JS event wiring needed.
 */
export function HoverCard({ href, title, description, number, image, className = "" }: HoverCardProps) {
  return (
    <Link
      href={href}
      data-cursor={image ? "image" : undefined}
      className={`group block border-t border-ink/10 py-8 focus-visible:outline-2 focus-visible:outline-green motion-reduce:**:transition-none! ${className}`}
    >
      {image && (
        <div className="mb-6 overflow-hidden">
          <div className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
            {image}
          </div>
        </div>
      )}
      <div className="flex items-start justify-between gap-6">
        <div className="flex gap-6">
          {number && <span className="mt-1 text-sm text-muted">{number}</span>}
          <div>
            <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-2xl transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
        >
          →
        </span>
      </div>
    </Link>
  );
}
