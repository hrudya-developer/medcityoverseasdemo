import CourseDetailsClient from "./CourseDetailsClient";

export default async function CourseDetailsPage({
    params,
}) {
    const { id } = await params;

    return (
        <CourseDetailsClient
            id={id}
        />
    );
}