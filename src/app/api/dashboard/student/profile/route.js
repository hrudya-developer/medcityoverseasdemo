import { NextResponse } from "next/server";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/setUserProfile";

const API_KEY =
  process.env.OVERSEAS_API_KEY;

export async function POST(request) {
  try {
    if (!API_KEY) {
      console.error(
        "OVERSEAS_API_KEY is missing."
      );

      return NextResponse.json(
        {
          message:
            "Profile API configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body =
      await request.json();

    const {
      uid,
      name,
      mobile,
      country,
      code,
      address,
      gender,
      dob,
    } = body;

    if (!uid) {
      return NextResponse.json(
        {
          message:
            "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message:
            "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        {
          message:
            "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!dob) {
      return NextResponse.json(
        {
          message:
            "Date of birth is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!address?.trim()) {
      return NextResponse.json(
        {
          message:
            "Address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const formData =
      new FormData();

    formData.append(
      "api",
      API_KEY
    );

    formData.append(
      "uid",
      String(uid)
    );

    formData.append(
      "name",
      name.trim()
    );

    formData.append(
      "mobile",
      mobile
    );

    formData.append(
      "country",
      country || "in"
    );

    formData.append(
      "code",
      code || "91"
    );

    formData.append(
      "address",
      address.trim()
    );

    formData.append(
      "gender",
      gender || "Female"
    );

    formData.append(
      "dob",
      dob
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

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    const rawResponse =
      await response.text();

    if (!response.ok) {
      console.error(
        "Set user profile API failed:",
        {
          status:
            response.status,
          body:
            rawResponse.slice(
              0,
              500
            ),
        }
      );

      return NextResponse.json(
        {
          message:
            "Unable to update user profile.",
        },
        {
          status:
            response.status,
        }
      );
    }

    if (
      !contentType.includes(
        "application/json"
      )
    ) {
      console.error(
        "Set user profile API returned non-JSON:",
        rawResponse.slice(
          0,
          500
        )
      );

      return NextResponse.json(
        {
          message:
            "Profile API returned an invalid response.",
        },
        {
          status: 502,
        }
      );
    }

    let result;

    try {
      result =
        JSON.parse(rawResponse);
    } catch (error) {
      console.error(
        "Unable to parse profile API response:",
        error
      );

      return NextResponse.json(
        {
          message:
            "Profile API returned invalid JSON.",
        },
        {
          status: 502,
        }
      );
    }

    if (!result?.status) {
      return NextResponse.json(
        {
          success: false,
          status: false,
          message:
            result?.msg ||
            result?.message ||
            "Unable to create profile.",
          data:
            result,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        status: true,
        message:
          result?.msg ||
          result?.message ||
          "Profile created successfully.",
        data:
          result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Set user profile route error:",
      {
        message:
          error?.message,
        cause:
          error?.cause,
      }
    );

    return NextResponse.json(
      {
        message:
          "Unable to create user profile.",
      },
      {
        status: 500,
      }
    );
  }
}