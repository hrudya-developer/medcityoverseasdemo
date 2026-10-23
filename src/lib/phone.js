/**
 * Checks a mobile number. With a country code ("+91 98765 43210", as
 * the phone picker gives it) an Indian number must have the 10 digits
 * of a mobile number, starting 6 to 9, and other countries need 8 to
 * 15 digits in all. Without one it must be a 10-digit Indian mobile.
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
