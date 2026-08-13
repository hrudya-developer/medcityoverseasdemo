"use client";

import {
    ShieldCheck,
} from "lucide-react";

export default function LoadingScreen({
    text =
        "Loading verification...",
}) {
    return (
        <main
            className="
                relative

                grid

                min-h-[calc(100dvh-140px)]

                place-items-center

                overflow-hidden

                bg-[#080611]

                px-4

                text-white
            "
        >
            {/* background */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-[radial-gradient(circle_at_15%_20%,rgba(190,20,83,0.24),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(79,45,145,0.28),transparent_34%),linear-gradient(145deg,#080611,#11091d_52%,#080611)]
                "
            />

            {/* glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute

                    left-1/2
                    top-1/2

                    h-64
                    w-64

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full

                    bg-[#c01f53]/15

                    blur-[80px]
                "
            />

            <div
                className="
                    relative
                    z-10

                    flex
                    min-w-[270px]

                    flex-col

                    items-center

                    rounded-[24px]

                    border
                    border-white/10

                    bg-white/[0.07]

                    px-8
                    py-7

                    text-center

                    shadow-[0_25px_70px_rgba(0,0,0,0.45)]

                    backdrop-blur-2xl
                "
            >
                <div
                    className="
                        relative

                        mb-5

                        grid

                        h-14
                        w-14

                        place-items-center

                        rounded-2xl

                        bg-gradient-to-br

                        from-[#c01f53]
                        to-[#631A33]

                        shadow-[0_10px_30px_rgba(192,31,83,0.30)]
                    "
                >
                    <ShieldCheck
                        size={24}
                    />

                    <span
                        className="
                            absolute

                            -bottom-1
                            -right-1

                            h-5
                            w-5

                            animate-spin

                            rounded-full

                            border-2
                            border-white/30

                            border-t-white

                            bg-[#631A33]
                        "
                    />
                </div>

                <p className="text-sm font-bold text-white">
                    {text}
                </p>

                <p className="mt-1.5 text-xs text-white/45">
                    Please wait a moment
                </p>
            </div>
        </main>
    );
}