/*
 * Shared structured data (JSON-LD) for the public pages: the Medcity
 * Overseas organisation, the website, a page node and its breadcrumb.
 * Templates pass these to <PageSchema> instead of repeating them, and
 * other page schemas can point at ORG_ID and WEBSITE_ID.
 */

export const SITE_URL = "https://medcityoverseas.com";
export const SITE_NAME = "Medcity Overseas";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const CONTACT_PHONE = "+919072982555";
export const CONTACT_PHONE_DISPLAY = "+91 90729 82555";
export const CONTACT_WHATSAPP = "https://wa.me/919072982555";

export function pageUrl(path) {
    const clean = String(path || "/");

    return clean === "/" ? SITE_URL : `${SITE_URL}${clean.startsWith("/") ? clean : `/${clean}`}`;
}

export function absoluteUrl(url) {
    const value = String(url ?? "").trim();

    if (!value) return "";
    if (/^https?:\/\//i.test(value)) return value;

    return pageUrl(value);
}

/** ISO date (YYYY-MM-DD) from a Date, a timestamp or a date string, or "". */
export function isoDate(value) {
    if (!value) return "";

    const date = value instanceof Date ? value : new Date(typeof value === "number" ? value : String(value).replace(" ", "T"));

    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

/** The latest of several dates, as YYYY-MM-DD, or "". */
export function latestDate(...values) {
    return values.map(isoDate).filter(Boolean).sort().pop() ?? "";
}

/** "23 October 2026" for a visible "Last updated" line. */
export function displayDate(value) {
    const iso = isoDate(value);

    if (!iso) return "";

    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

export function organizationNode() {
    return {
        "@type": "EducationalOrganization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: "Medcity International Overseas Corporation",
        alternateName: "Medcity Study Abroad",
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
            width: 512,
            height: 512,
        },
        telephone: CONTACT_PHONE,
        email: "info@mioc.in",
        areaServed: { "@type": "Country", name: "India" },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: CONTACT_PHONE,
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["English", "Malayalam"],
        },
    };
}

export function websiteNode() {
    return {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
    };
}

/** items: [{ name, path }], Home first. The last item is this page. */
export function breadcrumbNode(path, items) {
    return {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl(path)}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: pageUrl(item.path),
        })),
    };
}

export function webPageNode({ path, type = "WebPage", name, description, dateModified, image, about, mainEntity, breadcrumb = true }) {
    const url = pageUrl(path);

    return {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        ...(description ? { description } : {}),
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        author: { "@id": ORG_ID },
        ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
        ...(dateModified ? { dateModified } : {}),
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : {}),
        ...(about ? { about } : {}),
        ...(mainEntity ? { mainEntity } : {}),
    };
}

export function faqPageNode(path, faqs, id = "faq") {
    return {
        "@type": "FAQPage",
        "@id": `${pageUrl(path)}#${id}`,
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}

export function jsonLdString(data) {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** "a, b and c" for readable sentences built from data. */
export function joinList(items) {
    const list = (items ?? []).filter(Boolean);

    return list.length <= 1 ? list.join("") : `${list.slice(0, -1).join(", ")} and ${list.at(-1)}`;
}
