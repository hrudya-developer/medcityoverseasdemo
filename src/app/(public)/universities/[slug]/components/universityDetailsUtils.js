export const normalizeValue = (value) =>
    String(value ?? "")
        .trim()
        .toLowerCase();

export const joinImageUrl = (
    basePath,
    imageName
) => {
    if (!imageName) return "";

    const image = String(imageName).trim();

    if (/^https?:\/\//i.test(image)) {
        return image;
    }

    const base = String(
        basePath ?? ""
    ).replace(/\/+$/, "");

    const file = image.replace(/^\/+/, "");

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
        normalizeValue(value);

    return [
        "yes",
        "1",
        "true",
    ].includes(normalized)
        ? positiveLabel
        : negativeLabel;
};

const getAboutText = ({
    selectedInfo,
    university,
    universityName,
    locationText,
}) => {
    const aboutItem = selectedInfo.find(
        (item) =>
            [
                "about",
                "about university",
                "description",
            ].includes(
                normalizeValue(item?.type)
            )
    );

    return (
        aboutItem?.text ||
        aboutItem?.description ||
        university?.about ||
        university?.description ||
        `${universityName} is located in ${locationText}. Explore its courses, ranking, scholarships and admission requirements.`
    );
};

const getInfoItems = (
    selectedInfo
) =>
    selectedInfo.filter((item) =>
        [
            "info",
            "information",
            "quick info",
        ].includes(
            normalizeValue(item?.type)
        )
    );

export const normalizeUniversityData = (
    response
) => {
    if (!response) {
        return null;
    }

    const university =
        Array.isArray(response.data)
            ? response.data[0]
            : null;

    if (!university) {
        console.error(
            "University data array is empty:",
            response
        );

        return null;
    }

    const selectedInfo =
        Array.isArray(response.info)
            ? response.info
            : [];

    const selectedCourses =
        Array.isArray(response.course)
            ? response.course
            : Array.isArray(response.courses)
                ? response.courses
                : Array.isArray(university?.courses)
                    ? university.courses
                    : [];

    const selectedSliders =
        Array.isArray(response.sliders)
            ? response.sliders
            : [];

    const universityImagePath =
        response.universities_image_path ||
        response.university_image_path ||
        "";

    const sliderImagePath =
        response.slider_image_path || "";

    const universityName =
        university.name ||
        university.university_name ||
        university.university ||
        "University";

    const countryName =
        university.country ||
        university.country_name ||
        "Country not available";

    const locationText =
        university.location ||
        university.city ||
        university.place ||
        countryName;

    const ranking =
        university.rank ||
        university.ranking ||
        "N/A";

    const universityType =
        university.type ||
        university.university_type ||
        "University";

    const scholarship =
        getYesNoValue(
            university.scholarship,
            "Available",
            "Not Available"
        );

    const withoutIelts =
        getYesNoValue(
            university.without_ielts,
            "Not Required",
            "Required"
        );

    const withoutGre =
        getYesNoValue(
            university.without_gre,
            "Not Required",
            "Required"
        );

    const withoutGmat =
        getYesNoValue(
            university.without_gmat,
            "Not Required",
            "Required"
        );

    const applicationFeeWaiver =
        getYesNoValue(
            university.applicationfeewaiver ||
            university.application_fee_waiver,
            "Available",
            "Not Available"
        );

    const logo = joinImageUrl(
        universityImagePath,
        university.logo
    );

    const sliderImages =
        selectedSliders
            .map((item) =>
                joinImageUrl(
                    sliderImagePath,
                    item?.image ||
                    item?.slider_image ||
                    item?.image_name
                )
            )
            .filter(Boolean);

    const finalSliderImages =
        sliderImages.length > 0
            ? sliderImages
            : logo
                ? [logo]
                : [];

    const aboutText = getAboutText({
        selectedInfo,
        university,
        universityName,
        locationText,
    });

    const infoItems =
        getInfoItems(selectedInfo);

    const mapQuery =
        encodeURIComponent(
            `${universityName}, ${locationText}`
        );

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
        universityImagePath,

        googleMapUrl:
            `https://www.google.com/maps?q=${mapQuery}&output=embed`,

        googleMapOpenUrl:
            `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    };
};