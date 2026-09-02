import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

import FooterServiceIcons from "./FooterServiceIcons";

export default function FooterBrand() {
    return (
        <div
            className="
                flex
                flex-col
                items-center
                text-center

                lg:items-start
                lg:text-left
            "
        >
            <Link
                href="/"
                aria-label="Medcity Study Abroad home"
                className="
                    inline-flex
                    rounded-md
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-4
                    focus-visible:ring-offset-[#070707]
                "
            >
                <Image
                    src={logo}
                    alt="Medcity International Overseas Corporation"
                    className="
                        h-auto
                        w-48

                        sm:w-56

                        lg:w-64
                    "
                    sizes="
                        (max-width: 640px) 192px,
                        (max-width: 1024px) 224px,
                        256px
                    "
                />
            </Link>

            <p
                className="
                    mt-5
                    max-w-sm
                    text-sm
                    leading-7
                    text-white/75
                "
            >
                Supporting students and professionals
                with overseas education, career and
                migration opportunities.
            </p>

            <FooterServiceIcons />
        </div>
    );
}