"use client";

import {
    X,
} from "lucide-react";

export default function EditProfileHeader({
    onClose,
    loading,
}) {
    return (
        <div
            className="
                sticky
                top-0
                z-20

                flex
                items-center
                justify-between

                border-b
                border-slate-100

                bg-white/95

                px-6
                py-4

                backdrop-blur-xl
            "
        >
            <div>
                <p
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-[#c01f53]
                    "
                >
                    Student Profile
                </p>

                <h2
                    id="update-profile-title"
                    className="
                        mt-1
                        text-xl
                        font-black
                        text-slate-950
                    "
                >
                    Update your details
                </h2>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    Edit only the
                    information you want
                    to change.
                </p>
            </div>

            <button
                type="button"
                onClick={
                    onClose
                }
                disabled={
                    loading
                }
                aria-label="Close update profile"
                className="
                    grid
                    h-10
                    w-10
                    place-items-center

                    rounded-xl

                    border
                    border-slate-200

                    bg-white

                    text-slate-500

                    transition-all

                    hover:bg-slate-50
                    hover:text-slate-950

                    disabled:opacity-50
                "
            >
                <X size={17} />
            </button>
        </div>
    );
}