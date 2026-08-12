import { NextResponse } from "next/server";

const VERIFY_OTP_URL =
  "https://overseas.technocitysolutions.com/public/api/VerifyOTP";

function isSuccessfulStatus(value) {
  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true"
  );
}

function getSessionValue(data) {
  const responseData = data?.data ?? {};
  const user = data?.user ?? responseData?.user ?? {};

  return (
    data?.token ??
    data?.access_token ??
    data?.uid ??
    data?.user_id ??
    data?.student_id ??
    data?.id ??
    responseData?.token ??
    responseData?.access_token ??
    responseData?.uid ??
    responseData?.user_id ??
    responseData?.student_id ??
    responseData?.id ??
    user?.token ??
    user?.access_token ??
    user?.uid ??
    user?.user_id ??
    user?.student_id ??
    user?.id ??
    ""
  );
}

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
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          status: false,
          msg: "Enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{4}$/.test(otp)) {
      return NextResponse.json(
        {
          status: false,
          msg: "Enter a valid 4 digit OTP.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OVERSEAS_API_KEY;

    if (!apiKey) {
      console.error(
        "OVERSEAS_API_KEY is missing."
      );

      return NextResponse.json(
        {
          status: false,
          msg: "Authentication service is not configured.",
        },
        { status: 500 }
      );
    }

    const formData = new FormData();

    formData.append("api", apiKey);
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
      }
    );

    const responseText =
      await upstreamResponse.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "VerifyOTP returned invalid JSON:",
        responseText
      );

      return NextResponse.json(
        {
          status: false,
          msg: "Authentication server returned an invalid response.",
        },
        { status: 502 }
      );
    }

    console.log(
      "VerifyOTP response:",
      JSON.stringify(data, null, 2)
    );

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          status: false,
          msg:
            data?.msg ||
            data?.message ||
            "Unable to verify OTP.",
        },
        {
          status:
            upstreamResponse.status || 502,
        }
      );
    }

    if (!isSuccessfulStatus(data?.status)) {
      return NextResponse.json(
        {
          ...data,
          status: false,
          msg:
            data?.msg ||
            data?.message ||
            "OTP verification failed.",
        },
        { status: 401 }
      );
    }

    const sessionValue =
      getSessionValue(data);

    if (!sessionValue) {
      console.error(
        "OTP verified but no session/user identifier exists:",
        JSON.stringify(data, null, 2)
      );

      return NextResponse.json(
        {
          status: false,
          msg: "OTP verified but the authentication server did not return a user identifier.",
        },
        { status: 502 }
      );
    }

    const response = NextResponse.json(
      {
        ...data,
        status: true,
      },
      { status: 200 }
    );

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

    console.log(
      "medcity_session created:",
      String(sessionValue)
    );

    return response;
  } catch (error) {
    console.error(
      "Verify OTP route error:",
      error
    );

    return NextResponse.json(
      {
        status: false,
        msg: "Unable to verify OTP. Please try again.",
      },
      { status: 500 }
    );
  }
}