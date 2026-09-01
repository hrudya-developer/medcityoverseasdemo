import {
  Suspense,
} from "react";

import SearchSection from "@/components/home/searchSection/SearchSection";

import CoursesHero from "./components/CoursesHero";

import CourseFinder from "./components/CourseFinder";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/courses";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE =
  `${SITE_URL}/images/courses/course-search-og.webp`;

const PAGE_TITLE =
  "Study Abroad Courses & Universities for Indian Students";

const PAGE_DESCRIPTION =
  "Explore study abroad courses and universities for Indian students. Search programs by destination, university and subject area, compare study options, and get expert guidance from Medcity Overseas.";

/* =========================================================
   ISR

   Good fit for a public SEO page whose surrounding content
   changes occasionally while interactive search stays client-side.
========================================================= */

export const revalidate =
  3600;

/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  title:
    PAGE_TITLE,

  description:
    PAGE_DESCRIPTION,

  alternates: {
    canonical:
      PAGE_URL,
  },

  openGraph: {
    type:
      "website",

    locale:
      "en_IN",

    url:
      PAGE_URL,

    siteName:
      "Medcity Overseas",

    title:
      `${PAGE_TITLE} | Medcity Overseas`,

    description:
      PAGE_DESCRIPTION,

    images: [
      {
        url:
          OG_IMAGE,

        width:
          1200,

        height:
          630,

        alt:
          "Explore study abroad courses and universities with Medcity Overseas",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      `${PAGE_TITLE} | Medcity Overseas`,

    description:
      PAGE_DESCRIPTION,

    images: [
      OG_IMAGE,
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

/* =========================================================
   STRUCTURED DATA
========================================================= */

const structuredData = {
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

      isPartOf: {
        "@id":
          `${SITE_URL}/#website`,
      },

      publisher: {
        "@id":
          `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id":
          `${PAGE_URL}#breadcrumb`,
      },

      about: [
        {
          "@type":
            "Thing",
          name:
            "Study abroad courses",
        },
        {
          "@type":
            "Thing",
          name:
            "International universities",
        },
        {
          "@type":
            "Thing",
          name:
            "Overseas education",
        },
      ],

      primaryImageOfPage: {
        "@type":
          "ImageObject",

        url:
          OG_IMAGE,

        width:
          1200,

        height:
          630,
      },
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
            "Courses",

          item:
            PAGE_URL,
        },
      ],
    },
  ],
};

function serializeJsonLd(
  value
) {
  return JSON.stringify(
    value
  ).replace(
    /</g,
    "\\u003c"
  );
}

/* =========================================================
   FALLBACKS
========================================================= */

function SearchSectionFallback() {
  return (
    <section
      aria-hidden="true"
      className="min-h-[180px] bg-white"
    />
  );
}

function CourseFinderFallback() {
  return (
    <section
      aria-hidden="true"
      className="mx-auto min-h-[500px] max-w-7xl px-5 py-10 lg:px-12"
    >
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded-lg bg-slate-200" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-[500px] rounded-3xl bg-slate-100" />

          <div className="space-y-5">
            <div className="h-56 rounded-3xl bg-slate-100" />

            <div className="h-56 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SEO SUPPORTING CONTENT
========================================================= */

// function CoursesSeoIntro() {
//   return (
//     <section
//       aria-labelledby="courses-intro-heading"
//       className="
//         border-y
//         border-slate-100
//         bg-slate-50/70
//         py-10
//         sm:py-12
//       "
//     >
//       <div
//         className="
//           mx-auto
//           max-w-5xl
//           px-5
//           text-center
//           lg:px-8
//         "
//       >
//         <h2
//           id="courses-intro-heading"
//           className="
//             text-2xl
//             font-black
//             text-darkPrimary
//             sm:text-3xl
//           "
//         >
//           Find the Right Study Abroad Course
//         </h2>

//         <p
//           className="
//             mx-auto
//             mt-4
//             max-w-3xl
//             text-sm
//             leading-7
//             text-slate-600
//             sm:text-base
//           "
//         >
//           Explore international study programs across leading
//           universities and destinations. Compare courses by subject
//           area, university and country, then shortlist options that
//           match your academic goals, preferred intake and study level.
//         </p>
//       </div>
//     </section>
//   );
// }

/* =========================================================
   PAGE
========================================================= */

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      <CoursesHero />

      {/* <CoursesSeoIntro /> */}

      <Suspense
        fallback={
          <SearchSectionFallback />
        }
      >
        <SearchSection />
      </Suspense>

      <Suspense
        fallback={
          <CourseFinderFallback />
        }
      >
        <CourseFinder />
      </Suspense>
    </main>
  );
}