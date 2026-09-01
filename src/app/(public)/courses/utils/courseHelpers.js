export const getCourseId = (
  course
) =>
  String(
      course?.id ??
      course?.uc_id ??
      course?.university_course_id ??
      course?.universityCourseId ??
      course?.university_course ??
      course?.selected_course_id ??
      course?.selectedCourseId ??
      course?.details_id ??
      course?.course_details_id ??
      ""
  ).trim();

export const getCourseName = (
  course
) => {
  return (
      course?.course_name ||
      course?.course ||
      course?.name ||
      course?.title ||
      "Course"
  );
};

export const getUniversityName = (
  course
) => {
  return (
      course?.university_name ||
      course?.university ||
      course?.universityName ||
      course?.u_name ||
      course?.univ_name ||
      course?.college_name ||
      ""
  );
};

export const getCountryName = (
  course
) => {
  return (
      course?.country_name ||
      course?.country ||
      course?.countryName ||
      course?.destination ||
      ""
  );
};

export const getStudyLevel = (
  course
) => {
  return (
      course?.study_level ||
      course?.studyLevel ||
      course?.level ||
      course?.course_level ||
      ""
  );
};