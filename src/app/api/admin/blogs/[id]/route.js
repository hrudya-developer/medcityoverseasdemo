import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { BlogError, deleteBlog, updateBlog } from "@/lib/blogAdmin";

export const runtime = "nodejs";

function handleError(error, fallback) {
    if (error instanceof BlogError) {
        return jsonError(error.message, error.status);
    }

    console.error(fallback, error);

    return jsonError(fallback, 500);
}

export async function PUT(request, { params }) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const { id } = await params;
        const body = await request.json().catch(() => ({}));
        const result = await updateBlog(id, body);

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        return handleError(error, "Could not save the post. Please try again.");
    }
}

export async function DELETE(request, { params }) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const { id } = await params;

        await deleteBlog(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleError(error, "Could not delete the post. Please try again.");
    }
}
