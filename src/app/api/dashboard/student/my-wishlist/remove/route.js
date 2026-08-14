import {
    NextResponse,
  } from "next/server";
  
  export async function POST(request) {
    try {
      const body =
        await request.json();
  
      const uid =
        body?.uid;
  
      const id =
        body?.id;
  
      if (!uid) {
        return NextResponse.json(
          {
            status: false,
            msg: "Student ID is required.",
          },
          {
            status: 400,
          }
        );
      }
  
      if (!id) {
        return NextResponse.json(
          {
            status: false,
            msg: "Course ID is required.",
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
        return NextResponse.json(
          {
            status: false,
            msg: "Server configuration error.",
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
        "uid",
        String(uid)
      );
  
      formData.append(
        "id",
        String(id)
      );
  
      formData.append(
        "type",
        "course"
      );
  
      console.log(
        "REMOVE WISHLIST REQUEST:",
        {
          uid: String(uid),
          id: String(id),
          type: "course",
        }
      );
  
      const response =
        await fetch(
          "https://overseas.technocitysolutions.com/public/api/removePreferlist",
          {
            method: "POST",
            body: formData,
            cache: "no-store",
          }
        );
  
      const raw =
        await response.text();
  
      console.log(
        "REMOVE WISHLIST RAW:",
        raw
      );
  
      let result = {};
  
      try {
        result =
          raw
            ? JSON.parse(raw)
            : {};
      } catch {
        return NextResponse.json(
          {
            status: false,
            msg: "Invalid wishlist API response.",
          },
          {
            status: 502,
          }
        );
      }
  
      if (
        !response.ok ||
        result?.status === false
      ) {
        return NextResponse.json(
          {
            status: false,
  
            msg:
              result?.msg ||
              result?.message ||
              "Unable to remove course.",
          },
          {
            status:
              response.ok
                ? 400
                : response.status,
          }
        );
      }
  
      return NextResponse.json({
        status: true,
  
        msg:
          result?.msg ||
          result?.message ||
          "Course removed from wishlist.",
      });
    } catch (error) {
      console.error(
        "REMOVE WISHLIST ERROR:",
        error
      );
  
      return NextResponse.json(
        {
          status: false,
  
          msg:
            error instanceof Error
              ? error.message
              : "Internal server error.",
        },
        {
          status: 500,
        }
      );
    }
  }