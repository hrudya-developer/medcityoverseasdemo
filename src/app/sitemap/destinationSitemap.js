import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

const SITE_URL =
  "https://medcityoverseas.com";

/* =========================================================
   COUNTRY SLUG
========================================================= */

const SLUG_ALIASES = {
  "United Kingdom": "uk",
  "United States": "usa",
  "United States of America": "usa",
};

function getCountrySlug(countryName) {
  if (!countryName) {
    return "";
  }

  return (
    SLUG_ALIASES[countryName] ||
    createSlug(countryName)
  );
}

/* =========================================================
   DYNAMIC DESTINATION SITEMAP
========================================================= */

export async function getDestinationSitemap() {
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

    return destinations
      .map((destination) => {
        const countryName =
          destination?.country ||
          destination?.name ||
          destination?.country_name ||
          destination?.destination_name ||
          "";

        if (!countryName) {
          return null;
        }

        const slug =
          getCountrySlug(
            countryName
          );

        if (!slug) {
          return null;
        }

        return {
          url:
            `${SITE_URL}/study-in-${slug}`,

          lastModified:
            new Date(),

          changeFrequency:
            "weekly",

          priority:
            0.9,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Destination sitemap error:",
      error
    );

    return [];
  }
}