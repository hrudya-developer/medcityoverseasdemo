"use client";

import { useEffect, useRef } from "react";

const YOUTUBE_VIDEO_ID = "eLdVVDgkYmU";
const MAX_PLAYS = 2;

export default function HeroVideo() {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const playCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (
        cancelled ||
        !playerContainerRef.current ||
        !window.YT?.Player
      ) {
        return;
      }

      playerRef.current = new window.YT.Player(
        playerContainerRef.current,
        {
          videoId: YOUTUBE_VIDEO_ID,

          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            playsinline: 1,
            rel: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
          },

          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();
            },

            onStateChange: (event) => {
              if (
                event.data === window.YT.PlayerState.ENDED
              ) {
                playCountRef.current += 1;

                if (playCountRef.current < MAX_PLAYS) {
                  event.target.seekTo(0);
                  event.target.playVideo();
                }
              }
            },
          },
        }
      );
    };

    // YouTube API already loaded
    if (window.YT?.Player) {
      createPlayer();
    } else {
      // Load YouTube IFrame API only once
      if (
        !document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        )
      ) {
        const script = document.createElement("script");

        script.src =
          "https://www.youtube.com/iframe_api";

        script.async = true;

        document.body.appendChild(script);
      }

      const previousCallback =
        window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) {
          previousCallback();
        }

        createPlayer();
      };
    }

    return () => {
      cancelled = true;

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = null;
    };
  }, []);

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        bg-black
      "
    >
      {/* =========================================
          YOUTUBE BACKGROUND VIDEO
      ========================================== */}

      <div
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
        "
      >
        <div
          ref={playerContainerRef}
          className="
            absolute
            inset-0
            h-full
            w-full
          "
        />
      </div>

      {/* =========================================
          SIDE OVERLAY
      ========================================== */}

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

      {/* =========================================
          BOTTOM OVERLAY
      ========================================== */}

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

      {/* =========================================
          TOP OVERLAY
      ========================================== */}

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