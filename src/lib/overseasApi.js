import "server-only";

const API_BASE_URL =
    process.env.OVERSEAS_API_BASE_URL;

const API_KEY =
    process.env.OVERSEAS_API_KEY;

const getApiConfiguration = () => {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error(
            "Overseas API environment variables are missing."
        );
    }

    return {
        apiBaseUrl: API_BASE_URL.replace(
            /\/+$/,
            ""
        ),
        apiKey: API_KEY,
    };
};

const parseApiResponse = async (
    response
) => {
    const responseText =
        await response.text();

    let result;

    try {
        result = responseText
            ? JSON.parse(responseText)
            : {};
    } catch {
        throw new Error(
            "The external API returned invalid JSON."
        );
    }

    if (!response.ok) {
        throw new Error(
            result?.message ||
            `External API error: ${response.status}`
        );
    }

    return result;
};

export async function postOverseasJson(
    endpoint,
    payload = {},
    options = {}
) {
    const {
        apiBaseUrl,
        apiKey,
    } = getApiConfiguration();

    const cleanEndpoint = String(
        endpoint
    ).replace(/^\/+/, "");

    const response = await fetch(
        `${apiBaseUrl}/${cleanEndpoint}`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
                Accept: "application/json",
            },

            body: JSON.stringify({
                api: apiKey,
                ...payload,
            }),

            cache: "no-store",

            ...options,
        }
    );

    return parseApiResponse(response);
}

export async function postOverseasForm(
    endpoint,
    values = {},
    options = {}
) {
    const {
        apiBaseUrl,
        apiKey,
    } = getApiConfiguration();

    const cleanEndpoint = String(
        endpoint
    ).replace(/^\/+/, "");

    const formData = new FormData();

    formData.append("api", apiKey);

    Object.entries(values).forEach(
        ([key, value]) => {
            if (
                value === undefined ||
                value === null
            ) {
                return;
            }

            formData.append(
                key,
                String(value)
            );
        }
    );

    const response = await fetch(
        `${apiBaseUrl}/${cleanEndpoint}`,
        {
            method: "POST",
            body: formData,
            cache: "no-store",
            ...options,
        }
    );

    return parseApiResponse(response);
}