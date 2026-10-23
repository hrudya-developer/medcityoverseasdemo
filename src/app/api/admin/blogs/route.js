import { NextResponse } from "next/server";

import { clientIp, guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { BlogError, createBlog } from "@/lib/blogAdmin";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const body = await request.json().catch(() => ({}));
        const result = await createBlog(body, clientIp(request));

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        if (error instanceof BlogError) {
            return jsonError(error.message, error.status);
        }

        console.error("Create blog error:", error);

        return jsonError("Could not save the post. Please try again.", 500);
    }
}
