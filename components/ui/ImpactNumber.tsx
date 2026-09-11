import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

type ImpactNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
};

/**
 * Editorial statistic block: big count-up figure with a label and optional
 * supporting line. Wraps `AnimatedNumber` — never invent the `value` here,
 * source it from verified data (see data/impact.ts).
 */
export function ImpactNumber({ value, prefix = "", suffix = "", label, description, className = "" }: ImpactNumberProps) {
  return (
    <div className={className}>
      <AnimatedNumber value={value} prefix={prefix} suffix={suffix} className="font-display text-editorial" />
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-ink">{label}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}
