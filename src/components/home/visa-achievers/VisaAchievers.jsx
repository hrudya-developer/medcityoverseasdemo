"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import VisaAchieversBackground from "./VisaAchieversBackground";
import VisaAchieversHeader from "./VisaAchieversHeader";
import VisaAchieversLoading from "./VisaAchieversLoading";
import VisaCarousel from "./VisaCarousel";

import {
    AUTO_PLAY_DELAY,
} from "./visaAchieversUtils";

export default function VisaAchievers() {
    const [
        achievers,
        setAchievers,
    ] = useState([]);

    const [
        imagePath,
        setImagePath,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        currentIndex,
        setCurrentIndex,
    ] = useState(0);

    const [
        isPaused,
        setIsPaused,
    ] = useState(false);

    const [
        itemsPerView,
        setItemsPerView,
    ] = useState(4);

    /* Fetch */
    useEffect(() => {
        const loadVisaAchievers =
            async () => {
                try {
                    const response =
                        await fetch(
                            "/api/visa-achievers"
                        );

                    const data =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            data?.message ||
                                "Unable to load visa achievers."
                        );
                    }

                    setAchievers(
                        Array.isArray(
                            data?.achievers
                        )
                            ? data.achievers
                            : []
                    );

                    setImagePath(
                        data?.imagePath ||
                            ""
                    );
                } catch (error) {
                    console.error(
                        "Visa achievers fetch error:",
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadVisaAchievers();
    }, []);

    /* Responsive */
    useEffect(() => {
        const updateItems =
            () => {
                const width =
                    window.innerWidth;

                if (width < 640) {
                    setItemsPerView(1);
                } else if (
                    width < 1024
                ) {
                    setItemsPerView(2);
                } else if (
                    width < 1280
                ) {
                    setItemsPerView(3);
                } else {
                    setItemsPerView(4);
                }
            };

        updateItems();

        window.addEventListener(
            "resize",
            updateItems
        );

        return () =>
            window.removeEventListener(
                "resize",
                updateItems
            );
    }, []);

    const maxIndex =
        useMemo(
            () =>
                Math.max(
                    achievers.length -
                        itemsPerView,
                    0
                ),
            [
                achievers.length,
                itemsPerView,
            ]
        );

    /* Autoplay */
    useEffect(() => {
        if (
            achievers.length <=
                itemsPerView ||
            isPaused
        ) {
            return;
        }

        const timer =
            setInterval(() => {
                setCurrentIndex(
                    (prev) =>
                        prev >=
                        maxIndex
                            ? 0
                            : prev +
                              1
                );
            }, AUTO_PLAY_DELAY);

        return () =>
            clearInterval(timer);
    }, [
        achievers.length,
        itemsPerView,
        isPaused,
        maxIndex,
    ]);

    useEffect(() => {
        if (
            currentIndex >
            maxIndex
        ) {
            setCurrentIndex(
                maxIndex
            );
        }
    }, [
        currentIndex,
        maxIndex,
    ]);

    const handlePrevious =
        () => {
            setCurrentIndex(
                (prev) =>
                    prev <= 0
                        ? maxIndex
                        : prev - 1
            );
        };

    const handleNext =
        () => {
            setCurrentIndex(
                (prev) =>
                    prev >= maxIndex
                        ? 0
                        : prev + 1
            );
        };

    if (loading) {
        return (
            <VisaAchieversLoading />
        );
    }

    if (!achievers.length) {
        return null;
    }

    return (
        <section
            aria-labelledby="visa-achievers-heading"
            className="
                relative
                isolate
                overflow-hidden
                py-16
                text-white
                sm:py-20
                lg:py-24
            "
        >
            <VisaAchieversBackground />

            <div
                className="
                    relative
                    mx-auto
                    max-w-[1500px]
                    px-5
                    sm:px-8
                    lg:px-10
                "
            >
                <VisaAchieversHeader />

                <VisaCarousel
                    achievers={
                        achievers
                    }
                    imagePath={
                        imagePath
                    }
                    itemsPerView={
                        itemsPerView
                    }
                    currentIndex={
                        currentIndex
                    }
                    maxIndex={
                        maxIndex
                    }
                    setCurrentIndex={
                        setCurrentIndex
                    }
                    setIsPaused={
                        setIsPaused
                    }
                    handlePrevious={
                        handlePrevious
                    }
                    handleNext={
                        handleNext
                    }
                />
            </div>
        </section>
    );
}