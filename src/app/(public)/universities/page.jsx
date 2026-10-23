import UniversitiesHero from "./components/UniversitiesHero";
import UniversitiesDestinations from "./components/UniversitiesDestinations";
import UniversitiesSeoContent from "./components/UniversitiesSeoContent";
import UniversitiesBenefits from "./components/UniversitiesBenefits";
import UniversitiesFAQ from "./components/UniversitiesFAQ";
import GuideLinks, { GUIDES } from "@/components/landing/GuideLinks";

import { postOverseasForm } from "@/lib/overseasApi";
import { createSlug } from "@/lib/slug";

import Link from "next/link";

import { faqs } from "./universitiesData";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import DestinationsTable from "@/components/seo/DestinationsTable";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { getDestinationSummaries, universitiesPageIndexableLookup } from "@/lib/destinationSummary";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { joinList } from "@/lib/seoSchema";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/universities`;
const PAGE_PATH = "/universities";

const PAGE_TITLE =
  "Universities Abroad for Indian Students | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Explore universities abroad for Indian students across Germany, UK, Australia, Ireland, New Zealand, USA and other leading study destinations.";

// Update when this page's text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";
const OG_IMAGE = `${SITE_URL}/og-images/universities.webp`;

// Read straight from the database on each request (same server, a few
// milliseconds). Prerendering at build time cannot reach the database on
// Hostinger's build machines and would publish an empty page.
export const dynamic = "force-dynamic";

const pageMetadata = {
  title: {
    absolute:
      "Universities Abroad for Indian Students | Medcity Overseas",
  },

  description:
    PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "Medcity Overseas",
    title:
      "Universities Abroad for Indian Students | Medcity Overseas",
    description:
      "Discover international universities, courses and study destinations for Indian students.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Universities abroad for Indian students",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Universities Abroad for Indian Students | Medcity Overseas",
    description:
      "Explore international universities and study destinations.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function getDestinationName(destination) {
  return (
    destination?.country ||
    destination?.name ||
    destination?.destination ||
    destination?.country_name ||
    ""
  );
}

async function getDestinations() {
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

    if (Array.isArray(result?.destinations)) {
      return result.destinations;
    }

    if (Array.isArray(result?.data)) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error(
      "Failed to load destinations:",
      error
    );

    return [];
  }
}

export default async function UniversitiesPage() {
  const [destinations, isIndexable] = await Promise.all([
    getDestinations(),
    universitiesPageIndexableLookup(),
  ]);

  // universitiesIndexable: whether /universities-in-<country> lists any
  // universities. It is noindex otherwise, so its card is not a link and
  // it is left out of the ItemList.
  const validDestinations = destinations
    .map((destination) => {
      const destinationName = getDestinationName(destination);

      return {
        ...destination,
        destinationName,
        universitiesIndexable: isIndexable(createSlug(destinationName)),
      };
    })
    .filter(
      (destination) =>
        destination.destinationName
    );

  const linkedDestinations = validDestinations.filter(
    (destination) => destination.universitiesIndexable
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    itemListElement:
        linkedDestinations.map(
            (destination, index) => ({
                "@type": "ListItem",

                position:
                    index + 1,

                name:
                    `Universities in ${destination.destinationName}`,

                url:
                    `${SITE_URL}/universities-in-${createSlug(
                        destination.destinationName
                    )}`,
            })
        ),
};
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const summaries = await getDestinationSummaries();
  const listed = summaries.filter((row) => row.universities > 0);
  const universityTotal = listed.reduce((sum, row) => sum + row.universities, 0);
  const courseTotal = listed.reduce((sum, row) => sum + row.courses, 0);

  const inShort = universityTotal > 0
    ? `Medcity Overseas lists ${universityTotal.toLocaleString("en-IN")} universities abroad for Indian students in ${listed.length} ${listed.length === 1 ? "country" : "countries"} (${joinList(listed.map((row) => row.country))})${
        courseTotal > 0 ? `, with ${courseTotal.toLocaleString("en-IN")} courses between them` : ""
      }. Pick a destination to compare its universities and courses, then book a counselling session to shortlist and apply.`
    : "Explore universities abroad for Indian students by destination, compare their courses and book a counselling session with Medcity Overseas to shortlist and apply.";

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8fafc]">
      <PageSchema
        path={PAGE_PATH}
        type="CollectionPage"
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        dateModified={TEMPLATE_UPDATED}
        image={OG_IMAGE}
        about={{ "@type": "Thing", name: "Universities abroad for Indian students" }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Universities", path: PAGE_PATH },
        ]}
      />

      {linkedDestinations.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                itemListJsonLd
              ).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              await withPageSeoFaqs(faqJsonLd)
            ).replace(/</g, "\\u003c"),
        }}
      />

      <UniversitiesHero />

      <QuickAnswer updated={TEMPLATE_UPDATED} className="pt-10">
        {inShort}
      </QuickAnswer>

      <UniversitiesDestinations
        destinations={
          validDestinations
        }
      />

      <UniversitiesSeoContent />

      <QuestionAnswer
        className="py-12"
        eyebrow="Choosing a university"
        question="How do Indian students choose a university abroad?"
        answer="Start with the course, then the country. Compare what each university teaches, its entry requirements, tuition fees, living costs, intakes and the work rights its country gives students. Shortlist a few that match your marks, English test score and budget, and check every detail on the university's own website before you apply."
        points={[
          { title: "Course", text: "modules, duration and how it is assessed." },
          { title: "Entry requirements", text: "academic marks and the English test score asked for." },
          { title: "Costs", text: "tuition fees and living costs in that city." },
          { title: "Visa and work rights", text: "the country's student visa rules and post-study options." },
        ]}
      />

      <DestinationsTable
        className="pb-14"
        title="Universities by country"
        intro="The universities and courses counted here are the ones currently listed on Medcity Overseas, so the numbers grow as we add more. Open a country to see its universities."
      />

      <UniversitiesBenefits />

      <GuideLinks
        className="py-10"
        links={[GUIDES.withoutIelts, GUIDES.scholarships, GUIDES.visa, GUIDES.after12th]}
      />

      <UniversitiesFAQ
        faqs={faqs}
      />

      <OfficialSources
        className="pb-14"
        links={STUDY_ABROAD_SOURCES}
        intro="Visa rules and university requirements change. Check the latest details on these official websites and on each university's own site before you apply."
      />

      <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
        Not sure where to start? Search the{" "}
        <Link href="/courses" className="font-bold text-primary hover:underline">
          course finder
        </Link>
        , compare{" "}
        <Link href="/destinations" className="font-bold text-primary hover:underline">
          study destinations
        </Link>{" "}
        or{" "}
        <Link href="/contact-us" className="font-bold text-primary hover:underline">
          contact Medcity Overseas
        </Link>{" "}
        to book a counselling session.
      </p>
    </div>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
