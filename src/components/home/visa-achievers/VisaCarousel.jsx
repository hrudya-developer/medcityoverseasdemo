import VisaAchieverCard from "./VisaAchieverCard";
import VisaCarouselControls from "./VisaCarouselControls";

export default function VisaCarousel({
    achievers,
    imagePath,
    itemsPerView,
    currentIndex,
    maxIndex,
    setCurrentIndex,
    setIsPaused,
    handlePrevious,
    handleNext,
}) {
    return (
        <div
            className="relative"
            onMouseEnter={() =>
                setIsPaused(true)
            }
            onMouseLeave={() =>
                setIsPaused(false)
            }
        >
            <div className="overflow-hidden">
                <div
                    className="
                        flex
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                    style={{
                        transform: `translateX(-${
                            currentIndex *
                            (100 /
                                itemsPerView)
                        }%)`,
                    }}
                >
                    {achievers.map(
                        (
                            achiever,
                            index
                        ) => (
                            <div
                                key={
                                    achiever?.id ||
                                    index
                                }
                                className="
                                    shrink-0
                                    px-2.5
                                "
                                style={{
                                    width: `${
                                        100 /
                                        itemsPerView
                                    }%`,
                                }}
                            >
                                <VisaAchieverCard
                                    achiever={
                                        achiever
                                    }
                                    index={
                                        index
                                    }
                                    imagePath={
                                        imagePath
                                    }
                                />
                            </div>
                        )
                    )}
                </div>
            </div>

            <VisaCarouselControls
                maxIndex={maxIndex}
                currentIndex={
                    currentIndex
                }
                onPrevious={
                    handlePrevious
                }
                onNext={
                    handleNext
                }
                onSelect={
                    setCurrentIndex
                }
            />
        </div>
    );
}