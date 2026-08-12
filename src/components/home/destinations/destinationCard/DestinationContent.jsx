import {
    ArrowRight,
    Building2,
    Globe2,
    Plane,
} from "lucide-react";

import DestinationDecorations from "./DestinationDecorations";

import cn from "@/lib/cn";

export default function DestinationContent({
    country,
    headingId,
}) {
    return (
        <div
            className="relative z-10 flex min-h-[285px] flex-1 flex-col overflow-hidden bg-gradient-to-br from-white via-[#fff8fb] to-[#eef7ff] px-4 pb-5 pt-5 sm:min-h-[300px] sm:px-6 sm:pb-6 sm:pt-6"
        >
            <DestinationDecorations />

            <ContentHeading
                country={country}
                headingId={headingId}
            />

            <DestinationDescription
                country={country}
            />

            <DestinationTags />

            <div
                aria-hidden="true"
                className="relative z-10 mb-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"
            />

            <DestinationAction
                country={country}
            />
        </div>
    );
}

function ContentHeading({
    country,
    headingId,
}) {
    return (
        <div
            className="relative z-10 mb-4 flex items-center gap-3"
        >
            <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary sm:h-11 sm:w-11 sm:rounded-2xl"
            >
                <Building2
                    className="h-5 w-5"
                    strokeWidth={2.2}
                />
            </span>

            <div className="min-w-0">
                <p
                    className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]"
                >
                    International education
                </p>

                <h3
                    id={headingId}
                    className="truncate text-base font-extrabold text-darkPrimary sm:text-lg"
                >
                    Study in {country}
                </h3>
            </div>
        </div>
    );
}

function DestinationDescription({
    country,
}) {
    return (
        <p
            className="relative z-10 mb-5 text-sm leading-6 text-slate-600"
        >
            Discover quality education, leading
            institutions and exciting career
            opportunities in{" "}
            <span className="font-semibold text-slate-700">
                {country}
            </span>
            .
        </p>
    );
}

function DestinationTags() {
    return (
        <div
            className="relative z-10 mb-6 flex flex-wrap gap-2"
        >
            <DestinationTag
                icon={Building2}
                label="Top Universities"
                className="border-primary/10 bg-primary/[0.06] text-primary"
            />

            <DestinationTag
                icon={Globe2}
                label="Global Opportunities"
                className="border-secondary/10 bg-secondary/[0.06] text-secondary"
            />
        </div>
    );
}

function DestinationTag({
    icon: Icon,
    label,
    className = "",
}) {
    return (
        <span
            className={cn(`
                inline-flex
                min-w-0
                items-center
                gap-1.5
                rounded-full
                border
                px-3
                py-1.5
                text-[10px]
                font-bold
                sm:text-[11px]
                ${className}
            `)}
        >
            <Icon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
                strokeWidth={2.2}
            />

            <span className="whitespace-nowrap">
                {label}
            </span>
        </span>
    );
}

function DestinationAction({
    country,
}) {
    return (
        <div
            className="relative z-10 mt-auto flex items-center justify-between gap-3"
        >
            <div className="min-w-0">
                <p
                    className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]"
                >
                    Explore destination
                </p>

                <p
                    className="mt-0.5 truncate text-sm font-extrabold text-darkPrimary transition-colors duration-300 group-hover:text-primary"
                >
                    View {country}
                </p>
            </div>

            <span
                aria-hidden="true"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-[#084f86] px-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(4,102,175,0.25)] transition-all duration-300 group-hover:translate-x-1 group-hover:from-primary group-hover:to-darkPrimary group-hover:shadow-[0_12px_30px_rgba(192,31,83,0.28)] sm:h-12 sm:rounded-2xl sm:px-4"
            >
                <span className="hidden sm:inline">
                    Explore
                </span>

                <ArrowRight
                    className="h-5 w-5"
                    strokeWidth={2.4}
                />
            </span>
        </div>
    );
}