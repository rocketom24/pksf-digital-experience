"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export type CarouselItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type InteractiveCarouselProps = {
  items: CarouselItem[];
  ariaLabel: string;
  className?: string;
};

/**
 * Single native scroll-snap track underlies everything: touch swipe and
 * trackpad scroll work for free, mouse click-drag is added on top, and
 * the prev/next buttons plus arrow keys just move the same scroll
 * position — so there's one source of truth, not three separate
 * "carousel" implementations to keep in sync.
 */
export function InteractiveCarousel({ items, ariaLabel, className = "" }: InteractiveCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragState = useRef<{ startX: number; startScroll: number } | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = itemRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { root: track, threshold: [0.6] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  function scrollToIndex(index: number) {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    itemRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !trackRef.current) return;
    dragState.current = { startX: event.clientX, startScroll: trackRef.current.scrollLeft };
    trackRef.current.setPointerCapture(event.pointerId);
  }
  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current || !trackRef.current) return;
    trackRef.current.scrollLeft = dragState.current.startScroll - (event.clientX - dragState.current.startX);
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  }

  return (
    <div className={className}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        data-cursor="carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[10vw] py-6 focus-visible:outline-2 focus-visible:outline-green active:cursor-grabbing motion-reduce:scroll-auto sm:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}: ${item.label}`}
            className={`w-[70vw] shrink-0 snap-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:w-[45vw] lg:w-[30vw] ${
              i === activeIndex ? "scale-100 opacity-100" : "scale-90 opacity-50"
            }`}
          >
            {item.content}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between px-[10vw] sm:px-0">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
            className="rounded-full border border-ink/20 px-4 py-2 text-sm transition-colors hover:border-ink disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-green"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            aria-label="Next slide"
            className="rounded-full border border-ink/20 px-4 py-2 text-sm transition-colors hover:border-ink disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-green"
          >
            →
          </button>
        </div>
        <p aria-live="polite" className="text-sm text-muted">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}
