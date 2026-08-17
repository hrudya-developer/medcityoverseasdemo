"use client";

import {
    useEffect,
    useMemo,
    useState,
    useRef,
} from "react";

import { useRouter } from "next/navigation";

import {
    useGetAllDestinationsQuery,
} from "@/lib/services/searchApi";

import CountrySidebar from "./components/CountrySidebar";
import UniversitiesHeader from "./components/UniversitiesHeader";
import UniversitiesLoading from "./components/UniversitiesLoading";
import UniversitiesState from "./components/UniversitiesState";
import UniversityCard from "./components/UniversityCard";

import useUniversitiesByCountry from "./hooks/useUniversitiesByCountry";

import {
    getDestinationId,
    getDestinationName,
    getUniversityId,
    getUniversityLocation,
    getUniversityName,
} from "./lib/universityUtils";

const UniversitiesByCountry = ({
    initialCountryId,
    initialCountryName = "",
    embedded = false,
}) => {
    const router = useRouter();

    const [
        selectedCountryId,
        setSelectedCountryId,
    ] = useState(
        Number(initialCountryId) || 0
    );

    const [
        selectedCountryName,
        setSelectedCountryName,
    ] = useState(
        initialCountryName || ""
    );

    const [
        searchTerm,
        setSearchTerm,
    ] = useState("");

    const previousInitialCountryIdRef = useRef(initialCountryId);

    const {
        data: destinationsData,
        isLoading: countriesLoading,
        isFetching: countriesFetching,
        isError: countriesError,
        refetch: refetchCountries,
    } = useGetAllDestinationsQuery(0);

    const destinations = useMemo(() => {
        return Array.isArray(
            destinationsData?.destinations
        )
            ? destinationsData.destinations
            : [];
    }, [destinationsData]);

    const destinationImagePath =
        destinationsData?.imagePath || "";

    const {
        universities,
        universityImagePath,
        nextOffset,
        loading: universitiesLoading,
        error: universitiesError,
        refetch: refetchUniversities,
    } = useUniversitiesByCountry({
        countryId: selectedCountryId,
        uid: 0,
        offset: 0,
        keyword: "alluniversities",
    });

    /*
     * Keep local state synchronized when
     * Next.js route parameters change.
     */
    useEffect(() => {
        if (previousInitialCountryIdRef.current !== initialCountryId) {
            previousInitialCountryIdRef.current = initialCountryId;
            setSelectedCountryId(
                Number(initialCountryId) || 0
            );
            setSelectedCountryName(
                initialCountryName || ""
            );
            setSearchTerm("");
        }
    }, [
        initialCountryId,
        initialCountryName,
    ]);

    /*
     * Find the country name from the
     * destinations API when it is not
     * available in the query string.
     */
    useEffect(() => {
        if (
            !selectedCountryId ||
            selectedCountryName ||
            !destinations.length
        ) {
            return;
        }

        const selectedDestination =
            destinations.find(
                (destination) =>
                    String(
                        getDestinationId(
                            destination
                        )
                    ) ===
                    String(
                        selectedCountryId
                    )
            );

        if (!selectedDestination) {
            return;
        }

        setSelectedCountryName(
            getDestinationName(
                selectedDestination
            )
        );
    }, [
        destinations,
        selectedCountryId,
        selectedCountryName,
    ]);

    /*
     * Select the first available destination
     * when the page has no valid country ID.
     */
    useEffect(() => {
        if (
            selectedCountryId ||
            !destinations.length
        ) {
            return;
        }

        const firstDestination =
            destinations[0];

        const firstCountryId =
            getDestinationId(
                firstDestination
            );

        const firstCountryName =
            getDestinationName(
                firstDestination
            );

        if (!firstCountryId) {
            return;
        }

        setSelectedCountryId(
            Number(firstCountryId)
        );

        setSelectedCountryName(
            firstCountryName
        );

        router.replace(
            `/all-universities/${firstCountryId}?country=${encodeURIComponent(
                firstCountryName
            )}`,
            {
                scroll: false,
            }
        );
    }, [
        destinations,
        router,
        selectedCountryId,
    ]);

    const filteredUniversities =
        useMemo(() => {
            const normalizedSearch =
                searchTerm
                    .trim()
                    .toLowerCase();

            if (!normalizedSearch) {
                return universities;
            }

            return universities.filter(
                (university) => {
                    const universityName =
                        getUniversityName(
                            university
                        ).toLowerCase();

                    const universityLocation =
                        getUniversityLocation(
                            university,
                            selectedCountryName
                        ).toLowerCase();

                    return (
                        universityName.includes(
                            normalizedSearch
                        ) ||
                        universityLocation.includes(
                            normalizedSearch
                        )
                    );
                }
            );
        }, [
            searchTerm,
            selectedCountryName,
            universities,
        ]);

    const handleCountryChange = (
        destination
    ) => {
        const countryId =
            getDestinationId(
                destination
            );

        const countryName =
            getDestinationName(
                destination
            );

        if (!countryId) {
            return;
        }

        setSelectedCountryId(
            Number(countryId)
        );

        setSelectedCountryName(
            countryName
        );

        setSearchTerm("");

        router.push(
            `/all-universities/${countryId}?country=${encodeURIComponent(
                countryName
            )}`,
            {
                scroll: false,
            }
        );
    };

    const handleSearchChange = (
        event
    ) => {
        setSearchTerm(
            event.target.value
        );
    };

    return (
        <section
            aria-labelledby="universities-heading"
            className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div
                className="mx-auto grid w-full max-w-[1600px] items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]"
            >
                <CountrySidebar
                    destinations={
                        destinations
                    }
                    destinationImagePath={
                        destinationImagePath
                    }
                    selectedCountryId={
                        selectedCountryId
                    }
                    loading={
                        countriesLoading ||
                        countriesFetching
                    }
                    error={
                        countriesError
                    }
                    onCountryChange={
                        handleCountryChange
                    }
                    onRetry={
                        refetchCountries
                    }
                />

                <div
                    className="min-w-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                >
                    <UniversitiesHeader
                        countryName={
                            selectedCountryName
                        }
                        universityCount={
                            filteredUniversities.length
                        }
                        searchTerm={
                            searchTerm
                        }
                        onSearchChange={
                            handleSearchChange
                        }
                    />

                    <div className="p-5 sm:p-7">
                        {universitiesLoading ? (
                            <UniversitiesLoading
                                count={6}
                            />
                        ) : universitiesError ? (
                            <UniversitiesState
                                type="error"
                                title="Unable to load universities"
                                description={
                                    universitiesError
                                }
                                onRetry={
                                    refetchUniversities
                                }
                            />
                        ) : filteredUniversities.length >
                            0 ? (
                            <>
                                <div
                                    id="universities-panel"
                                    role="tabpanel"
                                    aria-labelledby="universities-heading"
                                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                                >
                                    {filteredUniversities.map(
                                        (
                                            university,
                                            index
                                        ) => {
                                            const universityId =
                                                getUniversityId(
                                                    university
                                                );

                                            const universityName =
                                                getUniversityName(
                                                    university
                                                );

                                            return (
                                                <UniversityCard
                                                    key={
                                                        universityId ||
                                                        `${universityName}-${index}`
                                                    }
                                                    university={
                                                        university
                                                    }
                                                    universityImagePath={
                                                        universityImagePath
                                                    }
                                                    countryName={
                                                        selectedCountryName
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>

                                {nextOffset !==
                                    null && (
                                        <p className="mt-8 text-center text-xs text-slate-400">
                                            More universities
                                            may be available.
                                        </p>
                                    )}
                            </>
                        ) : (
                            <UniversitiesState
                                type="empty"
                                title="No universities found"
                                description={
                                    searchTerm
                                        ? `No universities match "${searchTerm}". Try another university name or location.`
                                        : `No universities are currently available for ${selectedCountryName ||
                                        "this destination"
                                        }.`
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniversitiesByCountry;