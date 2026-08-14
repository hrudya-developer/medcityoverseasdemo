import {
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";


const GET_WISHLIST_URL =
  "https://overseas.technocitysolutions.com/public/api/getPrefereList";


export async function POST() {
  try {
      /*
      |--------------------------------------------------------------------------
      | AUTH SESSION
      |--------------------------------------------------------------------------
      */

      const cookieStore =
          await cookies();

      const token =
          cookieStore.get(
              SESSION_COOKIE_NAME
          )?.value;

      if (!token) {
          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Please login to view your wishlist.",
                  data: [],
                  count: 0,
              },
              {
                  status: 401,
              }
          );
      }


      const session =
          verifySessionToken(
              token
          );

      const uid =
          session?.uid ??
          session?.id ??
          null;

      if (!uid) {
          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Your login session is invalid.",
                  data: [],
                  count: 0,
              },
              {
                  status: 401,
              }
          );
      }


      /*
      |--------------------------------------------------------------------------
      | API KEY
      |--------------------------------------------------------------------------
      */

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
                      "Server configuration error.",
                  data: [],
                  count: 0,
              },
              {
                  status: 500,
              }
          );
      }


      /*
      |--------------------------------------------------------------------------
      | EXTERNAL REQUEST
      |--------------------------------------------------------------------------
      */

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


      console.log(
          "GET WISHLIST REQUEST:",
          {
              uid:
                  String(uid),
          }
      );


      const response =
          await fetch(
              GET_WISHLIST_URL,
              {
                  method:
                      "POST",

                  body:
                      formData,

                  cache:
                      "no-store",
              }
          );


      /*
      |--------------------------------------------------------------------------
      | RAW RESPONSE
      |--------------------------------------------------------------------------
      */

      const raw =
          await response.text();


      console.log(
          "GET WISHLIST RAW:",
          raw
      );


      let result = {};

      try {
          result =
              raw
                  ? JSON.parse(raw)
                  : {};
      } catch (error) {
          console.error(
              "GET WISHLIST JSON PARSE ERROR:",
              error
          );

          return NextResponse.json(
              {
                  status: false,
                  msg:
                      "Invalid wishlist API response.",
                  data: [],
                  count: 0,
              },
              {
                  status: 502,
              }
          );
      }


      console.log(
          "GET WISHLIST PARSED:",
          result
      );


      /*
      |--------------------------------------------------------------------------
      | HTTP ERROR
      |--------------------------------------------------------------------------
      */

      if (!response.ok) {
          return NextResponse.json(
              {
                  status: false,

                  msg:
                      result?.msg ||
                      result?.message ||
                      "Unable to fetch wishlist.",

                  data: [],
                  count: 0,
              },
              {
                  status:
                      response.status,
              }
          );
      }


      /*
      |--------------------------------------------------------------------------
      | BUSINESS ERROR
      |--------------------------------------------------------------------------
      */

      if (
          result?.status === false ||
          result?.status === 0 ||
          result?.status === "0"
      ) {
          /*
           * Some APIs return status=false
           * when wishlist is simply empty.
           */

          const message =
              String(
                  result?.msg ??
                  result?.message ??
                  ""
              )
                  .trim()
                  .toLowerCase();

          const emptyWishlist =
              message.includes(
                  "no wishlist"
              ) ||
              message.includes(
                  "not found"
              ) ||
              message.includes(
                  "no data"
              );


          if (emptyWishlist) {
              return NextResponse.json(
                  {
                      status: true,

                      msg:
                          result?.msg ||
                          result?.message ||
                          "No wishlisted courses found.",

                      data: [],
                      count: 0,

                      imagePath:
                          result?.course_image_path ??
                          "",
                  },
                  {
                      status: 200,
                  }
              );
          }


          return NextResponse.json(
              {
                  status: false,

                  msg:
                      result?.msg ||
                      result?.message ||
                      "Unable to fetch wishlist.",

                  data: [],
                  count: 0,
              },
              {
                  status: 400,
              }
          );
      }


      /*
      |--------------------------------------------------------------------------
      | NORMALIZE RESPONSE
      |--------------------------------------------------------------------------
      |
      | External API:
      |
      | {
      |   course_image_path: "...",
      |   course: [...]
      | }
      |
      */

      const courses =
          Array.isArray(
              result?.course
          )
              ? result.course
              : Array.isArray(
                  result?.data
              )
              ? result.data
              : [];


      console.log(
          "WISHLIST COURSES:",
          courses
      );


      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      return NextResponse.json(
          {
              status: true,

              msg:
                  result?.msg ||
                  result?.message ||
                  "Wishlist loaded successfully.",

              count:
                  courses.length,

              data:
                  courses,

              imagePath:
                  result?.course_image_path ??
                  "",
          },
          {
              status: 200,
          }
      );

  } catch (error) {
      console.error(
          "GET WISHLIST ERROR:",
          error
      );


      return NextResponse.json(
          {
              status: false,

              msg:
                  error instanceof Error
                      ? error.message
                      : "Internal server error.",

              data: [],
              count: 0,
          },
          {
              status: 500,
          }
      );
  }
}