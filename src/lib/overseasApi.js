const API_BASE_URL =
    process.env.OVERSEAS_API_BASE_URL;

const API_KEY =
    process.env.OVERSEAS_API_KEY;

export async function postOverseasJson(
    endpoint,
    payload = {}
) {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error(
            "Overseas API environment variables are missing."
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api: API_KEY,
                ...payload,
            }),
            cache: "no-store",
        }
    );

    const text = await response.text();

    let result;

    try {
        result = JSON.parse(text);
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
}

export async function postOverseasForm(
    endpoint,
    values = {}
) {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error(
            "Overseas API environment variables are missing."
        );
    }

    const formData = new FormData();

    formData.append("api", API_KEY);

    Object.entries(values).forEach(
        ([key, value]) => {
            formData.append(
                key,
                String(value ?? "")
            );
        }
    );

    const response = await fetch(
        `${API_BASE_URL}/${endpoint}`,
        {
            method: "POST",
            body: formData,
            cache: "no-store",
        }
    );

    const text = await response.text();

    let result;

    try {
        result = JSON.parse(text);
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
}