import CourseSearchClient from "./CourseSearchClient";

export const metadata = {
    title: "Search Study Abroad Courses",
    description:
        "Search study abroad courses by destination, university and study area.",
    robots: {
        index: false,
        follow: true,
    },
};

export default async function CourseSearchPage({
    searchParams,
}) {
    const params = await searchParams;

    return (
        <main>
            <CourseSearchClient
                initialCountryId={
                    params?.countryId || ""
                }
                initialUniversityId={
                    params?.universityId || ""
                }
                initialCourseId={
                    params?.courseId || ""
                }
            />
        </main>
    );
}