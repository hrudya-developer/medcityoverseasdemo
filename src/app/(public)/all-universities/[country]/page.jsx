import {
  notFound,
} from "next/navigation";

import {
  createSlug,
} from "@/lib/slug";

import {
  postOverseasForm,
} from "@/lib/overseasApi";

import CountryUniversitiesHero from "./components/CountryUniversitiesHero";
import UniversitiesSection from "./components/UniversitiesSection";

const SITE_URL =
  "https://medcityoverseas.com";

export const revalidate = 3600;

/* =========================================================
 HELPERS
========================================================= */

function getDestinationName(
  destination
) {
  return (
      destination?.country ||
      destination?.name ||
      destination?.destination ||
      destination?.country_name ||
      ""
  );
}

function getDestinationId(
  destination
) {
  return String(
      destination?.d_id ||
      destination?.id ||
      destination?.destination_id ||
      ""
  );
}

function getUniversityName(
  university
) {
  return (
      university?.name ||
      university?.university ||
      university?.university_name ||
      university?.u_name ||
      "University"
  );
}

function getUniversityLocation(
  university,
  fallback = ""
) {
  return (
      university?.location ||
      university?.city ||
      university?.place ||
      university?.address ||
      fallback
  );
}

/* =========================================================
 GET DESTINATION
========================================================= */

async function getDestination(
  countrySlug
) {
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

      return (
          destinations.find(
              (destination) => {
                  const name =
                      getDestinationName(
                          destination
                      );

                  return (
                      name &&
                      createSlug(name) ===
                      countrySlug
                  );
              }
          ) || null
      );
  } catch (error) {
      console.error(
          "Destination loading error:",
          error
      );

      return null;
  }
}

/* =========================================================
 GET UNIVERSITIES
========================================================= */

async function getUniversities(
  countryId
) {
  const params =
      new URLSearchParams({
          countryId:
              String(countryId),

          uid:
              "0",

          offset:
              "0",

          keyword:
              "alluniversities",
      });

  const appUrl =
      process.env
          .NEXT_PUBLIC_SITE_URL ||
      (process.env.NODE_ENV ===
      "development"
          ? "http://localhost:3000"
          : SITE_URL);

  try {
      const response =
          await fetch(
              `${appUrl}/api/search/universities?${params.toString()}`,
              {
                  next: {
                      revalidate: 3600,
                  },
              }
          );

      if (!response.ok) {
          console.error(
              "University API status:",
              response.status
          );

          return {
              universities: [],
              universityImagePath:
                  "",
          };
      }

      const result =
          await response.json();

      /*
       * Your API returns:
       *
       * universities_image_path:
       * "https://overseas.technocitysolutions.com/public/images/university/"
       *
       * universities: [
       *   {
       *      logo: "1692439511.png"
       *   }
       * ]
       */

      const universities =
          Array.isArray(
              result?.universities
          )
              ? result.universities
              : [];

      const universityImagePath =
          result?.universities_image_path ||
          result?.university_image_path ||
          result?.universityImagePath ||
          result?.imagePath ||
          "";

      return {
          universities,
          universityImagePath,
      };
  } catch (error) {
      console.error(
          "University list loading error:",
          error
      );

      return {
          universities: [],
          universityImagePath:
              "",
      };
  }
}

/* =========================================================
 METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const {
      country: countrySlug,
  } = await params;

  const destination =
      await getDestination(
          countrySlug
      );

  if (!destination) {
      return {
          title: {
              absolute:
                  "Universities Abroad | Medcity Overseas",
          },

          robots: {
              index: false,
              follow: false,
          },
      };
  }

  const countryName =
      getDestinationName(
          destination
      );

//   const canonical =
//       `${SITE_URL}/all-universities/${countrySlug}`;

      const canonical =
    `${SITE_URL}/universities-in-${countrySlug}`;

  const title =
      `Universities in ${countryName} for Indian Students | Medcity Overseas`;

  const description =
      `Explore universities in ${countryName} for Indian students. Compare institutions, courses, admissions and international study opportunities with Medcity Overseas.`;

  return {
      title: {
          absolute: title,
      },

      description,

      alternates: {
          canonical,
      },

      openGraph: {
          type:
              "website",

          locale:
              "en_IN",

          url:
              canonical,

          siteName:
              "Medcity Overseas",

          title,

          description,

          images: [
              {
                  url:
                      `${SITE_URL}/og-images/universities.webp`,

                  width:
                      1200,

                  height:
                      630,

                  alt:
                      `Universities in ${countryName}`,
              },
          ],
      },

      twitter: {
          card:
              "summary_large_image",

          title,

          description,

          images: [
              `${SITE_URL}/og-images/universities.webp`,
          ],
      },

      robots: {
          index:
              true,

          follow:
              true,

          googleBot: {
              index:
                  true,

              follow:
                  true,

              "max-image-preview":
                  "large",

              "max-snippet":
                  -1,

              "max-video-preview":
                  -1,
          },
      },
  };
}

/* =========================================================
 PAGE
========================================================= */

export default async function UniversitiesByCountryPage({
  params,
}) {
  const {
      country: countrySlug,
  } = await params;

  const destination =
      await getDestination(
          countrySlug
      );

  if (!destination) {
      notFound();
  }

  const countryId =
      getDestinationId(
          destination
      );

  const countryName =
      getDestinationName(
          destination
      );

  if (!countryId) {
      notFound();
  }

  const {
      universities,
      universityImagePath,
  } =
      await getUniversities(
          countryId
      );

  /*
   * IMPORTANT:
   * preserve the original API object
   * using ...university.
   *
   * Otherwise fields such as:
   *
   * logo
   * image
   * d_id
   * rank
   *
   * get removed.
   */
  const universityItems =
      universities.map(
          (
              university,
              index
          ) => {
              const name =
                  getUniversityName(
                      university
                  );

              return {
                  ...university,

                  id:
                      university?.id ||
                      university?.u_id ||
                      university
                          ?.university_id ||
                      `${createSlug(
                          name
                      )}-${index}`,

                  name,

                  slug:
                      createSlug(
                          name
                      ),

                  location:
                      getUniversityLocation(
                          university,
                          countryName
                      ),
              };
          }
      );

  return (
      <main
          className="
              min-h-screen
              overflow-hidden
              bg-[#f7f9fd]
          "
      >
          <CountryUniversitiesHero
              countryName={
                  countryName
              }
              universityCount={
                  universityItems.length
              }
          />

          <UniversitiesSection
              countryName={
                  countryName
              }
              universities={
                  universityItems
              }
              universityImagePath={
                  universityImagePath
              }
          />
      </main>
  );
}