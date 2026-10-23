import { NextResponse } from "next/server";

import { getTestimonials } from "@/lib/testimonials";

export async function GET() {
    try {
        const testimonials =
            await getTestimonials();

        return NextResponse.json(
            {
                success: true,
                testimonials,
            },
            {
                status: 200,
                headers: {
                    "Cache-Control":
                        "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error(
            "Testimonials route error:",
            error instanceof Error
                ? error.message
                : error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to load testimonials.",
                testimonials: [],
            },
            {
                status: 500,
            }
        );
    }
}
