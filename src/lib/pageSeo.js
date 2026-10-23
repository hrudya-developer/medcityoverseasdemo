import "server-only";

import { cache } from "react";

import { headers } from "next/headers";

import { parseFaqs, parseGallery } from "@/lib/blogHtml";
import { query, queryOne } from "@/lib/db";
import { templateOutputsFaqSchema } from "@/lib/faqSchemaPaths";
import { imagePath, now } from "@/lib/legacy/util";

/*
 * Search and AI-answer edits for any page, made in the admin's SEO
 * manager (table web_page_seo, db/004_page_seo.sql), keyed by the
 * page's public address, e.g. "/study-in-uk" or "/universities/aalto-university".
 *
 * Every field is optional: an empty field keeps what the page itself
 * provides. The page address reaches the app through src/proxy.js.
 */

export const SITE_URL = "https://medcityoverseas.com";

export function normalisePath(value) {
    let path = String(value ?? "").trim();

    try {
        if (/^https?:\/\//i.test(path)) {
            path = new URL(path).pathname;
        }
    } catch {
        return "";
    }

    path = path.split(/[?#]/)[0].replace(/\/+$/, "");

    if (!path.startsWith("/")) {
        path = `/${path}`;
    }

    return path.length > 250 || /\s/.test(path) ? "" : path || "/";
}

export async function currentPagePath() {
    const list = await headers();

    return normalisePath(list.get("x-page-path") || "");
}

function mediaUrl(value) {
    const image = String(value ?? "").trim();

    if (!image) {
        return "";
    }

    if (/^\/media\/\d+$/.test(image) || /^https?:\/\//i.test(image)) {
        return image;
    }

    return `${imagePath("")}${image.replace(/^\/+/, "")}`;
}

export const getPageSeo = cache(async (rawPath) => {
    const path = normalisePath(rawPath);

    if (!path) {
        return null;
    }

    try {
        const row = await queryOne("SELECT * FROM web_page_seo WHERE path = ?", [path]);

        if (!row) {
            return null;
        }

        return {
            path,
            metaTitle: String(row.meta_title ?? "").trim(),
            metaDescription: String(row.meta_description ?? "").trim(),
            focusKeyword: String(row.focus_keyword ?? "").trim(),
            ogImage: mediaUrl(row.og_image),
            ogImageRaw: String(row.og_image ?? "").trim(),
            ogImageAlt: String(row.og_image_alt ?? "").trim(),
            summary: String(row.summary ?? "").trim(),
            faqs: parseFaqs(row.faqs),
            gallery: parseGallery(row.gallery).map((photo) => ({ ...photo, url: mediaUrl(photo.src) })),
            updatedAt: row.updated_at,
            updatedBy: row.updated_by,
        };
    } catch (error) {
        // Before db/004 is run the table does not exist: pages simply
        // show without edits. Any other error is real.
        if (error?.code === "ER_NO_SUCH_TABLE") {
            return null;
        }

        throw error;
    }
});

function questionKey(question) {
    return String(question ?? "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

/**
 * The FAQs for a template's FAQPage markup: its own, then the ones added
 * to this page in the admin's SEO manager that it does not already ask.
 * Only on templates listed in lib/faqSchemaPaths.js, where PageSeoExtras
 * shows the admin's FAQs without a FAQPage block of its own.
 */
export async function faqsWithPageSeo(faqs = []) {
    const own = (faqs ?? []).filter((faq) => faq?.question && faq?.answer);
    const path = await currentPagePath();

    if (!path || !templateOutputsFaqSchema(path)) {
        return own;
    }

    const extra = (await getPageSeo(path))?.faqs ?? [];
    const asked = new Set(own.map((faq) => questionKey(faq.question)));

    return [...own, ...extra.filter((faq) => !asked.has(questionKey(faq.question)))];
}

/**
 * The same for a JSON-LD object a template already built: its FAQPage
 * node (at the top or in @graph) gets the admin's FAQs added. A FAQPage
 * in @graph that ends up with no questions is dropped, so templates can
 * always include one. Data without a FAQPage comes back unchanged.
 */
export async function withPageSeoFaqs(data) {
    const isFaqPage = (node) => [].concat(node?.["@type"]).includes("FAQPage");
    const graph = Array.isArray(data?.["@graph"]) ? data["@graph"] : null;
    const node = graph ? graph.find(isFaqPage) : isFaqPage(data) ? data : null;

    if (!node) {
        return data;
    }

    const own = (node.mainEntity ?? [])
        .map((item) => ({ question: item?.name, answer: item?.acceptedAnswer?.text }))
        .filter((faq) => faq.question && faq.answer);
    const added = (await faqsWithPageSeo(own)).slice(own.length);
    const mainEntity = [
        ...(node.mainEntity ?? []),
        ...added.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    ];

    if (!graph) {
        return added.length ? { ...node, mainEntity } : data;
    }

    return {
        ...data,
        "@graph": mainEntity.length
            ? graph.map((item) => (item === node ? { ...node, mainEntity } : item))
            : graph.filter((item) => item !== node),
    };
}

function absolute(url) {
    return url && url.startsWith("/") ? `${SITE_URL}${url}` : url;
}

export const DEFAULT_OG_IMAGE = {
    url: "/og-images/default.webp",
    width: 1200,
    height: 630,
    alt: "Medcity Overseas study abroad consultants in Kerala",
};

const BRAND_SUFFIX = /\s*\|\s*Medcity Overseas\s*$/i;

/*
 * Fixes every page gets, with or without admin edits:
 * - A page that sets openGraph without images replaces the layout's
 *   share image (metadata merges shallowly), so the default is put back.
 * - A plain string title that already ends in the brand would get the
 *   layout's "%s | Medcity Overseas" template a second time.
 */
function withSiteDefaults(metadata) {
    const next = { ...metadata };

    if (typeof next.title === "string" && BRAND_SUFFIX.test(next.title)) {
        next.title = { absolute: next.title };
    }

    if (next.openGraph && !next.openGraph.images) {
        next.openGraph = { ...next.openGraph, images: [DEFAULT_OG_IMAGE] };
    }

    if (next.twitter && !next.twitter.images) {
        next.twitter = { ...next.twitter, images: [DEFAULT_OG_IMAGE.url] };
    }

    return next;
}

/**
 * Merge the admin's edits into a page's own metadata. Pages call this
 * from generateMetadata; fields left empty in the admin change nothing.
 */
export async function applySeoOverrides(metadata) {
    const base = withSiteDefaults(metadata ?? {});
    const seo = await getPageSeo(await currentPagePath());

    if (!seo) {
        return base;
    }

    const next = { ...base };

    if (seo.metaTitle) {
        next.title = { absolute: `${seo.metaTitle.replace(BRAND_SUFFIX, "")} | Medcity Overseas` };
    }

    if (seo.metaDescription) {
        next.description = seo.metaDescription;
    }

    if (seo.focusKeyword) {
        next.keywords = [seo.focusKeyword, ...[].concat(base.keywords ?? []).filter((item) => item !== seo.focusKeyword)];
    }

    const ogTitle = seo.metaTitle || base.openGraph?.title;
    const ogDescription = seo.metaDescription || base.openGraph?.description;
    const ogImages = seo.ogImage
        ? [{ url: absolute(seo.ogImage), width: 1200, height: 630, alt: seo.ogImageAlt || seo.metaTitle || "" }]
        : base.openGraph?.images;

    next.openGraph = {
        ...(base.openGraph ?? {}),
        ...(ogTitle ? { title: ogTitle } : {}),
        ...(ogDescription ? { description: ogDescription } : {}),
        ...(ogImages ? { images: ogImages } : {}),
    };

    next.twitter = {
        ...(base.twitter ?? {}),
        card: "summary_large_image",
        ...(ogTitle ? { title: ogTitle } : {}),
        ...(ogDescription ? { description: ogDescription } : {}),
        ...(seo.ogImage ? { images: [absolute(seo.ogImage)] } : {}),
    };

    return next;
}

/** Wrap a page's generateMetadata so admin edits apply on top of it. */
export function withSeoOverrides(generate) {
    return async (props) => applySeoOverrides(await generate(props));
}

/* =========================================================
   ADMIN
========================================================= */

export class PageSeoError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

function cleanText(value, max) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanMultiline(value, max) {
    return String(value ?? "")
        .replace(/\r\n?/g, "\n")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
        .slice(0, max);
}

function cleanImage(value) {
    const text = String(value ?? "").trim();

    if (!text) {
        return "";
    }

    if (/^\/media\/\d+$/.test(text) || /^https?:\/\/\S+$/i.test(text)) {
        return text.slice(0, 500);
    }

    throw new PageSeoError("The image address is not valid.");
}

export async function savePageSeo(input, adminEmail) {
    const path = normalisePath(input?.path);

    if (!path) {
        throw new PageSeoError("Enter the page address, e.g. /study-in-uk.");
    }

    if (path.startsWith("/admin") || path.startsWith("/dashboard") || path.startsWith("/api")) {
        throw new PageSeoError("That part of the site is not public.");
    }

    const faqs = (Array.isArray(input?.faqs) ? input.faqs : [])
        .map((item) => ({ question: cleanText(item?.question, 300), answer: cleanMultiline(item?.answer, 1500) }))
        .filter((item) => item.question || item.answer);

    if (faqs.some((item) => !item.question || !item.answer)) {
        throw new PageSeoError("Every FAQ needs both a question and an answer.");
    }

    if (faqs.length > 15) {
        throw new PageSeoError("Keep it to 15 FAQs or fewer.");
    }

    const gallery = (Array.isArray(input?.gallery) ? input.gallery : []).map((item) => {
        const src = cleanImage(item?.src);
        const alt = cleanText(item?.alt, 200);

        if (!src || !alt) {
            throw new PageSeoError("Every photo needs an image and a short description.");
        }

        return { src, alt };
    });

    if (gallery.length > 20) {
        throw new PageSeoError("Keep it to 20 photos or fewer.");
    }

    const ogImage = cleanImage(input?.og_image);
    const ogImageAlt = cleanText(input?.og_image_alt, 250);

    if (ogImage && !ogImageAlt) {
        throw new PageSeoError("Add a short description of the share image.");
    }

    const values = [
        cleanText(input?.meta_title, 255),
        cleanText(input?.meta_description, 400),
        cleanText(input?.focus_keyword, 191),
        ogImage,
        ogImageAlt,
        cleanMultiline(input?.summary, 1200),
        faqs.length ? JSON.stringify(faqs) : null,
        gallery.length ? JSON.stringify(gallery) : null,
        String(adminEmail ?? "").slice(0, 191),
        now(),
    ];

    await query(
        `INSERT INTO web_page_seo
            (path, meta_title, meta_description, focus_keyword, og_image, og_image_alt, summary, faqs, gallery, updated_by, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
            meta_title = VALUES(meta_title), meta_description = VALUES(meta_description),
            focus_keyword = VALUES(focus_keyword), og_image = VALUES(og_image), og_image_alt = VALUES(og_image_alt),
            summary = VALUES(summary), faqs = VALUES(faqs), gallery = VALUES(gallery),
            updated_by = VALUES(updated_by), updated_at = VALUES(updated_at)`,
        [path, ...values]
    );

    return { path };
}

export async function listPageSeo() {
    return query("SELECT path, meta_title, updated_at FROM web_page_seo");
}
