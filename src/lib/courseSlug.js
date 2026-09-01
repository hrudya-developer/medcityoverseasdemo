import {
  createSlug,
} from "@/lib/slug";

/* =========================================================
 CLEAN TEXT
========================================================= */

function cleanText(
  value = ""
) {
  return String(
      value ?? ""
  )
      .replace(/\s+/g, " ")
      .trim();
}

/* =========================================================
 COURSE NAME
========================================================= */

export function getPublicCourseName(
  course
) {
  return cleanText(
      course?.course ??
      course?.course_name ??
      course?.program_name ??
      course?.program ??
      course?.title ??
      course?.name ??
      course?.label ??
      ""
  );
}

/* =========================================================
 UNIVERSITY NAME
========================================================= */

export function getPublicUniversityName(
  course,
  fallbackUniversity = ""
) {
  return cleanText(
      course?.university ??
      course?.university_name ??
      course?.u_name ??
      course?.universityName ??
      course?.univ_name ??
      course?.college_name ??
      course?.institution_name ??
      fallbackUniversity ??
      ""
  );
}

/* =========================================================
 COURSE DETAILS ID

 IMPORTANT:

 Your getCoursedetails API expects:

 id = actual university course details ID

 c_id = main course / study-area ID
 u_id = university ID
 d_id = destination ID

 This value must NEVER be exposed in the URL.
========================================================= */

export function getPublicCourseId(
  course
) {
  return cleanText(
      course?.id ??
      course?.uc_id ??
      course?.university_course_id ??
      course?.universityCourseId ??
      course?.selected_course_id ??
      course?.selectedCourseId ??
      course?.details_id ??
      course?.course_details_id ??
      ""
  );
}

/* =========================================================
 PUBLIC COURSE SLUG

 Standard:

 course-name + university-name

 Example:

 Master's Degree in Biotechnology
 Modul University

 =>

 masters-degree-in-biotechnology-modul-university
========================================================= */

export function createPublicCourseSlug(
  course,
  fallbackUniversity = ""
) {
  const courseName =
      getPublicCourseName(
          course
      );

  const universityName =
      getPublicUniversityName(
          course,
          fallbackUniversity
      );

  if (!courseName) {
      return "";
  }

  /*
   * Prefer course + university because
   * multiple universities can offer
   * courses with the same title.
   */
  if (universityName) {
      return createSlug(
          `${courseName} ${universityName}`
      );
  }

  /*
   * Fallback only when the API does not
   * supply university information.
   */
  return createSlug(
      courseName
  );
}

/* =========================================================
 PUBLIC COURSE HREF
========================================================= */

export function createPublicCourseHref(
  course,
  fallbackUniversity = ""
) {
  const slug =
      createPublicCourseSlug(
          course,
          fallbackUniversity
      );

  if (!slug) {
      return "";
  }

  return `/courses/${slug}`;
}

/* =========================================================
 COURSE STORAGE KEY

 Keeping this here avoids manually creating
 different storage keys in different cards.
========================================================= */

export function createPublicCourseStorageKey(
  course,
  fallbackUniversity = ""
) {
  const slug =
      createPublicCourseSlug(
          course,
          fallbackUniversity
      );

  return slug
      ? `public-course:${slug}`
      : "";
}