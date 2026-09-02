import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FooterHeading from "./FooterHeading";

const footerLinks = [
    {
        label: "Study Destinations",
        href: "/destinations",
    },
    {
        label: "Universities",
        href: "/universities",
    },
    {
        label: "Find a Course",
        href: "/courses",
    },
    {
        label: "Our Branches",
        href: "/branches",
    },
    {
        label: "Contact",
        href: "/contact-us",
    },
];

export default function FooterQuickLinks() {
    return (
        <nav
            aria-label="Footer navigation"
            className="
                mx-auto
                w-full
                max-w-md

                rounded-2xl
                border
                border-white/10

                bg-white/[0.035]

                px-5
                py-7

                text-center

                shadow-[0_14px_35px_rgba(0,0,0,0.12)]

                sm:px-7
                sm:py-8

                lg:mx-0
                lg:max-w-none
                lg:rounded-none
                lg:border-0
                lg:border-l
                lg:border-white/15
                lg:bg-transparent
                lg:px-8
                lg:py-0
                lg:text-left
                lg:shadow-none
            "
        >
            <FooterHeading>
                Quick Links
            </FooterHeading>

            <ul
                className="
                    mt-6
                    flex
                    flex-col
                    items-center
                    gap-2.5

                    lg:items-start
                "
            >
                {footerLinks.map((item) => (
                    <li
                        key={item.href}
                        className="
                            w-full
                            max-w-[250px]

                            lg:max-w-none
                        "
                    >
                        <Link
                            href={item.href}
                            className="
                                group

                                flex
                                w-full
                                items-center
                                justify-between
                                gap-3

                                rounded-xl

                                border
                                border-white/[0.06]

                                bg-white/[0.035]

                                px-3.5
                                py-2.5

                                text-sm
                                font-semibold
                                text-white/75

                                transition-all
                                duration-300

                                hover:border-primary/30
                                hover:bg-primary/10
                                hover:text-white

                                lg:inline-flex
                                lg:w-auto
                                lg:justify-start
                                lg:border-transparent
                                lg:bg-transparent
                                lg:px-2
                                lg:py-1.5
                            "
                        >
                            <span>
                                {item.label}
                            </span>

                            <span
                                className="
                                    grid
                                    size-7
                                    shrink-0
                                    place-items-center

                                    rounded-full

                                    bg-primary/10
                                    text-primary

                                    transition-all
                                    duration-300

                                    group-hover:bg-primary
                                    group-hover:text-white
                                "
                            >
                                <ArrowRight
                                    aria-hidden="true"
                                    className="
                                        size-3.5

                                        transition-transform
                                        duration-300

                                        group-hover:translate-x-0.5
                                    "
                                />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}