import crypto from "crypto";

const SESSION_COOKIE_NAME =
    "medcity_session";

const SESSION_MAX_AGE =
    60 * 60 * 8;

function getSecret() {
    const secret =
        process.env.AUTH_SESSION_SECRET;

    if (!secret) {
        throw new Error(
            "AUTH_SESSION_SECRET is missing."
        );
    }

    return secret;
}

function toBase64Url(value) {
    return Buffer.from(value)
        .toString("base64url");
}

function fromBase64Url(value) {
    return Buffer.from(
        value,
        "base64url"
    ).toString("utf8");
}

function sign(value) {
    return crypto
        .createHmac(
            "sha256",
            getSecret()
        )
        .update(value)
        .digest("base64url");
}

export function createSessionToken(
    user
) {
    const payload = {
        uid:
            user?.uid ?? null,

        email:
            String(
                user?.email ?? ""
            )
                .trim()
                .toLowerCase(),

        name:
            user?.name ?? "",

        createdAt:
            Date.now(),
    };

    const encodedPayload =
        toBase64Url(
            JSON.stringify(
                payload
            )
        );

    const signature =
        sign(encodedPayload);

    return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(
    token
) {
    try {
        if (!token) {
            return null;
        }

        const [
            encodedPayload,
            providedSignature,
        ] = token.split(".");

        if (
            !encodedPayload ||
            !providedSignature
        ) {
            return null;
        }

        const expectedSignature =
            sign(encodedPayload);

        const expectedBuffer =
            Buffer.from(
                expectedSignature
            );

        const providedBuffer =
            Buffer.from(
                providedSignature
            );

        if (
            expectedBuffer.length !==
            providedBuffer.length
        ) {
            return null;
        }

        const valid =
            crypto.timingSafeEqual(
                expectedBuffer,
                providedBuffer
            );

        if (!valid) {
            return null;
        }

        const payload =
            JSON.parse(
                fromBase64Url(
                    encodedPayload
                )
            );

        if (
            !payload?.uid ||
            !payload?.email
        ) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}

export {
    SESSION_COOKIE_NAME,
    SESSION_MAX_AGE,
};