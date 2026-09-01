import CourseDetailsClient from "./CourseDetailsClient";

export default async function CourseDetailsPage({
    params,
}) {
    const {
        slug,
    } = await params;

    return (
        <CourseDetailsClient
            slug={slug}
        />
    );
}