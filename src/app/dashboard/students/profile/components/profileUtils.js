export function getValue(
    value,
    fallback = "Not provided"
) {
    if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
    ) {
        return fallback;
    }

    return String(value);
}

export function normalizeProfile(
    profile
) {
    const name =
        getValue(
            profile?.name
        );

    const email =
        getValue(
            profile?.emailId ||
            profile?.email
        );

    const dob =
        getValue(
            profile?.dob
        );

    const gender =
        getValue(
            profile?.gender
        );

    const address =
        getValue(
            profile?.place ||
            profile?.address
        );

    const mobile =
        getValue(
            profile?.mobile
        );

    const studentId =
        getValue(
            profile?.id
        );

    const stage =
        getValue(
            profile?.stage,
            ""
        );

    const initial =
        name !== "Not provided"
            ? name
                  .charAt(0)
                  .toUpperCase()
            : "S";

    return {
        name,
        email,
        dob,
        gender,
        address,
        mobile,
        studentId,
        stage,
        initial,
    };
}