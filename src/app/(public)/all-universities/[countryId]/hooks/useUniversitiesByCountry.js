"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

const useUniversitiesByCountry = ({
    countryId,
    uid = 0,
    offset = 0,
    keyword = "alluniversities",
}) => {
    const [
        universities,
        setUniversities,
    ] = useState([]);

    const [
        universityImagePath,
        setUniversityImagePath,
    ] = useState("");

    const [
        nextOffset,
        setNextOffset,
    ] = useState(null);

    const [
        isFetching,
        setIsFetching,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        reloadKey,
        setReloadKey,
    ] = useState(0);

    /*
     * Stores the country whose request has completed.
     * This prevents the empty state from appearing
     * before useEffect starts the next request.
     */
    const [
        resolvedCountryId,
        setResolvedCountryId,
    ] = useState(null);

    const normalizedCountryId = countryId
        ? String(countryId)
        : "";

    const loading =
        Boolean(normalizedCountryId) &&
        (
            isFetching ||
            resolvedCountryId !== normalizedCountryId
        );

    useEffect(() => {
        if (!normalizedCountryId) {
            setUniversities([]);
            setUniversityImagePath("");
            setNextOffset(null);
            setIsFetching(false);
            setError("");
            setResolvedCountryId(null);

            return undefined;
        }

        const controller = new AbortController();

        const loadUniversities = async () => {
            try {
                setIsFetching(true);
                setError("");

                const params = new URLSearchParams({
                    countryId: normalizedCountryId,
                    uid: String(uid),
                    offset: String(offset),
                    keyword,
                });

                const response = await fetch(
                    `/api/search/universities?${params.toString()}`,
                    {
                        method: "GET",
                        cache: "no-store",
                        signal: controller.signal,
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result?.message ||
                        "Unable to load universities."
                    );
                }

                if (controller.signal.aborted) {
                    return;
                }

                setUniversities(
                    Array.isArray(result?.universities)
                        ? result.universities
                        : []
                );

                setUniversityImagePath(
                    result?.universityImagePath ||
                    result?.universities_image_path ||
                    result?.imagePath ||
                    ""
                );

                setNextOffset(
                    result?.nextOffset ??
                    result?.nextoffset ??
                    null
                );

                setResolvedCountryId(
                    normalizedCountryId
                );
            } catch (requestError) {
                if (
                    requestError?.name ===
                    "AbortError"
                ) {
                    return;
                }

                console.error(
                    "University loading error:",
                    requestError
                );

                setUniversities([]);
                setUniversityImagePath("");
                setNextOffset(null);

                setError(
                    requestError?.message ||
                    "Unable to load universities."
                );

                /*
                 * Mark this country as resolved so the
                 * error state can display instead of
                 * keeping the loading skeleton forever.
                 */
                setResolvedCountryId(
                    normalizedCountryId
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsFetching(false);
                }
            }
        };

        loadUniversities();

        return () => {
            controller.abort();
        };
    }, [
        normalizedCountryId,
        uid,
        offset,
        keyword,
        reloadKey,
    ]);

    const refetch = useCallback(() => {
        /*
         * Immediately switch to the loading state
         * before the retry request begins.
         */
        setResolvedCountryId(null);
        setReloadKey((current) => current + 1);
    }, []);

    return {
        universities,
        universityImagePath,
        nextOffset,
        loading,
        error,
        refetch,
    };
};

export default useUniversitiesByCountry;