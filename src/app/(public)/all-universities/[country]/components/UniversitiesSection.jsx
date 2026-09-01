"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Building2,
    ChevronDown,
    ChevronUp,
    Search,
    Sparkles,
    X,
} from "lucide-react";

import UniversityCard from "./UniversityCard";
import UniversitiesEmptyState from "./UniversitiesEmptyState";

const CARDS_PER_ROW = 3;

export default function UniversitiesSection({
    countryName = "",
    universities = [],
    universityImagePath = "",
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

    /*
     * Reset cards + search
     * whenever country changes.
     */
    useEffect(() => {
        setVisibleCount(
            CARDS_PER_ROW
        );

        setSearchTerm("");
    }, [
        countryName,
    ]);

    /* =========================================================
       FILTER UNIVERSITIES
    ========================================================= */

    const filteredUniversities =
        useMemo(() => {
            const keyword =
                searchTerm
                    .trim()
                    .toLowerCase();

            if (!keyword) {
                return universities;
            }

            return universities.filter(
                (university) => {
                    const name =
                        String(
                            university?.name ||
                            university?.university ||
                            university?.university_name ||
                            university?.u_name ||
                            ""
                        ).toLowerCase();

                    const location =
                        String(
                            university?.location ||
                            university?.city ||
                            university?.place ||
                            university?.address ||
                            countryName ||
                            ""
                        ).toLowerCase();

                    return (
                        name.includes(
                            keyword
                        ) ||
                        location.includes(
                            keyword
                        )
                    );
                }
            );
        }, [
            universities,
            searchTerm,
            countryName,
        ]);

    /* =========================================================
       VISIBLE UNIVERSITIES
    ========================================================= */

    const visibleUniversities =
        useMemo(() => {
            /*
             * While searching, show
             * all matching universities.
             */
            if (
                searchTerm.trim()
            ) {
                return filteredUniversities;
            }

            return filteredUniversities.slice(
                0,
                visibleCount
            );
        }, [
            filteredUniversities,
            visibleCount,
            searchTerm,
        ]);

    const canViewMore =
        !searchTerm.trim() &&
        visibleCount <
            filteredUniversities.length;

    const canShowLess =
        !searchTerm.trim() &&
        visibleCount >
            CARDS_PER_ROW;

    const handleViewMore = () => {
        setVisibleCount(
            (current) =>
                Math.min(
                    current +
                        CARDS_PER_ROW,
                    filteredUniversities.length
                )
        );
    };

    const handleShowLess = () => {
        setVisibleCount(
            (current) =>
                Math.max(
                    CARDS_PER_ROW,
                    current -
                        CARDS_PER_ROW
                )
        );
    };

    const handleSearchChange = (
        event
    ) => {
        setSearchTerm(
            event.target.value
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

    return (
        <section
            id="universities"
            className="
                relative
                overflow-hidden
                bg-[#f8faff]
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
                    -left-40
                    top-20
                    size-[350px]
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
                    -right-40
                    top-[30%]
                    size-[350px]
                    rounded-full
                    bg-primary/[0.07]
                    blur-[100px]
                "
            />

            {/* subtle grid */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.28]
                    [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)]
                    [background-size:36px_36px]
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-5
                    py-14
                    sm:px-6
                    lg:px-8
                    lg:py-20
                "
            >
                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    <div>
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-secondary/10
                                bg-secondary/[0.08]
                                px-3.5
                                py-2
                                text-secondary
                            "
                        >
                            <Sparkles
                                size={14}
                                aria-hidden="true"
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-black
                                    uppercase
                                    tracking-[0.16em]
                                "
                            >
                                Study in{" "}
                                {countryName}
                            </span>
                        </div>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-black
                                tracking-[-0.03em]
                                text-darkPrimary
                                sm:text-4xl
                            "
                        >
                            Explore Universities
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-xl
                                text-sm
                                leading-7
                                text-slate-500
                                sm:text-base
                            "
                        >
                            Discover universities
                            in{" "}
                            {countryName} and
                            explore institutions
                            that match your
                            international education
                            goals.
                        </p>
                    </div>

                    {/* COUNT */}

                    <div
                        className="
                            inline-flex
                            w-fit
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-slate-200/80
                            bg-white
                            px-5
                            py-3.5
                            shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                        "
                    >
                        <span
                            className="
                                grid
                                size-10
                                place-items-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            "
                        >
                            <Building2
                                size={18}
                                aria-hidden="true"
                            />
                        </span>

                        <div>
                            <p
                                className="
                                    text-lg
                                    font-black
                                    leading-none
                                    text-darkPrimary
                                "
                            >
                                {
                                    filteredUniversities.length
                                }
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    font-medium
                                    text-slate-500
                                "
                            >
                                {filteredUniversities.length ===
                                1
                                    ? "University"
                                    : "Universities"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    SEARCH BOX
                ================================================= */}

                {universities.length >
                    0 && (
                    <div
                        className="
                            mt-8
                            rounded-[26px]
                            border
                            border-slate-200/90
                            bg-white
                            p-2
                            shadow-[0_14px_40px_rgba(15,23,42,0.07)]
                            transition-all
                            duration-300

                            focus-within:border-primary/30
                            focus-within:shadow-[0_20px_55px_rgba(192,31,83,0.12)]
                        "
                    >
                        <div
                            className="
                                flex
                                min-h-[64px]
                                items-center
                                gap-3
                            "
                        >
                            {/* SEARCH ICON */}

                            <span
                                className="
                                    grid
                                    size-12
                                    shrink-0
                                    place-items-center
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-primary
                                    to-darkPrimary
                                    text-white
                                    shadow-[0_10px_24px_rgba(192,31,83,0.22)]
                                "
                            >
                                <Search
                                    size={19}
                                    aria-hidden="true"
                                />
                            </span>

                            {/* INPUT */}

                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >
                                <label
                                    htmlFor="university-search"
                                    className="
                                        block
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.15em]
                                        text-primary
                                    "
                                >
                                    Search Universities
                                </label>

                                <input
                                    id="university-search"
                                    type="search"
                                    value={
                                        searchTerm
                                    }
                                    onChange={
                                        handleSearchChange
                                    }
                                    autoComplete="off"
                                    placeholder={`Search universities in ${countryName}...`}
                                    className="
                                        mt-1
                                        w-full
                                        bg-transparent
                                        text-sm
                                        font-semibold
                                        text-slate-800
                                        outline-none

                                        placeholder:font-normal
                                        placeholder:text-slate-400

                                        sm:text-base
                                    "
                                />
                            </div>

                            {/* CLEAR */}

                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={
                                        handleClearSearch
                                    }
                                    aria-label="Clear university search"
                                    className="
                                        grid
                                        size-10
                                        shrink-0
                                        place-items-center
                                        rounded-full
                                        text-slate-400
                                        transition

                                        hover:bg-primary/5
                                        hover:text-primary
                                    "
                                >
                                    <X
                                        size={
                                            17
                                        }
                                        aria-hidden="true"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* =================================================
                    SEARCH RESULT INFO
                ================================================= */}

                {searchTerm.trim() && (
                    <div
                        className="
                            mt-4
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-semibold
                                text-slate-500
                            "
                        >
                            Found{" "}
                            <span
                                className="
                                    font-black
                                    text-primary
                                "
                            >
                                {
                                    filteredUniversities.length
                                }
                            </span>{" "}
                            {filteredUniversities.length ===
                            1
                                ? "university"
                                : "universities"}{" "}
                            matching "
                            {searchTerm}"
                        </p>

                        <button
                            type="button"
                            onClick={
                                handleClearSearch
                            }
                            className="
                                text-xs
                                font-black
                                text-primary
                                transition
                                hover:text-darkPrimary
                            "
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* =================================================
                    UNIVERSITIES
                ================================================= */}

                {visibleUniversities.length >
                0 ? (
                    <>
                        <div
                            className="
                                mt-8
                                grid
                                gap-6
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {visibleUniversities.map(
                                (
                                    university,
                                    index
                                ) => (
                                    <UniversityCard
                                        key={
                                            university?.id ||
                                            university?.u_id ||
                                            university?.university_id ||
                                            `${university?.name}-${index}`
                                        }
                                        university={
                                            university
                                        }
                                        index={
                                            index
                                        }
                                        countryName={
                                            countryName
                                        }
                                        universityImagePath={
                                            universityImagePath
                                        }
                                    />
                                )
                            )}
                        </div>

                        {/* =================================================
                            VIEW MORE / SHOW LESS
                        ================================================= */}

                        {(canViewMore ||
                            canShowLess) && (
                            <div
                                className="
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
                                            min-w-[145px]
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
                                            hover:shadow-[0_12px_30px_rgba(192,31,83,0.10)]
                                        "
                                    >
                                        <ChevronUp
                                            size={
                                                17
                                            }
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:-translate-y-0.5
                                            "
                                            aria-hidden="true"
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
                                            min-w-[155px]
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
                                            size={
                                                17
                                            }
                                            className="
                                                transition-transform
                                                duration-300
                                                group-hover:translate-y-0.5
                                            "
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* result indicator */}

                        {!searchTerm.trim() &&
                            universities.length >
                                CARDS_PER_ROW && (
                            <p
                                className="
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
                                    universities.length
                                )}{" "}
                                of{" "}
                                {
                                    universities.length
                                }{" "}
                                universities
                            </p>
                        )}
                    </>
                ) : searchTerm.trim() ? (
                    /* =================================================
                        SEARCH EMPTY STATE
                    ================================================= */

                    <div
                        className="
                            mt-8
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
                            No universities found
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
                            No universities in{" "}
                            {countryName} matched "
                            {searchTerm}".
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
                    <UniversitiesEmptyState
                        countryName={
                            countryName
                        }
                    />
                )}
            </div>
        </section>
    );
}