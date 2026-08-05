import CoursePageClient from "./CoursePageClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/courses";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/images/courses/course-search-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Search Study Abroad Courses and Universities";

const PAGE_DESCRIPTION =
  "Search international study abroad courses by destination, university and subject area. Compare programs, entry requirements and study options with guidance from Medcity Overseas.";

export const metadata = {
  /*
   * RootLayout adds:
   * | Medcity Overseas
   */
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_PATH,
    siteName: "Medcity Overseas",

    title:
      "Search Study Abroad Courses and Universities | Medcity Overseas",

    description:
      "Explore international courses and universities by study destination, academic subject and program preference.",

    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt:
          "Search international study abroad courses with Medcity Overseas",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Search Study Abroad Courses | Medcity Overseas",

    description:
      "Find international university courses by destination, institution and subject area.",

    images: [OG_IMAGE_PATH],
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

const pageStructuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}/#webpage`,

      url: PAGE_URL,

      name:
        "Search Study Abroad Courses and Universities",

      description: PAGE_DESCRIPTION,

      image: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
      },

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: [
        {
          "@type": "Thing",
          name:
            "International higher education courses",
        },
        {
          "@type": "Thing",
          name:
            "Study abroad programs",
        },
        {
          "@type": "Thing",
          name:
            "International universities",
        },
      ],

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}/#breadcrumb`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}/#course-search`,
      },
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}/#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Courses",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "SearchAction",
      "@id": `${PAGE_URL}/#course-search`,

      name:
        "Search international courses",

      target: {
        "@type": "EntryPoint",

        /*
         * Change these parameter names to match
         * the actual query parameters used by
         * your course search.
         */
        urlTemplate:
          `${PAGE_URL}?destination={destination}&university={university}&subject={subject}`,
      },

      "query-input": [
        "optional name=destination",
        "optional name=university",
        "optional name=subject",
      ],
    },
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              pageStructuredData
            ),
        }}
      />

      <CoursePageClient />
    </>
  );
}