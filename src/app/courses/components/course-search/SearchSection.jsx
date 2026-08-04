"use client";

import SearchErrorAlert from "./SearchErrorAlert";
import SearchForm from "./SearchForm";
import SearchResultsModal from "./SearchResultsModal";
import SearchSectionBackground from "./SearchSectionBackground";
import SearchSectionHeader from "./SearchSectionHeader";

import useCourseSearch from "./hooks/useCourseSearch";

export default function SearchSection({
    uid = 0,
    title = "Find Your Perfect Study Program",
    description = "Choose a destination, university and main course to discover matching international programs.",
    className = "",
}) {
    const search = useCourseSearch({ uid });

    return (
        <>
            <section
                aria-label="Search study abroad courses"
                className={`
                    relative isolate
                    w-full overflow-hidden
                    bg-black py-12
                    sm:py-14
                    lg:py-16
                    ${className}
                `}
            >
                <SearchSectionBackground />

                <div
                    className="
                        relative mx-auto
                        max-w-[1450px]
                        px-4 sm:px-6 lg:px-8
                    "
                >
                    <SearchSectionHeader
                        title={title}
                        description={description}
                    />

                    {search.hasDropdownError && (
                        <SearchErrorAlert />
                    )}

                    <SearchForm
                        countryId={search.countryId}
                        universityId={search.universityId}
                        courseId={search.courseId}
                        countryOptions={
                            search.countryOptions
                        }
                        universityOptions={
                            search.universityOptions
                        }
                        courseOptions={
                            search.courseOptions
                        }
                        selectedCountry={
                            search.selectedCountry
                        }
                        selectedUniversity={
                            search.selectedUniversity
                        }
                        selectedCourse={
                            search.selectedCourse
                        }
                        destinationsLoading={
                            search.destinationsLoading
                        }
                        universitiesLoading={
                            search.universitiesLoading
                        }
                        coursesLoading={
                            search.coursesLoading
                        }
                        onCountryChange={
                            search.handleCountryChange
                        }
                        onUniversityChange={
                            search.handleUniversityChange
                        }
                        onCourseChange={
                            search.handleCourseChange
                        }
                        onSearch={search.handleSearch}
                        canSearch={search.canSearch}
                        searchLoading={
                            search.searchLoading
                        }
                    />

                    <p
                        className="
                            mt-5 text-center
                            text-xs font-medium
                            text-white/45
                        "
                    >
                        Search from hundreds of
                        international universities and
                        study programs.
                    </p>
                </div>
            </section>

            <SearchResultsModal
                open={search.modalOpen}
                onClose={() =>
                    search.setModalOpen(false)
                }
                courses={search.courses}
                currentPage={search.currentPage}
                setCurrentPage={
                    search.setCurrentPage
                }
                nextOffset={search.nextOffset}
                isFetching={search.searchLoading}
                error={search.searchError}
                hasSearched={search.hasSearched}
                onLoadMore={search.loadCourses}
                onRetry={search.handleRetry}
                onViewAll={search.handleViewAll}
                countryName={
                    search.selectedCountry?.label || ""
                }
                universityName={
                    search.selectedUniversity?.label || ""
                }
                courseName={
                    search.selectedCourse?.label || ""
                }
            />
        </>
    );
}