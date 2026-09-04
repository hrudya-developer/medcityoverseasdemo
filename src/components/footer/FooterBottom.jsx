import Link from "next/link";

export default function FooterBottom() {
    const currentYear =
        new Date().getFullYear();

    return (
        <div
            className="
                relative
                z-10
                border-t
                border-white/10
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    max-w-[1600px]
                    flex-col
                    items-center
                    justify-between
                    gap-3
                    px-6
                    py-5
                    text-center
                    text-xs
                    text-white/60

                    sm:px-8

                    md:flex-row
                    md:text-left

                    lg:px-10
                "
            >
                <p>
                    © {currentYear} Medcity International
                    Overseas Corporation. All rights reserved.
                </p>

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-3
                    "
                >
                    <BottomLink href="/privacy-policy">
                        Privacy Policy
                    </BottomLink>

                    {/* <BottomLink href="/terms-and-conditions">
                        Terms and Conditions
                    </BottomLink> */}
                </div>
            </div>
        </div>
    );
}

function BottomLink({
    href,
    children,
}) {
    return (
        <Link
            href={
                href
            }
            className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-3
                py-1.5
                transition-all
                duration-300

                hover:border-primary/30
                hover:bg-primary/10
                hover:text-white
            "
        >
            {children}
        </Link>
    );
}