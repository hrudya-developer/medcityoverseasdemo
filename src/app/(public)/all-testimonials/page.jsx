import { getTestimonials } from "@/lib/testimonials";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsHero from "./TestimonialsHero";
import TestimonialsSuccessSection from "./TestimonialsSuccessSection";
import { applySeoOverrides } from "@/lib/pageSeo";
import Link from "next/link";
import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { organizationNode, websiteNode } from "@/lib/seoSchema";

// Read straight from the database on each request (same server, a few
// milliseconds). Prerendering at build time cannot reach the database on
// Hostinger's build machines and would publish an empty page.
export const dynamic = "force-dynamic";

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
    "Student Testimonials and Success Stories";

const PAGE_DESCRIPTION =
    "Read testimonials and success stories from Medcity Overseas students about university admissions, course choice, visa guidance and studying abroad.";

// Update when the content of this page is reviewed.
const PAGE_UPDATED = "2026-10-23";

const FAQS = [
    {
        question: "How does Medcity Overseas help students study abroad?",
        answer:
            "Medcity Overseas counsellors help students shortlist countries, universities and courses, prepare applications and documents, plan English or German language tests, and follow the student visa and pre-departure steps.",
    },
    {
        question: "Does Medcity Overseas offer free counselling?",
        answer:
            "Yes. Book a free counselling session by calling or messaging +91 90729 82555 on WhatsApp, or through the contact page. A counsellor reviews your profile and explains suitable countries, courses and next steps.",
    },
    {
        question: "Which countries do Medcity Overseas students study in?",
        answer:
            "Medcity Overseas helps students explore destinations such as Germany, the UK, Canada, Australia, Ireland and New Zealand. The destinations page lists each country's universities, courses and visa guidance.",
    },
];

/* =========================================================
   SEO METADATA
========================================================= */

const pageMetadata = {
    title: {
        absolute: `${PAGE_TITLE} | Medcity Overseas`,
    },

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

// Calls the Overseas API directly. Fetching this site's own
// /api/testimonials URL fails during a fresh build or deploy.
async function loadTestimonials() {
    try {
        return await getTestimonials();
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
        await loadTestimonials();

    /* =====================================================
       COLLECTION PAGE
    ===================================================== */

    const pageJsonLd = {
        "@context":
            "https://schema.org",

        "@graph": [
            organizationNode(),
            websiteNode(),
        ],
    };

    const collectionJsonLd = {
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

        publisher: {
            "@id":
                `${SITE_URL}/#organization`,
        },

        dateModified:
            PAGE_UPDATED,

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
                            collectionJsonLd
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

            <QuickAnswer
                updated={PAGE_UPDATED}
                className="pt-10"
            >
                {`${
                    testimonials.length > 0
                        ? `This page shares ${testimonials.length} testimonials from Medcity Overseas students`
                        : "This page shares testimonials from Medcity Overseas students"
                } about their study abroad journeys: choosing a country and course, university admissions, student visas and preparing to leave. Medcity Overseas is a study abroad consultancy in Kerala offering free counselling.`}
            </QuickAnswer>

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

            <div className="space-y-14 bg-white py-14 sm:py-16">
                <QuestionAnswer
                    eyebrow="How we help"
                    question="How does Medcity Overseas support students like these?"
                    answer="Medcity Overseas supports students from the first counselling session to departure. Counsellors help shortlist universities and courses, prepare applications and documents, plan English or German language tests, and guide the student visa and pre-departure steps. The testimonials on this page come from students who went through this process."
                    points={[
                        { title: "Counselling", text: "a free session to review your profile and goals." },
                        { title: "Applications", text: "shortlisting, documents and university applications." },
                        { title: "Language tests", text: "IELTS, PTE, OET or German language preparation." },
                        { title: "Visa and departure", text: "student visa guidance and pre-departure support." },
                    ]}
                />

                <p className="mx-auto max-w-5xl px-4 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                    Start with the{" "}
                    <Link href="/destinations" className="font-bold text-primary hover:underline">
                        study destinations
                    </Link>
                    , compare{" "}
                    <Link href="/universities" className="font-bold text-primary hover:underline">
                        universities
                    </Link>{" "}
                    and{" "}
                    <Link href="/popular-courses" className="font-bold text-primary hover:underline">
                        popular courses
                    </Link>
                    , or find your nearest{" "}
                    <Link href="/branches" className="font-bold text-primary hover:underline">
                        Medcity branch
                    </Link>
                    .
                </p>

                <FaqList
                    path={PAGE_PATH}
                    faqs={FAQS}
                />

                <OfficialSources
                    title="Official visa information"
                    links={STUDY_ABROAD_SOURCES}
                />
            </div>
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
