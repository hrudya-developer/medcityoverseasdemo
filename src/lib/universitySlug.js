import { createSlug } from "@/lib/slug";

const COOKIE_PREFIX = "medcity_university_";

function cleanText(value = "") {
    return String(value ?? "")
        .replace(/\s+/g, " ")
        .trim();
}

export function getUniversityPublicId(university) {
    return cleanText(
        university?.id ??
        university?.u_id ??
        university?.university_id ??
        university?.universityId ??
        university?.uid ??
        ""
    );
}

export function getUniversityPublicName(university) {
    return cleanText(
        university?.name ??
        university?.university_name ??
        university?.university ??
        university?.u_name ??
        university?.title ??
        ""
    );
}

export function getUniversityPublicCountry(
    university,
    fallbackCountry = ""
) {
    return cleanText(
        university?.country ??
        university?.country_name ??
        university?.destination ??
        university?.destination_name ??
        fallbackCountry ??
        ""
    );
}

export function getUniversityPublicCountryId(university) {
    return cleanText(
        university?.d_id ??
        university?.country_id ??
        university?.destination_id ??
        university?.destinationId ??
        ""
    );
}

/* =========================================================
   PUBLIC SEO SLUG

   Griffith College + Australia
   -> griffith-college-australia

   The database ID is NOT exposed in the URL.
========================================================= */

export function createUniversityPublicSlug(
    university,
    fallbackCountry = ""
) {
    const name =
        getUniversityPublicName(university);

    const country =
        getUniversityPublicCountry(
            university,
            fallbackCountry
        );

    if (!name) {
        return "";
    }

    if (!country) {
        return createSlug(name);
    }

    return createSlug(
        `${name} ${country}`
    );
}

export function createUniversityPublicHref(
    university,
    fallbackCountry = ""
) {
    const slug =
        createUniversityPublicSlug(
            university,
            fallbackCountry
        );

    return slug
        ? `/universities/${slug}`
        : "";
}

export function getUniversityMappingCookieName(slug) {
    const safeSlug =
        createSlug(slug ?? "");

    if (!safeSlug) {
        return "";
    }

    return `${COOKIE_PREFIX}${safeSlug}`;
}

/* =========================================================
   STORE EXACT UNIVERSITY ID INTERNALLY
========================================================= */

export function saveUniversityMapping(
    university,
    fallbackCountry = ""
) {
    if (typeof window === "undefined") {
        return null;
    }

    const id =
        getUniversityPublicId(university);

    const name =
        getUniversityPublicName(university);

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
            university,
            fallbackCountry
        );

    if (!id || !name || !slug) {
        return null;
    }

    const payload = {
        id,
        slug,
        name,
        country,
        countryId,
    };

    /* SESSION STORAGE */

    try {
        sessionStorage.setItem(
            `public-university:${slug}`,
            JSON.stringify(payload)
        );
    } catch {
        // Do not block navigation.
    }

    /* SERVER-READABLE COOKIE */

    try {
        const cookieName =
            getUniversityMappingCookieName(
                slug
            );

        if (cookieName) {
            document.cookie =
                `${cookieName}=` +
                `${encodeURIComponent(
                    JSON.stringify(payload)
                )}; ` +
                "Path=/; " +
                "Max-Age=1800; " +
                "SameSite=Lax";
        }
    } catch {
        // Do not block navigation.
    }

    return payload;
}