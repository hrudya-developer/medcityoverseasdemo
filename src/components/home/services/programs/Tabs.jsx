"use client";

import { useState } from "react";
import { BriefcaseBusiness, Globe, GraduationCap } from "lucide-react";

import StudyTabContent from "./StudyTabContent";
import WorkTabContent from "./WorkTabContent";
import MigrateTabContent from "./MigrateTabContent";

const tabs = [
    {
        id: "study",
        label: "Study",
        description: "Explore international education, universities, courses and study abroad opportunities.",
        icon: GraduationCap,
        activeColor: "bg-primary",
        textColor: "text-primary",
        borderColor: "border-primary",
        lineColor: "bg-primary",
        focusColor: "focus-visible:ring-primary",
    },
    {
        id: "work",
        label: "Work",
        description: "Discover international career opportunities, overseas employment and professional pathways.",
        icon: BriefcaseBusiness,
        activeColor: "bg-secondary",
        textColor: "text-secondary",
        borderColor: "border-secondary",
        lineColor: "bg-secondary",
        focusColor: "focus-visible:ring-secondary",
    },
    {
        id: "migrate",
        label: "Migrate",
        description: "Learn about migration pathways, permanent residency and immigration support services.",
        icon: Globe,
        activeColor: "bg-yellow-500",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-500",
        lineColor: "bg-yellow-500",
        focusColor: "focus-visible:ring-yellow-500",
    },
];

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("study");

    const handleKeyDown = (event, currentIndex) => {
        let nextIndex = currentIndex;

        switch (event.key) {
            case "ArrowRight":
                nextIndex = (currentIndex + 1) % tabs.length;
                break;

            case "ArrowLeft":
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                break;

            case "Home":
                nextIndex = 0;
                break;

            case "End":
                nextIndex = tabs.length - 1;
                break;

            default:
                return;
        }

        event.preventDefault();

        const nextTab = tabs[nextIndex];
        setActiveTab(nextTab.id);

        document.getElementById(`${nextTab.id}-tab`)?.focus();
    };

    return (
        <section
            id="international-opportunities"
            aria-labelledby="international-opportunities-title"
            aria-describedby="international-opportunities-description"
            className="relative mx-auto w-full max-w-7xl [content-visibility:auto] [contain-intrinsic-size:800px]"
        >
            <header className="sr-only">
                <h2 id="international-opportunities-title">
                    Study Abroad, International Work and Migration Services
                </h2>

                <p id="international-opportunities-description">
                    Explore overseas education, international career opportunities and migration support services for students and professionals.
                </p>
            </header>

            <div className="mx-auto max-w-5xl overflow-x-auto px-4 pb-2">
                <div
                    role="tablist"
                    aria-label="International education and migration services"
                    className="flex min-w-max justify-center gap-3 sm:grid sm:min-w-0 sm:grid-cols-3"
                >
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                id={`${tab.id}-tab`}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`${tab.id}-panel`}
                                aria-label={`${tab.label}: ${tab.description}`}
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => setActiveTab(tab.id)}
                                onKeyDown={(event) => handleKeyDown(event, index)}
                                className={`group relative w-[180px] shrink-0 overflow-hidden rounded-xl border bg-white text-left shadow-md outline-none transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none sm:w-full ${tab.focusColor} ${isActive ? tab.borderColor : "border-gray-200"}`}
                            >
                                <div className="flex h-12 items-center sm:h-14">
                                    <span
                                        aria-hidden="true"
                                        className={`flex h-full w-12 shrink-0 items-center justify-center rounded-r-[24px] transition-[background-color,color,transform] duration-300 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none sm:w-14 ${isActive ? `${tab.activeColor} text-white` : "bg-gray-100 text-slate-600"}`}
                                    >
                                        <Icon size={20} strokeWidth={2.2} />
                                    </span>

                                    <span className="flex min-w-0 flex-1 flex-col justify-center px-3 sm:px-4">
                                        <span
                                            className={`truncate text-sm font-semibold transition-colors duration-300 sm:text-lg ${isActive ? tab.textColor : "text-slate-700"}`}
                                        >
                                            {tab.label}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className={`mt-1 h-0.5 rounded-full transition-[width,background-color] duration-300 ${isActive ? `w-8 ${tab.lineColor}` : "w-6 bg-gray-300"}`}
                                        />
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <section
                    id="study-panel"
                    role="tabpanel"
                    aria-labelledby="study-tab"
                    tabIndex={0}
                    hidden={activeTab !== "study"}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <h3 className="sr-only">
                        Study Abroad Programs and University Opportunities
                    </h3>

                    <StudyTabContent />
                </section>

                <section
                    id="work-panel"
                    role="tabpanel"
                    aria-labelledby="work-tab"
                    tabIndex={0}
                    hidden={activeTab !== "work"}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                    <h3 className="sr-only">
                        International Work and Career Opportunities
                    </h3>

                    <WorkTabContent />
                </section>

                <section
                    id="migrate-panel"
                    role="tabpanel"
                    aria-labelledby="migrate-tab"
                    tabIndex={0}
                    hidden={activeTab !== "migrate"}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                    <h3 className="sr-only">
                        Migration and Immigration Support Services
                    </h3>

                    <MigrateTabContent />
                </section>
            </div>
        </section>
    );
}