import { NextResponse } from "next/server";

const API_KEY =
  process.env.OVERSEAS_API_KEY ||
  "overseas@Miak2023";

const COURSE_API =
  "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest";

const COURSE_DETAIL_API =
  "https://overseas.technocitysolutions.com/public/api/getCoursedetails";

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function uniqueCourses(courses = []) {
  const seen = new Set();

  return courses.filter((item, index) => {
    const key = String(
      item?.id ||
        item?.course_id ||
        item?.uc_id ||
        `${item?.course || ""}-${item?.university || ""}-${index}`
    );

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function matchesKeyword(item, keyword) {
  if (!keyword?.trim()) {
    return true;
  }

  const search = normalize(keyword);

  return [
    item?.course,
    item?.course_name,
    item?.name,
    item?.level,
    item?.duration,
    item?.entryrequirement,
    item?.remarks,
    item?.intakes,
    item?.intake,
    item?.deadline,
    item?.fees,
    item?.currency,
    item?.ielts,
    item?.ieltsless,
    item?.toefl,
    item?.toeflless,
    item?.pte,
    item?.country,
    item?.university,
    item?.location,
  ]
    .filter(Boolean)
    .some((value) =>
      normalize(value).includes(search)
    );
}

function matchesFilters({
  item,
  countryId,
  universityId,
  courseId,
  intake,
  levels,
}) {
  const countryMatch = countryId
    ? String(
        item?.d_id ||
          item?.country_id ||
          ""
      ) === String(countryId)
    : true;

  const universityMatch = universityId
    ? String(
        item?.u_id ||
          item?.university_id ||
          ""
      ) === String(universityId)
    : true;

  const courseMatch = courseId
    ? String(
        item?.c_id ||
          item?.course_id ||
          item?.main_course_id ||
          ""
      ) === String(courseId)
    : true;

  const intakeMatch = intake
    ? String(
        item?.intakes ||
          item?.intake ||
          ""
      )
        .toLowerCase()
        .includes(
          String(intake).toLowerCase()
        )
    : true;

  const levelList = String(levels || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const levelMatch =
    levelList.length > 0
      ? levelList.some((level) =>
          String(item?.level || "")
            .toLowerCase()
            .includes(
              level.toLowerCase()
            )
        )
      : true;

  return (
    countryMatch &&
    universityMatch &&
    courseMatch &&
    intakeMatch &&
    levelMatch
  );
}

async function getCourseDetails({
  uid,
  id,
}) {
  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append(
    "uid",
    String(uid || 0)
  );
  formData.append(
    "id",
    String(id)
  );

  const response = await fetch(
    COURSE_DETAIL_API,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load course details."
    );
  }

  const result =
    await response.json();

  return {
    courses: Array.isArray(result?.course)
      ? result.course
      : [],
    nextOffset: null,
    imagePath:
      result?.universities_image_path ||
      result?.maincourse_image_path ||
      result?.image_path ||
      "",
  };
}

async function getCoursePage({
  uid,
  universityId,
  courseId,
  offset,
}) {
  const formData = new FormData();

  formData.append("api", API_KEY);

  formData.append(
    "uid",
    String(uid || 0)
  );

  formData.append(
    "u_id",
    String(universityId || "")
  );

  formData.append(
    "c_id",
    String(courseId || "")
  );

  formData.append(
    "offset",
    String(offset || 0)
  );

  const response = await fetch(
    COURSE_API,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load courses."
    );
  }

  const result =
    await response.json();

  return {
    courses: Array.isArray(result?.course)
      ? result.course
      : [],

    nextOffset:
      result?.nextoffset &&
      String(result.nextoffset) !== "0"
        ? result.nextoffset
        : null,

    imagePath:
      result?.universities_image_path ||
      result?.university_image_path ||
      result?.maincourse_image_path ||
      result?.course_image_path ||
      result?.image_path ||
      "",
  };
}

export async function GET(request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const uid =
      searchParams.get("uid") || "0";

    const keyword =
      searchParams.get("keyword") || "";

    const countryId =
      searchParams.get("countryId") || "";

    const universityId =
      searchParams.get("universityId") ||
      "";

    const courseId =
      searchParams.get("courseId") || "";

    const selectedType =
      searchParams.get("selectedType") ||
      "";

    const selectedId =
      searchParams.get("selectedId") ||
      "";

    const intake =
      searchParams.get("intake") || "";

    const levels =
      searchParams.get("levels") || "";

    const offset =
      searchParams.get("offset") || "0";

    let response;

    /*
     * Exact course suggestion selected
     */
    if (
      selectedType === "course" &&
      selectedId
    ) {
      response =
        await getCourseDetails({
          uid,
          id: selectedId,
        });
    } else {
      /*
       * University suggestion selected:
       * use suggestion ID as university.
       */
      const effectiveUniversityId =
        selectedType ===
          "university" &&
        selectedId
          ? selectedId
          : universityId;

      response =
        await getCoursePage({
          uid,
          universityId:
            effectiveUniversityId,
          courseId,
          offset,
        });

      let courses =
        uniqueCourses(
          response.courses
        );

      courses = courses.filter(
        (item) =>
          matchesFilters({
            item,
            countryId,
            universityId:
              effectiveUniversityId,
            courseId,
            intake,
            levels,
          })
      );

      /*
       * Normal text search.
       * Do not re-filter when a specific
       * suggestion has already been selected.
       */
      if (
        keyword.trim() &&
        !selectedId
      ) {
        courses = courses.filter(
          (item) =>
            matchesKeyword(
              item,
              keyword
            )
        );
      }

      response = {
        ...response,
        courses,
      };
    }

    return NextResponse.json({
      courses:
        uniqueCourses(
          response.courses
        ),

      nextOffset:
        response.nextOffset,

      imagePath:
        response.imagePath || "",
    });
  } catch (error) {
    console.error(
      "Course search route error:",
      error
    );

    return NextResponse.json(
      {
        courses: [],
        nextOffset: null,
        message:
          error?.message ||
          "Unable to search courses.",
      },
      {
        status: 500,
      }
    );
  }
}