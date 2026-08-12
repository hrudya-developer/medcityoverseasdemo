import { NextResponse } from "next/server";

const API_KEY =
  process.env.OVERSEAS_API_KEY;

const SEARCH_API =
  "https://overseas.technocitysolutions.com/public/api/searchResults";

function getList(
  result,
  type
) {
  if (type === "course") {
    return Array.isArray(
      result?.course
    )
      ? result.course
      : [];
  }

  if (type === "university") {
    return Array.isArray(
      result?.university
    )
      ? result.university
      : [];
  }

  return [];
}

function uniqueSuggestions(
  suggestions
) {
  const seen = new Set();

  return suggestions.filter(
    (item) => {
      const key =
        `${item.type}-${item.id}-${item.label}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    }
  );
}

export async function GET(request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const keyword =
      searchParams
        .get("keyword")
        ?.trim() || "";

    if (keyword.length < 2) {
      return NextResponse.json({
        suggestions: [],
      });
    }

    const types = [
      "course",
      "university",
    ];

    const responses =
      await Promise.all(
        types.map(async (type) => {
          const formData =
            new FormData();

          formData.append(
            "api",
            API_KEY
          );

          formData.append(
            "keytype",
            type
          );

          formData.append(
            "keyword",
            keyword
          );

          const response =
            await fetch(
              SEARCH_API,
              {
                method: "POST",
                body: formData,
                cache: "no-store",
              }
            );

          if (!response.ok) {
            return [];
          }

          const result =
            await response.json();

          return getList(
            result,
            type
          )
            .map((item) => {
              if (
                type === "course"
              ) {
                return {
                  id:
                    item?.id ||
                    item?.course_id ||
                    item?.c_id,

                  type:
                    "course",

                  label:
                    item?.course ||
                    item?.course_name ||
                    item?.main_course ||
                    "",

                  university:
                    item?.university ||
                    item?.university_name ||
                    "",

                  country:
                    item?.country ||
                    item?.destination ||
                    item?.d_name ||
                    item?.country_name ||
                    "",
                };
              }

              return {
                id:
                  item?.id ||
                  item?.u_id ||
                  item?.university_id,

                type:
                  "university",

                label:
                  item?.university ||
                  item?.name ||
                  item?.u_name ||
                  "",

                country:
                  item?.country ||
                  item?.destination ||
                  item?.d_name ||
                  "",
              };
            })
            .filter(
              (item) =>
                item.id &&
                item.label
            );
        })
      );

    return NextResponse.json({
      suggestions:
        uniqueSuggestions(
          responses.flat()
        ),
    });
  } catch (error) {
    console.error(
      "Suggestion route error:",
      error
    );

    return NextResponse.json(
      {
        suggestions: [],
        message:
          "Unable to load suggestions.",
      },
      {
        status: 500,
      }
    );
  }
}