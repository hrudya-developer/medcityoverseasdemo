export const getValue = (...values) =>
    values.find(
        (value) =>
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
    ) || "";

export const formatCourseDetails = (course) => {
    const courseTitle = getValue(
        course?.course,
        course?.name,
        course?.course_name,
        course?.title,
        "Course Details"
    );

    const universityName = getValue(
        course?.university,
        course?.university_name,
        course?.u_name,
        "University"
    );

    const country = getValue(
        course?.country,
        course?.country_name,
        course?.destination,
        "N/A"
    );

    const locationName = getValue(
        course?.location,
        course?.city,
        course?.state,
        country,
        "Location not available"
    );

    const level = getValue(
        course?.level,
        course?.course_level,
        course?.study_level,
        "N/A"
    );

    const duration = getValue(
        course?.duration,
        course?.course_duration,
        "N/A"
    );

    const remarks = getValue(
        course?.remarks,
        course?.description,
        course?.course_description,
        "Course details are not available."
    );

    const entryRequirement = getValue(
        course?.entryrequirement,
        course?.entry_requirement,
        "Entry requirement not available."
    );

    const intakesRaw = getValue(
        course?.intakes,
        course?.intake
    );

    const intakeItems = intakesRaw
        ? String(intakesRaw)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    const intakes =
        intakeItems.length === 12
            ? "All Year Round"
            : intakesRaw || "Not available";

    const feesValue = getValue(
        course?.fees,
        course?.tuition_fee
    );

    const currency = getValue(
        course?.currency,
        course?.currency_symbol
    );

    const fees = feesValue
        ? `${currency}${feesValue}`
        : "Not available";

    const applicationFee = getValue(
        course?.applicationfee,
        course?.application_fee,
        "N/A"
    );

    const deadline = getValue(
        course?.deadline,
        course?.application_deadline,
        "N/A"
    );

    const universityLogoUrl = getValue(
        course?.university_logo,
        course?.logo,
        course?.image
    );

    const fieldOfStudy = getValue(
        course?.field,
        course?.name,
        courseTitle
    );

    return {
        courseTitle,
        universityName,
        country,
        locationName,
        level,
        duration,
        remarks,
        entryRequirement,
        intakesRaw,
        intakes,
        fees,
        applicationFee,
        deadline,
        universityLogoUrl,
        fieldOfStudy,
    };
};