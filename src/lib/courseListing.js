import "server-only";

import { cache } from "react";

import { listCourses } from "@/lib/courseIndex";
import { query } from "@/lib/db";
import { getDestinationSummaries } from "@/lib/destinationSummary";
import { intakeList, recordedValue } from "@/lib/recordValue";

/*
 * The most recently added courses, with the fields the course finder
 * page shows in its server-rendered list. Only live courses at live
 * universities in live destinations are counted, the same rule as the
 * destination summaries, so the totals on the page agree. Addresses
 * come from the course index, so every link opens a live course page.
 * Placeholders ("0", "-", "N/A") become null so the page shows
 * "Not recorded". total is null when no real count is known.
 */
const LIVE_COURSES = `FROM tb_courses c
     JOIN tb_universities u ON u.id = c.u_id
     JOIN tb_destinations d ON d.id = u.d_id
     WHERE c.status = '1' AND u.status = '1' AND d.status = '1'`;

export const getLatestCourses = cache(async (limit = 24) => {
    try {
        // The total is the sum of the destination summaries' course
        // counts: the same rule, already cached for 15 minutes.
        const [index, destinations, rows] = await Promise.all([
            listCourses(),
            getDestinationSummaries(),
            query(
                `SELECT c.id, c.level, c.duration, c.intakes, d.country
                 ${LIVE_COURSES}
                 ORDER BY c.id DESC
                 LIMIT ?`,
                // Extra rows cover courses that share an address with another.
                [limit * 2]
            ),
        ]);

        const byId = new Map(index.map((course) => [course.id, course]));
        const text = (value) => recordedValue(value) || null;

        const courses = rows
            .map((row) => {
                const course = byId.get(String(row.id));

                if (!course) {
                    return null;
                }

                const intakes = intakeList(row.intakes);

                return {
                    id: course.id,
                    slug: course.slug,
                    name: text(course.course),
                    university: text(course.university),
                    country: text(row.country),
                    level: text(row.level),
                    duration: text(row.duration),
                    intakes: intakes.length ? intakes.join(", ") : null,
                };
            })
            .filter(Boolean)
            .slice(0, limit);

        const sum = destinations.reduce((total, row) => total + (Number(row.courses) || 0), 0);
        // The summaries' sum is the total only when it covers the rows
        // shown. Otherwise (for example the summaries failed and came
        // back empty) there is no real total: null, and no count is
        // shown, rather than "All 0 courses" or "All 24 courses".
        const total = sum >= courses.length ? sum : null;

        return { total, courses };
    } catch (error) {
        console.error("Latest courses could not be loaded:", error);

        return { total: null, courses: [] };
    }
});
