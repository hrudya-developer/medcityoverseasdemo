import { createSlug } from "@/lib/slug";

export function cleanText(value = "") {
    return String(value ?? "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function cleanId(value = "") {
    return String(value ?? "").trim();
}

export function normalizeSlug(value = "") {
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

export function truncateText(
    value,
    maxLength = 160
) {
    const text = cleanText(value);

    if (text.length <= maxLength) {
        return text;
    }

    return `${text
        .slice(0, maxLength - 1)
        .trim()}…`;
}

export function getUniversityName(
    university
) {
    return cleanText(
        university?.name ??
        university?.university_name ??
        university?.university ??
        university?.u_name ??
        ""
    );
}

export function getUniversityCountryId(
    university
) {
    return cleanId(
        university?.d_id ??
        university?.country_id ??
        university?.destination_id ??
        university?.destinationId ??
        ""
    );
}

export function getUniversityFromResponse(
    result
) {
    if (!result) {
        return null;
    }

    if (Array.isArray(result?.data)) {
        return result.data[0] ?? null;
    }

    if (
        result?.data &&
        typeof result.data === "object"
    ) {
        return (
            result.data?.university ??
            result.data?.selectedUniversity ??
            result.data?.universityDetails ??
            result.data?.details ??
            result.data ??
            null
        );
    }

    return (
        result?.university ??
        result?.selectedUniversity ??
        result?.universityDetails ??
        null
    );
}

export function extractCourses(result) {
    if (!result) {
        return [];
    }

    if (Array.isArray(result)) {
        return result.filter(Boolean);
    }

    const candidates = [
        result?.course,
        result?.courses,
        result?.course_data,
        result?.courseData,
        result?.university_courses,
        result?.universityCourses,
        result?.data?.course,
        result?.data?.courses,
        result?.data?.course_data,
        result?.data?.courseData,
        result?.result?.course,
        result?.result?.courses,
    ];

    for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
            return candidate.filter(Boolean);
        }
    }

    return [];
}

export function getDestinationName(
    destination
) {
    return cleanText(
        destination?.country ??
        destination?.name ??
        destination?.destination ??
        destination?.country_name ??
        ""
    );
}