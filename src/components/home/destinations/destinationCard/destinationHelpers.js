const removeTrailingSlash = (
    value = ""
) => value.replace(/\/+$/, "");

const removeLeadingSlash = (
    value = ""
) => value.replace(/^\/+/, "");

export const buildDestinationImageUrl = (
    imagePath,
    imageName
) => {
    if (!imageName) {
        return "";
    }

    if (
        imageName.startsWith("http://") ||
        imageName.startsWith("https://")
    ) {
        return imageName;
    }

    if (!imagePath) {
        return "";
    }

    const cleanPath =
        removeTrailingSlash(imagePath);

    const cleanName =
        removeLeadingSlash(imageName);

    return `${cleanPath}/${cleanName}`;
};

export const getDestinationId = (
    destination,
    fallback
) =>
    destination?.id ??
    destination?.d_id ??
    fallback;

export const getDestinationName = (
    destination
) =>
    destination?.country?.trim() ||
    destination?.name?.trim() ||
    "International Destination";