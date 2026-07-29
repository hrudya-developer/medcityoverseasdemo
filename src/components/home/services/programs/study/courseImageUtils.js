const removeTrailingSlash = (
    value = ""
) => value.replace(/\/+$/, "");

const removeLeadingSlash = (
    value = ""
) => value.replace(/^\/+/, "");

export const createCourseImageUrl = (
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

    const basePath =
        removeTrailingSlash(imagePath);

    const fileName =
        removeLeadingSlash(imageName);

    return `${basePath}/${fileName}`;
};