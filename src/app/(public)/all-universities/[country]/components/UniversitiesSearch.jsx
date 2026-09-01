"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Building2,
    Loader2,
    Search,
    X,
    ArrowUpRight,
} from "lucide-react";

import {
    useRouter,
} from "next/navigation";

import {
    createSlug,
} from "@/lib/slug";

import {
    useLazySearchSuggestionsQuery,
} from "@/lib/services/searchApi";

export default function UniversitiesSearch() {
    const router =
        useRouter();

    const containerRef =
        useRef(null);

    const [
        keyword,
        setKeyword,
    ] = useState("");

    const [
        results,
        setResults,
    ] = useState([]);

    const [
        open,
        setOpen,
    ] = useState(false);

    const [
        loadSuggestions,
        {
            isFetching,
        },
    ] =
        useLazySearchSuggestionsQuery();

    /* =========================================================
       LOAD UNIVERSITY SUGGESTIONS
    ========================================================= */

    useEffect(() => {
        const value =
            keyword.trim();

        if (
            value.length < 2
        ) {
            setResults([]);
            setOpen(false);

            return undefined;
        }

        const timer =
            setTimeout(
                async () => {
                    try {
                        const response =
                            await loadSuggestions(
                                value
                            ).unwrap();

                        const items =
                            Array.isArray(
                                response
                            )
                                ? response
                                : [];

                        /*
                         * Only universities.
                         */
                        const universityResults =
                            items.filter(
                                (item) =>
                                    String(
                                        item?.type ??
                                        ""
                                    )
                                        .toLowerCase()
                                        .includes(
                                            "university"
                                        )
                            );

                        setResults(
                            universityResults
                        );

                        setOpen(true);
                    } catch (error) {
                        console.error(
                            "University search error:",
                            error
                        );

                        setResults([]);
                        setOpen(false);
                    }
                },
                400
            );

        return () => {
            clearTimeout(timer);
        };
    }, [
        keyword,
        loadSuggestions,
    ]);

    /* =========================================================
       OUTSIDE CLICK
    ========================================================= */

    useEffect(() => {
        const handleClickOutside =
            (event) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(
                        event.target
                    )
                ) {
                    setOpen(false);
                }
            };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* =========================================================
       OPEN UNIVERSITY
    ========================================================= */

    const handleSelect =
        (item) => {
            const name =
                item?.label ||
                item?.university ||
                item?.university_name ||
                item?.name ||
                "";

            if (!name) {
                return;
            }

            setKeyword(name);
            setOpen(false);

            router.push(
                `/universities/${createSlug(
                    name
                )}`
            );
        };

    /* =========================================================
       CLEAR
    ========================================================= */

    const handleClear = () => {
        setKeyword("");
        setResults([]);
        setOpen(false);
    };

    return (
        <div
            ref={containerRef}
            className="
                relative
                z-40
                mx-auto
                mt-9
                w-full
                max-w-3xl
            "
        >
            {/* SEARCH WRAPPER */}

            <div
                className="
                    relative
                    overflow-visible
                    rounded-[24px]
                    border
                    border-slate-200
                    bg-white
                    p-2
                    shadow-[0_18px_55px_rgba(15,23,42,0.10)]
                    transition-all
                    duration-300

                    focus-within:border-primary/30
                    focus-within:shadow-[0_22px_60px_rgba(192,31,83,0.13)]
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    {/* SEARCH ICON */}

                    <span
                        className="
                            ml-2
                            grid
                            size-11
                            shrink-0
                            place-items-center
                            rounded-2xl
                            bg-primary/10
                            text-primary
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
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            Search Universities
                        </label>

                        <input
                            id="university-search"
                            type="search"
                            value={
                                keyword
                            }
                            onChange={(
                                event
                            ) =>
                                setKeyword(
                                    event
                                        .target
                                        .value
                                )
                            }
                            onFocus={() => {
                                if (
                                    results.length >
                                    0
                                ) {
                                    setOpen(
                                        true
                                    );
                                }
                            }}
                            autoComplete="off"
                            placeholder="Enter university name..."
                            className="
                                mt-0.5
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

                    {keyword && (
                        <button
                            type="button"
                            onClick={
                                handleClear
                            }
                            aria-label="Clear university search"
                            className="
                                grid
                                size-9
                                shrink-0
                                place-items-center
                                rounded-full
                                text-slate-400
                                transition

                                hover:bg-slate-100
                                hover:text-primary
                            "
                        >
                            <X
                                size={16}
                                aria-hidden="true"
                            />
                        </button>
                    )}

                    {/* LOADING */}

                    <div
                        className="
                            mr-2
                            hidden
                            size-10
                            shrink-0
                            place-items-center
                            rounded-xl
                            bg-darkPrimary
                            text-white

                            sm:grid
                        "
                    >
                        {isFetching ? (
                            <Loader2
                                size={17}
                                className="
                                    animate-spin
                                "
                                aria-hidden="true"
                            />
                        ) : (
                            <Search
                                size={17}
                                aria-hidden="true"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* =================================================
                DROPDOWN
            ================================================= */}

            {open && (
                <div
                    className="
                        absolute
                        left-0
                        right-0
                        top-[calc(100%+10px)]
                        z-[100]
                        max-h-[360px]
                        overflow-y-auto
                        rounded-[22px]
                        border
                        border-slate-200
                        bg-white
                        p-2
                        shadow-[0_25px_70px_rgba(15,23,42,0.18)]
                    "
                >
                    {isFetching ? (
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-8
                                text-sm
                                font-semibold
                                text-slate-500
                            "
                        >
                            <Loader2
                                size={18}
                                className="
                                    animate-spin
                                    text-primary
                                "
                            />

                            Searching universities...
                        </div>
                    ) : results.length >
                      0 ? (
                        results.map(
                            (
                                item,
                                index
                            ) => {
                                const name =
                                    item?.label ||
                                    item?.university ||
                                    item?.university_name ||
                                    item?.name ||
                                    "University";

                                const country =
                                    item?.country ||
                                    item?.country_name ||
                                    item?.destination ||
                                    "";

                                return (
                                    <button
                                        key={
                                            item?.id ||
                                            item?.u_id ||
                                            `${name}-${index}`
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleSelect(
                                                item
                                            )
                                        }
                                        className="
                                            group
                                            flex
                                            w-full
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            px-3
                                            py-3
                                            text-left
                                            transition

                                            hover:bg-gradient-to-r
                                            hover:from-primary/[0.06]
                                            hover:to-secondary/[0.05]
                                        "
                                    >
                                        <span
                                            className="
                                                grid
                                                size-11
                                                shrink-0
                                                place-items-center
                                                rounded-xl
                                                bg-secondary/10
                                                text-secondary
                                                transition

                                                group-hover:bg-secondary
                                                group-hover:text-white
                                            "
                                        >
                                            <Building2
                                                size={
                                                    18
                                                }
                                                aria-hidden="true"
                                            />
                                        </span>

                                        <span
                                            className="
                                                min-w-0
                                                flex-1
                                            "
                                        >
                                            <span
                                                className="
                                                    block
                                                    truncate
                                                    text-sm
                                                    font-black
                                                    text-darkPrimary
                                                    transition

                                                    group-hover:text-primary
                                                "
                                            >
                                                {
                                                    name
                                                }
                                            </span>

                                            {country && (
                                                <span
                                                    className="
                                                        mt-1
                                                        block
                                                        truncate
                                                        text-xs
                                                        font-medium
                                                        text-slate-400
                                                    "
                                                >
                                                    {
                                                        country
                                                    }
                                                </span>
                                            )}
                                        </span>

                                        <span
                                            className="
                                                grid
                                                size-9
                                                shrink-0
                                                place-items-center
                                                rounded-full
                                                bg-slate-100
                                                text-slate-500
                                                transition

                                                group-hover:bg-primary
                                                group-hover:text-white
                                            "
                                        >
                                            <ArrowUpRight
                                                size={
                                                    15
                                                }
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </button>
                                );
                            }
                        )
                    ) : (
                        <div
                            className="
                                px-5
                                py-8
                                text-center
                            "
                        >
                            <span
                                className="
                                    mx-auto
                                    grid
                                    size-12
                                    place-items-center
                                    rounded-2xl
                                    bg-slate-100
                                    text-slate-400
                                "
                            >
                                <Building2
                                    size={20}
                                    aria-hidden="true"
                                />
                            </span>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    font-black
                                    text-slate-700
                                "
                            >
                                No universities found
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Try another university name.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <p
                className="
                    mt-3
                    text-center
                    text-xs
                    font-medium
                    text-slate-400
                "
            >
                Type at least 2 characters
                to search universities
            </p>
        </div>
    );
}