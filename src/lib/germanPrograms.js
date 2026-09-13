import { unstable_cache } from "next/cache";

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
    console.warn(
      "GERMAN_PROGRAMS_API_KEY or OVERSEAS_API_KEY is not configured. Returning null for program:",
      programId
    );

    return null;
  }

  const body = new FormData();

  body.set("api", apiKey);
  body.set("uid", String(uid));
  body.set("id", String(programId));

  let response;

  try {
    response = await fetch(API_URL, {
      method: "POST",
      body,
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error(
      "Failed to connect to German programs API:",
      error
    );

    return null;
  }

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(
      `German programs API returned ${response.status}:`,
      result
    );

    return null;
  }

  if (!result || result?.status === false) {
    console.error(
      "German programs API returned an invalid response:",
      result
    );

    return null;
  }

  return normalizeResponse(result);
}

/**
 * Cache individual German program details for 1 hour.
 */
const getCachedGermanProgram = unstable_cache(
  requestGermanProgram,
  ["german-program-details-v1"],
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

  return getCachedGermanProgram(
    normalizedId,
    Number(uid) || 0
  );
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
    console.warn(
      "GERMAN_PROGRAMS_API_KEY or OVERSEAS_API_KEY is not configured. Returning empty German programs list."
    );

    return {
      programs: [],
      imagePath: DEFAULT_IMAGE_PATH,
    };
  }

  const body = new FormData();

  body.set("api", apiKey);
  body.set("uid", String(uid));

  let response;

  try {
    response = await fetch(HOME_API_URL, {
      method: "POST",
      body,
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error(
      "Failed to connect to German programs list API:",
      error
    );

    return {
      programs: [],
      imagePath: DEFAULT_IMAGE_PATH,
    };
  }

  const result = await response.json().catch(() => null);

  if (!response.ok || !result) {
    console.error(
      `Home responses API returned ${response.status}:`,
      result
    );

    return {
      programs: [],
      imagePath: DEFAULT_IMAGE_PATH,
    };
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
  ["german-program-list-v1"],
  {
    revalidate: 3600,
    tags: ["german-programs-list"],
  }
);

/**
 * Get German programs list.
 */
export function getGermanProgramsList(uid = 6) {
  return getCachedGermanProgramsList(
    Number(uid) || 6
  );
}