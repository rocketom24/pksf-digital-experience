/**
 * PKSF on film — four videos from PKSF's own YouTube channel.
 *
 * Every field below was read off the video itself: the title is the one PKSF
 * published it under, verbatim, punctuation and spacing included; the length
 * is the one YouTube prints on the channel listing; the date is the video's
 * own publication date. Nothing here is a summary, a retitling or a guess, and
 * no video is listed that is not on `@PKSF1990`.
 *
 * The one exception to "verbatim" is `bangla`, and it is marked: PKSF
 * publishes these four under English titles, so the Bangla line set under each
 * one is this page's own rendering unless `banglaSource` says otherwise. The
 * fourth entry's line is PKSF's own — it is the Bangla title of the talk show
 * itself, set across the studio backdrop in the video's own thumbnail and named
 * in PKSF's description of it.
 *
 * ── Thumbnails ────────────────────────────────────────────────────────────
 * Taken from YouTube at `maxresdefault` (1280×720) — the file PKSF uploaded
 * with the video, not a frame chosen by us. All four are checked present at
 * that size. Three of them are letterboxed inside the 16:9 file and carry
 * PKSF's own Bangla logotype on a white strip along the foot, so the card
 * never crops them: the frame is exactly 16:9 and the crop settle used
 * elsewhere on the page is deliberately not applied here.
 */
export type Video = {
  /** YouTube video id. The link, the thumbnail and the key all derive from it. */
  id: string;
  /** The video's own title on PKSF's channel, verbatim. */
  title: string;
  /** The Bangla line set under the title. */
  bangla: string;
  /**
   * `pksf` — the line is PKSF's own Bangla, published with the video.
   * `page`  — the line is this page's Bangla rendering of an English title.
   */
  banglaSource: "pksf" | "page";
  /** Running time, as YouTube prints it on the channel listing. */
  duration: string;
  /** Publication date, written out. */
  published: string;
  /** The same date, machine-readable, for `<time dateTime>`. */
  publishedISO: string;
  /** What the thumbnail actually shows, written after looking at the file. */
  alt: string;
};

/** The channel every entry below is published on. */
export const channel = {
  name: "Palli Karma-Sahayak Foundation [PKSF]",
  handle: "@PKSF1990",
  url: "https://www.youtube.com/@PKSF1990",
} as const;

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** 1280×720 — the largest size YouTube serves, and present for all four. */
export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

/**
 * The featured video leads the section; the rest sit under it.
 *
 * The first entry is PKSF's official documentary, and it is also the one video
 * PKSF has placed in the video gallery on its own homepage — so leading with it
 * is PKSF's editorial judgement rather than ours.
 */
export const videos: Video[] = [
  {
    id: "rA3krdelgs8",
    title: "PKSF: Transforming Lives for a Sustainable Bangladesh | Official Documentary",
    bangla: "টেকসই বাংলাদেশ গড়ায় পিকেএসএফ — জীবন বদলের প্রামাণ্যচিত্র",
    banglaSource: "page",
    duration: "6:50",
    published: "17 May 2026",
    publishedISO: "2026-05-17",
    alt: "A woman in a gold-bordered sari smiling to camera against blurred green foliage, with the words ‘THE PKSF STORY’ set beside her and PKSF's Bangla logotype on a white strip along the foot of the frame.",
  },
  {
    id: "zbCVIrdtEa0",
    title: "How PKSF’s Preventive Healthcare Program Works",
    bangla: "পিকেএসএফের প্রতিরোধমূলক স্বাস্থ্যসেবা কর্মসূচি কীভাবে কাজ করে",
    banglaSource: "page",
    duration: "2:05",
    published: "2 July 2026",
    publishedISO: "2026-07-02",
    alt: "An illustration of a paramedic in a white coat taking a seated woman's blood pressure on a mat in a village courtyard while other women and children watch, captioned ‘Preventive healthcare in action’, with PKSF's Bangla logotype on a white strip along the foot of the frame.",
  },
  {
    id: "to4BppfCZsk",
    title: "PKSF receives Independence Award 2026",
    bangla: "স্বাধীনতা পুরস্কার ২০২৬ পেল পিকেএসএফ",
    banglaSource: "page",
    duration: "6:40",
    published: "3 May 2026",
    publishedISO: "2026-05-03",
    alt: "Two men on a lit stage handing over a presentation case in front of a gold starburst backdrop reading ‘স্বাধীনতা পুরস্কার ২০২৬’.",
  },
  {
    id: "XMSmO560dMY",
    title:
      "Skills, Not Just Degrees, Drive Employment | Md. Mashiar Rahman|  World Youth Skills Day 2026",
    /* PKSF's own: the Bangla title of the talk show, set across the studio
       backdrop in this video's thumbnail and named in PKSF's description. */
    bangla: "তরুণদের দক্ষতা উন্নয়ন ও কর্মসংস্থান",
    banglaSource: "pksf",
    duration: "23:33",
    published: "5 August 2026",
    publishedISO: "2026-08-05",
    alt: "A man in a grey jacket speaking in a television studio in front of a PKSF-branded backdrop, with ‘SKILLS MATTER MORE THAN DEGREES’ set beside him and PKSF's Bangla logotype on a white strip along the foot of the frame.",
  },
];
