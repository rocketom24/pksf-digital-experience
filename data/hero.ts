/**
 * The hero photograph, and the one figure the opening carries.
 *
 * The image is not PKSF's. It is a freely licensed documentary photograph of
 * rural Bangladesh, and the licence is a share-alike one — so the credit is
 * not optional and is rendered on the page rather than buried in a comment.
 * Nothing here is inferred: the photographer, title, date and licence are the
 * fields Wikimedia Commons publishes against the file, transcribed as-is.
 */
export type HeroImage = {
  src: string;
  /** Required. Describes the photograph, not the composition. */
  alt: string;
  /** Shown on the page — what the picture is. */
  caption: string;
  /** Where the file came from. */
  source: string;
  sourceUrl: string;
  credit: string;
  license: string;
  licenseUrl: string;
  /** As published by the photographer. */
  taken: string;
};

export const heroImage: HeroImage = {
  src: "/images/hero/mustard-field-farmer.jpg",
  alt: "An older Bangladeshi farmer in a striped lungi and a red checked gamchha stands smiling at the edge of his mustard field, the flowering crop stretching to the horizon behind him.",
  caption: "A farmer at his mustard field on a winter morning, Bangladesh",
  source: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:A_smiling_farmer_on_a_winter_morning.jpg",
  credit: "Sanvi Ahmed Saim",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  taken: "23 December 2023",
};

/**
 * The scale of the network, as three figures.
 *
 * A visitor who reads nothing else on this page should still leave knowing
 * how big PKSF's reach is and that it is carried by someone else. A
 * paragraph says that slowly; three figures say it in a glance, which is all
 * a hero gets. The figure leads and the words follow it — the reverse of
 * how the ledger further down the page is set, because there the reader has
 * already decided to read.
 *
 * Every value here is published by PKSF against the reporting date in
 * `heroAsOf` and matches `relay` and `impactMetrics`. The one-line notes are
 * this page's wording, not PKSF's.
 */
export type HeroFact = {
  value: string;
  label: string;
  /** One short line. What the figure actually counts. */
  note: string;
};

export const heroFacts: HeroFact[] = [
  {
    value: "200+",
    label: "Partner Organisations",
    note: "They deliver, not PKSF.",
  },
  {
    value: "21.90M",
    label: "Organised members",
    note: "93.61% of them women.",
  },
  {
    value: "64",
    label: "Districts",
    note: "Every district, nationwide.",
  },
];

/** The reporting date the figures above are published against. */
export const heroAsOf = "30 April 2026";
