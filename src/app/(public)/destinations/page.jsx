import DestinationsSection from "@/components/home/destinations/DestinationsSection";

import DestinationHero from "./components/DestinationHero";
import DestinationsFAQ from "./components/DestinationsFAQ";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/destinations";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/images/destinations-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Top Study Abroad Destinations";

const PAGE_DESCRIPTION =
  "Explore popular study abroad destinations including Germany, Canada, the United Kingdom, Australia, Ireland and New Zealand. Compare universities, courses, admission options and international education opportunities with Medcity Overseas.";

export const metadata = {
  title: PAGE_TITLE,

  description:
    PAGE_DESCRIPTION,

  alternates: {
    canonical:
      PAGE_PATH,
  },

  openGraph: {
    type:
      "website",

    locale:
      "en_IN",

    url:
      PAGE_PATH,

    siteName:
      "Medcity Overseas",

    title:
      "Top Study Abroad Destinations | Medcity Overseas",

    description:
      "Explore international study destinations, universities, courses and overseas education opportunities with Medcity Overseas.",

    images: [
      {
        url:
          OG_IMAGE_PATH,

        width:
          1200,

        height:
          630,

        alt:
          "Popular study abroad destinations for international students",

        type:
          "image/webp",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Top Study Abroad Destinations | Medcity Overseas",

    description:
      "Explore Germany, Canada, the UK, Australia, Ireland, New Zealand and other international study destinations.",

    images: [
      OG_IMAGE_PATH,
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

const destinations = [
  {
    name:
      "Germany",

    path:
      "/study-in-germany",

    description:
      "Explore universities, courses, admission requirements and study opportunities in Germany.",
  },

  {
    name:
      "Canada",

    path:
      "/study-in-canada",

    description:
      "Explore universities, courses and international education opportunities in Canada.",
  },

  {
    name:
      "United Kingdom",

    path:
      "/study-in-uk",

    description:
      "Discover universities, programs and study opportunities in the United Kingdom.",
  },

  {
    name:
      "Australia",

    path:
      "/study-in-australia",

    description:
      "Explore Australian universities, courses and international student opportunities.",
  },

  {
    name:
      "Ireland",

    path:
      "/study-in-ireland",

    description:
      "Discover universities, courses and study opportunities for international students in Ireland.",
  },

  {
    name:
      "New Zealand",

    path:
      "/study-in-new-zealand",

    description:
      "Explore universities, programs and international education opportunities in New Zealand.",
  },
];

const destinationsSchema = {
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

      image: {
        "@type":
          "ImageObject",

        url:
          OG_IMAGE_URL,

        width:
          1200,

        height:
          630,
      },

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

      mainEntity: {
        "@id":
          `${PAGE_URL}#destination-list`,
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
            "Study Abroad Destinations",

          item:
            PAGE_URL,
        },
      ],
    },

    {
      "@type":
        "ItemList",

      "@id":
        `${PAGE_URL}#destination-list`,

      name:
        "Popular Study Abroad Destinations",

      description:
        "International education destinations featured by Medcity Overseas.",

      numberOfItems:
        destinations.length,

      itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

      itemListElement:
        destinations.map(
          (
            destination,
            index
          ) => ({
            "@type":
              "ListItem",

            position:
              index + 1,

            url:
              `${SITE_URL}${destination.path}`,

            item: {
              "@type":
                "Country",

              "@id":
                `${SITE_URL}${destination.path}#destination`,

              name:
                destination.name,

              description:
                destination.description,

              url:
                `${SITE_URL}${destination.path}`,
            },
          })
        ),
    },
  ],
};

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

export default function DestinationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              destinationsSchema
            ),
        }}
      />

      <div className="overflow-hidden bg-white">
        {/* <DestinationHero /> */}

        <DestinationsSection />

        <DestinationsFAQ />
      </div>
    </>
  );
}