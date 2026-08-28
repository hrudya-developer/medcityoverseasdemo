import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

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

  if (/^\d+$/.test(normalizedSlug)) {
    return normalizedSlug;
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
    await fetch(
      DESTINATION_DETAILS_API,
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