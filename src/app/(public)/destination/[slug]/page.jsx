import {
  notFound,
  permanentRedirect,
} from "next/navigation";

import DestinationDetailsClient
  from "./components/DestinationDetailsClient";

import {
  findCanonicalSlugForAlias,
  findDestinationSlugById,
  getDestinationDetails,
  resolveDestinationId,
} from "./lib/destinationApi";

import {
  extractDestinationData,
} from "./lib/destinationNormalizer";

import {
  getDestinationSeo,
} from "./lib/destinationSeo";

import {
  createDestinationSchema,
  serializeJsonLd,
} from "./lib/destinationSchema";
import { withPageSeoFaqs, withSeoOverrides } from "@/lib/pageSeo";
import { getCountryFacts } from "@/lib/countryFacts";
import { latestDate } from "@/lib/seoSchema";
import { createDestinationFaqs } from "./lib/destinationFaqs";
import {
  DESTINATION_TEMPLATE_UPDATED,
  DestinationInShort,
  DestinationLinks,
} from "./components/DestinationSeoSections";

export const revalidate =
  3600;

/* =========================================================
   LOAD DESTINATION
========================================================= */

async function loadDestination(
  slug
) {
  const destinationSlug =
    String(slug || "")
      .trim()
      .toLowerCase();

  if (!destinationSlug) {
    return null;
  }

  const destinationId =
    await resolveDestinationId(
      destinationSlug
    );

  if (!destinationId) {
    return null;
  }

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
    return null;
  }

  return {
    destinationSlug,
    destinationId,
    ...destination,
  };
}

/* =========================================================
   DYNAMIC METADATA
========================================================= */

async function pageGenerateMetadata({
  params,
}) {
  const { slug } =
    await params;

  try {
    const destination =
      await loadDestination(
        slug
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

    const seo =
      getDestinationSeo({
        countryName:
          destination
            .country
            .country,

        destinationSlug:
          destination
            .destinationSlug,

        country:
          destination.country,

        image:
          destination.image,
      });

    return {
      /*
       * If your root layout has:
       * title.template = "%s | Medcity Overseas"
       * keep seo.title.
       */
      title:
        seo.title,

      description:
        seo.description,

      keywords:
        seo.keywords,

      alternates: {
        canonical:
          seo.pageUrl,

        languages: {
          "en-IN":
            seo.pageUrl,
        },
      },

      openGraph: {
        type: "website",

        locale:
          "en_IN",

        url:
          seo.pageUrl,

        siteName:
          "Medcity Overseas",

        title:
          seo.fullTitle,

        description:
          seo.description,

        images: [
          {
            url:
              seo.image,

            width:
              1200,

            height:
              630,

            alt:
              seo.imageAlt,
          },
        ],
      },

      twitter: {
        card:
          "summary_large_image",

        title:
          seo.fullTitle,

        description:
          seo.description,

        images: [
          seo.image,
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

      category:
        "Education",
    };
  } catch (error) {
    // Same as the page: an API failure must not mark a real
    // destination page as noindex.
    console.error(
      "Destination metadata error:",
      error
    );

    throw error;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default async function DestinationDetailsPage({
  params,
}) {
  const { slug } =
    await params;

  // Old numeric addresses (/study-in-39) move to the slug page.
  if (/^\d+$/.test(String(slug ?? "").trim())) {
    const destinationSlug =
      await findDestinationSlugById(slug);

    if (destinationSlug) {
      permanentRedirect(`/study-in-${destinationSlug}`);
    }

    notFound();
  }

  let destination;

  try {
    destination =
      await loadDestination(
        slug
      );
  } catch (error) {
    // A failed API call (timeout, rate limit) is not a missing
    // destination. Rethrow so a revalidation keeps the last good
    // page instead of caching a 404 for an hour.
    console.error(
      "Destination page error:",
      error
    );

    throw error;
  }

  if (!destination) {
    // The short slug style ("uk" for "United Kingdom") moves to the
    // slug this page uses, so both resolve without duplicate pages.
    const canonicalSlug =
      await findCanonicalSlugForAlias(slug);

    if (canonicalSlug) {
      permanentRedirect(`/study-in-${canonicalSlug}`);
    }

    notFound();
  }

  const {
    destinationId,
    destinationSlug,
    country,
    highlights,
    universities,
    universityImagePath,
    image,
    flag,
  } = destination;

  const seo =
    getDestinationSeo({
      countryName:
        country.country,

      destinationSlug,

      country,

      image,
    });

  const facts =
    await getCountryFacts(
      destinationId
    );

  // Link /universities-in-<country> only when that page is indexable:
  // it is noindex when it lists no universities. getDestinationDetails
  // loaded the same list (the country's live universities), so its
  // length is the page's rule without another query.
  const linkUniversities =
    Array.isArray(universities) &&
    universities.length > 0;

  const dateModified =
    latestDate(
      facts?.latest,
      DESTINATION_TEMPLATE_UPDATED
    );

  const structuredData =
    await withPageSeoFaqs(createDestinationSchema({
      seo,
      country,
      universities,
      dateModified,
      faqs: createDestinationFaqs(
        seo.countryName
      ),
    }));

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
        countryId={
          destinationId
        }
        country={country}
        highlights={
          highlights
        }
        universities={
          universities
        }
        universityImagePath={
          universityImagePath
        }
        linkUniversities={
          linkUniversities
        }
        image={image}
        flag={flag}
        seo={seo}
        summary={
          <DestinationInShort
            countryName={seo.countryName}
            country={country}
            facts={facts}
            updated={dateModified}
          />
        }
      >
        <DestinationLinks
          countryName={seo.countryName}
          destinationSlug={destinationSlug}
          linkUniversities={linkUniversities}
        />
      </DestinationDetailsClient>
    </>
  );
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);
