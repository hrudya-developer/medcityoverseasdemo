/**
 * Strict check for the counselling form, which asks for a mobile
 * number in international form ("+91 98765 43210", as the phone picker
 * gives it). An Indian number must have the 10 digits of a mobile
 * number, starting 6 to 9; other countries need 8 to 15 digits in all,
 * country code included. Without a country code it must be a 10-digit
 * Indian mobile.
 */
export function isValidMobile(value) {
    const text = String(value ?? "").trim();
    const digits = text.replace(/\D/g, "");

    if (!text.startsWith("+")) {
        return /^[6-9]\d{9}$/.test(digits);
    }

    if (digits.startsWith("91")) {
        return /^91[6-9]\d{9}$/.test(digits);
    }

    return digits.length >= 8 && digits.length <= 15;
}

/**
 * Lenient check for the server, so no genuine enquiry is turned away:
 * every digit in the value counts, whatever separators or labels
 * surround them ("tel:", "Mob:", "/", "_", non-breaking hyphens, two
 * numbers). A leading "00" is dropped. At least 8 digits are needed.
 * Only a 12-digit number starting 91 (India with its country code)
 * must look like a real Indian number, which accepts landlines but
 * still rejects "+91 12345".
 */
export function isPlausiblePhone(value) {
    const digits = String(value ?? "").replace(/\D/g, "").replace(/^00/, "");

    if (digits.length < 8) {
        return false;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
        return /^91[1-9]\d{9}$/.test(digits);
    }

    return true;
}
