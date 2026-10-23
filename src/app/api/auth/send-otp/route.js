import { NextResponse } from "next/server";

const SEND_OTP_URL =
  "https://overseas.technocitysolutions.com/public/api/sendOTPforLogin";

export async function POST(request) {
  try {
    const body = await request.json();

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          status: false,
          msg: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.OVERSEAS_API_KEY;

    if (!apiKey) {
      console.error(
        "OVERSEAS_API_KEY is missing"
      );

      return NextResponse.json(
        {
          status: false,
          msg: "Server configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    const formData = new FormData();

    formData.append(
      "api",
      apiKey
    );

    formData.append(
      "email",
      email
    );

    const upstreamResponse = await fetch(
      SEND_OTP_URL,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );

    const responseText =
      await upstreamResponse.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "Invalid send OTP response:",
        responseText
      );

      return NextResponse.json(
        {
          status: false,
          msg: "Authentication server returned an invalid response.",
        },
        {
          status: 502,
        }
      );
    }

    // Only pass on the fields the login form needs, never the
    // raw upstream payload (it could carry OTP details).
    const isSuccess =
      data?.status === true ||
      data?.status === 1 ||
      data?.status === "1" ||
      data?.status === "true";

    return NextResponse.json(
      {
        status: isSuccess,
        msg: data?.msg || data?.message || "",
        uid: data?.uid ?? data?.data?.uid ?? null,
      },
      {
        status: upstreamResponse.ok
          ? 200
          : upstreamResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "Send OTP route error:",
      error
    );

    return NextResponse.json(
      {
        status: false,
        msg: "Unable to send OTP.",
      },
      {
        status: 500,
      }
    );
  }
}