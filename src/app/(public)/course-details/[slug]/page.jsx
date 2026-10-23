import { permanentRedirect } from "next/navigation";

export default async function LegacyCourseDetailsPage({
    params,
}) {
    const { slug } = await params;

    permanentRedirect(`/courses/${slug}`);
}