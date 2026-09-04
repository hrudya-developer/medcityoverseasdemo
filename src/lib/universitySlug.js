import { createSlug } from "@/lib/slug";

/* =========================================================
   CONFIG
========================================================= */

const COOKIE_PREFIX =
    "medcity_university_";

const SESSION_PREFIX =
    "public-university:";

/* =========================================================
   CLEANERS
========================================================= */

function cleanText(
    value = ""
) {
    return String(
        value ?? ""
    )
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function cleanId(
    value = ""
) {
    return String(
        value ?? ""
    ).trim();
}

/* =========================================================
   COUNTRY NORMALIZATION

   Used internally only.

   University URLs themselves do NOT contain country.
========================================================= */

export function normalizeUniversityCountrySlug(
    value = ""
) {
    const slug =
        createSlug(
            cleanText(
                value
            )
        );

    const aliases = {
        "united-kingdom":
            "uk",

        "great-britain":
            "uk",

        "united-states":
            "usa",

        "united-states-of-america":
            "usa",

        "u-s-a":
            "usa",

        "u-s":
            "usa",

        newzealand:
            "new-zealand",
    };

    return (
        aliases[slug] ||
        slug
    );
}

/* =========================================================
   UNIVERSITY ID

   INTERNAL ONLY.
========================================================= */

export function getUniversityPublicId(
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
   UNIVERSITY NAME
========================================================= */

export function getUniversityPublicName(
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
   UNIVERSITY COUNTRY

   Internal metadata only.
========================================================= */

export function getUniversityPublicCountry(
    university,
    fallbackCountry = ""
) {
    return cleanText(
        university?.country ??
        university?.country_name ??
        university?.destination ??
        university?.destination_name ??
        university?.countryName ??
        fallbackCountry ??
        ""
    );
}

/* =========================================================
   COUNTRY ID
========================================================= */

export function getUniversityPublicCountryId(
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
   CANONICAL PUBLIC UNIVERSITY SLUG

   IMPORTANT:

   Country is NOT included.

   Coventry University
   ↓
   coventry-university

   Monash University
   ↓
   monash-university

   No ID.
   No country.
========================================================= */

export function createUniversityPublicSlug(
    university
) {
    const name =
        getUniversityPublicName(
            university
        );

    if (!name) {
        return "";
    }

    return createSlug(
        name
    );
}

/* =========================================================
   PUBLIC UNIVERSITY URL
========================================================= */

export function createUniversityPublicHref(
    university
) {
    const slug =
        createUniversityPublicSlug(
            university
        );

    return slug
        ? `/universities/${slug}`
        : "/universities";
}

/* =========================================================
   COOKIE NAME
========================================================= */

export function getUniversityMappingCookieName(
    slug
) {
    const safeSlug =
        createSlug(
            slug ?? ""
        );

    if (!safeSlug) {
        return "";
    }

    return `${COOKIE_PREFIX}${safeSlug}`;
}

/* =========================================================
   SAVE SLUG -> ID MAPPING

   Optional performance optimization.

   ID stays internal.
========================================================= */

export function saveUniversityMapping(
    university,
    fallbackCountry = ""
) {
    if (
        typeof window ===
        "undefined"
    ) {
        return null;
    }

    const id =
        getUniversityPublicId(
            university
        );

    const name =
        getUniversityPublicName(
            university
        );

    const country =
        getUniversityPublicCountry(
            university,
            fallbackCountry
        );

    const countryId =
        getUniversityPublicCountryId(
            university
        );

    const slug =
        createUniversityPublicSlug(
            university
        );

    if (
        !id ||
        !slug
    ) {
        return null;
    }

    const payload = {
        id,
        slug,
        name,
        country,
        countryId,
    };

    try {
        sessionStorage.setItem(
            `${SESSION_PREFIX}${slug}`,
            JSON.stringify(
                payload
            )
        );
    } catch {
        // Optional only.
    }

    try {
        const cookieName =
            getUniversityMappingCookieName(
                slug
            );

        if (cookieName) {
            document.cookie =
                `${cookieName}=` +
                `${encodeURIComponent(
                    JSON.stringify(
                        payload
                    )
                )}; ` +
                "Path=/; " +
                "Max-Age=1800; " +
                "SameSite=Lax";
        }
    } catch {
        // Optional only.
    }

    return payload;
}

/* =========================================================
   READ CLIENT MAPPING
========================================================= */

export function getSavedUniversityMapping(
    slug
) {
    if (
        typeof window ===
        "undefined"
    ) {
        return null;
    }

    const safeSlug =
        createSlug(
            slug ?? ""
        );

    if (!safeSlug) {
        return null;
    }

    try {
        const raw =
            sessionStorage.getItem(
                `${SESSION_PREFIX}${safeSlug}`
            );

        if (!raw) {
            return null;
        }

        const parsed =
            JSON.parse(
                raw
            );

        if (!parsed?.id) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}