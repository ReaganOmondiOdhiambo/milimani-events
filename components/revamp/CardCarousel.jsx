"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CardCarousel({ children, autoPlay = false, intervalMs = 4200 }) {
  const railRef = useRef(null);

  const scrollByAmount = (direction) => {
    if (!railRef.current) return;

    const width = railRef.current.clientWidth;
    railRef.current.scrollBy({
      left: direction * Math.max(width * 0.72, 320),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!autoPlay || !railRef.current) return undefined;

    const interval = window.setInterval(() => {
      if (!railRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (scrollLeft >= maxScrollLeft - 16) {
        railRef.current.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scrollByAmount(1);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [autoPlay, intervalMs]);

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition hover:border-black/20"
          aria-label="Scroll cards left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition hover:border-black/20"
          aria-label="Scroll cards right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
