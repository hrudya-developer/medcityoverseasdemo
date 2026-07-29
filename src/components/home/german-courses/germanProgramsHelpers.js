export const FALLBACK_IMAGE =
    "/assets/german-program-fallback.webp";

export const getSearchableProgramText = (
    item
) =>
    `
        ${item?.name || ""}
        ${item?.titleWhy || ""}
        ${item?.why || ""}
    `.toLowerCase();

export const isAusbildungProgram = (
    item
) =>
    getSearchableProgramText(
        item
    ).includes("ausbildung");

export const sortGermanPrograms = (
    programs
) => {
    if (!Array.isArray(programs)) {
        return [];
    }

    return [...programs].sort(
        (firstProgram, secondProgram) => {
            const firstIsAusbildung =
                isAusbildungProgram(
                    firstProgram
                );

            const secondIsAusbildung =
                isAusbildungProgram(
                    secondProgram
                );

            if (
                firstIsAusbildung &&
                !secondIsAusbildung
            ) {
                return -1;
            }

            if (
                !firstIsAusbildung &&
                secondIsAusbildung
            ) {
                return 1;
            }

            return 0;
        }
    );
};

export const buildImageUrl = (
    basePath = "",
    image = ""
) => {
    if (!image) {
        return FALLBACK_IMAGE;
    }

    const value = String(image);

    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {
        return value;
    }

    const cleanBase =
        basePath.replace(/\/+$/, "");

    const cleanImage =
        value.replace(/^\/+/, "");

    return cleanBase
        ? `${cleanBase}/${cleanImage}`
        : `/${cleanImage}`;
};

export const getYouTubeVideoId = (
    url = ""
) => {
    if (!url) {
        return "";
    }

    try {
        const parsedUrl =
            new URL(url);

        if (
            parsedUrl.hostname.includes(
                "youtu.be"
            )
        ) {
            return parsedUrl.pathname
                .replace("/", "")
                .split("?")[0];
        }

        if (
            parsedUrl.hostname.includes(
                "youtube.com"
            ) ||
            parsedUrl.hostname.includes(
                "youtube-nocookie.com"
            )
        ) {
            if (
                parsedUrl.pathname.startsWith(
                    "/shorts/"
                )
            ) {
                return (
                    parsedUrl.pathname
                        .split("/shorts/")[1]
                        ?.split("/")[0] || ""
                );
            }

            if (
                parsedUrl.pathname.startsWith(
                    "/embed/"
                )
            ) {
                return (
                    parsedUrl.pathname
                        .split("/embed/")[1]
                        ?.split("/")[0] || ""
                );
            }

            return (
                parsedUrl.searchParams.get(
                    "v"
                ) || ""
            );
        }

        return "";
    } catch {
        return "";
    }
};

export const getYouTubeThumbnail = (
    video
) => {
    if (video?.thumbnailUrl) {
        return video.thumbnailUrl;
    }

    const videoId =
        getYouTubeVideoId(
            video?.link
        );

    if (!videoId) {
        return FALLBACK_IMAGE;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};