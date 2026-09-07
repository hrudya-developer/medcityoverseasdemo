const SITE_URL =
  "https://medcityoverseas.com";

const SITE_NAME =
  "Medcity Overseas";

const DEFAULT_OG_IMAGE =
  `${SITE_URL}/og-images/medcity-overseas.webp`;

/* =========================================================
   CLEANERS
========================================================= */

function cleanText(value = "") {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSlug(value = "") {
  return String(value ?? "")
    .trim()
    .replace(/^\/+|\/+$/g, "");
}

/* =========================================================
   LOCATION
========================================================= */

export function getBranchSeoLocation(
  center
) {
  return cleanText(
    center?.seoLocation ||
      center?.city ||
      center?.district ||
      ""
  );
}

/* =========================================================
   CANONICAL
========================================================= */

export function getBranchCanonical(
  center
) {
  const slug =
    cleanSlug(center?.slug);

  if (!slug) {
    return `${SITE_URL}/branches`;
  }

  return `${SITE_URL}/branch/${slug}`;
}

/* =========================================================
   IMAGE
========================================================= */

export function getBranchSeoImage(
  center
) {
  const image =
    center?.image;

  let src = "";

  if (
    typeof image === "string"
  ) {
    src = image;
  } else if (
    typeof image?.src ===
    "string"
  ) {
    src = image.src;
  }

  src = cleanText(src);

  if (!src) {
    return DEFAULT_OG_IMAGE;
  }

  if (
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }

  try {
    return new URL(
      src,
      SITE_URL
    ).toString();
  } catch {
    return DEFAULT_OG_IMAGE;
  }
}

/* =========================================================
   TITLE
========================================================= */

export function getBranchSeoTitle(
  center
) {
  const location =
    getBranchSeoLocation(
      center
    );

  if (center?.seoTitle) {
    return cleanText(
      center.seoTitle
    );
  }

  return `Study Abroad Consultants in ${location}`;
}

/* =========================================================
   DESCRIPTION
========================================================= */

export function getBranchSeoDescription(
  center
) {
  const location =
    getBranchSeoLocation(
      center
    );

  if (
    center?.seoDescription
  ) {
    return cleanText(
      center.seoDescription
    );
  }

  return cleanText(
    `Visit Medcity Overseas ${location} for expert study abroad counselling, university and course selection, overseas applications, student visa guidance and pre-departure support.`
  );
}

/* =========================================================
   IMAGE ALT
========================================================= */

export function getBranchImageAlt(
  center
) {
  const location =
    getBranchSeoLocation(
      center
    );

  return cleanText(
    center?.imageAlt ||
      `${center?.name || "Medcity Overseas"} study abroad consultants in ${location}`
  );
}

/* =========================================================
   KEYWORDS
   These do not directly improve Google rankings,
   but remain useful metadata for other systems.
========================================================= */

export function getBranchKeywords(
  center
) {
  const location =
    getBranchSeoLocation(
      center
    );

  const district =
    cleanText(
      center?.district
    );

  const state =
    cleanText(center?.state);

  return [
    `study abroad consultants in ${location}`,
    `overseas education consultants in ${location}`,
    `study abroad agency ${location}`,
    `student visa consultants ${location}`,
    `overseas education ${location}`,
    `Medcity Overseas ${location}`,

    district &&
      district !== location
      ? `study abroad consultants in ${district}`
      : null,

    state
      ? `study abroad consultants in ${state}`
      : null,
  ].filter(Boolean);
}

/* =========================================================
   METADATA
========================================================= */

export function buildBranchMetadata(
  center
) {
  if (!center) {
    return {
      title: {
        absolute:
          "Branch Not Found | Medcity Overseas",
      },

      description:
        "The requested Medcity Overseas branch could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const location =
    getBranchSeoLocation(
      center
    );

  const title =
    getBranchSeoTitle(
      center
    );

  const fullTitle =
    `${title} | ${SITE_NAME}`;

  const description =
    getBranchSeoDescription(
      center
    );

  const canonical =
    getBranchCanonical(
      center
    );

  const image =
    getBranchSeoImage(
      center
    );

  const imageAlt =
    getBranchImageAlt(
      center
    );

  const keywords =
    getBranchKeywords(
      center
    );

  return {
    title: {
      absolute: fullTitle,
    },

    description,

    keywords,

    applicationName:
      SITE_NAME,

    alternates: {
      canonical,

      languages: {
        "en-IN": canonical,
      },
    },

    openGraph: {
      type: "website",

      url: canonical,

      title: fullTitle,

      description,

      siteName:
        SITE_NAME,

      locale: "en_IN",

      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title: fullTitle,

      description,

      images: [image],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },

    other: {
      "geo.region":
        center?.state
          ? `IN-${getStateCode(
              center.state
            )}`
          : "IN",

      "geo.placename":
        location,
    },
  };
}

/* =========================================================
   STATE CODE
========================================================= */

function getStateCode(
  state
) {
  const value =
    cleanText(state)
      .toLowerCase();

  const codes = {
    kerala: "KL",
    karnataka: "KA",
    tamilnadu: "TN",
    "tamil nadu": "TN",
  };

  return (
    codes[value] || ""
  );
}

/* =========================================================
   EXPORT CONSTANTS
========================================================= */

export {
  SITE_NAME,
  SITE_URL,
};