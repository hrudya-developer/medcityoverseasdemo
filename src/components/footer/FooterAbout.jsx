import Link from "next/link";

import {
    ArrowRight,
    UserRound,
} from "lucide-react";

import FooterHeading from "./FooterHeading";

export default function FooterAbout() {
    return (
        <div
            className="
                border-white/15
                text-center

                lg:border-l
                lg:px-8
                lg:text-left
            "
        >
            <FooterHeading>
                About Us
            </FooterHeading>

            <p
                className="
                    mt-6
                    text-sm
                    leading-7
                    text-white/75
                "
            >
                Since 2012, Medcity International
                Overseas Corporation has supported
                students who aspire to study overseas
                and professionals who plan to build
                international careers.
            </p>

            <div
                className="
                    mt-7
                    flex
                    justify-center

                    lg:justify-start
                "
            >
                <Link
                    href="/login"
                    className="
                        group
                        inline-flex
                        min-h-[48px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-2xl
                        border
                        border-primary/30
                        bg-gradient-to-r
                        from-primary
                        to-darkPrimary
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-[0_12px_30px_rgba(192,31,83,0.22)]
                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:shadow-[0_16px_36px_rgba(192,31,83,0.28)]
                    "
                >
                    <span
                        className="
                            grid
                            size-8
                            place-items-center
                            rounded-2xl
                            bg-white/15
                        "
                    >
                        <UserRound
                            className="size-4"
                            aria-hidden="true"
                        />
                    </span>

                    Student Login

                    <ArrowRight
                        className="
                            size-4
                            transition-transform
                            group-hover:translate-x-1
                        "
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </div>
    );
}