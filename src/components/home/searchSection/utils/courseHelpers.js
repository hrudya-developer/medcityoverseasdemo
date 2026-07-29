export const COURSES_PER_PAGE = 6;

export const getCourseId = (course) =>
    String(
        course?.id ||
        course?.course_id ||
        course?.c_id ||
        course?.uc_id ||
        course?.cid ||
        ""
    );

export const getCourseName = (course) =>
    course?.course ||
    course?.main_course ||
    course?.name ||
    course?.course_name ||
    course?.main_course_name ||
    course?.title ||
    "Course";

export const getUniversityName = (course) =>
    course?.university ||
    course?.university_name ||
    course?.college_name ||
    "University unavailable";

export const getCountryName = (course) =>
    course?.country ||
    course?.country_name ||
    course?.destination ||
    "Destination unavailable";

export const getStudyLevel = (course) =>
    course?.level ||
    course?.study_level ||
    course?.course_level ||
    course?.qualification ||
    "";

export const mergeUniqueCourses = (
    currentCourses,
    newCourses
) => {
    const existingIds = new Set(
        currentCourses
            .map(getCourseId)
            .filter(Boolean)
    );

    const uniqueCourses = newCourses.filter(
        (course) => {
            const id = getCourseId(course);

            if (!id) return true;
            if (existingIds.has(id)) return false;

            existingIds.add(id);
            return true;
        }
    );

    return [...currentCourses, ...uniqueCourses];
};