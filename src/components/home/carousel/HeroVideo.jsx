"use client";

const YOUTUBE_VIDEO_ID = "eLdVVDgkYmU";

export default function HeroVideo() {
  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
    >
      {/* YOUTUBE VIDEO */}
      <iframe
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&rel=0&playsinline=1`}
        title="Hero background video"
        allow="autoplay; encrypted-media; picture-in-picture"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[56.25vw]
          min-h-full
          w-[177.78vh]
          min-w-full
          -translate-x-1/2
          -translate-y-1/2
          border-0
        "
      />

      {/* LEFT / RIGHT OVERLAY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/20
          via-transparent
          to-black/20
          md:from-black/10
          md:to-black/10
        "
      />

      {/* BOTTOM OVERLAY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-28
          bg-gradient-to-t
          from-black/45
          via-black/15
          to-transparent
          sm:h-36
          lg:h-44
        "
      />

      {/* TOP OVERLAY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-16
          bg-gradient-to-b
          from-black/25
          to-transparent
          md:h-24
        "
      />
    </div>
  );
}