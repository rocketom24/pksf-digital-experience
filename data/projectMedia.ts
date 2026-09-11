import type { Ground } from "@/components/editorial/grounds";
import type { PlateVariant } from "@/components/home/Plate";

/**
 * How each project is *presented* — the ground its card is printed on, the
 * plate that stands in an unfilled frame, and the image in the filled ones.
 *
 * Kept apart from `data/projects.ts`, which holds only what PKSF publishes.
 * Nothing in this file is a claim about PKSF: it is art direction. It mirrors
 * `data/interventionMedia.ts` deliberately, so the two image systems on the
 * homepage are the same system and a photograph dropped into either one
 * behaves identically.
 *
 * ── Images ────────────────────────────────────────────────────────────────
 * Files live in `public/images/projects/`, named by slug. Filling a slot is
 * two fields — `src` and `alt` — and nothing else moves: the frame, the 16:9
 * ratio, the crop, the mask, the object-fit and the responsive `sizes` all
 * live in the component.
 *
 *   `alt`     — describes what the file actually shows, written after looking
 *               at it. Never written from the project's name: that would be a
 *               description of a picture nobody has opened, attached to a
 *               photograph of real people. An empty string marks the image
 *               decorative and is the correct value until someone has looked.
 *   `caption` — the brief the slot was filled against. It is kept after the
 *               slot is filled, because it is what a replacement has to match,
 *               and it is never rendered as a description of the file that is
 *               standing there now.
 *   `credit`  — the photographer and the licence. Blank on every entry below:
 *               these files were supplied without provenance, and the card
 *               says so on its face rather than quietly going without.
 *
 * Every slot is filled. Three of them are not photographs — PKSF's own
 * published summary graphics for MFCE and SICIP, and the SMART project mark.
 * They carry `fit: "contain"` so their own text and logotype are never
 * cropped, and the card does not print the acronym over them. The drawn-plate
 * fallback is still wired for every entry and is what an emptied `src` falls
 * back to.
 */
export type ProjectImage = {
  /** `null` falls the frame back to its drawn plate. */
  src: string | null;
  /** Describes the file, not the composition. Empty = decorative. */
  alt: string;
  /** The brief this slot was filled against. */
  caption: string;
  /** Photographer, and licence where one is known. Rendered under the card. */
  credit?: string;
  /** Licence, e.g. "CC BY-SA 4.0". Rendered next to the credit. */
  license?: string;
  /** Where the file came from. */
  source: string;
  /** `object-position`, for images whose subject is not centred. */
  focal?: string;
  /**
   * `cover` (the default) crops the file to the 16:9 card, which is what a
   * photograph wants. `contain` fits it whole and drops the crop settle — for
   * a graphic or a logotype whose own artwork cannot be cropped without being
   * destroyed. A `contain` file is letterboxed on the card's ground.
   */
  fit?: "cover" | "contain";
};

export type ProjectMedia = {
  ground: Ground;
  plate: PlateVariant;
  image: ProjectImage;
};

/**
 * The ground a card is printed on.
 *
 * For a photograph it is only visible while the card's mask is opening, so the
 * three dark grounds are used for variety down the sequence. For a `contain`
 * file it is the letterbox the artwork sits in, and it has to be chosen
 * against that artwork instead: all three `contain` entries are dark artwork
 * on white, so all three take `paper`. A white graphic letterboxed on a
 * near-black card reads as a mistake, and a dark logotype on a dark card
 * disappears entirely.
 *
 * `strata` is the one plate set in fixed palette colours rather than
 * `currentColor`, and one of its bands *is* moss — on a moss ground that band
 * disappears and the card looks like it has a hole in it. So strata never
 * lands on moss.
 */
export const projectMedia: Record<string, ProjectMedia> = {
  "bd-rural-wash": {
    ground: "forest",
    plate: "delta",
    image: {
      src: "/images/projects/bd-rural-wash.jpg",
      alt: "A diesel pump on the bank of a paddy field throwing a thick arc of water into a channel, while a person crouches in the spray to wash. A large black umbrella is propped on a bamboo pole beside them.",
      caption: "A household twin-pit latrine in place, and the water point serving it",
      source: "supplied for this project; origin not recorded",
    },
  },
  "ecccp-drought": {
    ground: "ink",
    plate: "strata",
    image: {
      src: "/images/projects/ecccp-drought.jpg",
      alt: "A low view along a field of young cereal seedlings rooted in hard, deeply cracked earth, the outer leaves dried and curled, under a bright sky.",
      caption: "A recharge structure or surface-water body in the drought-prone Barind",
      source: "supplied for this project; origin not recorded",
    },
  },
  green: {
    ground: "moss",
    plate: "weave",
    image: {
      src: "/images/projects/green.jpg",
      alt: "A thatched homestead and a tall conical haystack set among heavy trees at the far edge of a bright green paddy field, with cattle grazing along the tree line.",
      caption:
        "Agroecological plots and a local agro-processing unit in a climate-vulnerable region",
      source: "supplied for this project; origin not recorded",
    },
  },
  mfce: {
    /* Paper rather than ink: the graphic is printed on white, and a white
       plate letterboxed on a near-black card reads as a mistake. */
    ground: "paper",
    plate: "weave",
    image: {
      src: "/images/projects/mfce.png",
      alt: "PKSF summary card, ‘The project at a glance’: title — Microenterprise Financing and Credit Enhancement (MFCE) Project; duration — 5 years, 16 May 2023 to 30 June 2028; financier — Asian Development Bank (ADB); fund — USD 200 million.",
      caption:
        "PLACEHOLDER — this is PKSF's published summary graphic, not project photography. The slot still wants a photograph: a woman-owned microenterprise at the scale the financing is sized for.",
      source: "pksf.org.bd — MFCE Project page (wp-content/uploads/2023/12/Asset-1.png)",
      fit: "contain",
    },
  },
  "ppepp-eu": {
    ground: "forest",
    plate: "strata",
    image: {
      src: "/images/projects/ppepp-eu.jpg",
      alt: "A health worker in a white coat with a stethoscope sits writing in a register, beside a man and a woman seated in a red sari. A crowd of women and children stands watching in the courtyard behind them.",
      caption: "The package delivered together — an asset, training, and a nutrition session",
      source: "supplied for this project; origin not recorded",
    },
  },
  raise: {
    ground: "moss",
    plate: "delta",
    image: {
      src: "/images/projects/raise.jpg",
      alt: "Two men standing in a field of leafy vegetables. One carries a large bundle of freshly cut greens against his shoulder; the other, facing him, is counting banknotes.",
      caption: "A young trainee with a master craftsperson, in an informal-sector workshop",
      source: "supplied for this project; origin not recorded",
    },
  },
  rhl: {
    ground: "ink",
    plate: "delta",
    image: {
      src: "/images/projects/rhl.jpg",
      alt: "A man standing waist-deep in a dense field of creeping gourd vines, holding a stem, with trees and homestead roofs along the horizon behind him.",
      caption: "A raised, climate-resilient homestead on the coast",
      source: "supplied for this project; origin not recorded",
    },
  },
  rmtp: {
    ground: "forest",
    plate: "weave",
    image: {
      src: "/images/projects/rmtp.jpg",
      alt: "A woman crouching on a riverbank to set down a metal dish for a flock of sheep and goats, with a cow, chickens and a stack of jute sticks nearby and open water behind.",
      caption: "A high-value crop moving through the value chain it was financed for",
      /* The woman and the flock sit in the left third; the file is 2.28:1 in a
         16:9 slot, so a centred crop would take her off the edge. */
      focal: "22% 50%",
      source: "supplied for this project; origin not recorded",
    },
  },
  swp: {
    ground: "moss",
    plate: "delta",
    image: {
      src: "/images/projects/swp.jpg",
      alt: "A girl in a red printed dress crouching at a hand tubewell, holding a metal cup under the spout as water runs into it, with a pitcher and a blue plastic drum beside her.",
      caption: "A solar-assisted reverse-osmosis plant, and the queue it serves",
      source: "supplied for this project; origin not recorded",
    },
  },
  sicip: {
    /* Same reason as MFCE — the banner's own ground is near-white. */
    ground: "paper",
    plate: "weave",
    image: {
      src: "/images/projects/sicip.jpg",
      alt: "SICIP programme banner. Left: the SICIP and PKSF logos over the title ‘Skills for Industry Competitiveness and Innovation Program (SICIP)’ and figures — 20,500 youths, 2025–2028, residential and free of cost, 13 high-demand technical trade courses, 30% women inclusion, minimum 65% job placement — with the Finance Division and Asian Development Bank marks beneath. Right: young trainees in hard hats and high-visibility vests, a woman at an industrial sewing machine, and a trainee working on a solar panel array.",
      caption:
        "PLACEHOLDER — this is PKSF's published programme banner, not a photograph of a training session. The slot still wants one: a competency-based session in one of the thirteen trades.",
      source:
        "pksf.org.bd — SICIP project page (wp-content/uploads/2026/08/1.-Landing-Page-Pic-scaled.jpg)",
      fit: "contain",
    },
  },
  smart: {
    /* The mark is dark green line art on transparency. On any of the three
       dark grounds it disappears into the card. */
    ground: "paper",
    plate: "strata",
    image: {
      src: "/images/projects/smart.png",
      alt: "The SMART project mark: a dark green industrial gear with a blue arc running through it and a green leaf rising from its upper right, the word SMART set inside the white circle at its centre.",
      caption:
        "PLACEHOLDER — this is the project's logotype, not photography. The slot still wants a photograph: cleaner production on a microenterprise floor, the technology in use.",
      source: "supplied for this project; origin not recorded",
      fit: "contain",
    },
  },
};
