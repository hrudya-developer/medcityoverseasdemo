export const createSlug = (value) =>
    String(value ?? "")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const COUNTRY_SLUG_ALIASES = {
    "United Kingdom": "uk",
    "United States": "usa",
    "United States of America": "usa",
};

/** The slug a country uses in /study-in-<slug> and /universities-in-<slug>. */
export function countrySlug(name) {
    const text = String(name ?? "").trim();

    return COUNTRY_SLUG_ALIASES[text] || createSlug(text);
}
