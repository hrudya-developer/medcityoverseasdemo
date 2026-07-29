"use client";

import {
    useGetAllDestinationsQuery,
} from "@/lib/services/searchApi";

import DestinationEmpty from "./DestinationEmpty";
import DestinationError from "./DestinationError";
import DestinationHeader from "./DestinationHeader";
import DestinationLoading from "./DestinationLoading";
import DestinationsSlider from "./DestinationsSlider";

export default function DestinationsSection() {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetAllDestinationsQuery();

    const destinations =
        data?.destinations ?? [];

    const imagePath =
        data?.imagePath ?? "";

    const initialLoading =
        (isLoading || isFetching) &&
        destinations.length === 0;

    if (initialLoading) {
        return <DestinationLoading />;
    }

    return (
        <section
            id="study-destinations"
            aria-labelledby="destinations-heading"
            className="
                relative
                overflow-hidden
                bg-gradient-to-b
                from-[#f7fbff]
                via-white
                to-[#fff7fb]
                py-12
                sm:py-14
                md:py-16
                lg:py-20
            "
        >
            <SectionBackground />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-[1536px]
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                <DestinationHeader />

                {isError ? (
                    <DestinationError
                        message={
                            error?.data?.message ||
                            error?.error ||
                            "Unable to load destinations."
                        }
                        onRetry={refetch}
                    />
                ) : destinations.length > 0 ? (
                    <DestinationsSlider
                        destinations={
                            destinations
                        }
                        imagePath={
                            imagePath
                        }
                    />
                ) : (
                    <DestinationEmpty />
                )}
            </div>
        </section>
    );
}

function SectionBackground() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-20
                    h-72
                    w-72
                    rounded-full
                    bg-primary/[0.07]
                    blur-3xl
                    sm:h-96
                    sm:w-96
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    bottom-10
                    h-72
                    w-72
                    rounded-full
                    bg-secondary/[0.07]
                    blur-3xl
                    sm:h-96
                    sm:w-96
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.025]
                    [background-image:radial-gradient(circle_at_center,#631A33_1px,transparent_1px)]
                    [background-size:22px_22px]
                "
            />
        </>
    );
}