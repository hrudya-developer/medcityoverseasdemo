import {
  Suspense,
} from "react";

import SearchSection from "@/components/home/searchSection/SearchSection";

import CoursesHero from "./components/CoursesHero";

import CourseFinder from "./components/CourseFinder";
import LatestCoursesTable from "./components/LatestCoursesTable";
import { coursesFaqs } from "./coursesFaqData";
import Link from "next/link";
import CourseAreasTable from "@/components/seo/CourseAreasTable";
import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { getLatestCourses } from "@/lib/courseListing";
import { getDestinationSummaries } from "@/lib/destinationSummary";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides } from "@/lib/pageSeo";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/courses";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE =
  `${SITE_URL}/images/courses/course-search-og.webp`;

const PAGE_TITLE =
  "Study Abroad Courses for Indian Students | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Search study abroad courses for Indian students by country, university, level and intake, compare durations and entry details, and get free counselling.";

// Update when this page's text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

/* =========================================================
   ISR

   Good fit for a public SEO page whose surrounding content
   changes occasionally while interactive search stays client-side.
========================================================= */

// Read straight from the database on each request (same server, a few
// milliseconds). Prerendering at build time cannot reach the database on
// Hostinger's build machines and would publish an empty page.
export const dynamic = "force-dynamic";

/* =========================================================
   METADATA
========================================================= */

const pageMetadata = {
  title: {
    absolute:
      PAGE_TITLE,
  },

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
      PAGE_TITLE,

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
      PAGE_TITLE,

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

export default async function CoursesPage() {
  const [{ total }, destinations] = await Promise.all([
    getLatestCourses(24),
    getDestinationSummaries(),
  ]);
  const countries = destinations.filter((row) => row.courses > 0).length;

  return (
    <div className="min-h-screen bg-white">
      <PageSchema
        path={PAGE_PATH}
        type="CollectionPage"
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        dateModified={TEMPLATE_UPDATED}
        image={OG_IMAGE}
        about={[
          { "@type": "Thing", name: "Study abroad courses" },
          { "@type": "Thing", name: "International universities" },
        ]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Courses", path: PAGE_PATH },
        ]}
      />

      <CoursesHero />

      <QuickAnswer updated={TEMPLATE_UPDATED} className="pt-4 sm:pt-6">
        {total > 0
          ? `Search ${total.toLocaleString("en-IN")} study abroad courses listed on Medcity Overseas${
              countries > 0 ? ` in ${countries} ${countries === 1 ? "country" : "countries"}` : ""
            }, by country, university, course, intake and study level. Open a course for its duration, intakes, fees and entry requirements where recorded, then book free counselling to shortlist and apply.`
          : "Search study abroad courses for Indian students by country, university, course, intake and study level, then book free counselling with Medcity Overseas to shortlist and apply."}
      </QuickAnswer>

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

      <LatestCoursesTable className="pb-14" />

      <QuestionAnswer
        className="pb-14"
        eyebrow="Choosing a course"
        question="How do you choose the right study abroad course?"
        answer="Start from what you studied and the career you want, then compare courses on the same points: what they teach, how long they take, the intakes, entry requirements, English test scores, tuition fees and living costs. Shortlist a few that fit your marks and budget, and confirm every detail on the university's website."
        points={[
          { title: "Study level", text: "undergraduate, postgraduate, masters, PhD, diploma or certificate." },
          { title: "Duration and intakes", text: "how long the course runs and when it starts." },
          { title: "Entry requirements", text: "academic marks and English test scores." },
          { title: "Costs", text: "tuition fees and living costs in that city." },
        ]}
      />

      <CourseAreasTable className="pb-14" />

      <FaqList
        className="pb-14"
        path={PAGE_PATH}
        faqs={coursesFaqs}
        title="Study abroad course questions"
      />

      <OfficialSources
        className="pb-14"
        links={STUDY_ABROAD_SOURCES}
      />

      <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
        Compare{" "}
        <Link href="/universities" className="font-bold text-primary hover:underline">
          universities abroad
        </Link>
        , see{" "}
        <Link href="/popular-courses" className="font-bold text-primary hover:underline">
          popular courses
        </Link>
        , explore{" "}
        <Link href="/destinations" className="font-bold text-primary hover:underline">
          study destinations
        </Link>{" "}
        or{" "}
        <Link href="/contact-us" className="font-bold text-primary hover:underline">
          contact us
        </Link>{" "}
        for free counselling.
      </p>
    </div>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
