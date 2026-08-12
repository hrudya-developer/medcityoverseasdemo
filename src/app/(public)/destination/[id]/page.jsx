import { notFound } from "next/navigation";

import DestinationDetailsClient from "./DestinationDetailsClient";

const SITE_URL = "https://medcityoverseas.com";

const LOCAL_SITE_URL =
  "http://localhost:3000";

const FALLBACK_IMAGE =
  "/images/destination-fallback.webp";

const DEFAULT_DESTINATION_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/destinations";

const DEFAULT_UNIVERSITY_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/university";

async function getDestinationDetails(id) {
  const siteUrl =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    LOCAL_SITE_URL;

  const response = await fetch(
    `${siteUrl}/api/destination-details`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: String(id),
        uid: 0,
      }),
      next: {
        revalidate: 3600,
        tags: [`destination-${id}`],
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Destination request failed with status ${response.status}`
    );
  }

  const contentType =
    response.headers.get("content-type") || "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    throw new Error(
      "Destination API did not return JSON."
    );
  }

  return response.json();
}

function toSafeText(
  value,
  fallback = "",
  visited = new WeakSet()
) {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return (
      String(value).trim() ||
      fallback
    );
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item) =>
        toSafeText(
          item,
          "",
          visited
        )
      )
      .filter(Boolean)
      .join(", ");

    return text || fallback;
  }

  if (typeof value === "object") {
    if (visited.has(value)) {
      return fallback;
    }

    visited.add(value);

    const nestedValue =
      value?.name ??
      value?.country ??
      value?.country_name ??
      value?.destination_name ??
      value?.title ??
      value?.label ??
      value?.text ??
      value?.value ??
      value?.description ??
      value?.content ??
      "";

    return toSafeText(
      nestedValue,
      fallback,
      visited
    );
  }

  return fallback;
}

function cleanBasePath(
  value,
  fallback = ""
) {
  return String(
    value || fallback
  )
    .trim()
    .replace(/\/+$/, "");
}

function buildImageUrl({
  basePath,
  fileName,
  fallback = null,
}) {
  const cleanFileName =
    toSafeText(fileName, "");

  if (!cleanFileName) {
    return fallback;
  }

  if (
    cleanFileName.startsWith(
      "http://"
    ) ||
    cleanFileName.startsWith(
      "https://"
    ) ||
    cleanFileName.startsWith("/")
  ) {
    return cleanFileName;
  }

  const cleanPath =
    cleanBasePath(basePath);

  if (!cleanPath) {
    return fallback;
  }

  return `${cleanPath}/${cleanFileName.replace(
    /^\/+/,
    ""
  )}`;
}

function normalizeAttractions(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set();

  return value
    .map((item, index) => {
      const text = toSafeText(
        item?.text ??
          item?.name ??
          item?.title ??
          item?.label ??
          item?.attraction_name ??
          item?.description ??
          item?.details ??
          item,
        ""
      );

      if (!text) {
        return null;
      }

      const normalizedText =
        text.toLowerCase();

      if (seen.has(normalizedText)) {
        return null;
      }

      seen.add(normalizedText);

      return {
        id: String(
          item?.id ??
            item?.attraction_id ??
            `attraction-${index}`
        ),
        text,
      };
    })
    .filter(Boolean);
}

function normalizeUniversities(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      if (
        !item ||
        typeof item !== "object"
      ) {
        return null;
      }

      const id = toSafeText(
        item?.id ??
          item?.university_id ??
          item?.u_id,
        ""
      );

      const name = toSafeText(
        item?.name ??
          item?.university_name ??
          item?.title,
        "University"
      );

      const location = toSafeText(
        item?.location ??
          item?.city ??
          item?.address,
        ""
      );

      const logo = toSafeText(
        item?.logo ??
          item?.image ??
          item?.university_logo,
        ""
      );

      return {
        ...item,
        id:
          id ||
          `university-${index}`,
        name,
        location,
        logo,
      };
    })
    .filter(Boolean);
}

function normalizeCountry(country) {
  if (
    !country ||
    typeof country !== "object"
  ) {
    return null;
  }

  const countryName = toSafeText(
    country?.country ??
      country?.country_name ??
      country?.destination_name ??
      country?.name ??
      country?.title,
    "Study Destination"
  );

  return {
    ...country,

    id: toSafeText(
      country?.id ??
        country?.d_id ??
        country?.destination_id,
      ""
    ),

    country: countryName,
    country_name: countryName,
    destination_name: countryName,
    name: countryName,
    title: countryName,

    capital: toSafeText(
      country?.capital,
      "N/A"
    ),

    language: toSafeText(
      country?.language ??
        country?.official_language ??
        country?.primary_language,
      "N/A"
    ),

    official_language: toSafeText(
      country?.official_language ??
        country?.language,
      "N/A"
    ),

    currency: toSafeText(
      country?.currency,
      "N/A"
    ),

    currency_symbol: toSafeText(
      country?.currency_symbol ??
        country?.currencySymbol,
      ""
    ),

    diallingcode: toSafeText(
      country?.diallingcode ??
        country?.dialling_code ??
        country?.phone_code,
      "N/A"
    ),

    temperature: toSafeText(
      country?.temperature ??
        country?.climate,
      "N/A"
    ),

    continent: toSafeText(
      country?.continent,
      "N/A"
    ),

    description: toSafeText(
      country?.description ??
        country?.short_description ??
        country?.details ??
        country?.content,
      ""
    ),

    short_description: toSafeText(
      country?.short_description ??
        country?.description ??
        country?.details ??
        country?.content,
      ""
    ),

    university_count: toSafeText(
      country?.university_count ??
        country?.universities_count ??
        country?.total_universities,
      ""
    ),

    course_count: toSafeText(
      country?.course_count ??
        country?.courses_count ??
        country?.total_courses,
      ""
    ),

    international_students:
      toSafeText(
        country?.international_students ??
          country?.student_count,
        ""
      ),
  };
}

function extractDestinationData(
  response,
  destinationId
) {
  const destinations =
    Array.isArray(response?.data)
      ? response.data
      : Array.isArray(
          response?.destinations
        )
        ? response.destinations
        : response?.data &&
            typeof response.data ===
              "object"
          ? [response.data]
          : [];

  const rawCountry =
    destinations.find((item) => {
      const itemId =
        item?.id ??
        item?.d_id ??
        item?.destination_id;

      return (
        String(itemId) ===
        destinationId
      );
    }) ??
    destinations[0] ??
    null;

  if (!rawCountry) {
    return null;
  }

  const country =
    normalizeCountry(rawCountry);

  if (!country) {
    return null;
  }

  const destinationImagePath =
    cleanBasePath(
      response
        ?.destinations_image_path ??
        response
          ?.destination_image_path ??
        response?.imagePath ??
        response?.image_path,
      DEFAULT_DESTINATION_IMAGE_PATH
    );

  const universityImagePath =
    cleanBasePath(
      response
        ?.universities_image_path ??
        response
          ?.university_image_path ??
        response
          ?.universitiesImagePath,
      DEFAULT_UNIVERSITY_IMAGE_PATH
    );

  const image = buildImageUrl({
    basePath:
      destinationImagePath,

    fileName:
      rawCountry?.image ??
      rawCountry
        ?.destination_image ??
      rawCountry?.banner ??
      rawCountry?.banner_image,

    fallback: FALLBACK_IMAGE,
  });

  const flag = buildImageUrl({
    basePath:
      destinationImagePath,

    fileName:
      rawCountry?.flag ??
      rawCountry?.flag_image,

    fallback: null,
  });

  const attractions =
    normalizeAttractions(
      response?.attractions ??
        rawCountry?.attractions
    );

  const rawUniversities =
    Array.isArray(
      response?.universities
    )
      ? response.universities
      : Array.isArray(
          response?.data
            ?.universities
        )
        ? response.data
            .universities
        : Array.isArray(
            rawCountry
              ?.universities
          )
          ? rawCountry
              .universities
          : [];

  const universities =
    normalizeUniversities(
      rawUniversities
    )
      .filter((university) => {
        const universityCountryId =
          university?.d_id ??
          university?.country_id ??
          university
            ?.destination_id;

        if (
          universityCountryId ===
            null ||
          universityCountryId ===
            undefined ||
          String(
            universityCountryId
          ).trim() === ""
        ) {
          return true;
        }

        return (
          String(
            universityCountryId
          ) === destinationId
        );
      })
      .slice(0, 10);

  return {
    country,
    rawCountry,
    attractions,
    universities,
    universityImagePath,
    image,
    flag,
  };
}

function getDescription(country) {
  const suppliedDescription =
    toSafeText(
      country?.description ??
        country?.short_description,
      ""
    );

  if (suppliedDescription) {
    return suppliedDescription
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
  }

  return `Explore universities, courses, admission requirements, scholarships, student visas and study opportunities in ${country.country} with guidance from Medcity Overseas.`;
}

function toAbsoluteImage(image) {
  if (!image) {
    return `${SITE_URL}${FALLBACK_IMAGE}`;
  }

  if (
    image.startsWith(
      "https://"
    ) ||
    image.startsWith(
      "http://"
    )
  ) {
    return image;
  }

  return `${SITE_URL}${
    image.startsWith("/")
      ? image
      : `/${image}`
  }`;
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export async function generateMetadata({
  params,
}) {
  const resolvedParams =
    await params;

  const destinationId = String(
    resolvedParams?.id ?? ""
  ).trim();

  if (
    !destinationId ||
    Number.isNaN(
      Number(destinationId)
    )
  ) {
    return {
      title:
        "Destination Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  try {
    const response =
      await getDestinationDetails(
        destinationId
      );

    const destination =
      extractDestinationData(
        response,
        destinationId
      );

    if (!destination) {
      return {
        title:
          "Destination Not Found",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const countryName =
      destination.country.country;

    const description =
      getDescription(
        destination.country
      );

    const pagePath =
      `/destination-details/${destinationId}`;

    const image =
      toAbsoluteImage(
        destination.image
      );

    return {
      title:
        `Study in ${countryName}`,

      description,

      alternates: {
        canonical: pagePath,
      },

      openGraph: {
        type: "website",
        locale: "en_IN",
        url: pagePath,
        siteName:
          "Medcity Overseas",
        title:
          `Study in ${countryName} | Medcity Overseas`,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt:
              `Study in ${countryName}`,
          },
        ],
      },

      twitter: {
        card:
          "summary_large_image",
        title:
          `Study in ${countryName} | Medcity Overseas`,
        description,
        images: [image],
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
  } catch {
    return {
      title:
        "Destination Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function DestinationDetailsPage({
  params,
}) {
  const resolvedParams =
    await params;

  const destinationId = String(
    resolvedParams?.id ?? ""
  ).trim();

  if (
    !destinationId ||
    Number.isNaN(
      Number(destinationId)
    )
  ) {
    notFound();
  }

  let response;

  try {
    response =
      await getDestinationDetails(
        destinationId
      );
  } catch (error) {
    console.error(
      "Destination details error:",
      error
    );

    notFound();
  }

  const destination =
    extractDestinationData(
      response,
      destinationId
    );

  if (!destination) {
    notFound();
  }

  const {
    country,
    attractions,
    universities,
    universityImagePath,
    image,
    flag,
  } = destination;

  const countryName =
    country.country;

  const description =
    getDescription(country);

  const pagePath =
    `/destination-details/${destinationId}`;

  const pageUrl =
    `${SITE_URL}${pagePath}`;

  const absoluteImage =
    toAbsoluteImage(image);

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",
        "@id":
          `${pageUrl}/#webpage`,
        url: pageUrl,
        name:
          `Study in ${countryName}`,
        description,
        image: {
          "@type":
            "ImageObject",
          url: absoluteImage,
        },
        inLanguage: "en-IN",

        isPartOf: {
          "@id":
            `${SITE_URL}/#website`,
        },

        about: {
          "@type": "Country",
          name: countryName,
        },

        publisher: {
          "@id":
            `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id":
            `${pageUrl}/#breadcrumb`,
        },

        mainEntity: {
          "@id":
            `${pageUrl}/#destination`,
        },
      },

      {
        "@type": "Country",
        "@id":
          `${pageUrl}/#destination`,
        name: countryName,

        ...(country?.capital &&
          country.capital !==
            "N/A" && {
            capital:
              country.capital,
          }),

        ...(country?.continent &&
          country.continent !==
            "N/A" && {
            containedInPlace: {
              "@type":
                "Continent",
              name:
                country.continent,
            },
          }),

        description,
        image: absoluteImage,
      },

      {
        "@type":
          "BreadcrumbList",
        "@id":
          `${pageUrl}/#breadcrumb`,

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
            name:
              "Destinations",
            item:
              `${SITE_URL}/destinations`,
          },
          {
            "@type":
              "ListItem",
            position: 3,
            name:
              `Study in ${countryName}`,
            item: pageUrl,
          },
        ],
      },

      ...(universities.length > 0
        ? [
            {
              "@type":
                "ItemList",
              "@id":
                `${pageUrl}/#universities`,
              name:
                `Universities in ${countryName}`,
              numberOfItems:
                universities.length,
              itemListElement:
                universities.map(
                  (
                    university,
                    index
                  ) => ({
                    "@type":
                      "ListItem",
                    position:
                      index + 1,
                    item: {
                      "@type":
                        "CollegeOrUniversity",
                      name:
                        university.name,

                      ...(university
                        .location && {
                        address: {
                          "@type":
                            "PostalAddress",
                          addressLocality:
                            university
                              .location,
                          addressCountry:
                            countryName,
                        },
                      }),
                    },
                  })
                ),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      <DestinationDetailsClient
        countryId={destinationId}
        country={country}
        attractions={attractions}
        universities={universities}
        universityImagePath={
          universityImagePath
        }
        image={image}
        flag={flag}
      />
    </>
  );
}