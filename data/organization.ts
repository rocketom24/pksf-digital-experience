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
  /** See `bangla` below — the two names in PKSF's own script. */
  banglaFullName: string;
  banglaShortName: string;
  headquarters: string[];
  email: string;
  /** Telephone only. The two fax lines are `fax` — see the note below. */
  phones: string[];
  fax: string[];
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
  /* ── The institution's own name, in its own script ──────────────────────
     These two do not have the same provenance and the page does not pretend
     they do.

     `banglaShortName` is **PKSF's own**, off pksf.org.bd: every Bangla release
     in its news centre writes the institution as পিকেএসএফ, in the headline and
     in the body. It is marked Verified where it is set.

     `banglaFullName` is the expansion, and pksf.org.bd does not print it —
     not on the home page, the contact page, the about page, the news centre,
     or its own site search for ফাউন্ডেশন. It is the standard Bangla name of
     the institution, hyphenated exactly as PKSF hyphenates the English it
     does publish ("Palli Karma-Sahayak Foundation" → পল্লী কর্ম-সহায়ক
     ফাউন্ডেশন), and it is the form used in PKSF's own Bangla recruitment
     notices and on the Bangla Wikipedia article. That is a real citation but
     it is not a PKSF page, so the page marks it **Awaiting source** rather
     than Verified. If a PKSF page is later found carrying it, the mark
     changes and the string does not. */
  banglaFullName: "পল্লী কর্ম-সহায়ক ফাউন্ডেশন",
  banglaShortName: "পিকেএসএফ",
  headquarters: [
    "PKSF Bhaban-1",
    "Plot: E-4/B",
    "Agargaon Administrative Area",
    "Sher-e-Bangla Nagar",
    "Dhaka-1207",
  ],
  email: "pksf@pksf.org.bd",
  /* PKSF's contact page lists four numbers under two headings, and this file
     used to carry all four as `phones`. Two of them are the fax lines — the
     page labels them as such — and printing a fax number as a telephone
     number is exactly the kind of quiet inaccuracy the provenance system
     exists to prevent. They are split here as PKSF publishes them. */
  phones: ["02222218331-33", "02222218335-39"],
  fax: ["02222218341", "02222218343"],
  website: "https://pksf.org.bd/",
  sources: {
    founding: "PKSF — About Us",
    vision: "PKSF — Our Vision",
    mission: "PKSF — Our Mission",
    contact: "PKSF — Contact",
  },
};

/**
 * The head office, as a place on the ground.
 *
 * PKSF publishes the postal address but no coordinate, so the coordinate is
 * not PKSF's — it is the OpenStreetMap node for "Palli Karma-Sahayak
 * Foundation", whose own address field reads `E-4/B, ICT Road, Agargaon,
 * Dhaka, 1207`. That is the same plot number PKSF prints on its contact page,
 * which is what makes the match verifiable rather than assumed. The footer
 * says so on its face.
 *
 * ── Why this embed URL and not a Maps API one ─────────────────────────────
 * `maps.google.com/maps?q=…&output=embed` is the keyless classic form, and it
 * is the exact form PKSF's own contact page uses for its map — so the map in
 * this footer is the institution's own choice of map, at a zoom that actually
 * shows the building. It needs no API key, which means no key to leak and no
 * billing account behind a concept site. The pin is placed by coordinate
 * rather than by address string so it lands on the plot instead of on
 * whatever Google geocodes the sentence to.
 *
 * `openUrl` is the documented Google Maps URL scheme, which is also keyless.
 */
export const headOffice = {
  lat: 23.776859,
  lng: 90.3740818,
  /** Where the coordinate came from. Not PKSF, and labelled as such. */
  coordinateSource: "OpenStreetMap — node 2990875215, plot E-4/B",
  coordinateSourceUrl: "https://www.openstreetmap.org/node/2990875215",
  embedUrl:
    "https://maps.google.com/maps?q=23.776859,90.3740818&t=m&z=17&output=embed&iwloc=near",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=23.776859%2C90.3740818",
} as const;

/**
 * Every channel PKSF publishes for itself, and no others.
 *
 * Facebook and YouTube are the only two social accounts linked anywhere on
 * pksf.org.bd — there is no official LinkedIn, X or Instagram to link, and an
 * unofficial account carrying the name is not a PKSF channel. The contact page
 * also links a second Facebook spelling, `facebook.com/pksf.orgbd`, which
 * redirects to the one below; the destination is what is carried here.
 *
 * `href` is what the reader is sent to. `detail` is what is printed, and for
 * the telephone that is PKSF's published string verbatim, ranges and all —
 * the `href` is the first number of the first range in international form,
 * because a range cannot be dialled and `tel:` needs one number.
 */
export type ChannelKind = "facebook" | "youtube" | "website" | "email" | "phone";

export type Channel = {
  kind: ChannelKind;
  /** What the channel is. */
  name: string;
  /** What is printed under the name — the handle, address or number. */
  detail: string;
  href: string;
  /** True for anything that leaves this site into a new tab. */
  external?: boolean;
};

export const channels: Channel[] = [
  {
    kind: "facebook",
    name: "Facebook",
    detail: "facebook.com/pksf.org.bd",
    href: "https://www.facebook.com/pksf.org.bd/",
    external: true,
  },
  {
    kind: "youtube",
    name: "YouTube",
    detail: "Palli Karma-Sahayak Foundation [PKSF]",
    href: "https://www.youtube.com/channel/UCoAKqvZNToAyt4ZGx8qwHYQ",
    external: true,
  },
  {
    kind: "website",
    name: "Website",
    detail: "pksf.org.bd",
    href: organization.website,
    external: true,
  },
  {
    kind: "email",
    name: "Email",
    detail: organization.email,
    href: `mailto:${organization.email}`,
  },
  {
    kind: "phone",
    name: "Telephone",
    detail: organization.phones.join(" · "),
    href: "tel:+8802222218331",
  },
];

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
