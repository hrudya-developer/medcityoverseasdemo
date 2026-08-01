"use client";

import {
    Play,
    Volume2,
    VolumeX,
} from "lucide-react";

const VideoCard = ({
    position,
    video,
    dragOffset,
    previewMuted,
    previewVideoRef,
    onOpen,
    onToggleSound,
    onImageError,
    onPreviewError,
}) => {
    const isCenter =
        position === "center";

    const isLeft =
        position === "left";

    const left = isCenter
        ? "50%"
        : isLeft
            ? "20%"
            : "80%";

    const rotateY = isCenter
        ? 0
        : isLeft
            ? 10
            : -10;

    const drag =
        dragOffset *
        (isCenter ? 0.22 : 0.1);

    return (
        <article
            className={`
                absolute top-1/2
                overflow-hidden
                rounded-[26px]
                bg-black
                transition-[left,transform,opacity,box-shadow]
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                ${isCenter
                    ? "z-30 border border-primary/70 opacity-100"
                    : "z-20 border border-white/15 opacity-70"
                }
            `}
            style={{
                left,

                width: isCenter
                    ? "clamp(225px,27vw,320px)"
                    : "clamp(170px,20vw,230px)",

                height: isCenter
                    ? "clamp(350px,40vw,470px)"
                    : "clamp(270px,32vw,360px)",

                transform: `
                    translate(
                        calc(-50% + ${drag}px),
                        -50%
                    )
                    scale(${isCenter ? 1 : 0.88})
                    rotateY(${rotateY}deg)
                    translateZ(0)
                `,

                transformOrigin: "center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",

                boxShadow: isCenter
                    ? "0 24px 60px rgba(0,0,0,.48), 0 0 20px rgba(192,31,83,.22)"
                    : "0 16px 38px rgba(0,0,0,.35)",
            }}
        >
            <button
                type="button"
                onClick={() =>
                    onOpen(video)
                }
                aria-label={`Play ${video.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-[25px] bg-black text-left"
            >
                {isCenter ? (
                    <>
                        <video
                            ref={previewVideoRef}
                            key={video.videoUrl}
                            src={video.videoUrl}
                            poster={video.poster}
                            muted={previewMuted}
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            onError={
                                onPreviewError
                            }
                            className="absolute inset-0 h-full w-full bg-black object-cover"
                        />

                        <img
                            data-video-fallback
                            src={video.poster}
                            alt=""
                            draggable="false"
                            onError={(event) =>
                                onImageError(
                                    event,
                                    video.placeholder
                                )
                            }
                            className="absolute inset-0 hidden h-full w-full object-cover"
                        />
                    </>
                ) : (
                    <img
                        src={video.poster}
                        alt={`${video.title} departure video`}
                        draggable="false"
                        onError={(event) =>
                            onImageError(
                                event,
                                video.placeholder
                            )
                        }
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                <span
                    aria-hidden="true"
                    className={`
                        absolute left-1/2 top-1/2
                        flex -translate-x-1/2
                        -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border border-white/70
                        bg-primary/90 text-white
                        shadow-xl
                        transition duration-300
                        group-hover:scale-110
                        group-hover:bg-secondary
                        ${isCenter
                            ? "h-16 w-16 sm:h-18 sm:w-18"
                            : "h-11 w-11 sm:h-12 sm:w-12"
                        }
                    `}
                >
                    <Play
                        className="ml-1"
                        fill="currentColor"
                        size={
                            isCenter
                                ? 27
                                : 19
                        }
                    />
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
                    <span
                        className={`
                            line-clamp-2
                            font-semibold
                            text-white
                            drop-shadow-lg
                            ${isCenter
                                ? "text-base"
                                : "text-xs sm:text-sm"
                            }
                        `}
                    >
                        {video.title}
                    </span>
                </span>

                <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Video
                </span>

                {isCenter && (
                    <span
                        role="button"
                        tabIndex={0}
                        data-carousel-control
                        aria-label={
                            previewMuted
                                ? "Enable preview sound"
                                : "Mute preview sound"
                        }
                        onClick={
                            onToggleSound
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key ===
                                "Enter" ||
                                event.key === " "
                            ) {
                                onToggleSound(
                                    event
                                );
                            }
                        }}
                        className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg transition hover:bg-black/80"
                    >
                        {previewMuted ? (
                            <VolumeX size={18} />
                        ) : (
                            <Volume2 size={18} />
                        )}
                    </span>
                )}
            </button>
        </article>
    );
};

export default VideoCard;