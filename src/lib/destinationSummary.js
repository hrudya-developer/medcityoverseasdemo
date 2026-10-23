import "server-only";

import { cache } from "react";

import { query } from "@/lib/db";
import { countrySlug } from "@/lib/sitemapData";

/*
 * One row per live study destination, straight from the database:
 * the country's own fields and how many universities and courses we
 * list there. Empty fields stay null so pages can show "Not recorded".
 */
export const getDestinationSummaries = cache(async () => {
    try {
        const rows = await query(
            `SELECT d.id, d.country, d.capital, d.language, d.currency,
                    (SELECT COUNT(*) FROM tb_universities u WHERE u.d_id = d.id AND u.status = '1') AS universities,
                    (SELECT COUNT(*) FROM tb_courses c JOIN tb_universities u ON u.id = c.u_id
                      WHERE u.d_id = d.id AND u.status = '1' AND c.status = '1') AS courses
             FROM tb_destinations d
             WHERE d.status = '1'
             ORDER BY d.order ASC`
        );

        const text = (value) => {
            const clean = String(value ?? "").replace(/\s+/g, " ").trim();

            return clean || null;
        };

        return rows
            .map((row) => ({
                id: String(row.id),
                country: text(row.country),
                slug: countrySlug(row.country),
                capital: text(row.capital),
                language: text(row.language),
                currency: text(row.currency),
                universities: Number(row.universities) || 0,
                courses: Number(row.courses) || 0,
            }))
            .filter((row) => row.country && row.slug);
    } catch (error) {
        console.error("Destination summaries could not be loaded:", error);

        return [];
    }
});
