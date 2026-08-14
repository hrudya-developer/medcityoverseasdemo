"use client";

import {
    CalendarDays,
    Clock3,
    FileText,
    GraduationCap,
    MapPin,
    School,
    Trash2,
    WalletCards,
} from "lucide-react";

import WishlistMeta from "./WishlistMeta";

import ApplyCourseButton from "../../courses/components/ApplyCourseButton";


export default function WishlistCard({
    course,
    onRemove,
    removing = false,
}) {
    const name =
        course?.course ??
        course?.course_name ??
        course?.name ??
        "Course";

    const university =
        course?.university ??
        course?.university_name ??
        course?.college ??
        "University";

    const location =
        course?.location ??
        course?.country ??
        course?.destination ??
        "";

    const level =
        course?.level ??
        "N/A";

    const stream =
        course?.stream ??
        course?.study_area ??
        course?.category ??
        "N/A";

    const duration =
        course?.duration ??
        "N/A";

    const intake =
        course?.intake ??
        course?.month ??
        "N/A";

    const currency =
        course?.currency ??
        "";

    const fees =
        course?.fees ??
        course?.tuition_fee ??
        course?.fee ??
        "";

    const applicationFee =
        course?.application_fee ??
        course?.app_fee ??
        "";

    const deadline =
        course?.deadline ??
        course?.application_deadline ??
        "ASAP";

    const requirement =
        course?.entryrequirement ??
        course?.entry_requirement ??
        course?.requirements ??
        course?.remarks ??
        "";

    const addedOn =
        course?.created_at ??
        course?.added_on ??
        course?.date ??
        "";


    return (
        <article
            className="
                flex
                h-full
                flex-col
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

                sm:p-6
            "
        >
            <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#c01f53]/10 text-[#c01f53]">
                    <GraduationCap
                        size={24}
                    />
                </div>


                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-black leading-6 text-slate-950 sm:text-lg">
                        {name}
                    </h3>


                    <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#c01f53]">
                        <School
                            size={14}
                        />

                        <span className="truncate">
                            {university}
                        </span>
                    </div>


                    {location && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <MapPin
                                size={13}
                            />

                            <span>
                                {location}
                            </span>
                        </div>
                    )}
                </div>


                <button
                    type="button"

                    onClick={
                        onRemove
                    }

                    disabled={
                        removing
                    }

                    aria-label="Remove from wishlist"

                    className="
                        grid
                        h-10
                        w-10
                        shrink-0
                        place-items-center
                        rounded-xl
                        bg-[#c01f53]
                        text-white
                        transition

                        hover:bg-[#a91e4c]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {removing ? (
                        <Spinner />
                    ) : (
                        <Trash2
                            size={17}
                        />
                    )}
                </button>
            </div>


            <div className="mt-5 flex flex-wrap gap-2">
                <WishlistMeta
                    icon={
                        GraduationCap
                    }
                    value={
                        level
                    }
                />

                <WishlistMeta
                    icon={
                        FileText
                    }
                    value={
                        stream
                    }
                />

                <WishlistMeta
                    icon={
                        Clock3
                    }
                    value={
                        duration
                    }
                />

                <WishlistMeta
                    icon={
                        CalendarDays
                    }
                    value={
                        intake
                    }
                />

                {fees !== "" && (
                    <WishlistMeta
                        icon={
                            WalletCards
                        }
                        value={`${currency} ${fees}`.trim()}
                    />
                )}

                <WishlistMeta
                    icon={
                        CalendarDays
                    }
                    value={`Deadline: ${deadline}`}
                />

                {applicationFee !==
                    "" && (
                    <WishlistMeta
                        icon={
                            WalletCards
                        }
                        value={`Application Fee: ${currency} ${applicationFee}`.trim()}
                    />
                )}
            </div>


            {requirement && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
                        Entry Requirement
                    </p>

                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">
                        {requirement}
                    </p>
                </div>
            )}


            <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium text-slate-400">
                    {addedOn
                        ? `Added on: ${addedOn}`
                        : ""}
                </p>


                <div className="flex min-w-[150px]">
                    <ApplyCourseButton
                        course={
                            course
                        }
                    />
                </div>
            </div>
        </article>
    );
}


function Spinner() {
    return (
        <span
            className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-white/40
                border-t-white
            "
        />
    );
}