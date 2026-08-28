"use client";

import {
    useMemo,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    useGetDestinationsQuery,
    useGetMainCoursesQuery,
    useGetUniversitiesQuery,
    useLazySearchCoursesQuery,
} from "@/lib/services/searchApi";

import {
    mergeUniqueCourses,
} from "../utils/courseHelpers";

import {
    extractCourses,
    extractNextOffset,
    toOptions,
} from "../utils/searchHelpers";

import { createSlug } from "@/lib/slug";

export default function useCourseSearch({
    uid = 0,
}) {
    const router = useRouter();

    const [countryId, setCountryId] =
        useState("");

    const [
        universityId,
        setUniversityId,
    ] = useState("");

    const [courseId, setCourseId] =
        useState("");

    const [modalOpen, setModalOpen] =
        useState(false);

    const [courses, setCourses] =
        useState([]);

    const [nextOffset, setNextOffset] =
        useState(null);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [hasSearched, setHasSearched] =
        useState(false);

    const {
        data: destinations = [],
        isLoading: destinationsLoading,
        isError: destinationsError,
    } = useGetDestinationsQuery(uid);

    const {
        data: universities = [],
        isFetching: universitiesLoading,
        isError: universitiesError,
    } = useGetUniversitiesQuery(
        {
            countryId,
            uid,
        },
        {
            skip: !countryId,
        }
    );

    const {
        data: mainCourses = [],
        isFetching: coursesLoading,
        isError: mainCoursesError,
    } = useGetMainCoursesQuery(
        {
            universityId,
            uid,
        },
        {
            skip: !universityId,
        }
    );

    const [
        searchCourses,
        {
            isFetching: searchLoading,
            error: searchError,
            reset: resetSearch,
        },
    ] = useLazySearchCoursesQuery();

    const countryOptions = useMemo(
        () => toOptions(destinations),
        [destinations]
    );

    const universityOptions = useMemo(
        () => toOptions(universities),
        [universities]
    );

    const courseOptions = useMemo(
        () => toOptions(mainCourses),
        [mainCourses]
    );

    const selectedCountry = useMemo(
        () =>
            countryOptions.find(
                (option) =>
                    option.value ===
                    countryId
            ) || null,
        [countryId, countryOptions]
    );

    const selectedUniversity = useMemo(
        () =>
            universityOptions.find(
                (option) =>
                    option.value ===
                    universityId
            ) || null,
        [
            universityId,
            universityOptions,
        ]
    );

    const selectedCourse = useMemo(
        () =>
            courseOptions.find(
                (option) =>
                    option.value ===
                    courseId
            ) || null,
        [courseId, courseOptions]
    );

    const resetResults = () => {
        resetSearch();
        setCourses([]);
        setNextOffset(null);
        setCurrentPage(1);
        setHasSearched(false);
    };

    const handleCountryChange = (
        option
    ) => {
        setCountryId(
            option?.value || ""
        );

        setUniversityId("");
        setCourseId("");
        resetResults();
    };

    const handleUniversityChange = (
        option
    ) => {
        setUniversityId(
            option?.value || ""
        );

        setCourseId("");
        resetResults();
    };

    const handleCourseChange = (
        option
    ) => {
        setCourseId(
            option?.value || ""
        );

        resetResults();
    };

    const loadCourses = async ({
        offset = "0",
        append = false,
    } = {}) => {
        if (
            !countryId ||
            !universityId ||
            !courseId
        ) {
            return [];
        }

        try {
            const response =
                await searchCourses({
                    countryId,
                    universityId,
                    courseId,
                    uid,
                    offset,
                }).unwrap();

            const newCourses =
                extractCourses(response);

            setCourses(
                (currentCourses) =>
                    append
                        ? mergeUniqueCourses(
                            currentCourses,
                            newCourses
                        )
                        : newCourses
            );

            setNextOffset(
                extractNextOffset(
                    response
                )
            );

            setHasSearched(true);

            return newCourses;
        } catch (error) {
            console.error(
                "Course search failed:",
                error
            );

            if (!append) {
                setCourses([]);
                setNextOffset(null);
            }

            setHasSearched(true);

            return [];
        }
    };

    const handleSearch = async () => {
        if (
            !countryId ||
            !universityId ||
            !courseId
        ) {
            return;
        }

        resetResults();
        setModalOpen(true);

        await loadCourses({
            offset: "0",
            append: false,
        });
    };

    const handleRetry = async () => {
        resetResults();

        await loadCourses({
            offset: "0",
            append: false,
        });
    };

    const handleViewAll = () => {
        if (
            !countryId ||
            !universityId ||
            !courseId
        ) {
            return;
        }

        const selectedCountryObj = destinations.find(
            (item) => String(item?.id ?? item?.d_id ?? "") === String(countryId)
        );
        const countrySlug = selectedCountryObj
            ? createSlug(selectedCountryObj.name ?? selectedCountryObj.country ?? selectedCountryObj.destination)
            : countryId;

        const selectedUniObj = universities.find(
            (item) => String(item?.id ?? item?.u_id ?? "") === String(universityId)
        );
        const uniSlug = selectedUniObj
            ? createSlug(selectedUniObj.name ?? selectedUniObj.university)
            : universityId;

        const selectedCourseObj = mainCourses.find(
            (item) => String(item?.id ?? item?.c_id ?? "") === String(courseId)
        );
        const courseSlug = selectedCourseObj
            ? createSlug(selectedCourseObj.name ?? selectedCourseObj.course ?? selectedCourseObj.course_name)
            : courseId;

        const params =
            new URLSearchParams({
                country: countrySlug,
                university: uniSlug,
                course: courseSlug,
            });

        setModalOpen(false);

        router.push(
            `/courses?${params.toString()}`
        );
    };

    return {
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

        hasDropdownError:
            destinationsError ||
            universitiesError ||
            mainCoursesError,

        handleCountryChange,
        handleUniversityChange,
        handleCourseChange,

        canSearch: Boolean(
            countryId &&
            universityId &&
            courseId
        ),

        searchLoading,
        searchError,

        modalOpen,
        setModalOpen,

        courses,
        nextOffset,
        currentPage,
        setCurrentPage,
        hasSearched,

        loadCourses,
        handleSearch,
        handleRetry,
        handleViewAll,
    };
}