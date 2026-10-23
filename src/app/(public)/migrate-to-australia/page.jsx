import Link from "next/link";

import AustraliaMigrationContent from "./components/AustraliaMigrationContent";
import { australiaFaqs } from "./australiaFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, ORG_ID } from "@/lib/seoSchema";

// Update when this page's text or the visa table is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

// From the Victorian Government's skilled visa pages (liveinmelbourne.vic.gov.au),
// which restate the Department of Home Affairs rules; checked on the date above.
const SKILLED_VISAS = [
  {
    name: "Skilled Nominated visa (subclass 190)",
    type: "Permanent",
    rules: "State or territory nomination, under 45 years of age when nominated, at least 65 points (including 5 for nomination), Competent English and a skills assessment",
  },
  {
    name: "Skilled Work Regional (Provisional) visa (subclass 491)",
    type: "Provisional, up to 5 years",
    rules: "Live, work and study in a designated regional area; under 45 years of age when nominated, at least 65 points (including 15 for nomination); after 3 years holders may be eligible for the permanent subclass 191 visa",
  },
];

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/migrate-to-australia";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/australia-migration-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Migrate to Australia from Kerala | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Migrate to Australia from Kerala: general information on skilled visas 189, 190 and 491, employer-sponsored options, eligibility and who can advise on your case.";

const pageMetadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "migrate to Australia from Kerala",
    "Australia migration from Kerala",
    "Australia immigration from Kerala",
    "Australia skilled migration Kerala",
    "Australia permanent residence Kerala",
    "Australia subclass 189 visa",
    "Australia subclass 190 visa",
    "Australia subclass 491 visa",
    "Australia employer sponsored visa",
    "Australia regional migration",
    "Australia PR pathways",
    "Australia skilled migration",
    "move to Australia from India",
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
      "Migrate to Australia from Kerala | Medcity Overseas",

    description:
      "Explore Australian skilled migration pathways, subclass 189, 190 and 491 visas, regional migration and employer-sponsored options.",

    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt:
          "Australia migration and skilled visa pathways for applicants from Kerala",
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
      "Skilled Independent Visa (Subclass 189)",

    description:
      "A points-tested skilled migration pathway for eligible applicants that generally does not require state, territory or employer nomination.",
  },

  {
    name:
      "Skilled Nominated Visa (Subclass 190)",

    description:
      "A points-tested skilled migration pathway that requires nomination by an Australian state or territory government.",
  },

  {
    name:
      "Skilled Work Regional Visa (Subclass 491)",

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
        PAGE_TITLE,

      description: PAGE_DESCRIPTION,

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      author: { "@id": ORG_ID },

      dateModified: TEMPLATE_UPDATED,

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

    // FAQs added in the SEO manager join it (withPageSeoFaqs).
    faqPageNode(PAGE_PATH, australiaFaqs),
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default async function MigrateToAustraliaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              await withPageSeoFaqs(structuredData)
            ),
        }}
      />

      <AustraliaMigrationContent
        intro={
          <QuickAnswer updated={TEMPLATE_UPDATED} className="py-10">
            To migrate to Australia from Kerala, skilled workers usually apply through the points tested skilled visas: the Skilled Independent visa (subclass 189), the state nominated Skilled Nominated visa (subclass 190) and the regional Skilled Work Regional visa (subclass 491). Employer sponsored visas are another route. Medcity Overseas can explain these routes in general terms; for advice on your own case, speak to a registered migration agent (MARA) or an Australian legal practitioner.
          </QuickAnswer>
        }
        beforeFaq={
          <>
            <QuestionAnswer
              className="py-12"
              eyebrow="Skilled migration"
              question="Who can apply for an Australian skilled nominated visa?"
              answer="For the Skilled Nominated visa (subclass 190) you need a nomination from an Australian state or territory, must be under 45 years of age when nominated, need at least 65 points on the Australian Government's points test, at least Competent English and a skills assessment in an occupation on the eligible skilled occupation list."
            />

            <section aria-labelledby="skilled-visas-table-heading" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
              <h2 id="skilled-visas-table-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
                State nominated skilled visas compared
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The main rules for the two state nominated visas, as the Victorian Government sets them out from the Department of Home Affairs requirements. Each state adds its own nomination criteria.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
                    <tr>
                      <th scope="col" className="px-4 py-3">Visa</th>
                      <th scope="col" className="px-4 py-3">Type</th>
                      <th scope="col" className="px-4 py-3">Main requirements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {SKILLED_VISAS.map((visa) => (
                      <tr key={visa.name}>
                        <th scope="row" className="px-4 py-3 font-bold text-slate-900">{visa.name}</th>
                        <td className="px-4 py-3">{visa.type}</td>
                        <td className="px-4 py-3">{visa.rules}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        }
        afterFaq={
          <>
            <OfficialSources
              className="pb-12"
              links={[
                {
                  label: "Skilled Nominated visa (subclass 190), Victorian Government",
                  href: "https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/skilled-nominated-visa-subclass-190",
                  note: "Nomination, age, points and English requirements.",
                },
                {
                  label: "Skilled Work Regional visa (subclass 491), Victorian Government",
                  href: "https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/491",
                  note: "Regional living rules and the pathway to permanent residence.",
                },
                {
                  label: "Skilled Independent visa (subclass 189), Department of Home Affairs",
                  href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
                  note: "The Australian Government's official visa listing.",
                },
              ]}
            />

            <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
              Planning to study first? Read the{" "}
              <Link href="/study-in-australia" className="font-bold text-primary hover:underline">
                study in Australia guide
              </Link>
              , see how to{" "}
              <Link href="/migrate-to-canada" className="font-bold text-primary hover:underline">
                migrate to Canada
              </Link>
              , find your{" "}
              <Link href="/branches" className="font-bold text-primary hover:underline">
                nearest Medcity branch
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className="font-bold text-primary hover:underline">
                contact Medcity Overseas
              </Link>
              .
            </p>
          </>
        }
      />
    </>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
