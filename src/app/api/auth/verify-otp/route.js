import {
  NextResponse,
} from "next/server";

import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/session";

const VERIFY_OTP_URL =
  "https://overseas.technocitysolutions.com/public/api/VerifyOTP";

function isSuccessfulStatus(
  value
) {
  return (
      value === true ||
      value === 1 ||
      value === "1" ||
      value === "true"
  );
}

function getUserId(data) {
  const responseData =
      data?.data ?? {};

  const user =
      data?.user ??
      responseData?.user ??
      {};

  return (
      data?.uid ??
      data?.user_id ??
      data?.student_id ??
      data?.id ??
      responseData?.uid ??
      responseData?.user_id ??
      responseData?.student_id ??
      responseData?.id ??
      user?.uid ??
      user?.user_id ??
      user?.student_id ??
      user?.id ??
      null
  );
}

export async function POST(
  request
) {
  try {
      const body =
          await request.json();

      const email =
          String(
              body?.email ?? ""
          )
              .trim()
              .toLowerCase();

      const otp =
          String(
              body?.otp ?? ""
          ).trim();

      if (!email) {
          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Email is required.",
              },
              {
                  status: 400,
              }
          );
      }

      if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              email
          )
      ) {
          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Enter a valid email address.",
              },
              {
                  status: 400,
              }
          );
      }

      if (
          !/^\d{4}$/.test(
              otp
          )
      ) {
          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Enter a valid 4 digit OTP.",
              },
              {
                  status: 400,
              }
          );
      }

      const apiKey =
          process.env
              .OVERSEAS_API_KEY;

      if (!apiKey) {
          console.error(
              "OVERSEAS_API_KEY is missing."
          );

          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Authentication service is not configured.",
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
          apiKey
      );

      formData.append(
          "email",
          email
      );

      formData.append(
          "otp",
          otp
      );

      formData.append(
          "type",
          "login"
      );

      formData.append(
          "model",
          "web"
      );

      formData.append(
          "manufacture",
          "web"
      );

      formData.append(
          "brand",
          "web"
      );

      formData.append(
          "sdk",
          "web"
      );

      formData.append(
          "release",
          "web"
      );

      formData.append(
          "token",
          "web"
      );

      const upstreamResponse =
          await fetch(
              VERIFY_OTP_URL,
              {
                  method:
                      "POST",

                  body:
                      formData,

                  cache:
                      "no-store",
              }
          );

      const responseText =
          await upstreamResponse
              .text();

      let data;

      try {
          data =
              JSON.parse(
                  responseText
              );
      } catch {
          console.error(
              "VerifyOTP invalid response:",
              responseText
          );

          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Authentication server returned invalid data.",
              },
              {
                  status: 502,
              }
          );
      }

      if (
          !upstreamResponse.ok
      ) {
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
                      upstreamResponse
                          .status ||
                      502,
              }
          );
      }

      if (
          !isSuccessfulStatus(
              data?.status
          )
      ) {
          return NextResponse.json(
              {
                  ...data,

                  status:
                      false,

                  msg:
                      data?.msg ||
                      data?.message ||
                      "Invalid OTP.",
              },
              {
                  status: 401,
              }
          );
      }

      const uid =
          getUserId(data);

      if (!uid) {
          console.error(
              "OTP verified but uid missing:",
              data
          );

          return NextResponse.json(
              {
                  status: false,

                  msg:
                      "OTP was verified but the user could not be identified.",
              },
              {
                  status: 502,
              }
          );
      }

      const responseData =
          data?.data ?? {};

      const upstreamUser =
          data?.user ??
          responseData?.user ??
          {};

      const name =
          data?.name ??
          responseData?.name ??
          upstreamUser?.name ??
          "";

      /*
       * Server session contains
       * the identity required to
       * restore Redux later.
       */
      const sessionToken =
          createSessionToken({
              uid,
              email,
              name,
          });

      /*
       * Do not expose OTP or
       * unnecessary upstream
       * authentication values.
       */
      const response =
          NextResponse.json(
              {
                  status: true,

                  stage:
                      data?.stage ??
                      responseData
                          ?.stage ??
                      null,

                  user: {
                      uid,
                      email,
                      name,
                  },
              },
              {
                  status: 200,
              }
          );

      response.cookies.set({
          name:
              SESSION_COOKIE_NAME,

          value:
              sessionToken,

          httpOnly:
              true,

          secure:
              process.env
                  .NODE_ENV ===
              "production",

          sameSite:
              "lax",

          path:
              "/",

          maxAge:
              SESSION_MAX_AGE,
      });

      return response;

  } catch (error) {
      console.error(
          "Verify OTP route error:",
          error
      );

      return NextResponse.json(
          {
              status: false,

              msg:
                  "Unable to verify OTP. Please try again.",
          },
          {
              status: 500,
          }
      );
  }
}