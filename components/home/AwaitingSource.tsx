import { ProvenanceMark } from "@/components/home/ProvenanceMark";

type AwaitingSourceProps = {
  id?: string;
  /** Editorial index — these are a numbered set of outstanding sections. */
  index: string;
  title: string;
  /** What this section will hold once the data exists. */
  what: string;
  /** What has to be verified before anything ships here. */
  needs: string;
  tone?: "light" | "dark";
  className?: string;
};

const TONE = {
  light: { rule: "border-ink/15", body: "text-ink/70", index: "text-ink/40" },
  dark: { rule: "border-background/20", body: "text-background/70", index: "text-background/40" },
} as const;

/**
 * Honest empty state for the homepage sections whose data files are still
 * empty (stories, programs, projects, publications, news). Inventing
 * entries is ruled out by the brief, so the section states what belongs
 * here and what source is required instead of rendering placeholder facts.
 */
export function AwaitingSource({
  id,
  index,
  title,
  what,
  needs,
  tone = "light",
  className = "",
}: AwaitingSourceProps) {
  const cls = TONE[tone];

  return (
    <div id={id} className={`scroll-mt-28 border-t pt-6 ${cls.rule} ${className}`}>
      <span className={`block text-xs font-medium tracking-[0.2em] ${cls.index}`}>{index}</span>
      <h3 className="mt-5 font-display text-2xl md:text-3xl">{title}</h3>
      <p className={`mt-4 text-base ${cls.body}`}>{what}</p>
      <ProvenanceMark kind="pending" tone={tone} note={needs} className="mt-6" />
    </div>
  );
}
