import { PRIMARY_NAV } from "@/components/navigation/links";
import { impactMetrics } from "@/data/impact";
import { interventions } from "@/data/interventions";
import { news } from "@/data/news";
import { programs } from "@/data/programs";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { stories } from "@/data/stories";
import { leadership } from "@/data/team";
import { videos, watchUrl } from "@/data/videos";

export type SearchKind =
  | "Section"
  | "Intervention"
  | "Project"
  | "Programme"
  | "Publication"
  | "News"
  | "Story"
  | "Film"
  | "Leadership"
  | "Figure";

export type SearchEntry = {
  id: string;
  kind: SearchKind;
  title: string;
  /** One line under the title. PKSF's own words wherever the data holds them. */
  gloss: string;
  href: string;
  /** Leaves the site — rendered as an outbound link, not a `next/link`. */
  external?: boolean;
  /** Lowercased text the query is matched against. Never displayed. */
  haystack: string;
};

/**
 * First sentence, or the first `max` characters — whichever ends sooner. A cut
 * at a full stop is a finished sentence and takes no ellipsis; only a cut in
 * the middle of one does.
 */
const trim = (text: string, max = 150) => {
  const stop = text.indexOf(". ");
  if (stop > 40 && stop < max) return text.slice(0, stop + 1);
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
};

const entry = (e: Omit<SearchEntry, "haystack"> & { extra?: string }): SearchEntry => ({
  ...e,
  haystack: `${e.title} ${e.gloss} ${e.kind} ${e.extra ?? ""}`.toLowerCase(),
});

/**
 * Everything the bar's search can find, built from the data files the page is
 * already rendering from — so a result can never point at something that is
 * not on the page or published by PKSF.
 *
 * Deliberately excluded: the 349-row staff register. It is already searchable
 * in its own section, and a navigation search that answers every query with
 * fifty names is a directory, not a way in. The five leaders are here; the
 * register is reachable as a section.
 *
 * Entries that PKSF publishes a file or a page for — publications, releases,
 * films, and the projects that have their own project page — point at the
 * institution's own URL. Everything else points at the section of this page
 * that holds it.
 */
export const SEARCH_INDEX: SearchEntry[] = [
  // The navigation's own destinations, so the panel can answer "where is X"
  // with the same words the bar uses.
  ...PRIMARY_NAV.flatMap((item) =>
    (item.children ?? [{ label: item.label, href: item.href, gloss: item.blurb ?? "" }]).map(
      (child) =>
        entry({
          id: `section:${child.href}`,
          kind: "Section",
          title: child.label,
          gloss: child.gloss,
          href: child.href,
          extra: item.label,
        })
    )
  ),

  ...interventions.map((item) =>
    entry({
      id: `intervention:${item.slug}`,
      kind: "Intervention",
      title: item.name,
      gloss: trim(item.description),
      href: "/#interventions",
      extra: `${item.examples?.join(" ") ?? ""} ${item.stat?.label ?? ""}`,
    })
  ),

  ...projects.map((item) =>
    entry({
      id: `project:${item.slug}`,
      kind: "Project",
      title: item.name,
      gloss: trim(item.fullName),
      href: item.href ?? "/#projects",
      external: Boolean(item.href),
      extra: `${item.summary} ${item.status} ${item.partners?.join(" ") ?? ""} ${
        item.targetGroup ?? ""
      }`,
    })
  ),

  ...programs.map((item) =>
    entry({
      id: `programme:${item.slug}`,
      kind: "Programme",
      title: item.name,
      gloss: trim(item.fullName ?? item.summary),
      href: "/#programs",
      extra: item.summary,
    })
  ),

  ...publications.map((item) =>
    entry({
      id: `publication:${item.slug}`,
      kind: "Publication",
      title: item.title,
      gloss: `${item.type} — ${item.year}`,
      href: item.url,
      external: true,
      extra: item.note ?? "",
    })
  ),

  ...news.map((item) =>
    entry({
      id: `news:${item.slug}`,
      kind: "News",
      title: item.title,
      gloss: `${item.displayDate} — ${trim(item.summary, 110)}`,
      href: item.url,
      external: true,
      extra: item.summary,
    })
  ),

  ...stories.map((item) =>
    entry({
      id: `story:${item.slug}`,
      kind: "Story",
      title: item.name,
      gloss: `${item.location} — ${trim(item.summary, 110)}`,
      href: "/#story",
      extra: item.summary,
    })
  ),

  ...videos.map((item) =>
    entry({
      id: `film:${item.id}`,
      kind: "Film",
      title: item.title,
      gloss: `${item.duration} — published ${item.published}`,
      href: watchUrl(item.id),
      external: true,
      extra: item.bangla,
    })
  ),

  ...leadership.map((item) =>
    entry({
      id: `leader:${item.name}`,
      kind: "Leadership",
      title: item.name,
      gloss: item.title,
      href: "/#team",
      extra: item.education.join(" "),
    })
  ),

  ...impactMetrics.map((item) =>
    entry({
      id: `figure:${item.slug}`,
      kind: "Figure",
      title: `${item.value} — ${item.label}`,
      gloss: `As of ${item.asOf}${item.note ? ` — ${item.note}` : ""}`,
      href: "/#ledger",
      extra: item.source,
    })
  ),
];

/**
 * Every token has to appear somewhere in the entry — an AND match, so typing a
 * second word narrows instead of widening. A hit in the title outranks a hit in
 * the body, and a title that starts with the query outranks one that merely
 * contains it, which is what puts "Projects" above a project whose summary
 * mentions the word.
 */
export function searchSite(query: string, limit = 24): SearchEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const item of SEARCH_INDEX) {
    const title = item.title.toLowerCase();
    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      if (title.startsWith(token)) score += 6;
      else if (title.includes(token)) score += 4;
      else if (item.haystack.includes(token)) score += 1;
      else {
        matchedAll = false;
        break;
      }
    }

    if (!matchedAll) continue;
    // A section is a place on the page; with equal relevance it is the more
    // useful answer than one row inside it.
    if (item.kind === "Section") score += 2;
    scored.push({ entry: item, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((hit) => hit.entry);
}
