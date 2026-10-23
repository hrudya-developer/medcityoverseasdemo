import "server-only";

import { centers, getCenterUrl } from "@/app/(public)/branches/data/centersData";
import { blogPublicSlug } from "@/lib/blogSlug";
import { listCourses } from "@/lib/courseIndex";
import { query } from "@/lib/db";
import { getGermanProgramsList } from "@/lib/germanPrograms";
import { createSlug } from "@/lib/slug";
import { createUniversityPublicSlug } from "@/lib/universitySlug";

/*
 * Everything the sitemap lists, straight from the database and the
 * branch data, so new universities, courses and blog posts appear in
 * it without anyone editing a file.
 *
 * Only pages that exist and have content are listed: hidden records,
 * drafts and countries without universities are left out.
 */

export const SITE_URL = "https://medcityoverseas.com";

export const COURSES_PER_SITEMAP = 40000;

const COUNTRY_SLUG_ALIASES = {
    "United Kingdom": "uk",
    "United States": "usa",
    "United States of America": "usa",
};

export function countrySlug(name) {
    const text = String(name ?? "").trim();

    return COUNTRY_SLUG_ALIASES[text] || createSlug(text);
}

function isoDate(value) {
    const text = String(value ?? "").trim();

    if (!text) {
        return undefined;
    }

    const parsed = Date.parse(text.length === 10 ? `${text}T00:00:00Z` : text.replace(" ", "T") + "+05:30");

    return Number.isNaN(parsed) ? undefined : new Date(parsed).toISOString();
}

const STATIC_PAGES = [
    ["/", "daily", 1.0],
    ["/destinations", "weekly", 0.9],
    ["/universities", "weekly", 0.9],
    ["/courses", "weekly", 0.9],
    ["/popular-courses", "weekly", 0.8],
    ["/study-in-germany", "weekly", 0.9],
    ["/study-in-germany/nursing-ausbildung", "monthly", 0.8],
    ["/placement-assistance-nursing", "monthly", 0.8],
    ["/msc-nursing-in-uk", "monthly", 0.8],
    ["/nursing-in-germany-for-indian-nurses", "monthly", 0.8],
    ["/study-abroad-for-nurses", "monthly", 0.8],
    ["/study-abroad-without-ielts", "monthly", 0.8],
    ["/study-abroad-after-12th", "monthly", 0.8],
    ["/student-visa-guidance", "monthly", 0.8],
    ["/migrate-to-canada", "monthly", 0.7],
    ["/migrate-to-australia", "monthly", 0.7],
    ["/add-on-services", "monthly", 0.6],
    ["/blogs", "weekly", 0.8],
    ["/branches", "monthly", 0.7],
    ["/about-us", "monthly", 0.6],
    ["/contact-us", "monthly", 0.6],
    ["/all-testimonials", "monthly", 0.5],
    ["/community-posts", "weekly", 0.4],
    ["/privacy-policy", "yearly", 0.2],
];

export async function pageEntries() {
    const [destinations, germanPrograms] = await Promise.all([
        query(
            `SELECT d.id, d.country,
                    (SELECT COUNT(*) FROM tb_universities u WHERE u.d_id = d.id AND u.status = '1') AS universities
             FROM tb_destinations d
             WHERE d.status = '1'
             ORDER BY d.order ASC`
        ),
        getGermanProgramsList(6, { throwOnError: true }),
    ]);

    const entries = STATIC_PAGES.map(([path, changeFrequency, priority]) => ({
        url: `${SITE_URL}${path === "/" ? "" : path}`,
        changeFrequency,
        priority,
    }));

    for (const destination of destinations) {
        const slug = countrySlug(destination.country);

        if (!slug) {
            continue;
        }

        entries.push({
            url: `${SITE_URL}/study-in-${slug}`,
            changeFrequency: "weekly",
            priority: 0.9,
        });

        if (Number(destination.universities) > 0) {
            entries.push({
                url: `${SITE_URL}/universities-in-${slug}`,
                changeFrequency: "weekly",
                priority: 0.8,
            });
        }
    }

    for (const program of germanPrograms?.programs ?? []) {
        const slug = createSlug(program?.name || program?.title || "");

        if (slug) {
            entries.push({
                url: `${SITE_URL}/study-in-germany/${slug}`,
                changeFrequency: "monthly",
                priority: 0.8,
            });
        }
    }

    for (const center of centers) {
        const path = getCenterUrl(center);

        if (path) {
            entries.push({
                url: path.startsWith("http") ? path : `${SITE_URL}${path}`,
                changeFrequency: "monthly",
                priority: 0.7,
            });
        }
    }

    return dedupe(entries);
}

export async function universityEntries() {
    const rows = await query(
        `SELECT id, name, created_at FROM tb_universities
         WHERE status = '1' ORDER BY id ASC`
    );

    return dedupe(
        rows
            .map((row) => {
                const slug = createUniversityPublicSlug(row);

                return slug
                    ? {
                          url: `${SITE_URL}/universities/${slug}`,
                          lastModified: isoDate(row.created_at),
                          changeFrequency: "monthly",
                          priority: 0.7,
                      }
                    : null;
            })
            .filter(Boolean)
    );
}

export async function courseEntries(part = 1) {
    const courses = await listCourses();
    const start = (part - 1) * COURSES_PER_SITEMAP;

    return courses.slice(start, start + COURSES_PER_SITEMAP).map((course) => ({
        url: `${SITE_URL}/courses/${course.slug}`,
        lastModified: isoDate(course.createdAt),
        changeFrequency: "monthly",
        priority: 0.6,
    }));
}

export async function courseSitemapCount() {
    const courses = await listCourses();

    return Math.max(1, Math.ceil(courses.length / COURSES_PER_SITEMAP));
}

export async function blogEntries() {
    const rows = await query(
        `SELECT title, slug, created_date, updated_at FROM tb_blog_web
         WHERE status IS NULL OR status <> '0'
         ORDER BY id DESC`
    );

    return dedupe(
        rows.map((row) => ({
            url: `${SITE_URL}/blog-details/${blogPublicSlug(row)}`,
            lastModified: isoDate(row.updated_at || row.created_date),
            changeFrequency: "monthly",
            priority: 0.7,
        }))
    );
}

function dedupe(entries) {
    const seen = new Set();

    return entries.filter((entry) => {
        if (seen.has(entry.url)) {
            return false;
        }

        seen.add(entry.url);

        return true;
    });
}

function escapeXml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function urlsetXml(entries) {
    const body = entries
        .map((entry) =>
            [
                "  <url>",
                `    <loc>${escapeXml(entry.url)}</loc>`,
                entry.lastModified ? `    <lastmod>${entry.lastModified}</lastmod>` : "",
                entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : "",
                entry.priority !== undefined ? `    <priority>${entry.priority.toFixed(1)}</priority>` : "",
                "  </url>",
            ]
                .filter(Boolean)
                .join("\n")
        )
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function indexXml(paths) {
    const now = new Date().toISOString();
    const body = paths
        .map((path) => `  <sitemap>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`)
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function xmlResponse(xml) {
    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
