import "server-only";

import { createBlogSlug } from "@/lib/blogSlug";
import { readingTime, sanitizeBlogHtml, blogPlainText } from "@/lib/blogHtml";
import { query, queryOne } from "@/lib/db";
import { today } from "@/lib/legacy/util";

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
        `SELECT id, title, date, duration, status, image_land, image_prt
         FROM tb_blog_web ORDER BY id DESC`
    );
}

export async function getBlog(id) {
    if (!/^\d{1,10}$/.test(String(id))) {
        return null;
    }

    return queryOne("SELECT * FROM tb_blog_web WHERE id = ?", [String(id)]);
}

function cleanText(value, max) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
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

function validate(input) {
    const title = cleanText(input?.title, 250);

    if (!title) {
        throw new BlogError("Add a title.");
    }

    const blog = sanitizeBlogHtml(input?.blog);

    if (!blogPlainText(blog)) {
        throw new BlogError("The post is empty.");
    }

    const isoDate = toIsoDate(input?.date) || today();

    return {
        title,
        blog,
        status: input?.status === "0" ? "0" : "1",
        created_date: isoDate,
        date: DISPLAY_DATE.format(new Date(`${isoDate}T00:00:00Z`)),
        duration: cleanText(input?.duration, 40) || readingTime(blog),
        image_land: cleanImage(input?.image),
        alt_text1: cleanText(input?.alt_text1, 250),
        link: cleanLink(input?.link),
    };
}

/** Two posts with the same title would share one web address. */
async function assertUniqueSlug(title, exceptId) {
    const slug = createBlogSlug(title);
    const rows = await query("SELECT id, title FROM tb_blog_web");

    const clash = rows.find(
        (row) => String(row.id) !== String(exceptId ?? "") && createBlogSlug(row.title) === slug
    );

    if (clash) {
        throw new BlogError("Another post already has this title. Please change it a little.");
    }
}

export async function createBlog(input, ip = "") {
    const data = validate(input);

    await assertUniqueSlug(data.title);

    const result = await query(
        `INSERT INTO tb_blog_web
            (title, blog, link, image_land, image_prt, alt_text1, alt_text2, date, duration, status, created_date, ip)
         VALUES (?, ?, ?, ?, ?, ?, '', ?, ?, ?, ?, ?)`,
        [
            data.title,
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
        ]
    );

    return { id: result.insertId, slug: createBlogSlug(data.title) };
}

export async function updateBlog(id, input) {
    const existing = await getBlog(id);

    if (!existing) {
        throw new BlogError("This post no longer exists.", 404);
    }

    const data = validate(input);

    await assertUniqueSlug(data.title, existing.id);

    // Keep the old portrait image unless the cover changed.
    const imagePrt =
        data.image_land === existing.image_land ? existing.image_prt || data.image_land : data.image_land;

    await query(
        `UPDATE tb_blog_web
         SET title = ?, blog = ?, link = ?, image_land = ?, image_prt = ?, alt_text1 = ?,
             date = ?, duration = ?, status = ?, created_date = ?
         WHERE id = ?`,
        [
            data.title,
            data.blog,
            data.link,
            data.image_land,
            imagePrt,
            data.alt_text1,
            data.date,
            data.duration,
            data.status,
            data.created_date,
            existing.id,
        ]
    );

    return { id: existing.id, slug: createBlogSlug(data.title) };
}

export async function deleteBlog(id) {
    const existing = await getBlog(id);

    if (!existing) {
        throw new BlogError("This post no longer exists.", 404);
    }

    await query("DELETE FROM tb_blog_web WHERE id = ?", [existing.id]);
}
