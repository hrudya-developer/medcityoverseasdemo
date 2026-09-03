"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import Image from "next/image";

import {
    Plane,
    Play,
} from "lucide-react";

import VideoCarousel from "./VideoCarousel";
import VideoModal from "./VideoModal";

import {
    EmptyState,
    ErrorState,
    LoadingState,
} from "./VideoState";

import useCarouselController from "./hooks/useCarouselController";
import useDepartureVideos from "./hooks/useDepartureVideos";

import {
    FALLBACK,
} from "./utils/videoUtils";

/* =========================================================
   RECENT DEPARTURE THUMBNAIL
========================================================= */

function RecentDepartureThumbnail({
    video,
    onOpen,
}) {
    const [
        imageSrc,
        setImageSrc,
    ] = useState(
        video?.poster ||
            video?.placeholder ||
            FALLBACK
    );

    useEffect(() => {
        setImageSrc(
            video?.poster ||
                video?.placeholder ||
                FALLBACK
        );
    }, [
        video?.poster,
        video?.placeholder,
    ]);

    const handleImageError =
        () => {
            if (
                imageSrc !==
                    video?.placeholder &&
                video?.placeholder
            ) {
                setImageSrc(
                    video.placeholder
                );

                return;
            }

            if (
                imageSrc !== FALLBACK
            ) {
                setImageSrc(
                    FALLBACK
                );
            }
        };

    return (
        <button
            type="button"
            onClick={() =>
                onOpen(video)
            }
            aria-label={`Play ${
                video?.title ||
                "departure video"
            }`}
            className="
                group
                relative
                h-[88px]
                w-[78px]
                overflow-hidden
                rounded-xl
                border
                border-white/15
                bg-white/10
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/70
                hover:shadow-[0_15px_35px_rgba(192,31,83,0.22)]
            "
        >
            <Image
                src={imageSrc}
                alt={
                    video?.title ||
                    "Medcity Overseas student departure"
                }
                fill
                sizes="78px"
                onError={
                    handleImageError
                }
                className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                "
            />

            <span
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    bg-black/25
                    transition-colors
                    duration-300
                    group-hover:bg-black/35
                "
            />

            <span
                aria-hidden="true"
                className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-8
                    w-8
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-primary
                    shadow-lg
                    transition-all
                    duration-300

                    group-hover:scale-110
                    group-hover:bg-primary
                    group-hover:text-white
                "
            >
                <Play
                    className="
                        ml-0.5
                        h-4
                        w-4
                    "
                    fill="currentColor"
                />
            </span>
        </button>
    );
}

/* =========================================================
   MAIN SECTION
========================================================= */

const DepartureStoriesSection =
    () => {
        const {
            videos,
            loading,
            error,
        } =
            useDepartureVideos();

        const [
            selectedVideo,
            setSelectedVideo,
        ] = useState(null);

        const [
            previewMuted,
            setPreviewMuted,
        ] = useState(true);

        const previewVideoRef =
            useRef(null);

        const controller =
            useCarouselController(
                videos,
                Boolean(
                    selectedVideo
                )
            );

        const {
            activeIndex,
            hasDraggedRef,
            stopAutoplay,
        } = controller;

        /* =====================================================
           PREVIEW VIDEO
        ===================================================== */

        useEffect(() => {
            const preview =
                previewVideoRef.current;

            if (
                !preview ||
                selectedVideo
            ) {
                return;
            }

            preview.currentTime =
                0;

            preview.muted =
                previewMuted;

            preview
                .play()
                .catch(
                    () => {}
                );
        }, [
            activeIndex,
            previewMuted,
            selectedVideo,
        ]);

        /* =====================================================
           OPEN VIDEO
        ===================================================== */

        const openVideo =
            useCallback(
                (video) => {
                    if (
                        !video?.videoUrl
                    ) {
                        return;
                    }

                    if (
                        hasDraggedRef.current
                    ) {
                        return;
                    }

                    stopAutoplay();

                    previewVideoRef.current?.pause();

                    setSelectedVideo(
                        video
                    );
                },
                [
                    hasDraggedRef,
                    stopAutoplay,
                ]
            );

        /* =====================================================
           CLOSE VIDEO
        ===================================================== */

        const closeVideo =
            useCallback(
                () => {
                    setSelectedVideo(
                        null
                    );
                },
                []
            );

        /* =====================================================
           PREVIEW SOUND
        ===================================================== */

        const togglePreviewSound =
            useCallback(
                (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setPreviewMuted(
                        (
                            current
                        ) => {
                            const next =
                                !current;

                            const preview =
                                previewVideoRef.current;

                            if (
                                preview
                            ) {
                                preview.muted =
                                    next;

                                if (
                                    !next
                                ) {
                                    preview
                                        .play()
                                        .catch(
                                            () =>
                                                {}
                                        );
                                }
                            }

                            return next;
                        }
                    );
                },
                []
            );

        /* =====================================================
           CAROUSEL IMAGE FALLBACK
        ===================================================== */

        const handleImageError =
            useCallback(
                (
                    event,
                    placeholder
                ) => {
                    const image =
                        event.currentTarget;

                    if (
                        placeholder &&
                        image.dataset
                            .fallback !==
                            "placeholder"
                    ) {
                        image.dataset.fallback =
                            "placeholder";

                        image.src =
                            placeholder;

                        return;
                    }

                    if (
                        image.dataset
                            .fallback !==
                        "final"
                    ) {
                        image.dataset.fallback =
                            "final";

                        image.src =
                            FALLBACK;
                    }
                },
                []
            );

        /* =====================================================
           PREVIEW ERROR
        ===================================================== */

        const handlePreviewError =
            useCallback(
                (event) => {
                    const preview =
                        event.currentTarget;

                    preview.style.display =
                        "none";

                    const fallback =
                        preview.parentElement?.querySelector(
                            "[data-video-fallback]"
                        );

                    if (
                        fallback
                    ) {
                        fallback.style.display =
                            "block";
                    }
                },
                []
            );

        /* =====================================================
           RECENT VIDEOS
        ===================================================== */

        const recentVideos =
            videos.slice(
                0,
                4
            );

        return (
            <section
                id="departure-stories"
                aria-labelledby="departure-stories-heading"
                className="
                    relative
                    isolate
                    overflow-hidden
                    bg-[#070b1d]
                    bg-fixed
                    py-12
                    lg:py-14
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(255,255,255,.045) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(255,255,255,.045) 1px,
                            transparent 1px
                        ),
                        radial-gradient(
                            circle at 20% 20%,
                            rgba(192,31,83,.18),
                            transparent 40%
                        ),
                        radial-gradient(
                            circle at 85% 30%,
                            rgba(4,102,175,.18),
                            transparent 45%
                        ),
                        linear-gradient(
                            180deg,
                            #06091b 0%,
                            #090d23 50%,
                            #06091b 100%
                        )
                    `,
                    backgroundSize:
                        "42px 42px, 42px 42px, 100% 100%, 100% 100%, 100% 100%",
                }}
            >
                {/* =============================================
                    BACKGROUND DECORATION
                ============================================= */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -left-24
                        top-0
                        h-72
                        w-72
                        rounded-full
                        bg-primary/10
                        blur-[110px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-24
                        bottom-0
                        h-80
                        w-80
                        rounded-full
                        bg-secondary/10
                        blur-[120px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-px
                        w-[70%]
                        -translate-x-1/2
                        bg-gradient-to-r
                        from-transparent
                        via-white/15
                        to-transparent
                    "
                />

                {/* =============================================
                    CONTENT
                ============================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        grid
                        w-full
                        max-w-9xl
                        items-center
                        gap-10
                        px-5
                        sm:px-8
                        lg:grid-cols-[0.78fr_1.22fr]
                        lg:gap-8
                        lg:px-10
                        xl:px-14
                    "
                    data-aos="fade-up"
                >
                    {/* =========================================
                        LEFT CONTENT
                    ========================================= */}

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-xl
                            text-center
                            lg:mx-0
                            lg:text-left
                        "
                    >
                        {/* Label */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/15
                                bg-white/[0.08]
                                px-4
                                py-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-white
                                shadow-sm
                                backdrop-blur-md
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-primary/15
                                "
                            >
                                <Plane
                                    className="
                                        h-4
                                        w-4
                                        text-[#ff6f9f]
                                    "
                                />
                            </span>

                            Departure
                            Stories
                        </div>

                        {/* Heading */}

                        <h2
                            id="departure-stories-heading"
                            className="
                                mt-5
                                text-3xl
                                font-extrabold
                                leading-[1.08]
                                tracking-tight
                                text-white
                                sm:text-4xl
                                md:text-5xl
                                lg:text-5xl
                            "
                        >
                            <span className="block">
                                Departures
                                Today,
                                <span className="sr-only">
                                    {" "}
                                </span>
                            </span>

                            <span
                                className="
                                    mt-2
                                    block
                                    bg-gradient-to-r
                                    from-[#ff4f86]
                                    via-[#b66cff]
                                    to-[#55b8ff]
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                Dreams
                                Taking Off
                            </span>
                        </h2>

                        {/* Description */}

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-lg
                                text-sm
                                font-medium
                                leading-7
                                text-white/65
                                sm:text-base
                                lg:mx-0
                                lg:text-lg
                                lg:leading-8
                            "
                        >
                            Watch our
                            students take
                            the next big
                            step toward
                            their future.
                            New
                            destinations,
                            new
                            beginnings,
                            and endless
                            possibilities.
                        </p>

                        {/* CTA */}

                        <a
                            href="#departure-videos"
                            className="
                                mx-auto
                                mt-7
                                inline-flex
                                items-center
                                justify-center
                                gap-3
                                rounded-xl
                                bg-gradient-to-r
                                from-primary
                                to-secondary
                                px-6
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-primary/20
                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-xl
                                lg:mx-0
                            "
                        >
                            <Play
                                className="
                                    h-4
                                    w-4
                                "
                                fill="currentColor"
                            />

                            Watch
                            Departure
                            Videos
                        </a>

                        {/* =====================================
                            RECENT DEPARTURES
                        ===================================== */}

                        {!loading &&
                            recentVideos.length >
                                0 && (
                                <div className="mt-8">
                                    <div
                                        className="
                                            mb-3
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            lg:justify-start
                                        "
                                    >
                                        <span
                                            className="
                                                h-1.5
                                                w-1.5
                                                rounded-full
                                                bg-[#ff6f9f]
                                            "
                                        />

                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-[0.18em]
                                                text-white/45
                                            "
                                        >
                                            Recent
                                            Departures
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            justify-center
                                            gap-3
                                            lg:justify-start
                                        "
                                    >
                                        {recentVideos.map(
                                            (
                                                video
                                            ) => (
                                                <RecentDepartureThumbnail
                                                    key={
                                                        video.id
                                                    }
                                                    video={
                                                        video
                                                    }
                                                    onOpen={
                                                        openVideo
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    {/* =========================================
                        VIDEO CAROUSEL
                    ========================================= */}

                    <div
                        id="departure-videos"
                        className="
                            min-w-0
                            scroll-mt-24
                        "
                    >
                        {loading ? (
                            <LoadingState />
                        ) : error ? (
                            <ErrorState
                                message={
                                    error
                                }
                            />
                        ) : !videos.length ? (
                            <EmptyState />
                        ) : (
                            <VideoCarousel
                                videos={
                                    videos
                                }
                                controller={
                                    controller
                                }
                                onOpen={
                                    openVideo
                                }
                                onImageError={
                                    handleImageError
                                }
                            />
                        )}
                    </div>
                </div>

                {/* =============================================
                    MODAL
                ============================================= */}

                <VideoModal
                    video={
                        selectedVideo
                    }
                    onClose={
                        closeVideo
                    }
                />
            </section>
        );
    };

export default DepartureStoriesSection;