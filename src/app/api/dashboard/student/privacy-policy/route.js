import { NextResponse } from "next/server";

const PRIVACY_URL =
  "https://technocitysolutions.in/public/overseas/privacypolicy";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(
      PRIVACY_URL,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "text/html",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Privacy policy request failed: ${response.status}`
      );
    }

    let html = await response.text();

    const baseTag = `
      <base
        href="${PRIVACY_URL}"
        target="_blank"
      />
    `;

    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(
        /<head([^>]*)>/i,
        `<head$1>${baseTag}`
      );
    } else {
      html = `${baseTag}${html}`;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type":
          "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Privacy policy fetch error:",
      error
    );

    return new NextResponse(
      `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Privacy Policy</title>
          </head>

          <body style="
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
            color: #475569;
            background: #ffffff;
          ">
            <div style="
              padding: 24px;
              text-align: center;
            ">
              <h2 style="color:#0f172a">
                Unable to load privacy policy
              </h2>

              <p>Please try again later.</p>
            </div>
          </body>
        </html>
      `,
      {
        status: 502,
        headers: {
          "Content-Type":
            "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}