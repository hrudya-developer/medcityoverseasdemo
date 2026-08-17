"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  createPortal,
} from "react-dom";

import { X } from "lucide-react";

const VideoModal = ({
  video,
  onClose,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    const bodyOverflow =
      document.body.style.overflow;

    const htmlOverflow =
      document.documentElement.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement.style.overflow =
      "hidden";

    const player =
      videoRef.current;

    if (player) {
      /*
       * Start muted.
       */
      player.muted = true;
      player.defaultMuted = true;
      player.currentTime = 0;

      /*
       * Playback happens only after
       * VideoCard was clicked and this
       * modal was opened.
       */
      player.play().catch(
        (playError) => {
          console.warn(
            "Playback requires another user interaction:",
            playError
          );
        }
      );
    }

    const handleEscape = (
      event
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      if (player) {
        player.pause();
        player.currentTime = 0;
      }

      document.body.style.overflow =
        bodyOverflow;

      document.documentElement.style.overflow =
        htmlOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose, video]);

  if (
    !video ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${
        video.title || "Selected"
      } video player`}
      className="fixed inset-0 z-[2147483647] flex h-[100dvh] w-screen items-center justify-center bg-black"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="fixed right-4 top-4 z-[2147483647] flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white shadow-xl backdrop-blur-md transition hover:rotate-90 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
      >
        <X
          size={24}
          aria-hidden="true"
        />
      </button>

      <video
        ref={videoRef}
        key={video.videoUrl}
        src={video.videoUrl}
        poster={video.poster}
        controls
        muted
        playsInline
        preload="metadata"
        controlsList="nodownload"
        className="h-full max-h-[100dvh] w-full max-w-[560px] bg-black object-contain"
        onLoadedMetadata={(
          event
        ) => {
          const player =
            event.currentTarget;

          player.muted = true;
          player.defaultMuted = true;
        }}
        onError={(event) => {
          console.error(
            "Video playback failed:",
            video.videoUrl,
            event.currentTarget.error
          );
        }}
      >
        Your browser does not support video playback.
      </video>
    </div>,
    document.body
  );
};

export default VideoModal;