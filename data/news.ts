export type NewsItem = {
  slug: string;
  title: string;
  /** ISO date, so the list can be ordered without parsing prose. */
  date: string;
  /** How the date should read on screen. */
  displayDate: string;
  summary: string;
  url: string;
  source: string;
};

/**
 * A short, dated selection from PKSF's own News Center — newest first.
 *
 * Deliberately a handful rather than a feed: an unofficial concept has no
 * business mirroring an institution's newsroom, and every item here is one
 * PKSF issued itself.
 */
export const news: NewsItem[] = [
  {
    slug: "green-project-launch",
    title:
      "PKSF launches GREEN project to scale up climate-resilient initiatives",
    date: "2026-07-30",
    displayDate: "30 July 2026",
    summary:
      "A USD 211.7 million project with IFAD, reaching over 258,000 families in the haor, coastal, Barind and char regions between 2026 and 2031.",
    url: "https://pksf.org.bd/pksf-launches-green-project-to-scale-up-climate-resilient-initiatives-benefiting-over-250000-households/",
    source: "PKSF — News Center",
  },
  {
    slug: "pksf-barc-agricultural-growth",
    title: "PKSF and BARC to work jointly on inclusive agricultural growth",
    date: "2026-02-03",
    displayDate: "3 February 2026",
    summary:
      "An agreement with the Bangladesh Agricultural Research Council on technology transfer and inclusive growth in agriculture.",
    url: "https://pksf.org.bd/news-center/",
    source: "PKSF — News Center",
  },
  {
    slug: "skills-training-12000-youth",
    title: "PKSF to provide free skill training to 12,000 low-income youth",
    date: "2025-07-29",
    displayDate: "29 July 2025",
    summary:
      "Technical and vocational training for low-income young people, delivered through Partner Organisations.",
    url: "https://pksf.org.bd/pksf-to-provide-free-skill-training-to-12000-low-income-youth/",
    source: "PKSF — News Center",
  },
];
