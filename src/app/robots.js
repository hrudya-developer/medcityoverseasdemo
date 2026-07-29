const SITE_URL = "https://medcityoverseas.com";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/student/",
                    "/dashboard/",
                    "/login/",
                    "/create-account/",
                    "/api/",
                    "/admin/",
                ],
            },
        ],

        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}