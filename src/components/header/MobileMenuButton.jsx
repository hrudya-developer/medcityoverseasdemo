"use client";

const MobileMenuButton = ({
    mobileOpen,
    setMobileOpen,
}) => {
    const toggleMobileMenu = () => {
        setMobileOpen((previousState) => !previousState);
    };

    return (
        <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-label={
                mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            }
            className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        text-xl
        text-white
        transition-colors
        duration-200
        hover:bg-white/10
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-primary
        lg:hidden
      "
        >
            <span aria-hidden="true">
                {mobileOpen ? "×" : "☰"}
            </span>
        </button>
    );
};

export default MobileMenuButton;