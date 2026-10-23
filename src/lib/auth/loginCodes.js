import "server-only";

import crypto from "crypto";

import { query, queryOne } from "@/lib/db";
import { now } from "@/lib/legacy/util";
import { isMailConfigured, sendMail } from "@/lib/mail";

/*
 * Email sign-in codes for the website.
 *
 * Replaces the Laravel sendOTPforLogin / VerifyOTP pair, which returned the
 * code in its own response, used 4 digits that never expired and allowed
 * unlimited guesses. Here:
 *   - the code is 6 digits, emailed only, never returned to the browser;
 *   - it is stored as a hash and expires after 10 minutes;
 *   - 5 wrong attempts kill it;
 *   - an email can request 3 codes per 10 minutes, an IP 20 per hour.
 *
 * Needs the web_login_codes table (db/001_web_login_codes.sql).
 */

export const CODE_LENGTH = 6;

const CODE_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const MAX_CODES_PER_EMAIL = 3;
const MAX_CODES_PER_IP = 20;

export class LoginCodeError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

export function normaliseEmail(value) {
    return String(value ?? "").trim().toLowerCase();
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 191;
}

function hashCode(email, code) {
    const secret = process.env.AUTH_SESSION_SECRET;

    if (!secret) {
        throw new LoginCodeError("Server configuration error.", 500);
    }

    return crypto
        .createHmac("sha256", secret)
        .update(`${email}:${code}`)
        .digest("hex");
}

function generateCode() {
    return String(crypto.randomInt(0, 10 ** CODE_LENGTH)).padStart(CODE_LENGTH, "0");
}

async function deliverCode(email, code) {
    const text =
        `${code} is your Medcity Study Abroad sign-in code.\n\n` +
        `It expires in ${CODE_TTL_MINUTES} minutes. If you did not ask for it, ignore this email.`;

    if (!isMailConfigured()) {
        if (process.env.NODE_ENV !== "production") {
            // Local development only: no mailbox configured.
            console.info(`[dev] Sign-in code for ${email}: ${code}`);
            return;
        }

        throw new LoginCodeError("Email is not available right now. Please try again later.", 503);
    }

    await sendMail({
        to: email,
        subject: `${code} is your Medcity sign-in code`,
        text,
    });
}

/**
 * Create and email a new sign-in code.
 */
export async function requestLoginCode(rawEmail, ip = "") {
    const email = normaliseEmail(rawEmail);

    if (!isValidEmail(email)) {
        throw new LoginCodeError("Enter a valid email address.");
    }

    const [emailCount, ipCount] = await Promise.all([
        queryOne(
            "SELECT COUNT(*) AS n FROM web_login_codes WHERE email = ? AND created_at > UTC_TIMESTAMP() - INTERVAL 10 MINUTE",
            [email]
        ),
        ip
            ? queryOne(
                  "SELECT COUNT(*) AS n FROM web_login_codes WHERE ip = ? AND created_at > UTC_TIMESTAMP() - INTERVAL 1 HOUR",
                  [ip]
              )
            : Promise.resolve({ n: 0 }),
    ]);

    if (Number(emailCount?.n) >= MAX_CODES_PER_EMAIL || Number(ipCount?.n) >= MAX_CODES_PER_IP) {
        throw new LoginCodeError("Too many codes requested. Please wait a few minutes and try again.", 429);
    }

    const code = generateCode();

    await query(
        `INSERT INTO web_login_codes (email, code_hash, attempts, expires_at, created_at, ip)
         VALUES (?, ?, 0, UTC_TIMESTAMP() + INTERVAL ${CODE_TTL_MINUTES} MINUTE, UTC_TIMESTAMP(), ?)`,
        [email, hashCode(email, code), String(ip).slice(0, 64)]
    );

    await deliverCode(email, code);

    return { status: true, msg: "A sign-in code has been sent to your email." };
}

async function findOrCreateStudent(email) {
    const student = await queryOne(
        "SELECT id, name, stage FROM tb_students WHERE emailId = ? ORDER BY id ASC LIMIT 1",
        [email]
    );

    if (student) {
        if (student.stage === "verification") {
            await query(
                "UPDATE tb_students SET status = '1', stage = 'verified' WHERE id = ?",
                [student.id]
            );

            return { ...student, stage: "verified" };
        }

        return student;
    }

    const timestamp = now();

    // Same defaults the Laravel API used for a new student.
    const result = await query(
        `INSERT INTO tb_students
            (privilage, name, code, mobile, emailId, dob, gender, address, place, avatar, date, otp, verified, stage, status, created_date)
         VALUES ('student', '', '', '', ?, '', '', '', '', '', ?, '', 'email', 'verified', '1', ?)`,
        [email, timestamp, timestamp]
    );

    return { id: result.insertId, name: "", stage: "verified" };
}

/**
 * Check a code. On success returns the student; the code is used up.
 */
export async function verifyLoginCode(rawEmail, rawCode) {
    const email = normaliseEmail(rawEmail);
    const code = String(rawCode ?? "").trim();

    if (!isValidEmail(email)) {
        throw new LoginCodeError("Enter a valid email address.");
    }

    if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(code)) {
        throw new LoginCodeError(`Enter the ${CODE_LENGTH}-digit code from your email.`);
    }

    const row = await queryOne(
        `SELECT id, code_hash, attempts FROM web_login_codes
         WHERE email = ? AND expires_at > UTC_TIMESTAMP()
         ORDER BY id DESC LIMIT 1`,
        [email]
    );

    if (!row || row.attempts >= MAX_ATTEMPTS) {
        throw new LoginCodeError("This code has expired. Please request a new one.", 401);
    }

    const expected = Buffer.from(row.code_hash, "hex");
    const actual = Buffer.from(hashCode(email, code), "hex");

    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
        await query("UPDATE web_login_codes SET attempts = attempts + 1 WHERE id = ?", [row.id]);

        throw new LoginCodeError("Invalid code. Please check and try again.", 401);
    }

    // Used up: remove every code for this email.
    await query("DELETE FROM web_login_codes WHERE email = ?", [email]);

    const student = await findOrCreateStudent(email);

    return {
        uid: student.id,
        email,
        name: student.name || "",
        stage: student.stage || "verified",
    };
}
