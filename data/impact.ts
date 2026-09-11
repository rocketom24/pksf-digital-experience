/**
 * PKSF at a glance.
 *
 * Every figure is published by PKSF and carries the reporting date it was
 * published against. Nothing here is rounded, estimated or combined across
 * reporting periods — a statistic without its date is not a statistic.
 */
export type ImpactMetric = {
  slug: string;
  /** The figure as it should read on screen. Kept as a string: these are
   *  published to a fixed precision and re-deriving them loses that. */
  value: string;
  label: string;
  /** One line saying what the figure counts. */
  note?: string;
  asOf: string;
  source: string;
};

const AS_OF = "30 April 2026";
const SOURCE = "PKSF — At a Glance";

/** The two figures the page leads with. */
export const headlineMetrics: ImpactMetric[] = [
  {
    slug: "organised-members",
    value: "21.90",
    label: "Million organised members",
    note: "93.61% of them are women.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "po-member-loan-outstanding",
    value: "987.12",
    label: "Billion BDT outstanding to members",
    note: "Lent by Partner Organisations to their members, not by PKSF directly.",
    asOf: AS_OF,
    source: SOURCE,
  },
];

/** The supporting ledger, read as a list. */
export const impactMetrics: ImpactMetric[] = [
  {
    slug: "borrowers",
    value: "16.70 million",
    label: "Borrowers",
    note: "15.70 million of them women.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "partner-organisations",
    value: "200+",
    label: "Partner Organisations",
    note: "Operating roughly 17,000 branch offices.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "districts",
    value: "64 districts",
    label: "Geographic coverage",
    note: "490 upazilas and 13 city corporations.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "member-savings",
    value: "BDT 407.38 billion",
    label: "Member savings",
    note: "Saved by members with Partner Organisations.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "pksf-po-loan-outstanding",
    value: "BDT 154.99 billion",
    label: "PKSF–PO loan outstanding",
    note: "What PKSF itself has out to the network.",
    asOf: AS_OF,
    source: SOURCE,
  },
  {
    slug: "cumulative-disbursement",
    value: "BDT 10.59 trillion",
    label: "Cumulative disbursement",
    note: "Since inception in 1989.",
    asOf: AS_OF,
    source: SOURCE,
  },
];
