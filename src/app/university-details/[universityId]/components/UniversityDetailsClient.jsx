"use client";

import {
    useCallback,
    useRef,
} from "react";

import {
    usePathname,
    useRouter,
    useSearchParams,
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

export default function UniversityDetailsClient({
    id,
    initialData,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tabsRef = useRef(null);

    const requestedTab =
        searchParams.get("tab");

    const activeTab = VALID_TABS.includes(
        requestedTab
    )
        ? requestedTab
        : "about";

    const data = normalizeUniversityData(
        initialData
    );

    const handleBack = useCallback(() => {
        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.push("/universities");
    }, [router]);

    const handleTabChange = useCallback(
        (tab) => {
            if (!VALID_TABS.includes(tab)) {
                return;
            }

            const params =
                new URLSearchParams(
                    searchParams.toString()
                );

            if (tab === "about") {
                params.delete("tab");
            } else {
                params.set("tab", tab);
            }

            const query = params.toString();

            router.replace(
                query
                    ? `${pathname}?${query}`
                    : pathname,
                {
                    scroll: false,
                }
            );

            window.requestAnimationFrame(
                () => {
                    tabsRef.current?.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "start",
                        }
                    );
                }
            );
        },
        [
            pathname,
            router,
            searchParams,
        ]
    );

    if (!data?.university) {
        return (
            <section className="grid min-h-[500px] place-items-center px-4 text-center">
                <div>
                    <h1 className="text-2xl font-black text-darkPrimary">
                        University not found
                    </h1>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="mt-5 rounded-xl bg-primary px-5 py-3 font-bold text-white"
                    >
                        Go Back
                    </button>
                </div>
            </section>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f9fd] text-[#081c47]">
            <UniversityHero
                data={data}
                onBack={handleBack}
                onCourses={() =>
                    handleTabChange("courses")
                }
            />

            <div
                ref={tabsRef}
                className="scroll-mt-20"
            >
                <UniversityTabs
                    activeTab={activeTab}
                    universityName={
                        data.universityName
                    }
                    onChange={
                        handleTabChange
                    }
                />
            </div>

            {activeTab === "about" && (
                <UniversityAbout
                    data={data}
                    onCourses={() =>
                        handleTabChange(
                            "courses"
                        )
                    }
                />
            )}

            {activeTab === "courses" && (
                <UniversityCourses
                    universityId={id}
                    universityName={data.universityName}
                    countryId={data.university?.d_id}
                    courses={data.selectedCourses}
                    initialMainCourseId={
                        data.selectedCourses?.[0]?.c_id
                    }
                />
            )}
        </main>
    );
}