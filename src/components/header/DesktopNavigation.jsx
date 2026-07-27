import Link from "next/link";

import ExploreMenu from "./ExploreMenu";
import navItems from "./navItems";

const linkClasses = `
  whitespace-nowrap
  rounded-lg
  px-3
  py-2
  transition-colors
  duration-300
  hover:bg-white/10
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-white/70
  focus-visible:ring-offset-2
  focus-visible:ring-offset-darkPrimary
`;

const DesktopNavigation = () => {
    const primaryNavItems = navItems.slice(0, 4);

    return (
        <nav
            aria-label="Primary navigation"
            className="
        hidden
        flex-1
        items-center
        justify-center
        lg:flex
      "
        >
            <ul
                className="
          flex
          items-center
          gap-1
          text-sm
          font-semibold
          text-white
          xl:text-base
        "
            >
                {primaryNavItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            href={item.path}
                            className={linkClasses}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* ExploreMenu already returns an <li> */}
                <ExploreMenu />

                <li>
                    <Link
                        href="/study-abroad-blog"
                        className={linkClasses}
                    >
                        Blogs
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default DesktopNavigation;