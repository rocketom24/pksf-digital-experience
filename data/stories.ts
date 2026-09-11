export type Story = {
  slug: string;
  name: string;
  age?: number;
  location: string;
  interventionSlug: string;
  /** Facts as reported by PKSF. No invented quotes, ever. */
  summary: string;
  /** Published figures from the same account, with what each counts. */
  facts?: { value: string; label: string }[];
  source: string;
  url: string;
  published: string;
  /** Reserved for the official photograph published with the account. */
  image?: { src: string; alt: string; caption?: string; source: string };
};

/**
 * Real, PKSF-published accounts of real people.
 *
 * These are documented on PKSF's own project sites, with names, districts and
 * figures as published. Nothing is embellished and no sentence is attributed
 * to anyone as a quotation — the linked source carries none, and inventing
 * one would be a lie about a named person.
 */
export const stories: Story[] = [
  {
    slug: "marjina-khatun",
    name: "Marjina Khatun",
    age: 55,
    location: "Ranigram, Pabna Sadar, Pabna",
    interventionSlug: "microenterprise-development",
    summary:
      "Marjina Khatun worked as a domestic worker. In 2022 the Rural Microenterprise Transformation Project selected her, trained her in collecting, processing and marketing fish scales, and provided a cash grant of BDT 125,000 through its implementing Partner Organisation — along with a processing room, a wooden drying floor and a hygienic workspace. She now processes scales collected from local markets, neighbours and hotels, sun-dries and stores them, and sells to dealers supplying manufacturers abroad for fish feed and pharmaceutical capsules.",
    facts: [
      { value: "600 kg", label: "processed each month" },
      { value: "BDT 33,750", label: "monthly profit" },
      { value: "Two women", label: "employed alongside her" },
    ],
    source: "PKSF — RMTP, ‘From Domestic Worker to a Business Owner’",
    url: "https://rmtp.pksf.org.bd/from-domestic-worker-to-a-business-owner/",
    published: "8 March 2025",
  },
  {
    slug: "preetilata-tripura",
    name: "Preetilata Tripura",
    age: 57,
    location: "Koila, Mirsarai, Chattogram",
    interventionSlug: "agricultural-development",
    summary:
      "Preetilata Tripura took up black pepper cultivation — unconventional for the area — and has since been recognised as a model farmer, earning approximately BDT 2.4 lakh from it over the years.",
    source: "PKSF — RMTP, ‘Preetilata Tripura Becomes Self-Reliant Through Black Pepper Cultivation’",
    url: "https://rmtp.pksf.org.bd/preetilata-tripura-becomes-self-reliant-through-black-pepper-cultivation/",
    published: "8 March 2025",
  },
  {
    slug: "masuma-akhtar",
    name: "Masuma Akhtar",
    age: 27,
    location: "Kai Gari, Bogura Sadar, Bogura",
    interventionSlug: "microenterprise-development",
    summary:
      "After her husband lost his job during the Covid-19 pandemic, Masuma Akhtar built a meat pickle business. With training in safe packaging and access to safe meat sources it now returns a monthly profit of around BDT 75,000 and employs four to five people a day.",
    source: "PKSF — RMTP, ‘Masuma’s Rise as a Successful Entrepreneur in Meat Pickles’",
    url: "https://rmtp.pksf.org.bd/masumas-rise-as-a-successful-entrepreneur-in-meat-pickles/",
    published: "16 July 2024",
  },
];
