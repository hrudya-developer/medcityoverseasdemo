const SITE_URL = "https://medcityoverseas.com";

/*
 * Set SITE_ENV=production only for the real production deployment.
 *
 * Production:
 * SITE_ENV=production
 *
 * Preview/staging:
 * SITE_ENV=preview
 */
const IS_PRODUCTION = process.env.SITE_ENV === "production";

export default function robots() {
    if (!IS_PRODUCTION) {
        return {
            rules: [
                {
                    userAgent: "*",
                    disallow: "/",
                },
            ],
        };
    }

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/admin/",
                    "/dashboard/",
                    "/student/",
                    "/login/",
                    "/loginViaOtp/",
                    "/otp-verification/",
                    "/create-account/",
                    "/private/",
                ],
            },
        ],

        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}