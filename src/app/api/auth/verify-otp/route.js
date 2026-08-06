import { NextResponse } from "next/server";

const VERIFY_OTP_URL =
  "https://overseas.technocitysolutions.com/public/api/VerifyOTP";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = String(body?.email ?? "")
      .trim()
      .toLowerCase();

    const otp = String(body?.otp ?? "").trim();

    if (!email) {
      return NextResponse.json(
        {
          status: false,
          msg: "Email is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          status: false,
          msg: "Enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^\d{4}$/.test(otp)) {
      return NextResponse.json(
        {
          status: false,
          msg: "Enter a valid 4 digit OTP.",
        },
        {
          status: 400,
        },
      );
    }

    const formData = new FormData();

    formData.append("api", "overseas@Miak2023");
    formData.append("email", email);
    formData.append("otp", otp);

    formData.append("type", "login");
    formData.append("model", "web");
    formData.append("manufacture", "web");
    formData.append("brand", "web");
    formData.append("sdk", "web");
    formData.append("release", "web");
    formData.append("token", "web");

    const upstreamResponse = await fetch(
      VERIFY_OTP_URL,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      },
    );

    const responseText =
      await upstreamResponse.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "Invalid VerifyOTP response:",
        responseText,
      );

      return NextResponse.json(
        {
          status: false,
          msg: "Authentication server returned an invalid response.",
        },
        {
          status: 502,
        },
      );
    }

    const statusCode = upstreamResponse.ok
      ? 200
      : upstreamResponse.status || 502;

    const response = NextResponse.json(data, {
      status: statusCode,
    });

    if (data?.status === true) {
      const sessionValue =
        data?.token ??
        data?.uid ??
        data?.data?.token ??
        data?.data?.uid ??
        "";

      if (sessionValue) {
        response.cookies.set({
          name: "medcity_session",
          value: String(sessionValue),
          httpOnly: true,
          secure:
            process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 8,
        });
      }
    }

    return response;
  } catch (error) {
    console.error(
      "Verify OTP route error:",
      error,
    );

    return NextResponse.json(
      {
        status: false,
        msg: "Unable to verify OTP. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}