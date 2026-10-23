import "server-only";

import { query, queryOne } from "@/lib/db";
import { imagePath, legacyOffset, likePattern, toId, today } from "./util";

/*
 * Universities, courses and search, ported one-to-one from the Laravel
 * ApiController. Response shapes are unchanged.
 */

const COURSE_JOIN = `
    FROM tb_courses c
    JOIN tb_main_course m ON m.id = c.c_id
    JOIN tb_universities u ON u.id = c.u_id
    JOIN tb_destinations d ON d.id = c.d_id`;

function insight(table, id, uid) {
    // View tracking, as before. A failure here must not break the page.
    query(`INSERT INTO ${table} (did, uid, date) VALUES (?, ?, ?)`, [
        id,
        String(uid ?? ""),
        today(),
    ]).catch((error) => {
        console.error(`${table} insert failed:`, error.message);
    });
}

export async function getUniversitybyOffset(input) {
    const destinationId = toId(input.id);
    const offset = legacyOffset(input.offset);
    const keyword = String(input.keyword ?? "");

    let universities;

    if (keyword === "alluniversities") {
        // Laravel returned every university of the country in one go here.
        universities = await query(
            "SELECT * FROM tb_universities WHERE d_id = ? AND status = '1' ORDER BY `order` ASC",
            [destinationId]
        );
    } else {
        // The Laravel version chained orWhere() without grouping, which let
        // matches from every country through. Grouped here so the search
        // stays inside the chosen country.
        const contains = likePattern(keyword, "contains");

        universities = await query(
            `SELECT * FROM tb_universities
             WHERE d_id = ? AND status = '1' AND (name LIKE ? OR location LIKE ?)
             ORDER BY \`order\` ASC
             LIMIT 20 OFFSET ?`,
            [destinationId, contains, contains, offset]
        );
    }

    const response = {
        universities_image_path: imagePath("university/"),
    };

    if (universities.length > 0) {
        return {
            ...response,
            status: true,
            nextoffset: offset + 20,
            universities,
        };
    }

    return { ...response, status: false, nextoffset: "0" };
}

export async function getUniversityDetails(input) {
    const id = toId(input.id);

    const [data, course, info, sliders] = await Promise.all([
        query(
            `SELECT u.*, d.image AS countrypic, d.country
             FROM tb_universities u
             JOIN tb_destinations d ON d.id = u.d_id
             WHERE u.id = ?
             ORDER BY u.\`order\` ASC`,
            [id]
        ),
        query(
            `SELECT c.*, m.name, m.icon, d.country, u.name AS university, u.location
             ${COURSE_JOIN}
             WHERE c.u_id = ?`,
            [id]
        ),
        query("SELECT text, type FROM tb_university_info WHERE u_id = ?", [id]),
        query("SELECT * FROM tb_university_sliders WHERE u_id = ?", [id]),
    ]);

    insight("tb_insight_university", id, input.uid);

    return {
        universities_image_path: imagePath("university/"),
        slider_image_path: imagePath("university/slider/"),
        destinations_image_path: imagePath("destinations/"),
        maincourse_image_path: imagePath("icons/"),
        data,
        course,
        info,
        sliders,
    };
}

export async function getAllUniversityCoursesLatest(input) {
    const offset = legacyOffset(input.offset);

    const course = await query(
        `SELECT c.*, m.name, m.icon, d.country, u.name AS university, u.location
         ${COURSE_JOIN}
         WHERE c.c_id = ? AND c.u_id = ? AND c.status = '1'
         LIMIT 20 OFFSET ?`,
        [toId(input.c_id), toId(input.u_id), offset]
    );

    const response = {
        maincourse_image_path: imagePath("icons/"),
    };

    if (course.length > 0) {
        return {
            ...response,
            status: true,
            nextoffset: offset + 20,
            course,
        };
    }

    return { ...response, status: false, nextoffset: "0" };
}

export async function getCoursebyMainUniversity(input) {
    return {
        maincourse_image_path: imagePath("icons/"),
        main_courses: await query(
            `SELECT c.c_id, m.name, m.icon,
                    CASE WHEN c.c_id IS NULL THEN 0 ELSE COUNT(c.c_id) END AS courses
             FROM tb_courses c
             JOIN tb_main_course m ON m.id = c.c_id
             WHERE c.u_id = ?
             GROUP BY c.c_id, m.name, m.icon
             ORDER BY m.name ASC`,
            [toId(input.u_id)]
        ),
    };
}

export async function getCoursedetails(input) {
    const id = toId(input.id);
    const uid = String(input.uid ?? "");

    const base = await queryOne("SELECT d_id FROM tb_courses WHERE id = ?", [id]);

    if (!base) {
        // Laravel crashed with a 500 here; return an empty result instead.
        return {
            universities_image_path: imagePath("university/"),
            maincourse_image_path: imagePath("icons/"),
            course: [],
            preferlist: [],
            applied: false,
        };
    }

    const isGermany = String(base.d_id) === "6";

    const [course, preferlist, applied] = await Promise.all([
        query(
            `SELECT c.*, m.name, m.icon, d.country, u.name AS university, u.image, u.location, u.logo
             ${COURSE_JOIN}
             WHERE c.id = ?`,
            [id]
        ),
        query(
            "SELECT * FROM tb_prefer_list WHERE itemid = ? AND type = 'course' AND status = '1' AND uid = ?",
            [id, uid]
        ),
        queryOne(
            "SELECT id FROM tb_applied_course WHERE uid = ? AND c_id = ? AND status = '1' LIMIT 1",
            [uid, id]
        ),
    ]);

    insight("tb_insight_course", id, uid);

    return {
        universities_image_path: imagePath("university/"),
        maincourse_image_path: imagePath("icons/"),
        adname: isGermany ? "com.medcity.germanapp" : "com.medcity.ieltsapp",
        ieltsappad: imagePath(isGermany ? "slider/app1.jpeg" : "slider/app2.jpeg"),
        course,
        preferlist,
        applied: Boolean(applied),
    };
}

async function searchWithFallback(keyword, runSearch) {
    const results = await runSearch(likePattern(keyword, "contains"));

    if (results.length > 0) {
        return { found: true, results };
    }

    // Laravel retried with the first three characters as a "did you mean".
    const suggestion = await runSearch(
        likePattern(String(keyword).slice(0, 3), "contains")
    );

    return { found: false, results: suggestion };
}

export async function searchResults(input) {
    const keytype = String(input.keytype ?? "");
    const keyword = String(input.keyword ?? "");

    const searches = {
        country: {
            key: "country",
            run: (pattern) =>
                query(
                    "SELECT id, country FROM tb_destinations WHERE country LIKE ? AND status = '1'",
                    [pattern]
                ),
        },
        university: {
            key: "university",
            run: (pattern) =>
                query(
                    `SELECT id, name, location FROM tb_universities
                     WHERE (name LIKE ? OR location LIKE ?) AND status = '1'`,
                    [pattern, pattern]
                ),
        },
        course: {
            key: "course",
            run: (pattern) =>
                query(
                    `SELECT c.id, c.course, u.name AS university
                     FROM tb_courses c
                     JOIN tb_main_course m ON c.c_id = m.id
                     JOIN tb_universities u ON c.u_id = u.id
                     WHERE (c.course LIKE ? OR m.name LIKE ?) AND c.status = '1'
                     GROUP BY c.id, c.course, u.name
                     LIMIT 50`,
                    [pattern, pattern]
                ),
        },
    };

    const search = searches[keytype];

    if (!search) {
        return {};
    }

    const { found, results } = await searchWithFallback(keyword, search.run);

    if (found) {
        return { status: true, [search.key]: results };
    }

    return results.length > 0
        ? { status: false, suggestion: results }
        : { status: false };
}
