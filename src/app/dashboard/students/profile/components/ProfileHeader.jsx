"use client";

import {
    Pencil,
    ShieldCheck
} from "lucide-react";

import RemoveAccountButton from "./delete-profile/RemoveProfileButton";

export default function ProfileHeader({
    name,
    email,
    studentId,
    stage,
    initial,
    onUpdate,
}) {
    return (
        <div
            className="
                relative
                overflow-hidden
                border-b
                border-slate-100
                bg-gradient-to-r
                from-[#fff3f7]
                via-white
                to-[#f2f8ff]
                px-6
                py-6

                sm:px-8
                sm:py-7
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-56
                    w-56
                    rounded-full
                    bg-[#c01f53]/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    flex
                    flex-col
                    gap-5

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                {/* Profile information */}
                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-4
                    "
                >
                    <div
                        className="
                            grid
                            h-14
                            w-14
                            shrink-0
                            place-items-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-[#dc3069]
                            via-[#a91e4c]
                            to-[#631A33]
                            text-lg
                            font-black
                            text-white
                            shadow-[0_12px_28px_rgba(192,31,83,0.22)]

                            sm:h-16
                            sm:w-16
                            sm:text-xl
                        "
                    >
                        {initial}
                    </div>

                    <div className="min-w-0">
                        <div
                            className="
                                mb-1.5
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-emerald-100
                                bg-emerald-50
                                px-2.5
                                py-1
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[0.08em]
                                text-emerald-700
                            "
                        >
                            <ShieldCheck size={11} />

                            Student Profile
                        </div>

                        <h1
                            className="
                                truncate
                                text-xl
                                font-black
                                tracking-[-0.03em]
                                text-slate-950

                                sm:text-2xl
                            "
                        >
                            {name}
                        </h1>

                        <p
                            className="
                                mt-1
                                truncate
                                text-sm
                                font-medium
                                text-slate-500
                            "
                        >
                            {email}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >
                    {stage ? (
                        <div
                            className="
                                rounded-xl
                                border
                                border-emerald-100
                                bg-emerald-50
                                px-3
                                py-2
                                text-xs
                                font-bold
                                capitalize
                                text-emerald-700
                            "
                        >
                            {stage}
                        </div>
                    ) : null}

                    <button
                        type="button"
                        onClick={onUpdate}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#c01f53]
                            px-4
                            py-2.5
                            text-xs
                            font-bold
                            text-white
                            shadow-[0_8px_20px_rgba(192,31,83,0.18)]
                            transition-all

                            hover:-translate-y-0.5
                            hover:bg-[#a91e4c]
                        "
                    >
                        <Pencil size={14} />

                        Update Profile
                    </button>

                    <RemoveAccountButton uid={studentId} />
                </div>
            </div>
        </div>
    );
}