export const COURSES_PER_PAGE = 6;

/* =========================================================
   COURSE DETAILS ID

   IMPORTANT:
   This must ONLY return an ID that can be sent to:

   getCoursedetails
   params:
   api
   uid
   id

   DO NOT use:
   maincourse_id
   main_course_id
   c_id
   course_id
   generic id

   unless your API response proves that field is
   the actual getCoursedetails ID.
========================================================= */

export const getCourseId = (course) =>
  String(
    course?.uc_id ??
    course?.university_course_id ??
    course?.universityCourseId ??
    course?.selected_course_id ??
    course?.selectedCourseId ??
    course?.details_id ??
    course?.course_details_id ??
    course?.id ??
    ""
  ).trim();

/* =========================================================
   COURSE NAME
========================================================= */

export const getCourseName = (course) =>
  String(
    course?.course ??
    course?.course_name ??
    course?.program_name ??
    course?.program ??
    course?.name ??
    course?.title ??
    "Course"
  )
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   UNIVERSITY
========================================================= */

export const getUniversityName = (course) =>
  String(
    course?.university ??
    course?.university_name ??
    course?.u_name ??
    course?.universityName ??
    course?.college_name ??
    course?.institution_name ??
    ""
  )
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   COUNTRY
========================================================= */

export const getCountryName = (course) =>
  String(
    course?.country ??
    course?.country_name ??
    course?.destination ??
    course?.destination_name ??
    ""
  )
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   STUDY LEVEL
========================================================= */

export const getStudyLevel = (course) =>
  String(
    course?.level ??
    course?.study_level ??
    course?.course_level ??
    course?.qualification ??
    ""
  )
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   MERGE UNIQUE COURSES
========================================================= */

export const mergeUniqueCourses = (
  currentCourses = [],
  newCourses = []
) => {
  const existingKeys =
    new Set();

  currentCourses.forEach(
    (course) => {
      const courseId =
        getCourseId(course);

      const fallbackKey =
        [
          getCourseName(course),
          getUniversityName(course),
        ]
          .filter(Boolean)
          .join("|")
          .toLowerCase();

      existingKeys.add(
        courseId ||
          fallbackKey
      );
    }
  );

  const uniqueCourses =
    newCourses.filter(
      (course) => {
        const courseId =
          getCourseId(course);

        const fallbackKey =
          [
            getCourseName(course),
            getUniversityName(course),
          ]
            .filter(Boolean)
            .join("|")
            .toLowerCase();

        const key =
          courseId ||
          fallbackKey;

        if (!key) {
          return true;
        }

        if (
          existingKeys.has(key)
        ) {
          return false;
        }

        existingKeys.add(key);

        return true;
      }
    );

  return [
    ...currentCourses,
    ...uniqueCourses,
  ];
};

/* =========================================================
   OPTIONS
========================================================= */

export const toOptions = (
  items = []
) =>
  items
    .map((item) => ({
      value:
        String(
          item?.id ??
          item?.d_id ??
          item?.u_id ??
          item?.university_id ??
          item?.maincourse_id ??
          item?.main_course_id ??
          item?.course_id ??
          ""
        ).trim(),

      label:
        String(
          item?.name ??
          item?.destination_name ??
          item?.country_name ??
          item?.country ??
          item?.university_name ??
          item?.university ??
          item?.main_course ??
          item?.main_course_name ??
          item?.course_name ??
          item?.course ??
          ""
        )
          .replace(/\s+/g, " ")
          .trim(),
    }))
    .filter(
      (option) =>
        option.value &&
        option.label
    );

/* =========================================================
   EXTRACT COURSES
========================================================= */

export const extractCourses = (
  response
) => {
  if (
    Array.isArray(
      response?.courses
    )
  ) {
    return response.courses;
  }

  if (
    Array.isArray(
      response?.data
    )
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.results
    )
  ) {
    return response.results;
  }

  if (
    Array.isArray(response)
  ) {
    return response;
  }

  return [];
};

/* =========================================================
   NEXT OFFSET
========================================================= */

export const extractNextOffset = (
  response
) => {
  const nextOffset =
    response?.nextOffset ??
    response?.next_offset ??
    response?.next ??
    null;

  if (
    nextOffset === null ||
    nextOffset === undefined ||
    nextOffset === ""
  ) {
    return null;
  }

  return String(
    nextOffset
  );
};