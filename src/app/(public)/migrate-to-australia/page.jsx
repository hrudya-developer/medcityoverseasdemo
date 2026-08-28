import AustraliaMigrationContent from "./components/AustraliaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/migrate-to-australia";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/australia-migration-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Migrate to Australia from Kerala | Australia Migration Consultants";

const PAGE_DESCRIPTION =
  "Explore pathways to migrate to Australia from Kerala, including skilled migration, subclass 189, 190 and 491 visas, employer-sponsored options, eligibility requirements and migration guidance from Medcity Overseas.";

export const metadata = {
  title: {
    absolute: `${PAGE_TITLE} | Medcity Overseas`,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "migrate to Australia from Kerala",
    "Australia migration consultants in Kerala",
    "Australia immigration consultants Kerala",
    "Australia PR consultants Kerala",
    "Australia migration from Kerala",
    "Australia immigration from Kerala",
    "Australia skilled migration Kerala",
    "Australia permanent residence Kerala",
    "Australia skilled visa consultants Kerala",
    "Australia subclass 189 visa",
    "Australia subclass 190 visa",
    "Australia subclass 491 visa",
    "Australia employer sponsored visa",
    "Australia regional migration",
    "Australia PR pathways",
    "Australia skilled migration",
    "move to Australia from India",
    "Australia migration consultants Kannur",
    "Australia migration consultants Kozhikode",
    "Australia migration consultants Kochi",
    "Australia migration consultants Ernakulam",
    "Australia migration consultants Thrissur",
    "Australia migration consultants Malappuram",
    "Australia migration consultants Palakkad",
    "Australia migration consultants Kottayam",
    "Australia migration consultants Thiruvananthapuram",
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
      "Migrate to Australia from Kerala | Australia Migration Consultants",

    description:
      "Explore Australian skilled migration pathways, subclass 189, 190 and 491 visas, regional migration and employer-sponsored options.",

    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt:
          "Australia migration and skilled visa guidance for applicants from Kerala",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Migrate to Australia from Kerala | Medcity Overseas",

    description:
      "Explore Australian skilled migration, state nomination, regional pathways and employer-sponsored visa options.",

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

const migrationPathways = [
  {
    name:
      "Skilled Independent Visa – Subclass 189",

    description:
      "A points-tested skilled migration pathway for eligible applicants that generally does not require state, territory or employer nomination.",
  },

  {
    name:
      "Skilled Nominated Visa – Subclass 190",

    description:
      "A points-tested skilled migration pathway that requires nomination by an Australian state or territory government.",
  },

  {
    name:
      "Skilled Work Regional Visa – Subclass 491",

    description:
      "A provisional skilled migration pathway involving state or territory nomination or eligible family sponsorship for designated regional areas of Australia.",
  },

  {
    name:
      "Employer-Sponsored Visa Pathways",

    description:
      "Migration pathways for eligible skilled workers who are nominated or sponsored by an approved Australian employer.",
  },

  {
    name:
      "Regional Migration Pathways",

    description:
      "Visa options designed to support eligible skilled migrants who live and work in designated regional areas of Australia.",
  },

  {
    name:
      "Permanent Residence Pathways",

    description:
      "Potential Australian permanent residence pathways for eligible skilled migrants and visa holders who meet the relevant requirements.",
  },
];

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",

      "@id": `${PAGE_URL}#webpage`,

      url: PAGE_URL,

      name:
        "Migrate to Australia from Kerala | Australia Migration Consultants",

      description: PAGE_DESCRIPTION,

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },

      primaryImageOfPage: {
        "@id": `${PAGE_URL}#primaryimage`,
      },

      about: [
        {
          "@type": "Thing",
          name: "Australia migration",
        },
        {
          "@type": "Thing",
          name: "Australian skilled migration",
        },
        {
          "@type": "Thing",
          name: "Australia permanent residence",
        },
        {
          "@type": "Thing",
          name: "Skilled Independent Visa subclass 189",
        },
        {
          "@type": "Thing",
          name: "Skilled Nominated Visa subclass 190",
        },
        {
          "@type": "Thing",
          name: "Skilled Work Regional Visa subclass 491",
        },
        {
          "@type": "Thing",
          name: "Australia employer-sponsored visas",
        },
      ],

      mainEntity: {
        "@id":
          `${PAGE_URL}#australia-migration-pathways`,
      },
    },

    {
      "@type": "ImageObject",

      "@id":
        `${PAGE_URL}#primaryimage`,

      url: OG_IMAGE_URL,

      contentUrl: OG_IMAGE_URL,

      width: 1200,

      height: 630,

      caption:
        "Australia migration and skilled visa pathways",
    },

    {
      "@type": "BreadcrumbList",

      "@id":
        `${PAGE_URL}#breadcrumb`,

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
          name: "Migrate to Australia",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "ItemList",

      "@id":
        `${PAGE_URL}#australia-migration-pathways`,

      name:
        "Australia Skilled Migration and PR Pathways",

      description:
        "Explore major Australian migration pathways including subclass 189, 190 and 491 visas, regional migration, employer-sponsored visas and permanent residence options.",

      numberOfItems:
        migrationPathways.length,

      itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

      itemListElement:
        migrationPathways.map(
          (pathway, index) => ({
            "@type": "ListItem",

            position: index + 1,

            item: {
              "@type": "Thing",

              "@id":
                `${PAGE_URL}#migration-pathway-${index + 1}`,

              name: pathway.name,

              description:
                pathway.description,

              url: PAGE_URL,
            },
          })
        ),
    },
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default function MigrateToAustraliaPage() {
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

      <AustraliaMigrationContent />
    </>
  );
}