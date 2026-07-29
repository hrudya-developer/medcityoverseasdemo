export const toOptions = (items = []) =>
    items
        .map((item) => ({
            value: String(
                item?.id ??
                item?.d_id ??
                item?.u_id ??
                item?.university_id ??
                item?.maincourse_id ??
                item?.main_course_id ??
                item?.course_id ??
                ""
            ),

            label:
                item?.name ??
                item?.destination_name ??
                item?.country_name ??
                item?.university_name ??
                item?.main_course ??
                item?.main_course_name ??
                item?.course_name ??
                "Unnamed option",
        }))
        .filter(
            (option) =>
                option.value &&
                option.label
        );

export const extractCourses = (
    response
) => {
    if (
        Array.isArray(response?.courses)
    ) {
        return response.courses;
    }

    if (
        Array.isArray(response?.data)
    ) {
        return response.data;
    }

    if (
        Array.isArray(response?.results)
    ) {
        return response.results;
    }

    if (Array.isArray(response)) {
        return response;
    }

    return [];
};

export const extractNextOffset = (
    response
) => {
    const nextOffset =
        response?.nextOffset ??
        response?.next_offset ??
        response?.next ??
        null;

    if (
        nextOffset === null ||
        nextOffset === undefined ||
        nextOffset === ""
    ) {
        return null;
    }

    return String(nextOffset);
};