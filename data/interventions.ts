export type Intervention = {
  slug: string;
  name: string;
  description: string;
};

/**
 * PKSF's ten official strategic intervention categories.
 * Names are as published; descriptions are editorial summaries, not
 * quoted statistics — see docs/art-direction.md "What to avoid".
 */
export const interventions: Intervention[] = [
  {
    slug: "inclusive-finance",
    name: "Inclusive Finance",
    description:
      "Expanding access to responsible financial services for low-income and underserved communities across Bangladesh.",
  },
  {
    slug: "climate-action",
    name: "Climate Action",
    description:
      "Building climate-resilient livelihoods and supporting adaptation in communities most exposed to environmental change.",
  },
  {
    slug: "microenterprise-development",
    name: "Microenterprise Development",
    description:
      "Helping small and micro businesses grow through financing, skills and market linkages.",
  },
  {
    slug: "extreme-poverty",
    name: "Extreme Poverty",
    description:
      "Targeted support for households in extreme poverty to build sustainable pathways out of it.",
  },
  {
    slug: "human-capacity",
    name: "Human Capacity",
    description:
      "Strengthening the skills and institutional capacity of Partner Organisations and the communities they serve.",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    description:
      "Modernising operations, data and service delivery through technology across the PKSF network.",
  },
  {
    slug: "agricultural-development",
    name: "Agricultural Development",
    description:
      "Supporting productivity, value chains and rural livelihoods connected to agriculture.",
  },
  {
    slug: "strategic-alliances",
    name: "Strategic Alliances",
    description:
      "Partnering with government, donors and institutions to widen the reach and impact of development work.",
  },
  {
    slug: "building-resilience",
    name: "Building Resilience",
    description:
      "Helping communities withstand and recover from economic, social and environmental shocks.",
  },
  {
    slug: "knowledge-communication-advocacy",
    name: "Knowledge, Communication & Advocacy",
    description:
      "Generating and sharing evidence, and advocating for policy that supports inclusive development.",
  },
];
