import {
    createUniversityPublicSlug,
  } from "@/lib/universitySlug";
  
  import {
    cleanText,
    getUniversityName,
    normalizeSlug,
    truncateText,
  } from "./universityHelpers";
  
  import {
    resolveUniversity,
  } from "./universityResolver";
  
  /* =========================================================
     CONFIG
  ========================================================= */
  
  const SITE_URL =
    "https://medcityoverseas.com";
  
  const DEFAULT_OG_IMAGE =
    `${SITE_URL}/og-images/universities.webp`;
  
  /* =========================================================
     HELPERS
  ========================================================= */
  
  function makeAbsoluteUrl(value) {
    const url =
      cleanText(value);
  
    if (!url) {
      return "";
    }
  
    if (
      url.startsWith("https://") ||
      url.startsWith("http://")
    ) {
      return url;
    }
  
    if (url.startsWith("/")) {
      return `${SITE_URL}${url}`;
    }
  
    return "";
  }
  
  function getUniversityDescription(
    university,
    details
  ) {
    const description =
      university?.about ??
      university?.description ??
      university?.overview ??
      university?.university_description ??
      details?.about ??
      details?.description ??
      details?.overview ??
      details?.info?.about ??
      details?.info?.description ??
      "";
  
    return cleanText(description);
  }
  
  function getUniversityImage(
    university,
    details
  ) {
    const image =
      university?.og_image ??
      university?.banner ??
      university?.image ??
      university?.university_image ??
      university?.logo ??
      university?.university_logo ??
      details?.og_image ??
      details?.banner ??
      details?.image ??
      details?.logo ??
      details?.university_logo ??
      details?.info?.image ??
      details?.info?.logo ??
      "";
  
    return (
      makeAbsoluteUrl(image) ||
      DEFAULT_OG_IMAGE
    );
  }
  
  function getSeoDescription({
    universityName,
    countryName,
    university,
    details,
  }) {
    const apiDescription =
      getUniversityDescription(
        university,
        details
      );
  
    if (apiDescription) {
      return truncateText(
        apiDescription,
        160
      );
    }
  
    const fallback =
      countryName
        ? `Explore ${universityName} in ${countryName}. Discover available courses, admission requirements, intakes and study abroad guidance for Indian students with Medcity Overseas.`
        : `Explore ${universityName}. Discover available courses, admission requirements, intakes and study abroad guidance for Indian students with Medcity Overseas.`;
  
    return truncateText(
      fallback,
      160
    );
  }
  
  /* =========================================================
     BUILD METADATA
  ========================================================= */
  
  export async function buildUniversityMetadata({
    params,
  }) {
    const { slug: rawSlug } =
      await params;
  
    const slug =
      normalizeSlug(rawSlug);
  
    /* =======================================================
       INVALID SLUG
    ======================================================= */
  
    if (!slug) {
      return {
        title: {
          absolute:
            "University Not Found | Medcity Overseas",
        },
  
        description:
          "The requested university page could not be found.",
  
        robots: {
          index: false,
          follow: false,
        },
      };
    }
  
    /* =======================================================
       RESOLVE UNIVERSITY
    ======================================================= */
  
    const resolved =
      await resolveUniversity(
        slug
      );
  
    if (
      !resolved?.university
    ) {
      return {
        title: {
          absolute:
            "University Not Found | Medcity Overseas",
        },
  
        description:
          "The requested university could not be found. Explore universities and study abroad opportunities with Medcity Overseas.",
  
        robots: {
          index: false,
          follow: true,
        },
      };
    }
  
    /* =======================================================
       UNIVERSITY DATA
    ======================================================= */
  
    const university =
      resolved.university;
  
    const details =
      resolved.details;
  
    const universityName =
      cleanText(
        getUniversityName(
          university
        )
      );
  
    const countryName =
      cleanText(
        resolved.countryName ??
          university?.country ??
          university?.country_name ??
          resolved.courses?.[0]
            ?.country ??
          ""
      );
  
    /* =======================================================
       INVALID UNIVERSITY NAME
    ======================================================= */
  
    if (!universityName) {
      return {
        title: {
          absolute:
            "Universities Abroad | Medcity Overseas",
        },
  
        description:
          "Explore universities abroad, courses, admissions and study opportunities for Indian students.",
  
        robots: {
          index: false,
          follow: true,
        },
      };
    }
  
    /* =======================================================
       CANONICAL URL
    ======================================================= */
  
    const canonicalSlug =
      createUniversityPublicSlug(
        {
          ...university,
  
          name:
            universityName,
  
          country:
            countryName,
        },
        countryName
      );
  
    /*
     * Fallback to current slug only if
     * createUniversityPublicSlug unexpectedly fails.
     */
    const finalSlug =
      canonicalSlug || slug;
  
    const canonicalUrl =
      `${SITE_URL}/universities/${finalSlug}`;
  
    /* =======================================================
       TITLE
    ======================================================= */
  
    /*
     * Keep title concise.
     *
     * Example:
     * University of Greenwich in UK | Medcity Overseas
     *
     * Avoid adding "Ranking" unless actual ranking
     * information exists on the page.
     */
    const title =
      countryName
        ? `${universityName} in ${countryName} | Medcity Overseas`
        : `${universityName} | Medcity Overseas`;
  
    /* =======================================================
       DESCRIPTION
    ======================================================= */
  
    const description =
      getSeoDescription({
        universityName,
        countryName,
        university,
        details,
      });
  
    /* =======================================================
       SOCIAL IMAGE
    ======================================================= */
  
    const ogImage =
      getUniversityImage(
        university,
        details
      );
  
    const imageAlt =
      countryName
        ? `${universityName} in ${countryName}`
        : universityName;
  
    /* =======================================================
       OPEN GRAPH TITLE
    ======================================================= */
  
    const socialTitle =
      countryName
        ? `${universityName} in ${countryName} - Courses & Admissions`
        : `${universityName} - Courses & Admissions`;
  
    /* =======================================================
       RETURN METADATA
    ======================================================= */
  
    return {
      title: {
        absolute:
          title,
      },
  
      description,
  
      alternates: {
        canonical:
          canonicalUrl,
      },
  
      robots: {
        index: true,
  
        follow: true,
  
        googleBot: {
          index: true,
  
          follow: true,
  
          "max-image-preview":
            "large",
  
          "max-snippet":
            -1,
  
          "max-video-preview":
            -1,
        },
      },
  
      openGraph: {
        type:
          "website",
  
        locale:
          "en_IN",
  
        url:
          canonicalUrl,
  
        siteName:
          "Medcity Overseas",
  
        title:
          socialTitle,
  
        description,
  
        images: [
          {
            url:
              ogImage,
  
            width:
              1200,
  
            height:
              630,
  
            alt:
              imageAlt,
          },
        ],
      },
  
      twitter: {
        card:
          "summary_large_image",
  
        title:
          socialTitle,
  
        description,
  
        images: [
          ogImage,
        ],
      },
    };
  }