"use client";

import {
    Menu,
    X,
} from "lucide-react";

export default function MobileMenuButton({
    mobileOpen,
    setMobileOpen,
}) {
    const toggleMobileMenu = () => {
        setMobileOpen(
            (currentState) =>
                !currentState
        );
    };

    return (
        <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={
                mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            }
            className="grid size-10 place-content-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary lg:hidden"
        >
            {mobileOpen ? (
                <X
                    size={22}
                    strokeWidth={2.4}
                    aria-hidden="true"
                />
            ) : (
                <Menu
                    size={22}
                    strokeWidth={2.4}
                    aria-hidden="true"
                />
            )}
        </button>
    );
}