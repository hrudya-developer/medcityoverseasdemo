import {
    GraduationCap,
    MapPin,
} from "lucide-react";

export default function CourseUniversityCard({
    showLogo,
    safeLogoUrl,
    universityName,
    locationName,
    onLogoError,
}) {
    return (
        <div
        className="
            group
            relative
            flex
            h-[88px]
            w-full
            min-w-0
    
            flex-col
            overflow-hidden
    
            rounded-[18px]
    
            border
            border-white/60
    
            bg-white/[0.90]
    
            text-left
    
            shadow-[0_16px_45px_rgba(2,8,23,0.20)]
    
            backdrop-blur-[22px]
            backdrop-saturate-150
    
            transition-all
            duration-300
    
            hover:-translate-y-0.5
            hover:bg-white/[0.96]
            hover:shadow-[0_20px_55px_rgba(2,8,23,0.25)]
        "
    >
            {/* =====================================================
                TOP GLASS SHINE
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-8
                    top-0

                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-white
                    to-transparent
                "
            />

            {/* =====================================================
                PRIMARY GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-12
                    -top-14

                    size-28
                    rounded-full

                    bg-primary/10
                    blur-[45px]
                "
            />

            {/* =====================================================
                SECONDARY GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-14
                    right-4

                    size-28
                    rounded-full

                    bg-secondary/10
                    blur-[45px]
                "
            />

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div
                className="
                    relative
                    z-10

                    flex
                    min-h-0
                    flex-1
                    items-center

                    gap-3

                    px-3
                    py-2.5

                    sm:gap-4
                    sm:px-4
                "
            >
                {/* =================================================
                    LOGO
                ================================================== */}

                <div
                    className="
                        relative
                        shrink-0
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -inset-1

                            rounded-[15px]

                            bg-gradient-to-br
                            from-primary/15
                            via-transparent
                            to-secondary/15

                            blur-lg
                        "
                    />

                    {showLogo ? (
                        <div
                            className="
                                relative

                                flex
                                h-[58px]
                                w-[70px]

                                items-center
                                justify-center

                                overflow-hidden
                                rounded-[13px]

                                border
                                border-slate-200/80

                                bg-white
                                p-2

                                shadow-[0_8px_20px_rgba(15,23,42,0.08)]

                                transition-transform
                                duration-300

                                group-hover:scale-[1.02]
                            "
                        >
                            <img
                                src={safeLogoUrl}
                                alt={`${universityName} logo`}
                                loading="lazy"
                                decoding="async"
                                onError={onLogoError}
                                className="
                                    max-h-full
                                    max-w-full
                                    object-contain
                                "
                            />
                        </div>
                    ) : (
                        <div
                            className="
                                relative

                                grid
                                h-[58px]
                                w-[70px]

                                place-items-center
                                overflow-hidden

                                rounded-[13px]

                                bg-gradient-to-br
                                from-darkPrimary
                                via-primary
                                to-secondary

                                text-white

                                shadow-[0_8px_20px_rgba(99,26,51,0.20)]

                                transition-transform
                                duration-300

                                group-hover:scale-[1.02]
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    inset-0

                                    bg-gradient-to-br
                                    from-white/15
                                    via-transparent
                                    to-transparent
                                "
                            />

                            <GraduationCap
                                size={24}
                                strokeWidth={1.8}
                                aria-hidden="true"
                                className="
                                    relative
                                    z-10
                                "
                            />
                        </div>
                    )}
                </div>

                {/* =================================================
                    UNIVERSITY DETAILS
                ================================================== */}

                <div
                    className="
                        min-w-0
                    "
                >
                    {/* LABELS */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5

                                rounded-full

                                border
                                border-primary/10

                                bg-primary/[0.07]

                                px-2
                                py-0.5

                                text-[7px]
                                font-black
                                uppercase
                                tracking-[0.16em]

                                text-primary
                            "
                        >
                            <span
                                className="
                                    size-1
                                    rounded-full
                                    bg-primary
                                "
                            />

                            University
                        </span>

                        <span
                            className="
                                hidden

                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-slate-400

                                sm:block
                            "
                        >
                            Study Abroad
                        </span>
                    </div>

                    {/* UNIVERSITY NAME */}

                    <h2
                        className="
                            mt-1

                            max-w-[340px]

                            truncate

                            text-[13px]
                            font-bold
                            leading-[1.2]
                            tracking-[-0.02em]

                            text-slate-950

                            sm:text-[15px]
                        "
                    >
                        {universityName}
                    </h2>

                    {/* LOCATION */}

                    {locationName && (
                        <div
                            className="
                                mt-1
                                flex
                                items-center
                                gap-1.5
                            "
                        >
                            <span
                                className="
                                    grid
                                    size-5
                                    shrink-0
                                    place-items-center

                                    rounded-full

                                    bg-secondary/[0.08]
                                    text-secondary
                                "
                            >
                                <MapPin
                                    size={10}
                                    strokeWidth={2.2}
                                    aria-hidden="true"
                                />
                            </span>

                            <span
                                className="
                                    max-w-[300px]
                                    truncate

                                    text-[10px]
                                    font-bold
                                    text-slate-500

                                    sm:text-xs
                                "
                            >
                                {locationName}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* =====================================================
                BRAND BAR
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    relative
                    z-10

                    flex
                    h-[2px]
                    w-full
                    shrink-0

                    overflow-hidden
                "
            >
                <span
                    className="
                        h-full
                        flex-[1.5]
                        bg-primary
                    "
                />

                <span
                    className="
                        h-full
                        flex-1
                        bg-secondary
                    "
                />

                <span
                    className="
                        h-full
                        w-10
                        bg-logoYellow
                    "
                />
            </div>
        </div>
    );
}