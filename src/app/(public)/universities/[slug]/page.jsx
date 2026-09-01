import { cache } from "react";

import {
  notFound,
  permanentRedirect,
} from "next/navigation";

import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

import UniversityDetailsClient from "./components/UniversityDetailsClient";

const SITE_URL =
  "https://medcityoverseas.com";

const DEFAULT_OG_IMAGE =
  `${SITE_URL}/og-images/universities.webp`;

export const revalidate = 3600;

/* =========================================================
   HELPERS
========================================================= */

function getUniversityName(university) {
  return (
    university?.name ||
    university?.university_name ||
    university?.university ||
    university?.u_name ||
    ""
  );
}

function getUniversityId(university) {
  return String(
    university?.id ||
      university?.u_id ||
      university?.university_id ||
      ""
  ).trim();
}

function getDestinationName(destination) {
  return (
    destination?.country ||
    destination?.name ||
    destination?.destination ||
    destination?.country_name ||
    ""
  );
}

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(
  value,
  maxLength = 160
) {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text
    .slice(0, maxLength - 1)
    .trim()}…`;
}

/* =========================================================
   DESTINATION RESOLVER

   Determines whether:
   /universities/usa
   /universities/germany
   etc. are country URLs.
========================================================= */

const resolveDestination =
  cache(async (slug) => {
    if (!slug) {
      return null;
    }

    try {
      const result =
        await postOverseasForm(
          "getDestinations",
          {
            uid: 0,
          },
          {
            next: {
              revalidate: 3600,
            },
          }
        );

      const destinations =
        Array.isArray(
          result?.destinations
        )
          ? result.destinations
          : Array.isArray(
                result?.data
              )
            ? result.data
            : [];

      const destination =
        destinations.find(
          (item) => {
            const name =
              getDestinationName(
                item
              );

            if (!name) {
              return false;
            }

            return (
              createSlug(name) ===
              slug
            );
          }
        );

      if (!destination) {
        return null;
      }

      return {
        id: String(
          destination?.d_id ||
            destination?.id ||
            destination
              ?.destination_id ||
            ""
        ),

        name:
          getDestinationName(
            destination
          ),

        slug,
      };
    } catch (error) {
      console.error(
        "Destination resolver error:",
        error
      );

      return null;
    }
  });

/* =========================================================
   UNIVERSITY RESOLVER
========================================================= */

const resolveUniversity =
  cache(async (slug) => {
    if (!slug) {
      return null;
    }

    if (/^\d+$/.test(slug)) {
      return {
        id: slug,
        slug,
      };
    }

    try {
      const result =
        await postOverseasForm(
          "searchResults",
          {
            keytype:
              "university",

            keyword:
              slug.replace(
                /-/g,
                " "
              ),

            uid: 0,
          },
          {
            cache: "no-store",
          }
        );

      const universities =
        Array.isArray(
          result?.university
        )
          ? result.university
          : Array.isArray(
                result?.universities
              )
            ? result.universities
            : Array.isArray(
                  result?.suggestion
                )
              ? result.suggestion
              : [];

      const university =
        universities.find(
          (item) => {
            const name =
              getUniversityName(
                item
              );

            return (
              name &&
              createSlug(name) ===
                slug
            );
          }
        );

      if (!university) {
        return null;
      }

      const id =
        getUniversityId(
          university
        );

      if (!id) {
        return null;
      }

      return {
        id,
        university,
        slug,
      };
    } catch (error) {
      console.error(
        "University resolver error:",
        error
      );

      return null;
    }
  });

/* =========================================================
   UNIVERSITY DETAILS
========================================================= */

const getUniversityDetails =
  cache(
    async (universityId) => {
      if (!universityId) {
        return null;
      }

      try {
        return await postOverseasForm(
          "getUniversityDetails",
          {
            uid: 0,
            id: String(
              universityId
            ),
          },
          {
            next: {
              revalidate: 3600,
            },
          }
        );
      } catch (error) {
        console.error(
          "University details error:",
          error
        );

        return null;
      }
    }
  );

/* =========================================================
   UNIVERSITY FROM RESPONSE
========================================================= */

function getUniversityFromResponse(
  result
) {
  /*
   * Your getUniversityDetails response
   * currently uses response.data[]
   */
  if (
    Array.isArray(
      result?.data
    )
  ) {
    return (
      result.data[0] ||
      null
    );
  }

  return (
    result?.data?.university ||
    result?.data
      ?.selectedUniversity ||
    result?.university ||
    result?.selectedUniversity ||
    null
  );
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const { slug } =
    await params;

  /*
   * Country URLs should never be
   * indexed here because their
   * canonical page is:
   *
   * /all-universities/:country
   */
  const destination =
    await resolveDestination(
      slug
    );

  if (destination) {
    return {
      title: {
        absolute:
          `Universities in ${destination.name} | Medcity Overseas`,
      },

      alternates: {
        canonical:
          `${SITE_URL}/all-universities/${destination.slug}`,
      },

      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const resolvedUniversity =
    await resolveUniversity(
      slug
    );

  if (
    !resolvedUniversity?.id
  ) {
    return {
      title: {
        absolute:
          "University Not Found | Medcity Overseas",
      },

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const result =
    await getUniversityDetails(
      resolvedUniversity.id
    );

  const university =
    getUniversityFromResponse(
      result
    );

  if (!university) {
    return {
      title: {
        absolute:
          "University Details | Medcity Overseas",
      },

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const universityName =
    getUniversityName(
      university
    );

  const canonicalSlug =
    createSlug(
      universityName
    );

  const canonicalUrl =
    `${SITE_URL}/universities/${canonicalSlug}`;

  const description =
    truncateText(
      university?.about ||
        university?.description ||
        `Explore ${universityName} courses, admissions, scholarships, rankings and study opportunities for international students.`
    );

  const title =
    `${universityName} Courses, Admissions & Ranking | Medcity Overseas`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical:
        canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_IN",

      url:
        canonicalUrl,

      siteName:
        "Medcity Overseas",

      title,

      description,

      images: [
        {
          url:
            DEFAULT_OG_IMAGE,

          width: 1200,
          height: 630,

          alt:
            `${universityName} courses and admissions`,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: [
        DEFAULT_OG_IMAGE,
      ],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet": -1,

        "max-video-preview":
          -1,
      },
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function UniversityDetailsPage({
  params,
}) {
  const { slug } =
    await params;

  if (!slug) {
    notFound();
  }

  /*
   * FIRST check whether slug
   * represents a destination.
   *
   * Example:
   * /universities/usa
   *
   * becomes:
   * /all-universities/usa
   */
  const destination =
    await resolveDestination(
      slug
    );

  if (destination) {
    permanentRedirect(
      `/all-universities/${destination.slug}`
    );
  }

  /*
   * Otherwise treat it as
   * university slug.
   */
  const resolvedUniversity =
    await resolveUniversity(
      slug
    );

  if (
    !resolvedUniversity?.id
  ) {
    notFound();
  }

  const initialData =
    await getUniversityDetails(
      resolvedUniversity.id
    );

  if (!initialData) {
    notFound();
  }

  const university =
    getUniversityFromResponse(
      initialData
    );

  if (!university) {
    notFound();
  }

  /*
   * Enforce canonical university
   * slug.
   *
   * Example:
   *
   * /universities/123
   *
   * becomes
   *
   * /universities/modul-university
   */
  const universityName =
    getUniversityName(
      university
    );

  const canonicalSlug =
    createSlug(
      universityName
    );

  if (
    canonicalSlug &&
    canonicalSlug !== slug
  ) {
    permanentRedirect(
      `/universities/${canonicalSlug}`
    );
  }

  return (
    <UniversityDetailsClient
      id={
        resolvedUniversity.id
      }
      initialData={
        initialData
      }
    />
  );
}