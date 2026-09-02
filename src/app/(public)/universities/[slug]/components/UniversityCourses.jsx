"use client";

import UniversityMainCourseTabs from "./courses-tab/UniversityMainCourseTabs";
import UniversityCoursesEmpty from "./courses-tab/UniversityCoursesEmpty";
import UniversityCoursesGrid from "./courses-tab/UniversityCoursesGrid";
import UniversityCoursesHeader from "./courses-tab/UniversityCoursesHeader";

import useUniversityCourses from "./courses-tab/useUniversityCourses";

export default function UniversityCourses({
    universityId,
    universityName = "University",
    mainCourses = [],
    initialCourses = [],
    initialCourseCategoryId = "",
}) {
    const {
        courses,
        loading,
        error,

        selectedMainCourseId,

        mainCourses:
            mainCoursesWithCounts,

        totalCourses,

        selectMainCourse,
    } =
        useUniversityCourses({
            universityId,

            mainCourses,

            initialCourses,

            initialCourseCategoryId,
        });

    /* =====================================================
       NO MAIN COURSE CATEGORIES
    ===================================================== */

    if (
        mainCoursesWithCounts.length ===
        0
    ) {
        return (
            <div
                id="courses-panel"
                role="tabpanel"
                aria-labelledby="courses-tab"
                className="bg-[#f7f9fd]"
            >
                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <UniversityCoursesHeader
                        universityName={
                            universityName
                        }
                        totalCourses={
                            totalCourses
                        }
                    />

                    <UniversityCoursesEmpty
                        title="No courses available"
                        description="This university currently has no course information available."
                    />
                </section>
            </div>
        );
    }

    /* =====================================================
       COURSES
    ===================================================== */

    return (
        <div
            id="courses-panel"
            role="tabpanel"
            aria-labelledby="courses-tab"
            className="bg-[#f7f9fd]"
        >
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-10 lg:py-14">

                {/* Heading */}

                <UniversityCoursesHeader
                    universityName={
                        universityName
                    }
                    totalCourses={
                        totalCourses
                    }
                />

                {/* Main layout */}

                <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

                    {/* Study areas */}

                    <UniversityMainCourseTabs
                        courses={
                            mainCoursesWithCounts
                        }
                        selectedMainCourseId={
                            selectedMainCourseId
                        }
                        onSelectMainCourse={
                            selectMainCourse
                        }
                    />

                    {/* Course cards */}

                    <div
                        id="university-course-list"
                        className="min-w-0 scroll-mt-32"
                    >
                        <UniversityCoursesGrid
                            courses={
                                courses
                            }
                            universityName={
                                universityName
                            }
                            loading={
                                loading
                            }
                            error={
                                error
                            }
                            categoryId={
                                selectedMainCourseId
                            }
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}