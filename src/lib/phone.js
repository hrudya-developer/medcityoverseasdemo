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
 * any number with 8 to 15 digits once spaces, brackets, dashes, dots,
 * a leading "+" and a leading "00" are removed. Only a 12-digit number
 * starting 91 (India with its country code) must look like a real
 * Indian number, which accepts landlines but still rejects "+91 12345".
 */
export function isPlausiblePhone(value) {
    const compact = String(value ?? "").trim().replace(/[\s().-]/g, "");
    const digits = compact.replace(/^\+/, "").replace(/^00/, "");

    if (!/^\d{8,15}$/.test(digits)) {
        return false;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
        return /^91[1-9]\d{9}$/.test(digits);
    }

    return true;
}
