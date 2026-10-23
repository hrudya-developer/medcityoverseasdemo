// Shown when the database has no value: never a guess.
export const NOT_RECORDED = "Not recorded";

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
        course?.destination
    );

    const locationName = getValue(
        course?.location,
        course?.city,
        course?.state,
        country,
        NOT_RECORDED
    );

    const level = getValue(
        course?.level,
        course?.course_level,
        course?.study_level,
        NOT_RECORDED
    );

    const duration = getValue(
        course?.duration,
        course?.course_duration,
        NOT_RECORDED
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
            : intakesRaw || NOT_RECORDED;

    // A fee of 0 or a dash is a missing value, not a free course.
    const feesValue = [
        course?.fees,
        course?.tuition_fee,
    ]
        .map((value) => String(value ?? "").trim())
        .find((value) => value && !/^(0+(\.0+)?|-|null|n\/a)$/i.test(value)) || "";

    const currency = getValue(
        course?.currency,
        course?.currency_symbol
    );

    const fees = feesValue
        ? `${currency}${feesValue}`
        : NOT_RECORDED;

    const applicationFee = getValue(
        course?.applicationfee,
        course?.application_fee,
        NOT_RECORDED
    );

    const deadline = getValue(
        course?.deadline,
        course?.application_deadline,
        NOT_RECORDED
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