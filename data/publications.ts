export type Publication = {
  slug: string;
  title: string;
  year: number;
  type: string;
  /** One line on what the document is for. */
  note?: string;
  url: string;
  source: string;
};

/**
 * What PKSF publishes and is judged on. The annual reports are the primary
 * record; the strategic plan is what the current direction is drawn from.
 * Links point at PKSF's own files.
 */
export const publications: Publication[] = [
  {
    slug: "strategic-plan-2025-2030",
    title: "PKSF Strategic Plan 2025–2030",
    year: 2025,
    type: "Strategic plan",
    note: "‘Financing Inclusive Growth’ — the source of the three strategic objectives this page is organised around.",
    url: "https://pksf.org.bd/",
    source: "PKSF — Knowledge Bank",
  },
  {
    slug: "annual-report-2025",
    title: "PKSF Annual Report 2025",
    year: 2025,
    type: "Annual report",
    note: "The most recent full-year account of the network.",
    url: "https://pksf.org.bd/wp-content/uploads/2026/01/PKSF-Annual-Report__2025.pdf",
    source: "PKSF — Annual Reports",
  },
  {
    slug: "annual-report-2024",
    title: "PKSF Annual Report 2024",
    year: 2024,
    type: "Annual report",
    url: "https://pksf.org.bd/wp-content/uploads/2025/07/Annual-Report-English.pdf",
    source: "PKSF — Annual Reports",
  },
  {
    slug: "annual-report-2023",
    title: "PKSF Annual Report 2023",
    year: 2023,
    type: "Annual report",
    url: "https://pksf.org.bd/wp-content/uploads/2024/05/PKSF-Annual-Report-English.pdf",
    source: "PKSF — Annual Reports",
  },
];
