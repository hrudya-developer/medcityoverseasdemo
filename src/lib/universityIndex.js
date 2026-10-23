import "server-only";

import { query } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { createUniversityPublicSlug } from "@/lib/universitySlug";

/*
 * University page addresses (/universities/<name>) carry no id, so we
 * keep a name-slug -> university id list in memory, built from the
 * database and refreshed every 15 minutes. It replaces the old lookup,
 * which guessed the university from search results and failed on names
 * like "St. Thomas University" or "University of Lethbridge - Calgary".
 */

const TTL_MS = 15 * 60 * 1000;

const COUNTRY_ALIASES = {
    "united kingdom": ["uk"],
    "united states": ["usa"],
    "united states of america": ["usa"],
};

async function buildIndex() {
    const [rows, destinations] = await Promise.all([
        query(
            `SELECT u.id, u.name FROM tb_universities u
             WHERE u.status = '1'
             ORDER BY u.id ASC`
        ),
        query("SELECT country FROM tb_destinations"),
    ]);

    const bySlug = new Map();

    for (const row of rows) {
        const slug = createUniversityPublicSlug(row);

        // Same name twice (e.g. two campuses entered alike): the first keeps the address.
        if (slug && !bySlug.has(slug)) {
            bySlug.set(slug, String(row.id));
        }
    }

    // Country endings of old addresses, e.g. coventry-university-uk.
    const countrySuffixes = new Set();

    for (const destination of destinations) {
        const name = String(destination.country ?? "").trim().toLowerCase();

        if (name) {
            countrySuffixes.add(createSlug(name));
            (COUNTRY_ALIASES[name] ?? []).forEach((alias) => countrySuffixes.add(alias));
        }
    }

    return { bySlug, countrySuffixes: [...countrySuffixes].sort((a, b) => b.length - a.length), builtAt: Date.now() };
}

function store() {
    if (!globalThis.__medcityUniversityIndex) {
        globalThis.__medcityUniversityIndex = { value: null, pending: null };
    }

    return globalThis.__medcityUniversityIndex;
}

async function getIndex() {
    const state = store();

    if (state.value && Date.now() - state.value.builtAt < TTL_MS) {
        return state.value;
    }

    if (!state.pending) {
        state.pending = buildIndex()
            .then((value) => {
                state.value = value;
                return value;
            })
            .finally(() => {
                state.pending = null;
            });
    }

    return state.value ?? state.pending;
}

/**
 * { id, slug } for a university address. For an old address with the
 * country on the end, `slug` is the current address (the page redirects).
 * Null when no active university has it.
 */
export async function findUniversityBySlug(rawSlug) {
    const slug = String(rawSlug ?? "").trim().toLowerCase();

    if (!slug) {
        return null;
    }

    const index = await getIndex();
    const exact = index.bySlug.get(slug);

    if (exact) {
        return { id: exact, slug };
    }

    for (const suffix of index.countrySuffixes) {
        if (slug.endsWith(`-${suffix}`)) {
            const base = slug.slice(0, -(suffix.length + 1));
            const id = index.bySlug.get(base);

            if (id) {
                return { id, slug: base };
            }
        }
    }

    return null;
}
