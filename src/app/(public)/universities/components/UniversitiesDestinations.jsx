"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    ChevronDown,
    ChevronUp,
    Search,
} from "lucide-react";

import DestinationCard from "./DestinationCard";
import DestinationSearch from "./DestinationSearch";

const CARDS_PER_ROW = 3;

export default function UniversitiesDestinations({
    destinations = [],
}) {
    const [
        visibleCount,
        setVisibleCount,
    ] = useState(
        CARDS_PER_ROW
    );

    const [
        searchTerm,
        setSearchTerm,
    ] = useState("");

    /* =========================================================
       FILTER DESTINATIONS
    ========================================================= */

    const filteredDestinations =
        useMemo(() => {
            const keyword =
                String(
                    searchTerm
                )
                    .trim()
                    .toLowerCase();

            if (!keyword) {
                return destinations;
            }

            return destinations.filter(
                (destination) => {
                    const name =
                        String(
                            destination?.destinationName ||
                                destination?.country ||
                                destination?.name ||
                                destination?.destination ||
                                destination?.country_name ||
                                ""
                        )
                            .trim()
                            .toLowerCase();

                    return name.includes(
                        keyword
                    );
                }
            );
        }, [
            destinations,
            searchTerm,
        ]);

    /* =========================================================
       VISIBLE DESTINATIONS
    ========================================================= */

    const visibleDestinations =
        useMemo(() => {
            if (
                searchTerm.trim()
            ) {
                return filteredDestinations;
            }

            return filteredDestinations.slice(
                0,
                visibleCount
            );
        }, [
            filteredDestinations,
            visibleCount,
            searchTerm,
        ]);

    /* =========================================================
       BUTTON STATES
    ========================================================= */

    const canViewMore =
        !searchTerm.trim() &&
        visibleCount <
            filteredDestinations.length;

    const canShowLess =
        !searchTerm.trim() &&
        visibleCount >
            CARDS_PER_ROW;

    /* =========================================================
       VIEW MORE
    ========================================================= */

    const handleViewMore =
        () => {
            setVisibleCount(
                (current) =>
                    Math.min(
                        current +
                            CARDS_PER_ROW,
                        filteredDestinations.length
                    )
            );
        };

    /* =========================================================
       SHOW LESS
    ========================================================= */

    const handleShowLess =
        () => {
            setVisibleCount(
                (current) =>
                    Math.max(
                        CARDS_PER_ROW,
                        current -
                            CARDS_PER_ROW
                    )
            );
        };

    /* =========================================================
       SEARCH
    ========================================================= */

    const handleSearchChange =
        (event) => {
            const value =
                event?.target?.value ??
                "";

            setSearchTerm(
                value
            );

            setVisibleCount(
                CARDS_PER_ROW
            );
        };

    const handleClearSearch =
        () => {
            setSearchTerm("");

            setVisibleCount(
                CARDS_PER_ROW
            );
        };

    /* =========================================================
       PAGE
    ========================================================= */

    return (
        <section
            id="study-destinations"
            className="
                relative
                mx-auto
                max-w-7xl
                px-5
                py-16
                lg:px-8
                lg:py-24
            "
        >
            {/* =================================================
                BACKGROUND DECOR
            ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-20
                    h-72
                    w-72
                    rounded-full
                    bg-secondary/[0.06]
                    blur-[100px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    bottom-20
                    h-72
                    w-72
                    rounded-full
                    bg-primary/[0.07]
                    blur-[100px]
                "
            />

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-3xl
                    text-center
                "
            >
                <p
                    className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-secondary
                    "
                >
                    Study Destinations
                </p>

                <h2
                    className="
                        mt-4
                        text-3xl
                        font-black
                        tracking-[-0.03em]
                        text-[#071641]
                        sm:text-4xl
                        lg:text-5xl
                    "
                >
                    Explore Universities by
                    Destination
                </h2>

                <p
                    className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        leading-7
                        text-slate-600
                    "
                >
                    Choose your preferred
                    destination and discover
                    universities, courses and
                    international study
                    opportunities.
                </p>
            </div>

            {/* =================================================
                DESTINATION SEARCH
            ================================================= */}

            {destinations.length >
                0 && (
                <DestinationSearch
                    value={
                        searchTerm
                    }
                    onChange={
                        handleSearchChange
                    }
                    onClear={
                        handleClearSearch
                    }
                    resultCount={
                        filteredDestinations.length
                    }
                />
            )}

            {/* =================================================
                DESTINATION CARDS
            ================================================= */}

            {visibleDestinations.length >
            0 ? (
                <>
                    <div
                        className="
                            relative
                            z-10
                            mt-10
                            grid
                            gap-6
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {visibleDestinations.map(
                            (
                                destination,
                                index
                            ) => {
                                const fallbackName =
                                    destination?.destinationName ||
                                    destination?.country ||
                                    destination?.name ||
                                    destination?.destination ||
                                    `destination-${index}`;

                                return (
                                    <DestinationCard
                                        key={
                                            destination?.d_id ||
                                            destination?.id ||
                                            `${fallbackName}-${index}`
                                        }
                                        destination={
                                            destination
                                        }
                                    />
                                );
                            }
                        )}
                    </div>

                    {/* =================================================
                        VIEW MORE / SHOW LESS
                    ================================================= */}

                    {(canViewMore ||
                        canShowLess) && (
                        <div
                            className="
                                relative
                                z-10
                                mt-10
                                flex
                                flex-wrap
                                items-center
                                justify-center
                                gap-3
                            "
                        >
                            {canShowLess && (
                                <button
                                    type="button"
                                    onClick={
                                        handleShowLess
                                    }
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6
                                        py-3.5
                                        text-sm
                                        font-black
                                        text-slate-700
                                        shadow-[0_8px_24px_rgba(15,23,42,0.06)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:border-primary/25
                                        hover:bg-primary/[0.04]
                                        hover:text-primary
                                    "
                                >
                                    <ChevronUp
                                        size={17}
                                        aria-hidden="true"
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:-translate-y-0.5
                                        "
                                    />

                                    Show Less
                                </button>
                            )}

                            {canViewMore && (
                                <button
                                    type="button"
                                    onClick={
                                        handleViewMore
                                    }
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-primary
                                        to-darkPrimary
                                        px-7
                                        py-3.5
                                        text-sm
                                        font-black
                                        text-white
                                        shadow-[0_12px_30px_rgba(192,31,83,0.22)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:shadow-[0_18px_38px_rgba(192,31,83,0.30)]
                                    "
                                >
                                    View More

                                    <ChevronDown
                                        size={17}
                                        aria-hidden="true"
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-y-0.5
                                        "
                                    />
                                </button>
                            )}
                        </div>
                    )}

                    {/* =================================================
                        COUNT
                    ================================================= */}

                    {!searchTerm.trim() &&
                        destinations.length >
                            CARDS_PER_ROW && (
                        <p
                            className="
                                relative
                                z-10
                                mt-4
                                text-center
                                text-xs
                                font-semibold
                                text-slate-400
                            "
                        >
                            Showing{" "}
                            {Math.min(
                                visibleCount,
                                destinations.length
                            )}{" "}
                            of{" "}
                            {
                                destinations.length
                            }{" "}
                            destinations
                        </p>
                    )}
                </>
            ) : searchTerm.trim() ? (
                /* =================================================
                    SEARCH EMPTY STATE
                ================================================= */

                <div
                    className="
                        relative
                        z-10
                        mt-10
                        rounded-[28px]
                        border
                        border-dashed
                        border-slate-300
                        bg-white
                        px-6
                        py-14
                        text-center
                        shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                    "
                >
                    <span
                        className="
                            mx-auto
                            grid
                            size-14
                            place-items-center
                            rounded-2xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <Search
                            size={23}
                            aria-hidden="true"
                        />
                    </span>

                    <h3
                        className="
                            mt-4
                            text-xl
                            font-black
                            text-darkPrimary
                        "
                    >
                        Destination not found
                    </h3>

                    <p
                        className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-7
                            text-slate-500
                        "
                    >
                        We couldn&apos;t find a
                        destination matching{" "}
                        <span
                            className="
                                font-bold
                                text-darkPrimary
                            "
                        >
                            &quot;
                            {searchTerm}
                            &quot;
                        </span>
                        .
                    </p>

                    <button
                        type="button"
                        onClick={
                            handleClearSearch
                        }
                        className="
                            mt-5
                            rounded-xl
                            bg-primary
                            px-5
                            py-3
                            text-sm
                            font-black
                            text-white
                            transition
                            hover:bg-darkPrimary
                        "
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                /* =================================================
                    NO DESTINATIONS
                ================================================= */

                <div
                    className="
                        relative
                        z-10
                        mt-10
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-10
                        text-center
                    "
                >
                    <p
                        className="
                            font-bold
                            text-slate-500
                        "
                    >
                        Study destinations are
                        currently unavailable.
                    </p>
                </div>
            )}
        </section>
    );
}