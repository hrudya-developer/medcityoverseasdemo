import GermanProgramsClient from "./GermanProgramsClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/german-programs";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/og-images/german-programs-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "German Study, Ausbildung and Career Programs";

const PAGE_DESCRIPTION =
  "Explore German university study programs, Ausbildung vocational training and career pathways for international students with guidance from Medcity Overseas.";

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
    title: `${PAGE_TITLE} | Medcity Overseas`,
    description:
      "Discover university study options, Ausbildung vocational training and career pathways in Germany for international students.",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "German study, Ausbildung and career programs for international students",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Medcity Overseas`,
    description:
      "Explore German university programs, Ausbildung training and international career pathways.",
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

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
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
          name: "Study in Germany",
        },
        {
          "@type": "Thing",
          name: "Ausbildung vocational training",
        },
        {
          "@type": "Thing",
          name: "Career pathways in Germany",
        },
      ],

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}/#breadcrumb`,
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
          name: "German Programs",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GermanProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      <GermanProgramsClient />
    </>
  );
}