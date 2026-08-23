import {
    NextResponse,
} from "next/server";
import { createSlug } from "@/lib/slug";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getCoursedetails";

const API_KEY =
    "overseas@Miak2023";

const COURSE_SEARCH_API =
    "https://overseas.technocitysolutions.com/public/api/searchResults";

const COURSE_LIST_API =
    "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest";

const getCourseName = (course) =>
    course?.course_name ||
    course?.course ||
    course?.name ||
    course?.title ||
    "";

const getCourseId = (course) =>
    course?.id ||
    course?.course_id ||
    course?.c_id ||
    course?.uc_id ||
    "";

async function searchResults(keyword, keytype) {
    const formData = new FormData();
    formData.append("api", API_KEY);
    formData.append("keytype", keytype);
    formData.append("keyword", keyword);

    const response = await fetch(COURSE_SEARCH_API, {
        method: "POST",
        body: formData,
        cache: "no-store",
    });

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result?.suggestion)
        ? result.suggestion
        : Array.isArray(result?.course)
            ? result.course
            : Array.isArray(result?.university)
                ? result.university
                : [];
}

async function resolveCourseId(courseSlug, uid) {
    if (/^\d+$/.test(courseSlug)) {
        return courseSlug;
    }

    const courses = await searchResults(
        courseSlug.replace(/-/g, " "),
        "course"
    );

    const course = courses.find((item) => {
        return createSlug(getCourseName(item)) === courseSlug;
    });

    if (!course) return null;

    const universityName =
        course?.university ||
        course?.university_name ||
        "";

    const universities = universityName
        ? await searchResults(universityName, "university")
        : [];

    const university = universities.find((item) =>
        String(
            item?.university ||
            item?.name ||
            item?.u_name ||
            ""
        ).trim().toLowerCase() ===
        universityName.trim().toLowerCase()
    );

    const universityId =
        university?.id ||
        university?.u_id ||
        university?.university_id ||
        "";

    if (!universityId) {
        return String(getCourseId(course) || "");
    }

    const formData = new FormData();
    formData.append("api", API_KEY);
    formData.append("uid", String(uid));
    formData.append("u_id", String(universityId));
    formData.append("c_id", String(getCourseId(course)));
    formData.append("offset", "0");

    const response = await fetch(COURSE_LIST_API, {
        method: "POST",
        body: formData,
        cache: "no-store",
    });

    if (!response.ok) return String(getCourseId(course));

    const result = await response.json();
    const universityCourses = Array.isArray(result?.course)
        ? result.course
        : [];

    const universityCourse = universityCourses.find(
        (item) => createSlug(getCourseName(item)) === courseSlug
    );

    return String(
        getCourseId(universityCourse) ||
        getCourseId(course) ||
        ""
    );
}

export async function GET(request) {
    try {
        const {
            searchParams,
        } = new URL(request.url);

        const requestedCourse =
            searchParams.get("courseId");

        const uid =
            searchParams.get("uid") || "0";

        if (!requestedCourse) {
            return NextResponse.json(
                {
                    message:
                        "Course ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const courseId = await resolveCourseId(
            requestedCourse,
            uid
        );

        if (!courseId) {
            return NextResponse.json(
                {
                    message:
                        "Course not found for this URL.",
                },
                { status: 404 }
            );
        }

        const formData =
            new FormData();

        formData.append(
            "api",
            API_KEY
        );

        formData.append(
            "uid",
            String(uid)
        );

        formData.append(
            "id",
            String(courseId)
        );

        formData.append(
            "c_id",
            String(courseId)
        );

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                body: formData,
                cache: "no-store",
            }
        );

        const text =
            await response.text();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        "Unable to fetch course details.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        let result;

        try {
            result =
                JSON.parse(text);
        } catch {
            return NextResponse.json(
                {
                    message:
                        "Invalid response from course API.",
                },
                {
                    status: 502,
                }
            );
        }

        const course =
            result?.course?.[0] ??
            result?.data?.[0] ??
            result?.details?.[0] ??
            result?.course ??
            result?.data ??
            result?.details ??
            null;

        return NextResponse.json({
            course,
            raw: result,
        });
    } catch (error) {
        console.error(
            "Course details API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Something went wrong while fetching course details.",
            },
            {
                status: 500,
            }
        );
    }
}