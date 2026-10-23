/*
 * Live SEO / AEO / GEO checklist for the post editor. Runs in the
 * browser on every change, so it uses the DOM rather than a server
 * HTML library.
 */

export const META_TITLE_RANGE = [30, 60];
export const META_DESCRIPTION_RANGE = [120, 160];
export const SUMMARY_WORD_RANGE = [30, 80];

export function slugify(value) {
    return String(value ?? "")
        .toLowerCase()
        .trim()
        .replace(/&/g, " and ")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function countWords(text) {
    return String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function readBody(html) {
    if (typeof window === "undefined") {
        return { text: "", headings: [], images: [], links: [], firstParagraph: "", hasH1: false };
    }

    const doc = new DOMParser().parseFromString(`<div>${html || ""}</div>`, "text/html");
    const root = doc.body;

    const text = (root.textContent || "").replace(/\s+/g, " ").trim();
    const headings = [...root.querySelectorAll("h2, h3")].map((node) => node.textContent || "");
    const images = [...root.querySelectorAll("img")].map((node) => node.getAttribute("alt") || "");
    const links = [...root.querySelectorAll("a[href]")].map((node) => node.getAttribute("href") || "");
    const firstParagraph = root.querySelector("p")?.textContent || text.slice(0, 600);

    return {
        text,
        headings,
        images,
        links,
        firstParagraph,
        hasH1: Boolean(root.querySelector("h1")),
        tables: root.querySelectorAll("table").length,
        lists: root.querySelectorAll("ul, ol").length,
    };
}

function isInternal(href) {
    return href.startsWith("/") || /^https?:\/\/(www\.)?medcityoverseas\.com/i.test(href);
}

function includesKeyword(text, keyword) {
    return Boolean(keyword) && String(text ?? "").toLowerCase().includes(keyword);
}

/**
 * Returns [{ id, group, label, ok, tip }]. `ok` is true, false or
 * "warn" (good enough, could be better).
 */
export function runSeoChecks(form) {
    const keyword = String(form.focus_keyword ?? "").trim().toLowerCase();
    const body = readBody(form.blog);
    const words = countWords(body.text);
    const metaTitle = (form.meta_title || form.title || "").trim();
    const metaDescription = (form.meta_description || "").trim();
    const summaryWords = countWords(form.summary);
    const internal = body.links.filter(isInternal).length;
    const external = body.links.filter((href) => /^https?:\/\//i.test(href) && !isInternal(href)).length;
    const missingAlt = body.images.filter((alt) => !alt.trim()).length;
    const galleryMissingAlt = (form.gallery || []).filter((item) => !String(item.alt || "").trim()).length;
    const faqs = (form.faqs || []).filter((item) => item.question?.trim() && item.answer?.trim());
    const questionHeadings = body.headings.filter((heading) => heading.trim().endsWith("?")).length;

    const between = (value, [min, max]) => (value >= min && value <= max ? true : value > 0 ? "warn" : false);

    return [
        // ---- Keyword (SEO)
        { id: "kw", group: "Keyword", label: "Focus keyword is set", ok: Boolean(keyword), tip: "The main phrase people search for, e.g. \"australia student visa 2026\"." },
        { id: "kw-title", group: "Keyword", label: "Keyword in the title", ok: includesKeyword(form.title, keyword) },
        { id: "kw-meta", group: "Keyword", label: "Keyword in the meta title", ok: includesKeyword(metaTitle, keyword) },
        { id: "kw-desc", group: "Keyword", label: "Keyword in the meta description", ok: includesKeyword(metaDescription, keyword) },
        { id: "kw-url", group: "Keyword", label: "Keyword in the web address", ok: Boolean(keyword) && String(form.slug || "").includes(slugify(keyword)) },
        { id: "kw-intro", group: "Keyword", label: "Keyword in the first paragraph", ok: includesKeyword(body.firstParagraph, keyword) },
        { id: "kw-heading", group: "Keyword", label: "Keyword in a subheading", ok: body.headings.some((heading) => includesKeyword(heading, keyword)) },

        // ---- Search listing
        { id: "meta-title", group: "Google listing", label: `Meta title ${META_TITLE_RANGE[0]}–${META_TITLE_RANGE[1]} characters (now ${metaTitle.length})`, ok: between(metaTitle.length, META_TITLE_RANGE) },
        { id: "meta-desc", group: "Google listing", label: `Meta description ${META_DESCRIPTION_RANGE[0]}–${META_DESCRIPTION_RANGE[1]} characters (now ${metaDescription.length})`, ok: between(metaDescription.length, META_DESCRIPTION_RANGE), tip: "Also shown as the excerpt on the blog list." },
        { id: "cover", group: "Google listing", label: "Cover image with a description", ok: Boolean(form.image) && Boolean(String(form.alt_text1 || "").trim()) },

        // ---- Content
        { id: "length", group: "Content", label: `At least 800 words (now ${words})`, ok: words >= 800 ? true : words >= 500 ? "warn" : false },
        { id: "h2", group: "Content", label: `At least 3 subheadings (now ${body.headings.length})`, ok: body.headings.length >= 3 ? true : body.headings.length > 0 ? "warn" : false },
        { id: "no-h1", group: "Content", label: "No H1 inside the post (the title is the H1)", ok: !body.hasH1 },
        { id: "alts", group: "Content", label: "Every picture has a description", ok: missingAlt + galleryMissingAlt === 0 },
        { id: "internal", group: "Content", label: `2+ links to other Medcity pages (now ${internal})`, ok: internal >= 2 ? true : internal === 1 ? "warn" : false, tip: "e.g. the country page, a university or the counselling form." },
        { id: "external", group: "Content", label: `1+ link to an official source (now ${external})`, ok: external >= 1, tip: "e.g. the government visa or university page you took facts from." },

        // ---- Answers (AEO / GEO)
        { id: "summary", group: "AI answers", label: `Quick answer ${SUMMARY_WORD_RANGE[0]}–${SUMMARY_WORD_RANGE[1]} words (now ${summaryWords})`, ok: between(summaryWords, SUMMARY_WORD_RANGE), tip: "Answer the title question directly. AI tools and Google quote this." },
        { id: "faqs", group: "AI answers", label: `3+ FAQs (now ${faqs.length})`, ok: faqs.length >= 3 ? true : faqs.length > 0 ? "warn" : false },
        { id: "questions", group: "AI answers", label: "A subheading written as a question", ok: questionHeadings > 0, tip: "e.g. \"Who can apply for an exemption?\"" },
        { id: "structure", group: "AI answers", label: "Uses a list or table", ok: body.lists + body.tables > 0 },
        { id: "author", group: "AI answers", label: "Author named", ok: Boolean(String(form.author_name || "").trim()), tip: "Named experts make content more trustworthy to Google and AI tools." },
    ];
}

export function scoreChecks(checks) {
    const points = checks.reduce((total, check) => total + (check.ok === true ? 1 : check.ok === "warn" ? 0.5 : 0), 0);

    return Math.round((points / checks.length) * 100);
}
