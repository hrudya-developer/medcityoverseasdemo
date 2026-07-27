"use client";

import { useEffect, useRef } from "react";

const DESKTOP_VIDEO =
    "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const MOBILE_VIDEO =
    "/videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const DESKTOP_POSTER =
    "/assets/hero-desktop-poster.webp";

const MOBILE_POSTER =
    "/assets/hero-mobile-poster.webp";

const HeroVideo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const mediaQuery = window.matchMedia(
            "(max-width: 767px)"
        );

        const loadCorrectVideo = () => {
            video.load();

            video.play().catch(() => {
                // Autoplay may be blocked in some browsers.
            });
        };

        mediaQuery.addEventListener(
            "change",
            loadCorrectVideo
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                loadCorrectVideo
            );
        };
    }, []);

    return (
        <div className="absolute inset-0">
            {/* Responsive poster shown while video loads */}
            <picture aria-hidden="true">
                <source
                    media="(max-width: 767px)"
                    srcSet={MOBILE_POSTER}
                />

                <img
                    src={DESKTOP_POSTER}
                    alt=""
                    width="1920"
                    height="1080"
                    fetchPriority="high"
                    decoding="async"
                    className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-top
          "
                />
            </picture>

            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-hidden="true"
                tabIndex={-1}
                className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-top
        "
            >
                {/* Mobile: below 768px */}
                <source
                    src={MOBILE_VIDEO}
                    type="video/mp4"
                    media="(max-width: 767px)"
                />

                {/* Desktop and tablet: 768px and above */}
                <source
                    src={DESKTOP_VIDEO}
                    type="video/mp4"
                    media="(min-width: 768px)"
                />
            </video>
        </div>
    );
};

export default HeroVideo;