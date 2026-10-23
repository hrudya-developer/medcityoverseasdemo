import "server-only";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

const IMAGE_BASE_URL =
    "https://overseas.technocitysolutions.com/public/images/testimonial/";

const FALLBACK_IMAGE =
    "/assets/avatarFallback.png";

const safeText = (value) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value).trim();
};

const createImageUrl = (value) => {
    const imageName = safeText(value);

    if (!imageName) {
        return FALLBACK_IMAGE;
    }

    if (
        imageName.startsWith("https://") ||
        imageName.startsWith("http://")
    ) {
        return imageName;
    }

    return `${IMAGE_BASE_URL}${imageName.replace(
        /^\/+/,
        ""
    )}`;
};

const normalizeTestimonial = (
    item,
    index
) => ({
    id: String(
        item?.id ||
        item?.t_id ||
        index + 1
    ),

    name:
        safeText(item?.name) ||
        safeText(item?.student_name) ||
        "Student",

    country:
        safeText(item?.country) ||
        safeText(item?.destination),

    text:
        safeText(item?.text) ||
        safeText(item?.description) ||
        safeText(item?.testimonial),

    image: createImageUrl(
        item?.image ||
        item?.photo ||
        item?.profile_image
    ),
});

/**
 * Load active testimonials from the Overseas API, newest order first.
 * Throws on upstream failure; callers decide how to recover.
 */
export async function getTestimonials() {
    const result =
        await postOverseasForm(
            "getTestimonial",
            {},
            {
                next: {
                    revalidate: 3600,
                    tags: [
                        "testimonials",
                    ],
                },
            }
        );

    const rawTestimonials =
        Array.isArray(
            result?.testimonial
        )
            ? result.testimonial
            : Array.isArray(
                result?.testimonials
            )
                ? result.testimonials
                : [];

    return rawTestimonials
        .filter((item) => {
            if (!item) {
                return false;
            }

            const status = String(
                item?.status ?? "1"
            ).toLowerCase();

            return ![
                "0",
                "false",
                "inactive",
            ].includes(status);
        })
        .sort(
            (first, second) =>
                Number(
                    first?.order || 0
                ) -
                Number(
                    second?.order || 0
                )
        )
        .map(normalizeTestimonial);
}
