import { NextResponse } from "next/server";

const API_URL =
  "http://overseas.technocitysolutions.com/public/api/getWebBlogs";

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

    console.log(
      "TOTAL BLOGS FROM API:",
      blogs.length
    );
    console.log(
  "BLOGS FROM getWebBlogs:",
  blogs.map(
    (blog) => ({
      id:
        blog?.id,

      title:
        blog?.title,

      status:
        blog?.status,

      image_land:
        blog?.image_land,

      image_prt:
        blog?.image_prt,

      subheading1:
        blog?.subheading1,

      subheading2:
        blog?.subheading2,

      subheading3:
        blog?.subheading3,

      subtext1:
        blog?.subtext1,

      subtext2:
        blog?.subtext2,

      subtext3:
        blog?.subtext3,

      alt_text1:
        blog?.alt_text1,

      alt_text2:
        blog?.alt_text2,

      link:
        blog?.link,
    })
  )
);
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