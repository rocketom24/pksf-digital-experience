import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 px-6 py-3 focus-visible:outline-2 focus-visible:outline-current disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-background hover:bg-green-deep",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink",
  ghost: "bg-transparent text-ink hover:text-green",
};

/** Same variants restyled for ink / deep-green sections. */
const inverseVariants: Record<Variant, string> = {
  primary: "bg-background text-ink hover:bg-green-soft",
  secondary: "bg-transparent text-background border border-background/40 hover:border-background",
  ghost: "bg-transparent text-background hover:text-green-soft",
};

type CommonProps = { variant?: Variant; inverse?: boolean; className?: string };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button({ variant = "primary", inverse = false, className = "", ...props }: ButtonAsLink | ButtonAsButton) {
  const classes = `${base} ${(inverse ? inverseVariants : variants)[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {props.children}
    </button>
  );
}
