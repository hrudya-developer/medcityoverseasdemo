import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

import { legacyFetch } from "@/lib/legacy";

const DESTINATION_DETAILS_API =
  "https://overseas.technocitysolutions.com/public/api/getDestinationDetails";

export async function resolveDestinationId(
  slug = ""
) {
  const normalizedSlug = String(slug)
    .trim()
    .toLowerCase();

  if (!normalizedSlug) {
    return "";
  }

  // A numeric id is not a page of its own: the page redirects it to
  // the slug address (see findDestinationSlugById).
  if (/^\d+$/.test(normalizedSlug)) {
    return "";
  }

  const result =
    await postOverseasForm(
      "getDestinations",
      {
        uid: 0,
      },
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  const destinations =
    Array.isArray(
      result?.destinations
    )
      ? result.destinations
      : Array.isArray(
            result?.data
          )
        ? result.data
        : [];

  const destination =
    destinations.find(
      (item) => {
        const countryName =
          item?.country ||
          item?.name ||
          item?.destination ||
          "";

        return (
          createSlug(countryName) ===
          normalizedSlug
        );
      }
    );

  return String(
    destination?.id ||
      destination?.d_id ||
      destination?.destination_id ||
      ""
  );
}

/*
 * Old addresses carry the numeric destination id (/study-in-39).
 * Returns the slug of that destination (for example "azerbaijan"),
 * or "" when no listed destination has that id.
 */
export async function findDestinationSlugById(
  id = ""
) {
  const wanted = String(id).trim();

  if (!/^\d+$/.test(wanted)) {
    return "";
  }

  const result =
    await postOverseasForm(
      "getDestinations",
      {
        uid: 0,
      }
    );

  const destinations =
    Array.isArray(result?.destinations)
      ? result.destinations
      : Array.isArray(result?.data)
        ? result.data
        : [];

  const destination =
    destinations.find(
      (item) =>
        String(
          item?.id ??
            item?.d_id ??
            item?.destination_id ??
            ""
        ) === wanted
    );

  const countryName =
    destination?.country ||
    destination?.name ||
    destination?.destination ||
    "";

  return countryName
    ? createSlug(countryName)
    : "";
}

export async function getDestinationDetails(
  id
) {
  const apiKey =
    process.env.OVERSEAS_API_KEY ||
    "";

  if (!apiKey) {
    throw new Error(
      "OVERSEAS_API_KEY is not configured."
    );
  }

  const response =
    await legacyFetch(DESTINATION_DETAILS_API,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
        },

        body: JSON.stringify({
          api: apiKey,
          uid: 0,
          id: String(id),
        }),

        next: {
          revalidate: 3600,
          tags: [
            `destination-${id}`,
          ],
        },
      }
    );

  if (!response.ok) {
    throw new Error(
      `Destination request failed with status ${response.status}`
    );
  }

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    throw new Error(
      "Destination API did not return JSON."
    );
  }

  return response.json();
}