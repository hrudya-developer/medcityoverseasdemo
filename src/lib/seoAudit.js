import "server-only";

import { parse } from "node-html-parser";

import { query } from "@/lib/db";
import { now } from "@/lib/legacy/util";
import { getPageSeo, normalisePath } from "@/lib/pageSeo";
import { CHECKS, scoreResults } from "@/lib/seoCheckDefs";

/*
 * Page score for the SEO manager: loads a page the way a search engine
 * would and checks it for search (SEO), AI answers (AEO) and AI search
 * engines (GEO). The checks and how they score live in seoCheckDefs.js.
 * Results are stored in web_page_audit (db/004_page_seo.sql, with the
 * pillar columns from db/006_seo_pillar_scores.sql).
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

/* A page that takes longer than this is stored as status 504 with this page-loads label. */
const TIMEOUT_MS = 25000;
const TIMEOUT_LABEL = `Timed out after ${TIMEOUT_MS / 1000} s`;

function between(value, min, max) {
    if (value >= min && value <= max) return true;

    return value > 0 ? "warn" : false;
}

function includes(text, keyword) {
    return Boolean(keyword) && String(text ?? "").toLowerCase().includes(keyword);
}

function clean(text) {
    return String(text ?? "").replace(/\s+/g, " ").trim();
}

/** Text with a space between every text node, so "<span>by</span><span>Studying</span>" reads as two words. */
function spacedText(node) {
    const parts = [];
    // Walked with a stack, not recursion, so very deep pages cannot overflow it.
    const stack = node ? [node] : [];

    while (stack.length) {
        const current = stack.pop();

        if (current.nodeType === 3) {
            parts.push(current.text);
        } else {
            for (let index = current.childNodes.length - 1; index >= 0; index -= 1) {
                stack.push(current.childNodes[index]);
            }
        }
    }

    return clean(parts.join(" "));
}

/**
 * Elements with the given tag names in document order. One linear walk:
 * node-html-parser's querySelectorAll slows down badly on pages with
 * tens of thousands of matches.
 */
function elementsByTag(root, tags) {
    const found = [];
    const stack = root ? [root] : [];

    while (stack.length) {
        const current = stack.pop();

        if (current.nodeType === 1 && tags.has(current.tagName)) {
            found.push(current);
        }

        const children = current.childNodes ?? [];

        for (let index = children.length - 1; index >= 0; index -= 1) {
            if (children[index].nodeType === 1) {
                stack.push(children[index]);
            }
        }
    }

    return found;
}

function countWords(text) {
    const value = clean(text);

    return value ? value.split(" ").length : 0;
}

/** Every JSON-LD object that has an @type, the set of types, and whether a block failed to parse. */
function readJsonLd(root) {
    const nodes = [];
    let invalid = false;

    const walk = (node) => {
        if (Array.isArray(node)) {
            node.forEach(walk);
        } else if (node && typeof node === "object") {
            if (node["@type"]) {
                nodes.push(node);
            }

            Object.values(node).forEach((value) => typeof value === "object" && walk(value));
        }
    };

    for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
        try {
            walk(JSON.parse(script.text));
        } catch {
            invalid = true;
        }
    }

    const types = new Set(nodes.flatMap((node) => [].concat(node["@type"]).map(String)));

    return { nodes, types, invalid };
}

function hasType(node, list) {
    return [].concat(node["@type"]).some((type) => list.has(String(type)));
}

const ENTITY_TYPES = new Set([
    "Organization",
    "EducationalOrganization",
    "CollegeOrUniversity",
    "Course",
    "EducationalOccupationalProgram",
    "Article",
    "BlogPosting",
    "NewsArticle",
    "Place",
    "Country",
    "City",
    "LocalBusiness",
    "Service",
    "Product",
]);

const PAGE_TYPES = new Set(["WebPage", "AboutPage", "CollectionPage", "ItemPage", "ContactPage"]);

const ORGANISATION_TYPES = new Set(["Organization", "EducationalOrganization", "CollegeOrUniversity", "LocalBusiness"]);

/* Words in an H1 that say nothing about the page's subject. */
const GENERIC_WORDS = new Set([
    "study",
    "studying",
    "studies",
    "in",
    "guide",
    "for",
    "the",
    "best",
    "top",
    "and",
    "of",
    "medcity",
    "overseas",
    "a",
    "an",
    "to",
    "at",
    "on",
    "from",
    "by",
    "with",
    "your",
    "you",
    "is",
    "are",
    "how",
    "what",
    "why",
    "complete",
    "abroad",
    "build",
    "future",
    "career",
    "dream",
    "dreams",
    "explore",
    "discover",
    "journey",
    "start",
    "unlock",
    "achieve",
]);

const MONTHS = "jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec";

/* Patterns for figures an AI answer can quote: money, percentages, durations, years, dates, scores. */
const FACT_PATTERNS = [
    /(?<![\p{L}])(?:₹|rs\.?|inr|usd|us\$|\$|£|gbp|€|eur|cad|c\$|aud|a\$|nzd|sgd|aed|chf)\s?\d[\d,.]*(?:\s?(?:k|lakhs?|crores?|million))?/giu,
    /(?<![\d,.])\d[\d,.]{0,20}\s?(?:lakhs?|crores?|euros?|pounds?|dollars?|rupees?)\b/giu,
    /(?<![\d.])\d{1,6}(?:\.\d{1,4})?\s?%/gu,
    /\b\d+(?:\.\d+)?(?:\s?(?:-|to)\s?\d+(?:\.\d+)?)?\s?(?:years?|yrs?|months?|weeks?|days?|hours?|semesters?)\b/giu,
    /\b(?:19|20)\d{2}\b/gu,
    new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?\\s(?:${MONTHS})[a-z]*\\b`, "giu"),
    new RegExp(`\\b(?:${MONTHS})[a-z]*\\s\\d{1,2}(?:st|nd|rd|th)?\\b`, "giu"),
    /\b\d{1,3}(?:,\d{2,3})+\b/gu,
    /\b(?:ielts|pte|toefl|duolingo|gpa|cgpa|band|score)\s?(?:of\s)?\d+(?:\.\d+)?\b/giu,
];

/** Distinct figures in a text; overlapping matches ("₹15,000" and "15,000") count once. */
function countFacts(rawText) {
    // Figures near the top are what counts; capping keeps huge pages fast.
    const text = String(rawText ?? "").slice(0, 200000);
    const spans = [];

    for (const pattern of FACT_PATTERNS) {
        for (const match of text.matchAll(pattern)) {
            spans.push([match.index, match.index + match[0].length]);
        }
    }

    spans.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    const merged = [];

    for (const span of spans) {
        const last = merged[merged.length - 1];

        if (last && span[0] < last[1]) {
            last[1] = Math.max(last[1], span[1]);
        } else {
            merged.push([...span]);
        }
    }

    const facts = new Set();

    for (const [start, end] of merged) {
        const value = text.slice(start, end).toLowerCase().replace(/\s+/g, " ").trim();

        // Long digit runs are phone numbers, not facts.
        if (value.replace(/\D/g, "").length < 10) {
            facts.add(value);
        }
    }

    return facts.size;
}

/* Outbound links that are not sources: social profiles, chat, maps and app stores. */
const NOT_SOURCE_HOSTS = [
    "facebook.com",
    "instagram.com",
    "youtube.com",
    "youtu.be",
    "twitter.com",
    "x.com",
    "linkedin.com",
    "wa.me",
    "whatsapp.com",
    "t.me",
    "pinterest.com",
    "threads.net",
    "maps.google.com",
    "maps.app.goo.gl",
    "play.google.com",
    "apps.apple.com",
];

const OFFICIAL_HOSTS = [
    "gov.uk",
    "canada.ca",
    "educanada.ca",
    "studyinaustralia.gov.au",
    "daad.de",
    "make-it-in-germany.com",
    "study-in-germany.de",
    "uni-assist.de",
    "anabin.kmk.org",
    "europa.eu",
    "ucas.com",
    "ukcisa.org.uk",
    "campusfrance.org",
    "studyinireland.ie",
    "irishimmigration.ie",
    "studyinnewzealand.govt.nz",
];

const OFFICIAL_SUFFIX = /\.(?:gov|edu|mil)$|\.(?:gov|govt|gouv|gob|edu|ac)\.[a-z]{2,3}$|\.gc\.ca$/;

const UNIVERSITY_HOST = /(?:^|\.)(?:uni-|univ|university|college|hochschule|fh-|tu-)/;

const OFFICIAL_LINK_TEXT = /official\s*(?:web)?\s*site|(?:university|college)\s*website|visit\s*(?:the\s*)?(?:official\s*)?website/i;

function hostIs(host, list) {
    return list.some((item) => host === item || host.endsWith(`.${item}`));
}

function isOwnHost(host) {
    return host === "localhost" || host === "127.0.0.1" || hostIs(host, ["medcityoverseas.com", "medcityacademy.com"]);
}

/** The first answer paragraph after each question heading: { questions, answers: [word counts] }. */
function questionAnswers(main) {
    const blocks = elementsByTag(main, new Set(["H2", "H3", "H4", "P"]));
    const answers = [];
    let questions = 0;

    blocks.forEach((node, index) => {
        if (!/^H[234]$/.test(node.tagName) || !spacedText(node).endsWith("?")) {
            return;
        }

        questions += 1;

        for (let next = index + 1; next < blocks.length && blocks[next].tagName === "P"; next += 1) {
            const words = countWords(spacedText(blocks[next]));

            if (words > 0) {
                answers.push(words);
                break;
            }
        }
    });

    return { questions, answers };
}

/** Key terms of the H1: its words minus generic ones and bare numbers. */
function keyTerms(h1) {
    const words = clean(h1)
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter((word) => word.length >= 2 && !GENERIC_WORDS.has(word) && !/^\d+$/.test(word));

    return [...new Set(words)];
}

function mentions(text, term) {
    // A plural "s" is dropped so "rules" also finds "rule".
    const stem = term.length > 3 && term.endsWith("s") ? term.slice(0, -1) : term;
    const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}`, "u").test(text);
}

export function runChecks({ path, status, ms, html, seo, headers, timedOut = false }) {
    const type = pageType(path);
    const root = parse(html || "", { comment: false });

    const title = root.querySelector("title")?.text.trim() ?? "";
    const description = root.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
    const robots = root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
    const crawlerMeta = root
        .querySelectorAll("meta[name]")
        .filter((meta) => /robots|bot$|google-extended/i.test(meta.getAttribute("name") ?? ""))
        .map((meta) => `${meta.getAttribute("name")}: ${meta.getAttribute("content") ?? ""}`);
    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
    const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
    const jsonLd = readJsonLd(root);

    for (const node of root.querySelectorAll("script, style, noscript, template")) {
        node.remove();
    }

    const main = root.querySelector("#main-content") ?? root.querySelector("body") ?? root;
    const text = clean(main.text);
    // Used by the AEO and GEO checks; the older checks keep reading `text`.
    const spaced = spacedText(main);
    const words = text ? text.split(" ").length : 0;
    const h1s = elementsByTag(main, new Set(["H1"]));
    const h2s = elementsByTag(main, new Set(["H2"]));
    const headings = elementsByTag(main, new Set(["H2", "H3"])).map((node) => node.text.trim());
    const images = elementsByTag(main, new Set(["IMG"]));
    const missingAlt = images.filter((img) => !String(img.getAttribute("alt") ?? "").trim()).length;
    const links = elementsByTag(main, new Set(["A"]))
        .filter((a) => a.hasAttribute("href"))
        .map((a) => ({ href: a.getAttribute("href") ?? "", text: clean(a.text) }));
    const hrefs = links.map((link) => link.href);
    const internal = new Set(hrefs.filter((href) => href.startsWith("/") && !href.startsWith("//"))).size;
    const { types } = jsonLd;
    const keyword = String(seo?.focusKeyword ?? "").toLowerCase();
    const minWords = MIN_WORDS[type] ?? 300;
    const hasQuickAnswer = Boolean(seo?.summary) || /quick answer|in short/i.test(text.slice(0, 20000));
    const hasContact = hrefs.some((href) => href.startsWith("tel:") || href.includes("wa.me") || href === "/contact-us");
    const canonicalPath = canonical ? normalisePath(canonical) : "";

    const results = {};
    const set = (id, label, ok) => {
        results[id] = { label, ok };
    };

    // SEO / Technical
    if (timedOut) {
        set("page-loads", TIMEOUT_LABEL, false);
    } else {
        set("page-loads", status === 200 ? "Page loads (status 200)" : `Page loads (now status ${status})`, status === 200);
    }
    set("fast-response", `Fast response under 1.5 s (now ${ms} ms)`, ms <= 1500 ? true : ms <= 3500 ? "warn" : false);
    set("indexable", /noindex/i.test(robots) ? "Allowed in search results (robots says noindex)" : "Allowed in search results", !/noindex/i.test(robots));
    set("canonical", `Canonical address points to this page (now ${canonicalPath || "none"})`, canonicalPath === path);

    // SEO / Google listing
    set("title-length", `Title 30 to 65 characters including brand (now ${title.length})`, between(title.length, 30, 65));
    set("meta-description", `Meta description 120 to 160 characters (now ${description.length})`, between(description.length, 120, 160));
    set("og-image", ogImage ? "Share image (og:image) set" : "Share image (og:image) missing", Boolean(ogImage));
    set(
        "focus-keyword",
        keyword ? `Focus keyword "${seo.focusKeyword}" in title and description` : "Focus keyword not set",
        keyword ? (includes(title, keyword) && includes(description, keyword) ? true : includes(title, keyword) || includes(description, keyword) ? "warn" : false) : "warn"
    );

    // SEO / Content
    set("h1", `One main heading (H1) (now ${h1s.length})`, h1s.length === 1 ? true : h1s.length > 1 ? "warn" : false);
    set("subheadings", `2 or more H2 subheadings (now ${h2s.length})`, h2s.length >= 2 ? true : h2s.length === 1 ? "warn" : false);
    set("word-count", `At least ${minWords} words (now ${words})`, words >= minWords ? true : words >= minWords / 2 ? "warn" : false);
    set("image-alt", `Pictures described (${images.length - missingAlt} of ${images.length})`, missingAlt === 0 ? true : missingAlt <= 2 ? "warn" : false);
    set("internal-links", `3 or more links to other pages (now ${internal})`, internal >= 3 ? true : internal > 0 ? "warn" : false);

    // AEO / Answer format
    set("quick-answer", hasQuickAnswer ? "Quick answer or summary near the top" : "No quick answer or summary", hasQuickAnswer ? true : "warn");

    const questionCount = headings.filter((heading) => heading.endsWith("?")).length;
    set("question-heading", `A heading written as a question (now ${questionCount})`, questionCount > 0 ? true : "warn");

    const { questions, answers } = questionAnswers(main);
    const fitting = answers.filter((count) => count >= 25 && count <= 80);
    const nearest = [...answers].sort((a, b) => Math.abs(a - 52) - Math.abs(b - 52))[0];

    if (fitting.length) {
        set("direct-answer", `Direct answer of 25 to 80 words after a question (${fitting.length} of ${questions})`, true);
    } else if (answers.length) {
        set("direct-answer", `Direct answer of 25 to 80 words after a question (closest is ${nearest} words)`, "warn");
    } else {
        set("direct-answer", questions ? "No answer paragraph after a question heading" : "No question heading to answer", false);
    }

    const listItems = elementsByTag(main, new Set(["LI", "TABLE"])).length;
    set("list-or-table", `Uses a list or table (now ${listItems} items)`, listItems > 0);

    // AEO / Answer markup
    set("faq-schema", types.has("FAQPage") ? "FAQs marked up (FAQPage)" : "No FAQPage markup", types.has("FAQPage"));
    set("breadcrumb-schema", types.has("BreadcrumbList") ? "Breadcrumbs marked up (BreadcrumbList)" : "No BreadcrumbList markup", types.has("BreadcrumbList"));

    // GEO / Entity and trust
    const typeList = [...types].slice(0, 4).join(", ");
    set(
        "structured-data",
        jsonLd.invalid ? `Structured data has errors (${typeList || "no valid block"})` : `Structured data (${typeList || "none"})`,
        types.size > 0 && !jsonLd.invalid
    );

    const entities = [...new Set(jsonLd.nodes.filter((node) => hasType(node, ENTITY_TYPES)).flatMap((node) => [].concat(node["@type"]).map(String)))];
    const describedPage = jsonLd.nodes.some((node) => hasType(node, PAGE_TYPES) && (node.about || node.mainEntity));

    if (entities.length || describedPage) {
        set("entity-schema", `Main entity marked up (${[...entities, ...(describedPage ? ["WebPage about"] : [])].slice(0, 3).join(", ")})`, true);
    } else if (types.has("WebSite") || jsonLd.nodes.some((node) => hasType(node, PAGE_TYPES))) {
        set("entity-schema", "Main entity not described (only WebSite or WebPage markup)", "warn");
    } else {
        set("entity-schema", "Main entity not marked up", false);
    }

    const markupAuthor = jsonLd.nodes.some((node) => node.author || node.publisher);
    const byline = Boolean(main.querySelector('[rel~="author"], [itemprop="author"], .byline, .author')) || /\b(?:written|posted|reviewed) by\s+\S|\bauthor\s*:\s*\S/i.test(spaced);

    if (markupAuthor || byline) {
        set("author-or-org", markupAuthor ? "Author or publisher named in the markup" : "Author named in a byline", true);
    } else if (jsonLd.nodes.some((node) => hasType(node, ORGANISATION_TYPES))) {
        set("author-or-org", "Organisation in the markup but not named as author or publisher", "warn");
    } else {
        set("author-or-org", "No author or publisher named", false);
    }

    const modified = jsonLd.nodes.find((node) => node.dateModified)?.dateModified;
    const shownUpdated = new RegExp(`\\b(?:last updated|updated on|updated\\s*:|updated\\s+(?:\\d|${MONTHS}))`, "i").test(spaced);
    const published = jsonLd.nodes.some((node) => node.datePublished) || new RegExp(`\\bpublished\\s*(?:on\\s*)?:?\\s*(?:\\d|${MONTHS})`, "i").test(spaced);

    if (modified || shownUpdated) {
        set("updated-date", modified ? `Last updated date in the markup (${String(modified).slice(0, 10)})` : "Last updated date shown on the page", true);
    } else if (published) {
        set("updated-date", "Only a published date, no last updated date", "warn");
    } else {
        set("updated-date", "No last updated date", false);
    }

    const robotsHeader = String(headers?.["x-robots-tag"] ?? "");
    const blockers = [
        ...crawlerMeta.map((value) => ({ where: "robots meta", value })),
        ...(robotsHeader ? [{ where: "X-Robots-Tag", value: robotsHeader }] : []),
    ].flatMap(({ where, value }) =>
        [...value.toLowerCase().matchAll(/\b(noai|noimageai|nosnippet)\b|max-snippet\s*:\s*0(?!\d)/g)].map((match) => `${match[0].replace(/\s+/g, "")} in ${where}`)
    );

    set("ai-crawlers", blockers.length ? `AI crawlers blocked (${[...new Set(blockers)].slice(0, 2).join(", ")})` : "AI crawlers allowed (no noai or nosnippet)", blockers.length === 0);

    // GEO / Citable content
    const h1Text = spacedText(h1s[0]);
    const terms = keyTerms(h1Text);

    if (!h1Text) {
        set("entity-in-intro", "No H1 to name the topic", false);
    } else if (!terms.length) {
        set("entity-in-intro", `H1 "${h1Text.slice(0, 60)}" names no specific topic`, "warn");
    } else {
        const lower = spaced.toLowerCase();
        const h1At = lower.indexOf(h1Text.toLowerCase());
        const after = h1At >= 0 ? lower.slice(h1At + h1Text.length) : lower;
        const sequence = elementsByTag(main, new Set(["H1", "P"]));
        const firstH1 = sequence.findIndex((node) => node.tagName === "H1");
        const firstParagraph = sequence.slice(firstH1 + 1).find((node) => node.tagName === "P" && countWords(spacedText(node)) >= 8);
        const intro = `${spacedText(firstParagraph).toLowerCase()} ${after.slice(0, 300)}`;
        // One or two terms must all appear; longer headings need two thirds of them.
        const needed = terms.length <= 2 ? terms.length : Math.ceil((terms.length * 2) / 3);
        const inIntro = terms.filter((term) => mentions(intro, term));
        const inPage = terms.filter((term) => mentions(after, term));
        const named = terms.slice(0, 4).join(", ");

        if (inIntro.length >= needed) {
            set("entity-in-intro", `Topic (${named}) named in the H1 and intro`, true);
        } else if (inPage.length >= needed || inIntro.length > 0) {
            set("entity-in-intro", `Topic (${named}) named later, not in the intro (${inIntro.length} of ${terms.length} in intro)`, "warn");
        } else {
            set("entity-in-intro", `Topic (${named}) from the H1 not repeated in the text`, false);
        }
    }

    const facts = countFacts(spaced);
    set("facts-with-numbers", `5 or more facts with numbers (now ${facts})`, facts >= 5 ? true : facts > 0 ? "warn" : false);

    const outbound = links
        .map((link) => {
            try {
                if (!/^https?:\/\//i.test(link.href)) {
                    return null;
                }

                const url = new URL(link.href);
                const host = url.hostname.toLowerCase().replace(/^www\./, "");

                return host === "google.com" && url.pathname.startsWith("/maps") ? null : { host, text: link.text };
            } catch {
                return null;
            }
        })
        .filter((link) => link && !isOwnHost(link.host) && !hostIs(link.host, NOT_SOURCE_HOSTS));
    const official = outbound.filter(
        (link) => OFFICIAL_SUFFIX.test(link.host) || hostIs(link.host, OFFICIAL_HOSTS) || UNIVERSITY_HOST.test(link.host) || OFFICIAL_LINK_TEXT.test(link.text)
    );

    if (official.length) {
        set("authoritative-links", `Links to official sources (now ${official.length}, e.g. ${official[0].host})`, true);
    } else {
        set(
            "authoritative-links",
            outbound.length ? `No official source among ${outbound.length} outbound links` : "No links to official sources",
            outbound.length ? "warn" : false
        );
    }

    set("contact-link", hasContact ? "Contact or counselling link" : "No contact or counselling link", hasContact);

    const checks = CHECKS.map((check) => ({ id: check.id, label: results[check.id]?.label ?? check.name, ok: results[check.id]?.ok ?? false }));
    const { overall, pillars, aspects } = scoreResults(checks, status);

    return { type, title, score: overall, pillars, aspects, checks };
}

/*
 * Where the server can load its own pages. Behind Hostinger's proxy the
 * request's own origin is an internal address that cannot be fetched.
 * Candidates, in order: AUDIT_ORIGIN if set, the app's local port (only
 * when PORT is known), the public address, the request's origin. An
 * address is used only after /api/seo-probe on it answers with this
 * site's token, so another app or an error page is never mistaken for
 * the website. The verified address is remembered for the process.
 */
const SITE_ORIGIN = "https://medcityoverseas.com";
const PROBE_TOKEN = "medcityoverseas-seo-probe-1";
const CONNECTION_ERRORS = new Set([
    "ECONNREFUSED",
    "ENOTFOUND",
    "EHOSTUNREACH",
    "ECONNRESET",
    "EAI_AGAIN",
    "UND_ERR_CONNECT_TIMEOUT",
]);

export class AuditUnavailableError extends Error {}

/** The request itself is wrong (for example an invalid page address). */
export class AuditInputError extends Error {}


function originCandidates(requestOrigin) {
    return [
        process.env.AUDIT_ORIGIN,
        process.env.PORT ? `http://127.0.0.1:${process.env.PORT}` : "",
        SITE_ORIGIN,
        requestOrigin,
    ].filter((value, index, list) => value && list.indexOf(value) === index);
}

async function isThisSite(origin) {
    try {
        const response = await fetch(`${origin}/api/seo-probe`, {
            redirect: "manual",
            cache: "no-store",
            signal: AbortSignal.timeout(3000),
        });

        if (response.status !== 200) {
            await response.body?.cancel();
            return false;
        }

        return (await response.text()).trim() === PROBE_TOKEN;
    } catch {
        return false;
    }
}

async function verifiedOrigin(requestOrigin, { refresh = false } = {}) {
    if (globalThis.__medcityAuditOrigin && !refresh) {
        return globalThis.__medcityAuditOrigin;
    }

    for (const origin of originCandidates(requestOrigin)) {
        if (await isThisSite(origin)) {
            globalThis.__medcityAuditOrigin = origin;
            return origin;
        }
    }

    globalThis.__medcityAuditOrigin = null;

    return null;
}

async function loadPage(path, requestOrigin) {
    for (const refresh of [false, true]) {
        const origin = await verifiedOrigin(requestOrigin, { refresh });

        if (!origin) {
            break;
        }

        const started = Date.now();

        try {
            const response = await fetch(`${origin}${path}`, {
                redirect: "manual",
                cache: "no-store",
                headers: { "User-Agent": "MedcitySeoAudit/1.0", Accept: "text/html" },
                signal: AbortSignal.timeout(TIMEOUT_MS),
            });

            const html = response.status === 200 ? await response.text() : "";

            if (response.status !== 200) {
                await response.body?.cancel();
            }

            return {
                status: response.status,
                html,
                ms: Date.now() - started,
                timedOut: false,
                headers: { "x-robots-tag": response.headers.get("x-robots-tag") ?? "" },
            };
        } catch (error) {
            // The remembered address stopped answering: find another once.
            if (!refresh && CONNECTION_ERRORS.has(error?.cause?.code)) {
                continue;
            }

            console.error(`SEO check could not load ${path}:`, error);

            // A slow page is a result, not a reason to try other addresses.
            // It is stored as status 504 with the "Timed out" page-loads label.
            if (error?.name === "TimeoutError") {
                return { status: 504, html: "", ms: Date.now() - started, timedOut: true, headers: {} };
            }

            break;
        }
    }

    throw new AuditUnavailableError("The site could not be reached to check this page. Please try again in a minute.");
}

function isMissingColumn(error) {
    return error?.code === "ER_BAD_FIELD_ERROR";
}

function parseJson(text, fallback) {
    if (!text) {
        return fallback;
    }

    try {
        return JSON.parse(text);
    } catch {
        return fallback;
    }
}

/** A stored 504 is a time-out when its page-loads result says so; a real 504 from the site is not. */
export function isTimedOut(status, checks) {
    return Number(status) === 504 && Array.isArray(checks) && checks.some((check) => check?.id === "page-loads" && String(check.label ?? "").startsWith("Timed out"));
}

/* The same test in SQL, so the page list need not load every checks column. */
const TIMED_OUT_SQL = `(status_code = 504 AND checks LIKE '%"id":"page-loads","label":"Timed out%') AS timed_out`;

/** Load a page, score it and save the result. */
export async function auditPage(rawPath, origin) {
    const path = normalisePath(rawPath);

    if (!path) {
        throw new AuditInputError("Invalid page address.");
    }

    const loaded = await loadPage(path, origin);
    const seo = await getPageSeo(path);
    const result = runChecks({ path, seo, ...loaded });
    const title = result.title.slice(0, 300);
    const checks = JSON.stringify(result.checks);
    const checkedAt = now();

    try {
        await query(
            `INSERT INTO web_page_audit
                (path, page_type, status_code, score, score_seo, score_aeo, score_geo, aspect_scores, title, checks, checked_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE page_type = VALUES(page_type), status_code = VALUES(status_code),
                score = VALUES(score), score_seo = VALUES(score_seo), score_aeo = VALUES(score_aeo),
                score_geo = VALUES(score_geo), aspect_scores = VALUES(aspect_scores), title = VALUES(title),
                checks = VALUES(checks), checked_at = VALUES(checked_at)`,
            [
                path,
                result.type,
                loaded.status,
                result.score,
                result.pillars.seo,
                result.pillars.aeo,
                result.pillars.geo,
                JSON.stringify(result.aspects),
                title,
                checks,
                checkedAt,
            ]
        );
    } catch (error) {
        if (!isMissingColumn(error)) {
            throw error;
        }

        // db/006_seo_pillar_scores.sql has not been run yet: save what the old table holds.
        await query(
            `INSERT INTO web_page_audit (path, page_type, status_code, score, title, checks, checked_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE page_type = VALUES(page_type), status_code = VALUES(status_code),
                score = VALUES(score), title = VALUES(title), checks = VALUES(checks), checked_at = VALUES(checked_at)`,
            [path, result.type, loaded.status, result.score, title, checks, checkedAt]
        );
    }

    return {
        path,
        status: loaded.status,
        ms: loaded.ms,
        timedOut: loaded.timedOut,
        type: result.type,
        title: result.title,
        score: result.score,
        pillars: result.pillars,
        aspects: result.aspects,
        checks: result.checks,
    };
}

// Rows saved before checks had ids used the old one-average score; they
// are shown as "Check again" rather than mixed into the new averages.
const HAS_IDS_SQL = `(checks LIKE '[{"id":%') AS has_ids`;

export async function listAudits() {
    // Rows from checks that could not load the page at all are not scores.
    let rows;
    let withPillars = true;

    try {
        rows = await query(
            `SELECT path, page_type, status_code, ${TIMED_OUT_SQL}, ${HAS_IDS_SQL}, score, score_seo, score_aeo, score_geo,
                    aspect_scores, title, checked_at
             FROM web_page_audit WHERE status_code <> 0`
        );
    } catch (error) {
        if (!isMissingColumn(error)) {
            throw error;
        }

        // db/006 not run yet: work the pillar scores out from the stored checks.
        withPillars = false;
        rows = await query(
            `SELECT path, page_type, status_code, ${TIMED_OUT_SQL}, ${HAS_IDS_SQL}, score, checks, title, checked_at
             FROM web_page_audit WHERE status_code <> 0`
        );
    }

    return rows.map((row) => {
        const current = Boolean(Number(row.has_ids));
        const fromChecks = current && !withPillars ? scoreResults(parseJson(row.checks, []), row.status_code) : null;

        return {
            path: row.path,
            page_type: row.page_type,
            status_code: row.status_code,
            timed_out: Boolean(Number(row.timed_out)),
            score: current ? row.score : null,
            score_seo: current ? (fromChecks ? fromChecks.pillars.seo : row.score_seo ?? null) : null,
            score_aeo: current ? (fromChecks ? fromChecks.pillars.aeo : row.score_aeo ?? null) : null,
            score_geo: current ? (fromChecks ? fromChecks.pillars.geo : row.score_geo ?? null) : null,
            aspects: current ? (fromChecks ? fromChecks.aspects : parseJson(row.aspect_scores, null)) : null,
            title: row.title,
            checked_at: row.checked_at,
        };
    });
}

export async function getAudit(path) {
    const rows = await query("SELECT * FROM web_page_audit WHERE path = ? AND status_code <> 0", [normalisePath(path)]);
    const row = rows[0];

    if (!row) {
        return null;
    }

    const parsed = parseJson(row.checks, []);
    const checks = Array.isArray(parsed) ? parsed : [];
    const { aspect_scores: aspectScores, ...rest } = row;

    return {
        ...rest,
        score_seo: row.score_seo ?? null,
        score_aeo: row.score_aeo ?? null,
        score_geo: row.score_geo ?? null,
        aspects: parseJson(aspectScores, null),
        timed_out: isTimedOut(row.status_code, checks),
        checks,
        breakdown: scoreResults(checks, row.status_code),
    };
}
