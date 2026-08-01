"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    formatVideos,
} from "../utils/videoUtils";

const useDepartureVideos = () => {
    const [videos, setVideos] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const controller =
            new AbortController();

        const loadVideos = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "/api/departure-videos",
                    {
                        method: "GET",
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result?.message ||
                        "Unable to load departure videos."
                    );
                }

                setVideos(
                    formatVideos(result)
                );
            } catch (error) {
                if (
                    error?.name ===
                    "AbortError"
                ) {
                    return;
                }

                console.error(
                    "Departure video error:",
                    error
                );

                setError(
                    error?.message ||
                    "Unable to load departure videos."
                );
            } finally {
                if (
                    !controller.signal.aborted
                ) {
                    setLoading(false);
                }
            }
        };

        loadVideos();

        return () => {
            controller.abort();
        };
    }, []);

    return {
        videos,
        loading,
        error,
    };
};

export default useDepartureVideos;