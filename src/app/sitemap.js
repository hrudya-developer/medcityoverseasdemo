import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

const SITE_URL = "https://medcityoverseas.com";

/* =========================================================
   SLUG HELPERS
========================================================= */

const DESTINATION_SLUG_ALIASES = {
  "United Kingdom": "uk",
  "United States": "usa",
  "United States of America": "usa",
};

function getDestinationSlug(countryName) {
  if (!countryName) {
    return "";
  }

  return (
    DESTINATION_SLUG_ALIASES[countryName] ||
    createSlug(countryName)
  );
}

/* =========================================================
   DYNAMIC DESTINATION PAGES
========================================================= */

async function getDestinationPages() {
  try {
    const result = await postOverseasForm(
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
      Array.isArray(result?.destinations)
        ? result.destinations
        : Array.isArray(result?.data)
          ? result.data
          : [];

    return destinations
      .map((destination) => {
        const countryName =
          destination?.country ||
          destination?.name ||
          destination?.destination ||
          destination?.country_name ||
          "";

        const slug =
          getDestinationSlug(countryName);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/study-in-${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Failed to generate destination sitemap entries:",
      error
    );

    return [];
  }
}

/* =========================================================
   DYNAMIC UNIVERSITY COUNTRY PAGES
========================================================= */

async function getUniversityCountryPages() {
  try {
    const result = await postOverseasForm(
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
      Array.isArray(result?.destinations)
        ? result.destinations
        : Array.isArray(result?.data)
          ? result.data
          : [];

    return destinations
      .map((destination) => {
        const countryName =
          destination?.country ||
          destination?.name ||
          destination?.destination ||
          destination?.country_name ||
          "";

        const slug =
          createSlug(countryName);

        if (!slug) {
          return null;
        }

        return {
          url: `${SITE_URL}/universities/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Failed to generate university country sitemap entries:",
      error
    );

    return [];
  }
}

/* =========================================================
   DYNAMIC GERMAN PROGRAM PAGES
========================================================= */

async function getGermanProgramPages() {
  try {
    const result = await postOverseasForm(
      "getHomeTileDetails",
      {
        uid: 0,
        id: 6,
      },
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const programs =
      Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.programs)
          ? result.programs
          : Array.isArray(result?.mainData)
            ? result.mainData
            : [];

    return programs
      .map((program) => {
        const programName =
          program?.name ||
          program?.title ||
          program?.program_name ||
          program?.course_name ||
          "";

        const slug =
          createSlug(programName);

        if (!slug) {
          return null;
        }

        return {
          url:
            `${SITE_URL}/study-in-germany/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Failed to generate German program sitemap entries:",
      error
    );

    return [];
  }
}

/* =========================================================
   SITEMAP
========================================================= */

export default async function sitemap() {
  const [
    destinationPages,
    universityCountryPages,
    germanProgramPages,
  ] = await Promise.all([
    getDestinationPages(),
    getUniversityCountryPages(),
    getGermanProgramPages(),
  ]);

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/popular-courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/universities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/add-on-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/community-posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/branches`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [
    ...staticPages,
    ...destinationPages,
    ...universityCountryPages,
    ...germanProgramPages,
  ];
}