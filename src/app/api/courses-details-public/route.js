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
  
  function getCourseName(course) {
    return (
      course?.course_name ??
      course?.course ??
      course?.name ??
      course?.title ??
      course?.label ??
      ""
    );
  }
  
  function getCourseSlug(course) {
    return (
      course?.slug ??
      course?.course_slug ??
      course?.seo_slug ??
      ""
    );
  }
  
  function getCourseId(course) {
    return (
      course?.id ??
      course?.course_id ??
      course?.uc_id ??
      course?.c_id ??
      course?.selectedId ??
      null
    );
  }
  
  function normalizeSlug(value = "") {
    return createSlug(
      decodeURIComponent(
        String(value)
      )
    );
  }
  
  function comparableSlug(value = "") {
    return normalizeSlug(value)
      .replace(
        /(^|-)(and|of|in|the)(?=-|$)/g,
        "$1"
      )
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  
  function unwrapCourses(result) {
    const possibleArrays = [
      result?.suggestion,
      result?.course,
      result?.courses,
      result?.data,
      result?.results,
    ];
  
    for (const value of possibleArrays) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  
    return [];
  }
  
  /* =========================================================
     SEARCH COURSE
     ========================================================= */
  
  async function searchCourses(keyword) {
    if (!keyword) {
      return [];
    }
  
    try {
      const result =
        await postOverseasForm(
          "searchResults",
          {
            keytype: "course",
            keyword,
          }
        );
  
      return unwrapCourses(result);
    } catch (error) {
      console.error(
        "searchResults failed:",
        keyword,
        error
      );
  
      return [];
    }
  }
  
  /* =========================================================
     SCORE RESULT
     ========================================================= */
  
  function scoreCourse(
    course,
    requestedSlug
  ) {
    const target =
      comparableSlug(
        requestedSlug
      );
  
    const backendSlug =
      comparableSlug(
        getCourseSlug(course)
      );
  
    const nameSlug =
      comparableSlug(
        getCourseName(course)
      );
  
    /*
     * Best possible match:
     * backend slug exactly matches URL.
     */
    if (
      backendSlug &&
      backendSlug === target
    ) {
      return 0;
    }
  
    /*
     * Exact course-name slug.
     */
    if (
      nameSlug &&
      nameSlug === target
    ) {
      return 1;
    }
  
    /*
     * One contains the other.
     */
    if (
      nameSlug &&
      (
        nameSlug.includes(target) ||
        target.includes(nameSlug)
      )
    ) {
      return 2;
    }
  
    if (
      backendSlug &&
      (
        backendSlug.includes(target) ||
        target.includes(
          backendSlug
        )
      )
    ) {
      return 3;
    }
  
    return 999;
  }
  
  /* =========================================================
     SLUG -> COURSE ID
     ========================================================= */
  
  async function resolveCourseId(
    requestedCourse
  ) {
    if (!requestedCourse) {
      return null;
    }
  
    /*
     * Existing numeric ID can go
     * straight through.
     */
    if (
      /^\d+$/.test(
        String(requestedCourse)
      )
    ) {
      return String(
        requestedCourse
      );
    }
  
    const decoded =
      decodeURIComponent(
        String(
          requestedCourse
        )
      );
  
    const fullKeyword =
      decoded
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();
  
    const words =
      fullKeyword
        .split(" ")
        .filter(Boolean);
  
    const queriesSet = new Set();
    queriesSet.add(fullKeyword);

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
  
    /*
     * Remove duplicates.
     */
    const uniqueCourses =
      Array.from(
        new Map(
          allCourses.map(
            (course, index) => {
              const id =
                getCourseId(
                  course
                );
  
              const key =
                id
                  ? `id:${id}`
                  : `name:${getCourseName(
                      course
                    )}:${index}`;
  
              return [
                key,
                course,
              ];
            }
          )
        ).values()
      );
  
    if (
      uniqueCourses.length ===
      0
    ) {
      console.error(
        "No course search results for:",
        requestedCourse
      );
  
      return null;
    }
  
    const candidates =
      uniqueCourses
        .map((course) => ({
          course,
  
          score:
            scoreCourse(
              course,
              requestedCourse
            ),
        }))
        .filter(
          (item) =>
            item.score < 999
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
        "No exact course match:",
        {
          requestedCourse,
  
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
  
                slug:
                  getCourseSlug(
                    course
                  ),
              })
            ),
        }
      );
  
      return null;
    }
  
    const resolvedId =
      getCourseId(
        matchedCourse
      );
  
    if (!resolvedId) {
      console.error(
        "Matched course has no ID:",
        matchedCourse
      );
  
      return null;
    }
  
    return String(
      resolvedId
    );
  }
  
  /* =========================================================
     GET COURSE DETAILS
     ========================================================= */
  
  async function fetchCourseDetails({
    courseId,
    uid,
  }) {
    const result =
      await postOverseasForm(
        "getCoursedetails",
        {
          uid:
            String(uid),
  
          /*
           * Send both because your
           * existing backend has used
           * both field names.
           */
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
     ROUTE
     ========================================================= */
  
  export async function GET(
    request
  ) {
    try {
      const {
        searchParams,
      } = new URL(
        request.url
      );
  
      /*
       * courseId may contain:
       *
       * 88291
       *
       * OR
       *
       * bachelor-of-fine-art-honours
       *
       * The ID never needs to be visible
       * in the public browser URL.
       */
      const requestedCourse =
        searchParams.get(
          "courseId"
        );
  
      /*
       * Public page.
       */
      const uid =
        searchParams.get(
          "uid"
        ) || "0";
  
      if (!requestedCourse) {
        return NextResponse.json(
          {
            message:
              "Course is required.",
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
          {
            courseId,
            uid,
          }
        );
  
      if (!course) {
        console.error(
          "Course details empty:",
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
  
      /*
       * Important:
       * return course directly because
       * your RTK Query currently expects
       * selectedCourse to be the course
       * object.
       */
      return NextResponse.json(
        course
      );
    } catch (error) {
      console.error(
        "Course details API error:",
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