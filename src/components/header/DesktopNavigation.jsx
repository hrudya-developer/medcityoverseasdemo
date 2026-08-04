import Link from "next/link";

import ExploreMenu from "./ExploreMenu";
import navItems from "./navItems";

const linkClasses =
    "whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

export default function DesktopNavigation() {
    const navigationItems =
        navItems.filter(
            (item) =>
                item.path !== "/blogs"
        );

    return (
        <nav
            aria-label="Primary navigation"
            className="hidden flex-1 items-center justify-center lg:flex"
        >
            <ul className="flex items-center gap-1 text-sm font-semibold text-white xl:text-base">
                {navigationItems.map(
                    (item) => (
                        <li
                            key={
                                item.path
                            }
                        >
                            <Link
                                href={
                                    item.path
                                }
                                className={
                                    linkClasses
                                }
                            >
                                {
                                    item.name
                                }
                            </Link>
                        </li>
                    )
                )}

                <ExploreMenu />

                <li>
                    <Link
                        href="/blogs"
                        className={
                            linkClasses
                        }
                    >
                        Blogs
                    </Link>
                </li>
            </ul>
        </nav>
    );
}