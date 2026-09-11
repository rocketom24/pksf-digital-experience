"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { GROUND, type Ground } from "@/components/editorial/grounds";
import { Meta } from "@/components/editorial/SectionHead";
import { rampRange, sequenceWindow } from "@/components/motion/scrollRange";

export type StatementWord = {
  word: string;
  /** One line saying what the word means here. Never a slogan. */
  gloss: string;
};

type StatementSequenceProps = {
  words: StatementWord[];
  label: string;
  ground?: Ground;
  /** Provenance line, rendered under the sequence. */
  footnote?: ReactNode;
};

/**
 * The full-screen statement.
 *
 * A tall track with a sticky stage inside it: the page scrolls natively the
 * whole way — nothing is intercepted, no wheel handler, no scroll-jacking —
 * and scroll position simply selects which word holds the stage. The user
 * can fling past it, scrollbar-drag through it, or land in the middle of it
 * from an anchor, and it resolves correctly in every case because position
 * is read continuously rather than latched by an intersection event.
 *
 * Under reduced motion the track collapses to the same words set as a plain
 * stacked list. The content is identical; only the choreography is gone. That
 * swap is made in CSS, not by branching on `useReducedMotion`: the server has
 * no way to know the preference, so a JavaScript branch renders one tree on
 * the server and the other on the client, and React discards the whole
 * subtree with a hydration error.
 */
export function StatementSequence({
  words,
  label,
  ground = "ink",
  footnote,
}: StatementSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const g = GROUND[ground];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <>
      {/* Reduced motion: the same words, stacked and static. `hidden` by
          default so the track costs no layout height when it is not the
          active composition. */}
      <div className="hidden px-4.5 py-28 motion-reduce:block md:px-12">
        <Meta ground={ground}>{label}</Meta>
        <ul className="mt-12 space-y-12">
          {words.map((item) => (
            <li key={item.word}>
              <p className="font-display text-display font-semibold uppercase">{item.word}</p>
              <p className={`mt-4 max-w-md text-lead ${g.muted}`}>{item.gloss}</p>
            </li>
          ))}
        </ul>
        {footnote && <div className="mt-12">{footnote}</div>}
      </div>

      {/* 100vh of track per word, plus one for the exit. Any less and the
          words change faster than they can be read on a trackpad. */}
      <div
        ref={ref}
        className="relative motion-reduce:hidden"
        style={{ height: `${words.length * 100 + 40}vh` }}
      >
        {/* A flow column rather than absolutely-placed corners: the footnote is
            several lines long on a phone, and fixed offsets put it straight
            through the progress rule. */}
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-4.5 pb-8 pt-24 md:px-12 md:pb-12 md:pt-28">
          <Meta ground={ground}>{label}</Meta>

          <div className="flex flex-1 items-center">
            {/* The words are stacked in one grid cell, so the box is sized by
                the tallest of them and nothing reflows as they swap. */}
            <ul className="grid w-full">
              {words.map((item, i) => (
                <StatementLine
                  key={item.word}
                  item={item}
                  index={i}
                  total={words.length}
                  progress={scrollYProgress}
                  ground={ground}
                />
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <ol aria-hidden="true" className="flex gap-2">
              {words.map((item, i) => (
                <ProgressTick
                  key={item.word}
                  index={i}
                  total={words.length}
                  progress={scrollYProgress}
                  ground={ground}
                />
              ))}
            </ol>
            {footnote && <div className="mt-5">{footnote}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

type LineProps = {
  item: StatementWord;
  index: number;
  total: number;
  progress: MotionValue<number>;
  ground: Ground;
};

/** One word's turn on the stage. Own component so each owns its own hooks. */
function StatementLine({ item, index, total, progress, ground }: LineProps) {
  const g = GROUND[ground];

  const [fadePoints, fadeValues] = sequenceWindow<number>(index, total, [0, 1, 0]);
  const [movePoints, moveValues] = sequenceWindow<string>(index, total, ["14%", "0%", "-14%"]);
  const [zoomPoints, zoomValues] = sequenceWindow<number>(index, total, [1.06, 1, 0.97]);

  const opacity = useTransform(progress, fadePoints, fadeValues, { clamp: true });
  const y = useTransform(progress, movePoints, moveValues, { clamp: true });
  const scale = useTransform(progress, zoomPoints, zoomValues, { clamp: true });

  return (
    <li className="col-start-1 row-start-1">
      <motion.div style={{ opacity, y, scale }} className="origin-left">
        <p className="font-display text-statement font-bold uppercase">{item.word}</p>
        <p className={`mt-6 max-w-md text-lead md:mt-10 ${g.muted}`}>{item.gloss}</p>
      </motion.div>
    </li>
  );
}

type TickProps = { index: number; total: number; progress: MotionValue<number>; ground: Ground };

function ProgressTick({ index, total, progress, ground }: TickProps) {
  const span = 1 / total;
  const [points, values] = rampRange(index * span, (index + 1) * span);
  const scaleX = useTransform(progress, points, values, { clamp: true });

  return (
    <li className={`h-px flex-1 ${GROUND[ground].rule}`}>
      <motion.span
        style={{ scaleX }}
        className="block h-full origin-left bg-current opacity-80"
      />
    </li>
  );
}
