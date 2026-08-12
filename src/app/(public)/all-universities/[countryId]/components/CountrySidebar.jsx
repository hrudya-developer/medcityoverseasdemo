"use client";

import { useState } from "react";

import cn from "@/lib/cn";

import {
    Globe2,
    LoaderCircle,
    MapPin,
    RefreshCw,
} from "lucide-react";

import {
    getDestinationFlagUrl,
    getDestinationId,
    getDestinationName,
} from "../lib/universityUtils";

const CountrySidebar = ({
    destinations = [],
    destinationImagePath = "",
    selectedCountryId,
    loading = false,
    error = false,
    onCountryChange,
    onRetry,
}) => {
    return (
        <aside
            aria-label="Study destinations"
            className="h-fit min-w-0 lg:sticky lg:top-24"
        >
            <div
                className="min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
                <SidebarHeader
                    destinationCount={destinations.length}
                />

                <div
                    className="min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain p-3 [scrollbar-color:#c01f53_#f1f5f9] [scrollbar-width:thin] lg:max-h-[560px] lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-y-contain"
                >
                    {loading ? (
                        <SidebarLoading />
                    ) : error ? (
                        <SidebarError
                            onRetry={onRetry}
                        />
                    ) : destinations.length > 0 ? (
                        <nav aria-label="Country selection">
                            <ul
                                className="flex w-max min-w-full items-center gap-2 lg:block lg:w-auto lg:min-w-0 lg:space-y-1.5"
                            >
                                {destinations.map(
                                    (
                                        destination,
                                        index
                                    ) => {
                                        const id =
                                            getDestinationId(
                                                destination
                                            );

                                        const name =
                                            getDestinationName(
                                                destination
                                            );

                                        const flagUrl =
                                            getDestinationFlagUrl(
                                                destination,
                                                destinationImagePath
                                            );

                                        const active =
                                            String(id) ===
                                            String(
                                                selectedCountryId
                                            );

                                        return (
                                            <li
                                                key={
                                                    id ||
                                                    `${name}-${index}`
                                                }
                                                className="shrink-0 lg:w-full"
                                            >
                                                <CountryButton
                                                    destination={
                                                        destination
                                                    }
                                                    countryId={id}
                                                    countryName={
                                                        name
                                                    }
                                                    flagUrl={
                                                        flagUrl
                                                    }
                                                    active={
                                                        active
                                                    }
                                                    disabled={
                                                        loading
                                                    }
                                                    onSelect={
                                                        onCountryChange
                                                    }
                                                />
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </nav>
                    ) : (
                        <SidebarEmpty />
                    )}
                </div>
            </div>
        </aside>
    );
};

const SidebarHeader = ({
    destinationCount,
}) => {
    return (
        <div
            className="border-b border-slate-100 bg-gradient-to-r from-white to-primary/[0.025] px-4 py-4 sm:px-5 sm:py-5"
        >
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                    <Globe2 className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                    <h2 className="text-base font-black text-slate-950 sm:text-lg">
                        All Countries
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                        Select a destination
                    </p>
                </div>

                {destinationCount > 0 && (
                    <span
                        className="shrink-0 rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary"
                    >
                        {destinationCount}
                    </span>
                )}
            </div>
        </div>
    );
};

const CountryButton = ({
    destination,
    countryId,
    countryName,
    flagUrl,
    active,
    disabled,
    onSelect,
}) => {
    const [
        flagFailed,
        setFlagFailed,
    ] = useState(false);

    const showFlag =
        Boolean(flagUrl) && !flagFailed;

    const handleClick = () => {
        if (
            disabled ||
            typeof onSelect !== "function"
        ) {
            return;
        }

        onSelect(destination);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-current={
                active ? "page" : undefined
            }
            aria-pressed={active}
            aria-label={`View universities in ${countryName}`}
            className={`
                group
                flex
                min-w-max
                items-center
                gap-2
                whitespace-nowrap
                rounded-xl
                px-3
                py-2.5
                text-left
                text-sm
                font-bold
                transition-all
                duration-300

                lg:w-full
                lg:min-w-0
                lg:gap-3
                lg:px-3.5
                lg:py-3

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2

                disabled:cursor-not-allowed
                disabled:opacity-60

                ${active
                    ? `
                            bg-primary
                            text-white
                            shadow-md
                            shadow-primary/20
                        `
                    : `
                            text-slate-700
                            hover:bg-primary/5
                            hover:text-primary
                        `
                }
            `}
        >
            <span
                aria-hidden="true"
                className={`
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    transition-colors
                    duration-300

                    lg:h-9
                    lg:w-9

                    ${active
                        ? `
                                border-white/30
                                bg-white/15
                            `
                        : `
                                border-slate-200
                                bg-slate-100
                                group-hover:border-primary/20
                                group-hover:bg-primary/10
                            `
                    }
                `}
            >
                {showFlag ? (
                    <img
                        src={flagUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={() => {
                            setFlagFailed(true);
                        }}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <MapPin
                        className={cn(`
                            h-4
                            w-4

                            ${active
                                ? "text-white"
                                : "text-slate-400 group-hover:text-primary"
                            }
                        `)}
                    />
                )}
            </span>

            <span
                className="max-w-[150px] truncate lg:min-w-0 lg:max-w-none lg:flex-1"
            >
                {countryName}
            </span>

            {active && (
                <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-logoYellow shadow-[0_0_10px_rgba(247,236,34,0.8)]"
                />
            )}

            <span className="sr-only">
                Country ID: {countryId}
            </span>
        </button>
    );
};

const SidebarLoading = () => {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-[110px] min-w-full flex-col items-center justify-center px-4 text-center lg:min-h-[220px]"
        >
            <LoaderCircle
                aria-hidden="true"
                className="h-7 w-7 animate-spin text-primary"
            />

            <p className="mt-3 text-xs font-semibold text-slate-500">
                Loading countries...
            </p>
        </div>
    );
};

const SidebarError = ({
    onRetry,
}) => {
    return (
        <div
            role="alert"
            className="flex min-h-[140px] min-w-full flex-col items-center justify-center px-4 py-6 text-center lg:min-h-[220px] lg:py-8"
        >
            <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500"
            >
                <Globe2 className="h-5 w-5" />
            </span>

            <p className="mt-4 text-sm font-bold text-slate-800">
                Unable to load countries
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
                Please check your connection and try again.
            </p>

            {typeof onRetry === "function" && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition hover:bg-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <RefreshCw
                        aria-hidden="true"
                        className="h-4 w-4"
                    />

                    Try Again
                </button>
            )}
        </div>
    );
};

const SidebarEmpty = () => {
    return (
        <div
            role="status"
            className="flex min-h-[140px] min-w-full flex-col items-center justify-center px-4 py-6 text-center lg:min-h-[220px] lg:py-8"
        >
            <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400"
            >
                <MapPin className="h-5 w-5" />
            </span>

            <p className="mt-4 text-sm font-bold text-slate-700">
                No countries available
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
                Study destinations are currently unavailable.
            </p>
        </div>
    );
};

export default CountrySidebar;