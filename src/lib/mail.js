import "server-only";

import nodemailer from "nodemailer";

/*
 * Outgoing email through the medcityoverseas.com mailbox (Hostinger SMTP).
 *
 * Environment variables:
 *   SMTP_HOST      e.g. smtp.hostinger.com
 *   SMTP_PORT      465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER      the mailbox, e.g. noreply@medcityoverseas.com
 *   SMTP_PASSWORD  the mailbox password
 *   MAIL_FROM      optional display sender, defaults to SMTP_USER
 */

function getTransport() {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;

    if (!host || !user || !pass) {
        return null;
    }

    if (!globalThis.__medcityMailTransport) {
        const port = Number(process.env.SMTP_PORT || 465);

        globalThis.__medcityMailTransport = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
    }

    return globalThis.__medcityMailTransport;
}

export function isMailConfigured() {
    return getTransport() !== null;
}

export async function sendMail({ to, subject, text, html }) {
    const transport = getTransport();

    if (!transport) {
        throw new Error("Email is not configured (SMTP_HOST, SMTP_USER, SMTP_PASSWORD).");
    }

    const user = process.env.SMTP_USER;
    const from = process.env.MAIL_FROM || `Medcity Study Abroad <${user}>`;

    await transport.sendMail({ from, to, subject, text, html });
}
