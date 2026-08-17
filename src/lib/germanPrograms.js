import { unstable_cache } from "next/cache";

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

function makeUrl(basePath, file) {
    if (!file) return "";
    if (/^https?:\/\//i.test(String(file))) return String(file);
    return `${basePath}${file}`;
}

function activeItems(items) {
    if (!Array.isArray(items)) return [];
  
    return items
          .filter((item) => item && String(item.status ?? "1") !== "0")
          .sort(
                  (a, b) =>
                            Number(a?.order ?? 0) - Number(b?.order ?? 0)
                );
}

function normalizeIconItems(items, iconPath) {
    return activeItems(items).map((item) => ({
          ...item,
          iconUrl: makeUrl(iconPath, item?.icon),
    }));
}

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
          benefits: normalizeIconItems(responseData?.benefit, iconPath),
          stipend: normalizeIconItems(responseData?.stipend, iconPath),
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
          streams: normalizeIconItems(responseData?.streams, iconPath),
          details: normalizeIconItems(responseData?.details, iconPath),
          relatedPrograms,
          youtube: activeItems(responseData?.youtube).map((item) => ({
                  ...item,
                  thumbnailUrl: makeUrl(thumbPath, item?.thumbnail),
          })),
    };
}

async function requestGermanProgram(programId, uid) {
    const apiKey = process.env.GERMAN_PROGRAMS_API_KEY;
  
    if (!apiKey) {
          // TEMP FALLBACK: GERMAN_PROGRAMS_API_KEY is not configured on this
          // environment yet. Return null instead of throwing so this page can't
          // fail a build or crash at request time; the page already renders a
          // graceful "not found" state for null. Remove this early return once
          // the env var is set on the host.
          console.warn(
                  "GERMAN_PROGRAMS_API_KEY is not configured - returning null for program",
                  programId
                );
          return null;
    }
  
    const body = new FormData();
    body.set("api", apiKey);
    body.set("uid", String(uid));
    body.set("id", String(programId));
  
    const response = await fetch(API_URL, {
          method: "POST",
          body,
          cache: "no-store",
          headers: {
                  Accept: "application/json",
          },
    });
  
    const result = await response.json().catch(() => null);
  
    if (!response.ok) {
          throw new Error(
                  result?.message ||
                    result?.msg ||
                    `German programs API returned ${response.status}.`
                );
    }
  
    if (!result || result?.status === false) {
          throw new Error(
                  result?.message || result?.msg || "Program was not found."
                );
    }
  
    return normalizeResponse(result);
}

const getCachedGermanProgram = unstable_cache(
    requestGermanProgram,
    ["german-program-details-v1"],
  {
        revalidate: 3600,
        tags: ["german-programs"],
  }
  );

export async function getGermanProgramDetails(
    programId,
    uid = 0
  ) {
    const normalizedId = Number(programId);
  
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
          return null;
    }
  
    return getCachedGermanProgram(normalizedId, Number(uid) || 0);
}

async function requestGermanProgramsList(uid) {
    const apiKey = process.env.GERMAN_PROGRAMS_API_KEY;
  
    if (!apiKey) {
          // TEMP FALLBACK: GERMAN_PROGRAMS_API_KEY is not configured on this
          // environment yet. Return an empty list instead of throwing so
          // /german-programs can't fail a production build during static
          // prerendering; the page already renders "No German programs are
          // currently available" when the list is empty. Remove this early
          // return once the env var is set on the host.
          console.warn(
                  "GERMAN_PROGRAMS_API_KEY is not configured - returning empty German programs list"
                );
          return { programs: [], imagePath: DEFAULT_IMAGE_PATH };
    }
  
    const body = new FormData();
    body.set("api", apiKey);
    body.set("uid", String(uid));
  
    const response = await fetch(HOME_API_URL, {
          method: "POST",
          body,
          cache: "no-store",
          headers: {
                  Accept: "application/json",
          },
    });
  
    const result = await response.json().catch(() => null);
  
    if (!response.ok || !result) {
          throw new Error(
                  result?.message ||
                    result?.msg ||
                    `Home responses API returned ${response.status}.`
                );
    }
  
    const imagePath =
          result.hometile_image_path ||
          result.home_tile_image_path ||
          DEFAULT_IMAGE_PATH;
  
    const programs = activeItems(result.home_tile_new).map((item) => ({
          ...item,
          imageUrl: makeUrl(imagePath, item?.image),
          iconUrl: makeUrl(imagePath, item?.icon),
    }));
  
    return {
          programs,
          imagePath,
    };
}

const getCachedGermanProgramsList = unstable_cache(
    requestGermanProgramsList,
    ["german-program-list-v1"],
 {
        revalidate: 3600,
        tags: ["german-programs-list"],
  }
  );

export function getGermanProgramsList(uid = 6) {
    return getCachedGermanProgramsList(Number(uid) || 6);
}
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

function makeUrl(basePath, file) {
  if (!file) return "";
  if (/^https?:\/\//i.test(String(file))) return String(file);
  return `${basePath}${file}`;
}

function activeItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && String(item.status ?? "1") !== "0")
    .sort(
      (a, b) =>
        Number(a?.order ?? 0) - Number(b?.order ?? 0)
    );
}

function normalizeIconItems(items, iconPath) {
  return activeItems(items).map((item) => ({
    ...item,
    iconUrl: makeUrl(iconPath, item?.icon),
  }));
}

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
    benefits: normalizeIconItems(responseData?.benefit, iconPath),
    stipend: normalizeIconItems(responseData?.stipend, iconPath),
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
    streams: normalizeIconItems(responseData?.streams, iconPath),
    details: normalizeIconItems(responseData?.details, iconPath),
    relatedPrograms,
    youtube: activeItems(responseData?.youtube).map((item) => ({
      ...item,
      thumbnailUrl: makeUrl(thumbPath, item?.thumbnail),
    })),
  };
}

async function requestGermanProgram(programId, uid) {
  const apiKey = process.env.GERMAN_PROGRAMS_API_KEY;

  if (!apiKey) {
    throw new Error("GERMAN_PROGRAMS_API_KEY is not configured.");
  }

  const body = new FormData();
  body.set("api", apiKey);
  body.set("uid", String(uid));
  body.set("id", String(programId));

  const response = await fetch(API_URL, {
    method: "POST",
    body,
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.msg ||
        `German programs API returned ${response.status}.`
    );
  }

  if (!result || result?.status === false) {
    throw new Error(
      result?.message || result?.msg || "Program was not found."
    );
  }

  return normalizeResponse(result);
}

const getCachedGermanProgram = unstable_cache(
  requestGermanProgram,
  ["german-program-details-v1"],
  {
    revalidate: 3600,
    tags: ["german-programs"],
  }
);

export async function getGermanProgramDetails(
  programId,
  uid = 0
) {
  const normalizedId = Number(programId);

  if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
    return null;
  }

  return getCachedGermanProgram(normalizedId, Number(uid) || 0);
}

async function requestGermanProgramsList(uid) {
  const apiKey = process.env.GERMAN_PROGRAMS_API_KEY;

  if (!apiKey) {
    throw new Error("GERMAN_PROGRAMS_API_KEY is not configured.");
  }

  const body = new FormData();
  body.set("api", apiKey);
  body.set("uid", String(uid));

  const response = await fetch(HOME_API_URL, {
    method: "POST",
    body,
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result) {
    throw new Error(
      result?.message ||
        result?.msg ||
        `Home responses API returned ${response.status}.`
    );
  }

  const imagePath =
    result.hometile_image_path ||
    result.home_tile_image_path ||
    DEFAULT_IMAGE_PATH;

  const programs = activeItems(result.home_tile_new).map((item) => ({
    ...item,
    imageUrl: makeUrl(imagePath, item?.image),
    iconUrl: makeUrl(imagePath, item?.icon),
  }));

  return {
    programs,
    imagePath,
  };
}

const getCachedGermanProgramsList = unstable_cache(
  requestGermanProgramsList,
  ["german-program-list-v1"],
  {
    revalidate: 3600,
    tags: ["german-programs-list"],
  }
);

export function getGermanProgramsList(uid = 6) {
  return getCachedGermanProgramsList(Number(uid) || 6);
}
