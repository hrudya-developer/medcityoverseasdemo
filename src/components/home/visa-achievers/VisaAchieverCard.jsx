import Image from "next/image";

import {
    CheckCircle2,
} from "lucide-react";

import {
    getCountry,
    getImage,
    getName,
} from "./visaAchieversUtils";

export default function VisaAchieverCard({
    achiever,
    index,
    imagePath,
}) {
    const image =
        getImage(
            achiever,
            imagePath
        );

    const name =
        getName(
            achiever
        );

    const country =
        getCountry(
            achiever
        );

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-white/12
                bg-white/[0.07]
                p-2
                shadow-[0_20px_50px_rgba(0,0,0,0.22)]
                backdrop-blur-sm
                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-white/25
                hover:bg-white/[0.1]
            "
        >
            <div
                className="
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    rounded-[20px]
                    bg-black/20
                "
            >
                {image && (
                    <Image
                        src={image}
                        alt={
                            country
                                ? `${name || "Medcity Overseas student"} - student visa approved for ${country}`
                                : `${name || "Student"} - Medcity Overseas visa achiever`
                        }
                        fill
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            (max-width: 1280px) 33vw,
                            25vw
                        "
                        className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-[1.06]
                        "
                    />
                )}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#240814]
                        via-transparent
                        to-black/10
                    "
                />

                <div
                    className="
                        absolute
                        left-4
                        top-4
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-white/20
                        bg-black/35
                        px-3
                        py-1.5
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.08em]
                        text-white
                        backdrop-blur-md
                    "
                >
                    <CheckCircle2
                        size={13}
                        className="text-emerald-400"
                    />

                    Visa Approved
                </div>

                <div
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-white/10
                        text-[10px]
                        font-black
                        text-white/75
                        backdrop-blur-md
                    "
                >
                    {String(
                        index + 1
                    ).padStart(
                        2,
                        "0"
                    )}
                </div>

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-5
                    "
                >
                    {country && (
                        <span
                            className="
                                mb-3
                                inline-flex
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                px-3
                                py-1
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.12em]
                                text-white/80
                                backdrop-blur-md
                            "
                        >
                            Study in {country}
                        </span>
                    )}

                    {name && (
                        <h3
                            className="
                                text-xl
                                font-black
                                leading-tight
                                text-white
                            "
                        >
                            {name}
                        </h3>
                    )}

                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-white/55
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-[#ffd54a]
                            "
                        />

                        Student Visa Granted
                    </div>
                </div>
            </div>
        </article>
    );
}