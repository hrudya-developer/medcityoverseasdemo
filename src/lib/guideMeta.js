import { DEFAULT_OG_IMAGE, applySeoOverrides } from "@/lib/pageSeo";
import { pageUrl, SITE_NAME } from "@/lib/seoSchema";

/*
 * Metadata for the keyword landing pages (guides): a title with the
 * brand once, the description, the canonical address and share image.
 * Edits made in the admin's SEO manager apply on top.
 */
export function guideMetadata({ path, title, description, image, imageAlt }) {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = pageUrl(path);
    const images = [
        image
            ? { url: image, width: 1200, height: 630, alt: imageAlt || title }
            : { ...DEFAULT_OG_IMAGE, alt: imageAlt || DEFAULT_OG_IMAGE.alt },
    ];

    return applySeoOverrides({
        title: { absolute: fullTitle },
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            locale: "en_IN",
            url,
            siteName: SITE_NAME,
            title: fullTitle,
            description,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [images[0].url],
        },
        robots: { index: true, follow: true },
    });
}
