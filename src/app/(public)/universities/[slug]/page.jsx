import {
    notFound,
    permanentRedirect,
  } from "next/navigation";
  
  import {
    createUniversityPublicSlug,
  } from "@/lib/universitySlug";
  
  import UniversityDetailsClient from "./components/UniversityDetailsClient";
  
  import {
    cleanId,
    cleanText,
    extractCourses,
    getUniversityCountryId,
    getUniversityName,
    normalizeSlug,
  } from "./lib/universityHelpers";
  
  import {
    getUniversityMainCourses,
  } from "./lib/universityApi";
  
  import {
    resolveUniversity,
  } from "./lib/universityResolver";
  
  import {
    resolveDestination,
  } from "./lib/universitySlugContext";
  
  import {
    buildUniversityMetadata,
  } from "./lib/universityMetadata";
  
  /* =========================================================
     CONFIG
  ========================================================= */
  
  const SITE_URL = "https://medcityoverseas.com";
  
  export const revalidate = 3600;
  
  /* =========================================================
     METADATA
  ========================================================= */
  
  export async function generateMetadata(props) {
    return buildUniversityMetadata(props);
  }
  
  /* =========================================================
     HELPERS
  ========================================================= */
  
  function getCourseName(course) {
    return cleanText(
      course?.course_name ||
        course?.course ||
        course?.name ||
        course?.title ||
        course?.main_course ||
        ""
    );
  }
  
  function getUniversityDescription(
    university,
    detailsResult
  ) {
    const rawDescription =
      university?.description ||
      university?.about ||
      university?.overview ||
      university?.university_description ||
      detailsResult?.description ||
      detailsResult?.about ||
      detailsResult?.overview ||
      detailsResult?.info?.description ||
      detailsResult?.info?.about ||
      "";
  
    return cleanText(rawDescription);
  }
  
  function getUniversityWebsite(
    university,
    detailsResult
  ) {
    return cleanText(
      university?.website ||
        university?.website_url ||
        university?.url ||
        detailsResult?.website ||
        detailsResult?.info?.website ||
        ""
    );
  }
  
  function getUniversityLogo(
    university,
    detailsResult
  ) {
    return cleanText(
      university?.logo ||
        university?.university_logo ||
        university?.image ||
        detailsResult?.logo ||
        detailsResult?.university_logo ||
        detailsResult?.info?.logo ||
        ""
    );
  }
  
  function makeAbsoluteUrl(value) {
    const cleanValue = cleanText(value);
  
    if (!cleanValue) {
      return "";
    }
  
    if (
      cleanValue.startsWith("http://") ||
      cleanValue.startsWith("https://")
    ) {
      return cleanValue;
    }
  
    if (cleanValue.startsWith("/")) {
      return `${SITE_URL}${cleanValue}`;
    }
  
    return "";
  }
  
  /**
   * Prevent a value such as </script> in API content
   * from terminating the JSON-LD script tag.
   */
  function stringifyJsonLd(data) {
    return JSON.stringify(data).replace(
      /</g,
      "\\u003c"
    );
  }
  
  function JsonLd({ data }) {
    if (!data) {
      return null;
    }
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(data),
        }}
      />
    );
  }
  
  /* =========================================================
     PAGE
  ========================================================= */
  
  export default async function UniversityDetailsPage({
    params,
    searchParams,
  }) {
    const { slug: rawSlug } = await params;
  
    const slug = normalizeSlug(rawSlug);
  
    if (!slug) {
      notFound();
    }
  
    /* =======================================================
       RESOLVE UNIVERSITY
    ======================================================= */
  
    const resolved =
      await resolveUniversity(slug);
  
    /*
     * A country/destination slug accidentally entered
     * under /universities should resolve to its correct
     * destination university listing page.
     */
    if (!resolved) {
      const destination =
        await resolveDestination(slug);
  
      if (destination) {
        permanentRedirect(
          `/universities-in-${destination.slug}`
        );
      }
  
      notFound();
    }
  
    if (
      !resolved?.id ||
      !resolved?.details ||
      !resolved?.university
    ) {
      notFound();
    }
  
    /* =======================================================
       UNIVERSITY DATA
    ======================================================= */
  
    const universityId = cleanId(
      resolved.id
    );
  
    const university =
      resolved.university;
  
    const detailsResult =
      resolved.details;
  
    const universityName =
      cleanText(
        getUniversityName(university)
      );
  
    if (!universityName) {
      notFound();
    }
  
    const resolvedCountryName =
      cleanText(
        resolved.countryName ??
          university?.country ??
          university?.country_name ??
          resolved.courses?.[0]
            ?.country ??
          ""
      );
  
    /* =======================================================
       CANONICAL SLUG
    ======================================================= */
  
    const canonicalSlug =
      createUniversityPublicSlug(
        {
          ...university,
  
          name: universityName,
  
          country:
            resolvedCountryName,
        },
        resolvedCountryName
      );
  
    if (!canonicalSlug) {
      notFound();
    }
  
    /*
     * Force every university to have only ONE indexable URL.
     *
     * Example:
     *
     * /universities/modul-university-austria
     *
     * instead of allowing multiple slug versions.
     */
    if (canonicalSlug !== slug) {
      permanentRedirect(
        `/universities/${canonicalSlug}`
      );
    }
  
    const canonicalUrl =
      `${SITE_URL}/universities/${canonicalSlug}`;
  
    /* =======================================================
       COURSES
    ======================================================= */
  
    const detailsCourses =
      extractCourses(detailsResult);
  
    const initialCourseCategoryId =
      cleanId(
        detailsCourses?.[0]?.c_id
      );
  
    const mainCourses =
      await getUniversityMainCourses(
        universityId
      );
  
    /* =======================================================
       CLIENT DATA
    ======================================================= */
  
    const initialData = {
      ...detailsResult,
  
      course: detailsCourses,
  
      courses: detailsCourses,
  
      mainCourses,
  
      initialCourseCategoryId,
    };
  
    /* =======================================================
       INITIAL TAB
    ======================================================= */
  
    const resolvedSearchParams =
      await searchParams;
  
    const initialTab =
      resolvedSearchParams?.tab ===
      "courses"
        ? "courses"
        : "about";
  
    /* =======================================================
       SEO DATA
    ======================================================= */
  
    const universityDescription =
      getUniversityDescription(
        university,
        detailsResult
      );
  
    const universityWebsite =
      getUniversityWebsite(
        university,
        detailsResult
      );
  
    const universityLogo =
      makeAbsoluteUrl(
        getUniversityLogo(
          university,
          detailsResult
        )
      );
  
    /* =======================================================
       BREADCRUMB SCHEMA
    ======================================================= */
  
    const breadcrumbJsonLd = {
      "@context":
        "https://schema.org",
  
      "@type":
        "BreadcrumbList",
  
      itemListElement: [
        {
          "@type":
            "ListItem",
  
          position: 1,
  
          name: "Home",
  
          item: SITE_URL,
        },
        {
          "@type":
            "ListItem",
  
          position: 2,
  
          name: "Universities",
  
          item:
            `${SITE_URL}/universities`,
        },
        ...(resolvedCountryName
          ? [
              {
                "@type":
                  "ListItem",
  
                position: 3,
  
                name:
                  `Universities in ${resolvedCountryName}`,
  
                item:
                  `${SITE_URL}/universities-in-${normalizeSlug(
                    resolvedCountryName
                  )}`,
              },
            ]
          : []),
        {
          "@type":
            "ListItem",
  
          position:
            resolvedCountryName
              ? 4
              : 3,
  
          name:
            universityName,
  
          item:
            canonicalUrl,
        },
      ],
    };
  
    /* =======================================================
       UNIVERSITY SCHEMA
    ======================================================= */
  
    const universityJsonLd = {
      "@context":
        "https://schema.org",
  
      "@type":
        "CollegeOrUniversity",
  
      "@id":
        `${canonicalUrl}#university`,
  
      name:
        universityName,
  
      url:
        canonicalUrl,
  
      ...(universityDescription && {
        description:
          universityDescription,
      }),
  
      ...(universityLogo && {
        logo:
          universityLogo,
  
        image:
          universityLogo,
      }),
  
      ...(resolvedCountryName && {
        address: {
          "@type":
            "PostalAddress",
  
          addressCountry:
            resolvedCountryName,
        },
      }),
  
      ...(universityWebsite && {
        sameAs: [
          universityWebsite,
        ],
      }),
    };
  
    /* =======================================================
       WEB PAGE SCHEMA
    ======================================================= */
  
    const webPageJsonLd = {
      "@context":
        "https://schema.org",
  
      "@type":
        "WebPage",
  
      "@id":
        `${canonicalUrl}#webpage`,
  
      url:
        canonicalUrl,
  
      name:
        resolvedCountryName
          ? `${universityName} - Courses, Admissions & Study in ${resolvedCountryName}`
          : `${universityName} - Courses & Admissions`,
  
      description:
        universityDescription ||
        (
          resolvedCountryName
            ? `Explore ${universityName} in ${resolvedCountryName}. Find courses, admission information and study abroad guidance for international students with Medcity Overseas.`
            : `Explore ${universityName}, available courses, admission information and study abroad guidance with Medcity Overseas.`
        ),
  
      isPartOf: {
        "@id":
          `${SITE_URL}/#website`,
      },
  
      about: {
        "@id":
          `${canonicalUrl}#university`,
      },
  
      breadcrumb: {
        "@id":
          `${canonicalUrl}#breadcrumb`,
      },
  
      inLanguage:
        "en-IN",
    };
  
    /*
     * Add @id to breadcrumb separately so WebPage
     * can reference it.
     */
    breadcrumbJsonLd["@id"] =
      `${canonicalUrl}#breadcrumb`;
  
    /* =======================================================
       COURSE ITEM LIST SCHEMA
    ======================================================= */
  
    const validSchemaCourses =
      detailsCourses
        .map((course) => ({
          name:
            getCourseName(course),
        }))
        .filter(
          (course) => course.name
        )
        .slice(0, 50);
  
    const coursesJsonLd =
      validSchemaCourses.length > 0
        ? {
            "@context":
              "https://schema.org",
  
            "@type":
              "ItemList",
  
            "@id":
              `${canonicalUrl}#courses`,
  
            name:
              `Courses at ${universityName}`,
  
            numberOfItems:
              validSchemaCourses.length,
  
            itemListElement:
              validSchemaCourses.map(
                (
                  course,
                  index
                ) => ({
                  "@type":
                    "ListItem",
  
                  position:
                    index + 1,
  
                  item: {
                    "@type":
                      "Course",
  
                    name:
                      course.name,
  
                    provider: {
                      "@type":
                        "CollegeOrUniversity",
  
                      "@id":
                        `${canonicalUrl}#university`,
  
                      name:
                        universityName,
                    },
                  },
                })
              ),
          }
        : null;
  
    /* =======================================================
       DEVELOPMENT DEBUG
    ======================================================= */
  
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "UNIVERSITY PAGE DATA",
        {
          universityId,
  
          universityName,
  
          countryId:
            getUniversityCountryId(
              university
            ),
  
          country:
            resolvedCountryName,
  
          canonicalSlug,
  
          canonicalUrl,
  
          detailsCourses:
            detailsCourses.length,
  
          initialCourseCategoryId,
  
          mainCourses:
            mainCourses.length,
  
          firstCourse:
            detailsCourses[0] ??
            null,
        }
      );
    }
  
    /* =======================================================
       RENDER
    ======================================================= */
  
    return (
      <>
        {/* SEO STRUCTURED DATA */}
  
        <JsonLd
          data={
            breadcrumbJsonLd
          }
        />
  
        <JsonLd
          data={
            universityJsonLd
          }
        />
  
        <JsonLd
          data={
            webPageJsonLd
          }
        />
  
        <JsonLd
          data={
            coursesJsonLd
          }
        />
  
        {/* PAGE UI */}
  
        <UniversityDetailsClient
          id={universityId}
          initialData={
            initialData
          }
          initialTab={
            initialTab
          }
        />
      </>
    );
  }