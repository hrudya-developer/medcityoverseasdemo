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
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        reloadKey,
        setReloadKey,
    ] = useState(0);

    useEffect(() => {
        if (!countryId) {
            setUniversities([]);
            setUniversityImagePath("");
            setNextOffset(null);
            setLoading(false);
            setError("");

            return;
        }

        const controller =
            new AbortController();

        const loadUniversities =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const params =
                        new URLSearchParams({
                            countryId:
                                String(
                                    countryId
                                ),
                            uid:
                                String(uid),
                            offset:
                                String(offset),
                            keyword,
                        });

                    const response =
                        await fetch(
                            `/api/search/universities?${params.toString()}`,
                            {
                                method: "GET",
                                cache: "no-store",
                                signal:
                                    controller.signal,
                                headers: {
                                    Accept:
                                        "application/json",
                                },
                            }
                        );

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result?.message ||
                            "Unable to load universities."
                        );
                    }

                    setUniversities(
                        Array.isArray(
                            result?.universities
                        )
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
                } catch (error) {
                    if (
                        error?.name ===
                        "AbortError"
                    ) {
                        return;
                    }

                    console.error(
                        "University loading error:",
                        error
                    );

                    setUniversities([]);
                    setUniversityImagePath("");
                    setNextOffset(null);

                    setError(
                        error?.message ||
                        "Unable to load universities."
                    );
                } finally {
                    if (
                        !controller.signal
                            .aborted
                    ) {
                        setLoading(false);
                    }
                }
            };

        loadUniversities();

        return () => {
            controller.abort();
        };
    }, [
        countryId,
        uid,
        offset,
        keyword,
        reloadKey,
    ]);

    const refetch = useCallback(() => {
        setReloadKey(
            (current) =>
                current + 1
        );
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