import "server-only";

import { cache } from "react";

import { normalizeBlogHtml, parseFaqs, parseGallery, blogPlainText } from "@/lib/blogHtml";
import { blogPublicSlug } from "@/lib/blogSlug";
import { query } from "@/lib/db";
import { imagePath } from "@/lib/legacy/util";

/*
 * Published blog posts for the public pages, read straight from the
 * database. A database failure throws (the page answers with a
 * temporary error and Google retries); an unknown address is a 404.
 */

export const SITE_URL = "https://medcityoverseas.com";
export const DEFAULT_AUTHOR = "Medcity Overseas Editorial Team";

export function blogImageUrl(value) {
    const image = String(value ?? "").trim();

    if (!image) {
        return "";
    }

    if (/^\/media\/\d+$/.test(image) || /^https?:\/\//i.test(image)) {
        return image;
    }

    return `${imagePath("blog/")}${image.replace(/^\/+/, "")}`;
}

export function absoluteUrl(value) {
    if (!value) {
        return "";
    }

    return value.startsWith("/") ? `${SITE_URL}${value}` : value;
}

/** "2026-10-23 16:12:00" or "2026-10-23" -> ISO string in India time. */
export function isoDateTime(value) {
    const text = String(value ?? "").trim();

    if (!text) {
        return undefined;
    }

    const parsed = Date.parse(text.length === 10 ? `${text}T09:00:00+05:30` : `${text.replace(" ", "T")}+05:30`);

    return Number.isNaN(parsed) ? undefined : new Date(parsed).toISOString();
}

const DISPLAY_DATE = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
});

export function displayDate(value) {
    const text = String(value ?? "").trim();
    const iso = /T.*Z$/.test(text) ? text : isoDateTime(text);
    const date = iso ? new Date(iso) : null;

    return date && !Number.isNaN(date.getTime()) ? DISPLAY_DATE.format(date) : "";
}

/** Old titles sometimes end in "| Medcity Study Abroad"; the page adds the brand itself. */
export function cleanPostTitle(value) {
    return String(value ?? "")
        .replace(/\s*[|–-]\s*Medcity( Study Abroad| Overseas)?\s*$/i, "")
        .trim();
}

export const getPublishedPosts = cache(async () => {
    return query(
        `SELECT * FROM tb_blog_web
         WHERE status IS NULL OR status <> '0'
         ORDER BY created_date DESC, id DESC`
    );
});

function excerptOf(post) {
    const text =
        String(post.meta_description || post.summary || "").trim() ||
        blogPlainText(normalizeBlogHtml(post.blog).html);

    return text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, "")}…` : text;
}

function toView(post) {
    const body = normalizeBlogHtml(post.blog);
    const published = isoDateTime(post.created_date) || isoDateTime(post.date);
    const updated = isoDateTime(post.updated_at);

    return {
        id: post.id,
        slug: blogPublicSlug(post),
        title: cleanPostTitle(post.title),
        intro: String(post.meta_description ?? "").trim(),
        metaTitle: String(post.meta_title ?? "").trim(),
        excerpt: excerptOf(post),
        metaDescription: String(post.meta_description ?? "").trim() || excerptOf(post),
        summary: String(post.summary ?? "").trim(),
        focusKeyword: String(post.focus_keyword ?? "").trim(),
        html: body.html,
        headings: body.headings,
        faqs: parseFaqs(post.faqs),
        gallery: parseGallery(post.gallery).map((photo) => ({ ...photo, src: blogImageUrl(photo.src) })),
        cover: blogImageUrl(post.image_land || post.image_prt),
        coverAlt: String(post.alt_text1 ?? "").trim() || cleanPostTitle(post.title),
        author: String(post.author_name ?? "").trim(),
        reviewer: String(post.reviewer_name ?? "").trim(),
        published,
        updated: updated && published && updated.slice(0, 10) > published.slice(0, 10) ? updated : undefined,
        readingTime: String(post.duration ?? "").trim(),
        link: String(post.link ?? "").trim(),
        wordCount: blogPlainText(post.blog).split(" ").filter(Boolean).length,
        legacySections: [1, 2, 3]
            .map((n) => ({ heading: post[`subheading${n}`], text: post[`subtext${n}`] }))
            .filter((section) => String(section.heading ?? "").trim() || String(section.text ?? "").trim()),
    };
}

/**
 * { post, related } for an address, { redirect } when the address is an
 * old one, or null when no published post has it.
 */
export async function findPostBySlug(rawSlug) {
    let slug = "";

    try {
        slug = decodeURIComponent(String(rawSlug ?? "")).trim().toLowerCase();
    } catch {
        return null;
    }

    if (!slug) {
        return null;
    }

    const posts = await getPublishedPosts();
    const match = posts.find((post) => blogPublicSlug(post) === slug);

    if (!match) {
        const moved = posts.find((post) =>
            String(post.old_slugs ?? "")
                .split(",")
                .map((item) => item.trim())
                .includes(slug)
        );

        return moved ? { redirect: blogPublicSlug(moved) } : null;
    }

    const related = posts
        .filter((post) => post.id !== match.id)
        .slice(0, 3)
        .map((post) => {
            const view = toView(post);

            return {
                slug: view.slug,
                title: view.title,
                excerpt: view.excerpt,
                cover: view.cover,
                coverAlt: view.coverAlt,
                published: view.published,
                readingTime: view.readingTime,
            };
        });

    return { post: toView(match), related };
}
