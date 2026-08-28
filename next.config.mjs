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
        pathname:
          "/public/uploads/destination/**",
      },

      {
        protocol: "https",
        hostname:
          "overseas.technocitysolutions.com",
        pathname:
          "/public/images/**",
      },

      {
        protocol: "https",
        hostname:
          "img.youtube.com",
        pathname: "/vi/**",
      },

      {
        protocol: "https",
        hostname:
          "placehold.co",
        pathname: "/**",
      },
    ],

    /*
     * Your current components use quality={100}.
     * Next.js requires custom qualities to be
     * explicitly allowed.
     */
    qualities: [
      75,
      80,
      85,
      90,
      95,
      100,
    ],

    /*
     * Prefer modern optimized formats.
     */
    formats: [
      "image/avif",
      "image/webp",
    ],

    /*
     * Cache optimized images for 1 day.
     */
    minimumCacheTTL: 86400,
  },

  /* =====================================================
     SEO-FRIENDLY PUBLIC URLS
  ===================================================== */
  async rewrites() {
    return [
      /*
       * Browser / Google sees:
       *
       * /study-in-uk
       * /study-in-france
       * /study-in-ireland
       *
       * Internally Next.js renders:
       *
       * /destination/uk
       * /destination/france
       * /destination/ireland
       */
      {
        source:
          "/study-in-:slug",

        destination:
          "/destination/:slug",
      },
    ];
  },

  /* =====================================================
     OLD URL REDIRECTS
  ===================================================== */
  async redirects() {
    return [
      /*
       * If old URLs have already been indexed,
       * linked or shared, permanently redirect
       * them to the new SEO URLs.
       */
      {
        source:
          "/destination/:slug",

        destination:
          "/study-in-:slug",

        permanent: true,
      },

      /*
       * Optional:
       * redirect your old ID-based destination
       * route only if it is still publicly used.
       *
       * Do NOT uncomment this unless you can map
       * IDs to slugs. An ID cannot automatically
       * become a country slug.
       */

      // {
      //   source:
      //     "/destination-details/:id",
      //   destination:
      //     "/destinations",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;