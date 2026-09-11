/**
 * Scroll-linked input ranges.
 *
 * Motion hands a `useTransform` of a scroll value straight to the browser as a
 * native scroll/view timeline animation: the input range becomes the WAAPI
 * keyframe `offset` array and the output range becomes the keyframes. That
 * makes two rules non-negotiable, and both of them fail loudly or silently
 * rather than gracefully:
 *
 * 1. Offsets must be monotonically non-decreasing **and inside 0–1**. A
 *    negative offset throws `Failed to execute 'animate' on 'Element'` and
 *    takes the whole page down with it.
 * 2. The range must *span* 0 to 1. An animation whose offsets stop early does
 *    not hold its last value past the end — it replays, so an element that
 *    should have faded out comes back. `clamp: true` does not prevent this,
 *    because clamping happens on the JavaScript path that the native timeline
 *    has replaced.
 *
 * These helpers build ranges that always begin at 0 and end at 1, with flat
 * runs before and after the active window, so the JavaScript and native paths
 * agree.
 */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * A 0 → 1 ramp that runs between `start` and `end`, then holds.
 * Use for anything that should complete once and stay complete.
 */
export function rampRange(start: number, end: number): [number[], number[]] {
  const from = clamp01(start);
  const to = clamp01(Math.max(end, start + 0.001));

  const points: number[] = [0];
  const values: number[] = [0];

  if (from > 0) {
    points.push(from);
    values.push(0);
  }
  points.push(to);
  values.push(1);
  if (to < 1) {
    points.push(1);
    values.push(1);
  }

  return [points, values];
}

/**
 * The window for one item in a sequence of `total`: it arrives, holds the
 * stage, and leaves. The first item is already on stage at the top and the
 * last holds to the end, so the stage is never empty.
 *
 * `from`, `hold` and `to` are the values before arrival, during the hold, and
 * after departure — numbers for opacity and scale, strings for offsets.
 */
export function sequenceWindow<T>(
  index: number,
  total: number,
  [from, hold, to]: [T, T, T]
): [number[], T[]] {
  const span = 1 / total;
  const start = index * span;
  const points: number[] = [0];
  const values: T[] = [];

  // The arrival and departure windows are sized so that one item finishes
  // leaving exactly as the next begins to arrive: 0.94 of a span is also
  // (next span) − 0.06. Overlapping them cross-fades two words at display
  // size on top of each other, which is unreadable rather than cinematic.
  if (index === 0) {
    values.push(hold);
  } else {
    values.push(from);
    points.push(clamp01(start - span * 0.06), clamp01(start + span * 0.06));
    values.push(from, hold);
  }

  if (index === total - 1) {
    points.push(1);
    values.push(hold);
  } else {
    points.push(clamp01(start + span * 0.8), clamp01(start + span * 0.94), 1);
    values.push(hold, to, to);
  }

  return [points, values];
}
