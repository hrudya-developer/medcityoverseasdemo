import AcademyCentersClient from "./AcademyCentersClient";
import { centers } from "./data/centersData";

/* =========================================================
   CONFIG
========================================================= */

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/branches";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/medcity-branches-kerala.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

/* =========================================================
   PAGE SEO
========================================================= */

const PAGE_TITLE =
  "Study Abroad Consultants in Kerala & Mangalore | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Find Medcity Overseas study abroad consultants across Kerala and Mangalore. Visit your nearest branch for overseas education counselling, university admissions, course selection, application support and student visa guidance.";

export const metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description:
    PAGE_DESCRIPTION,

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
    "study abroad consultants in Mangalore",
    "overseas education consultants Mangalore",
    "Medcity Overseas branches",
    "Medcity Overseas Kerala",
  ],

  alternates: {
    canonical:
      PAGE_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url:
      PAGE_URL,

    siteName:
      "Medcity Overseas",

    title:
      PAGE_TITLE,

    description:
      PAGE_DESCRIPTION,

    images: [
      {
        url:
          OG_IMAGE_URL,

        width: 1200,

        height: 630,

        alt:
          "Medcity Overseas study abroad consultants and branches across Kerala and Mangalore",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      PAGE_TITLE,

    description:
      PAGE_DESCRIPTION,

    images: [
      OG_IMAGE_URL,
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

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
};

/* =========================================================
   BASIC HELPERS
========================================================= */

function cleanText(
  value = ""
) {
  return String(
    value ?? ""
  )
    .replace(
      /<[^>]*>/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

function slugify(
  value = ""
) {
  return String(
    value ?? ""
  )
    .toLowerCase()
    .trim()
    .replace(
      /&/g,
      "and"
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

/* =========================================================
   BRANCH NAME
========================================================= */

function getBranchName(
  center,
  index
) {
  return (
    cleanText(
      center?.name
    ) ||
    cleanText(
      center?.title
    ) ||
    cleanText(
      center?.branch
    ) ||
    `Medcity Overseas Branch ${
      index + 1
    }`
  );
}

/* =========================================================
   PHYSICAL CITY
========================================================= */

function getBranchCity(
  center,
  index
) {
  return (
    cleanText(
      center?.city
    ) ||
    cleanText(
      center?.district
    ) ||
    getBranchName(
      center,
      index
    )
  );
}

/* =========================================================
   SEO LOCATION

   Example:
   city: Kozhikode
   seoLocation: Calicut

   SEO text can use "Calicut"
   while postal address remains "Kozhikode".
========================================================= */

function getSeoLocation(
  center,
  index
) {
  return (
    cleanText(
      center?.seoLocation
    ) ||
    getBranchCity(
      center,
      index
    )
  );
}

/* =========================================================
   BRANCH SLUG

   IMPORTANT:
   Use center.slug FIRST.

   Example:
   slug: "medcity-calicut"

   Result:
   /branch/medcity-calicut
========================================================= */

function getBranchSlug(
  center,
  index
) {
  const storedSlug =
    slugify(
      center?.slug
    );

  if (storedSlug) {
    return storedSlug;
  }

  const fallbackName =
    getBranchName(
      center,
      index
    );

  const fallbackCity =
    getBranchCity(
      center,
      index
    );

  return slugify(
    fallbackName ||
      `medcity-${fallbackCity}`
  );
}

/* =========================================================
   BRANCH URL
========================================================= */

function getBranchRelativeUrl(
  center,
  index
) {
  const slug =
    getBranchSlug(
      center,
      index
    );

  return `/branch/${slug}`;
}

function getBranchUrl(
  center,
  index
) {
  return `${SITE_URL}${getBranchRelativeUrl(
    center,
    index
  )}`;
}

/* =========================================================
   IMAGE
========================================================= */

function getBranchImage(
  center
) {
  if (!center?.image) {
    return undefined;
  }

  const image =
    typeof center.image ===
    "string"
      ? center.image
      : center.image?.src;

  if (!image) {
    return undefined;
  }

  if (
    image.startsWith(
      "http://"
    ) ||
    image.startsWith(
      "https://"
    )
  ) {
    return image;
  }

  const normalized =
    image.startsWith("/")
      ? image
      : `/${image}`;

  return `${SITE_URL}${normalized}`;
}

/* =========================================================
   TELEPHONE
========================================================= */

function getTelephoneNumbers(
  center
) {
  if (
    Array.isArray(
      center?.phones
    )
  ) {
    return center.phones
      .map((phone) =>
        cleanText(phone)
      )
      .filter(Boolean);
  }

  if (center?.phone) {
    const phone =
      cleanText(
        center.phone
      );

    return phone
      ? [phone]
      : [];
  }

  return [];
}

/* =========================================================
   POSTAL ADDRESS
========================================================= */

function createPostalAddress(
  center
) {
  if (!center?.address) {
    return undefined;
  }

  const address = {
    "@type":
      "PostalAddress",

    streetAddress:
      cleanText(
        center.address
      ),

    addressCountry:
      "IN",
  };

  if (center?.city) {
    address.addressLocality =
      cleanText(
        center.city
      );
  }

  if (center?.state) {
    address.addressRegion =
      cleanText(
        center.state
      );
  }

  if (
    center?.postalCode
  ) {
    address.postalCode =
      String(
        center.postalCode
      ).trim();
  }

  return address;
}

/* =========================================================
   BRANCH DESCRIPTION
========================================================= */

function getBranchDescription(
  center,
  index
) {
  const location =
    getSeoLocation(
      center,
      index
    );

  return (
    cleanText(
      center?.seoDescription
    ) ||
    `Visit Medcity Overseas ${location} for expert study abroad counselling, university admissions, course selection, overseas applications and student visa guidance.`
  );
}

/* =========================================================
   BRANCH SEO TITLE
========================================================= */

function getBranchSeoTitle(
  center,
  index
) {
  const location =
    getSeoLocation(
      center,
      index
    );

  return (
    cleanText(
      center?.seoTitle
    ) ||
    `Study Abroad Consultants in ${location}`
  );
}

/* =========================================================
   BRANCH SCHEMA ITEMS
========================================================= */

const branchItems =
  centers.map(
    (
      center,
      index
    ) => {
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

      const seoLocation =
        getSeoLocation(
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

      const image =
        getBranchImage(
          center
        );

      const description =
        getBranchDescription(
          center,
          index
        );

      const item = {
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

        description,

        parentOrganization:
          {
            "@id":
              `${SITE_URL}/#organization`,
          },

        areaServed: [
          {
            "@type":
              "City",

            name:
              seoLocation,
          },

          {
            "@type":
              "AdministrativeArea",

            name:
              cleanText(
                center?.district ||
                  city
              ),
          },
        ],

        knowsAbout: [
          "Study Abroad Counselling",
          "Overseas Education",
          "University Admissions",
          "Course Selection",
          "Student Visa Guidance",
          "International Education",
        ],
      };

      if (address) {
        item.address =
          address;
      }

      if (
        telephoneNumbers.length >
        0
      ) {
        item.telephone =
          telephoneNumbers;
      }

      if (center?.email) {
        item.email =
          cleanText(
            center.email
          );
      }

      if (
        center?.mapLink
      ) {
        item.hasMap =
          center.mapLink;
      }

      if (
        center?.latitude &&
        center?.longitude
      ) {
        item.geo = {
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
        };
      }

      if (
        Array.isArray(
          center?.openingHours
        ) &&
        center.openingHours
          .length > 0
      ) {
        item.openingHours =
          center.openingHours;
      }

      if (image) {
        item.image =
          image;
      }

      return {
        "@type":
          "ListItem",

        position:
          index + 1,

        item,
      };
    }
  );

/* =========================================================
   STRUCTURED DATA
========================================================= */

const branchesStructuredData =
  {
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
          PAGE_TITLE,

        description:
          PAGE_DESCRIPTION,

        inLanguage:
          "en-IN",

        primaryImageOfPage:
          {
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

        width:
          1200,

        height:
          630,

        caption:
          "Medcity Overseas study abroad branches across Kerala and Mangalore",
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

            position:
              1,

            name:
              "Home",

            item:
              SITE_URL,
          },

          {
            "@type":
              "ListItem",

            position:
              2,

            name:
              "Study Abroad Consultants in Kerala & Mangalore",

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
          "Medcity Overseas Study Abroad Branches",

        description:
          "Directory of Medcity Overseas study abroad counselling and overseas education branches across Kerala and Mangalore.",

        numberOfItems:
          branchItems.length,

        itemListOrder:
          "https://schema.org/ItemListOrderUnordered",

        itemListElement:
          branchItems,
      },
    ],
  };

/* =========================================================
   SAFE JSON-LD
========================================================= */

function serializeJsonLd(
  data
) {
  return JSON.stringify(
    data
  ).replace(
    /</g,
    "\\u003c"
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function BranchesPage() {
  const centersWithUrls =
    centers.map(
      (
        center,
        index
      ) => {
        const seoLocation =
          getSeoLocation(
            center,
            index
          );

        return {
          ...center,

          /*
           * Public branch URL.
           *
           * Example:
           * /branch/medcity-calicut
           */

          branchUrl:
            getBranchRelativeUrl(
              center,
              index
            ),

          /*
           * Keep seoUrl temporarily too
           * if AcademyCentersClient
           * currently reads center.seoUrl.
           *
           * Both point to the SAME URL.
           */

          seoUrl:
            getBranchRelativeUrl(
              center,
              index
            ),

          /*
           * Never overwrite an SEO
           * title already defined in
           * centersData.js.
           */

          seoTitle:
            getBranchSeoTitle(
              center,
              index
            ),

          seoDescription:
            getBranchDescription(
              center,
              index
            ),

          seoLocation,
        };
      }
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
          centersWithUrls
        }
      />
    </>
  );
}