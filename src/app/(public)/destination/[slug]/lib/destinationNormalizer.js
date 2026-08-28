const FALLBACK_IMAGE =
  "/images/destination-fallback.webp";

const DEFAULT_DESTINATION_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/destinations";

const DEFAULT_UNIVERSITY_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/university";

export function toSafeText(
  value,
  fallback = "",
  visited = new WeakSet()
) {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return (
      String(value).trim() ||
      fallback
    );
  }

  if (typeof value === "boolean") {
    return value
      ? "Yes"
      : "No";
  }

  if (Array.isArray(value)) {
    const result = value
      .map((item) =>
        toSafeText(
          item,
          "",
          visited
        )
      )
      .filter(Boolean)
      .join(", ");

    return result || fallback;
  }

  if (typeof value === "object") {
    if (visited.has(value)) {
      return fallback;
    }

    visited.add(value);

    return toSafeText(
      value?.name ??
        value?.country ??
        value?.country_name ??
        value?.destination_name ??
        value?.title ??
        value?.label ??
        value?.text ??
        value?.value ??
        value?.description ??
        value?.content ??
        "",
      fallback,
      visited
    );
  }

  return fallback;
}

function cleanBasePath(
  value,
  fallback = ""
) {
  return String(
    value || fallback
  )
    .trim()
    .replace(/\/+$/, "");
}

function buildImageUrl({
  basePath,
  fileName,
  fallback = null,
}) {
  const file =
    toSafeText(fileName);

  if (!file) {
    return fallback;
  }

  if (
    file.startsWith("http://") ||
    file.startsWith("https://") ||
    file.startsWith("/")
  ) {
    return file;
  }

  const base =
    cleanBasePath(basePath);

  if (!base) {
    return fallback;
  }

  return `${base}/${file.replace(
    /^\/+/,
    ""
  )}`;
}

function normalizeCountry(
  country
) {
  if (
    !country ||
    typeof country !== "object"
  ) {
    return null;
  }

  const countryName =
    toSafeText(
      country?.country ??
        country?.country_name ??
        country?.destination_name ??
        country?.name ??
        country?.title,
      "Study Destination"
    );

  return {
    ...country,

    id: toSafeText(
      country?.id ??
        country?.d_id ??
        country?.destination_id
    ),

    country: countryName,
    country_name: countryName,
    destination_name:
      countryName,
    name: countryName,

    capital: toSafeText(
      country?.capital,
      "N/A"
    ),

    language: toSafeText(
      country?.language ??
        country?.official_language ??
        country?.primary_language,
      "N/A"
    ),

    official_language:
      toSafeText(
        country?.official_language ??
          country?.language,
        "N/A"
      ),

    currency: toSafeText(
      country?.currency,
      "N/A"
    ),

    currency_symbol:
      toSafeText(
        country?.currency_symbol ??
          country?.currencySymbol
      ),

    diallingcode:
      toSafeText(
        country?.diallingcode ??
          country?.dialling_code ??
          country?.phone_code,
        "N/A"
      ),

    temperature:
      toSafeText(
        country?.temperature ??
          country?.climate,
        "N/A"
      ),

    continent: toSafeText(
      country?.continent,
      "N/A"
    ),

    description:
      toSafeText(
        country?.description ??
          country?.short_description ??
          country?.details ??
          country?.content,
        ""
      ),

    short_description:
      toSafeText(
        country?.short_description ??
          country?.description ??
          country?.details ??
          country?.content,
        ""
      ),

    university_count:
      toSafeText(
        country?.university_count ??
          country?.universities_count ??
          country?.total_universities,
        ""
      ),

    course_count:
      toSafeText(
        country?.course_count ??
          country?.courses_count ??
          country?.total_courses,
        ""
      ),

    international_students:
      toSafeText(
        country?.international_students ??
          country?.student_count,
        ""
      ),
  };
}

function normalizeHighlights(
  items
) {
  if (!Array.isArray(items)) {
    return [];
  }

  const seen = new Set();

  return items
    .map((item, index) => {
      const text =
        toSafeText(
          item?.text ??
            item?.name ??
            item?.title ??
            item?.label ??
            item?.description ??
            item?.details ??
            item?.content ??
            item,
          ""
        );

      if (!text) {
        return null;
      }

      const key =
        text.toLowerCase();

      if (seen.has(key)) {
        return null;
      }

      seen.add(key);

      return {
        id: String(
          item?.id ??
            item?.attraction_id ??
            `highlight-${index}`
        ),
        text,
      };
    })
    .filter(Boolean);
}

function normalizeUniversities(
  items
) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      if (
        !item ||
        typeof item !==
          "object"
      ) {
        return null;
      }

      return {
        ...item,

        id: toSafeText(
          item?.id ??
            item?.university_id ??
            item?.u_id,
          `university-${index}`
        ),

        name: toSafeText(
          item?.name ??
            item?.university_name ??
            item?.title,
          "University"
        ),

        location:
          toSafeText(
            item?.location ??
              item?.city ??
              item?.address,
            ""
          ),

        logo: toSafeText(
          item?.logo ??
            item?.image ??
            item?.university_logo,
          ""
        ),
      };
    })
    .filter(Boolean);
}

export function extractDestinationData(
  response,
  destinationId
) {
  const destinations =
    Array.isArray(
      response?.data
    )
      ? response.data
      : Array.isArray(
            response?.destinations
          )
        ? response.destinations
        : response?.data &&
            typeof response.data ===
              "object"
          ? [response.data]
          : [];

  const rawCountry =
    destinations.find(
      (item) =>
        String(
          item?.id ??
            item?.d_id ??
            item?.destination_id ??
            ""
        ) ===
        String(destinationId)
    ) ??
    destinations[0] ??
    null;

  if (!rawCountry) {
    return null;
  }

  const country =
    normalizeCountry(
      rawCountry
    );

  if (!country) {
    return null;
  }

  const destinationImagePath =
    cleanBasePath(
      response?.destinations_image_path ??
        response?.destination_image_path ??
        response?.imagePath ??
        response?.image_path,
      DEFAULT_DESTINATION_IMAGE_PATH
    );

  const universityImagePath =
    cleanBasePath(
      response?.universities_image_path ??
        response?.university_image_path ??
        response?.universitiesImagePath,
      DEFAULT_UNIVERSITY_IMAGE_PATH
    );

  const image =
    buildImageUrl({
      basePath:
        destinationImagePath,

      fileName:
        rawCountry?.image ??
        rawCountry?.destination_image ??
        rawCountry?.banner ??
        rawCountry?.banner_image,

      fallback:
        FALLBACK_IMAGE,
    });

  const flag =
    buildImageUrl({
      basePath:
        destinationImagePath,

      fileName:
        rawCountry?.flag ??
        rawCountry?.flag_image,

      fallback: null,
    });

  const highlights =
    normalizeHighlights(
      response?.attractions ??
        response?.benefits ??
        rawCountry?.attractions ??
        rawCountry?.benefits
    );

  const rawUniversities =
    Array.isArray(
      response?.universities
    )
      ? response.universities
      : Array.isArray(
            response?.data
              ?.universities
          )
        ? response.data
            .universities
        : Array.isArray(
              rawCountry?.universities
            )
          ? rawCountry
              .universities
          : [];

  const universities =
    normalizeUniversities(
      rawUniversities
    )
      .filter((university) => {
        const countryId =
          university?.d_id ??
          university?.country_id ??
          university?.destination_id;

        if (
          countryId ===
            undefined ||
          countryId === null ||
          String(
            countryId
          ).trim() === ""
        ) {
          return true;
        }

        return (
          String(countryId) ===
          String(destinationId)
        );
      })
      .slice(0, 12);

  return {
    country,
    highlights,
    universities,
    universityImagePath,
    image,
    flag,
  };
}