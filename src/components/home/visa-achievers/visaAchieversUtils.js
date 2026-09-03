export const AUTO_PLAY_DELAY = 3500;

export const getImage = (
    achiever,
    imagePath
) => {
    const image =
        achiever?.image ||
        achiever?.visa_image ||
        achiever?.photo ||
        achiever?.img ||
        "";

    if (!image) {
        return "";
    }

    if (
        String(image).startsWith(
            "http"
        )
    ) {
        return image;
    }

    return `${imagePath}${image}`;
};

export const getName = (
    achiever
) =>
    achiever?.name ||
    achiever?.student_name ||
    achiever?.title ||
    "";

export const getCountry = (
    achiever
) =>
    achiever?.country ||
    achiever?.country_name ||
    achiever?.destination ||
    "";