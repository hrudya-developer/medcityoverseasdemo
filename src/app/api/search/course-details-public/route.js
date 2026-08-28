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
   CLEAN COURSE NAME
   ========================================================= */

function cleanCourseName(
  value = ""
) {
  return String(value)
    .trim()

    // 18 months / 2 years
    .replace(
      /\s+\d+(?:\.\d+)?\s*(?:months?|years?)$/i,
      ""
    )

    // - 18 months / – 2 years
    .replace(
      /\s*[-–—]\s*\d+(?:\.\d+)?\s*(?:months?|years?)$/i,
      ""
    )

    // 2 semesters
    .replace(
      /\s+\d+\s*semesters?$/i,
      ""
    )

    // Full Time / Part Time
    .replace(
      /\s*[-–—]?\s*(?:full[\s-]?time|part[\s-]?time)$/i,
      ""
    )

    .trim();
}

/* =========================================================
   COURSE NAME
   ========================================================= */

function getCourseName(course) {
  const value =
    course?.course_name ??
    course?.name ??
    course?.title ??
    course?.course ??
    course?.label ??
    "";

  return cleanCourseName(
    value
  );
}

/* =========================================================
   BACKEND SLUG
   ========================================================= */

function getBackendSlug(
  course
) {
  return (
    course?.slug ??
    course?.course_slug ??
    course?.seo_slug ??
    ""
  );
}

/* =========================================================
   COURSE ID
   ========================================================= */

function getCourseId(course) {
  const value =
    course?.id ??
    course?.course_id ??
    course?.uc_id ??
    course?.c_id ??
    course?.selectedId ??
    course?.selected_id ??
    course?.university_course_id ??
    course?.courseId ??
    "";

  return String(
    value
  ).trim();
}

/* =========================================================
   NORMALIZE
   ========================================================= */

function normalizeSlug(
  value = ""
) {
  let decoded =
    String(value);

  try {
    decoded =
      decodeURIComponent(
        decoded
      );
  } catch {
    // use original
  }

  return createSlug(
    cleanCourseName(
      decoded
    )
  );
}

/* =========================================================
   SEARCH RESPONSE
   ========================================================= */

function collectArrays(
  value
) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (
    typeof value !==
    "object"
  ) {
    return [];
  }

  const possibleArrays = [
    value?.suggestion,
    value?.suggestions,

    value?.course,
    value?.courses,

    value?.data,
    value?.results,
  ];

  const output = [];

  for (
    const item
    of possibleArrays
  ) {
    if (
      Array.isArray(item)
    ) {
      output.push(
        ...item
      );
    }
  }

  return output;
}

/* =========================================================
   SEARCH
   ========================================================= */

async function searchCourses(
  keyword
) {
  if (!keyword) {
    return [];
  }

  try {
    const result =
      await postOverseasForm(
        "searchResults",
        {
          keytype:
            "course",

          keyword,
        }
      );

    return collectArrays(
      result
    );
  } catch (error) {
    console.error(
      "Course search failed:",
      keyword,
      error
    );

    return [];
  }
}

/* =========================================================
   SCORE COURSE
   ========================================================= */

function scoreCourse(
  course,
  requestedSlug
) {
  const target =
    normalizeSlug(
      requestedSlug
    );

  const courseName =
    normalizeSlug(
      getCourseName(
        course
      )
    );

  const backendSlug =
    normalizeSlug(
      getBackendSlug(
        course
      )
    );

  /**
   * Backend provided exact slug.
   */
  if (
    backendSlug &&
    backendSlug ===
      target
  ) {
    return 0;
  }

  /**
   * Exact generated course-name slug.
   */
  if (
    courseName &&
    courseName ===
      target
  ) {
    return 1;
  }

  /**
   * Very close match.
   */
  if (
    courseName &&
    (
      courseName.includes(
        target
      ) ||
      target.includes(
        courseName
      )
    )
  ) {
    return 10;
  }

  return 999;
}

/* =========================================================
   RESOLVE SLUG -> ID
   ========================================================= */

async function resolveCourseId(
  requestedSlug
) {
  if (!requestedSlug) {
    return null;
  }

  /**
   * Still support numeric internally.
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

  let decoded =
    String(
      requestedSlug
    );

  try {
    decoded =
      decodeURIComponent(
        decoded
      );
  } catch {
    // use original
  }

  const keyword =
    decoded
      .replace(/-/g, " ")
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  const words =
    keyword
      .split(" ")
      .filter(Boolean);

  /**
   * Search multiple forms because
   * backend searchResults can behave
   * differently with long names.
   */
  const queriesSet = new Set();
  queriesSet.add(keyword);

  const N = words.length;
  const targetLengths = [N - 1, N - 2, N - 3, 5, 4, 3, 2];

  for (const len of targetLengths) {
    if (len > 0 && len < N) {
      queriesSet.add(words.slice(0, len).join(" "));
      queriesSet.add(words.slice(-len).join(" "));
    }
  }

  const queries = Array.from(queriesSet)
    .map((value) => value.trim())
    .filter(Boolean);

  const groups =
    await Promise.all(
      queries.map(
        (query) =>
          searchCourses(
            query
          )
      )
    );

  const allCourses =
    groups.flat();

  if (
    allCourses.length ===
    0
  ) {
    console.error(
      "No search results:",
      requestedSlug
    );

    return null;
  }

  /**
   * Remove duplicates.
   */
  const uniqueCourses =
    Array.from(
      new Map(
        allCourses.map(
          (
            course,
            index
          ) => {
            const id =
              getCourseId(
                course
              );

            const key =
              id
                ? `id:${id}`
                : `course:${normalizeSlug(
                    getCourseName(
                      course
                    )
                  )}:${index}`;

            return [
              key,
              course,
            ];
          }
        )
      ).values()
    );

  const candidates =
    uniqueCourses
      .map(
        (course) => ({
          course,

          score:
            scoreCourse(
              course,
              requestedSlug
            ),
        })
      )
      .filter(
        (item) =>
          item.score <
          999
      )
      .sort(
        (a, b) =>
          a.score -
          b.score
      );

  const matchedCourse =
    candidates?.[0]
      ?.course;

  if (!matchedCourse) {
    console.error(
      "Unable to match slug:",
      {
        requestedSlug,

        target:
          normalizeSlug(
            requestedSlug
          ),

        returnedCourses:
          uniqueCourses.map(
            (course) => ({
              id:
                getCourseId(
                  course
                ),

              name:
                getCourseName(
                  course
                ),

              generatedSlug:
                normalizeSlug(
                  getCourseName(
                    course
                  )
                ),

              backendSlug:
                getBackendSlug(
                  course
                ),
            })
          ),
      }
    );

    return null;
  }

  const id =
    getCourseId(
      matchedCourse
    );

  if (!id) {
    console.error(
      "Matched course has no usable ID:",
      matchedCourse
    );

    return null;
  }

  return id;
}

/* =========================================================
   FETCH DETAILS
   ========================================================= */

async function fetchCourseDetails(
  courseId
) {
  /**
   * Public pages always use uid 0.
   */
  const result =
    await postOverseasForm(
      "getCoursedetails",
      {
        uid: "0",

        id:
          String(
            courseId
          ),

        c_id:
          String(
            courseId
          ),
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

export async function GET(
  request
) {
  try {
    const {
      searchParams,
    } =
      new URL(
        request.url
      );

    /**
     * The RTK hook currently sends:
     *
     * courseId=<slug>
     *
     * Although the parameter name is
     * courseId, the public value is
     * actually the slug.
     */
    const requestedCourse =
      searchParams.get(
        "courseId"
      );

    if (
      !requestedCourse
    ) {
      return NextResponse.json(
        {
          message:
            "Course slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    const courseId =
      await resolveCourseId(
        requestedCourse
      );

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

    const {
      course,
      raw,
    } =
      await fetchCourseDetails(
        courseId
      );

    if (!course) {
      console.error(
        "Course details API returned no course:",
        {
          requestedCourse,
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

    /**
     * Your public RTK endpoint expects
     * the course object directly.
     */
    return NextResponse.json(
      course
    );
  } catch (error) {
    console.error(
      "Public course details error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Unable to load course details.",
      },
      {
        status: 500,
      }
    );
  }
}