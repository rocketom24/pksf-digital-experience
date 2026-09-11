/**
 * The institution, as PKSF publishes it.
 *
 * Every string here is taken from an official PKSF page and carries the page
 * it came from. The mission and vision are reproduced verbatim — they are
 * formal statements and paraphrasing one changes what it commits to.
 */
export type Organization = {
  fullName: string;
  shortName: string;
  founded: number;
  /** The date PKSF formally came into being, as published. */
  foundedOn: string;
  legalStatus: string;
  /** Verbatim. Never paraphrase. */
  vision: string;
  /** Verbatim. Never paraphrase. */
  mission: string;
  /** What PKSF does, restated for the page. Structural, not quoted. */
  mandate: string;
  headquarters: string[];
  email: string;
  phones: string[];
  website: string;
  sources: Record<string, string>;
};

export const organization: Organization = {
  fullName: "Palli Karma-Sahayak Foundation",
  shortName: "PKSF",
  founded: 1989,
  foundedOn: "13 November 1989",
  legalStatus:
    "An apex development organisation established by the Government of Bangladesh.",
  vision: "A prosperous, resilient, equitable Bangladesh",
  mission:
    "To serve the low-income people to enhance their opportunities for decent employment with appropriate financial, risk mitigation, and capacity enhancement services by fostering inclusive institutions",
  mandate:
    "PKSF provides financial assistance and institutional development support to Partner Organisations, which implement its programmes and projects at grassroots level. The Partner Organisations are an integral part of PKSF's operational structure and deliver services to people across Bangladesh.",
  headquarters: [
    "PKSF Bhaban-1",
    "Plot: E-4/B",
    "Agargaon Administrative Area",
    "Sher-e-Bangla Nagar",
    "Dhaka-1207",
  ],
  email: "pksf@pksf.org.bd",
  phones: ["02222218331-33", "02222218335-39", "02222218341", "02222218343"],
  website: "https://pksf.org.bd/",
  sources: {
    founding: "PKSF — About Us",
    vision: "PKSF — Our Vision",
    mission: "PKSF — Our Mission",
    contact: "PKSF — Contact",
  },
};

/**
 * The Strategic Plan 2025–2030. The three objectives are reproduced as
 * published; the one-word labels are this page's own headings and are marked
 * as such wherever they appear.
 */
export type StrategicObjective = {
  index: string;
  /** Editorial one-word heading — not PKSF wording. */
  label: string;
  /** The published objective, verbatim. */
  objective: string;
};

export const strategicPlan = {
  period: "2025–2030",
  theme: "Financing Inclusive Growth",
  source: "PKSF Strategic Plan 2025–2030",
  objectives: [
    {
      index: "01",
      label: "Opportunity",
      objective: "Enhancing Economic Opportunities for Low-Income People",
    },
    {
      index: "02",
      label: "Resilience",
      objective: "Building Resilience against Income and Asset Erosion",
    },
    {
      index: "03",
      label: "Capacity",
      objective:
        "Enhancing Capacity of Low-Income People, Partner Organizations and PKSF",
    },
  ] satisfies StrategicObjective[],
};

/**
 * The three stages money and capacity actually move through. The distinction
 * matters: PKSF does not deliver services to households itself.
 */
export type RelayStage = {
  role: string;
  name: string;
  description: string;
  /** Mono figure shown against the stage, with its reporting date. */
  figure?: { value: string; label: string; asOf: string };
};

export const relay: RelayStage[] = [
  {
    role: "Apex",
    name: "PKSF",
    description:
      "Provides financial assistance and institutional development support. It does not deliver services to households itself.",
    figure: { value: "1989", label: "Established 13 November", asOf: "PKSF — About Us" },
  },
  {
    role: "Network",
    name: "Partner Organisations",
    description:
      "An integral part of PKSF's operational structure. They implement the programmes and projects at grassroots level, from their own branch offices.",
    figure: { value: "200+", label: "Partner Organisations", asOf: "30 April 2026" },
  },
  {
    role: "Last mile",
    name: "Members and communities",
    description:
      "Low-income households across all 64 districts receive finance, training and risk protection where they live — through the organisation already working there.",
    figure: { value: "21.90M", label: "Organised members", asOf: "30 April 2026" },
  },
];
