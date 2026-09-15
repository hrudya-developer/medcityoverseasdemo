"use client";

const YOUTUBE_VIDEO_ID = "eLdVVDgkYmU";

export default function HeroVideo() {
  const videoUrl =
    `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}` +
    `?autoplay=1` +
    `&mute=1` +
    `&loop=1` +
    `&playlist=${YOUTUBE_VIDEO_ID}` +
    `&controls=0` +
    `&playsinline=1` +
    `&rel=0` +
    `&modestbranding=1` +
    `&disablekb=1` +
    `&fs=0` +
    `&iv_load_policy=3`;

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
    >
      {/* =================================================
          YOUTUBE BACKGROUND VIDEO
      ================================================= */}

      <iframe
        src={videoUrl}
        title="Hero background video"
        allow="autoplay; encrypted-media"
        aria-hidden="true"
        tabIndex={-1}
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

      {/* =================================================
          SIDE OVERLAY
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-gradient-to-r
          from-black/15
          via-transparent
          to-black/15

          md:from-black/10
          md:to-black/10
        "
      />

      {/* =================================================
          BOTTOM OVERLAY
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0

          h-28

          bg-gradient-to-t
          from-black/35
          via-black/10
          to-transparent

          sm:h-36
          lg:h-44
        "
      />

      {/* =================================================
          TOP OVERLAY
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-20

          bg-gradient-to-b
          from-black/20
          to-transparent

          md:h-24
        "
      />
    </div>
  );
}