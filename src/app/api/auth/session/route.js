import {
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";

export const dynamic =
  "force-dynamic";

export async function GET() {
  try {
      const cookieStore =
          await cookies();

      const sessionCookie =
          cookieStore.get(
              SESSION_COOKIE_NAME
          );

      if (
          !sessionCookie?.value
      ) {
          return NextResponse.json(
              {
                  authenticated:
                      false,

                  user:
                      null,
              },
              {
                  status: 401,

                  headers: {
                      "Cache-Control":
                          "no-store, no-cache, must-revalidate",
                  },
              }
          );
      }

      const session =
          verifySessionToken(
              sessionCookie.value
          );

      if (!session) {
          const response =
              NextResponse.json(
                  {
                      authenticated:
                          false,

                      user:
                          null,
                  },
                  {
                      status: 401,

                      headers: {
                          "Cache-Control":
                              "no-store, no-cache, must-revalidate",
                      },
                  }
              );

          response.cookies.set({
              name:
                  SESSION_COOKIE_NAME,

              value:
                  "",

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
                  0,
          });

          return response;
      }

      return NextResponse.json(
          {
              authenticated:
                  true,

              user: {
                  uid:
                      session.uid,

                  email:
                      session.email,

                  name:
                      session.name ??
                      "",
              },
          },
          {
              status: 200,

              headers: {
                  "Cache-Control":
                      "no-store, no-cache, must-revalidate",
              },
          }
      );

  } catch (error) {
      console.error(
          "Session check error:",
          error
      );

      return NextResponse.json(
          {
              authenticated:
                  false,

              user:
                  null,
          },
          {
              status: 500,
          }
      );
  }
}