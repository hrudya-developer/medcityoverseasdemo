"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Headset,
  UserRound,
} from "lucide-react";

import navItems from "./navItems";

export default function MobileMenu({
  open,
  closeMenu,
  openCounsellingPopup,
}) {
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, closeMenu]);

  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname === path ||
        pathname.startsWith(`${path}/`);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      onClick={closeMenu}
    >
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-primary px-4 py-5 shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(
              item.path
            );

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={closeMenu}
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 font-semibold transition ${
                    active
                      ? "bg-white text-primary"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>{item.name}</span>

                  <ChevronRight
                    size={18}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 space-y-3 border-t border-white/15 pt-5">
          <button
            type="button"
            onClick={
              openCounsellingPopup
            }
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 font-bold text-darkPrimary transition hover:bg-logoYellow"
          >
            <Headset
              size={18}
              aria-hidden="true"
            />

            Get Free Counselling
          </button>

          <Link
            href="/login"
            onClick={closeMenu}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/5 px-4 font-bold text-white transition hover:bg-white hover:text-primary"
          >
            <UserRound
              size={18}
              aria-hidden="true"
            />

            Student Login
          </Link>
        </div>
      </nav>
    </div>
  );
}