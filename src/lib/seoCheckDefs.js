/*
 * What the SEO manager checks and how it scores, shared by the server
 * (seoAudit.js) and the admin screens. No server-only imports here.
 *
 * Three pillars, each scored 1-100:
 *   SEO  search engines (Google, Bing)
 *   AEO  answer engines (featured snippets, People also ask, voice)
 *   GEO  generative AI search (ChatGPT, Perplexity, Gemini, AI Overviews)
 * Each pillar has main aspects, each aspect has checks. Inside a pillar
 * every check is worth the same and "could be better" counts half. The
 * overall score is the average of the three pillars.
 *
 * A stored check result is { id, label, ok } where ok is true, "warn" or
 * false, and label carries live numbers ("now 92").
 */

export const PILLARS = [
    {
        key: "seo",
        name: "SEO",
        description: "Search engines",
        aspects: [
            { key: "technical", name: "Technical" },
            { key: "listing", name: "Google listing" },
            { key: "content", name: "Content" },
        ],
    },
    {
        key: "aeo",
        name: "AEO",
        description: "Answer engines and featured snippets",
        aspects: [
            { key: "answers", name: "Answer format" },
            { key: "markup", name: "Answer markup" },
        ],
    },
    {
        key: "geo",
        name: "GEO",
        description: "AI search (ChatGPT, Perplexity, Gemini)",
        aspects: [
            { key: "entity", name: "Entity and trust" },
            { key: "citable", name: "Citable content" },
        ],
    },
];

export const ASPECTS = PILLARS.flatMap((pillar) => pillar.aspects.map((aspect) => ({ ...aspect, pillar: pillar.key })));

/** Every check, in the order the checker produces them. */
export const CHECKS = [
    // SEO / Technical
    { id: "page-loads", aspect: "technical", name: "Page loads", hint: "The page must answer with status 200." },
    { id: "fast-response", aspect: "technical", name: "Fast response", hint: "Under 1.5 s is good; over 3.5 s fails." },
    { id: "indexable", aspect: "technical", name: "Allowed in search results", hint: "Remove noindex from the robots meta tag." },
    { id: "canonical", aspect: "technical", name: "Canonical address", hint: "The canonical link must point to this exact address." },

    // SEO / Google listing
    { id: "title-length", aspect: "listing", name: "Title length", hint: "30 to 65 characters, including the brand." },
    { id: "meta-description", aspect: "listing", name: "Meta description", hint: "120 to 160 characters that sum up the page." },
    { id: "og-image", aspect: "listing", name: "Share image", hint: "Add an og:image so links show a picture." },
    { id: "focus-keyword", aspect: "listing", name: "Focus keyword", hint: "Set a focus keyword and use it in the title and description." },

    // SEO / Content
    { id: "h1", aspect: "content", name: "One main heading (H1)", hint: "Exactly one H1 per page." },
    { id: "subheadings", aspect: "content", name: "Subheadings", hint: "At least 2 H2 subheadings." },
    { id: "word-count", aspect: "content", name: "Enough words", hint: "Enough text for this page type." },
    { id: "image-alt", aspect: "content", name: "Pictures described", hint: "Every picture needs alt text." },
    { id: "internal-links", aspect: "content", name: "Links to other pages", hint: "At least 3 links to other pages on the site." },

    // AEO / Answer format
    { id: "quick-answer", aspect: "answers", name: "Quick answer near the top", hint: "Add a short summary (In short / Quick answer) at the top." },
    { id: "question-heading", aspect: "answers", name: "Heading written as a question", hint: "Use at least one H2 or H3 phrased as a question." },
    { id: "direct-answer", aspect: "answers", name: "Short direct answer", hint: "Follow a question heading with a 40 to 60 word answer paragraph." },
    { id: "list-or-table", aspect: "answers", name: "List or table", hint: "Use a bullet list, numbered steps or a table." },

    // AEO / Answer markup
    { id: "faq-schema", aspect: "markup", name: "FAQ markup", hint: "Add FAQs; they are marked up as FAQPage automatically." },
    { id: "breadcrumb-schema", aspect: "markup", name: "Breadcrumb markup", hint: "Add BreadcrumbList structured data." },

    // GEO / Entity and trust
    { id: "structured-data", aspect: "entity", name: "Structured data", hint: "Valid JSON-LD with no errors." },
    { id: "entity-schema", aspect: "entity", name: "Main entity described", hint: "Mark up what the page is about: Organization, Course, CollegeOrUniversity, Article, Place or similar." },
    { id: "author-or-org", aspect: "entity", name: "Author or organisation named", hint: "Name the author or Medcity Overseas as publisher in the markup or byline." },
    { id: "updated-date", aspect: "entity", name: "Last updated date", hint: "Show a last updated date or add dateModified to the markup." },
    { id: "ai-crawlers", aspect: "entity", name: "AI crawlers allowed", hint: "Do not block AI crawlers with noai or nosnippet." },

    // GEO / Citable content
    { id: "entity-in-intro", aspect: "citable", name: "Topic named in heading and intro", hint: "Name the subject (country, university, course) in the H1 and the first paragraph." },
    { id: "facts-with-numbers", aspect: "citable", name: "Concrete facts with numbers", hint: "Include figures such as fees, durations, dates or intakes." },
    { id: "authoritative-links", aspect: "citable", name: "Links to official sources", hint: "Link to a government or university site." },
    { id: "contact-link", aspect: "citable", name: "Contact or counselling link", hint: "Link to a phone number, WhatsApp or /contact-us." },
];

export const CHECK_BY_ID = Object.fromEntries(CHECKS.map((check) => [check.id, check]));

export const ASPECT_BY_KEY = Object.fromEntries(ASPECTS.map((aspect) => [aspect.key, aspect]));

/** The pillar key ("seo", "aeo" or "geo") of a check id. */
export function pillarOf(id) {
    return ASPECT_BY_KEY[CHECK_BY_ID[id]?.aspect]?.pillar ?? null;
}

function points(ok) {
    return ok === true ? 1 : ok === "warn" ? 0.5 : 0;
}

function scoreList(list) {
    if (!list.length) {
        return null;
    }

    return Math.max(1, Math.round((list.reduce((sum, check) => sum + points(check.ok), 0) / list.length) * 100));
}

/**
 * All scores for a page's check results:
 * { overall, pillars: { seo, aeo, geo }, aspects: { technical, listing, ... } }.
 * A page that did not load scores 1 everywhere. Results without a known
 * id (rows saved before pillars existed) are ignored; if none are known
 * every score is null, meaning "check again".
 */
export function scoreResults(checks, status = 200) {
    const known = (Array.isArray(checks) ? checks : []).filter((check) => CHECK_BY_ID[check?.id]);

    if (!known.length) {
        return {
            overall: null,
            pillars: Object.fromEntries(PILLARS.map((pillar) => [pillar.key, null])),
            aspects: Object.fromEntries(ASPECTS.map((aspect) => [aspect.key, null])),
        };
    }

    const failed = status !== 200;

    const aspects = Object.fromEntries(
        ASPECTS.map((aspect) => [aspect.key, failed ? 1 : scoreList(known.filter((check) => CHECK_BY_ID[check.id].aspect === aspect.key))])
    );

    const pillars = Object.fromEntries(
        PILLARS.map((pillar) => [pillar.key, failed ? 1 : scoreList(known.filter((check) => pillarOf(check.id) === pillar.key))])
    );

    const values = Object.values(pillars).filter((value) => value !== null);
    const overall = failed ? 1 : values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null;

    return { overall, pillars, aspects };
}

/** "pass", "warn" or "fail" for a check result. */
export function resultOf(ok) {
    return ok === true ? "pass" : ok === "warn" ? "warn" : "fail";
}

export function scoreTone(score) {
    if (score === null || score === undefined) return "bg-slate-100 text-slate-500";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 50) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-700";
}
