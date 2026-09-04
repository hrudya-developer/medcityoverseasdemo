import { createSlug } from "@/lib/slug";

import {
    normalizeUniversityCountrySlug,
} from "@/lib/universitySlug";

/* =========================================================
   COUNTRY SLUG NORMALIZER
========================================================= */

export function normalizeCountrySlug(
    value = ""
) {
    return normalizeUniversityCountrySlug(
        value
    );
}

/* =========================================================
   BASIC CLEANERS
========================================================= */

export function cleanText(
    value = ""
) {
    return String(
        value ?? ""
    )
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function cleanId(
    value = ""
) {
    return String(
        value ?? ""
    ).trim();
}

/* =========================================================
   SLUG NORMALIZER
========================================================= */

export function normalizeSlug(
    value = ""
) {
    try {
        return createSlug(
            decodeURIComponent(
                String(value ?? "")
            )
        );
    } catch {
        return createSlug(
            String(value ?? "")
        );
    }
}

/* =========================================================
   TEXT TRUNCATION
========================================================= */

export function truncateText(
    value,
    maxLength = 160
) {
    const text =
        cleanText(
            value
        );

    if (
        text.length <=
        maxLength
    ) {
        return text;
    }

    return `${text
        .slice(
            0,
            maxLength - 1
        )
        .trim()}…`;
}

/* =========================================================
   UNIVERSITY NAME
========================================================= */

export function getUniversityName(
    university
) {
    return cleanText(
        university?.name ??
        university?.university_name ??
        university?.university ??
        university?.u_name ??
        university?.title ??
        ""
    );
}

/* =========================================================
   UNIVERSITY ID

   INTERNAL USE ONLY.
   NEVER ADD THIS TO PUBLIC URL.
========================================================= */

export function getUniversityId(
    university
) {
    return cleanId(
        university?.id ??
        university?.u_id ??
        university?.university_id ??
        university?.universityId ??
        university?.uid ??
        ""
    );
}

/* =========================================================
   UNIVERSITY COUNTRY ID
========================================================= */

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

/* =========================================================
   UNIVERSITY COUNTRY NAME
========================================================= */

export function getUniversityCountry(
    university,
    fallbackCountry = ""
) {
    return cleanText(
        university?.country ??
        university?.country_name ??
        university?.destination ??
        university?.destination_name ??
        university?.location_country ??
        university?.countryName ??
        fallbackCountry ??
        ""
    );
}

/* =========================================================
   MEDIA URL
========================================================= */

export function createMediaUrl(
    value = "",
    basePath = ""
) {
    const file =
        String(
            value ?? ""
        ).trim();

    if (!file) {
        return "";
    }

    /*
     * Already an absolute URL
     */
    if (
        file.startsWith(
            "https://"
        ) ||
        file.startsWith(
            "http://"
        )
    ) {
        return file;
    }

    /*
     * Local Next.js/public image
     */
    if (
        file.startsWith("/")
    ) {
        return file;
    }

    const base =
        String(
            basePath ?? ""
        )
            .trim()
            .replace(
                /\/+$/,
                ""
            );

    if (!base) {
        return "";
    }

    return `${base}/${file.replace(
        /^\/+/,
        ""
    )}`;
}

/* =========================================================
   UNIVERSITY LOGO

   Handles different API field names.

   Examples:
   logo
   university_logo
   universityLogo
   u_logo
   logo_image
   image
========================================================= */

export function getUniversityLogo(
    university,
    imagePath = ""
) {
    if (!university) {
        return "";
    }

    const logo =
        university?.logo ??
        university?.university_logo ??
        university?.universityLogo ??
        university?.u_logo ??
        university?.logo_image ??
        university?.logoImage ??
        university?.university_image ??
        university?.universityImage ??
        university?.image ??
        university?.image_name ??
        university?.imageName ??
        university?.photo ??
        university?.thumbnail ??
        "";

    if (!logo) {
        return "";
    }

    /*
     * Sometimes API returns its own path
     * inside the university object.
     */
    const resolvedBasePath =
        university?.image_path ??
        university?.imagePath ??
        university?.logo_path ??
        university?.logoPath ??
        university?.university_image_path ??
        university?.universityImagePath ??
        imagePath ??
        "";

    return createMediaUrl(
        logo,
        resolvedBasePath
    );
}

/* =========================================================
   CANONICAL UNIVERSITY SLUG

   ONE PUBLIC URL FORMAT ONLY.

   Coventry University
   →
   coventry-university

   Modul University
   →
   modul-university

   Country and backend ID are NOT exposed.
========================================================= */

export function createUniversitySlug(
    university
) {
    const universityName =
        typeof university ===
        "string"
            ? cleanText(
                  university
              )
            : getUniversityName(
                  university
              );

    if (!universityName) {
        return "";
    }

    return normalizeSlug(
        universityName
    );
}

/* =========================================================
   CANONICAL UNIVERSITY URL

   Modul University
   →
   /universities/modul-university
========================================================= */

export function createUniversityUrl(
    university
) {
    const slug =
        createUniversitySlug(
            university
        );

    if (!slug) {
        return "/universities";
    }

    return `/universities/${slug}`;
}

/* =========================================================
   COUNTRY STUDY URL

   Germany
   →
   /study-in-germany
========================================================= */

export function createCountryStudyUrl(
    countryName = "",
    section = ""
) {
    const countrySlug =
        normalizeCountrySlug(
            countryName
        );

    if (!countrySlug) {
        return "/universities";
    }

    const baseUrl =
        `/study-in-${countrySlug}`;

    if (!section) {
        return baseUrl;
    }

    return `${baseUrl}#${section}`;
}

/* =========================================================
   UNIVERSITY FROM API RESPONSE
========================================================= */

export function getUniversityFromResponse(
    result
) {
    if (!result) {
        return null;
    }

    /*
     * data: [...]
     */
    if (
        Array.isArray(
            result?.data
        )
    ) {
        return (
            result.data[0] ??
            null
        );
    }

    /*
     * data: {...}
     */
    if (
        result?.data &&
        typeof result.data ===
            "object"
    ) {
        return (
            result.data
                ?.university ??
            result.data
                ?.selectedUniversity ??
            result.data
                ?.universityDetails ??
            result.data
                ?.details ??
            result.data ??
            null
        );
    }

    return (
        result?.university ??
        result?.selectedUniversity ??
        result?.universityDetails ??
        result?.details ??
        null
    );
}

/* =========================================================
   COURSES
========================================================= */

export function extractCourses(
    result
) {
    if (!result) {
        return [];
    }

    if (
        Array.isArray(
            result
        )
    ) {
        return result.filter(
            Boolean
        );
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
        result?.data
            ?.university_courses,
        result?.data
            ?.universityCourses,

        result?.result?.course,
        result?.result?.courses,
        result?.result
            ?.course_data,
        result?.result
            ?.courseData,
        result?.result
            ?.university_courses,
        result?.result
            ?.universityCourses,
    ];

    for (
        const candidate of
        candidates
    ) {
        if (
            Array.isArray(
                candidate
            )
        ) {
            return candidate.filter(
                Boolean
            );
        }
    }

    return [];
}

/* =========================================================
   DESTINATION NAME
========================================================= */

export function getDestinationName(
    destination
) {
    return cleanText(
        destination?.country ??
        destination?.name ??
        destination?.destination ??
        destination?.country_name ??
        destination?.destination_name ??
        ""
    );
}

/* =========================================================
   DESTINATION ID
========================================================= */

export function getDestinationId(
    destination
) {
    return cleanId(
        destination?.id ??
        destination?.d_id ??
        destination?.country_id ??
        destination?.destination_id ??
        destination?.destinationId ??
        ""
    );
}