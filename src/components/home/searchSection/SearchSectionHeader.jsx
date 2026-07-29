import {
    GraduationCap,
} from "lucide-react";

export default function SearchSectionHeader() {
    return (
        <div
            className="
                mx-auto mb-8
                max-w-3xl
                text-center
                lg:mb-10
            "
        >
            <span
                className="
                    inline-flex
                    items-center gap-2
                    rounded-full
                    border border-primary/30
                    bg-primary/10
                    px-4 py-2
                    text-xs font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-pink-200
                    backdrop-blur-md
                "
            >
                <GraduationCap size={15} />

                Find Your Perfect Program
            </span>

            <h2
                className="
                    mt-5
                    text-3xl font-black
                    leading-tight
                    tracking-[-0.03em]
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                "
            >
                Start Your{" "}
                <span
                    className="
                        bg-gradient-to-r
                        from-[#ff7cad]
                        via-primary
                        to-[#ffb1cd]
                        bg-clip-text
                        text-transparent
                    "
                >
                    Study Abroad
                </span>{" "}
                Journey
            </h2>

            <p
                className="
                    mx-auto mt-4
                    max-w-2xl
                    text-sm leading-7
                    text-white/65
                    sm:text-base
                "
            >
                Choose your destination,
                preferred university and course
                to explore programs that match
                your goals.
            </p>
        </div>
    );
}