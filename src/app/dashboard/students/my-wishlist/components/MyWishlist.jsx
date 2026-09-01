"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Heart,
    RefreshCw,
} from "lucide-react";

import Swal from "sweetalert2";

import {
    getWishlistedCourses,
    removeCourseFromWishlist,
} from "../../courses/services/wishlistActions";

import WishlistCard from "./WishlistCard";


export default function MyWishlist() {
    const [
        courses,
        setCourses,
    ] = useState([]);

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

    const [
        removingId,
        setRemovingId,
    ] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | LOAD WISHLIST
    |--------------------------------------------------------------------------
    */

    const loadWishlist =
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


                    const data =
                        await getWishlistedCourses();


                    console.log(
                        "MY WISHLIST DATA:",
                        data
                    );


                    setCourses(
                        Array.isArray(
                            data
                        )
                            ? data
                            : []
                    );

                } catch (error) {
                    console.error(
                        "Wishlist loading error:",
                        error
                    );


                    setCourses([]);


                    setError(
                        error instanceof Error
                            ? error.message
                            : "Unable to load wishlist."
                    );

                } finally {
                    setLoading(false);
                    setRefreshing(false);
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
        loadWishlist();
    }, [loadWishlist]);


    /*
    |--------------------------------------------------------------------------
    | LISTEN FOR WISHLIST CHANGES
    |--------------------------------------------------------------------------
    |
    | If CourseResults adds/removes a wishlist item,
    | this page can refresh automatically.
    |
    */

    useEffect(() => {
        const handleWishlistUpdated =
            () => {
                console.log(
                    "WISHLIST UPDATED - RELOADING PAGE"
                );

                loadWishlist({
                    silent: true,
                });
            };


        window.addEventListener(
            "studentWishlistUpdated",
            handleWishlistUpdated
        );


        return () => {
            window.removeEventListener(
                "studentWishlistUpdated",
                handleWishlistUpdated
            );
        };
    }, [loadWishlist]);


    /*
    |--------------------------------------------------------------------------
    | REMOVE WISHLIST ITEM
    |--------------------------------------------------------------------------
    */

    async function handleRemove(
        course
    ) {
        /*
         * getPrefereList:
         *
         * id   = wishlist/preference record id
         * c_id = actual course id
         *
         * removePreferlist expects the
         * wishlist record id in your current API flow.
         */

        const wishlistId =
            course?.id;


        if (
            wishlistId === null ||
            wishlistId === undefined ||
            String(
                wishlistId
            ).trim() === ""
        ) {
            await Swal.fire({
                icon: "error",

                title:
                    "Unable to Remove",

                text:
                    "Wishlist item ID is missing.",

                confirmButtonColor:
                    "#c01f53",
            });

            return;
        }


        const confirmation =
            await Swal.fire({
                icon:
                    "warning",

                title:
                    "Remove from Wishlist?",

                text:
                    "This course will be removed from your saved courses.",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Remove",

                cancelButtonText:
                    "Cancel",

                confirmButtonColor:
                    "#c01f53",

                cancelButtonColor:
                    "#64748b",
            });


        if (
            !confirmation.isConfirmed
        ) {
            return;
        }


        try {
            setRemovingId(
                String(
                    wishlistId
                )
            );


            const result =
                await removeCourseFromWishlist(
                    wishlistId
                );


            console.log(
                "REMOVE WISHLIST RESULT:",
                result
            );


            /*
             * Immediately remove from this page.
             */

            setCourses(
                (previous) =>
                    previous.filter(
                        (item) =>
                            String(
                                item?.id
                            ) !==
                            String(
                                wishlistId
                            )
                    )
            );


            /*
             * IMPORTANT:
             *
             * Notify StudentShell so sidebar count
             * changes immediately.
             *
             * My Wishlist (2)
             *       ↓
             * My Wishlist (1)
             */

            window.dispatchEvent(
                new CustomEvent(
                    "studentWishlistUpdated",
                    {
                        detail: {
                            action:
                                "removed",

                            wishlistId:
                                String(
                                    wishlistId
                                ),
                        },
                    }
                )
            );


            await Swal.fire({
                icon:
                    "success",

                title:
                    "Removed",

                text:
                    result?.msg ||
                    result?.message ||
                    "Course removed from wishlist.",

                confirmButtonColor:
                    "#c01f53",
            });

        } catch (error) {
            console.error(
                "Remove wishlist error:",
                error
            );


            await Swal.fire({
                icon:
                    "error",

                title:
                    "Remove Failed",

                text:
                    error instanceof Error
                        ? error.message
                        : "Unable to remove this course.",

                confirmButtonColor:
                    "#c01f53",
            });

        } finally {
            setRemovingId(
                null
            );
        }
    }


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

                    <p className="text-sm font-bold text-slate-600">
                        Loading wishlist...
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
                <p className="font-bold text-red-600">
                    {error}
                </p>


                <button
                    type="button"

                    onClick={() =>
                        loadWishlist()
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
                        <Heart
                            size={20}
                        />
                    </div>


                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            My Wishlist
                        </h2>

                        <p className="text-sm text-slate-500">
                            {
                                courses.length
                            }{" "}
                            saved{" "}
                            {courses.length ===
                            1
                                ? "course"
                                : "courses"}
                        </p>
                    </div>

                </div>


                <button
                    type="button"

                    disabled={
                        refreshing
                    }

                    onClick={() =>
                        loadWishlist({
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


            {/* Empty state */}

            {courses.length ===
            0 ? (
                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-200
                        bg-white

                        p-12

                        text-center
                    "
                >
                    <Heart
                        size={34}
                        className="mx-auto text-slate-300"
                    />

                    <h2 className="mt-4 font-black text-slate-800">
                        No wishlisted courses
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Courses you save
                        will appear here.
                    </p>
                </div>
            ) : (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5

                        lg:grid-cols-2
                    "
                >
                    {courses.map(
                        (
                            course,
                            index
                        ) => (
                            <WishlistCard
                                key={
                                    course?.id ??
                                    index
                                }

                                course={
                                    course
                                }

                                removing={
                                    removingId ===
                                    String(
                                        course?.id
                                    )
                                }

                                onRemove={() =>
                                    handleRemove(
                                        course
                                    )
                                }
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}


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