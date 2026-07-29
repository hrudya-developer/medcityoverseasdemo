import Image from "next/image";

import {
    ArrowRight,
    Play,
} from "lucide-react";

import {
    getYouTubeThumbnail,
} from "./germanProgramsHelpers";

export default function AusbildungVideoCard({
    video,
    index,
}) {
    const title =
        video?.title ||
        `Ausbildung Video ${index + 1}`;

    const thumbnail =
        getYouTubeThumbnail(video);

    return (
        <a
            href={video?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${title} on YouTube`}
            className="
                group/video
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-[0_14px_40px_rgba(15,23,42,0.10)]
                transition
                duration-300
                hover:-translate-y-2
                hover:border-primary/30
                hover:shadow-[0_24px_55px_rgba(99,26,51,0.18)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
            "
        >
            <div
                className="
                    relative
                    aspect-video
                    overflow-hidden
                    bg-black
                "
            >
                <Image
                    src={thumbnail}
                    alt={`${title} video thumbnail`}
                    fill
                    sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1023px) 50vw,
                        33vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover/video:scale-105
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-black/10
                        to-transparent
                    "
                />

                <span
                    aria-hidden="true"
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        grid
                        h-16
                        w-16
                        -translate-x-1/2
                        -translate-y-1/2
                        place-items-center
                        rounded-full
                        bg-primary
                        text-white
                        shadow-2xl
                        transition
                        group-hover/video:scale-110
                        group-hover/video:bg-darkPrimary
                    "
                >
                    <Play
                        className="
                            ml-1
                            fill-current
                        "
                        size={25}
                    />
                </span>

                <span
                    className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-white/90
                        px-3
                        py-1.5
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-darkPrimary
                        backdrop-blur
                    "
                >
                    Ausbildung
                </span>
            </div>

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-5
                "
            >
                <h4
                    className="
                        line-clamp-2
                        text-base
                        font-extrabold
                        text-slate-950
                    "
                >
                    {title}
                </h4>

                {video?.description && (
                    <p
                        className="
                            mt-3
                            line-clamp-2
                            text-sm
                            leading-6
                            text-slate-600
                        "
                    >
                        {video.description}
                    </p>
                )}

                <span
                    className="
                        mt-auto
                        inline-flex
                        items-center
                        gap-2
                        pt-5
                        text-sm
                        font-bold
                        text-primary
                    "
                >
                    Watch Video

                    <ArrowRight
                        aria-hidden="true"
                        size={17}
                        className="
                            transition-transform
                            group-hover/video:translate-x-1
                        "
                    />
                </span>
            </div>
        </a>
    );
}