export async function applyCourse(
    courseId
) {
    if (
        courseId === null ||
        courseId === undefined ||
        String(courseId).trim() === ""
    ) {
        throw new Error(
            "Course ID is missing."
        );
    }

    const response =
        await fetch(
            "/api/dashboard/student/courses/apply-course",
            {
                method: "POST",

                credentials:
                    "include",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body:
                    JSON.stringify({
                        c_id:
                            courseId,
                    }),
            }
        );

    const data =
        await response
            .json()
            .catch(() => null);

    console.log(
        "APPLY COURSE API RESPONSE:",
        data
    );

    if (!response.ok) {
        throw new Error(
            data?.msg ||
            data?.message ||
            "Unable to apply for this course."
        );
    }

    if (
        data?.status === false ||
        data?.status === 0 ||
        data?.status === "0"
    ) {
        throw new Error(
            data?.msg ||
            data?.message ||
            "Unable to apply for this course."
        );
    }

    return data;
}