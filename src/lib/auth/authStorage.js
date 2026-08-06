// authStorage.js

const AUTH_STORAGE_KEY = "medcity-auth";

export function saveAuthState(authState) {
    if (typeof window === "undefined") {
        return;
    }

    const storage = authState.rememberMe
        ? window.localStorage
        : window.sessionStorage;

    const otherStorage = authState.rememberMe
        ? window.sessionStorage
        : window.localStorage;

    storage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
            email: authState.email,
            rememberMe: authState.rememberMe,
            user: authState.user,
            token: authState.token,
            uid: authState.uid,
            otpRequested: authState.otpRequested,
            isLoggedIn: authState.isLoggedIn,
        }),
    );

    otherStorage.removeItem(AUTH_STORAGE_KEY);
}

export function loadAuthState() {
    if (typeof window === "undefined") {
        return null;
    }

    const localValue = window.localStorage.getItem(
        AUTH_STORAGE_KEY,
    );

    const sessionValue = window.sessionStorage.getItem(
        AUTH_STORAGE_KEY,
    );

    const storedValue = localValue || sessionValue;

    if (!storedValue) {
        return null;
    }

    try {
        return JSON.parse(storedValue);
    } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.sessionStorage.removeItem(AUTH_STORAGE_KEY);

        return null;
    }
}

export function clearAuthState() {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}