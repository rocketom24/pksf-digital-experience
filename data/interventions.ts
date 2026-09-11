export type Intervention = {
  slug: string;
  /** Exactly as PKSF publishes the area name. */
  name: string;
  /** Editorial summary of published material. Factual meaning unchanged. */
  description: string;
  /** One published figure, with the period it was reported for. */
  stat?: { value: string; label: string; asOf: string };
  /** Programmes or projects PKSF files under this area. Names only. */
  examples?: string[];
  source: string;
};

/**
 * PKSF's ten official strategic intervention areas, in the published order.
 *
 * Names are as published. Descriptions are editorial compressions of PKSF's
 * own material — shorter, never different in meaning. Where the source
 * describes something as being piloted or developed, the description says
 * so; nothing here is presented as delivered that PKSF has not said is.
 */
export const interventions: Intervention[] = [
  {
    slug: "inclusive-finance",
    name: "Inclusive Finance",
    description:
      "Access to appropriate, affordable financial services as the enabling factor for micro-entrepreneurs, small farmers, women and youth — credit, savings, and risk protection delivered through Partner Organisations rather than by PKSF itself.",
    stat: {
      value: "20.07 million",
      label: "low-income beneficiaries reached, 93.24% of them women",
      asOf: "2025",
    },
    examples: ["JAGORON", "BUNIAD", "AGROSOR", "SUFOLON"],
    source: "PKSF — Inclusive Finance",
  },
  {
    slug: "climate-action",
    name: "Climate Action",
    description:
      "Climate-resilient livelihoods, environmental management and climate finance in the regions most exposed to it — the coast, the haors, the Barind, the chars. PKSF is a Direct Access Entity to both the Green Climate Fund and the Adaptation Fund.",
    stat: {
      value: "USD 211.7 million",
      label: "GREEN Project, 2026–2031, with USD 70 million from IFAD",
      asOf: "announced 30 July 2026",
    },
    examples: ["GREEN", "RHL", "ECCCP-Drought", "Environment and Climate Change Unit"],
    source: "PKSF — Environment & Climate Change; GREEN Project announcement",
  },
  {
    slug: "microenterprise-development",
    name: "Microenterprise Development",
    description:
      "Begun in 2001 to finance members whose activities had outgrown ordinary microcredit. The current strategy adds standardisation, certification, branding and e-markets, and is developing digital tools — psychometric credit profiling, smart analytics, AI-based automation, blockchain traceability — rather than running them at scale today.",
    stat: {
      value: "BDT 726.2 billion",
      label: "disbursed to 3.5 million microentrepreneurs",
      asOf: "FY 2024–25",
    },
    examples: ["AGROSOR", "MFCE", "SMART", "RMTP"],
    source: "PKSF — Microenterprise; PKSF Strategic Plan 2025–2030",
  },
  {
    slug: "extreme-poverty",
    name: "Extreme Poverty",
    description:
      "Beyond microfinance: a package that combines appropriate financing with skills development, technical and vocational training, enterprise support and livelihood diversification. Extreme poverty is treated as a distinct problem, not the low end of general poverty reduction.",
    stat: {
      value: "0.5 million",
      label: "extremely poor families supported, BDT 15.42 billion in assistance",
      asOf: "2025",
    },
    examples: ["BUNIAD", "PPEPP-EU", "ENRICH"],
    source: "PKSF — Inclusive Finance; PKSF — Extreme Poverty",
  },
  {
    slug: "human-capacity",
    name: "Human Capacity",
    description:
      "Skills development is named in the Strategic Plan 2025–2030 as a main route to decent employment — training, capacity building and institutional capability across low-income people, Partner Organisations and PKSF itself.",
    stat: {
      value: "20,500 youth",
      label: "targeted by SICIP, at least 30% women",
      asOf: "2025–2028",
    },
    examples: ["SICIP", "RAISE", "Program for Adolescents", "Capacity Building"],
    source: "PKSF Strategic Plan 2025–2030; PKSF — SICIP",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    description:
      "Paperless working, then digital reporting, then decision support, then AI-enabled systems and digital financial services. PKSF reports that all Partner Organisations now report digitally by API; the cashless, data-intelligent end state is a stated direction for 2030, not a delivered one.",
    stat: {
      value: "100% digital",
      label: "real-time reporting from all Partner Organisations",
      asOf: "2023–24",
    },
    examples: ["Integrated Information System", "Amader PKSF Portal"],
    source: "PKSF — Digital Transformation",
  },
  {
    slug: "agricultural-development",
    name: "Agricultural Development",
    description:
      "Farming technology, fisheries and livestock, farmer capacity, value chains and marketing systems — with emphasis on climate-vulnerable and poverty-prone areas, and on practices such as vermicompost, mulching and the Sarjan method.",
    stat: {
      value: "1.4 million farmers",
      label: "supported, BDT 103.68 billion disbursed",
      asOf: "2025",
    },
    examples: ["Agriculture Unit", "SUFOLON", "RMTP", "Kuwait Goodwill Fund"],
    source: "PKSF — Agriculture Unit; PKSF — Inclusive Finance",
  },
  {
    slug: "strategic-alliances",
    name: "Strategic Alliances",
    description:
      "Co-financing and joint design with government, multilateral funds and UN agencies — IFAD, the World Bank, the Asian Development Bank, the European Union, the Green Climate Fund, FAO and WFP among them. The alliances are how the network's reach is widened without widening PKSF.",
    examples: ["IFAD", "World Bank", "Asian Development Bank", "European Union", "Green Climate Fund"],
    source: "PKSF — Projects; PKSF news releases",
  },
  {
    slug: "building-resilience",
    name: "Building Resilience",
    description:
      "Protecting income and assets against shock — the second objective of the Strategic Plan 2025–2030. Risk mitigation for livestock, disaster response, and micro-insurance carried through the Partner Organisations.",
    stat: {
      value: "15.80 million",
      label: "low-income families with micro-insurance risk protection",
      asOf: "2025",
    },
    examples: ["Risk Mitigation", "RHL", "Livelihood Restoration Loan"],
    source: "PKSF — Inclusive Finance; PKSF Strategic Plan 2025–2030",
  },
  {
    slug: "knowledge-communication-advocacy",
    name: "Knowledge, Communication & Advocacy",
    description:
      "Research, evaluation and publication, and the advocacy that follows from them. PKSF runs a Knowledge Hub and an Environment & Climate Change Knowledge Hub, and publishes an annual report every year.",
    examples: ["PKSF Knowledge Hub", "Annual Reports", "Social Advocacy and Knowledge Dissemination Unit"],
    source: "PKSF — Knowledge Bank",
  },
];
