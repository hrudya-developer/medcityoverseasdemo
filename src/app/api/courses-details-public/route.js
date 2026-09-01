import {
  NextResponse,
} from "next/server";

import {
  createSlug,
} from "@/lib/slug";

import {
  postOverseasForm,
} from "@/lib/overseasApi";

/* =========================================================
   HELPERS
========================================================= */

function clean(value) {
  return String(
    value ?? ""
  )
    .replace(/\s+/g, " ")
    .trim();
}

function getCourseName(course) {
  return clean(
    course?.course_name ??
      course?.course ??
      course?.program_name ??
      course?.program ??
      course?.name ??
      course?.title ??
      course?.label ??
      ""
  );
}

function getUniversityName(course) {
  return clean(
    course?.university_name ??
      course?.university ??
      course?.u_name ??
      course?.universityName ??
      course?.college_name ??
      course?.institution_name ??
      ""
  );
}

function getCourseSlug(course) {
  return clean(
    course?.slug ??
      course?.course_slug ??
      course?.seo_slug ??
      ""
  );
}

function getCourseId(course) {
  const value =
      course?.id ??
      course?.uc_id ??
      course?.university_course_id ??
      course?.universityCourseId ??
      course?.selected_course_id ??
      course?.selectedCourseId ??
      course?.details_id ??
      course?.course_details_id ??
      "";

  return clean(value);
}

/* =========================================================
   CREATE PUBLIC SEO SLUG

   IMPORTANT:
   Must use the SAME format as CourseCard.

   course + university

   Example:
   bachelor-of-medicine-bachelor-of-surgery-mbbs-
   azerbaijan-medical-university
========================================================= */

function createPublicCourseSlug(
  course
) {
  const courseName =
    getCourseName(course);

  const universityName =
    getUniversityName(course);

  if (!courseName) {
    return "";
  }

  if (!universityName) {
    return createSlug(
      courseName
    );
  }

  return createSlug(
    `${courseName}-${universityName}`
  );
}

/* =========================================================
   NORMALIZE SLUG
========================================================= */

function normalizeSlug(
  value = ""
) {
  try {
    return createSlug(
      decodeURIComponent(
        String(value)
      )
    );
  } catch {
    return createSlug(
      String(value)
    );
  }
}

/* =========================================================
   UNWRAP SEARCH RESULTS
========================================================= */

function unwrapCourses(result) {
  const possibleArrays = [
    result?.suggestion,
    result?.courses,
    result?.course,
    result?.data,
    result?.results,
  ];

  for (
    const value of
    possibleArrays
  ) {
    if (
      Array.isArray(value)
    ) {
      return value;
    }
  }

  return [];
}

/* =========================================================
   SEARCH COURSES
========================================================= */

async function searchCourses(
  keyword
) {
  const cleanedKeyword =
    clean(keyword);

  if (!cleanedKeyword) {
    return [];
  }

  try {
    const result =
      await postOverseasForm(
        "searchResults",
        {
          keytype:
            "course",

          keyword:
            cleanedKeyword,
        }
      );

    return unwrapCourses(
      result
    );
  } catch (error) {
    console.error(
      "searchResults failed:",
      cleanedKeyword,
      error
    );

    return [];
  }
}

/* =========================================================
   REMOVE DUPLICATES
========================================================= */

function removeDuplicates(
  courses
) {
  const map =
    new Map();

  for (
    const course of courses
  ) {
    const id =
      getCourseId(
        course
      );

    /*
     * Prefer the actual ID.
     *
     * If an ID is unavailable,
     * fall back to course + university.
     */

    const fallbackKey =
      createPublicCourseSlug(
        course
      );

    const key =
      id
        ? `id:${id}`
        : `slug:${fallbackKey}`;

    if (
      key &&
      !map.has(key)
    ) {
      map.set(
        key,
        course
      );
    }
  }

  return Array.from(
    map.values()
  );
}

/* =========================================================
   EXACT MATCH
========================================================= */

function findExactCourse(
  courses,
  requestedSlug
) {
  const target =
    normalizeSlug(
      requestedSlug
    );

  if (!target) {
    return null;
  }

  /*
   * PRIORITY 1
   *
   * Exact:
   *
   * course-name + university-name
   *
   * This prevents:
   *
   * Azerbaijan MBBS
   *         ↓
   * Malaysia MBBS
   */

  const exactPublicMatch =
    courses.find(
      (course) =>
        normalizeSlug(
          createPublicCourseSlug(
            course
          )
        ) === target
    );

  if (
    exactPublicMatch
  ) {
    return exactPublicMatch;
  }

  /*
   * PRIORITY 2
   *
   * Exact backend-provided
   * SEO slug.
   */

  const backendMatch =
    courses.find(
      (course) => {
        const backendSlug =
          normalizeSlug(
            getCourseSlug(
              course
            )
          );

        return (
          backendSlug &&
          backendSlug ===
            target
        );
      }
    );

  if (backendMatch) {
    return backendMatch;
  }

  /*
   * PRIORITY 3
   *
   * Legacy course-name-only URL.
   *
   * ONLY accept it if exactly
   * one result matches.
   *
   * Never arbitrarily select
   * the first duplicate.
   */

  const legacyMatches =
    courses.filter(
      (course) =>
        normalizeSlug(
          getCourseName(
            course
          )
        ) === target
    );

  if (
    legacyMatches.length ===
    1
  ) {
    return legacyMatches[0];
  }

  return null;
}

/* =========================================================
   BUILD SEARCH QUERIES
========================================================= */

function buildSearchQueries(
  requestedSlug
) {
  let decoded = "";

  try {
    decoded =
      decodeURIComponent(
        String(
          requestedSlug
        )
      );
  } catch {
    decoded =
      String(
        requestedSlug
      );
  }

  const fullKeyword =
    decoded
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (!fullKeyword) {
    return [];
  }

  const words =
    fullKeyword
      .split(" ")
      .filter(Boolean);

  const queries =
    new Set();

  /*
   * Try complete slug first.
   */

  queries.add(
    fullKeyword
  );

  /*
   * Then progressively remove
   * words from the END.
   *
   * This is important because
   * our URL is:
   *
   * course-name + university-name
   *
   * Eventually this reaches
   * the actual course title.
   */

  for (
    let length =
      words.length - 1;
    length >= 2;
    length -= 1
  ) {
    queries.add(
      words
        .slice(
          0,
          length
        )
        .join(" ")
    );
  }

  /*
   * Keep the number of backend
   * searches reasonable.
   */

  return Array.from(
    queries
  ).slice(
    0,
    12
  );
}

/* =========================================================
   SLUG -> COURSE ID
========================================================= */

async function resolveCourseId(
  requestedSlug
) {
  if (!requestedSlug) {
    return null;
  }

  /*
   * Optional backwards
   * compatibility.
   *
   * Public URLs won't normally
   * expose this.
   */

  if (
    /^\d+$/.test(
      String(
        requestedSlug
      )
    )
  ) {
    return String(
      requestedSlug
    );
  }

  const queries =
    buildSearchQueries(
      requestedSlug
    );

  if (
    queries.length === 0
  ) {
    return null;
  }

  /*
   * Search sequentially.
   *
   * Stop as soon as we can
   * resolve an exact unique
   * course.
   *
   * This avoids firing many
   * API requests simultaneously.
   */

  let collectedCourses =
    [];

  for (
    const query of queries
  ) {
    const results =
      await searchCourses(
        query
      );

    if (
      results.length === 0
    ) {
      continue;
    }

    collectedCourses =
      removeDuplicates([
        ...collectedCourses,
        ...results,
      ]);

    const match =
      findExactCourse(
        collectedCourses,
        requestedSlug
      );

    if (match) {
      const id =
        getCourseId(
          match
        );

      if (id) {
        return id;
      }
    }
  }

  /*
   * Final attempt after all
   * search results are collected.
   */

  const finalMatch =
    findExactCourse(
      collectedCourses,
      requestedSlug
    );

  if (!finalMatch) {
    console.error(
      "Unable to resolve public course slug:",
      {
        requestedSlug,

        candidates:
          collectedCourses.map(
            (course) => ({
              id:
                getCourseId(
                  course
                ),

              course:
                getCourseName(
                  course
                ),

              university:
                getUniversityName(
                  course
                ),

              publicSlug:
                createPublicCourseSlug(
                  course
                ),

              backendSlug:
                getCourseSlug(
                  course
                ),
            })
          ),
      }
    );

    return null;
  }

  const courseId =
    getCourseId(
      finalMatch
    );

  return (
    courseId || null
  );
}

/* =========================================================
   FETCH EXACT COURSE DETAILS
========================================================= */

async function fetchCourseDetails({
  courseId,
  uid = "0",
}) {
  const result =
    await postOverseasForm(
      "getCoursedetails",
      {
        uid: String(uid),
        id: String(courseId),
      }
    );

  const course =
    result?.course?.[0] ??
    result?.data?.[0] ??
    result?.details?.[0] ??
    result?.course ??
    result?.data ??
    result?.details ??
    null;

  return {
    course,
    raw: result,
  };
}
/* =========================================================
   GET
========================================================= */

export async function GET(request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const requestedSlug =
      searchParams
        .get("slug")
        ?.trim() || "";

    const directCourseId =
      searchParams
        .get("courseId")
        ?.trim() || "";

    const uid =
      searchParams
        .get("uid")
        ?.trim() || "0";

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !requestedSlug &&
      !directCourseId
    ) {
      return NextResponse.json(
        {
          message:
            "Course slug or course ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       RESOLVE COURSE ID

       Priority:
       1. Exact internal ID supplied by client
       2. Slug resolver for direct/SEO visits
    ===================================================== */

    let courseId =
      directCourseId;

    if (!courseId) {
      courseId =
        await resolveCourseId(
          requestedSlug
        );
    }

    if (!courseId) {
      return NextResponse.json(
        {
          message:
            "Course not found for this URL.",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       FETCH EXACT COURSE
    ===================================================== */

    const {
      course,
      raw,
    } =
      await fetchCourseDetails({
        courseId,
        uid,
      });

    if (!course) {
      console.error(
        "Course details empty:",
        {
          requestedSlug,
          courseId,
          raw,
        }
      );

      return NextResponse.json(
        {
          message:
            "Course details are unavailable.",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       OPTIONAL SLUG VALIDATION

       Useful when ID was supplied from sessionStorage.
    ===================================================== */

    const resolvedSlug =
      createPublicCourseSlug(
        course
      );

    /*
     * Don't reject if backend details
     * don't contain enough fields to
     * reconstruct the slug.
     */
    if (
      requestedSlug &&
      resolvedSlug &&
      normalizeSlug(
        resolvedSlug
      ) !==
        normalizeSlug(
          requestedSlug
        )
    ) {
      console.warn(
        "Course slug differs from resolved course:",
        {
          requestedSlug,
          resolvedSlug,
          courseId,
        }
      );
    }

    return NextResponse.json(
      {
        course,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(
      "Public course details API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Something went wrong while fetching course details.",
      },
      {
        status: 500,
      }
    );
  }
}