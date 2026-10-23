import "server-only";

import { parse } from "node-html-parser";

import { query } from "@/lib/db";
import { now } from "@/lib/legacy/util";
import { getPageSeo, normalisePath } from "@/lib/pageSeo";

/*
 * Page score for the SEO manager: loads a page the way a search engine
 * would and checks it for search (SEO), AI answers (AEO) and AI search
 * engines (GEO). Every check is worth the same; "could be better" counts
 * half. Results are stored in web_page_audit (db/004_page_seo.sql).
 */

export function pageType(path) {
    if (path === "/") return "Home";
    if (path.startsWith("/blog-details/")) return "Blog post";
    if (path.startsWith("/universities/")) return "University";
    if (path.startsWith("/courses/")) return "Course";
    if (path.startsWith("/universities-in-")) return "Country universities";
    if (path.startsWith("/study-in-germany/")) return "German programme";
    if (path.startsWith("/study-in-")) return "Country guide";
    if (path.startsWith("/branch/")) return "Branch";
    return "Page";
}

const MIN_WORDS = {
    "Blog post": 800,
    Home: 600,
    "Country guide": 500,
    "German programme": 500,
    University: 300,
    Course: 150,
    Branch: 300,
};

function between(value, min, max) {
    if (value >= min && value <= max) return true;

    return value > 0 ? "warn" : false;
}

function includes(text, keyword) {
    return Boolean(keyword) && String(text ?? "").toLowerCase().includes(keyword);
}

function jsonLdTypes(root) {
    const types = new Set();

    const walk = (node) => {
        if (Array.isArray(node)) {
            node.forEach(walk);
        } else if (node && typeof node === "object") {
            [].concat(node["@type"] ?? []).forEach((type) => types.add(type));
            Object.values(node).forEach((value) => typeof value === "object" && walk(value));
        }
    };

    for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
        try {
            walk(JSON.parse(script.text));
        } catch {
            types.add("INVALID");
        }
    }

    return types;
}

export function runChecks({ path, status, ms, html, seo }) {
    const type = pageType(path);
    const root = parse(html || "", { comment: false });

    const title = root.querySelector("title")?.text.trim() ?? "";
    const description = root.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
    const robots = root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
    const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";

    for (const node of root.querySelectorAll("script, style, noscript, template")) {
        node.remove();
    }

    const main = root.querySelector("#main-content") ?? root.querySelector("body") ?? root;
    const text = main.text.replace(/\s+/g, " ").trim();
    const words = text ? text.split(" ").length : 0;
    const h1s = main.querySelectorAll("h1");
    const h2s = main.querySelectorAll("h2");
    const headings = main.querySelectorAll("h2, h3").map((node) => node.text.trim());
    const images = main.querySelectorAll("img");
    const missingAlt = images.filter((img) => !String(img.getAttribute("alt") ?? "").trim()).length;
    const links = main.querySelectorAll("a[href]").map((a) => a.getAttribute("href"));
    const internal = new Set(links.filter((href) => href.startsWith("/") && !href.startsWith("//"))).size;
    const types = jsonLdTypes(parse(html || ""));
    const keyword = String(seo?.focusKeyword ?? "").toLowerCase();
    const minWords = MIN_WORDS[type] ?? 300;
    const hasQuickAnswer = Boolean(seo?.summary) || /quick answer|in short/i.test(text.slice(0, 20000));
    const hasContact = links.some((href) => href.startsWith("tel:") || href.includes("wa.me") || href === "/contact-us");
    const canonicalPath = canonical ? normalisePath(canonical) : "";

    const checks = [
        // Technical
        { group: "Technical", label: "Page loads", ok: status === 200 },
        { group: "Technical", label: `Fast response (${ms} ms)`, ok: ms <= 1500 ? true : ms <= 3500 ? "warn" : false },
        { group: "Technical", label: "Allowed in search results", ok: !/noindex/i.test(robots) },
        { group: "Technical", label: "Canonical address points to this page", ok: canonicalPath === path },

        // Google listing
        { group: "Google listing", label: `Title 30–65 characters incl. brand (now ${title.length})`, ok: between(title.length, 30, 65) },
        { group: "Google listing", label: `Meta description 120–160 characters (now ${description.length})`, ok: between(description.length, 120, 160) },
        { group: "Google listing", label: "Share image (og:image)", ok: Boolean(ogImage) },
        {
            group: "Google listing",
            label: keyword ? `Focus keyword "${seo.focusKeyword}" in title and description` : "Focus keyword set",
            ok: keyword ? (includes(title, keyword) && includes(description, keyword) ? true : includes(title, keyword) || includes(description, keyword) ? "warn" : false) : "warn",
        },

        // Content
        { group: "Content", label: `One main heading (H1) (now ${h1s.length})`, ok: h1s.length === 1 ? true : h1s.length > 1 ? "warn" : false },
        { group: "Content", label: `2+ subheadings (now ${h2s.length})`, ok: h2s.length >= 2 ? true : h2s.length === 1 ? "warn" : false },
        { group: "Content", label: `At least ${minWords} words (now ${words})`, ok: words >= minWords ? true : words >= minWords / 2 ? "warn" : false },
        { group: "Content", label: `Pictures described (${images.length - missingAlt}/${images.length})`, ok: missingAlt === 0 ? true : missingAlt <= 2 ? "warn" : false },
        { group: "Content", label: `3+ links to other pages (now ${internal})`, ok: internal >= 3 ? true : internal > 0 ? "warn" : false },

        // AI answers and AI search
        { group: "AI answers", label: `Structured data (${[...types].slice(0, 4).join(", ") || "none"})`, ok: types.size > 0 && !types.has("INVALID") },
        { group: "AI answers", label: "FAQs marked up for Google and AI", ok: types.has("FAQPage") },
        { group: "AI answers", label: "Quick answer or summary", ok: hasQuickAnswer ? true : "warn" },
        { group: "AI answers", label: "A heading written as a question", ok: headings.some((heading) => heading.endsWith("?")) ? true : "warn" },
        { group: "AI answers", label: "Uses a list or table", ok: main.querySelectorAll("ul li, ol li, table").length > 0 },
        { group: "AI answers", label: "Contact or counselling link", ok: hasContact },
    ];

    const points = checks.reduce((total, check) => total + (check.ok === true ? 1 : check.ok === "warn" ? 0.5 : 0), 0);
    const score = status === 200 ? Math.max(1, Math.round((points / checks.length) * 100)) : 1;

    return { type, title, score, checks };
}

/** Load a page, score it and save the result. */
export async function auditPage(rawPath, origin) {
    const path = normalisePath(rawPath);

    if (!path) {
        throw new Error("Invalid page address.");
    }

    const started = Date.now();
    let status = 0;
    let html = "";

    try {
        const response = await fetch(`${origin}${path}`, {
            redirect: "manual",
            cache: "no-store",
            headers: { "User-Agent": "MedcitySeoAudit/1.0", Accept: "text/html" },
            signal: AbortSignal.timeout(25000),
        });

        status = response.status;
        html = status === 200 ? await response.text() : "";
    } catch {
        status = 0;
    }

    const ms = Date.now() - started;
    const seo = await getPageSeo(path);
    const result = runChecks({ path, status, ms, html, seo });

    await query(
        `INSERT INTO web_page_audit (path, page_type, status_code, score, title, checks, checked_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE page_type = VALUES(page_type), status_code = VALUES(status_code),
            score = VALUES(score), title = VALUES(title), checks = VALUES(checks), checked_at = VALUES(checked_at)`,
        [path, result.type, status, result.score, result.title.slice(0, 300), JSON.stringify(result.checks), now()]
    );

    return { path, status, ms, ...result };
}

export async function listAudits() {
    return query("SELECT path, page_type, status_code, score, title, checked_at FROM web_page_audit");
}

export async function getAudit(path) {
    const rows = await query("SELECT * FROM web_page_audit WHERE path = ?", [normalisePath(path)]);
    const row = rows[0];

    if (!row) {
        return null;
    }

    let checks = [];

    try {
        checks = JSON.parse(row.checks || "[]");
    } catch {
        checks = [];
    }

    return { ...row, checks };
}
