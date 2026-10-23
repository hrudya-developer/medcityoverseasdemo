import { NextResponse } from "next/server";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getWebBlogs";

const API_KEY =
  process.env.OVERSEAS_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        {
          message:
            "Blog API configuration is missing.",
          blogs: [],
          imagePath: "",
        },
        {
          status: 500,
        }
      );
    }

    const formData =
      new FormData();

    formData.append(
      "api",
      API_KEY
    );

    const response =
      await fetch(
        API_URL,
        {
          method: "POST",
          body: formData,
          cache: "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    const rawResponse =
      await response.text();

    if (!response.ok) {
      console.error(
        "getWebBlogs failed:",
        response.status,
        rawResponse
      );

      return NextResponse.json(
        {
          message:
            "Unable to load blogs.",
          blogs: [],
          imagePath: "",
        },
        {
          status:
            response.status,
        }
      );
    }

    let result;

    try {
      result =
        JSON.parse(
          rawResponse
        );
    } catch (error) {
      console.error(
        "Invalid blog JSON:",
        error
      );

      return NextResponse.json(
        {
          message:
            "Invalid blog API response.",
          blogs: [],
          imagePath: "",
        },
        {
          status: 502,
        }
      );
    }

    const blogs =
      Array.isArray(
        result?.blog
      )
        ? result.blog
        : [];

    const imagePath =
      typeof result?.blog_image_path ===
      "string"
        ? result.blog_image_path
        : "";

    return NextResponse.json({
      blogs,
      imagePath,
      total:
        blogs.length,
    });
  } catch (error) {
    console.error(
      "Blog route error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load blogs.",
        blogs: [],
        imagePath: "",
      },
      {
        status: 500,
      }
    );
  }
}