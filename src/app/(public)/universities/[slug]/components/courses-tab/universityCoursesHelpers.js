export function cleanId(
    value
) {
    return String(
        value ?? ""
    ).trim();
}

/* =========================================================
   MAIN COURSE ID
========================================================= */

export function getMainCourseId(
    mainCourse
) {
    return cleanId(
        mainCourse?.id ??
        mainCourse?.c_id ??
        mainCourse?.main_course_id ??
        mainCourse?.mainCourseId ??
        ""
    );
}

/* =========================================================
   COURSE CATEGORY ID
========================================================= */

export function getCourseCategoryId(
    course
) {
    return cleanId(
        course?.c_id ??
        course?.main_course_id ??
        course?.mainCourseId ??
        course?.category_id ??
        ""
    );
}

/* =========================================================
   UNIQUE COURSE ID
========================================================= */

export function getCourseUniqueId(
    course,
    fallback = ""
) {
    return cleanId(
        course?.id ??
        course?.uc_id ??
        course?.course_id ??
        course?.university_course_id ??
        fallback
    );
}

/* =========================================================
   REMOVE DUPLICATE COURSES
========================================================= */

export function removeDuplicateCourses(
    courses = []
) {
    const map =
        new Map();

    for (
        const course of courses
    ) {
        if (!course) {
            continue;
        }

        const id =
            getCourseUniqueId(
                course,
                JSON.stringify(
                    course
                )
            );

        if (
            !map.has(id)
        ) {
            map.set(
                id,
                course
            );
        }
    }

    return Array.from(
        map.values()
    );
}

/* =========================================================
   FILTER COURSES BY MAIN COURSE
========================================================= */

export function filterCoursesByCategory(
    courses = [],
    categoryId
) {
    const safeId =
        cleanId(
            categoryId
        );

    if (!safeId) {
        return [];
    }

    return courses.filter(
        (course) =>
            getCourseCategoryId(
                course
            ) === safeId
    );
}

/* =========================================================
   COURSE COUNTS
========================================================= */

export function createCourseCountMap(
    courses = []
) {
    const map =
        new Map();

    for (
        const course of courses
    ) {
        const categoryId =
            getCourseCategoryId(
                course
            );

        if (!categoryId) {
            continue;
        }

        map.set(
            categoryId,
            (
                map.get(
                    categoryId
                ) ?? 0
            ) + 1
        );
    }

    return map;
}

/* =========================================================
   ENRICH MAIN COURSES
========================================================= */

export function addCountsToMainCourses(
    mainCourses = [],
    courseCountMap
) {
    return mainCourses
        .map(
            (mainCourse) => {
                const id =
                    getMainCourseId(
                        mainCourse
                    );

                if (!id) {
                    return null;
                }

                return {
                    ...mainCourse,

                    id,

                    courseCount:
                        courseCountMap.get(
                            id
                        ) ?? 0,
                };
            }
        )
        .filter(
            Boolean
        );
}

/* =========================================================
   DEFAULT CATEGORY
========================================================= */

export function getDefaultCategoryId({
    mainCourses = [],
    preferredCategoryId = "",
}) {
    const preferred =
        cleanId(
            preferredCategoryId
        );

    if (preferred) {
        const exists =
            mainCourses.some(
                (item) =>
                    getMainCourseId(
                        item
                    ) ===
                    preferred
            );

        if (exists) {
            return preferred;
        }
    }

    /*
     * Prefer a category containing courses.
     */

    const withCourses =
        mainCourses.find(
            (item) =>
                Number(
                    item?.courseCount ??
                    0
                ) > 0
        );

    if (withCourses) {
        return getMainCourseId(
            withCourses
        );
    }

    return getMainCourseId(
        mainCourses[0]
    );
}