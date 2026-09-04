/** @type {import("next").NextConfig} */

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
           
        ];
    },
};

export default nextConfig;