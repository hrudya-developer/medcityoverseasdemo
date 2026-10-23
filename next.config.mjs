/** @type {import("next").NextConfig} */

/*
 * Old branch addresses (/center/<city>, /study-abroad-consultants-<city>)
 * still get Google traffic. Each city goes to its branch page. Pala and
 * Thiruvalla have two branches each; the old address goes to the first.
 */
const BRANCH_CITY_SLUGS = {
    calicut: "medcity-calicut",
    ernakulam: "medcity-kochi",
    kanjikuzhi: "medcity-kanjikuzhi",
    kanjikuzhy: "medcity-kanjikuzhi",
    kannur: "medcity-kannur",
    kattappana: "medcity-kattappana",
    kochi: "medcity-kochi",
    kollam: "medcity-kollam",
    kothamangalam: "medcity-kothamangalam",
    kottayam: "medcity-kottayam",
    kozhikode: "medcity-calicut",
    mangalore: "medcity-mangalore",
    mangaluru: "medcity-mangalore",
    mavelikkara: "medcity-mavelikkara",
    muvattupuzha: "medcity-muvattupuzha",
    pala: "medcity-pala",
    thiruvalla: "medcity-thiruvalla-ksrtc",
    thiruvananthapuram: "medcity-trivandrum",
    thodupuzha: "medcity-thodupuzha",
    thrissur: "medcity-thrissur",
    trivandrum: "medcity-trivandrum",
    tvm: "medcity-trivandrum",
};

const branchRedirects = Object.entries(BRANCH_CITY_SLUGS).flatMap(
    ([city, slug]) => [
        {
            source: `/center/${city}`,
            destination: `/branch/${slug}`,
            permanent: true,
        },
        {
            source: `/centers/${city}`,
            destination: `/branch/${slug}`,
            permanent: true,
        },
        {
            source: `/study-abroad-consultants-${city}`,
            destination: `/branch/${slug}`,
            permanent: true,
        },
    ]
);

/* Other addresses from the old site that Google still crawls. */
const legacyPageRedirects = [
    ["/center", "/branches"],
    ["/centers", "/branches"],
    ["/center/:path*", "/branches"],
    ["/centers/:path*", "/branches"],
    ["/testimonials", "/all-testimonials"],
    ["/contact", "/contact-us"],
    ["/book-appointment", "/contact-us"],
    ["/canada-migration", "/migrate-to-canada"],
    ["/why-to-canada", "/migrate-to-canada"],
    ["/courseSearch", "/courses"],
    ["/find-a-course", "/courses"],
    ["/find-a-course/search", "/courses"],
    ["/allUniversities", "/universities"],
    ["/destinationList", "/destinations"],
    ["/germanPopularCourses", "/study-in-germany"],
    ["/german-popular-courses", "/study-in-germany"],
    ["/ausbildung-FSJ-&-aupair", "/study-in-germany"],
    ["/loan-assistance", "/add-on-services"],
    // Numeric ids: the destination page sends these on to the slug page.
    ["/destination-details/:id(\\d+)", "/study-in-:id"],
].map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
}));

const nextConfig = {
    reactCompiler: true,

    /* =====================================================
       IMAGE OPTIMIZATION
    ===================================================== */

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "overseas.technocitysolutions.com",
            },
            {
                protocol: "https",
                hostname:
                    "img.youtube.com",
            },
            {
                protocol: "https",
                hostname:
                    "placehold.co",
            },
        ],

        qualities: [
            75,
            80,
            85,
            90,
            95,
            100,
        ],

        formats: [
            "image/avif",
            "image/webp",
        ],

        minimumCacheTTL: 86400,
    },

    /* =====================================================
       BROWSER CACHING FOR PUBLIC FILES
       Next.js sends "max-age=0" for files in public/, so every
       visit revalidates every image. These names carry no content
       hash, and /_next/image reuses this max-age for its own cache,
       so images are fresh for one day (then refreshed in the
       background for up to a week): a file replaced under the same
       name reaches visitors within a day. Videos are large and
       rarely replaced, so they keep a week.
    ===================================================== */

    async headers() {
        const cacheFor = (value) => [
            {
                key: "Cache-Control",
                value,
            },
        ];

        const imageCache = cacheFor(
            "public, max-age=86400, stale-while-revalidate=604800"
        );

        const videoCache = cacheFor(
            "public, max-age=604800, stale-while-revalidate=2592000"
        );

        return [
            ...[
                "/assets/:path*",
                "/images/:path*",
                "/og-images/:path*",
                "/logo.png",
                "/apple-touch-icon.png",
            ].map((source) => ({
                source,
                headers: imageCache,
            })),
            {
                source: "/videos/:path*",
                headers: videoCache,
            },
        ];
    },

    /* =====================================================
       SEO REWRITES
    ===================================================== */

    async rewrites() {
        return [
            {
                source:
                    "/study-in-:slug",

                destination:
                    "/destination/:slug",
            },

            {
                source:
                    "/universities-in-:country",

                destination:
                    "/all-universities/:country",
            },
        ];
    },

    /* =====================================================
       PERMANENT REDIRECTS
    ===================================================== */

    async redirects() {
        return [
            {
                source:
                    "/destination/:slug",

                destination:
                    "/study-in-:slug",

                permanent: true,
            },

            {
                source:
                    "/all-universities/:country",

                destination:
                    "/universities-in-:country",

                permanent: true,
            },

            {
                source:
                    "/course-search",

                destination:
                    "/courses",

                permanent: true,
            },

            {
                source:
                    "/university-details/:slug",

                destination:
                    "/universities/:slug",

                permanent: true,
            },

            {
                source:
                    "/study-at-:slug",

                destination:
                    "/universities/:slug",

                permanent: true,
            },

            {
                source: "/german-programs",
                destination: "/study-in-germany",
                permanent: true,
            },
            {
                source:
                  "/branch/medcity-thiruvalla",
                destination:
                  "/branch/medcity-thiruvalla-ksrtc",
                permanent: true,
              },

            ...branchRedirects,

            ...legacyPageRedirects,
        ];
    },
};

export default nextConfig;