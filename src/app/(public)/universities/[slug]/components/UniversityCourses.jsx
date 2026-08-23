"use client";

import {
    useEffect,
    useMemo,
    useState,
    useRef,
} from "react";

import { BookOpen } from "lucide-react";

import UniversityCourseCard from "./courses-tab/UniversityCourseCard";
import UniversityMainCourseTabs from "./courses-tab/UniversityMainCourseTabs";

const getCourseCategoryId = (course) =>
    String(
        course?.c_id ??
        course?.main_course_id ??
        course?.maincourse_id ??
        course?.category_id ??
        "other"
    );

const getCourseCategoryName = (
    course,
    categoryId
) =>
    course?.name ||
    course?.main_course ||
    course?.maincourse ||
    course?.main_course_name ||
    course?.maincourse_name ||
    course?.category_name ||
    course?.course_category ||
    `Course Category ${categoryId}`;

export default function UniversityCourses({
    universityId,
    universityName,
    countryId,
    courses = [],
}) {
    const safeCourses = useMemo(() => {
        return Array.isArray(courses)
            ? courses.filter(Boolean)
            : [];
    }, [courses]);

    const groupedCourses = useMemo(() => {
        return safeCourses.reduce(
            (groups, course) => {
                const categoryId =
                    getCourseCategoryId(
                        course
                    );

                const categoryName =
                    getCourseCategoryName(
                        course,
                        categoryId
                    );

                if (!groups[categoryId]) {
                    groups[categoryId] = {
                        id: categoryId,
                        name: categoryName,
                        courses: [],
                    };
                }

                /*
                 * If the first item had only the
                 * fallback name, replace it when a
                 * real category name becomes available.
                 */
                const currentName =
                    groups[categoryId].name;

                const isFallbackName =
                    currentName ===
                    `Course Category ${categoryId}`;

                const hasRealCategoryName =
                    categoryName &&
                    categoryName !==
                    `Course Category ${categoryId}`;

                if (
                    isFallbackName &&
                    hasRealCategoryName
                ) {
                    groups[categoryId].name =
                        categoryName;
                }

                groups[
                    categoryId
                ].courses.push(course);

                return groups;
            },
            {}
        );
    }, [safeCourses]);

    const mainCourses = useMemo(() => {
        return Object.values(
            groupedCourses
        );
    }, [groupedCourses]);

    const [
        selectedMainCourseId,
        setSelectedMainCourseId,
    ] = useState("");

    const previousMainCoursesLengthRef =
        useRef(mainCourses.length);

    useEffect(() => {
        if (mainCourses.length === 0) {
            if (previousMainCoursesLengthRef.current !== 0) {
                previousMainCoursesLengthRef.current = 0;
                setSelectedMainCourseId("");
            }
            return;
        }

        previousMainCoursesLengthRef.current = mainCourses.length;

        const selectedStillExists =
            mainCourses.some(
                (mainCourse) =>
                    String(mainCourse.id) ===
                    String(
                        selectedMainCourseId
                    )
            );

        if (!selectedStillExists) {
            setSelectedMainCourseId(
                String(
                    mainCourses[0].id
                )
            );
        }
    }, [
        mainCourses,
        selectedMainCourseId,
    ]);

    const selectedCourses =
        groupedCourses[
            String(
                selectedMainCourseId
            )
        ]?.courses || [];

    const handleTabChange = (
        mainCourseId
    ) => {
        setSelectedMainCourseId(
            String(mainCourseId)
        );
    };

    return (
        <section
            id="courses-panel"
            role="tabpanel"
            aria-labelledby="courses-tab"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-10"
        >
            <header className="mb-7">
                <p className="text-sm font-black uppercase text-secondary">
                    Available Courses
                </p>

                <h2 className="mt-3 text-2xl font-bold text-[#081c47] sm:text-3xl md:text-4xl">
                    Courses at{" "}
                    <span className="text-primary">
                        {universityName ||
                            "University"}
                    </span>
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    Select a main course
                    category to view its
                    corresponding courses.
                </p>
            </header>

            {mainCourses.length > 0 ? (
                <>
                    <UniversityMainCourseTabs
                        courses={
                            mainCourses
                        }
                        selectedMainCourseId={
                            selectedMainCourseId
                        }
                        onSelectMainCourse={
                            handleTabChange
                        }
                    />

                    {selectedCourses.length >
                        0 ? (
                        <div
                            id="university-course-list"
                            className="grid gap-5 md:grid-cols-2"
                        >
                            {selectedCourses.map(
                                (
                                    course,
                                    index
                                ) => (
                                    <UniversityCourseCard
                                        key={
                                            course?.id ||
                                            course?.course_id ||
                                            `${selectedMainCourseId}-${index}`
                                        }
                                        course={
                                            course
                                        }
                                        universityId={
                                            universityId
                                        }
                                        universityName={
                                            universityName
                                        }
                                        countryId={
                                            countryId
                                        }
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <EmptyCourses
                            title="No courses found"
                            message="No courses are available under this category."
                        />
                    )}
                </>
            ) : (
                <EmptyCourses
                    title="No courses available"
                    message="This university currently has no course information."
                />
            )}
        </section>
    );
}

function EmptyCourses({
    title,
    message,
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-900/5">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                <BookOpen
                    className="size-8"
                    aria-hidden="true"
                />
            </div>

            <h3 className="mt-5 text-xl font-black text-darkPrimary">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-slate-500">
                {message}
            </p>
        </div>
    );
}