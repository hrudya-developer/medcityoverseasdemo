"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import CourseHeroBackground from "./CourseHeroBackground";
import CourseHeroCard from "./CourseHeroCard";
import CourseQuickFactsPanel from "./CourseQuickFactsPanel";

import {
    getSafeLogoUrl,
} from "./courseHeroUtils";

export default function CourseDetailsHero({
    details,
    onApply,
}) {
    const {
        courseTitle =
            "Course Details",

        universityName =
            "University",

        universityLogoUrl =
            "",

        universityLogo =
            "",

        logo =
            "",

        universitiesImagePath =
            "",

        universityImagePath =
            "",

        locationName =
            "",

        level =
            "Course",

        duration =
            "Not Available",

        intakes =
            "Not Available",

        intakesRaw =
            "",
    } = details ?? {};

    /* =====================================================
       LOGO STATE
    ===================================================== */

    const [
        logoError,
        setLogoError,
    ] = useState(false);

    /* =====================================================
       RAW LOGO
    ===================================================== */

    const rawLogo =
        universityLogoUrl ||
        universityLogo ||
        logo ||
        "";

    /* =====================================================
       LOGO BASE PATH
    ===================================================== */

    const logoBasePath =
        universitiesImagePath ||
        universityImagePath ||
        "";

    /* =====================================================
       SAFE LOGO
    ===================================================== */

    const safeLogoUrl =
        useMemo(
            () =>
                getSafeLogoUrl(
                    rawLogo,
                    logoBasePath
                ),
            [
                rawLogo,
                logoBasePath,
            ]
        );

    /* =====================================================
       RESET ERROR WHEN LOGO CHANGES
    ===================================================== */

    useEffect(() => {
        setLogoError(
            false
        );
    }, [
        safeLogoUrl,
    ]);

    const showLogo =
        Boolean(
            safeLogoUrl
        ) &&
        !logoError;

    /* =====================================================
       APPLY
    ===================================================== */

    const handleApply = () => {
        if (
            typeof onApply ===
            "function"
        ) {
            onApply();
        }
    };

    return (
        <section
            className="
                relative
                isolate
                overflow-hidden
                bg-[#07101c]
            "
        >
            <CourseHeroBackground />

            <div
                className="
                    relative
                    z-10

                    mx-auto
                    grid
                    w-full
                    max-w-[1500px]

                    items-center
                    justify-items-center

                    gap-10

                    px-5
                    py-12

                    text-center

                    sm:px-8
                    sm:py-14

                    lg:min-h-[620px]
                    lg:grid-cols-[minmax(0,750px)_350px]
                    lg:items-stretch
                    lg:justify-items-stretch
                    lg:gap-12
                    lg:px-12
                    lg:py-16
                    lg:text-left

                    xl:grid-cols-[minmax(0,780px)_370px]
                    xl:gap-16
                    xl:px-16
                "
            >
                {/* =================================================
                    LEFT
                ================================================== */}

                <div
                    className="
                        flex
                        w-full
                        items-center
                        justify-center

                        lg:justify-start
                    "
                >
                    <CourseHeroCard
                        courseTitle={
                            courseTitle
                        }
                        level={
                            level
                        }
                        onApply={
                            handleApply
                        }
                        showLogo={
                            showLogo
                        }
                        safeLogoUrl={
                            safeLogoUrl
                        }
                        universityName={
                            universityName
                        }
                        locationName={
                            locationName
                        }
                        onLogoError={() => {
                            setLogoError(
                                true
                            );
                        }}
                    />
                </div>

                {/* =================================================
                    RIGHT QUICK FACTS
                ================================================== */}

                <div
                    className="
                        flex
                        w-full
                        justify-center

                        lg:h-full
                        lg:justify-end
                    "
                >
                    <CourseQuickFactsPanel
                        duration={
                            duration
                        }
                        level={
                            level
                        }
                        intakes={
                            intakes
                        }
                        intakesRaw={
                            intakesRaw
                        }
                    />
                </div>
            </div>
        </section>
    );
}