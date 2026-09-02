"use client";

const DESKTOP_VIDEO =
    "/videos/study-abroad-desktop.mp4";

const MOBILE_VIDEO =
    "/videos/study-abroad-mobile.mp4";

export default function HeroVideo() {
    return (
        <div
            className="
                absolute
                inset-0
                overflow-hidden
                bg-black
            "
        >
            {/* =================================================
                VIDEO

                Browser chooses the correct source directly.
                No JS source switching.
            ================================================= */}

            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-hidden="true"
                tabIndex={-1}
                className="
                    absolute
                    inset-0

                    h-full
                    w-full

                    object-cover
                    object-[center_35%]

                    md:object-center

                    lg:object-top
                "
            >
                {/* MOBILE */}

                <source
                    src={MOBILE_VIDEO}
                    type="video/mp4"
                    media="(max-width: 767px)"
                />

                {/* DESKTOP */}

                <source
                    src={DESKTOP_VIDEO}
                    type="video/mp4"
                    media="(min-width: 768px)"
                />
            </video>

            {/* =================================================
                LEFT / RIGHT OVERLAY
            ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-gradient-to-r
                    from-black/20
                    via-transparent
                    to-black/20

                    md:from-black/10
                    md:to-black/10
                "
            />

            {/* =================================================
                BOTTOM OVERLAY
            ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0

                    h-28

                    bg-gradient-to-t
                    from-black/45
                    via-black/15
                    to-transparent

                    sm:h-36

                    lg:h-44
                "
            />

            {/* =================================================
                TOP OVERLAY
            ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0

                    h-16

                    bg-gradient-to-b
                    from-black/25
                    to-transparent

                    md:h-24
                "
            />
        </div>
    );
}