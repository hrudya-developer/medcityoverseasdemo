import "server-only";

import { cache } from "react";

import { query, queryOne } from "@/lib/db";
import { recordedValue } from "@/lib/recordValue";

/*
 * Facts for a country's university page, counted from our own database:
 * how many universities and courses we list, the main student cities,
 * the study levels on offer and the most common course durations (as
 * written in the course records). `latest` is the newest university or
 * course record, for the page's last updated date. Nothing here is
 * estimated.
 */
function named(rows, field) {
    return rows
        .map((row) => ({ name: recordedValue(row[field]), count: Number(row.n) }))
        .filter((row) => row.name);
}

export const getCountryFacts = cache(async (countryId) => {
    const id = String(countryId ?? "").trim();

    if (!id) {
        return null;
    }

    const [totals, cities, levels, durations] = await Promise.all([
        queryOne(
            `SELECT
                (SELECT COUNT(*) FROM tb_universities u WHERE u.d_id = ? AND u.status = '1') AS universities,
                (SELECT COUNT(*) FROM tb_courses c JOIN tb_universities u ON u.id = c.u_id
                  WHERE u.d_id = ? AND u.status = '1' AND c.status = '1') AS courses,
                GREATEST(
                    COALESCE((SELECT MAX(u.created_at) FROM tb_universities u WHERE u.d_id = ? AND u.status = '1'), '1970-01-01'),
                    COALESCE((SELECT MAX(c.created_at) FROM tb_courses c JOIN tb_universities u ON u.id = c.u_id
                      WHERE u.d_id = ? AND u.status = '1' AND c.status = '1'), '1970-01-01')
                ) AS latest`,
            [id, id, id, id]
        ),
        query(
            `SELECT TRIM(location) AS city, COUNT(*) AS n FROM tb_universities
             WHERE d_id = ? AND status = '1' AND location IS NOT NULL AND TRIM(location) <> ''
             GROUP BY TRIM(location) ORDER BY n DESC, city ASC LIMIT 10`,
            [id]
        ),
        query(
            `SELECT TRIM(c.level) AS level, COUNT(*) AS n FROM tb_courses c
             JOIN tb_universities u ON u.id = c.u_id
             WHERE u.d_id = ? AND u.status = '1' AND c.status = '1'
               AND c.level IS NOT NULL AND TRIM(c.level) <> ''
             GROUP BY TRIM(c.level) ORDER BY n DESC LIMIT 10`,
            [id]
        ),
        query(
            `SELECT TRIM(c.duration) AS duration, COUNT(*) AS n FROM tb_courses c
             JOIN tb_universities u ON u.id = c.u_id
             WHERE u.d_id = ? AND u.status = '1' AND c.status = '1'
               AND c.duration IS NOT NULL AND TRIM(c.duration) <> ''
             GROUP BY TRIM(c.duration) ORDER BY n DESC LIMIT 10`,
            [id]
        ),
    ]);

    const latest = totals?.latest instanceof Date
        ? totals.latest
        : totals?.latest
          ? new Date(String(totals.latest).replace(" ", "T"))
          : null;

    return {
        universities: Number(totals?.universities) || 0,
        courses: Number(totals?.courses) || 0,
        // Placeholders ("-", "0", "N/A") are dropped, not shown as values.
        cities: named(cities, "city").slice(0, 6),
        levels: named(levels, "level").slice(0, 5),
        durations: named(durations, "duration").slice(0, 4),
        latest: latest && !Number.isNaN(latest.getTime()) && latest.getFullYear() > 1970 ? latest : null,
    };
});

function listText(items) {
    if (items.length <= 1) {
        return items.join("");
    }

    return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** Plain-language FAQs built only from the facts above. */
export function countryFaqs(countryName, facts) {
    const faqs = [];

    if (facts.universities > 0) {
        faqs.push({
            question: `How many universities in ${countryName} can I apply to through Medcity Overseas?`,
            answer: `Medcity Overseas currently lists ${facts.universities} universities in ${countryName}${
                facts.courses > 0 ? `, with ${facts.courses.toLocaleString("en-IN")} courses between them` : ""
            }. Each university page shows its courses, and our counsellors can shortlist the ones that match your marks, budget and career plans.`,
        });
    }

    if (facts.cities.length > 1) {
        faqs.push({
            question: `Which cities in ${countryName} have the most universities?`,
            answer: `Among the universities we list, the most are in ${listText(
                facts.cities.slice(0, 4).map((city) => city.name)
            )}.`,
        });
    }

    if (facts.levels.length > 0) {
        faqs.push({
            question: `What can Indian students study in ${countryName}?`,
            answer: `The courses we list in ${countryName} include ${listText(
                facts.levels.map((level) => level.name)
            )} programmes. Use the course search to filter by subject, level and intake.`,
        });
    }

    faqs.push({
        question: `How do I apply to a university in ${countryName} from Kerala?`,
        answer: `Book a free counselling session with Medcity Overseas. We check your eligibility, shortlist universities and courses, prepare and submit your applications, and guide you through the offer letter, funding and student visa. Call or WhatsApp +91 90729 82555, or visit any of our 18 branches.`,
    });

    return faqs;
}
