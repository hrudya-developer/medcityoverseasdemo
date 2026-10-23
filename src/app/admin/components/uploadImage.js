/** Upload one image to /api/admin/media. Resolves to { id, url, width, height }. */
export async function uploadImage(file) {
    const form = new FormData();

    form.append("file", file);

    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Upload failed. Please try again.");
    }

    return result;
}
