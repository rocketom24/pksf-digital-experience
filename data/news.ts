export type NewsItem = {
  slug: string;
  /** PKSF's own headline, verbatim, including its own capitalisation. */
  title: string;
  /** ISO date, so the list can be ordered without parsing prose. */
  date: string;
  /** How the date should read on screen. */
  displayDate: string;
  /**
   * PKSF's own opening, cut at a sentence boundary and not otherwise touched.
   * Never a paraphrase: a summary written here would be this page putting
   * words in an institution's mouth about its own announcement.
   */
  summary: string;
  url: string;
  /**
   * The photograph PKSF published with the release, loaded from PKSF's own
   * media library. `alt` describes what the file actually shows, written
   * after opening it — never from the headline.
   */
  image: { src: string; alt: string };
  source: string;
};

/**
 * A dated selection from PKSF's own News Center — newest first.
 *
 * Deliberately a handful rather than a feed: an unofficial concept has no
 * business mirroring an institution's newsroom. Every headline, date,
 * opening paragraph, photograph and link below is PKSF's own, taken from the
 * release's own page on pksf.org.bd.
 *
 * ── One thing worth knowing about the pictures ────────────────────────────
 * All six are ceremony photographs — a signing, a launch, a roundtable — and
 * they look alike, because that is what an apex institution photographs. The
 * section is built knowing that: the pictures are not asked to carry the
 * variety, the composition and the type are. No file has a recorded
 * photographer or licence, and the section says so on its face.
 */
export const news: NewsItem[] = [
  {
    slug: "pksf-cabi-mou",
    title:
      "PKSF and CAB International Sign MoU: climate-resilient, sustainable and safe agriculture takes centre stage",
    date: "2026-08-20",
    displayDate: "20 August 2026",
    summary:
      "Palli Karma-Sahayak Foundation (PKSF) and CAB International will work jointly to make Bangladesh's agricultural system more effective and sustainable by promoting safe food production, reducing farmers' production costs, and addressing climate and environmental risks.",
    url: "https://pksf.org.bd/pksf-and-cab-international-sign-mou-climate-resilient-sustainable-and-safe-agriculture-takes-centre-stage/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/08/PKSF-CABI-MoU-2-scaled.jpg",
      alt: "Four men standing in front of a screen headed ‘MoU Signing Ceremony’ and carrying the PKSF and CABI marks. The two in the centre shake hands while holding an open signed folder between them.",
    },
    source: "PKSF — News Center",
  },
  {
    slug: "bangladesh-bank-stimulus-agreement",
    title: "Deal signed with BB on stimulus package for 200k job creation",
    date: "2026-08-19",
    displayDate: "19 August 2026",
    summary:
      "Bangladesh Bank and Palli Karma-Sahayak Foundation (PKSF) today signed a Tk 50 billion agreement to accelerate sustainable job creation by boosting financing for targeted microenterprises and stimulating grassroots economic activities.",
    url: "https://pksf.org.bd/special-stimulus-package-to-create-200000-jobs-bangladesh-bank-pksf-sign-bdt-50-billion-agreement/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/08/IMG_20260819_182305.jpg",
      alt: "Eight men standing in a line across a panelled hall beneath the gold seal of Bangladesh Bank. The two at the centre hold a dark signature folder between them.",
    },
    source: "PKSF — News Center",
  },
  {
    slug: "skills-development-overhaul",
    title: "Call for basic overhaul of Bangladesh's skills development ecosystem",
    date: "2026-08-04",
    displayDate: "4 August 2026",
    summary:
      "Policymakers, economists, development practitioners and industry experts on Monday called for a fundamental overhaul of Bangladesh's skills-development ecosystem.",
    url: "https://pksf.org.bd/call-for-basic-overhaul-of-bangladeshs-skills-development-ecosystem/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/08/DSC_7478-scaled.jpg",
      alt: "A long conference table filled on both sides with seated participants, a projection screen carrying the roundtable's title at the far end, and a television camera on a tripod at the near left.",
    },
    source: "PKSF — News Center",
  },
  {
    slug: "pksf-bids-research-mou",
    title: "PKSF and BIDS to collaborate on research and evidence-based policymaking",
    date: "2026-08-02",
    displayDate: "2 August 2026",
    summary:
      "Palli Karma-Sahayak Foundation (PKSF) and the Bangladesh Institute of Development Studies (BIDS) have signed a Memorandum of Understanding (MoU) to strengthen collaboration in priority research, evidence-based policymaking, and knowledge sharing for the country's sustainable development.",
    url: "https://pksf.org.bd/pksf-and-bids-to-collaborate-on-research-andevidence-based-policymaking/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/08/DSC7377-scaled.jpg",
      alt: "Nine people standing against a white wall beneath a framed painting of a forest clearing. The two at the centre each hold up a dark signed folder.",
    },
    source: "PKSF — News Center",
  },
  {
    slug: "green-project-launch",
    title:
      "PKSF launches ‘GREEN’ project to scale up climate-resilient initiatives, benefiting over 250,000 households",
    date: "2026-07-30",
    displayDate: "30 July 2026",
    summary:
      "Palli Karma-Sahayak Foundation (PKSF) today launched the Growth for Climate Resilient and Environmental Entrepreneurship and Nutrition (GREEN) Project, aimed at accelerating sustainable economic growth by strengthening climate resilience, promoting safe and nutritious food systems, and fostering environmentally sustainable entrepreneurship.",
    url: "https://pksf.org.bd/pksf-launches-green-project-to-scale-up-climate-resilient-initiatives-benefiting-over-250000-households/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/07/DSC7259-scaled.jpg",
      alt: "Five men seated behind a draped table on a red-curtained stage, each with a nameplate in front of him, under a banner reading ‘Launching Ceremony — Growth for Climate Resilient and Environmental Entrepreneurship and Nutrition (GREEN) Project’, dated 30 July 2026 at Auditorium-1, PKSF Bhaban-1.",
    },
    source: "PKSF — News Center",
  },
  {
    slug: "credit-guarantee-agreements",
    title: "PKSF signs credit guarantee agreements with 11 banks, 1 NBFI",
    date: "2026-07-21",
    displayDate: "21 July 2026",
    summary:
      "Palli Karma-Sahayak Foundation (PKSF) has signed twelve separate Credit Guarantee Agreements with 11 banks and 1 non-banking financial institution (NBFI) under its Credit Enhancement Scheme (CES).",
    url: "https://pksf.org.bd/pksf-signs-credit-guarantee-agreements-with-11-banks-1-nbfi/",
    image: {
      src: "https://pksf.org.bd/wp-content/uploads/2026/07/DSC7024-1-scaled.jpg",
      alt: "A long conference table lined with seated participants, one man speaking from its head, and a screen behind him carrying the PKSF mark and the words ‘Credit Enhancement Scheme (CES)’.",
    },
    source: "PKSF — News Center",
  },
];

/** Where the whole selection came from, and where the rest of it lives. */
export const newsCenter = {
  label: "PKSF — News Center",
  url: "https://pksf.org.bd/news-center/",
};
