export type ImpactMetric = {
  slug: string;
  label: string;
  /** null until a figure is verified against an official PKSF source. */
  value: number | null;
  unit?: string;
  asOf?: string;
};

// TODO: populate values from an official, dated PKSF source.
// Never invent or estimate a figure — leave `value: null` until verified.
export const impactMetrics: ImpactMetric[] = [
  { slug: "partner-organisations", label: "Partner Organisations", value: null },
  { slug: "beneficiaries-reached", label: "Beneficiaries reached", value: null },
  { slug: "districts-covered", label: "Districts covered", value: null },
  { slug: "cumulative-disbursement", label: "Cumulative disbursement", value: null, unit: "BDT" },
];
