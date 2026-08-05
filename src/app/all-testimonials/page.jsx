import TestimonialCard from "@/components/home/testimonials/TestimonialCard";

const SITE_URL =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://medcityoverseas.com";

const PAGE_PATH = "/all-testimonials";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = "/og-images/testimonials-og.webp";

const PAGE_TITLE = "Student Testimonials and Success Stories";

const PAGE_DESCRIPTION =
  "Read genuine student testimonials and study abroad success stories from students supported by Medcity Overseas with admissions, visa guidance, language training and overseas education services.";

export const metadata = {
  /*
   * With the root layout title template:
   * "%s | Medcity Overseas"
   *
   * Final title:
   * Student Testimonials and Success Stories | Medcity Overseas
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
      "Discover experiences shared by students who received study abroad counselling, admissions assistance and visa support from Medcity Overseas.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Student testimonials and success stories from Medcity Overseas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Medcity Overseas`,
    description:
      "Read genuine study abroad experiences and student success stories from Medcity Overseas.",
    images: [OG_IMAGE],
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

const getTestimonials = async () => {
  try {
    const response = await fetch(`${SITE_URL}/api/testimonials`, {
      next: {
        revalidate: 3600,
        tags: ["testimonials"],
      },
    });

    if (!response.ok) {
      console.error(
        `Testimonials request failed with status ${response.status}`,
      );

      return [];
    }

    const result = await response.json();

    return Array.isArray(result?.testimonials)
      ? result.testimonials
      : [];
  } catch (error) {
    console.error("Unable to retrieve testimonials:", error);

    return [];
  }
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function getStudentName(testimonial) {
  return (
    testimonial?.studentName ||
    testimonial?.name ||
    testimonial?.authorName ||
    "Medcity Overseas student"
  );
}

function getTestimonialText(testimonial) {
  return (
    testimonial?.testimonial ||
    testimonial?.review ||
    testimonial?.message ||
    testimonial?.description ||
    ""
  );
}

export default async function AllTestimonialsPage() {
  const testimonials = await getTestimonials();

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}/#webpage`,
    url: PAGE_URL,
    name: `${PAGE_TITLE} | Medcity Overseas`,
    description: PAGE_DESCRIPTION,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    breadcrumb: {
      "@id": `${PAGE_URL}/#breadcrumb`,
    },
    mainEntity: {
      "@id": `${PAGE_URL}/#testimonial-list`,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
        name: "Student Testimonials",
        item: PAGE_URL,
      },
    ],
  };

  const testimonialListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}/#testimonial-list`,
    name: "Medcity Overseas Student Testimonials",
    numberOfItems: testimonials.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: testimonials.map((testimonial, index) => {
      const studentName = getStudentName(testimonial);
      const testimonialText = getTestimonialText(testimonial);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Review",
          "@id": `${PAGE_URL}/#testimonial-${testimonial.id || index + 1}`,
          name: `Study abroad testimonial from ${studentName}`,
          author: {
            "@type": "Person",
            name: studentName,
          },
          ...(testimonialText && {
            reviewBody: testimonialText,
          }),
          itemReviewed: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(pageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd),
        }}
      />

      {testimonials.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(testimonialListJsonLd),
          }}
        />
      )}

      {/*
       * Do not add another <main> here because RootLayout
       * already wraps page content in <main id="main-content">.
       */}
      <section
        className="bg-gradient-to-br from-[#fff6f9] via-white to-[#f3f9ff] px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-[1500px]">
          <header className="mx-auto max-w-3xl text-center">
            <h1
              id="testimonials-heading"
              className="font-nunito text-3xl font-extrabold text-darkPrimary sm:text-4xl lg:text-5xl"
            >
              Student Testimonials and Success Stories
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Discover genuine experiences shared by students who started
              their international education journey with guidance from
              Medcity Overseas.
            </p>
          </header>

          {testimonials.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id || testimonial._id || index}
                  testimonial={testimonial}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-14 max-w-xl text-center">
              <h2 className="text-xl font-bold text-slate-800">
                Student stories are being updated
              </h2>

              <p className="mt-3 text-slate-600">
                Please check back soon to explore more student experiences
                and study abroad success stories.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}