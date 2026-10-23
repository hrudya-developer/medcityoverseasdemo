import "server-only";

import sharp from "sharp";

import { query, queryOne } from "@/lib/db";
import { now } from "@/lib/legacy/util";

/*
 * Images uploaded through the website admin (blog covers and pictures
 * inside blog posts).
 *
 * They are stored in the database (web_media table) rather than on disk,
 * because each Hostinger deploy replaces the app's files, and a database
 * row also moves with everything else when the site goes to the VPS.
 * Every upload is resized to at most 1600 px wide and saved as WebP, so
 * a photo straight off a phone ends up a few hundred KB.
 */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const MAX_WIDTH = 1600;

const ACCEPTED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
]);

export class MediaError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

export async function saveUploadedImage(file, uploadedBy) {
    if (!file || typeof file.arrayBuffer !== "function") {
        throw new MediaError("Choose an image to upload.");
    }

    if (!ACCEPTED_TYPES.has(file.type)) {
        throw new MediaError("Upload a JPG, PNG, WebP, AVIF or GIF image.");
    }

    if (file.size > MAX_UPLOAD_BYTES) {
        throw new MediaError("The image is larger than 10 MB. Please use a smaller one.");
    }

    let output;

    try {
        output = await sharp(Buffer.from(await file.arrayBuffer()), { animated: false })
            .rotate()
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer({ resolveWithObject: true });
    } catch {
        throw new MediaError("This file could not be read as an image.");
    }

    const result = await query(
        `INSERT INTO web_media (mime, width, height, bytes, data, original_name, uploaded_by, created_at)
         VALUES ('image/webp', ?, ?, ?, ?, ?, ?, ?)`,
        [
            output.info.width,
            output.info.height,
            output.data.length,
            output.data,
            String(file.name || "").slice(0, 191),
            String(uploadedBy || "").slice(0, 191),
            now(),
        ]
    );

    return {
        id: result.insertId,
        url: `/media/${result.insertId}`,
        width: output.info.width,
        height: output.info.height,
    };
}

export async function getMedia(id) {
    if (!/^\d{1,18}$/.test(String(id))) {
        return null;
    }

    return queryOne("SELECT mime, data FROM web_media WHERE id = ?", [String(id)]);
}

/*
 * Import an image from one of Medcity's own sites by its address, so
 * articles moved over from medcityacademy.com can keep their original
 * cover photo. Only the hosts listed here are fetched, so this cannot
 * be used to make the server call arbitrary addresses.
 */
const IMPORT_HOSTS = new Set(["medcityacademy.com", "www.medcityacademy.com"]);

function checkImportUrl(value) {
    let url;

    try {
        url = new URL(String(value ?? "").trim());
    } catch {
        throw new MediaError("That is not a valid image address.");
    }

    if (
        url.protocol !== "https:" ||
        !IMPORT_HOSTS.has(url.hostname) ||
        url.port !== "" ||
        url.username ||
        url.password
    ) {
        throw new MediaError("Images can only be imported from https://medcityacademy.com.");
    }

    return url;
}

/** Read a response body, stopping as soon as it passes the size limit. */
async function readCapped(response) {
    const reader = response.body?.getReader();

    if (!reader) {
        throw new MediaError("The image could not be downloaded.", 502);
    }

    const chunks = [];
    let total = 0;

    try {
        for (;;) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            total += value.byteLength;

            if (total > MAX_UPLOAD_BYTES) {
                await reader.cancel();
                throw new MediaError("The image is larger than 10 MB.");
            }

            chunks.push(value);
        }
    } catch (error) {
        if (error instanceof MediaError) {
            throw error;
        }

        throw new MediaError("The image could not be downloaded.", 502);
    }

    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

export async function importImageFromUrl(rawUrl, uploadedBy) {
    let url = checkImportUrl(rawUrl);
    let response = null;

    // Follow up to 3 redirects, checking each one stays on medcityacademy.com.
    for (let hop = 0; hop < 4; hop += 1) {
        try {
            response = await fetch(url, {
                redirect: "manual",
                headers: { Accept: "image/*" },
                signal: AbortSignal.timeout(20000),
            });
        } catch {
            throw new MediaError("The image could not be downloaded.", 502);
        }

        const location = response.headers.get("location");

        if (response.status >= 300 && response.status < 400 && location) {
            await response.body?.cancel();

            if (hop === 3) {
                throw new MediaError("The image address redirects too many times. Use its direct address.");
            }

            url = checkImportUrl(new URL(location, url).toString());
            continue;
        }

        break;
    }

    if (!response.ok) {
        await response.body?.cancel();
        throw new MediaError(`The image could not be downloaded (${response.status}).`, 502);
    }

    const type = String(response.headers.get("content-type") ?? "").split(";")[0].trim();

    if (Number(response.headers.get("content-length") ?? 0) > MAX_UPLOAD_BYTES) {
        await response.body?.cancel();
        throw new MediaError("The image is larger than 10 MB.");
    }

    const bytes = await readCapped(response);

    let name = "imported-image";

    try {
        name = decodeURIComponent(url.pathname.split("/").pop() || name);
    } catch {
        name = url.pathname.split("/").pop() || name;
    }

    return saveUploadedImage(new File([bytes], name, { type }), uploadedBy);
}
