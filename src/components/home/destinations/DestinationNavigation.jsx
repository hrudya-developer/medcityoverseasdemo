import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const navigationButtonClasses = `
    grid
    h-11
    w-11
    place-items-center
    rounded-full
    border
    border-slate-200
    bg-primary
    text-white
    shadow-[0_8px_24px_rgba(15,23,42,0.09)]
    transition-all
    duration-300
    hover:border-primary
    hover:bg-primary
    hover:text-white
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-35
    sm:h-12
    sm:w-12
`;

export default function DestinationNavigation({
    previousButtonRef,
    nextButtonRef,
}) {
    return (
        <div
            className="
                mt-7
                flex
                items-center
                justify-center
                gap-4
                sm:mt-9
            "
        >
            <button
                ref={previousButtonRef}
                type="button"
                aria-label="Show previous destinations"
                className={`
                    destination-prev-button
                    ${navigationButtonClasses}
                    hover:-translate-x-0.5
                `}
            >
                <ChevronLeft
                    aria-hidden="true"
                    size={22}
                    strokeWidth={2.5}
                />
            </button>

            <button
                ref={nextButtonRef}
                type="button"
                aria-label="Show next destinations"
                className={`
                    destination-next-button
                    ${navigationButtonClasses}
                    hover:translate-x-0.5
                `}
            >
                <ChevronRight
                    aria-hidden="true"
                    size={22}
                    strokeWidth={2.5}
                />
            </button>
        </div>
    );
}