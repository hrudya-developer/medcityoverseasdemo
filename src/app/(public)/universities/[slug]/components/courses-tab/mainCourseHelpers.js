export function cleanId(
    value
) {
    return String(
        value ?? ""
    ).trim();
}

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

export function getMainCourseName(
    mainCourse
) {
    return (
        mainCourse?.name ||
        mainCourse?.main_course ||
        mainCourse?.main_course_name ||
        mainCourse?.category_name ||
        mainCourse?.category ||
        mainCourse?.course ||
        mainCourse?.title ||
        "Main Course"
    );
}

export function getCourseCount(
    mainCourse
) {
    if (
        Array.isArray(
            mainCourse?.courses
        )
    ) {
        return mainCourse
            .courses
            .length;
    }

    const value =
        Number(
            mainCourse?.courseCount ??
            mainCourse?.course_count ??
            mainCourse?.count ??
            0
        );

    return Number.isFinite(
        value
    )
        ? value
        : 0;
}