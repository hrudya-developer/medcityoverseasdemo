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
      .replace(
          /\s+/g,
          " "
      )
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
 COUNTRY NAME
========================================================= */

export function getPublicCourseCountry(
  course
) {
  return cleanText(
      course?.country ??
      course?.country_name ??
      course?.destination ??
      course?.destination_name ??
      ""
  );
}

/* =========================================================
 COURSE DETAILS ID

 IMPORTANT:

 Backend getCoursedetails expects the actual course
 record ID.

 c_id is normally the main-course/category ID,
 so DO NOT use c_id here.

 The ID is only used internally.
 It is NEVER exposed in the SEO URL.
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
      course?.course_id ??
      course?.cid ??
      ""
  );
}

/* =========================================================
 UNIVERSITY ID
========================================================= */

export function getPublicUniversityId(
  course
) {
  return cleanText(
      course?.u_id ??
      course?.university_id ??
      course?.universityId ??
      ""
  );
}

/* =========================================================
 COUNTRY / DESTINATION ID
========================================================= */

export function getPublicCountryId(
  course
) {
  return cleanText(
      course?.d_id ??
      course?.country_id ??
      course?.destination_id ??
      course?.destinationId ??
      ""
  );
}

/* =========================================================
 PUBLIC COURSE SLUG

 Example:

 Bachelor of Computer Science
 University of Auckland

 becomes:

 bachelor-of-computer-science-university-of-auckland
========================================================= */

export function createPublicCourseSlug(
  course,
  fallbackUniversity = ""
) {
  const courseName =
      getPublicCourseName(
          course
      );

  if (!courseName) {
      return "";
  }

  const universityName =
      getPublicUniversityName(
          course,
          fallbackUniversity
      );

  if (
      universityName
  ) {
      return createSlug(
          `${courseName} ${universityName}`
      );
  }

  return createSlug(
      courseName
  );
}

/* =========================================================
 PUBLIC COURSE HREF

 KEEP THIS EXPORT.

 Existing components are already importing:
 createPublicCourseHref
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
 STORAGE KEY

 Example:

 public-course:
 bachelor-of-computer-science-university-of-auckland
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

  if (!slug) {
      return "";
  }

  return `public-course:${slug}`;
}

/* =========================================================
 STORAGE PAYLOAD

 Used when clicking "View Course".

 This is NOT the Apply Now storage.

 public-course:<slug>
 and
 pendingApplyCourse

 are intentionally separate.
========================================================= */

export function createPublicCourseStoragePayload(
  course,
  fallbackUniversity = ""
) {
  if (!course) {
      return null;
  }

  const slug =
      createPublicCourseSlug(
          course,
          fallbackUniversity
      );

  const id =
      getPublicCourseId(
          course
      );

  if (
      !slug ||
      !id
  ) {
      return null;
  }

  return {
      id,

      slug,

      name:
          getPublicCourseName(
              course
          ),

      university:
          getPublicUniversityName(
              course,
              fallbackUniversity
          ),

      country:
          getPublicCourseCountry(
              course
          ),

      universityId:
          getPublicUniversityId(
              course
          ),

      countryId:
          getPublicCountryId(
              course
          ),

      course,

      createdAt:
          Date.now(),
  };
}

/* =========================================================
 SAVE PUBLIC COURSE MAPPING

 Client-side helper.

 Safe to call inside event handlers only.
========================================================= */

export function savePublicCourseMapping(
  course,
  fallbackUniversity = ""
) {
  if (
      typeof window ===
      "undefined"
  ) {
      return null;
  }

  const payload =
      createPublicCourseStoragePayload(
          course,
          fallbackUniversity
      );

  if (!payload) {
      return null;
  }

  try {
      sessionStorage.setItem(
          `public-course:${payload.slug}`,
          JSON.stringify(
              payload
          )
      );

      return payload;
  } catch (
      error
  ) {
      console.warn(
          "Unable to store public course mapping:",
          error
      );

      return null;
  }
}