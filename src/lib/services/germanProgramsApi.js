import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const DEFAULT_ICON_PATH =
    "https://overseas.technocitysolutions.com/public/images/icons/";

const DEFAULT_IMAGE_PATH =
    "https://overseas.technocitysolutions.com/public/images/";

const DEFAULT_THUMB_PATH =
    "https://overseas.technocitysolutions.com/public/images/shorts/";

const makeUrl = (
    basePath = "",
    file = ""
) => {
    if (!file) {
        return "";
    }

    const value = String(file);

    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {
        return value;
    }

    const cleanBase =
        basePath.replace(/\/+$/, "");

    const cleanFile =
        value.replace(/^\/+/, "");

    return cleanBase
        ? `${cleanBase}/${cleanFile}`
        : `/${cleanFile}`;
};

const normalizeItems = (
    items,
    imagePath = ""
) => {
    if (!Array.isArray(items)) {
        return [];
    }

    return items
        .filter(
            (item) =>
                item &&
                String(item.status) !== "0"
        )
        .sort(
            (a, b) =>
                Number(a?.order || 0) -
                Number(b?.order || 0)
        )
        .map((item) => ({
            ...item,
            imageUrl: makeUrl(
                imagePath,
                item?.image
            ),
        }));
};

const normalizeIconItems = (
    items,
    iconPath = ""
) => {
    if (!Array.isArray(items)) {
        return [];
    }

    return items
        .filter(
            (item) =>
                item &&
                String(item.status) !== "0"
        )
        .sort(
            (a, b) =>
                Number(a?.order || 0) -
                Number(b?.order || 0)
        )
        .map((item) => ({
            ...item,
            iconUrl:
                item?.icon &&
                    String(item.icon).includes(".")
                    ? makeUrl(
                        iconPath,
                        item.icon
                    )
                    : "",
        }));
};

const transformGermanProgramResponse = (
    response = {}
) => {
    const imagePath =
        response?.slider_image_path ||
        DEFAULT_IMAGE_PATH;

    const iconPath =
        response?.icons_image_path ||
        DEFAULT_ICON_PATH;

    const thumbPath =
        response?.thumb_image_path ||
        DEFAULT_THUMB_PATH;

    const rawMainData =
        Array.isArray(response?.data)
            ? response.data[0] || null
            : response?.data || null;

    const relatedPrograms = [
        {
            id: response?.related1_id,
            name: response?.related1_name,
            image: response?.related1_image,
        },
        {
            id: response?.related2_id,
            name: response?.related2_name,
            image: response?.related2_image,
        },
        {
            id: response?.related3_id,
            name: response?.related3_name,
            image: response?.related3_image,
        },
    ]
        .filter(
            (item) =>
                item?.id || item?.name
        )
        .map((item) => ({
            ...item,
            imageUrl: makeUrl(
                imagePath,
                item.image
            ),
        }));

    const youtube =
        Array.isArray(response?.youtube)
            ? response.youtube
                .filter(
                    (item) =>
                        item &&
                        String(item.status) !==
                        "0"
                )
                .map((item) => ({
                    ...item,
                    thumbnailUrl: makeUrl(
                        thumbPath,
                        item?.thumbnail
                    ),
                }))
            : [];

    return {
        mainData: rawMainData
            ? {
                ...rawMainData,
                imageUrl: makeUrl(
                    imagePath,
                    rawMainData?.image
                ),
                iconUrl: makeUrl(
                    iconPath,
                    rawMainData?.icon
                ),
            }
            : null,

        benefits: normalizeIconItems(
            response?.benefit,
            iconPath
        ),

        stipend: normalizeIconItems(
            response?.stipend,
            iconPath
        ),

        eligibility: normalizeIconItems(
            response?.eligibility,
            iconPath
        ),

        roadmap: normalizeItems(
            response?.roadmap,
            imagePath
        ).map((item) => ({
            ...item,
            iconUrl: makeUrl(
                iconPath,
                item?.icon
            ),
            countUrl: makeUrl(
                iconPath,
                item?.count
            ),
        })),

        streams: normalizeIconItems(
            response?.streams,
            iconPath
        ),

        details: normalizeIconItems(
            response?.details,
            iconPath
        ),

        relatedPrograms,
        youtube,
        imagePath,
        iconPath,
        thumbPath,
    };
};

export const germanProgramsApi =
    createApi({
        reducerPath:
            "germanProgramsApi",

        baseQuery: fetchBaseQuery({
            baseUrl: "/api",
        }),

        endpoints: (builder) => ({
            getHomeGermanPrograms:
                builder.query({
                    query: (uid = 0) => ({
                        url: "/home-responses",
                        method: "POST",
                        body: {
                            uid,
                        },
                    }),

                    transformResponse: (
                        response
                    ) => ({
                        programs:
                            response?.programs ??
                            [],

                        imagePath:
                            response?.imagePath ??
                            "",
                    }),
                }),

            getGermanProgramDetails:
                builder.query({
                    query: ({
                        uid = 0,
                        id,
                    }) => ({
                        url: "/german-programs",
                        method: "POST",
                        body: {
                            uid,
                            id,
                        },
                    }),

                    transformResponse:
                        transformGermanProgramResponse,
                }),
        }),
    });

export const {
    useGetHomeGermanProgramsQuery,
    useGetGermanProgramDetailsQuery,
} = germanProgramsApi;