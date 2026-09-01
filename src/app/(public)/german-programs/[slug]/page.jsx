import { permanentRedirect } from "next/navigation";

export default async function LegacyGermanProgramPage({
    params,
}) {
    const { slug } = await params;

    if (!slug) {
        permanentRedirect("/study-in-germany");
    }

    permanentRedirect(
        `/study-in-germany/${slug}`
    );
}