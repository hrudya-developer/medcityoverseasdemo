"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FileUser,
    RefreshCw,
} from "lucide-react";

import ApplicationCard from "./ApplicationCard";


const ITEMS_PER_PAGE = 6;


export default function MyApplications() {
    const [
        applications,
        setApplications,
    ] = useState([]);

    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | LOAD APPLICATIONS
    |--------------------------------------------------------------------------
    |
    | UID is NOT sent from browser.
    |
    | /api/dashboard/student/my-applications
    | gets UID directly from the HTTP-only session cookie.
    |
    */

    const loadApplications =
        useCallback(
            async ({
                silent = false,
            } = {}) => {
                try {
                    if (silent) {
                        setRefreshing(true);
                    } else {
                        setLoading(true);
                    }

                    setError("");


                    const response =
                        await fetch(
                            "/api/dashboard/student/my-applications",
                            {
                                method:
                                    "POST",

                                credentials:
                                    "include",

                                cache:
                                    "no-store",
                            }
                        );


                    const result =
                        await response
                            .json()
                            .catch(
                                () =>
                                    null
                            );


                    console.log(
                        "APPLICATIONS RESPONSE:",
                        result
                    );


                    if (
                        !response.ok ||
                        result?.status !==
                            true
                    ) {
                        throw new Error(
                            result?.msg ||
                                result?.message ||
                                "Unable to load applications."
                        );
                    }


                    /*
                    |--------------------------------------------------------------------------
                    | NORMALIZE
                    |--------------------------------------------------------------------------
                    */

                    const data =
                        Array.isArray(
                            result?.data
                        )
                            ? result.data
                            : [];


                    console.log(
                        "APPLICATION DATA:",
                        data
                    );


                    console.log(
                        "APPLICATION IDS:",
                        data.map(
                            (
                                item
                            ) => ({
                                id:
                                    item?.id,

                                c_id:
                                    item?.c_id,

                                course_id:
                                    item?.course_id,

                                course:
                                    item?.course ??
                                    item?.course_name,
                            })
                        )
                    );


                    setApplications(
                        data
                    );


                    /*
                     * Keep pagination inside
                     * the valid range.
                     */

                    setCurrentPage(
                        (
                            previousPage
                        ) => {
                            const pages =
                                Math.max(
                                    1,

                                    Math.ceil(
                                        data.length /
                                            ITEMS_PER_PAGE
                                    )
                                );

                            return Math.min(
                                previousPage,
                                pages
                            );
                        }
                    );

                } catch (error) {
                    console.error(
                        "APPLICATION LOADING ERROR:",
                        error
                    );


                    setApplications(
                        []
                    );


                    setError(
                        error instanceof
                        Error
                            ? error.message
                            : "Unable to load applications."
                    );

                } finally {
                    setLoading(
                        false
                    );

                    setRefreshing(
                        false
                    );
                }
            },
            []
        );


    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);


    /*
    |--------------------------------------------------------------------------
    | REFRESH AFTER APPLY
    |--------------------------------------------------------------------------
    |
    | ApplyCourseButton should dispatch:
    |
    | window.dispatchEvent(
    |   new Event("studentApplicationUpdated")
    | )
    |
    */

    useEffect(() => {
        const handleApplicationUpdated =
            () => {
                console.log(
                    "APPLICATION UPDATED - RELOADING"
                );

                loadApplications({
                    silent:
                        true,
                });
            };


        window.addEventListener(
            "studentApplicationUpdated",
            handleApplicationUpdated
        );


        return () => {
            window.removeEventListener(
                "studentApplicationUpdated",
                handleApplicationUpdated
            );
        };
    }, [loadApplications]);


    /*
    |--------------------------------------------------------------------------
    | REFRESH WHEN USER RETURNS TO TAB
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const handleVisibility =
            () => {
                if (
                    document
                        .visibilityState ===
                    "visible"
                ) {
                    loadApplications({
                        silent:
                            true,
                    });
                }
            };


        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );


        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
        };
    }, [loadApplications]);


    /*
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
    */

    const totalPages =
        Math.max(
            1,

            Math.ceil(
                applications.length /
                    ITEMS_PER_PAGE
            )
        );


    const paginatedApplications =
        useMemo(
            () => {
                const start =
                    (currentPage -
                        1) *
                    ITEMS_PER_PAGE;

                const end =
                    start +
                    ITEMS_PER_PAGE;

                return applications.slice(
                    start,
                    end
                );
            },
            [
                applications,
                currentPage,
            ]
        );


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div
                className="
                    rounded-3xl
                    border
                    border-slate-100
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                <div className="flex items-center gap-3">
                    <Spinner />

                    <p className="font-bold text-slate-700">
                        Loading applications...
                    </p>
                </div>
            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error) {
        return (
            <div
                className="
                    rounded-3xl
                    border
                    border-red-100
                    bg-red-50
                    p-6
                "
            >
                <p className="font-bold text-red-700">
                    {error}
                </p>


                <button
                    type="button"

                    onClick={() =>
                        loadApplications()
                    }

                    className="
                        mt-4
                        rounded-xl
                        bg-[#c01f53]
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        transition

                        hover:bg-[#a91e4c]
                    "
                >
                    Try Again
                </button>
            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-6">

            {/* Header */}

            <div
                className="
                    flex
                    flex-col
                    gap-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div className="flex items-center gap-3">

                    <div
                        className="
                            grid
                            h-11
                            w-11
                            place-items-center
                            rounded-xl
                            bg-pink-50
                            text-[#c01f53]
                        "
                    >
                        <FileUser
                            size={20}
                        />
                    </div>


                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            My Applications
                        </h2>

                        <p className="text-sm text-slate-500">
                            {
                                applications.length
                            }{" "}
                            {applications.length ===
                            1
                                ? "application"
                                : "applications"}
                        </p>
                    </div>

                </div>


                <button
                    type="button"

                    disabled={
                        refreshing
                    }

                    onClick={() =>
                        loadApplications({
                            silent:
                                true,
                        })
                    }

                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-slate-700
                        transition

                        hover:border-[#c01f53]/30
                        hover:text-[#c01f53]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    <RefreshCw
                        size={15}

                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh
                </button>
            </div>


            {/* Empty */}

            {applications.length ===
            0 ? (
                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-200
                        bg-white
                        px-6
                        py-14
                        text-center
                    "
                >
                    <FileUser
                        size={38}
                        className="mx-auto text-slate-300"
                    />

                    <h2 className="mt-4 text-lg font-black text-slate-800">
                        No applications yet
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Courses you apply
                        for will appear here.
                    </p>
                </div>
            ) : (
                <>
                    {/* Cards */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5 md:grid-cols-2
                            lg:grid-cols-2
                        "
                    >
                        {paginatedApplications.map(
                            (
                                application,
                                index
                            ) => (
                                <ApplicationCard
                                    key={
                                        application
                                            ?.id ??
                                        application
                                            ?.c_id ??
                                        application
                                            ?.course_id ??
                                        index
                                    }

                                    application={
                                        application
                                    }
                                />
                            )
                        )}
                    </div>


                    {/* Pagination */}

                    {totalPages >
                        1 && (
                        <Pagination
                            currentPage={
                                currentPage
                            }

                            totalPages={
                                totalPages
                            }

                            onChange={
                                setCurrentPage
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
}


/*
|--------------------------------------------------------------------------
| PAGINATION
|--------------------------------------------------------------------------
*/

function Pagination({
    currentPage,
    totalPages,
    onChange,
}) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">

            <button
                type="button"

                onClick={() =>
                    onChange(
                        Math.max(
                            currentPage -
                                1,
                            1
                        )
                    )
                }

                disabled={
                    currentPage ===
                    1
                }

                className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition

                    hover:bg-slate-50

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                Prev
            </button>


            {Array.from(
                {
                    length:
                        totalPages,
                },
                (
                    _,
                    index
                ) => {
                    const page =
                        index + 1;

                    return (
                        <button
                            key={
                                page
                            }

                            type="button"

                            onClick={() =>
                                onChange(
                                    page
                                )
                            }

                            className={`
                                h-10
                                w-10
                                rounded-lg
                                text-sm
                                font-bold
                                transition

                                ${
                                    currentPage ===
                                    page
                                        ? "bg-[#c01f53] text-white"
                                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                }
            )}


            <button
                type="button"

                onClick={() =>
                    onChange(
                        Math.min(
                            currentPage +
                                1,
                            totalPages
                        )
                    )
                }

                disabled={
                    currentPage ===
                    totalPages
                }

                className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition

                    hover:bg-slate-50

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                Next
            </button>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| SPINNER
|--------------------------------------------------------------------------
*/

function Spinner() {
    return (
        <span
            className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-slate-200
                border-t-[#c01f53]
            "
        />
    );
}