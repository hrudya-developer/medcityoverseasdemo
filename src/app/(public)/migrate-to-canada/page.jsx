import CanadaMigrationContent from "./components/CanadaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";

const PAGE_PATH = "/migrate-to-canada";

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/canada-migration-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Migrate to Canada from Kerala | Canada Immigration Consultants";

const PAGE_DESCRIPTION =
  "Explore pathways to migrate to Canada from Kerala, including Express Entry, Provincial Nominee Programs, work permits, family sponsorship and permanent residence guidance from Medcity Overseas.";

export const metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "migrate to Canada from Kerala",
    "Canada migration consultants in Kerala",
    "Canada immigration consultants Kerala",
    "Canada PR consultants Kerala",
    "Canada immigration from Kerala",
    "Canada migration from Kerala",
    "Canada PR from Kerala",
    "Canada skilled migration Kerala",
    "Canada permanent residence Kerala",
    "Canada Express Entry consultants Kerala",
    "Canada PNP consultants Kerala",
    "Canada work permit consultants Kerala",
    "Canada family sponsorship consultants Kerala",
    "Canada immigration consultants Kannur",
    "Canada immigration consultants Kozhikode",
    "Canada immigration consultants Kochi",
    "Canada immigration consultants Ernakulam",
    "Canada immigration consultants Thrissur",
    "Canada immigration consultants Malappuram",
    "Canada immigration consultants Palakkad",
    "Canada immigration consultants Kottayam",
    "Canada immigration consultants Thiruvananthapuram",
    "Express Entry Canada",
    "Provincial Nominee Program Canada",
    "Canada permanent residence pathways",
    "Canada immigration programs",
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
      "Migrate to Canada from Kerala | Canada Immigration Consultants",

    description:
      "Explore Express Entry, Provincial Nominee Programs, work permits, family sponsorship and permanent residence pathways for migrating to Canada.",

    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt:
          "Canada migration and permanent residence guidance from Kerala",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Migrate to Canada from Kerala | Medcity Overseas",

    description:
      "Explore Canada immigration pathways including Express Entry, PNP, work permits, family sponsorship and permanent residence options.",

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

const immigrationPrograms = [
  {
    name: "Express Entry",
    description:
      "Canada's online system for managing eligible skilled worker applications under federal economic immigration programs.",
  },
  {
    name: "Provincial Nominee Program",
    description:
      "Immigration pathways that allow participating Canadian provinces and territories to nominate eligible applicants for permanent residence.",
  },
  {
    name: "Family Sponsorship",
    description:
      "Pathways through which eligible Canadian citizens and permanent residents may sponsor qualifying family members.",
  },
  {
    name: "Canadian Work Permits",
    description:
      "Temporary work authorization pathways that may allow eligible foreign nationals to work in Canada.",
  },
  {
    name: "Permanent Residence Pathways",
    description:
      "Federal, provincial and family-based immigration programs through which eligible applicants may seek Canadian permanent residence.",
  },
  {
    name: "Business and Entrepreneur Pathways",
    description:
      "Selected immigration pathways may be available for eligible entrepreneurs, business owners and investors, depending on current federal or provincial programs.",
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
        "Migrate to Canada from Kerala | Canada Immigration Consultants",

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
          name: "Canada immigration",
        },
        {
          "@type": "Thing",
          name: "Canada permanent residence",
        },
        {
          "@type": "Thing",
          name: "Express Entry",
        },
        {
          "@type": "Thing",
          name: "Provincial Nominee Program",
        },
        {
          "@type": "Thing",
          name: "Canada work permits",
        },
        {
          "@type": "Thing",
          name: "Family sponsorship in Canada",
        },
      ],

      mainEntity: {
        "@id": `${PAGE_URL}#canada-immigration-programs`,
      },
    },

    {
      "@type": "ImageObject",

      "@id": `${PAGE_URL}#primaryimage`,

      url: OG_IMAGE_URL,

      contentUrl: OG_IMAGE_URL,

      width: 1200,

      height: 630,

      caption:
        "Canada immigration and permanent residence pathways",
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${PAGE_URL}#breadcrumb`,

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
          name: "Migrate to Canada",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "ItemList",

      "@id":
        `${PAGE_URL}#canada-immigration-programs`,

      name:
        "Canada Immigration Programs and PR Pathways",

      description:
        "Explore major Canadian immigration pathways including Express Entry, Provincial Nominee Programs, work permits, family sponsorship and permanent residence options.",

      numberOfItems:
        immigrationPrograms.length,

      itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

      itemListElement:
        immigrationPrograms.map(
          (program, index) => ({
            "@type": "ListItem",

            position: index + 1,

            item: {
              "@type": "Thing",

              "@id":
                `${PAGE_URL}#immigration-program-${index + 1}`,

              name: program.name,

              description:
                program.description,

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

export default function MigrateToCanadaPage() {
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

      <CanadaMigrationContent />
    </>
  );
}