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

    const formData = new FormData();

    formData.append(
      "api",
      "overseas@Miak2023"
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

    console.log(
      "Send OTP response:",
      data
    );

    return NextResponse.json(
      data,
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