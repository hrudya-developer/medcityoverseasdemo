"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

const DESKTOP_VIDEO =
    "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const MOBILE_VIDEO =
    "/videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const DESKTOP_POSTER =
    "/assets/hero-desktop-poster.webp";

const MOBILE_POSTER =
    "/assets/hero-mobile-poster.webp";

const MOBILE_QUERY =
    "(max-width: 767px)";

const HeroVideo = () => {
    const videoRef = useRef(null);

    const [isVideoReady, setIsVideoReady] =
        useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const mediaQuery =
            window.matchMedia(
                MOBILE_QUERY
            );

        const reducedMotionQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        const loadCorrectVideo =
            async () => {
                setIsVideoReady(false);

                const nextVideoSource =
                    mediaQuery.matches
                        ? MOBILE_VIDEO
                        : DESKTOP_VIDEO;

                if (
                    video.getAttribute("src") !==
                    nextVideoSource
                ) {
                    video.src =
                        nextVideoSource;

                    video.load();
                }

                if (
                    reducedMotionQuery.matches
                ) {
                    return;
                }

                try {
                    await video.play();
                } catch {
                    // Autoplay can be blocked.
                }
            };

        void loadCorrectVideo();

        mediaQuery.addEventListener(
            "change",
            loadCorrectVideo
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                loadCorrectVideo
            );

            video.pause();
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-black">
            <picture
                aria-hidden="true"
                className={`
          absolute inset-0
          transition-opacity
          duration-300
          ease-out
          ${isVideoReady
                        ? "pointer-events-none opacity-0"
                        : "opacity-100"
                    }
        `}
            >
                <source
                    media={MOBILE_QUERY}
                    srcSet={MOBILE_POSTER}
                />

                <img
                    src={DESKTOP_POSTER}
                    alt=""
                    width={1920}
                    height={1080}
                    fetchPriority="high"
                    decoding="async"
                    className="
            h-full
            w-full
            object-cover
            object-center
            md:object-top
          "
                />
            </picture>

            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-hidden="true"
                tabIndex={-1}
                onLoadedData={() =>
                    setIsVideoReady(true)
                }
                onPlaying={() =>
                    setIsVideoReady(true)
                }
                className={`
          absolute inset-0
          h-full w-full
          object-cover
          object-[center_35%]
          transition-opacity
          duration-300
          ease-out
          md:object-center
          lg:object-top
          ${isVideoReady
                        ? "opacity-100"
                        : "opacity-0"
                    }
        `}
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-black/20
          via-transparent
          to-black/20
          md:from-black/10
          md:to-black/10
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-28
          bg-gradient-to-t
          from-black/45
          via-black/15
          to-transparent
          sm:h-36
          lg:h-44
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-16
          bg-gradient-to-b
          from-black/25
          to-transparent
          md:h-24
        "
            />
        </div>
    );
};

export default HeroVideo;