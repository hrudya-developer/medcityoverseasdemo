import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import { query } from "@/lib/db";
import { recordedValue } from "@/lib/recordValue";

/*
 * Course areas (tb_main_course) with what we list in each, counted from
 * the database: live courses, the universities and countries offering
 * them (courses at hidden universities are not counted), and the most
 * common course duration as written in the course records. Nothing is
 * estimated; missing values stay null. Cached for 15 minutes.
 */
// Errors are thrown so unstable_cache never stores a failed result.
const cachedCourseAreas = unstable_cache(
    async () => {
        const [areas, durations] = await Promise.all([
            query(
                `SELECT m.id, m.name, m.popular,
                        COUNT(u.id) AS courses,
                        COUNT(DISTINCT u.id) AS universities,
                        COUNT(DISTINCT u.d_id) AS countries
                 FROM tb_main_course m
                 LEFT JOIN tb_courses c ON c.c_id = m.id AND c.status = '1'
                 LEFT JOIN tb_universities u ON u.id = c.u_id AND u.status = '1'
                 WHERE m.status = '1'
                 GROUP BY m.id, m.name, m.popular, m.order
                 ORDER BY (m.popular = 'true') DESC, m.order ASC`
            ),
            query(
                `SELECT c.c_id, TRIM(c.duration) AS duration, COUNT(*) AS n
                 FROM tb_courses c
                 JOIN tb_universities u ON u.id = c.u_id AND u.status = '1'
                 WHERE c.status = '1' AND c.duration IS NOT NULL AND TRIM(c.duration) <> ''
                 GROUP BY c.c_id, TRIM(c.duration)
                 ORDER BY n DESC`
            ),
        ]);

        const commonDuration = new Map();

        for (const row of durations) {
            const key = String(row.c_id);

            const duration = recordedValue(row.duration);

            // "0", "-" and "N/A" are not durations.
            if (duration && !commonDuration.has(key)) {
                commonDuration.set(key, duration);
            }
        }

        return areas
            .map((row) => ({
                id: String(row.id),
                name: String(row.name ?? "").replace(/\s+/g, " ").trim(),
                popular: String(row.popular) === "true",
                courses: Number(row.courses) || 0,
                universities: Number(row.universities) || 0,
                countries: Number(row.countries) || 0,
                duration: commonDuration.get(String(row.id)) ?? null,
            }))
            .filter((row) => row.name);
    },
    ["course-area-summaries-v1"],
    { revalidate: 15 * 60 }
);

export const getCourseAreaSummaries = cache(async () => {
    try {
        return await cachedCourseAreas();
    } catch (error) {
        console.error("Course area summaries could not be loaded:", error);

        return [];
    }
});
