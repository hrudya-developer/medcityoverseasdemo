import "server-only";

import { blogPublicSlug, createBlogSlug } from "@/lib/blogSlug";
import { blogPlainText, normalizeBlogHtml, parseFaqs, parseGallery, readingTime, sanitizeBlogHtml } from "@/lib/blogHtml";
import { query, queryOne } from "@/lib/db";
import { now, today } from "@/lib/legacy/util";

/*
 * Blog posts for the website (table tb_blog_web), written in /admin.
 *
 * Columns follow what the old Laravel admin wrote, so posts made there
 * and here look the same on the site:
 *   date          "October 5, 2026"  (shown on the page)
 *   created_date  "2026-10-05"
 *   duration      "6 min read"
 *   status        '1' published, '0' draft
 *   image_land / image_prt   cover image (old posts: a file name on the
 *                 old server; new posts: /media/<id>)
 * The subheading/subtext columns are left as they are on edit.
 *
 * Search and AI-answer fields (db/003_blog_seo.sql):
 *   slug             fixed web address; old_slugs keeps earlier ones so
 *                    their links redirect
 *   meta_title / meta_description / focus_keyword
 *   summary          the "quick answer" shown at the top of the post
 *   faqs             JSON list of { question, answer }
 *   gallery          JSON list of { src, alt }: extra photos for the post
 *   author_name / reviewer_name / updated_at
 */

export class BlogError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

const DISPLAY_DATE = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

const MAX_FAQS = 15;
const MAX_GALLERY = 20;

function toIsoDate(value) {
    const text = String(value ?? "").trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(text) && !Number.isNaN(Date.parse(`${text}T00:00:00Z`))) {
        return text;
    }

    return "";
}

/** Best guess at YYYY-MM-DD for an existing post, for the date picker. */
export function blogIsoDate(blog) {
    const fromCreated = toIsoDate(String(blog?.created_date ?? "").slice(0, 10));

    if (fromCreated) {
        return fromCreated;
    }

    const parsed = Date.parse(`${blog?.date ?? ""} UTC`);

    return Number.isNaN(parsed) ? today() : new Date(parsed).toISOString().slice(0, 10);
}

export async function listBlogs() {
    return query(
        `SELECT id, title, slug, date, duration, status, image_land, image_prt, updated_at
         FROM tb_blog_web ORDER BY id DESC`
    );
}

export async function getBlog(id) {
    if (!/^\d{1,10}$/.test(String(id))) {
        return null;
    }

    return queryOne("SELECT * FROM tb_blog_web WHERE id = ?", [String(id)]);
}

/** What the editor needs for an existing post, with its body tidied. */
export function blogForEditor(blog) {
    return {
        title: blog.title || "",
        slug: blogPublicSlug(blog),
        blog: normalizeBlogHtml(blog.blog).html,
        date: blogIsoDate(blog),
        duration: blog.duration || "",
        status: blog.status === "0" ? "0" : "1",
        image: blog.image_land || blog.image_prt || "",
        alt_text1: blog.alt_text1 || "",
        link: blog.link || "",
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
        focus_keyword: blog.focus_keyword || "",
        summary: blog.summary || "",
        faqs: parseFaqs(blog.faqs),
        gallery: parseGallery(blog.gallery),
        author_name: blog.author_name || "",
        reviewer_name: blog.reviewer_name || "",
        updated_at: blog.updated_at || "",
    };
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

    // Uploaded through the admin, an http(s) address, or an old file name.
    if (/^\/media\/\d+$/.test(text) || /^https?:\/\/\S+$/i.test(text) || /^[\w.-]+$/.test(text)) {
        return text.slice(0, 500);
    }

    throw new BlogError("The cover image address is not valid.");
}

function cleanLink(value) {
    const text = String(value ?? "").trim();

    if (!text) {
        return "";
    }

    if (!/^https?:\/\/\S+$/i.test(text)) {
        throw new BlogError("The link must start with http:// or https://.");
    }

    return text.slice(0, 500);
}

function cleanFaqs(value) {
    const list = Array.isArray(value) ? value : [];

    const faqs = list
        .map((item) => ({
            question: cleanText(item?.question, 300),
            answer: cleanMultiline(item?.answer, 1500),
        }))
        .filter((item) => item.question || item.answer);

    if (faqs.some((item) => !item.question || !item.answer)) {
        throw new BlogError("Every FAQ needs both a question and an answer.");
    }

    if (faqs.length > MAX_FAQS) {
        throw new BlogError(`Keep it to ${MAX_FAQS} FAQs or fewer.`);
    }

    return faqs;
}

function cleanGallery(value) {
    const list = Array.isArray(value) ? value : [];

    if (list.length > MAX_GALLERY) {
        throw new BlogError(`Keep the gallery to ${MAX_GALLERY} photos or fewer.`);
    }

    return list.map((item) => {
        const src = cleanImage(item?.src);

        if (!src) {
            throw new BlogError("A gallery photo is missing its image.");
        }

        const alt = cleanText(item?.alt, 200);

        if (!alt) {
            throw new BlogError("Every gallery photo needs a short description.");
        }

        return { src, alt };
    });
}

function validate(input) {
    const title = cleanText(input?.title, 250);

    if (!title) {
        throw new BlogError("Add a title.");
    }

    const blog = sanitizeBlogHtml(input?.blog);

    if (!blogPlainText(blog)) {
        throw new BlogError("The post is empty.");
    }

    const slug = createBlogSlug(cleanText(input?.slug, 191) || title).slice(0, 191).replace(/-+$/, "");

    if (!slug || slug === "blog") {
        throw new BlogError("Add a web address for the post.");
    }

    const isoDate = toIsoDate(input?.date) || today();
    const faqs = cleanFaqs(input?.faqs);
    const gallery = cleanGallery(input?.gallery);
    const cover = cleanImage(input?.image);

    // The cover is the featured image and the picture shown when the
    // post is shared, so every post needs one.
    if (!cover) {
        throw new BlogError("Add a cover image. It is the featured image and the picture shown when the post is shared.");
    }

    const coverAlt = cleanText(input?.alt_text1, 250);

    if (!coverAlt) {
        throw new BlogError("Add a short description of the cover image.");
    }

    return {
        title,
        slug,
        blog,
        status: input?.status === "0" ? "0" : "1",
        created_date: isoDate,
        date: DISPLAY_DATE.format(new Date(`${isoDate}T00:00:00Z`)),
        duration: cleanText(input?.duration, 40) || readingTime(blog),
        image_land: cover,
        alt_text1: coverAlt,
        link: cleanLink(input?.link),
        meta_title: cleanText(input?.meta_title, 255),
        meta_description: cleanText(input?.meta_description, 400),
        focus_keyword: cleanText(input?.focus_keyword, 191),
        summary: cleanMultiline(input?.summary, 1200),
        faqs: faqs.length ? JSON.stringify(faqs) : null,
        gallery: gallery.length ? JSON.stringify(gallery) : null,
        author_name: cleanText(input?.author_name, 191),
        reviewer_name: cleanText(input?.reviewer_name, 191),
    };
}

/** No two posts may share a web address, current or old. */
async function assertUniqueSlug(slug, exceptId) {
    const rows = await query("SELECT id, title, slug, old_slugs FROM tb_blog_web");

    const clash = rows.find((row) => {
        if (String(row.id) === String(exceptId ?? "")) {
            return false;
        }

        const old = String(row.old_slugs ?? "").split(",").map((item) => item.trim());

        return blogPublicSlug(row) === slug || old.includes(slug);
    });

    if (clash) {
        throw new BlogError("Another post already uses this web address. Please change it a little.");
    }
}

export async function createBlog(input, ip = "") {
    const data = validate(input);

    await assertUniqueSlug(data.slug);

    const timestamp = now();

    const result = await query(
        `INSERT INTO tb_blog_web
            (title, slug, blog, link, image_land, image_prt, alt_text1, alt_text2, date, duration, status,
             created_date, ip, meta_title, meta_description, focus_keyword, summary, faqs, gallery,
             author_name, reviewer_name, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.title,
            data.slug,
            data.blog,
            data.link,
            data.image_land,
            data.image_land,
            data.alt_text1,
            data.date,
            data.duration,
            data.status,
            data.created_date,
            String(ip).slice(0, 64),
            data.meta_title,
            data.meta_description,
            data.focus_keyword,
            data.summary,
            data.faqs,
            data.gallery,
            data.author_name,
            data.reviewer_name,
            timestamp,
        ]
    );

    return { id: result.insertId, slug: data.slug };
}

export async function updateBlog(id, input) {
    const existing = await getBlog(id);

    if (!existing) {
        throw new BlogError("This post no longer exists.", 404);
    }

    const data = validate(input);

    await assertUniqueSlug(data.slug, existing.id);

    // Keep the old portrait image unless the cover changed.
    const imagePrt =
        data.image_land === existing.image_land ? existing.image_prt || data.image_land : data.image_land;

    // A changed address keeps the old one, so links to it still work.
    const previousSlug = blogPublicSlug(existing);
    const oldSlugs = new Set(
        String(existing.old_slugs ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
    );

    if (previousSlug && previousSlug !== data.slug) {
        oldSlugs.add(previousSlug);
    }

    oldSlugs.delete(data.slug);

    await query(
        `UPDATE tb_blog_web
         SET title = ?, slug = ?, old_slugs = ?, blog = ?, link = ?, image_land = ?, image_prt = ?,
             alt_text1 = ?, date = ?, duration = ?, status = ?, created_date = ?,
             meta_title = ?, meta_description = ?, focus_keyword = ?, summary = ?, faqs = ?, gallery = ?,
             author_name = ?, reviewer_name = ?, updated_at = ?
         WHERE id = ?`,
        [
            data.title,
            data.slug,
            [...oldSlugs].join(",") || null,
            data.blog,
            data.link,
            data.image_land,
            imagePrt,
            data.alt_text1,
            data.date,
            data.duration,
            data.status,
            data.created_date,
            data.meta_title,
            data.meta_description,
            data.focus_keyword,
            data.summary,
            data.faqs,
            data.gallery,
            data.author_name,
            data.reviewer_name,
            now(),
            existing.id,
        ]
    );

    return { id: existing.id, slug: data.slug };
}

export async function deleteBlog(id) {
    const existing = await getBlog(id);

    if (!existing) {
        throw new BlogError("This post no longer exists.", 404);
    }

    await query("DELETE FROM tb_blog_web WHERE id = ?", [existing.id]);
}
