import type { Ground } from "@/components/editorial/grounds";
import type { PlateVariant } from "@/components/home/Plate";

/**
 * How each strategic intervention area is *presented* — its ground, its plate,
 * and the photograph that will eventually stand in the frame.
 *
 * Kept apart from `data/interventions.ts`, which holds only what PKSF
 * publishes. Nothing in this file is a claim about PKSF: it is art direction.
 * It is the single source of truth for intervention presentation, so the
 * sequence on the homepage and the explorer in the design system cannot drift
 * apart.
 *
 * ── Images ────────────────────────────────────────────────────────────────
 * All ten photographs are in place, in
 * `public/images/strategic-interventions/`, named by slug.
 *
 * Two fields on each one are deliberately still empty, and the card says so
 * on its face rather than quietly going without:
 *
 *   `alt`     — must describe what the photograph actually shows. Writing one
 *               from the area's name instead would be a description of a
 *               picture nobody has looked at, attached to a real photograph
 *               of real people. An empty `alt` marks the image decorative,
 *               which is the correct state for a picture whose content is not
 *               yet described: the card's heading and figure are real text
 *               and are read out regardless, so nothing is lost — where a
 *               fabricated description would actively mislead.
 *   `credit`  — the photographer and the licence. Recorded where the file's
 *               own EXIF carries it; blank where it does not.
 *
 * `caption` is the brief each slot was filled against — what the picture is
 * meant to show. It is kept because it is what the replacement has to match,
 * and it is never rendered as a description of the file that is there now.
 */
export type InterventionImage = {
  /** `null` falls the frame back to its drawn plate. */
  src: string | null;
  /**
   * Describes the photograph, not the composition. Empty string = decorative,
   * and is the correct value until somebody has actually looked at the file.
   * Never write one from the area name.
   */
  alt: string;
  /** The brief this slot was filled against — what the picture should show. */
  caption: string;
  /** Photographer, and licence where one is known. Rendered on the card. */
  credit?: string;
  /** Licence, e.g. "CC BY-SA 4.0". Rendered next to the credit. */
  license?: string;
  /** Where the file came from. */
  source: string;
  /** `object-position`, for photographs whose subject is not centred. */
  focal?: string;
};

export type InterventionMedia = {
  ground: Ground;
  plate: PlateVariant;
  image: InterventionImage;
};

/**
 * The ground and the plate each area takes.
 *
 * The ten sit as cards on one parchment section, so the ground is painted on
 * the card rather than on a band of the page — the plates are drawn in
 * `currentColor` and have nothing to read against otherwise. That is also why
 * only the three dark grounds appear here: a paper or parchment card on a
 * parchment section is a card you cannot see the edge of.
 *
 * Grouped loosely by register where the grid allows it — the economic areas
 * on forest, the land areas on moss, the institutional ones on ink. It is a
 * visual grouping only and is never presented as a published taxonomy. Two
 * areas are moved off their register so that no card shares a ground with the
 * card beside it or the card above it, which is what keeps three rows of
 * three from reading as stripes.
 *
 * The plate is chosen against the ground, not decoratively: `strata` is the
 * one plate set in fixed palette colours rather than `currentColor`, and one
 * of its bands *is* moss — on a moss ground that band disappears and the card
 * looks like it has a hole in it. So strata never lands on moss. Across the
 * grid, ground and plate are varied together so no two cards are the same
 * pair anywhere near each other.
 */
export const interventionMedia: Record<string, InterventionMedia> = {
  "inclusive-finance": {
    ground: "forest",
    plate: "strata",
    image: {
      src: "/images/strategic-interventions/inclusive-finance.jpg",
      alt: "",
      caption: "A Partner Organisation collection meeting, where the financial service actually reaches a member",
      source: "",
    },
  },
  "climate-action": {
    ground: "moss",
    plate: "delta",
    image: {
      src: "/images/strategic-interventions/climate-action.jpg",
      alt: "",
      caption: "A raised homestead in a flood-prone char",
      source: "",
    },
  },
  "microenterprise-development": {
    ground: "ink",
    plate: "weave",
    image: {
      src: "/images/strategic-interventions/microenterprise-development.jpg",
      alt: "",
      caption: "A microenterprise at the scale the financing is sized for",
      source: "",
    },
  },
  "extreme-poverty": {
    ground: "moss",
    plate: "weave",
    image: {
      src: "/images/strategic-interventions/extreme-poverty.jpg",
      alt: "",
      caption: "Assets and training together — the package extreme poverty is addressed with",
      source: "",
    },
  },
  "human-capacity": {
    ground: "ink",
    plate: "strata",
    image: {
      src: "/images/strategic-interventions/human-capacity.jpg",
      alt: "",
      caption: "A vocational skills session",
      source: "",
    },
  },
  "digital-transformation": {
    ground: "forest",
    plate: "delta",
    image: {
      src: "/images/strategic-interventions/digital-transformation.jpg",
      alt: "",
      caption: "Member records entered at the branch, not carried back on paper",
      source: "",
    },
  },
  "agricultural-development": {
    ground: "ink",
    plate: "delta",
    image: {
      src: "/images/strategic-interventions/agricultural-development.jpg",
      alt: "",
      caption: "A field under the practices the agriculture programme extends",
      source: "",
    },
  },
  "strategic-alliances": {
    ground: "forest",
    plate: "weave",
    image: {
      src: "/images/strategic-interventions/strategic-alliances.jpg",
      alt: "",
      caption: "A co-financing agreement, the instrument the alliances run on",
      credit: "Mahfuzul Hasan Bhuiyan",
      source: "",
    },
  },
  "building-resilience": {
    ground: "moss",
    plate: "delta",
    image: {
      src: "/images/strategic-interventions/building-resilience.jpg",
      alt: "",
      caption: "Assets moved ahead of a seasonal flood",
      credit: "Sjors737 / Dreamstime.com",
      source: "",
    },
  },
  "knowledge-communication-advocacy": {
    ground: "ink",
    plate: "weave",
    image: {
      src: "/images/strategic-interventions/knowledge-communication-advocacy.jpg",
      alt: "",
      caption: "The Knowledge Hub, where the evidence is written up and published",
      /* This area closes the grid on a full-width row — a 3.4:1 letterbox
         that wants 2658px across on a 2× display. It is the one slot in the
         set with a real resolution requirement, so it takes the widest file
         available (6000px). The 547px file it replaced is kept beside it as
         `--547px-original.jpg`. */
      credit: "Taymur Reza Ratul",
      source: "",
    },
  },
};
