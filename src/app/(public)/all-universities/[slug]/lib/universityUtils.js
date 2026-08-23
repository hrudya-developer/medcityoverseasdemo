export const getDestinationId = (
    destination
) =>
    destination?.d_id ||
    destination?.id ||
    destination?.destination_id ||
    "";

export const getDestinationName = (
    destination
) =>
    destination?.country ||
    destination?.name ||
    destination?.destination ||
    "Study Destination";

export const getUniversityId = (
    university
) =>
    university?.id ||
    university?.u_id ||
    university?.university_id ||
    "";

export const getUniversityName = (
    university
) =>
    university?.name ||
    university?.university ||
    university?.university_name ||
    "International University";

export const getUniversityLocation = (
    university,
    fallback = ""
) =>
    university?.location ||
    university?.city ||
    university?.address ||
    fallback;

export const getUniversityLogoFile = (
    university
) =>
    university?.logo ||
    university?.image ||
    university?.university_image ||
    university?.university_logo ||
    "";

export const getMediaUrl = (
    path,
    file
) => {
    if (!file) return "";

    const value =
        String(file).trim();

    if (
        /^(https?:|data:|blob:)/i.test(
            value
        )
    ) {
        return value;
    }

    const cleanPath = path
        ? String(path).replace(
            /\/+$/,
            ""
        )
        : "";

    const cleanFile =
        value.replace(/^\/+/, "");

    if (!cleanPath) {
        return "";
    }

    return `${cleanPath}/${cleanFile}`;
};

export const getUniversityLogoUrl = (
    university,
    universityImagePath
) =>
    getMediaUrl(
        universityImagePath,
        getUniversityLogoFile(
            university
        )
    );

export const getDestinationFlagUrl = (
    destination,
    destinationImagePath
) =>
    getMediaUrl(
        destinationImagePath,
        destination?.flag ||
        destination?.image ||
        destination?.country_flag ||
        ""
    );