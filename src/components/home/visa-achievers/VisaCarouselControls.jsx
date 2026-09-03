import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function VisaCarouselControls({
    maxIndex,
    currentIndex,
    onPrevious,
    onNext,
    onSelect,
}) {
    if (maxIndex <= 0) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                onClick={onPrevious}
                aria-label="Show previous visa achievers"
                className="
                    absolute
                    left-[-10px]
                    top-1/2
                    z-20
                    hidden
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-primary
                    text-white
                    shadow-xl
                    backdrop-blur-md
                    transition-all
                    hover:bg-primary
                    lg:flex
                "
            >
                <ChevronLeft
                    size={20}
                />
            </button>

            <button
                type="button"
                onClick={onNext}
                aria-label="Show next visa achievers"
                className="
                    absolute
                    right-[-10px]
                    top-1/2
                    z-20
                    hidden
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-primary
                    text-white
                    shadow-xl
                    backdrop-blur-md
                    transition-all
                    hover:bg-primary
                    lg:flex
                "
            >
                <ChevronRight
                    size={20}
                />
            </button>

            <div
                className="
                    mt-9
                    flex
                    items-center
                    justify-center
                    gap-2
                "
            >
                {Array.from({
                    length:
                        maxIndex + 1,
                }).map(
                    (_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() =>
                                onSelect(
                                    index
                                )
                            }
                            aria-label={`Go to visa achievers slide ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentIndex ===
                                index
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-gray-400 hover:bg-white/40"
                            }`}
                        />
                    )
                )}
            </div>
        </>
    );
}