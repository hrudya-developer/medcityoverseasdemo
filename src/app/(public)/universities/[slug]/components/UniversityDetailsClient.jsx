"use client";

import {
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    usePathname,
    useRouter,
} from "next/navigation";

import UniversityAbout from "./UniversityAbout";
import UniversityCourses from "./UniversityCourses";
import UniversityHero from "./UniversityHero";
import UniversityTabs from "./UniversityTabs";

import {
    normalizeUniversityData,
} from "./universityDetailsUtils";

const VALID_TABS = [
    "about",
    "courses",
];

function normalizeTab(
    value
) {
    return VALID_TABS.includes(
        value
    )
        ? value
        : "about";
}

function cleanId(
    value
) {
    return String(
        value ?? ""
    ).trim();
}

export default function UniversityDetailsClient({
    id,
    initialData,
    initialTab = "about",
}) {
    const router =
        useRouter();

    const pathname =
        usePathname();

    const tabsRef =
        useRef(
            null
        );

    const [
        activeTab,
        setActiveTab,
    ] = useState(
        normalizeTab(
            initialTab
        )
    );

    /* =========================================================
       NORMALIZE
    ========================================================= */

    const data =
        useMemo(
            () => {
                if (
                    !initialData
                ) {
                    return null;
                }

                try {
                    return normalizeUniversityData(
                        initialData
                    );
                } catch (
                    error
                ) {
                    console.error(
                        "Unable to normalize university:",
                        error
                    );

                    return null;
                }
            },
            [
                initialData,
            ]
        );

    const university =
        data?.university ??
        null;

    /* =========================================================
       UNIVERSITY ID
    ========================================================= */

    const universityId =
        cleanId(
            id ??
            university?.u_id ??
            university?.university_id ??
            university?.id ??
            ""
        );

    /* =========================================================
       UNIVERSITY NAME
    ========================================================= */

    const universityName =
        data?.universityName ||
        university?.name ||
        university?.university_name ||
        university?.university ||
        "University";

    /* =========================================================
       COURSES FROM getUniversityDetails

       For INTO 1174 this contains 4 courses.
    ========================================================= */

    const initialCourses =
        useMemo(
            () => {
                if (
                    !Array.isArray(
                        data?.selectedCourses
                    )
                ) {
                    return [];
                }

                return data
                    .selectedCourses
                    .filter(
                        Boolean
                    );
            },
            [
                data,
            ]
        );

    /* =========================================================
       MAIN COURSE CATEGORIES

       Returned by:
       getCoursebyMainUniversity
    ========================================================= */

    const mainCourses =
        useMemo(
            () => {
                if (
                    !Array.isArray(
                        initialData?.mainCourses
                    )
                ) {
                    return [];
                }

                return initialData
                    .mainCourses
                    .filter(
                        Boolean
                    );
            },
            [
                initialData,
            ]
        );

    /* =========================================================
       INITIAL CATEGORY

       Same idea as old React app:

       courses?.[0]?.c_id
    ========================================================= */

    const initialCourseCategoryId =
        cleanId(
            initialData
                ?.initialCourseCategoryId ??
            initialCourses?.[0]
                ?.c_id ??
            ""
        );

    /* =========================================================
       BACK
    ========================================================= */

    const handleBack =
        useCallback(
            () => {
                if (
                    typeof window !==
                        "undefined" &&
                    document.referrer
                ) {
                    router.back();

                    return;
                }

                router.push(
                    "/universities"
                );
            },
            [
                router,
            ]
        );

    /* =========================================================
       SCROLL
    ========================================================= */

    const scrollToTabs =
        useCallback(
            () => {
                if (
                    typeof window ===
                    "undefined"
                ) {
                    return;
                }

                window
                    .requestAnimationFrame(
                        () => {
                            tabsRef
                                .current
                                ?.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "start",
                                    }
                                );
                        }
                    );
            },
            []
        );

    /* =========================================================
       TAB CHANGE
    ========================================================= */

    const handleTabChange =
        useCallback(
            (
                tab
            ) => {
                const nextTab =
                    normalizeTab(
                        tab
                    );

                setActiveTab(
                    nextTab
                );

                const nextUrl =
                    nextTab ===
                    "courses"
                        ? `${pathname}?tab=courses`
                        : pathname;

                router.replace(
                    nextUrl,
                    {
                        scroll:
                            false,
                    }
                );

                scrollToTabs();
            },
            [
                pathname,
                router,
                scrollToTabs,
            ]
        );

    /* =========================================================
       NOT FOUND
    ========================================================= */

    if (
        !data ||
        !university
    ) {
        return (
            <main className="grid min-h-[600px] place-items-center bg-[#f7f9fd] px-5">
                <section className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
                    <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-2xl font-black text-primary">
                        !
                    </div>

                    <h1 className="mt-6 text-2xl font-black text-darkPrimary">
                        University not found
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">
                        The requested
                        university information
                        could not be loaded.
                    </p>

                    <button
                        type="button"
                        onClick={
                            handleBack
                        }
                        className="mt-7 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-darkPrimary"
                    >
                        Back to Universities
                    </button>
                </section>
            </main>
        );
    }

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <main className="min-h-screen bg-[#f7f9fd] text-[#081c47]">
            <UniversityHero
                data={
                    data
                }
                onBack={
                    handleBack
                }
                onCourses={() =>
                    handleTabChange(
                        "courses"
                    )
                }
            />

            <div
                ref={
                    tabsRef
                }
                className="scroll-mt-24"
            >
                <UniversityTabs
                    activeTab={
                        activeTab
                    }
                    universityName={
                        universityName
                    }
                    onChange={
                        handleTabChange
                    }
                />
            </div>

            {activeTab ===
                "about" && (
                <UniversityAbout
                    data={
                        data
                    }
                    onCourses={() =>
                        handleTabChange(
                            "courses"
                        )
                    }
                />
            )}

            {activeTab ===
                "courses" && (
                <UniversityCourses
                    universityId={
                        universityId
                    }
                    universityName={
                        universityName
                    }
                    mainCourses={
                        mainCourses
                    }
                    initialCourses={
                        initialCourses
                    }
                    initialCourseCategoryId={
                        initialCourseCategoryId
                    }
                />
            )}
        </main>
    );
}