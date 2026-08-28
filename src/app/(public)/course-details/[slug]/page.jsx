import { redirect } from "next/navigation";

export default async function LegacyCourseDetailsPage({
    params,
}) {
    const { slug } = await params;

    redirect(`/courses/${slug}`);
}