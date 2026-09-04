/* =========================================================
   UNIVERSITY LOGO BASE URL
========================================================= */

const UNIVERSITY_LOGO_BASE_URL =
    "https://overseas.technocitysolutions.com/public/images/university";

/* =========================================================
   SAFE UNIVERSITY LOGO URL
========================================================= */

export function getSafeLogoUrl(
    value,
    imageBasePath = ""
) {
    if (!value) {
        return "";
    }

    const logo =
        String(
            value
        ).trim();

    if (!logo) {
        return "";
    }

    /* =====================================================
       COMPLETE REMOTE URL
    ===================================================== */

    if (
        /^https?:\/\//i.test(
            logo
        )
    ) {
        return logo;
    }

    /* =====================================================
       DATA / BLOB URL
    ===================================================== */

    if (
        logo.startsWith(
            "data:"
        ) ||
        logo.startsWith(
            "blob:"
        )
    ) {
        return logo;
    }

    /* =====================================================
       API PATH

       Example:
       /public/images/university/logo.webp
    ===================================================== */

    if (
        logo.startsWith(
            "/public/images/university/"
        )
    ) {
        return `https://overseas.technocitysolutions.com${logo}`;
    }

    /* =====================================================
       API PATH WITHOUT STARTING SLASH
    ===================================================== */

    if (
        logo.startsWith(
            "public/images/university/"
        )
    ) {
        return `https://overseas.technocitysolutions.com/${logo}`;
    }

    /* =====================================================
       LOCAL PUBLIC IMAGE

       Only treat "/" as local after checking
       API university paths above.
    ===================================================== */

    if (
        logo.startsWith("/")
    ) {
        return logo;
    }

    /* =====================================================
       API PROVIDED IMAGE BASE PATH
    ===================================================== */

    if (imageBasePath) {
        const cleanBase =
            String(
                imageBasePath
            )
                .trim()
                .replace(
                    /\/+$/,
                    ""
                );

        const cleanLogo =
            logo.replace(
                /^\/+/,
                ""
            );

        if (cleanBase) {
            return `${cleanBase}/${cleanLogo}`;
        }
    }

    /* =====================================================
       API RETURNS ONLY FILENAME

       Example:
       1692351251.png

       ->
       https://overseas.technocitysolutions.com/
       public/images/university/1692351251.png
    ===================================================== */

    const cleanLogo =
        logo.replace(
            /^\/+/,
            ""
        );

    return `${UNIVERSITY_LOGO_BASE_URL}/${cleanLogo}`;
}