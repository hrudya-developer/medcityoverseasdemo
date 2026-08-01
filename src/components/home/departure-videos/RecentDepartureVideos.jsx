"use client";

import { Play } from "lucide-react";

const RecentDepartureVideos = ({
    videos = [],
    onOpen,
    onImageError,
}) => {
    const recentVideos = videos.slice(0, 4);

    if (!recentVideos.length) {
        return null;
    }

    return (
        <div className="mb-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Recent departures
            </p>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                {recentVideos.map((video) => (
                    <button
                        key={video.id}
                        type="button"
                        onClick={() => onOpen?.(video)}
                        aria-label={`Play ${video.title}`}
                        className="group relative h-[82px] w-[72px] overflow-hidden rounded-xl border border-primary/15 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg sm:h-[92px] sm:w-[82px]"
                    >
                        <img
                            src={video.poster}
                            alt={video.title}
                            draggable="false"
                            onError={(event) =>
                                onImageError?.(
                                    event,
                                    video.placeholder
                                )
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                        <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                            <Play
                                className="ml-0.5 h-4 w-4"
                                fill="currentColor"
                            />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecentDepartureVideos;