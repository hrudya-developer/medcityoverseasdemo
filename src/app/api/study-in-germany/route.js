import { NextResponse } from "next/server";

import { getGermanProgramsList } from "@/lib/germanPrograms";

export const runtime = "nodejs";

export async function GET(request) {
  const uid = new URL(request.url).searchParams.get("uid") || 6;

  try {
    const data = await getGermanProgramsList(uid);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("German programs list API error:", error);

    return NextResponse.json(
      { message: "Unable to load German programs." },
      { status: 502 }
    );
  }
}

