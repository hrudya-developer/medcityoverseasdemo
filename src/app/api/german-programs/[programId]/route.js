import { NextResponse } from "next/server";

import { getGermanProgramDetails } from "@/lib/germanPrograms";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { programId } = await params;
  const uid = new URL(request.url).searchParams.get("uid") || 0;

  try {
    const program = await getGermanProgramDetails(programId, uid);

    if (!program?.mainData) {
      return NextResponse.json(
        { message: "German program not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(program, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("German program API error:", error);

    return NextResponse.json(
      { message: "Unable to load the German program." },
      { status: 502 }
    );
  }
}

