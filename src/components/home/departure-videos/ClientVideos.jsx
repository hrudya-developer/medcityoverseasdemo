"use client";

import {
    useCallback,
    useState,
} from "react";

import VideoCarousel from "./VideoCarousel";
import VideoModal from "./VideoModal";
import RecentDepartureVideos from "./RecentDepartureVideos";

import {
    EmptyState,
    ErrorState,
    LoadingState,
} from "./VideoState";

import useCarouselController from "./hooks/useCarouselController";
import useDepartureVideos from "./hooks/useDepartureVideos";

import { FALLBACK } from "./utils/videoUtils";

const ClientVideos = ({
    showRecentVideos = true,
}) => {
    const {
        videos,
        loading,
        error,
    } = useDepartureVideos();

    const [
        selectedVideo,
        setSelectedVideo,
    ] = useState(null);

    const controller =
        useCarouselController(
            videos,
            Boolean(selectedVideo)
        );

    const {
        hasDraggedRef,
        stopAutoplay,
    } = controller;

    const openVideo = useCallback(
        (video) => {
            if (!video?.videoUrl) {
                console.error(
                    "Missing video URL:",
                    video
                );

                return;
            }

            /*
             * Prevent opening only when the pointer
             * interaction was an actual carousel drag.
             */
            if (hasDraggedRef.current) {
                hasDraggedRef.current = false;
                return;
            }

            stopAutoplay();
            setSelectedVideo(video);
        },
        [
            hasDraggedRef,
            stopAutoplay,
        ]
    );

    const closeVideo = useCallback(() => {
        setSelectedVideo(null);
    }, []);

    const handleImageError = useCallback(
        (event, placeholder) => {
            const image =
                event.currentTarget;

            const fallbackState =
                image.dataset.fallback;

            if (
                placeholder &&
                image.src !== placeholder &&
                fallbackState !==
                "placeholder"
            ) {
                image.dataset.fallback =
                    "placeholder";

                image.src = placeholder;
                return;
            }

            if (
                fallbackState !== "final"
            ) {
                image.dataset.fallback =
                    "final";

                image.src = FALLBACK;
            }
        },
        []
    );

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <ErrorState message={error} />
        );
    }

    if (!videos.length) {
        return <EmptyState />;
    }

    return (
        <>
            {showRecentVideos && (
                <RecentDepartureVideos
                    videos={videos}
                    onOpen={openVideo}
                    onImageError={
                        handleImageError
                    }
                />
            )}

            <VideoCarousel
                videos={videos}
                controller={controller}
                onOpen={openVideo}
                onImageError={
                    handleImageError
                }
            />

            <VideoModal
                video={selectedVideo}
                onClose={closeVideo}
            />
        </>
    );
};

export default ClientVideos;