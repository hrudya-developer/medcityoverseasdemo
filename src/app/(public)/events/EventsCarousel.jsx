"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsCarousel({ children, label, count }) {
  const trackRef = useRef(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanPrevious(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    Array.from(track.children).forEach((child) => observer.observe(child));
    updateControls();
    return () => observer.disconnect();
  }, [count, updateControls]);

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-end gap-2">
        <span className="mr-2 text-xs font-medium text-slate-500">Browse events</span>
        <button type="button" onClick={() => move(-1)} disabled={!canPrevious}
          aria-label={`Previous ${label}`} className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102044] shadow-sm transition hover:border-[#c01854] hover:text-[#c01854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c01854] disabled:cursor-not-allowed disabled:opacity-35">
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => move(1)} disabled={!canNext}
          aria-label={`Next ${label}`} className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#102044] shadow-sm transition hover:border-[#c01854] hover:text-[#c01854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c01854] disabled:cursor-not-allowed disabled:opacity-35">
          <ChevronRight size={20} />
        </button>
      </div>
      <ul ref={trackRef} onScroll={updateControls} aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </ul>
    </div>
  );
}
