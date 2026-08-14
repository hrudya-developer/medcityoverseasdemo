import {
    NextResponse,
} from "next/server";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function hasValue(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return false;
    }

    const text =
        String(value)
            .trim()
            .toLowerCase();

    return (
        text !== "" &&
        text !== "null" &&
        text !== "undefined"
    );
}


/*
|--------------------------------------------------------------------------
| Recursively find an object
|--------------------------------------------------------------------------
|
| The external API is clearly returning qualification data,
| but it is not on the same object as the personal profile.
|
| Therefore we search the whole response instead of assuming:
|
| result.data[0]
| result.data[1]
| result.profile
|
*/

function findObject(
    value,
    predicate
) {
    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }

    if (
        typeof value !==
        "object"
    ) {
        return null;
    }

    if (
        !Array.isArray(value) &&
        predicate(value)
    ) {
        return value;
    }

    if (Array.isArray(value)) {
        for (
            const item of value
        ) {
            const found =
                findObject(
                    item,
                    predicate
                );

            if (found) {
                return found;
            }
        }

        return null;
    }

    for (
        const child of
        Object.values(value)
    ) {
        const found =
            findObject(
                child,
                predicate
            );

        if (found) {
            return found;
        }
    }

    return null;
}


/*
|--------------------------------------------------------------------------
| Find personal profile
|--------------------------------------------------------------------------
*/

function findPersonalProfile(
    result
) {
    return findObject(
        result,
        (item) => {
            return Boolean(
                hasValue(
                    item?.name
                ) ||
                hasValue(
                    item?.email
                ) ||
                hasValue(
                    item?.mobile
                )
            );
        }
    );
}


/*
|--------------------------------------------------------------------------
| Find qualification profile
|--------------------------------------------------------------------------
*/

function findQualificationProfile(
    result
) {
    return findObject(
        result,
        (item) => {
            return Boolean(
                hasValue(
                    item?.highest
                ) ||
                hasValue(
                    item?.tenth_syllabus
                ) ||
                hasValue(
                    item?.tenth_overall
                ) ||
                hasValue(
                    item?.twelth_stream
                ) ||
                hasValue(
                    item?.degree_stream
                ) ||
                hasValue(
                    item?.pg_stream
                ) ||
                hasValue(
                    item?.ielts_overall
                )
            );
        }
    );
}


/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

export async function POST(
    request
) {
    try {
        const body =
            await request.json();

        const uid =
            body?.uid;

        /*
        |--------------------------------------------------------------------------
        | Validate UID
        |--------------------------------------------------------------------------
        */

        if (!hasValue(uid)) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "User ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | API key
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
                },
                {
                    status: 500,
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | External API
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

        const response =
            await fetch(
                "https://overseas.technocitysolutions.com/public/api/getStudentProfile",
                {
                    method:
                        "POST",

                    body:
                        formData,

                    cache:
                        "no-store",
                }
            );

        const raw =
            await response.text();

        /*
        |--------------------------------------------------------------------------
        | Parse external response
        |--------------------------------------------------------------------------
        */

        let result = null;

        try {
            result =
                raw
                    ? JSON.parse(
                          raw
                      )
                    : null;
        } catch (error) {
            console.error(
                "INVALID PROFILE JSON:",
                raw
            );

            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Invalid profile API response.",
                },
                {
                    status: 502,
                }
            );
        }

        console.log(
            "======================================"
        );

        console.log(
            "RAW GET STUDENT PROFILE RESPONSE:"
        );

        console.dir(
            result,
            {
                depth: null,
            }
        );

        console.log(
            "======================================"
        );

        /*
        |--------------------------------------------------------------------------
        | External HTTP error
        |--------------------------------------------------------------------------
        */

        if (!response.ok) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to fetch profile.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        if (
            result?.status === false
        ) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to fetch profile.",
                },
                {
                    status: 400,
                }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Find both objects
        |--------------------------------------------------------------------------
        */

        const personalProfile =
            findPersonalProfile(
                result
            ) || {};

        const qualificationProfile =
            findQualificationProfile(
                result
            ) || {};

        console.log(
            "PERSONAL PROFILE FOUND:"
        );

        console.dir(
            personalProfile,
            {
                depth: null,
            }
        );

        console.log(
            "QUALIFICATION PROFILE FOUND:"
        );

        console.dir(
            qualificationProfile,
            {
                depth: null,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Merge
        |--------------------------------------------------------------------------
        |
        | Qualification object goes second intentionally.
        |
        | If duplicate properties exist, qualification values win.
        |
        */

        const profile = {
            ...personalProfile,
            ...qualificationProfile,

            /*
             * The external qualification object may not contain uid.
             * Keep authenticated/request UID available to frontend.
             */

            uid:
                personalProfile
                    ?.uid ??
                qualificationProfile
                    ?.uid ??
                String(uid),
        };

        /*
        |--------------------------------------------------------------------------
        | Qualification completion
        |--------------------------------------------------------------------------
        |
        | Do NOT require every possible field.
        |
        | Highest + one academic detail is sufficient to know that
        | qualification has been submitted.
        |
        */

        const hasHighest =
            hasValue(
                profile?.highest
            );

        const hasAcademicData =
            Boolean(
                hasValue(
                    profile
                        ?.tenth_syllabus
                ) ||
                hasValue(
                    profile
                        ?.tenth_overall
                ) ||
                hasValue(
                    profile
                        ?.twelth_stream
                ) ||
                hasValue(
                    profile
                        ?.twelth_overall
                ) ||
                hasValue(
                    profile
                        ?.degree_stream
                ) ||
                hasValue(
                    profile
                        ?.degree_overall
                ) ||
                hasValue(
                    profile
                        ?.pg_stream
                ) ||
                hasValue(
                    profile
                        ?.pg_overall
                ) ||
                hasValue(
                    profile
                        ?.ielts_overall
                )
            );

        const qualificationComplete =
            Boolean(
                hasHighest &&
                hasAcademicData
            );

        /*
        |--------------------------------------------------------------------------
        | Debug
        |--------------------------------------------------------------------------
        */

        console.log(
            "FINAL MERGED PROFILE:"
        );

        console.dir(
            profile,
            {
                depth: null,
            }
        );

        console.log(
            "PROFILE DETAILS:",
            {
                uid:
                    profile?.uid,

                name:
                    profile?.name,

                highest:
                    profile?.highest,

                tenth_syllabus:
                    profile
                        ?.tenth_syllabus,

                tenth_overall:
                    profile
                        ?.tenth_overall,

                twelth_stream:
                    profile
                        ?.twelth_stream,

                twelth_overall:
                    profile
                        ?.twelth_overall,

                twelth_english:
                    profile
                        ?.twelth_english,

                degree_stream:
                    profile
                        ?.degree_stream,

                degree_overall:
                    profile
                        ?.degree_overall,

                degree_english:
                    profile
                        ?.degree_english,

                pg_stream:
                    profile
                        ?.pg_stream,

                pg_overall:
                    profile
                        ?.pg_overall,

                pg_english:
                    profile
                        ?.pg_english,

                ielts_overall:
                    profile
                        ?.ielts_overall,

                ielts_l:
                    profile
                        ?.ielts_l,

                ielts_r:
                    profile
                        ?.ielts_r,

                ielts_w:
                    profile
                        ?.ielts_w,

                ielts_s:
                    profile
                        ?.ielts_s,

                qualificationComplete,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return NextResponse.json(
            {
                status: true,

                qualificationComplete,

                profile,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "PROFILE DETAILS ROUTE FATAL:",
            error
        );

        return NextResponse.json(
            {
                status: false,

                msg:
                    error instanceof
                    Error
                        ? error.message
                        : "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}