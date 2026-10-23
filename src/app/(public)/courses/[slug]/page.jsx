import { cache } from "react";

import { notFound } from "next/navigation";

import { findCourseBySlug } from "@/lib/courseIndex";
import { callLegacy } from "@/lib/legacy";
import { createSlug } from "@/lib/slug";
import { createUniversityPublicSlug } from "@/lib/universitySlug";

import CourseDetailsClient from "./CourseDetailsClient";
import { withSeoOverrides } from "@/lib/pageSeo";

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

function present(value) {
    const text = clean(value);

    return text && text !== "0" && text.toLowerCase() !== "null" ? text : "";
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
        intakes: present(course.intakes),
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
    const description = describe(facts);
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

function structuredData(loaded) {
    const facts = courseFacts(loaded.course);
    const url = `${SITE_URL}/courses/${loaded.slug}`;
    const universitySlug = createUniversityPublicSlug({ name: facts.university });
    const universityUrl = universitySlug ? `${SITE_URL}/universities/${universitySlug}` : undefined;
    const countrySlug = facts.country ? createSlug(facts.country) : "";

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

    return {
        "@context": "https://schema.org",
        "@graph": [
            course,
            {
                "@type": "BreadcrumbList",
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

export default async function CourseDetailsPage({ params }) {
    const { slug } = await params;
    const loaded = await loadCourse(slug);

    if (!loaded) {
        notFound();
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData(loaded)).replace(/</g, "\\u003c"),
                }}
            />

            <CourseDetailsClient slug={loaded.slug} initialCourse={loaded.course} />
        </>
    );
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);
