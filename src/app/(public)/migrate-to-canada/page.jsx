import Link from "next/link";

import CanadaMigrationContent from "./components/CanadaMigrationContent";
import { canadaFaqs } from "./canadaFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, ORG_ID } from "@/lib/seoSchema";

// Update when this page's text or the Express Entry table is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

// From IRCC's "Compare Express Entry programs" page (canada.ca), checked
// on the date above. CLB is the Canadian Language Benchmark.
const EXPRESS_ENTRY_PROGRAMS = [
  {
    name: "Federal Skilled Worker Program",
    language: "CLB 7",
    experience: "1 year of continuous skilled work within the last 10 years, in Canada or abroad",
  },
  {
    name: "Canadian Experience Class",
    language: "CLB 7 for TEER 0 or 1 jobs; CLB 5 for TEER 2 or 3 jobs",
    experience: "1 year of skilled work in Canada within the last 3 years",
  },
  {
    name: "Federal Skilled Trades Program",
    language: "CLB 5 for speaking and listening; CLB 4 for reading and writing",
    experience: "2 years of skilled trade work within the last 5 years",
  },
];

const SITE_URL = "https://medcityoverseas.com";

const PAGE_PATH = "/migrate-to-canada";

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
  "/og-images/canada-migration-og.webp";

const OG_IMAGE_URL =
  `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Migrate to Canada from Kerala | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Migrate to Canada from Kerala: general information on Express Entry, Provincial Nominee Programs, work permits, family sponsorship and PR, and who can advise on your case.";

const pageMetadata = {
  title: { absolute: PAGE_TITLE },

  description: PAGE_DESCRIPTION,

  keywords: [
    "migrate to Canada from Kerala",
    "Canada immigration from Kerala",
    "Canada migration from Kerala",
    "Canada PR from Kerala",
    "Canada skilled migration Kerala",
    "Canada permanent residence Kerala",
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
      "Migrate to Canada from Kerala | Medcity Overseas",

    description:
      "Explore Express Entry, Provincial Nominee Programs, work permits, family sponsorship and permanent residence pathways for migrating to Canada.",

    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt:
          "Canada migration and permanent residence pathways from Kerala",
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

      name: PAGE_TITLE,

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

    // FAQs added in the SEO manager join it (withPageSeoFaqs).
    faqPageNode(PAGE_PATH, canadaFaqs),
  ],
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default async function MigrateToCanadaPage() {
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

      <CanadaMigrationContent
        intro={
          <QuickAnswer updated={TEMPLATE_UPDATED} className="py-10">
            To migrate to Canada from Kerala, most skilled workers apply for permanent residence through Express Entry, which manages 3 programs: the Federal Skilled Worker Program, the Canadian Experience Class and the Federal Skilled Trades Program. Provincial Nominee Programs, work permits and family sponsorship are other routes. Medcity Overseas can explain these routes in general terms; for advice on your own case, speak to an authorised immigration representative, such as a licensed immigration consultant (RCIC) or a Canadian lawyer.
          </QuickAnswer>
        }
        beforeFaq={
          <>
            <QuestionAnswer
              className="py-12"
              eyebrow="Express Entry"
              question="Who can apply for Canada's Federal Skilled Worker Program?"
              answer="You need at least 1 year of continuous skilled work experience within the last 10 years, a language test result of at least CLB 7, and enough money to settle in Canada unless you already work there legally with a valid job offer. IRCC then scores you out of 100 on six selection factors, and 67 points or more may qualify you."
            />

            <section aria-labelledby="express-entry-table-heading" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
              <h2 id="express-entry-table-heading" className="text-2xl font-black text-slate-900 sm:text-3xl">
                Express Entry programs compared
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The minimum language level and work experience for each program, from IRCC&apos;s comparison of Express Entry programs. Meeting them lets you enter the Express Entry pool; IRCC invites the highest ranked candidates to apply.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
                    <tr>
                      <th scope="col" className="px-4 py-3">Program</th>
                      <th scope="col" className="px-4 py-3">Minimum language level</th>
                      <th scope="col" className="px-4 py-3">Work experience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {EXPRESS_ENTRY_PROGRAMS.map((program) => (
                      <tr key={program.name}>
                        <th scope="row" className="px-4 py-3 font-bold text-slate-900">{program.name}</th>
                        <td className="px-4 py-3">{program.language}</td>
                        <td className="px-4 py-3">{program.experience}</td>
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
                  label: "Compare Express Entry programs (IRCC)",
                  href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/compare.html",
                  note: "Language and work experience rules for each program.",
                },
                {
                  label: "Federal Skilled Worker Program (IRCC)",
                  href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html",
                  note: "Eligibility, selection factors and proof of funds.",
                },
                {
                  label: "Immigration, Refugees and Citizenship Canada",
                  href: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
                  note: "Canada's official immigration website.",
                },
              ]}
            />

            <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
              Thinking about other countries? Compare{" "}
              <Link href="/destinations" className="font-bold text-primary hover:underline">
                study destinations
              </Link>
              , see how to{" "}
              <Link href="/migrate-to-australia" className="font-bold text-primary hover:underline">
                migrate to Australia
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
