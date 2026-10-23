import { unstable_cache } from "next/cache";

import { legacyFetch } from "@/lib/legacy";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeTileDetails";

const HOME_API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

const DEFAULT_ICON_PATH =
  "https://overseas.technocitysolutions.com/public/images/icons/";

const DEFAULT_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/";

const DEFAULT_THUMB_PATH =
  "https://overseas.technocitysolutions.com/public/images/shorts/";

/**
 * Safely create an absolute URL from an API path.
 */
function makeUrl(basePath, file) {
  if (!file) return "";

  const value = String(file);

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${basePath}${value}`;
}

/**
 * Filter active items and sort them by order.
 */
function activeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item && String(item.status ?? "1") !== "0")
    .sort(
      (a, b) =>
        Number(a?.order ?? 0) - Number(b?.order ?? 0)
    );
}

/**
 * Normalize icon-based API items.
 */
function normalizeIconItems(items, iconPath) {
  return activeItems(items).map((item) => ({
    ...item,
    iconUrl: makeUrl(iconPath, item?.icon),
  }));
}

/**
 * Normalize German program API response.
 */
function normalizeResponse(responseData) {
  const imagePath =
    responseData?.slider_image_path || DEFAULT_IMAGE_PATH;

  const iconPath =
    responseData?.icons_image_path || DEFAULT_ICON_PATH;

  const thumbPath =
    responseData?.thumb_image_path || DEFAULT_THUMB_PATH;

  const rawMainData = Array.isArray(responseData?.data)
    ? responseData.data[0] ?? null
    : responseData?.data ?? null;

  const mainData = rawMainData
    ? {
        ...rawMainData,
        imageUrl: makeUrl(imagePath, rawMainData.image),
        iconUrl: makeUrl(iconPath, rawMainData.icon),
      }
    : null;

  const relatedPrograms = [
    {
      id: responseData?.related1_id,
      name: responseData?.related1_name,
      image: responseData?.related1_image,
    },
    {
      id: responseData?.related2_id,
      name: responseData?.related2_name,
      image: responseData?.related2_image,
    },
    {
      id: responseData?.related3_id,
      name: responseData?.related3_name,
      image: responseData?.related3_image,
    },
  ]
    .filter((item) => item.id || item.name)
    .map((item) => ({
      ...item,
      imageUrl: makeUrl(imagePath, item.image),
    }));

  return {
    mainData,

    benefits: normalizeIconItems(
      responseData?.benefit,
      iconPath
    ),

    stipend: normalizeIconItems(
      responseData?.stipend,
      iconPath
    ),

    eligibility: normalizeIconItems(
      responseData?.eligibility,
      iconPath
    ),

    roadmap: activeItems(responseData?.roadmap).map((item) => ({
      ...item,
      imageUrl: makeUrl(imagePath, item?.image),
      iconUrl: makeUrl(iconPath, item?.icon),
      countUrl: makeUrl(iconPath, item?.count),
    })),

    streams: normalizeIconItems(
      responseData?.streams,
      iconPath
    ),

    details: normalizeIconItems(
      responseData?.details,
      iconPath
    ),

    relatedPrograms,

    youtube: activeItems(responseData?.youtube).map((item) => ({
      ...item,
      thumbnailUrl: makeUrl(
        thumbPath,
        item?.thumbnail
      ),
    })),
  };
}

/**
 * Request a single German program.
 *
 * Network/API failures return null instead of crashing
 * the Next.js build or page rendering.
 */
async function requestGermanProgram(programId, uid) {
  const apiKey =
    process.env.GERMAN_PROGRAMS_API_KEY ||
    process.env.OVERSEAS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GERMAN_PROGRAMS_API_KEY or OVERSEAS_API_KEY is not configured."
    );
  }

  const body = new FormData();

  body.set("api", apiKey);
  body.set("uid", String(uid));
  body.set("id", String(programId));

  // Failures throw so unstable_cache never stores them; the
  // exported wrapper turns them into null for callers.
  const response = await legacyFetch(API_URL, {
    method: "POST",
    body,
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `German programs API returned ${response.status}`
    );
  }

  if (!result || result?.status === false) {
    // A valid "not found" style answer: safe to cache as null.
    return null;
  }

  return normalizeResponse(result);
}

/**
 * Cache individual German program details for 1 hour.
 */
const getCachedGermanProgram = unstable_cache(
  requestGermanProgram,
  ["german-program-details-v2"],
  {
    revalidate: 3600,
    tags: ["german-programs"],
  }
);

/**
 * Get German program details.
 */
export async function getGermanProgramDetails(
  programId,
  uid = 0
) {
  const normalizedId = Number(programId);

  if (
    !Number.isInteger(normalizedId) ||
    normalizedId <= 0
  ) {
    return null;
  }

  try {
    return await getCachedGermanProgram(
      normalizedId,
      Number(uid) || 0
    );
  } catch (error) {
    console.error(
      "German program details unavailable:",
      programId,
      error
    );

    return null;
  }
}

/**
 * Request German programs list.
 *
 * Network/API failures return an empty list so
 * static prerendering does not fail.
 */
async function requestGermanProgramsList(uid) {
  const apiKey =
    process.env.GERMAN_PROGRAMS_API_KEY ||
    process.env.OVERSEAS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GERMAN_PROGRAMS_API_KEY or OVERSEAS_API_KEY is not configured."
    );
  }

  const body = new FormData();

  body.set("api", apiKey);
  body.set("uid", String(uid));

  // Failures throw so unstable_cache never stores an empty list
  // for an hour; getGermanProgramsList decides how to recover.
  const response = await legacyFetch(HOME_API_URL, {
    method: "POST",
    body,
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result) {
    throw new Error(
      `Home responses API returned ${response.status}`
    );
  }

  const imagePath =
    result.hometile_image_path ||
    result.home_tile_image_path ||
    DEFAULT_IMAGE_PATH;

  const programs = activeItems(
    result.home_tile_new
  ).map((item) => ({
    ...item,
    imageUrl: makeUrl(
      imagePath,
      item?.image
    ),
    iconUrl: makeUrl(
      imagePath,
      item?.icon
    ),
  }));

  return {
    programs,
    imagePath,
  };
}

/**
 * Cache German programs list for 1 hour.
 */
const getCachedGermanProgramsList = unstable_cache(
  requestGermanProgramsList,
  ["german-program-list-v2"],
  {
    revalidate: 3600,
    tags: ["german-programs-list"],
  }
);

/**
 * Get German programs list.
 *
 * By default a failure returns an empty list so static
 * prerendering at build time does not fail. Pass
 * { throwOnError: true } where a thrown error is better, for
 * example during ISR revalidation, where throwing keeps the
 * last good page instead of replacing it with an empty one.
 */
export async function getGermanProgramsList(
  uid = 6,
  { throwOnError = false } = {}
) {
  try {
    return await getCachedGermanProgramsList(
      Number(uid) || 6
    );
  } catch (error) {
    if (throwOnError) {
      throw error;
    }

    console.error(
      "German programs list unavailable:",
      error
    );

    return {
      programs: [],
      imagePath: DEFAULT_IMAGE_PATH,
    };
  }
}
