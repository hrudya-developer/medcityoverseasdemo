"use client";

import {
    Clock,
    GraduationCap,
    Heart,
    MapPin,
    Wallet,
} from "lucide-react";

import Swal from "sweetalert2";

import ApplyCourseButton from "./ApplyCourseButton";


function Info({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-2">
                <div
                    className="
                        grid
                        h-7
                        w-7
                        place-items-center
                        rounded-lg
                        bg-white
                        text-[#c01f53]
                    "
                >
                    <Icon
                        size={13}
                    />
                </div>

                <span className="text-[9px] font-black uppercase tracking-[0.06em] text-slate-400">
                    {label}
                </span>
            </div>

            <p className="truncate text-xs font-bold text-slate-800">
                {value ||
                    "N/A"}
            </p>
        </div>
    );
}


function WishlistButton({
    active = false,
    onClick,
}) {
    return (
        <div className="group relative">
            <button
                type="button"
                onClick={
                    onClick
                }
                aria-label={
                    active
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                }
                className={`
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-xl
                    border
                    transition-all
                    duration-200

                    ${
                        active
                            ? "border-[#c01f53] bg-[#c01f53] text-white"
                            : "border-slate-200 bg-white text-slate-500 hover:border-[#c01f53]/40 hover:bg-[#c01f53]/5 hover:text-[#c01f53]"
                    }
                `}
            >
                <Heart
                    size={18}
                    className={
                        active
                            ? "fill-current"
                            : ""
                    }
                />
            </button>

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-full
                    right-0
                    z-30
                    mb-2
                    whitespace-nowrap
                    rounded-lg
                    bg-slate-950
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-bold
                    text-white
                    opacity-0
                    shadow-lg
                    transition

                    group-hover:opacity-100
                "
            >
                {active
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
            </div>
        </div>
    );
}


export default function CourseCard({
    course,
    onWishlist,
    wishlisted = false,
    initiallyApplied = false,
}) {
    const name =
        course?.course ??
        course?.course_name ??
        course?.name ??
        "Course";

    const university =
        course?.university ??
        course?.university_name ??
        "University";

    const country =
        course?.country ??
        course?.destination ??
        "";

    const level =
        course?.level ??
        "N/A";

    const duration =
        course?.duration ??
        "N/A";

    const fees =
        course?.fees
            ? `${course?.currency || ""} ${course.fees}`.trim()
            : "N/A";


    /*
     * Wishlist API uses the
     * main course record id.
     */
    const wishlistCourseId =
        course?.id ??
        course?.course_id ??
        course?.uc_id ??
        course?.c_id ??
        null;


    async function handleWishlist() {
        if (
            wishlistCourseId ===
                null ||
            wishlistCourseId ===
                undefined ||
            String(
                wishlistCourseId
            ).trim() === ""
        ) {
            await Swal.fire({
                icon:
                    "error",

                title:
                    "Unable to Update Wishlist",

                text:
                    "Course information is missing.",

                confirmButtonColor:
                    "#c01f53",
            });

            return;
        }


        console.log(
            "WISHLIST COURSE IDS:",
            {
                wishlistCourseId,

                id:
                    course?.id,

                c_id:
                    course?.c_id,

                course_id:
                    course?.course_id,

                uc_id:
                    course?.uc_id,
            }
        );


        onWishlist?.({
            course,

            courseId:
                wishlistCourseId,
        });
    }


    return (
        <article
            className="
                group
                rounded-[24px]
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#c01f53]/20
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
            "
        >
            <div className="flex gap-4">
                <div
                    className="
                        grid
                        h-12
                        w-12
                        shrink-0
                        place-items-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#c01f53]
                        to-[#631A33]
                        text-white
                        shadow-[0_8px_20px_rgba(192,31,83,0.22)]
                    "
                >
                    <GraduationCap
                        size={21}
                    />
                </div>


                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[#c01f53]">
                        {level}
                    </p>

                    <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                        {name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                        {university}
                    </p>

                    {country && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin
                                size={12}
                            />

                            {country}
                        </p>
                    )}
                </div>
            </div>


            <div className="mt-5 grid grid-cols-3 gap-2">
                <Info
                    icon={
                        GraduationCap
                    }
                    label="Level"
                    value={
                        level
                    }
                />

                <Info
                    icon={
                        Clock
                    }
                    label="Duration"
                    value={
                        duration
                    }
                />

                <Info
                    icon={
                        Wallet
                    }
                    label="Fees"
                    value={
                        fees
                    }
                />
            </div>


            <div className="mt-5 flex items-center gap-3">
                <ApplyCourseButton
                    course={
                        course
                    }
                    initiallyApplied={
                        initiallyApplied
                    }
                />

                <WishlistButton
                    active={
                        wishlisted
                    }
                    onClick={
                        handleWishlist
                    }
                />
            </div>
        </article>
    );
}