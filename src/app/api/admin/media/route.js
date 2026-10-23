import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { MediaError, saveUploadedImage } from "@/lib/media";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const form = await request.formData();
        const image = await saveUploadedImage(form.get("file"), admin.email);

        return NextResponse.json({ success: true, ...image });
    } catch (error) {
        if (error instanceof MediaError) {
            return jsonError(error.message, error.status);
        }

        console.error("Image upload error:", error);

        return jsonError("Upload failed. Please try again.", 500);
    }
}
