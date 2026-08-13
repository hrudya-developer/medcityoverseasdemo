export function getProfileData(profile) {
    if (!profile) {
        return {};
    }

    // getStudentProfile returns:
    // {
    //   status: true,
    //   data: [ {...student} ]
    // }
    if (Array.isArray(profile?.data)) {
        return profile.data[0] || {};
    }

    if (profile?.data && typeof profile.data === "object") {
        return profile.data;
    }

    return profile;
}

export function normalizeDob(value = "") {
    if (!value) return "";

    const clean = String(value).trim();

    // already dd-mm-yyyy / dd.mm.yyyy / dd/mm/yyyy
    const match = clean.match(
        /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/
    );

    if (match) {
        const [, day, month, year] = match;

        return `${day.padStart(
            2,
            "0"
        )}-${month.padStart(
            2,
            "0"
        )}-${year}`;
    }

    // yyyy-mm-dd
    const apiDate = clean.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/
    );

    if (apiDate) {
        const [, year, month, day] = apiDate;

        return `${day.padStart(
            2,
            "0"
        )}-${month.padStart(
            2,
            "0"
        )}-${year}`;
    }

    return clean;
}

export function cleanMobile(
    mobile = "",
    code = ""
) {
    let number = String(mobile)
        .replace(/\s+/g, "")
        .trim();

    const dialCode = String(code)
        .replace(/\D/g, "");

    // API mobile should not contain country code
    if (
        dialCode &&
        number.startsWith(`+${dialCode}`)
    ) {
        number = number.slice(
            dialCode.length + 1
        );
    }

    return number.replace(/\D/g, "");
}

export function createEditForm(profile) {
    const data = getProfileData(profile);

    const code = String(
        data?.code || "91"
    ).replace(/\D/g, "");

    const mobile = cleanMobile(
        data?.mobile || "",
        code
    );

    return {
        uid: String(
            data?.id ||
            data?.uid ||
            ""
        ),

        name: data?.name || "",

        email:
            data?.emailId ||
            data?.email ||
            "",

        mobile,

        code,

        country:
            data?.country ||
            "India",

        countryIso:
            "in",

        address:
            data?.address ||
            data?.place ||
            "",

        gender:
            data?.gender ||
            "",

        dob: normalizeDob(
            data?.dob || ""
        ),
    };
}

export function validateEditForm(form) {
    const required = [
        "uid",
        "name",
        "mobile",
        "code",
        "country",
        "address",
        "gender",
        "dob",
    ];

    return required.every(
        (key) =>
            String(form?.[key] ?? "")
                .trim()
                .length > 0
    );
}