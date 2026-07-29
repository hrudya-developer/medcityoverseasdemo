const SITE_URL = "https://medcityoverseas.com";
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
// or: process.env.NEXT_PUBLIC_VERCEL_URL check / hostname check, depending on how you detect it

export default function robots() {
    if (!IS_PRODUCTION) {
        return {
            rules: [{ userAgent: "*", disallow: "/" }],
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
                    "/_next/",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}