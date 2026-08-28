import {
  toSafeText,
} from "./destinationNormalizer";

export const SITE_URL =
  "https://medcityoverseas.com";

const FALLBACK_IMAGE =
  "/images/destination-fallback.webp";

function cleanHtml(
  value = ""
) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toAbsoluteImage(
  image
) {
  if (!image) {
    return `${SITE_URL}${FALLBACK_IMAGE}`;
  }

  const value =
    String(image);

  if (
    value.startsWith(
      "https://"
    ) ||
    value.startsWith(
      "http://"
    )
  ) {
    return value;
  }

  return `${SITE_URL}${
    value.startsWith("/")
      ? value
      : `/${value}`
  }`;
}

export function getDestinationSeo({
  countryName,
  destinationSlug,
  country,
  image,
}) {
  const safeCountry =
    toSafeText(
      countryName,
      "Study Abroad"
    );

  const pagePath =
    `/study-in-${destinationSlug}`;

  const pageUrl =
    `${SITE_URL}${pagePath}`;

  const suppliedDescription =
    cleanHtml(
      country?.short_description ??
        country?.description ??
        ""
    );

  const defaultDescription =
    `Study in ${safeCountry} from Kerala with Medcity Overseas. Explore universities, courses, eligibility, admissions, scholarships, intakes and student visa guidance.`;

  let description =
    suppliedDescription
      ? `${suppliedDescription} Explore study opportunities in ${safeCountry} with Medcity Overseas.`
      : defaultDescription;

  description = description
    .replace(/\s+/g, " ")
    .trim();

  if (description.length > 160) {
    description = `${description
      .slice(0, 157)
      .trim()}...`;
  }

  const title =
    `Study in ${safeCountry} from Kerala`;

  return {
    countryName:
      safeCountry,

    title,

    fullTitle:
      `${title} | Medcity Overseas`,

    description,

    h1: title,

    eyebrow:
      `Study in ${safeCountry}`,

    heroDescription:
      `Explore universities, courses and study opportunities in ${safeCountry} with guidance from Medcity Overseas. Get support with course selection, eligibility, admissions, scholarships and student visa preparation.`,

    pagePath,
    pageUrl,

    image:
      toAbsoluteImage(image),

    imageAlt:
      `Study in ${safeCountry} from Kerala`,

    keywords: [
      `study in ${safeCountry}`,
      `study in ${safeCountry} from Kerala`,
      `${safeCountry} education consultants Kerala`,
      `${safeCountry} study abroad consultants Kerala`,
      `${safeCountry} universities for Indian students`,
      `${safeCountry} courses for Indian students`,
      `${safeCountry} admission requirements`,
      `${safeCountry} student visa guidance`,
      `${safeCountry} scholarships for Indian students`,
      `universities in ${safeCountry}`,
      `courses in ${safeCountry}`,
    ],
  };
}