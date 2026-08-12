import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const session =
      cookieStore.get("medcity_session");

    if (!session?.value) {
      console.log(
        "Session check: medcity_session NOT FOUND"
      );

      return NextResponse.json(
        {
          authenticated: false,
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

    console.log(
      "Session check: medcity_session FOUND"
    );

    return NextResponse.json(
      {
        authenticated: true,
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
        authenticated: false,
      },
      { status: 500 }
    );
  }
}