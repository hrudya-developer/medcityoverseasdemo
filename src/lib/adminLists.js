import "server-only";

import { query, queryOne } from "@/lib/db";
import { likePattern } from "@/lib/legacy/util";

/*
 * Read-only lists for the website admin, so enquiries and course
 * applications made on the website can be followed up while the old
 * staff admin still runs on its own database.
 */

export const PAGE_SIZE = 50;

function pageNumber(value) {
    return Math.max(1, Number.parseInt(value, 10) || 1);
}

export async function listEnquiries({ page, q } = {}) {
    const current = pageNumber(page);
    const search = String(q ?? "").trim().slice(0, 100);

    const where = search
        ? "WHERE e.firstname LIKE ? OR e.lastname LIKE ? OR e.email LIKE ? OR e.mobile LIKE ?"
        : "";
    const params = search ? Array(4).fill(likePattern(search)) : [];

    const [rows, total] = await Promise.all([
        query(
            `SELECT e.id, e.firstname, e.lastname, e.email, e.mobile, e.studylevel, e.nearestidp,
                    e.modeofcounselling, e.starttime, e.date,
                    COALESCE(d.country, e.destination) AS destination
             FROM tb_enquiry e
             LEFT JOIN tb_destinations d ON d.id = e.destination
             ${where}
             ORDER BY e.id DESC
             LIMIT ${PAGE_SIZE} OFFSET ${(current - 1) * PAGE_SIZE}`,
            params
        ),
        queryOne(`SELECT COUNT(*) AS n FROM tb_enquiry e ${where}`, params),
    ]);

    return { rows, total: Number(total?.n) || 0, page: current, q: search };
}

export async function listApplications({ page, q } = {}) {
    const current = pageNumber(page);
    const search = String(q ?? "").trim().slice(0, 100);

    const where = search
        ? "WHERE s.name LIKE ? OR s.emailId LIKE ? OR s.mobile LIKE ? OR c.course LIKE ? OR u.name LIKE ?"
        : "";
    const params = search ? Array(5).fill(likePattern(search)) : [];

    const from = `FROM tb_applied_course a
             LEFT JOIN tb_students s ON s.id = a.uid
             LEFT JOIN tb_courses c ON c.id = a.c_id
             LEFT JOIN tb_universities u ON u.id = c.u_id
             LEFT JOIN tb_destinations d ON d.id = c.d_id
             LEFT JOIN login_db l ON l.id = a.counsellor`;

    const [rows, total] = await Promise.all([
        query(
            `SELECT a.id, a.enquiry_status, a.created_at,
                    s.name AS student_name, s.emailId AS student_email, s.code AS student_code,
                    s.mobile AS student_mobile,
                    c.course, u.name AS university, d.country, l.user AS counsellor
             ${from}
             ${where}
             ORDER BY a.id DESC
             LIMIT ${PAGE_SIZE} OFFSET ${(current - 1) * PAGE_SIZE}`,
            params
        ),
        queryOne(`SELECT COUNT(*) AS n ${from} ${where}`, params),
    ]);

    return { rows, total: Number(total?.n) || 0, page: current, q: search };
}
