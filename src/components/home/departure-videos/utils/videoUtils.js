export const AUTOPLAY_DELAY = 7000;
export const DRAG_THRESHOLD = 55;

export const FALLBACK =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280">
            <defs>
                <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0f172a"/>
                    <stop offset="100%" stop-color="#020617"/>
                </linearGradient>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#background)"
            />

            <circle
                cx="360"
                cy="575"
                r="92"
                fill="#c01f53"
                opacity="0.95"
            />

            <polygon
                points="335,530 335,620 410,575"
                fill="#ffffff"
            />

            <text
                x="50%"
                y="720"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#cbd5e1"
                font-family="Arial, sans-serif"
                font-size="38"
            >
                Departure Video
            </text>
        </svg>
    `);

export const getWrappedIndex = (
    index,
    length
) => {
    if (!length) return 0;

    return ((index % length) + length) % length;
};

export const getMediaUrl = (
    path,
    file
) => {
    if (!file) return "";

    const value = String(file).trim();

    if (
        /^(https?:|data:|blob:)/i.test(value)
    ) {
        return value;
    }

    const normalizedPath = path
        ? path.endsWith("/")
            ? path
            : `${path}/`
        : "";

    return `${normalizedPath}${value.replace(
        /^\/+/,
        ""
    )}`;
};

export const formatVideos = (
    responseData = {}
) => {
    const shortsPath =
        responseData?.shorts_path || "";

    const shorts = Array.isArray(
        responseData?.shorts
    )
        ? responseData.shorts
        : [];

    return shorts
        .filter(
            (item) =>
                String(item?.status) === "1" &&
                Boolean(item?.link)
        )
        .map((item, index) => {
            const posterFile =
                item?.thumb ||
                item?.thumbnail ||
                item?.placeholder ||
                "";

            const placeholderFile =
                item?.placeholder ||
                item?.thumb ||
                "";

            return {
                id:
                    item?.id ??
                    `departure-video-${index}`,

                type: item?.type || "",

                countryId:
                    item?.country || "",

                title:
                    item?.title?.trim() ||
                    "Student Departure",

                destination:
                    item?.destination?.trim() ||
                    item?.title?.trim() ||
                    "International Destination",

                videoUrl: getMediaUrl(
                    "",
                    item?.link
                ),

                poster:
                    getMediaUrl(
                        shortsPath,
                        posterFile
                    ) || FALLBACK,

                placeholder:
                    getMediaUrl(
                        shortsPath,
                        placeholderFile
                    ) || FALLBACK,
            };
        });
};