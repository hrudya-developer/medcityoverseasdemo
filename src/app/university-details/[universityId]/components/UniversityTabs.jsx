"use client";

import {
    BookOpen,
    Landmark,
} from "lucide-react";

const tabs = [
    {
        id: "about",
        label: "About",
        icon: Landmark,
    },
    {
        id: "courses",
        label: "Courses",
        icon: BookOpen,
    },
];

export default function UniversityTabs({
    activeTab,
    universityName,
    onChange,
}) {
    return (
        <nav
            aria-label="University information"
            className="sticky top-0 z-20 overflow-x-auto border-b border-[#e6eaf2] bg-white/95 px-4 backdrop-blur-xl sm:px-8 lg:px-14"
        >
            <div
                role="tablist"
                aria-label={`${universityName} details`}
                className="mx-auto flex max-w-7xl"
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active =
                        activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            id={`${tab.id}-tab`}
                            aria-selected={active}
                            aria-controls={`${tab.id}-panel`}
                            onClick={() =>
                                onChange(tab.id)
                            }
                            className={`flex min-w-fit items-center gap-3 border-b-4 px-6 py-5 font-extrabold uppercase transition ${active
                                    ? "border-darkPrimary text-darkPrimary"
                                    : "border-transparent text-[#51607d] hover:text-primary"
                                }`}
                        >
                            <Icon className="size-6" />

                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}