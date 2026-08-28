import AcademyCentersClient from "./AcademyCentersClient";
import { centers } from "./data/centersData";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/branches";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/medcity-branches-kerala.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Study Abroad Consultants in Kerala | Medcity Overseas Branches";

const PAGE_DESCRIPTION =
  "Find Medcity Overseas study abroad consultants across Kerala. Visit your nearest branch for overseas education counselling, university and course selection, application support and student visa guidance.";

export const metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "study abroad consultants in Kerala",
    "study abroad consultants Kerala",
    "overseas education consultants in Kerala",
    "overseas education consultants Kerala",
    "study abroad agency Kerala",
    "overseas education agency Kerala",
    "study abroad counselling Kerala",
    "overseas education counselling Kerala",
    "study abroad branches Kerala",
    "study abroad offices Kerala",
    "study abroad consultancy Kerala",
    "university admission consultants Kerala",
    "overseas university admission Kerala",
    "student visa guidance Kerala",
    "international education consultants Kerala",
    "Medcity Overseas branches",
    "Medcity Overseas Kerala",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "Medcity Overseas",

    title:
      "Study Abroad Consultants in Kerala | Medcity Overseas Branches",

    description:
      "Find your nearest Medcity Overseas branch in Kerala for study abroad counselling, university applications, course selection and student visa guidance.",

    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt:
          "Medcity Overseas study abroad consultants and branches across Kerala",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Study Abroad Consultants in Kerala | Medcity Overseas",

    description:
      "Find Medcity Overseas branches across Kerala for overseas education counselling, university applications and study abroad guidance.",

    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBranchName(center, index) {
  return (
    center?.name ||
    center?.title ||
    center?.branch ||
    `Medcity Overseas Branch ${index + 1}`
  );
}

function getBranchCity(center, index) {
  return (
    center?.city ||
    center?.district ||
    getBranchName(center, index)
  );
}

function getBranchSlug(center, index) {
  return slugify(
    center?.city ||
      center?.district ||
      center?.slug ||
      getBranchName(center, index)
  );
}

/*
  SEO landing page format:

  /study-abroad-consultants-kannur
  /study-abroad-consultants-kozhikode
  /study-abroad-consultants-kochi
*/
function getBranchUrl(center, index) {
  const slug = getBranchSlug(
    center,
    index
  );

  return `${SITE_URL}/study-abroad-consultants-${slug}`;
}

function getBranchRelativeUrl(
  center,
  index
) {
  const slug = getBranchSlug(
    center,
    index
  );

  return `/study-abroad-consultants-${slug}`;
}

function getTelephoneNumbers(center) {
  if (Array.isArray(center?.phones)) {
    return center.phones.filter(Boolean);
  }

  if (center?.phone) {
    return [center.phone];
  }

  return [];
}

function createPostalAddress(center) {
  if (!center?.address) {
    return undefined;
  }

  return {
    "@type": "PostalAddress",

    streetAddress:
      center.address,

    ...(center?.city && {
      addressLocality:
        center.city,
    }),

    addressRegion:
      center?.state || "Kerala",

    ...(center?.postalCode && {
      postalCode:
        String(
          center.postalCode
        ),
    }),

    addressCountry: "IN",
  };
}

/* =========================================================
   BRANCH SCHEMA ITEMS
========================================================= */

const branchItems = centers.map(
  (center, index) => {
    const branchName =
      getBranchName(
        center,
        index
      );

    const city =
      getBranchCity(
        center,
        index
      );

    const branchUrl =
      getBranchUrl(
        center,
        index
      );

    const telephoneNumbers =
      getTelephoneNumbers(
        center
      );

    const address =
      createPostalAddress(
        center
      );

    return {
      "@type": "ListItem",

      position:
        index + 1,

      item: {
        "@type": [
          "EducationalOrganization",
          "LocalBusiness",
        ],

        "@id":
          `${branchUrl}#organization`,

        name:
          branchName,

        url:
          branchUrl,

        description:
          `Medcity Overseas ${city} provides study abroad counselling, overseas university application guidance, course selection support and student visa assistance.`,

        parentOrganization: {
          "@id":
            `${SITE_URL}/#organization`,
        },

        ...(address && {
          address,
        }),

        ...(telephoneNumbers.length >
          0 && {
          telephone:
            telephoneNumbers,
        }),

        ...(center?.email && {
          email:
            center.email,
        }),

        ...(center?.mapLink && {
          hasMap:
            center.mapLink,
        }),

        ...(center?.latitude &&
          center?.longitude && {
            geo: {
              "@type":
                "GeoCoordinates",

              latitude:
                Number(
                  center.latitude
                ),

              longitude:
                Number(
                  center.longitude
                ),
            },
          }),

        ...(Array.isArray(
          center?.openingHours
        ) &&
          center.openingHours
            .length > 0 && {
            openingHours:
              center.openingHours,
          }),

        ...(center?.image && {
          image:
            center.image,
        }),

        areaServed: {
          "@type": "City",
          name: city,
        },

        knowsAbout: [
          "Study Abroad Counselling",
          "Overseas Education",
          "University Admissions",
          "Course Selection",
          "Student Visa Guidance",
          "International Education",
        ],
      },
    };
  }
);

/* =========================================================
   STRUCTURED DATA
========================================================= */

const branchesStructuredData = {
  "@context":
    "https://schema.org",

  "@graph": [
    {
      "@type":
        "CollectionPage",

      "@id":
        `${PAGE_URL}#webpage`,

      url:
        PAGE_URL,

      name:
        "Study Abroad Consultants in Kerala | Medcity Overseas Branches",

      description:
        PAGE_DESCRIPTION,

      inLanguage:
        "en-IN",

      primaryImageOfPage: {
        "@id":
          `${PAGE_URL}#primaryimage`,
      },

      isPartOf: {
        "@id":
          `${SITE_URL}/#website`,
      },

      about: {
        "@id":
          `${SITE_URL}/#organization`,
      },

      publisher: {
        "@id":
          `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id":
          `${PAGE_URL}#breadcrumb`,
      },

      mainEntity: {
        "@id":
          `${PAGE_URL}#branches-list`,
      },
    },

    {
      "@type":
        "ImageObject",

      "@id":
        `${PAGE_URL}#primaryimage`,

      url:
        OG_IMAGE_URL,

      contentUrl:
        OG_IMAGE_URL,

      width: 1200,

      height: 630,

      caption:
        "Medcity Overseas study abroad branches across Kerala",
    },

    {
      "@type":
        "BreadcrumbList",

      "@id":
        `${PAGE_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type":
            "ListItem",

          position: 1,

          name: "Home",

          item:
            SITE_URL,
        },

        {
          "@type":
            "ListItem",

          position: 2,

          name:
            "Study Abroad Consultants in Kerala",

          item:
            PAGE_URL,
        },
      ],
    },

    {
      "@type":
        "ItemList",

      "@id":
        `${PAGE_URL}#branches-list`,

      name:
        "Medcity Overseas Study Abroad Branches Across Kerala",

      description:
        "Directory of Medcity Overseas study abroad counselling and overseas education branches across Kerala.",

      numberOfItems:
        branchItems.length,

      itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

      itemListElement:
        branchItems,
    },
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function BranchesPage() {
  /*
    Add SEO URLs to the data passed to the client
    without modifying centersData.js.
  */

  const centersWithSeoUrls =
    centers.map(
      (center, index) => ({
        ...center,

        seoUrl:
          getBranchRelativeUrl(
            center,
            index
          ),

        seoTitle:
          `Study Abroad Consultants in ${getBranchCity(
            center,
            index
          )}`,
      })
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              branchesStructuredData
            ),
        }}
      />

      <AcademyCentersClient
        centers={
          centersWithSeoUrls
        }
      />
    </>
  );
}