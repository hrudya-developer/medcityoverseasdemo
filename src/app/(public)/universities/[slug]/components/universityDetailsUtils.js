export const normalizeValue = (
    value
) =>
    String(
        value ?? ""
    )
        .trim()
        .toLowerCase();

export const joinImageUrl = (
    basePath,
    imageName
) => {
    if (!imageName) {
        return "";
    }

    const image =
        String(
            imageName
        ).trim();

    if (
        /^https?:\/\//i.test(
            image
        )
    ) {
        return image;
    }

    if (
        image.startsWith(
            "//"
        )
    ) {
        return `https:${image}`;
    }

    const base =
        String(
            basePath ??
            ""
        ).replace(
            /\/+$/,
            ""
        );

    const file =
        image.replace(
            /^\/+/,
            ""
        );

    return base
        ? `${base}/${file}`
        : "";
};

export const getYesNoValue = (
    value,
    positiveLabel,
    negativeLabel
) => {
    const normalized =
        normalizeValue(
            value
        );

    return [
        "yes",
        "1",
        "true",
    ].includes(
        normalized
    )
        ? positiveLabel
        : negativeLabel;
};

function getUniversity(
    response
) {
    if (
        Array.isArray(
            response?.data
        )
    ) {
        return (
            response.data[0] ??
            null
        );
    }

    if (
        response?.data &&
        typeof response.data ===
            "object"
    ) {
        return (
            response.data
                ?.university ??
            response.data
                ?.selectedUniversity ??
            response.data
                ?.universityDetails ??
            response.data
                ?.details ??
            response.data
        );
    }

    return (
        response?.university ??
        response
            ?.selectedUniversity ??
        null
    );
}

function getCourses(
    response,
    university
) {
    const candidates = [
        response?.course,
        response?.courses,

        response?.course_data,
        response?.courseData,

        response
            ?.university_courses,
        response
            ?.universityCourses,

        response?.data?.course,
        response?.data?.courses,

        response?.data
            ?.course_data,
        response?.data
            ?.courseData,

        response?.result?.course,
        response?.result?.courses,

        university?.course,
        university?.courses,
    ];

    for (
        const candidate of
        candidates
    ) {
        if (
            Array.isArray(
                candidate
            ) &&
            candidate.length >
                0
        ) {
            return candidate.filter(
                Boolean
            );
        }
    }

    return [];
}

function getAboutText({
    selectedInfo,
    university,
    universityName,
    locationText,
}) {
    const aboutItem =
        selectedInfo.find(
            (
                item
            ) =>
                [
                    "about",
                    "about university",
                    "description",
                ].includes(
                    normalizeValue(
                        item?.type
                    )
                )
        );

    return (
        aboutItem?.text ||
        aboutItem
            ?.description ||
        university?.about ||
        university
            ?.description ||
        `${universityName} is located in ${locationText}. Explore its courses, rankings, scholarships and admission requirements.`
    );
}

function getInfoItems(
    selectedInfo
) {
    return selectedInfo.filter(
        (
            item
        ) =>
            [
                "info",
                "information",
                "quick info",
            ].includes(
                normalizeValue(
                    item?.type
                )
            )
    );
}

export function normalizeUniversityData(
    response
) {
    if (!response) {
        return null;
    }

    const university =
        getUniversity(
            response
        );

    if (!university) {
        console.error(
            "University object missing:",
            response
        );

        return null;
    }

    const selectedInfo =
        Array.isArray(
            response?.info
        )
            ? response.info
            : Array.isArray(
                  response?.data?.info
              )
              ? response.data.info
              : [];

    const selectedCourses =
        getCourses(
            response,
            university
        );

    const selectedSliders =
        Array.isArray(
            response?.sliders
        )
            ? response.sliders
            : Array.isArray(
                  response?.data
                      ?.sliders
              )
              ? response.data
                    .sliders
              : [];

    const universityImagePath =
        response
            ?.universities_image_path ||
        response
            ?.university_image_path ||
        response?.data
            ?.universities_image_path ||
        response?.data
            ?.university_image_path ||
        "";

    const sliderImagePath =
        response
            ?.slider_image_path ||
        response?.data
            ?.slider_image_path ||
        "";

    const universityName =
        university?.name ||
        university
            ?.university_name ||
        university
            ?.university ||
        university?.u_name ||
        "University";

    const countryName =
        university?.country ||
        university
            ?.country_name ||
        "Country not available";

    const locationText =
        university?.location ||
        university?.city ||
        university?.place ||
        university?.address ||
        countryName;

    const ranking =
        university?.rank ||
        university?.ranking ||
        "N/A";

    const universityType =
        university?.type ||
        university
            ?.university_type ||
        "University";

    const scholarship =
        getYesNoValue(
            university
                ?.scholarship,
            "Available",
            "Not Available"
        );

    const withoutIelts =
        getYesNoValue(
            university
                ?.without_ielts,
            "Not Required",
            "Required"
        );

    const withoutGre =
        getYesNoValue(
            university
                ?.without_gre,
            "Not Required",
            "Required"
        );

    const withoutGmat =
        getYesNoValue(
            university
                ?.without_gmat,
            "Not Required",
            "Required"
        );

    const applicationFeeWaiver =
        getYesNoValue(
            university
                ?.applicationfeewaiver ??
            university
                ?.application_fee_waiver,

            "Available",
            "Not Available"
        );

    const logo =
        joinImageUrl(
            universityImagePath,
            university?.logo ||
                university
                    ?.university_logo
        );

    const sliderImages =
        selectedSliders
            .map(
                (
                    item
                ) =>
                    joinImageUrl(
                        sliderImagePath,

                        item?.image ||
                            item
                                ?.slider_image ||
                            item
                                ?.image_name
                    )
            )
            .filter(
                Boolean
            );

    const finalSliderImages =
        sliderImages.length >
        0
            ? sliderImages
            : logo
              ? [
                    logo,
                ]
              : [];

    const aboutText =
        getAboutText({
            selectedInfo,

            university,

            universityName,

            locationText,
        });

    const infoItems =
        getInfoItems(
            selectedInfo
        );

    const mapQuery =
        encodeURIComponent(
            `${universityName}, ${locationText}`
        );

    const googleMapUrl =
        `https://www.google.com/maps?q=${mapQuery}&output=embed`;

    const googleMapOpenUrl =
        `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return {
        university,

        universityName,

        countryName,

        locationText,

        ranking,

        universityType,

        scholarship,

        withoutIelts,

        withoutGre,

        withoutGmat,

        applicationFeeWaiver,

        logo,

        sliderImages:
            finalSliderImages,

        aboutText,

        infoItems,

        selectedCourses,

        courseCount:
            selectedCourses.length,

        universityImagePath,

        sliderImagePath,

        googleMapUrl,

        googleMapOpenUrl,
    };
}