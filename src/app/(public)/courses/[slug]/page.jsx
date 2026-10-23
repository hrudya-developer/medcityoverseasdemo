import { cache } from "react";

import { notFound } from "next/navigation";

import { findCourseBySlug } from "@/lib/courseIndex";
import { getLiveDestination, universitiesPageIndexable } from "@/lib/destinationSummary";
import { callLegacy } from "@/lib/legacy";
import { intakeList, recordedValue } from "@/lib/recordValue";
import { countrySlug as toCountrySlug } from "@/lib/sitemapData";
import { createUniversityPublicSlug } from "@/lib/universitySlug";

import CourseDetailsClient from "./CourseDetailsClient";
import { COURSE_TEMPLATE_UPDATED, CourseInShort, CourseLinks } from "./components/CourseSeoSections";
import { formatCourseDetails } from "./utils/courseDetailsHelpers";
import { createCourseFaqs } from "./utils/courseFaqs";
import { withPageSeoFaqs, withSeoOverrides } from "@/lib/pageSeo";
import { faqPageNode, latestDate, organizationNode, websiteNode } from "@/lib/seoSchema";

const SITE_URL = "https://medcityoverseas.com";

export const dynamic = "force-dynamic";

/*
 * Course pages are rendered on the server from the database, so the
 * first response (what Google and AI crawlers read) already holds the
 * course name, university, facts and structured data. An unknown
 * address is a real 404; a database failure throws (a temporary server
 * error) so a crawler retries instead of dropping the page.
 */

function clean(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
}

// "0", "-", "N/A" and empty dates are not values.
function present(value) {
    return recordedValue(value);
}

const loadCourse = cache(async (rawSlug) => {
    const slug = clean(rawSlug).toLowerCase();
    const entry = await findCourseBySlug(slug);

    if (!entry) {
        return null;
    }

    const result = await callLegacy("getCoursedetails", {
        uid: "0",
        id: entry.id,
    });

    const course = Array.isArray(result?.course) ? result.course[0] ?? null : null;

    if (!course) {
        return null;
    }

    return {
        slug: entry.slug,
        course,
        universityImagePath: result?.universities_image_path ?? "",
    };
});

function courseFacts(course) {
    return {
        name: present(course.course),
        university: present(course.university),
        country: present(course.country),
        location: present(course.location),
        level: present(course.level),
        duration: present(course.duration),
        intakes: intakeList(course.intakes).join(", "),
        deadline: present(course.deadline),
        category: present(course.name),
    };
}

function describe(facts) {
    const where = [facts.location, facts.country].filter(Boolean).join(", ");

    const parts = [
        `${facts.name} at ${facts.university}${where ? ` (${where})` : ""}.`,
        facts.level && `Level: ${facts.level}.`,
        facts.duration && `Duration: ${facts.duration}.`,
        facts.intakes && `Intakes: ${facts.intakes}.`,
        "Entry requirements, English test scores and application help from Medcity Overseas.",
    ].filter(Boolean);

    return parts.join(" ").slice(0, 300);
}

/** A 120 to 160 character meta description from the course facts. */
function metaDescription(facts) {
    const where = [facts.location, facts.country].filter(Boolean).join(", ");
    const endings = [
        "Entry requirements and application help from Medcity Overseas.",
        "Entry requirements and help from Medcity Overseas.",
        "Apply with Medcity Overseas.",
    ];
    let text = `${facts.name} at ${facts.university}${where ? ` (${where})` : ""}.`;

    for (const extra of [facts.level && `Level: ${facts.level}.`, facts.duration && `Duration: ${facts.duration}.`, facts.intakes && `Intakes: ${facts.intakes}.`]) {
        if (extra && `${text} ${extra}`.length <= 160 - 30) {
            text = `${text} ${extra}`;
        }
    }

    const ending = endings.find((item) => `${text} ${item}`.length <= 160);

    if (ending) {
        return `${text} ${ending}`;
    }

    return text.length <= 160 ? text : `${text.slice(0, 157).replace(/\s+\S*$/, "")}...`;
}

function imageUrl(base, file) {
    const name = present(file);

    if (!name) {
        return `${SITE_URL}/og-images/default.webp`;
    }

    if (/^https?:\/\//i.test(name)) {
        return name;
    }

    return `${String(base).replace(/\/+$/, "")}/${name.replace(/^\/+/, "")}`;
}

async function pageGenerateMetadata({ params }) {
    const { slug } = await params;
    const loaded = await loadCourse(slug);

    if (!loaded) {
        return {
            title: { absolute: "Course not found | Medcity Overseas" },
            robots: { index: false, follow: true },
        };
    }

    const facts = courseFacts(loaded.course);
    const title = `${facts.name} at ${facts.university}${facts.country ? `, ${facts.country}` : ""}`;
    const description = metaDescription(facts);
    const url = `${SITE_URL}/courses/${loaded.slug}`;
    const image = imageUrl(loaded.universityImagePath, loaded.course.image || loaded.course.logo);

    return {
        title: { absolute: `${title} | Medcity Overseas` },
        description,
        alternates: { canonical: `/courses/${loaded.slug}` },
        openGraph: {
            type: "website",
            locale: "en_IN",
            url,
            siteName: "Medcity Overseas",
            title,
            description,
            images: [{ url: image, alt: `${facts.university}` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        robots: { index: true, follow: true },
    };
}

function structuredData(loaded, universitiesIndexable) {
    const facts = courseFacts(loaded.course);
    const url = `${SITE_URL}/courses/${loaded.slug}`;
    const universitySlug = createUniversityPublicSlug({ name: facts.university });
    const universityUrl = universitySlug ? `${SITE_URL}/universities/${universitySlug}` : undefined;
    // The country step links /universities-in-<country>, so it is left
    // out when that page is noindex.
    const countrySlug = universitiesIndexable && facts.country ? toCountrySlug(facts.country) : "";

    const course = {
        "@type": "Course",
        "@id": `${url}#course`,
        name: facts.name,
        description: describe(facts),
        url,
        provider: {
            "@type": "CollegeOrUniversity",
            name: facts.university,
            ...(universityUrl ? { url: universityUrl } : {}),
            ...(facts.location || facts.country
                ? {
                      address: {
                          "@type": "PostalAddress",
                          ...(facts.location ? { addressLocality: facts.location } : {}),
                          ...(facts.country ? { addressCountry: facts.country } : {}),
                      },
                  }
                : {}),
        },
        ...(facts.level ? { educationalLevel: facts.level } : {}),
        ...(facts.category ? { about: facts.category } : {}),
        hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Onsite",
            ...(facts.location || facts.country
                ? { location: [facts.location, facts.country].filter(Boolean).join(", ") }
                : {}),
        },
    };

    const crumbs = [
        { name: "Home", item: SITE_URL },
        { name: "Courses", item: `${SITE_URL}/courses` },
        ...(countrySlug
            ? [{ name: `Universities in ${facts.country}`, item: `${SITE_URL}/universities-in-${countrySlug}` }]
            : []),
        ...(universityUrl ? [{ name: facts.university, item: universityUrl }] : []),
        { name: facts.name, item: url },
    ];

    const details = formatCourseDetails(loaded.course);
    const faqs = createCourseFaqs({ course: loaded.course, details });

    return {
        "@context": "https://schema.org",
        "@graph": [
            organizationNode(),
            websiteNode(),
            {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: `${facts.name} at ${facts.university}`,
                description: metaDescription(facts),
                inLanguage: "en-IN",
                isPartOf: { "@id": `${SITE_URL}/#website` },
                about: { "@id": `${url}#course` },
                publisher: { "@id": `${SITE_URL}/#organization` },
                author: { "@id": `${SITE_URL}/#organization` },
                dateModified: courseUpdated(loaded.course),
                breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            course,
            faqPageNode(`/courses/${loaded.slug}`, faqs),
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: crumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.name,
                    item: crumb.item,
                })),
            },
        ],
    };
}

function courseUpdated(course) {
    return latestDate(course?.created_at, course?.created_date, COURSE_TEMPLATE_UPDATED);
}

export default async function CourseDetailsPage({ params }) {
    const { slug } = await params;
    const loaded = await loadCourse(slug);

    if (!loaded) {
        notFound();
    }

    const facts = courseFacts(loaded.course);
    const universitySlug = createUniversityPublicSlug({ name: facts.university });
    const countrySlug = facts.country ? toCountrySlug(facts.country) : "";
    const [countryLive, universitiesIndexable] = countrySlug
        ? await Promise.all([getLiveDestination(countrySlug).then(Boolean), universitiesPageIndexable(countrySlug)])
        : [false, false];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(await withPageSeoFaqs(structuredData(loaded, universitiesIndexable))).replace(/</g, "\\u003c"),
                }}
            />

            <CourseDetailsClient
                slug={loaded.slug}
                initialCourse={loaded.course}
                summary={<CourseInShort facts={facts} updated={courseUpdated(loaded.course)} />}
            >
                <CourseLinks
                    facts={facts}
                    universityPath={universitySlug ? `/universities/${universitySlug}` : ""}
                    countrySlug={countrySlug}
                    countryLive={countryLive}
                    universitiesIndexable={universitiesIndexable}
                />
            </CourseDetailsClient>
        </>
    );
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);
