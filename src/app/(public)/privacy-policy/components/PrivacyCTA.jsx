import Link from "next/link";
import {
    ArrowRight,
} from "lucide-react";

export default function PrivacyCTA() {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-[#fff0f6]
                via-[#f6f1ff]
                to-[#dff2ff]
                px-6
                py-7

                sm:px-8
            "
        >
            <div
                aria-hidden="true"
                className="
                    absolute
                    right-0
                    top-0
                    h-36
                    w-36
                    rounded-full
                    bg-secondary/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-5

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div>
                    <p
                        className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.28em]
                            text-primary
                        "
                    >
                        Ready to take the next step?
                    </p>

                    <h2
                        className="
                            mt-2
                            text-xl
                            font-black
                            tracking-[-0.02em]
                            text-[#07365c]

                            sm:text-2xl
                        "
                    >
                        Let&apos;s Build Your Global
                        Future
                    </h2>

                    <p
                        className="
                            mt-1
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        Get expert guidance for your
                        study abroad plans.
                    </p>
                </div>

                <Link
                    href="/contact-us"
                    className="
                        inline-flex
                        shrink-0
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-primary
                        px-6
                        py-3.5
                        text-xs
                        font-black
                        text-white
                        shadow-[0_12px_30px_rgba(192,31,83,0.25)]
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-darkPrimary
                    "
                >
                    Get Free Counselling

                    <ArrowRight
                        size={16}
                    />
                </Link>
            </div>
        </section>
    );
}