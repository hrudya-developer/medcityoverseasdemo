import {
    GraduationCap,
} from "lucide-react";

export default function CourseHeroActions({
    level,
}) {
    return (
        <div
            className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-3

                lg:justify-start
            "
        >
            <div
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-logoYellow
                    px-5
                    py-2.5
                    text-xs
                    font-black
                    text-[#07162f]
                    shadow-[0_10px_30px_rgba(0,0,0,0.15)]

                    sm:text-sm
                "
            >
                <GraduationCap
                    size={18}
                    strokeWidth={2.2}
                    aria-hidden="true"
                />

                <span>
                    {level}

                    {level &&
                    !String(level)
                        .toLowerCase()
                        .includes(
                            "program"
                        )
                        ? " Program"
                        : ""}
                </span>
            </div>
        </div>
    );
}