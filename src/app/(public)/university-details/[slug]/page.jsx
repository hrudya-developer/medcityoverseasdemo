import { redirect } from "next/navigation";

export default async function LegacyUniversityDetailsPage({
    params,
}) {
    const { slug } = await params;

    redirect(`/universities/${slug}`);
}
