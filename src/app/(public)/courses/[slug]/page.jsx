import CourseDetailsClient from "./CourseDetailsClient";

export default async function CourseDetailsPage({
    params,
}) {
    const { slug: courseSlug } = await params;

    return (
        <CourseDetailsClient
            id={courseSlug}
        />
    );
}