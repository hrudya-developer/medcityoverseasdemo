import UniversitiesHero from "./components/UniversitiesHero";
import UniversitiesDestinations from "./components/UniversitiesDestinations";
import UniversitiesSeoContent from "./components/UniversitiesSeoContent";
import UniversitiesBenefits from "./components/UniversitiesBenefits";
import UniversitiesFAQ from "./components/UniversitiesFAQ";

import { postOverseasForm } from "@/lib/overseasApi";
import { createSlug } from "@/lib/slug";

import { faqs } from "./universitiesData";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/universities`;
const OG_IMAGE = `${SITE_URL}/og-images/universities.webp`;

export const revalidate = 3600;

export const metadata = {
  title: {
    absolute:
      "Universities Abroad for Indian Students | Medcity Overseas",
  },

  description:
    "Explore universities abroad for Indian students across Germany, UK, Australia, Ireland, New Zealand, USA and other leading study destinations.",

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
  const destinations = await getDestinations();

  const validDestinations = destinations
    .map((destination) => ({
      ...destination,
      destinationName:
        getDestinationName(destination),
    }))
    .filter(
      (destination) =>
        destination.destinationName
    );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Universities",
        item: PAGE_URL,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",

    itemListElement:
        validDestinations.map(
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

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      {validDestinations.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                itemListJsonLd
              ),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqJsonLd
            ),
        }}
      />

      <UniversitiesHero />

      <UniversitiesDestinations
        destinations={
          validDestinations
        }
      />

      <UniversitiesSeoContent />

      <UniversitiesBenefits />

      <UniversitiesFAQ
        faqs={faqs}
      />
    </main>
  );
}