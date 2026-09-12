/**
 * The photographs standing in the Digital Transformation timeline's frames.
 *
 * Every file here is PKSF's own, published by PKSF on pksf.org.bd and loaded
 * from PKSF's media library at its original URL — nothing is generated, and
 * nothing is a stock photograph. `next.config.ts` already allows that origin
 * for the Team and News sections.
 *
 * ── The one thing to understand before editing this file ──────────────────
 * PKSF publishes **no photographs of the earlier eras**. Its own Digital
 * Transformation page carries no pictures at all, and the media library holds
 * nothing usable from 1990–2005, from the 2016 Integrated Information System,
 * or from the 2022 launch of the Amader PKSF portal. The five pictures below
 * are therefore PKSF photographs *on the subject* — digitalisation of
 * microfinance, digital technology, psychometric profiling, technology-driven
 * agriculture, innovation — and not documents of the era whose panel they sit
 * in.
 *
 * That is why every entry carries a `caption`, and why the caption is rendered
 * on the panel: it names the event the photograph is actually of and the date
 * PKSF published it, so a picture from 2024 can never be read as a picture of
 * 2016. Do not drop the caption to save a line of height, and do not write a
 * caption that restates the panel's era.
 *
 * `alt` was written after opening each file. It describes what is in the
 * frame, never what the panel beside it claims.
 */
export type DigitalEraImage = {
  /** PKSF's own media-library URL. `null` falls the frame back to its plate. */
  src: string | null;
  /** What the photograph shows. Written from the file, not from the era. */
  alt: string;
  /** Rendered under the frame: the real event, and the date PKSF published it. */
  caption: string;
  /** The PKSF release the photograph was published with. */
  source: string;
};

/** Keyed by `digitalTimeline[].period`, so the order of neither file matters. */
export const digitalEraMedia: Record<string, DigitalEraImage> = {
  "1990–2005": {
    src: "https://pksf.org.bd/wp-content/uploads/2024/01/11--scaled.jpg",
    alt: "Around twenty officials seated down both sides of a long conference table at PKSF Bhaban, a gooseneck microphone at every place, a woman speaking from the head of the table beneath a large wall-mounted display.",
    caption: "PKSF — Meeting on Digitalization of Microfinance for Inclusive Growth, 17 January 2024",
    source:
      "https://pksf.org.bd/meeting-on-digitalization-of-microfinance-for-inclusive-growth-held/",
  },
  "2016": {
    src: "https://pksf.org.bd/wp-content/uploads/2026/04/1-scaled.jpg",
    alt: "A discussion session around the PKSF Bhaban conference table, the wall screen behind the chair reading “Discussion Session on Technology-based Income Generation for Farmers”, dated 7 April 2026, with the FIVDB and PKSF logos.",
    caption: "PKSF — Discussion session on technology-based income generation for farmers, 7 April 2026",
    source:
      "https://pksf.org.bd/knowledge-sharing-meeting-held-on-technology-driven-income-enhancing-activities-in-agriculture/",
  },
  "2022": {
    src: "https://pksf.org.bd/wp-content/uploads/2023/03/DSC0386-scaled.jpg",
    alt: "A stage at PKSF Milanayatan-1 with several rows of women standing behind a dais of five seated speakers, in front of a pink banner for PKSF's International Women's Day 2023 seminar on digital technology and gender disparity; a monitor at the left carries the live feed.",
    caption: "PKSF — International Women's Day seminar on digital technology and the gender gap, 19 March 2023",
    source: "https://pksf.org.bd/effective-use-of-digital-technologies-may-reduce-gender-gap/",
  },
  "2023–24": {
    src: "https://pksf.org.bd/wp-content/uploads/2026/07/02.jpeg",
    alt: "Nine people standing together on a stage set, seven of them holding engraved crest awards, in front of a screen headed “ইনোভেশন শোকেসিং ২০২৫-২৬” listing the event's guests.",
    caption: "PKSF — recognised for Best Innovation Initiative at Innovation Showcasing 2025–26, 7 July 2026",
    source: "https://pksf.org.bd/pksf-receives-recognition-for-best-innovation-initiative/",
  },
  "2025+": {
    src: "https://pksf.org.bd/wp-content/uploads/2024/12/DSC4149-scaled.jpg",
    alt: "The PKSF Bhaban conference table in session, the wall screen behind the chair reading “Recovery and Advancement of Informal Sector Employment (RAISE) — Inauguration Program of Psychometric Profiling of Microentrepreneurs”, dated 18 December 2024.",
    caption: "PKSF — inauguration of psychometric profiling of microentrepreneurs under RAISE, 18 December 2024",
    source: "https://pksf.org.bd/inauguration-of-psychometric-profiling-program-under-raise-project/",
  },
};
