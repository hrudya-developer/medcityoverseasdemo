import "server-only";

import { query, queryOne } from "@/lib/db";
import { imagePath, now, toId } from "./util";

/*
 * Student endpoints, ported from the Laravel ApiController with the same
 * response shapes. Every caller passes the uid from the signed session
 * cookie, never from the browser (see src/lib/auth/sessionUid.js).
 *
 * Login (sendOTPforLogin / VerifyOTP) is not here: the website uses the
 * safer flow in src/lib/auth/loginCodes.js instead.
 */

const QUALIFICATION_FIELDS = [
    "highest",
    "tenth_syllabus",
    "tenth_overall",
    "twelth_stream",
    "twelth_overall",
    "twelth_english",
    "degree_stream",
    "degree_overall",
    "degree_english",
    "pg_stream",
    "pg_overall",
    "pg_english",
    "ielts_overall",
    "ielts_l",
    "ielts_r",
    "ielts_w",
    "ielts_s",
];

function text(value) {
    return value === undefined || value === null ? "" : String(value);
}

export async function getStudentProfile(input) {
    const uid = toId(input.uid);

    const [data, qualification] = await Promise.all([
        query("SELECT * FROM tb_students WHERE id = ?", [uid]),
        query("SELECT * FROM tb_student_qualification WHERE uid = ?", [uid]),
    ]);

    if (data.length > 0) {
        return { status: true, data, qualification };
    }

    return { status: false, data };
}

export async function setUserProfile(input) {
    const uid = toId(input.uid);

    const student = await queryOne("SELECT id FROM tb_students WHERE id = ?", [uid]);

    if (!student) {
        return { status: false, msg: "Student not found" };
    }

    await query(
        `UPDATE tb_students
         SET name = ?, mobile = ?, code = ?, country = ?, gender = ?, dob = ?, address = ?, stage = 'completed'
         WHERE id = ?`,
        [
            text(input.name),
            text(input.mobile),
            text(input.code),
            text(input.country),
            text(input.gender),
            text(input.dob),
            text(input.address),
            uid,
        ]
    );

    // Laravel inserted an empty qualification row here every time, which
    // left duplicates for students who completed the profile twice.
    const existing = await queryOne(
        "SELECT id FROM tb_student_qualification WHERE uid = ? LIMIT 1",
        [uid]
    );

    if (!existing) {
        const columns = ["uid", ...QUALIFICATION_FIELDS];

        await query(
            `INSERT INTO tb_student_qualification (${columns.join(", ")})
             VALUES (${columns.map(() => "?").join(", ")})`,
            [uid, ...QUALIFICATION_FIELDS.map(() => "")]
        );
    }

    return {
        status: true,
        stage: "completed",
        msg: "Profile successfully updated",
        uid: student.id,
    };
}

export async function updateUserProfile2(input) {
    const uid = toId(input.uid);

    const student = await queryOne("SELECT id FROM tb_students WHERE id = ?", [uid]);

    if (!student) {
        return { status: false };
    }

    await query(
        `UPDATE tb_students
         SET name = ?, code = ?, mobile = ?, country = ?, address = ?, gender = ?, dob = ?
         WHERE id = ?`,
        [
            text(input.name),
            text(input.code),
            text(input.mobile),
            text(input.country),
            text(input.address),
            text(input.gender),
            text(input.dob),
            uid,
        ]
    );

    return { status: true, msg: "Profile successfully updated" };
}

export async function updateQualifications(input) {
    const uid = toId(input.uid);
    const values = QUALIFICATION_FIELDS.map((field) => text(input[field]));

    const existing = await queryOne(
        "SELECT id FROM tb_student_qualification WHERE uid = ? LIMIT 1",
        [uid]
    );

    if (existing) {
        await query(
            `UPDATE tb_student_qualification
             SET ${QUALIFICATION_FIELDS.map((field) => `${field} = ?`).join(", ")}
             WHERE uid = ?`,
            [...values, uid]
        );
    } else {
        const columns = ["uid", ...QUALIFICATION_FIELDS];

        await query(
            `INSERT INTO tb_student_qualification (${columns.join(", ")})
             VALUES (${columns.map(() => "?").join(", ")})`,
            [uid, ...values]
        );
    }

    return { status: true, msg: "Profile successfully updated" };
}

export async function addToPreferlist(input) {
    const uid = toId(input.uid);
    const itemId = toId(input.id);
    const type = text(input.type || "course");

    const exists = await queryOne(
        "SELECT id FROM tb_prefer_list WHERE uid = ? AND itemid = ? AND type = ? AND status = '1' LIMIT 1",
        [uid, itemId, type]
    );

    if (exists) {
        return { status: false, msg: "exist" };
    }

    const result = await query(
        "INSERT INTO tb_prefer_list (type, uid, itemid, status, created_at) VALUES (?, ?, ?, '1', ?)",
        [type, uid, itemId, now()]
    );

    return result?.insertId
        ? { status: true, msg: "added" }
        : { status: false, msg: "failed" };
}

export async function removePreferlist(input) {
    // itemid is the course id, as in Laravel.
    const result = await query(
        "DELETE FROM tb_prefer_list WHERE uid = ? AND itemid = ? AND type = ? AND status = '1'",
        [toId(input.uid), toId(input.id), text(input.type || "course")]
    );

    return { status: Boolean(result?.affectedRows) };
}

export async function getPrefereList(input) {
    return {
        course_image_path: imagePath("icons/"),
        course: await query(
            `SELECT c.*, p.id AS prefid, m.name, m.icon, d.country, u.name AS university, u.location
             FROM tb_prefer_list p
             JOIN tb_courses c ON c.id = p.itemid
             JOIN tb_main_course m ON m.id = c.c_id
             JOIN tb_universities u ON u.id = c.u_id
             JOIN tb_destinations d ON d.id = c.d_id
             WHERE p.status = '1' AND p.type = 'course' AND p.uid = ?`,
            [toId(input.uid)]
        ),
    };
}

function indiaDateDmy() {
    const [date] = now().split(" ");
    const [year, month, day] = date.split("-");

    return `${day}-${month}-${year}`;
}

export async function applyCourse(input) {
    const uid = toId(input.uid);
    const courseId = toId(input.c_id);

    // Do not create a second application for the same course.
    const existing = await queryOne(
        "SELECT id FROM tb_applied_course WHERE uid = ? AND c_id = ? AND status = '1' LIMIT 1",
        [uid, courseId]
    );

    if (existing) {
        return { status: true, msg: "applied" };
    }

    const course = await queryOne("SELECT id FROM tb_courses WHERE id = ?", [courseId]);

    if (!course) {
        return { status: false, msg: "failed" };
    }

    const result = await query(
        `INSERT INTO tb_applied_course (uid, c_id, status, enquiry_status, counsellor, date, created_at)
         VALUES (?, ?, '1', 'NEW', '', ?, ?)`,
        [uid, courseId, indiaDateDmy(), now()]
    );

    return result?.insertId
        ? { status: true, msg: "applied" }
        : { status: false, msg: "failed" };
}

export async function getUserEnquiries(input) {
    const data = await query(
        `SELECT a.*, l.user AS counsellor_name, c.course, u.name, d.country, m.name AS maincourse
         FROM tb_applied_course a
         LEFT JOIN tb_courses c ON c.id = a.c_id
         JOIN tb_universities u ON u.id = c.u_id
         JOIN tb_destinations d ON d.id = c.d_id
         JOIN tb_main_course m ON m.id = c.c_id
         LEFT JOIN login_db l ON a.counsellor = l.id
         WHERE a.uid = ? AND a.status = '1'
         ORDER BY a.created_at DESC`,
        [toId(input.uid)]
    );

    return data.length > 0
        ? { status: true, data }
        : { status: false, data: [] };
}

export async function addFeedback(input) {
    const uid = toId(input.uid);
    const type = text(input.type);
    const message = text(input.message);

    const exists = await queryOne(
        "SELECT id FROM tb_feedbacks WHERE type = ? AND user_id = ? AND message = ? LIMIT 1",
        [type, uid, message]
    );

    if (exists) {
        return { status: false, msg: "Already exist" };
    }

    const result = await query(
        `INSERT INTO tb_feedbacks (user_id, type, problem, message, reply, status, created_at)
         VALUES (?, ?, ?, ?, '', '1', ?)`,
        [uid, type, type, message, now()]
    );

    return result?.insertId
        ? { status: true, msg: "Successfully added" }
        : { status: false, msg: "Failed" };
}

export async function getFeedback(input) {
    return {
        status: true,
        details: await query(
            "SELECT * FROM tb_feedbacks WHERE user_id = ? ORDER BY id DESC",
            [toId(input.uid)]
        ),
    };
}

export async function deleteAccount(input) {
    const uid = toId(input.uid);

    const student = await queryOne("SELECT * FROM tb_students WHERE id = ?", [uid]);

    if (!student) {
        return { status: false, msg: "Profile not deleted" };
    }

    await query(
        `INSERT INTO tb_deleted_students
            (privilage, name, code, mobile, emailId, dob, gender, address, place, avatar, date, otp, verified, stage, status, created_date)
         VALUES ('student', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            student.name,
            student.code,
            student.mobile,
            student.emailId,
            student.dob,
            student.gender,
            student.address,
            student.place,
            student.avatar,
            student.date,
            student.otp,
            student.verified,
            student.stage,
            student.status,
            now(),
        ]
    );

    await query("DELETE FROM tb_students WHERE id = ?", [uid]);

    return { status: true, msg: "Profile deleted" };
}

export async function postEnquiries(input) {
    const values = {
        firstname: text(input.firstname),
        lastname: text(input.lastname),
        email: text(input.email),
        mobile: text(input.mobile),
        destination: text(input.destination),
        nearestidp: text(input.nearestidp),
        studylevel: text(input.studylevel),
        modeofcounselling: text(input.modeofcounselling),
        starttime: text(input.starttime),
        fund: text(input.fund),
        ip: text(input.ip),
    };

    const exists = await queryOne(
        "SELECT id FROM tb_enquiry WHERE email = ? AND destination = ? AND ip = ? LIMIT 1",
        [values.email, values.destination, values.ip]
    );

    if (exists) {
        return { status: false, response: "Existing Data" };
    }

    const columns = Object.keys(values);

    await query(
        `INSERT INTO tb_enquiry (${columns.join(", ")}, status)
         VALUES (${columns.map(() => "?").join(", ")}, '1')`,
        Object.values(values)
    );

    return { status: true, response: "Enquiry sent successfully" };
}
