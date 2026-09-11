/**
 * The delta geometry.
 *
 * PKSF's one unambiguous structural fact is that it does not reach
 * communities directly: it funds and equips a network of Partner
 * Organisations who do. That is the shape of a river delta — one channel
 * upstream, distributaries that divide, a coastline where the water finally
 * meets the land — and it is also the defining geography of the country the
 * institution works in. So the page's recurring visual is a delta rather
 * than a decorative flourish: each generation of branching is a real step in
 * the relay, and the stroke thins downstream because that is what happens to
 * a distributary.
 *
 * Paths are generated rather than hand-authored so one set of rules drives
 * every appearance (hero, model, interventions, timeline) at whatever depth
 * a section needs.
 */

export type Channel = {
  d: string;
  /** 0 = trunk. Used for stroke weight and draw order. */
  generation: number;
  /** Normalised x of the downstream end, 0–1. Lets callers hang labels off a channel. */
  outlet: number;
};

const VIEW = 1000;

/**
 * Integer-only hash → [0, 1). `Math.random` would differ between the server
 * and client render and `Math.sin` is allowed to differ in precision across
 * engines; both produce a hydration mismatch. This is bit-exact everywhere.
 */
function rand(n: number): number {
  let x = (Math.imul(n, 1664525) + 1013904223) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  x ^= x >>> 13;
  return x / 4294967296;
}

/**
 * The branch from a junction to its outlet.
 *
 * The two control offsets are deliberately unequal. Symmetric ones put a
 * vertical tangent at both ends, so a pair of siblings leaving the same
 * junction meets in a sharp cusp and the drawing reads as an antenna rather
 * than a river. A short lead-out and a long lead-in make the channel diverge
 * quickly and then straighten, which is what a distributary actually does.
 */
function curve(x0: number, y0: number, x1: number, y1: number): string {
  const dy = y1 - y0;
  const out = dy * 0.16;
  const into = dy * 0.55;
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}C${x0.toFixed(1)} ${(y0 + out).toFixed(1)} ${x1.toFixed(
    1
  )} ${(y1 - into).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

export type DeltaOptions = {
  /**
   * How many ways each generation divides. `[6, 3]` is one channel becoming
   * six, each of those becoming three — the shape the relay section needs,
   * where the middle band is the Partner Organisation network.
   */
  branching?: number[];
  /** Horizontal reach of the first split, in viewBox units. */
  spread?: number;
  /** Where the trunk enters, 0–1 across the viewBox. */
  origin?: number;
  /** Changes the jitter without changing the structure. */
  seed?: number;
};

/** Downstream y of each generation boundary, as a 0–1 fraction of the height. */
export const generationDepth = (generation: number, generations: number) =>
  (generation + 1) / generations;

/**
 * Builds a delta over a 1000×1000 viewBox, flowing top → bottom.
 * Returns every channel, tagged with the generation that produced it.
 */
export function buildDelta({
  branching = [2, 2, 2],
  spread = 820,
  origin = 0.5,
  seed = 1,
}: DeltaOptions = {}): Channel[] {
  const channels: Channel[] = [];
  let nodes = [{ x: origin * VIEW, y: 0, spread }];
  const generations = branching.length;
  const stepY = VIEW / generations;
  let n = seed * 977;

  for (let g = 0; g < generations; g++) {
    const y1 = (g + 1) * stepY;
    const kids = Math.max(1, branching[g]);
    const next: typeof nodes = [];

    for (const node of nodes) {
      for (let k = 0; k < kids; k++) {
        // -1 … 1 across the node's own spread, so children fan out evenly
        // before the jitter is applied.
        const t = kids === 1 ? 0 : (k / (kids - 1)) * 2 - 1;
        // 0.6–1.0 of the nominal reach: enough variance that the result
        // reads as a river rather than as a binary tree diagram.
        const jitter = 0.6 + rand(n++) * 0.4;
        const x1 = node.x + t * node.spread * 0.5 * jitter;
        channels.push({ d: curve(node.x, node.y, x1, y1), generation: g, outlet: x1 / VIEW });
        next.push({ x: x1, y: y1, spread: (node.spread / kids) * 1.2 });
      }
    }
    nodes = next;
  }

  return channels;
}

/** Stroke weight thins downstream, as a distributary does. */
export const channelWidth = (generation: number) => Math.max(1.1, 3.4 - generation * 0.85);

/** Upstream channels carry more water, so they sit slightly heavier. */
export const channelOpacity = (generation: number) => Math.max(0.34, 0.92 - generation * 0.2);

export const DELTA_VIEWBOX = `0 0 ${VIEW} ${VIEW}`;
