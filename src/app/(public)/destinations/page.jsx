import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import DestinationsFAQ from "./components/DestinationsFAQ";
import Link from "next/link";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/destinations";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/images/destinations-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
  "Best Study Abroad Destinations for Indian Students | Medcity Overseas";

const PAGE_DESCRIPTION =
  "Explore the best study abroad destinations for Indian students, including Germany, Canada, the UK, Australia, Ireland and New Zealand. Compare universities, courses, admission requirements and international education opportunities with Medcity Overseas.";

export const metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_PATH,
    siteName: "Medcity Overseas",
    title: PAGE_TITLE,
    description:
      "Discover leading study abroad destinations for Indian students and explore universities, courses, admissions and international education opportunities with Medcity Overseas.",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt:
          "Best study abroad destinations for Indian students",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Explore top study abroad destinations including Germany, Canada, the UK, Australia, Ireland and New Zealand.",
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

const destinations = [
  {
    name: "Germany",
    path: "/study-in-germany",
    description:
      "Study in Germany and explore universities, courses, admission requirements, tuition options and career opportunities for international students.",
  },
  {
    name: "Canada",
    path: "/study-in-canada",
    description:
      "Study in Canada and explore universities, programs, admission requirements and international education opportunities.",
  },
  {
    name: "United Kingdom",
    path: "/study-in-uk",
    description:
      "Study in the UK and discover universities, courses, intakes, admission requirements and opportunities for international students.",
  },
  {
    name: "Australia",
    path: "/study-in-australia",
    description:
      "Study in Australia and explore universities, courses, admission options and career opportunities for international students.",
  },
  {
    name: "Ireland",
    path: "/study-in-ireland",
    description:
      "Study in Ireland and discover universities, courses, admission requirements and international education opportunities.",
  },
  {
    name: "New Zealand",
    path: "/study-in-new-zealand",
    description:
      "Study in New Zealand and explore universities, programs, admission requirements and international student opportunities.",
  },
];

const destinationsSchema = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      about: {
        "@id": `${SITE_URL}/#organization`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}#destination-list`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": `${PAGE_URL}#primaryimage`,
        url: OG_IMAGE_URL,
        contentUrl: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        caption:
          "Best study abroad destinations for Indian students",
      },

      inLanguage: "en-IN",
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
          name: "Study Abroad Destinations",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#destination-list`,
      name:
        "Top Study Abroad Destinations for Indian Students",
      description:
        "Popular international study destinations for students exploring higher education abroad with Medcity Overseas.",

      numberOfItems: destinations.length,

      itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

      itemListElement: destinations.map(
        (destination, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}${destination.path}`,

          item: {
            "@type": "Country",
            "@id":
              `${SITE_URL}${destination.path}#destination`,
            name: destination.name,
            description: destination.description,
            url: `${SITE_URL}${destination.path}`,
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
      <section
  aria-labelledby="destinations-page-title"
  className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff8fb] to-[#eef7ff]"
>
  {/* Background decoration */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0"
  >
    <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

    <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(#0466af_1.2px,transparent_1.2px)] [background-size:20px_20px]" />

    <div className="absolute left-[48%] top-14 hidden h-40 w-40 rounded-full border border-primary/10 lg:block" />
    <div className="absolute left-[51%] top-24 hidden h-24 w-24 rounded-full border border-secondary/10 lg:block" />
  </div>

  <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:py-16 xl:gap-20">
    {/* LEFT */}
    <div className="relative z-10 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary shadow-[0_10px_30px_rgba(192,31,83,0.08)] backdrop-blur sm:text-xs">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          ✈
        </span>

        Explore Global Education
      </div>

      <h2
        id="destinations-page-title"
        className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.045em] text-darkPrimary sm:text-4xl lg:text-5xl"
      >
        Discover the Best{" "}
        <span className="bg-gradient-to-r from-primary via-[#e43f78] to-secondary bg-clip-text text-transparent">
          Study Abroad Destinations
        </span>{" "}
        for Indian Students
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-[17px]">
        Explore leading study abroad destinations including Germany,
        Canada, the United Kingdom, Australia, Ireland and New Zealand.
        Compare universities, courses and admission requirements to find
        the destination that best matches your academic and career goals.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
        {[
          ["Germany", "/study-in-germany"],
          ["UK", "/study-in-uk"],
          ["Canada", "/study-in-canada"],
          ["Australia", "/study-in-australia"],
        ].map(([name, href]) => (
          <Link
            key={name}
            href={href}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-md"
          >
            <span className="h-2 w-2 rounded-full bg-primary/70 transition-all group-hover:scale-125" />
            Study in {name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
          <p className="text-xl font-black text-darkPrimary">
            25+
          </p>
          <p className="mt-1 text-[11px] font-semibold text-slate-500">
            Study Destinations
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
          <p className="text-xl font-black text-secondary">
            100+
          </p>
          <p className="mt-1 text-[11px] font-semibold text-slate-500">
            Partner Universities
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
          <p className="text-xl font-black text-primary">
            12+
          </p>
          <p className="mt-1 text-[11px] font-semibold text-slate-500">
            Years of Guidance
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="relative mx-auto w-full max-w-[650px]">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-primary/10 via-white to-secondary/10 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/85 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:p-5">
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-darkPrimary via-[#7d2046] to-secondary p-6 sm:p-8">
          {/* decorative world effect */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -right-4 top-10 h-36 w-36 rounded-full border border-white/10"
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cyan-200">
                  Global Study Map
                </p>

                <h2 className="mt-2 max-w-md text-2xl font-black leading-tight text-white sm:text-3xl">
                Explore Popular International Study Destinations
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white backdrop-blur">
                ✈
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
  Compare leading destinations for international education and discover
  universities, courses and global career opportunities that match your
  study abroad goals.
</p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["DE", "Germany"],
                ["GB", "United Kingdom"],
                ["CA", "Canada"],
                ["AU", "Australia"],
                ["IE", "Ireland"],
                ["NZ", "New Zealand"],
              ].map(([code, country]) => (
                <div
                  key={country}
                  className="group rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-200">
                      {code}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-logoYellow" />
                  </div>

                  <p className="mt-3 text-sm font-extrabold text-white">
                    {country}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-4 backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-logoYellow text-darkPrimary">
                ★
              </div>

              <div>
                <p className="text-sm font-extrabold text-white">
                  Explore. Compare. Choose.
                </p>

                <p className="mt-1 text-xs leading-5 text-white/60">
                  Find the right destination for your study abroad journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating decorative cards */}
      <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl lg:block">
        <p className="text-xs font-extrabold text-darkPrimary">
          Global Opportunities
        </p>
        <p className="mt-1 text-[10px] text-slate-500">
          Universities • Courses • Careers
        </p>
      </div>

      <div className="absolute -right-4 top-10 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl xl:block">
        <p className="text-lg font-black text-primary">
          6+
        </p>
        <p className="text-[10px] font-semibold text-slate-500">
          Popular Destinations
        </p>
      </div>
    </div>
  </div>
</section>

        <DestinationsSection />

        <DestinationsFAQ />
      </div>
    </>
  );
}