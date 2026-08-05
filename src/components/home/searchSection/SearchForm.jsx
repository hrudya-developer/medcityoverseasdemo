"use client";

import Select from "react-select";

import {
    GraduationCap,
    MapPin,
    School,
} from "lucide-react";

import SearchButton from "./SearchButton";
import SearchField from "./SearchField";
import SearchProgress from "./SearchProgress";

import {
    selectStyles,
} from "./styles/selectStyles";

export default function SearchForm({
    countryId,
    universityId,
    courseId,

    countryOptions,
    universityOptions,
    courseOptions,

    selectedCountry,
    selectedUniversity,
    selectedCourse,

    destinationsLoading,
    universitiesLoading,
    coursesLoading,

    onCountryChange,
    onUniversityChange,
    onCourseChange,

    onSearch,
    canSearch,
    searchLoading,
}) {
    const portalTarget =
        typeof document !== "undefined"
            ? document.body
            : undefined;

    return (
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-4 lg:p-5">
            <div
                aria-hidden="true"
                className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_190px] xl:items-stretch">
                <SearchField
                    icon={MapPin}
                    step="01"
                    label="Destination"
                    active={Boolean(countryId)}
                >
                    <Select
                        instanceId="country-search"
                        value={selectedCountry}
                        onChange={onCountryChange}
                        options={countryOptions}
                        placeholder={
                            destinationsLoading
                                ? "Loading destinations..."
                                : "Select destination"
                        }
                        isLoading={destinationsLoading}
                        isDisabled={destinationsLoading}
                        isSearchable
                        isClearable
                        styles={selectStyles}
                        menuPortalTarget={portalTarget}
                        menuPosition="fixed"
                        noOptionsMessage={() =>
                            "No destinations found"
                        }
                    />
                </SearchField>

                <SearchField
                    icon={School}
                    step="02"
                    label="University"
                    active={Boolean(universityId)}
                    disabled={!countryId}
                >
                    <Select
                        instanceId="university-search"
                        value={selectedUniversity}
                        onChange={onUniversityChange}
                        options={universityOptions}
                        placeholder={
                            !countryId
                                ? "Select destination first"
                                : universitiesLoading
                                    ? "Loading universities..."
                                    : universityOptions.length
                                        ? "Select university"
                                        : "No universities found"
                        }
                        isDisabled={
                            !countryId ||
                            universitiesLoading
                        }
                        isLoading={universitiesLoading}
                        isSearchable
                        isClearable
                        styles={selectStyles}
                        menuPortalTarget={portalTarget}
                        menuPosition="fixed"
                        noOptionsMessage={() =>
                            "No universities found"
                        }
                    />
                </SearchField>

                <SearchField
                    icon={GraduationCap}
                    step="03"
                    label="Main Course"
                    active={Boolean(courseId)}
                    disabled={!universityId}
                >
                    <Select
                        instanceId="course-search"
                        value={selectedCourse}
                        onChange={onCourseChange}
                        options={courseOptions}
                        placeholder={
                            !universityId
                                ? "Select university first"
                                : coursesLoading
                                    ? "Loading courses..."
                                    : courseOptions.length
                                        ? "Select main course"
                                        : "No courses found"
                        }
                        isDisabled={
                            !universityId ||
                            coursesLoading ||
                            !courseOptions.length
                        }
                        isLoading={coursesLoading}
                        isSearchable
                        isClearable
                        styles={selectStyles}
                        menuPortalTarget={portalTarget}
                        menuPosition="fixed"
                        noOptionsMessage={() =>
                            "No courses found"
                        }
                    />
                </SearchField>

                <SearchButton
                    onClick={onSearch}
                    loading={searchLoading}
                    disabled={
                        !canSearch ||
                        searchLoading
                    }
                />
            </div>

            <SearchProgress
                countrySelected={Boolean(countryId)}
                universitySelected={Boolean(universityId)}
                courseSelected={Boolean(courseId)}
            />
        </div>
    );
}