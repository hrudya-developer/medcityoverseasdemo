import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsHero from "./TestimonialsHero";
import TestimonialsSuccessSection from "./TestimonialsSuccessSection";

const SITE_URL =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://medcityoverseas.com";

const PAGE_PATH =
    "/all-testimonials";

const PAGE_URL =
    `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE =
    "/og-images/testimonials-og.webp";

const PAGE_TITLE =
    "Study Abroad Student Testimonials & Success Stories";

const PAGE_DESCRIPTION =
    "Read study abroad student testimonials and success stories from Medcity Overseas students. Discover experiences with university admissions, course selection, visa guidance and overseas education support.";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata = {
    title:
        PAGE_TITLE,

    description:
        PAGE_DESCRIPTION,

    keywords: [
        "study abroad student testimonials",
        "study abroad success stories",
        "Medcity Overseas testimonials",
        "Medcity Overseas student reviews",
        "study abroad student reviews",
        "overseas education testimonials",
        "study abroad experiences",
        "student visa success stories",
        "study abroad consultants Kerala reviews",
    ],

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
            `${PAGE_TITLE} | Medcity Overseas`,

        description:
            "Explore genuine study abroad experiences and student success stories from students supported by Medcity Overseas.",

        images: [
            {
                url:
                    OG_IMAGE,

                width:
                    1200,

                height:
                    630,

                alt:
                    "Medcity Overseas study abroad student testimonials and success stories",
            },
        ],
    },

    twitter: {
        card:
            "summary_large_image",

        title:
            `${PAGE_TITLE} | Medcity Overseas`,

        description:
            "Read study abroad student testimonials, experiences and success stories from Medcity Overseas.",

        images: [
            OG_IMAGE,
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

/* =========================================================
   FETCH TESTIMONIALS
========================================================= */

async function getTestimonials() {
    try {
        const response =
            await fetch(
                `${SITE_URL}/api/testimonials`,
                {
                    next: {
                        revalidate:
                            3600,

                        tags: [
                            "testimonials",
                        ],
                    },
                }
            );

        if (!response.ok) {
            console.error(
                `Testimonials request failed with status ${response.status}`
            );

            return [];
        }

        const result =
            await response.json();

        return Array.isArray(
            result?.testimonials
        )
            ? result.testimonials
            : [];
    } catch (error) {
        console.error(
            "Unable to retrieve testimonials:",
            error
        );

        return [];
    }
}

/* =========================================================
   HELPERS
========================================================= */

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

function getStudentName(
    testimonial
) {
    return (
        testimonial?.studentName ||
        testimonial?.name ||
        testimonial?.authorName ||
        "Medcity Overseas student"
    );
}

function getTestimonialText(
    testimonial
) {
    return (
        testimonial?.testimonial ||
        testimonial?.review ||
        testimonial?.message ||
        testimonial?.description ||
        ""
    );
}

/* =========================================================
   PAGE
========================================================= */

export default async function AllTestimonialsPage() {
    const testimonials =
        await getTestimonials();

    /* =====================================================
       COLLECTION PAGE
    ===================================================== */

    const pageJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "CollectionPage",

        "@id":
            `${PAGE_URL}#webpage`,

        url:
            PAGE_URL,

        name:
            `${PAGE_TITLE} | Medcity Overseas`,

        headline:
            "Student Testimonials and Study Abroad Success Stories",

        description:
            PAGE_DESCRIPTION,

        inLanguage:
            "en-IN",

        isPartOf: {
            "@id":
                `${SITE_URL}/#website`,
        },

        about: {
            "@id":
                `${SITE_URL}/#organization`,
        },

        breadcrumb: {
            "@id":
                `${PAGE_URL}#breadcrumb`,
        },

        mainEntity: {
            "@id":
                `${PAGE_URL}#testimonial-list`,
        },
    };

    /* =====================================================
       BREADCRUMB
    ===================================================== */

    const breadcrumbJsonLd = {
        "@context":
            "https://schema.org",

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
                    "Student Testimonials",

                item:
                    PAGE_URL,
            },
        ],
    };

    /* =====================================================
       TESTIMONIAL LIST
    ===================================================== */

    const testimonialListJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "ItemList",

        "@id":
            `${PAGE_URL}#testimonial-list`,

        name:
            "Medcity Overseas Study Abroad Student Testimonials",

        description:
            "Study abroad experiences and success stories shared by students supported by Medcity Overseas.",

        numberOfItems:
            testimonials.length,

        itemListOrder:
            "https://schema.org/ItemListOrderAscending",

        itemListElement:
            testimonials.map(
                (
                    testimonial,
                    index
                ) => {
                    const studentName =
                        getStudentName(
                            testimonial
                        );

                    const testimonialText =
                        getTestimonialText(
                            testimonial
                        );

                    return {
                        "@type":
                            "ListItem",

                        position:
                            index + 1,

                        item: {
                            "@type":
                                "Review",

                            "@id":
                                `${PAGE_URL}#testimonial-${
                                    testimonial?.id ||
                                    testimonial?._id ||
                                    index + 1
                                }`,

                            name:
                                `Study abroad testimonial from ${studentName}`,

                            author: {
                                "@type":
                                    "Person",

                                name:
                                    studentName,
                            },

                            ...(testimonialText
                                ? {
                                      reviewBody:
                                          testimonialText,
                                  }
                                : {}),

                            itemReviewed: {
                                "@id":
                                    `${SITE_URL}/#organization`,
                            },

                            inLanguage:
                                "en-IN",
                        },
                    };
                }
            ),
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <>
            {/* =================================================
                STRUCTURED DATA
            ================================================= */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            pageJsonLd
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            breadcrumbJsonLd
                        ),
                }}
            />

            {testimonials.length >
                0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            serializeJsonLd(
                                testimonialListJsonLd
                            ),
                    }}
                />
            )}

            {/* =================================================
                HERO
            ================================================= */}

            <TestimonialsHero
                testimonialCount={
                    testimonials.length
                }
            />

            {/* =================================================
                STUDENT STORIES
            ================================================= */}

            <section
                id="student-stories"
                aria-labelledby="student-stories-heading"
                className="
                    relative
                    overflow-hidden
                    bg-white

                    px-4
                    py-12

                    sm:px-6
                    sm:py-14

                    lg:px-8
                    lg:py-16

                    xl:py-20
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-[1500px]
                    "
                >
                    {/* SECTION INTRO */}

                    <header
                        className="
                            mx-auto
                            max-w-3xl
                            text-center
                        "
                    >
                        <span
                            className="
                                inline-flex

                                rounded-full

                                bg-primary/[0.07]

                                px-3
                                py-1.5

                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.13em]
                                text-primary

                                sm:text-xs
                            "
                        >
                            Student Experiences
                        </span>

                        <h2
                            id="student-stories-heading"
                            className="
                                mt-3

                                font-nunito

                                text-2xl
                                font-black
                                leading-tight
                                tracking-[-0.02em]
                                text-darkPrimary

                                sm:text-3xl

                                lg:text-4xl
                            "
                        >
                            Real Stories From
                            Students Who Studied
                            Abroad
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-2xl

                                text-sm
                                leading-7
                                text-slate-600

                                sm:text-base
                                sm:leading-8
                            "
                        >
                            Explore student
                            experiences with
                            university admissions,
                            applications, visa
                            guidance and the journey
                            towards studying abroad.
                        </p>
                    </header>

                    {/* TESTIMONIALS */}

                    {testimonials.length >
                    0 ? (
                        <TestimonialsGrid
                            testimonials={
                                testimonials
                            }
                        />
                    ) : (
                        <div
                            className="
                                mx-auto
                                mt-12
                                max-w-xl

                                rounded-3xl

                                border
                                border-slate-100

                                bg-slate-50

                                px-6
                                py-10

                                text-center
                            "
                        >
                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-darkPrimary
                                "
                            >
                                Student stories are
                                being updated
                            </h2>

                            <p
                                className="
                                    mt-3

                                    text-sm
                                    leading-7
                                    text-slate-600

                                    sm:text-base
                                "
                            >
                                Please check back
                                soon to explore more
                                study abroad student
                                experiences and
                                success stories.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* =================================================
                SEO CONTENT
            ================================================= */}
<TestimonialsSuccessSection />
        </>
    );
}