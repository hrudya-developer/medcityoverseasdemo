import "server-only";

/* =========================================================
   ENVIRONMENT
========================================================= */

const API_BASE_URL =
    process.env
        .OVERSEAS_API_BASE_URL;

const API_KEY =
    process.env
        .OVERSEAS_API_KEY;

/* =========================================================
   API CONFIGURATION
========================================================= */

function getApiConfiguration() {
    if (
        !API_BASE_URL ||
        !API_KEY
    ) {
        throw new Error(
            "Overseas API environment variables are missing."
        );
    }

    return {
        apiBaseUrl:
            String(
                API_BASE_URL
            )
                .trim()
                .replace(
                    /\/+$/,
                    ""
                ),

        apiKey:
            String(
                API_KEY
            ).trim(),
    };
}

/* =========================================================
   ENDPOINT URL
========================================================= */

function getEndpointUrl(
    apiBaseUrl,
    endpoint
) {
    const cleanEndpoint =
        String(
            endpoint ?? ""
        )
            .trim()
            .replace(
                /^\/+/,
                ""
            );

    if (
        !cleanEndpoint
    ) {
        throw new Error(
            "Overseas API endpoint is required."
        );
    }

    return `${apiBaseUrl}/${cleanEndpoint}`;
}

/* =========================================================
   SAFE RESPONSE PREVIEW

   Prevent huge HTML error pages from filling console.
========================================================= */

function createResponsePreview(
    value,
    maxLength = 300
) {
    return String(
        value ?? ""
    )
        .replace(
            /\s+/g,
            " "
        )
        .trim()
        .slice(
            0,
            maxLength
        );
}

/* =========================================================
   TRY PARSE JSON

   Returns null instead of throwing.
========================================================= */

function tryParseJson(
    value
) {
    if (
        !value ||
        !String(
            value
        ).trim()
    ) {
        return {};
    }

    try {
        return JSON.parse(
            value
        );
    } catch {
        return null;
    }
}

/* =========================================================
   GET API ERROR MESSAGE
========================================================= */

function getApiErrorMessage(
    result,
    status
) {
    return (
        result?.message ||
        result?.msg ||
        result?.error ||
        result?.errors?.message ||
        `External API request failed with status ${status}.`
    );
}

/* =========================================================
   RESPONSE PARSER

   IMPORTANT:
   Check HTTP status BEFORE assuming the response is JSON.

   External API may return HTML for:
   - 429 Too Many Requests
   - 500 errors
   - server/proxy errors
========================================================= */

async function parseApiResponse(
    response
) {
    const responseText =
        await response.text();

    const parsed =
        tryParseJson(
            responseText
        );

    /* =====================================================
       RATE LIMIT
    ===================================================== */

    if (
        response.status ===
        429
    ) {
        const retryAfter =
            response.headers.get(
                "retry-after"
            );

        const retryMessage =
            retryAfter
                ? ` Please try again after ${retryAfter} seconds.`
                : " Please wait a moment and try again.";

        const error =
            new Error(
                `Overseas API rate limit reached.${retryMessage}`
            );

        error.status =
            429;

        error.code =
            "OVERSEAS_API_RATE_LIMIT";

        error.retryAfter =
            retryAfter;

        throw error;
    }

    /* =====================================================
       NON-SUCCESS RESPONSE
    ===================================================== */

    if (
        !response.ok
    ) {
        const message =
            parsed
                ? getApiErrorMessage(
                      parsed,
                      response.status
                  )
                : `External API request failed with status ${response.status}.`;

        if (
            !parsed &&
            responseText
        ) {
            console.error(
                "External API non-JSON error response:",
                {
                    status:
                        response.status,

                    statusText:
                        response.statusText,

                    response:
                        createResponsePreview(
                            responseText
                        ),
                }
            );
        }

        const error =
            new Error(
                message
            );

        error.status =
            response.status;

        error.code =
            "OVERSEAS_API_HTTP_ERROR";

        throw error;
    }

    /* =====================================================
       SUCCESS BUT EMPTY BODY
    ===================================================== */

    if (
        !responseText ||
        !responseText.trim()
    ) {
        return {};
    }

    /* =====================================================
       SUCCESS + JSON
    ===================================================== */

    if (
        parsed !== null
    ) {
        return parsed;
    }

    /* =====================================================
       SUCCESS STATUS BUT INVALID JSON

       This usually means proxy/server HTML was returned
       unexpectedly.
    ===================================================== */

    console.error(
        "Invalid Overseas API response:",
        {
            status:
                response.status,

            contentType:
                response.headers.get(
                    "content-type"
                ),

            response:
                createResponsePreview(
                    responseText
                ),
        }
    );

    const error =
        new Error(
            "The external API returned an unexpected non-JSON response."
        );

    error.status =
        response.status;

    error.code =
        "OVERSEAS_API_INVALID_JSON";

    throw error;
}

/* =========================================================
   FETCH OPTIONS

   PUBLIC / CACHEABLE:

   {
       next: {
           revalidate: 3600
       }
   }

   PRIVATE / USER-SPECIFIC:

   {
       cache: "no-store"
   }

   DEFAULT:
   no-store
========================================================= */

function buildFetchOptions({
    method = "POST",
    headers,
    body,
    options = {},
}) {
    const {
        cache,
        next,
        ...otherOptions
    } =
        options ?? {};

    const fetchOptions = {
        method,
        ...otherOptions,
    };

    if (
        headers
    ) {
        fetchOptions.headers =
            headers;
    }

    if (
        body !== undefined &&
        body !== null
    ) {
        fetchOptions.body =
            body;
    }

    /* =====================================================
       ISR / NEXT DATA CACHE

       If revalidate is provided, do NOT attach no-store.
    ===================================================== */

    const hasRevalidate =
        next &&
        Object.prototype
            .hasOwnProperty
            .call(
                next,
                "revalidate"
            );

    if (
        hasRevalidate
    ) {
        fetchOptions.next =
            next;

        return fetchOptions;
    }

    /* =====================================================
       EXPLICIT CACHE
    ===================================================== */

    if (
        cache !== undefined
    ) {
        fetchOptions.cache =
            cache;

        if (
            next
        ) {
            fetchOptions.next =
                next;
        }

        return fetchOptions;
    }

    /* =====================================================
       NEXT OPTIONS WITHOUT REVALIDATE
    ===================================================== */

    if (
        next
    ) {
        fetchOptions.next =
            next;
    }

    /* =====================================================
       SAFE DEFAULT

       User-specific API calls should not accidentally cache.
    ===================================================== */

    fetchOptions.cache =
        "no-store";

    return fetchOptions;
}

/* =========================================================
   EXECUTE REQUEST

   Shared request handling so JSON/Form helpers behave
   consistently.
========================================================= */

async function executeRequest(
    url,
    fetchOptions
) {
    let response;

    try {
        response =
            await fetch(
                url,
                fetchOptions
            );
    } catch (
        error
    ) {
        const networkError =
            new Error(
                error?.message ||
                "Unable to connect to the Overseas API."
            );

        networkError.code =
            "OVERSEAS_API_NETWORK_ERROR";

        throw networkError;
    }

    return parseApiResponse(
        response
    );
}

/* =========================================================
   POST JSON
========================================================= */

export async function postOverseasJson(
    endpoint,
    payload = {},
    options = {}
) {
    const {
        apiBaseUrl,
        apiKey,
    } =
        getApiConfiguration();

    const url =
        getEndpointUrl(
            apiBaseUrl,
            endpoint
        );

    const fetchOptions =
        buildFetchOptions({
            method:
                "POST",

            headers: {
                "Content-Type":
                    "application/json",

                Accept:
                    "application/json",
            },

            body:
                JSON.stringify({
                    api:
                        apiKey,

                    ...payload,
                }),

            options,
        });

    return executeRequest(
        url,
        fetchOptions
    );
}

/* =========================================================
   POST FORM DATA
========================================================= */

export async function postOverseasForm(
    endpoint,
    values = {},
    options = {}
) {
    const {
        apiBaseUrl,
        apiKey,
    } =
        getApiConfiguration();

    const url =
        getEndpointUrl(
            apiBaseUrl,
            endpoint
        );

    const formData =
        new FormData();

    formData.append(
        "api",
        apiKey
    );

    Object.entries(
        values ?? {}
    ).forEach(
        ([
            key,
            value,
        ]) => {
            if (
                value ===
                    undefined ||
                value ===
                    null
            ) {
                return;
            }

            /* =================================================
               ARRAY VALUES
            ================================================= */

            if (
                Array.isArray(
                    value
                )
            ) {
                value.forEach(
                    (
                        item
                    ) => {
                        formData.append(
                            key,
                            String(
                                item ??
                                    ""
                            )
                        );
                    }
                );

                return;
            }

            /* =================================================
               NORMAL VALUE
            ================================================= */

            formData.append(
                key,
                String(
                    value
                )
            );
        }
    );

    const fetchOptions =
        buildFetchOptions({
            method:
                "POST",

            /*
             * Do NOT manually set Content-Type for FormData.
             *
             * fetch automatically adds the required
             * multipart boundary.
             */
            body:
                formData,

            options,
        });

    return executeRequest(
        url,
        fetchOptions
    );
}