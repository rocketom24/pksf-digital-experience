import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { GROUND_VARS, type Ground } from "@/components/editorial/grounds";

type Variant = "line" | "solid";

type CommonProps = {
  /** `line` is the editorial default — a label over a rule that draws on hover. */
  variant?: Variant;
  /** Only needed by `solid`, which has to know what colour to punch out of. */
  ground?: Ground;
  className?: string;
};

type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const BASE =
  "group relative inline-flex items-center gap-3 font-display text-body font-medium disabled:pointer-events-none disabled:opacity-50";

/**
 * Two shapes of action, and no third.
 *
 * `line` is the one the page uses almost everywhere: a label with a rule
 * under it that runs out to full width on hover. It is built entirely from
 * `currentColor`, so it inherits whatever ground it lands on and never needs
 * a per-theme variant — which is what made the old `inverse` flag necessary
 * and easy to forget.
 *
 * `solid` is a real pill, kept for the few controls that have to look like
 * controls. It is the only one that needs to know its ground, because it
 * punches the ground colour out of a block of the text colour.
 */
export function Button({
  variant = "line",
  ground = "parchment",
  className = "",
  ...props
}: AsLink | AsButton) {
  const solid = variant === "solid";
  const classes = `${BASE} ${
    solid ? "rounded-full px-6 py-3" : "pb-2"
  } ${className}`;

  const style = solid ? { backgroundColor: "currentColor" } : undefined;

  const inner = (
    <>
      <span className={solid ? "relative" : ""} style={solid ? { color: GROUND_VARS[ground].bg } : undefined}>
        {props.children}
      </span>
      <span
        aria-hidden="true"
        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none ${
          solid ? "relative" : ""
        }`}
        style={solid ? { color: GROUND_VARS[ground].bg } : undefined}
      >
        →
      </span>
      {!solid && (
        <>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          />
        </>
      )}
    </>
  );

  if ("href" in props && props.href) {
    // `children` is rendered through `inner`, so it must not also be spread
    // onto the element.
    const { href, children, ...rest } = props as AsLink;
    void children;
    return (
      <Link href={href} className={classes} style={style} data-cursor="interactive" {...rest}>
        {inner}
      </Link>
    );
  }

  const { type = "button", children, ...rest } = props as AsButton;
  void children;
  return (
    <button type={type} className={classes} style={style} data-cursor="interactive" {...rest}>
      {inner}
    </button>
  );
}
