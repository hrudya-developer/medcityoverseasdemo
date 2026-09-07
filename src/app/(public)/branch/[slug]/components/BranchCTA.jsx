import Link from "next/link";

import {
    ArrowRight,
    Globe2,
} from "lucide-react";

export default function BranchCTA({
    center,
}) {
    const location =
        center.seoLocation ||
        center.city;

    return (
        <section className="px-5 pb-14 sm:px-6 lg:pb-20">
            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    overflow-hidden
                    rounded-[32px]
                    bg-gradient-to-r
                    from-[#eaf6ff]
                    via-[#f8fbff]
                    to-[#fff0f5]
                    px-6
                    py-12
                    sm:px-10
                    lg:px-14
                "
            >
                <Globe2
                    aria-hidden="true"
                    size={300}
                    className="
                        absolute
                        -right-16
                        -top-20
                        text-secondary/10
                    "
                />

                <div
                    className="
                        relative
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.22em]
                                text-primary
                            "
                        >
                            Start Your Journey
                        </p>

                        <h2
                            className="
                                mt-3
                                max-w-3xl
                                text-3xl
                                font-black
                                leading-tight
                                text-darkPrimary
                                sm:text-4xl
                            "
                        >
                            Talk to Our Study Abroad
                            Experts in{" "}
                            <span className="text-primary">
                                {location}
                            </span>
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-2xl
                                leading-7
                                text-slate-600
                            "
                        >
                            Meet the Medcity
                            Overseas{" "}
                            {location} team and get
                            personalised guidance
                            for your international
                            education journey.
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
                            rounded-2xl
                            bg-primary
                            px-7
                            py-4
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-primary/20
                            transition
                            hover:-translate-y-0.5
                            hover:bg-darkPrimary
                        "
                    >
                        Book Free Counselling

                        <ArrowRight
                            size={18}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}