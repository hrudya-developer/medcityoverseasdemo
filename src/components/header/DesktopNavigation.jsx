"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ExploreMenu from "./ExploreMenu";
import navItems from "./navItems";

const baseClasses =
  "whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

export default function DesktopNavigation() {
  const pathname = usePathname();

  const navigationItems = navItems.filter(
    (item) =>
      item.path !== "/" &&
      item.path !== "/blogs"
  );

  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname === path ||
        pathname.startsWith(`${path}/`);

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden flex-1 items-center justify-center lg:flex"
    >
      <ul className="flex items-center gap-1 text-sm font-semibold text-white xl:text-base">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              aria-current={
                isActive(item.path)
                  ? "page"
                  : undefined
              }
              className={`${baseClasses} ${
                isActive(item.path)
                  ? "bg-white text-primary"
                  : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        <ExploreMenu />

        <li>
          <Link
            href="/blogs"
            aria-current={
              isActive("/blogs")
                ? "page"
                : undefined
            }
            className={`${baseClasses} ${
              isActive("/blogs")
                ? "bg-white text-primary"
                : "hover:bg-white/10"
            }`}
          >
            Blogs
          </Link>
        </li>
      </ul>
    </nav>
  );
}