import "server-only";

import { createPublicCourseSlug } from "@/lib/courseSlug";
import { query } from "@/lib/db";

/*
 * Course page addresses (/courses/<course>-<university>) carry no id,
 * so we keep a slug -> course id list in memory, built from the
 * database and refreshed every 15 minutes. One query covers every
 * active course; a lookup is then instant.
 *
 * Only courses that are active at an active university are listed, so
 * a hidden course or university gives a 404 rather than an empty page.
 */

const TTL_MS = 15 * 60 * 1000;

async function buildIndex() {
    const rows = await query(
        `SELECT c.id, c.course, u.name AS university, u.id AS university_id,
                c.d_id, c.created_at
         FROM tb_courses c
         JOIN tb_universities u ON u.id = c.u_id
         WHERE c.status = '1' AND u.status = '1'
         ORDER BY c.id ASC`
    );

    const bySlug = new Map();
    const list = [];

    for (const row of rows) {
        const slug = createPublicCourseSlug(row);

        // Two courses can share a name at one university (different
        // levels or intakes): the first one keeps the address.
        if (!slug || bySlug.has(slug)) {
            continue;
        }

        const entry = {
            id: String(row.id),
            slug,
            course: row.course,
            university: row.university,
            universityId: String(row.university_id),
            countryId: String(row.d_id ?? ""),
            createdAt: row.created_at,
        };

        bySlug.set(slug, entry);
        list.push(entry);
    }

    return { bySlug, list, builtAt: Date.now() };
}

function store() {
    if (!globalThis.__medcityCourseIndex) {
        globalThis.__medcityCourseIndex = { value: null, pending: null };
    }

    return globalThis.__medcityCourseIndex;
}

/** The current index; rebuilt in the background when stale. */
export async function getCourseIndex() {
    const state = store();
    const fresh = state.value && Date.now() - state.value.builtAt < TTL_MS;

    if (fresh) {
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

    // Serve the old index while a new one builds; wait only the first time.
    if (state.value) {
        return state.value;
    }

    return state.pending;
}

/** { id, slug, course, university, ... } for a course address, or null. */
export async function findCourseBySlug(slug) {
    const key = String(slug ?? "").trim().toLowerCase();

    if (!key) {
        return null;
    }

    const index = await getCourseIndex();

    return index.bySlug.get(key) ?? null;
}

/** Every active course, for the sitemap. */
export async function listCourses() {
    const index = await getCourseIndex();

    return index.list;
}
