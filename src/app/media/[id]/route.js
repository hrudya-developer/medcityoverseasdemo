import { getMedia } from "@/lib/media";

export const runtime = "nodejs";

/*
 * Serves images uploaded through the admin. An id never changes its
 * image (a new upload gets a new id), so browsers may cache it for good.
 */
export async function GET(_request, { params }) {
    const { id } = await params;

    try {
        const media = await getMedia(id);

        if (!media) {
            return new Response("Not found", { status: 404 });
        }

        return new Response(media.data, {
            headers: {
                "Content-Type": media.mime,
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        console.error("Media error:", error);

        return new Response("Unavailable", { status: 503 });
    }
}
