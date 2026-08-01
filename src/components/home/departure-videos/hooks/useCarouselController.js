"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    AUTOPLAY_DELAY,
    DRAG_THRESHOLD,
    getWrappedIndex,
} from "../utils/videoUtils";

const useCarouselController = (
    videos,
    modalOpen
) => {
    const [activeIndex, setActiveIndex] =
        useState(0);

    const [dragOffset, setDragOffset] =
        useState(0);

    const dragStartXRef = useRef(0);
    const dragOffsetRef = useRef(0);
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);
    const autoplayRef = useRef(null);

    const total = videos.length;

    const stopAutoplay = useCallback(() => {
        if (!autoplayRef.current) return;

        window.clearInterval(
            autoplayRef.current
        );

        autoplayRef.current = null;
    }, []);

    const startAutoplay = useCallback(() => {
        stopAutoplay();

        if (
            total <= 1 ||
            modalOpen ||
            document.hidden
        ) {
            return;
        }

        autoplayRef.current =
            window.setInterval(() => {
                setActiveIndex((current) =>
                    getWrappedIndex(
                        current + 1,
                        total
                    )
                );
            }, AUTOPLAY_DELAY);
    }, [
        modalOpen,
        stopAutoplay,
        total,
    ]);

    useEffect(() => {
        setActiveIndex(0);
        setDragOffset(0);

        dragOffsetRef.current = 0;
        isDraggingRef.current = false;
        hasDraggedRef.current = false;
    }, [videos]);

    useEffect(() => {
        startAutoplay();

        return stopAutoplay;
    }, [
        startAutoplay,
        stopAutoplay,
    ]);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        };

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
        };
    }, [
        startAutoplay,
        stopAutoplay,
    ]);

    const goToIndex = useCallback(
        (index) => {
            if (!total) return;

            setActiveIndex(
                getWrappedIndex(
                    index,
                    total
                )
            );

            setDragOffset(0);
            dragOffsetRef.current = 0;

            startAutoplay();
        },
        [
            startAutoplay,
            total,
        ]
    );

    const goToPrevious = useCallback(() => {
        if (!total) return;

        setActiveIndex((current) =>
            getWrappedIndex(
                current - 1,
                total
            )
        );

        startAutoplay();
    }, [
        startAutoplay,
        total,
    ]);

    const goToNext = useCallback(() => {
        if (!total) return;

        setActiveIndex((current) =>
            getWrappedIndex(
                current + 1,
                total
            )
        );

        startAutoplay();
    }, [
        startAutoplay,
        total,
    ]);

    const handleDragStart = useCallback(
        (clientX) => {
            if (total <= 1) return;

            isDraggingRef.current = true;
            hasDraggedRef.current = false;

            dragStartXRef.current =
                clientX;

            dragOffsetRef.current = 0;
            setDragOffset(0);

            stopAutoplay();
        },
        [
            stopAutoplay,
            total,
        ]
    );

    const handleDragMove = useCallback(
        (clientX) => {
            if (
                !isDraggingRef.current
            ) {
                return;
            }

            const offset =
                clientX -
                dragStartXRef.current;

            if (Math.abs(offset) > 6) {
                hasDraggedRef.current =
                    true;
            }

            dragOffsetRef.current =
                offset;

            setDragOffset(offset);
        },
        []
    );

    const handleDragEnd = useCallback(() => {
        if (
            !isDraggingRef.current
        ) {
            return;
        }

        const offset =
            dragOffsetRef.current;

        if (offset > DRAG_THRESHOLD) {
            setActiveIndex((current) =>
                getWrappedIndex(
                    current - 1,
                    total
                )
            );
        } else if (
            offset < -DRAG_THRESHOLD
        ) {
            setActiveIndex((current) =>
                getWrappedIndex(
                    current + 1,
                    total
                )
            );
        }

        isDraggingRef.current = false;
        dragOffsetRef.current = 0;
        setDragOffset(0);

        window.setTimeout(() => {
            hasDraggedRef.current =
                false;
        }, 120);

        startAutoplay();
    }, [
        startAutoplay,
        total,
    ]);

    const visibleCards = useMemo(() => {
        if (!total) return [];

        if (total === 1) {
            return [
                {
                    position: "center",
                    videoIndex: 0,
                    video: videos[0],
                },
            ];
        }

        return [
            {
                position: "left",
                videoIndex:
                    getWrappedIndex(
                        activeIndex - 1,
                        total
                    ),
            },
            {
                position: "center",
                videoIndex:
                    getWrappedIndex(
                        activeIndex,
                        total
                    ),
            },
            {
                position: "right",
                videoIndex:
                    getWrappedIndex(
                        activeIndex + 1,
                        total
                    ),
            },
        ].map((item) => ({
            ...item,
            video:
                videos[item.videoIndex],
        }));
    }, [
        activeIndex,
        total,
        videos,
    ]);

    return {
        activeIndex,
        dragOffset,
        dragOffsetRef,
        isDraggingRef,
        hasDraggedRef,
        visibleCards,
        goToIndex,
        goToPrevious,
        goToNext,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        startAutoplay,
        stopAutoplay,
    };
};

export default useCarouselController;