"use client";

import {
    ArrowRight,
} from "lucide-react";

export default function SubmitButton({
    loading,
}) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="
                group

                flex
                h-14

                items-center
                justify-center

                gap-2.5

                rounded-2xl

                bg-gradient-to-r

                from-[#631A33]
                via-[#8f1d45]
                to-[#c01f53]

                px-6

                text-sm
                font-black
                text-white

                shadow-[0_14px_32px_rgba(99,26,51,0.20)]

                transition-all

                hover:-translate-y-0.5

                hover:shadow-[0_18px_40px_rgba(192,31,83,0.25)]

                disabled:pointer-events-none
                disabled:opacity-60

                md:col-span-2
            "
        >
            {loading ? (
                <>
                    <span
                        className="
                            h-5
                            w-5

                            animate-spin

                            rounded-full

                            border-2
                            border-white/30
                            border-t-white
                        "
                    />

                    Creating Profile...
                </>
            ) : (
                <>
                    Continue

                    <ArrowRight
                        size={17}
                        className="
                            transition-transform
                            group-hover:translate-x-1
                        "
                    />
                </>
            )}
        </button>
    );
}