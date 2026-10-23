import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { importImageFromUrl, MediaError, saveUploadedImage } from "@/lib/media";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        // JSON { url } imports an image from medcityacademy.com; a form
        // with a "file" field is an ordinary upload.
        const isJson = (request.headers.get("content-type") ?? "").includes("application/json");

        const image = isJson
            ? await importImageFromUrl((await request.json().catch(() => ({})))?.url, admin.email)
            : await saveUploadedImage((await request.formData()).get("file"), admin.email);

        return NextResponse.json({ success: true, ...image });
    } catch (error) {
        if (error instanceof MediaError) {
            return jsonError(error.message, error.status);
        }

        console.error("Image upload error:", error);

        return jsonError("Upload failed. Please try again.", 500);
    }
}
