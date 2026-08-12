import {
    Plane,
} from "lucide-react";

export default function DestinationBadge() {
    return (
        <div
            className="absolute left-3 top-3 inline-flex max-w-[calc(100%-70px)] items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:left-4 sm:top-4 sm:px-3.5 sm:py-2 sm:text-[10px]"
        >
            <Plane
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
            />

            <span className="truncate">
                Study Destination
            </span>
        </div>
    );
}