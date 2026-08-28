"use client";

import { ArrowRight } from "lucide-react";

import UniversityFactRow from "./UniversityFactRow";
import UniversityInfoBadge from "./UniversityInfoBadge";
import UniversityMap from "./UniversityMap";
import UniversityStats from "./UniversityStats";
import FAQ from "@/components/home/FAQ/FAQ";



export default function UniversityAbout({
    data,
    onCourses,
}) {
    return (
        <div
            id="about-panel"
            role="tabpanel"
            aria-labelledby="about-tab"
        >
            <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-8 lg:grid-cols-2 lg:px-10">
                <article className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">
                    <p className="text-sm font-black uppercase text-secondary">
                        About the University
                    </p>

                    <h2 className="mt-5 text-3xl font-bold">
                        Study at{" "}
                        <span className="text-darkPrimary">
                            {data.universityName}
                        </span>
                    </h2>

                    <p className="mt-5 whitespace-pre-line leading-8 text-[#081c47]/80">
                        {data.aboutText}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        <UniversityInfoBadge
                            label="Scholarship"
                            value={
                                data.scholarship
                            }
                        />

                        <UniversityInfoBadge
                            label="IELTS"
                            value={
                                data.withoutIelts
                            }
                        />

                        <UniversityInfoBadge
                            label="GRE"
                            value={
                                data.withoutGre
                            }
                        />

                        <UniversityInfoBadge
                            label="GMAT"
                            value={
                                data.withoutGmat
                            }
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onCourses}
                        className="mt-7 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-white transition hover:bg-darkPrimary"
                    >
                        Explore Courses

                        <ArrowRight className="size-5" />
                    </button>
                </article>

                <article className="rounded-3xl bg-white p-6 shadow-xl sm:p-10">
                    <p className="text-sm font-black uppercase text-secondary">
                        Quick Info
                    </p>

                    <div className="mt-5 space-y-4">
                        <UniversityFactRow
                            label="Country"
                            value={
                                data.countryName
                            }
                        />

                        <UniversityFactRow
                            label="Location"
                            value={
                                data.locationText
                            }
                        />

                        <UniversityFactRow
                            label="Type"
                            value={
                                data.universityType
                            }
                        />

                        <UniversityFactRow
                            label="Ranking"
                            value={data.ranking}
                        />

                        {data.infoItems.map(
                            (item, index) => {
                                const content =
                                    item?.text ||
                                    item?.description ||
                                    "";

                                const [
                                    label,
                                    ...rest
                                ] =
                                    String(
                                        content
                                    ).split(":");

                                return (
                                    <UniversityFactRow
                                        key={
                                            item?.id ||
                                            index
                                        }
                                        label={
                                            label?.trim() ||
                                            `Info ${index +
                                            1
                                            }`
                                        }
                                        value={
                                            rest.length
                                                ? rest
                                                    .join(
                                                        ":"
                                                    )
                                                    .trim()
                                                : content
                                        }
                                    />
                                );
                            }
                        )}
                    </div>
                </article>
            </section>

            <UniversityStats data={data} />

            <UniversityMap data={data} />
            <FAQ />
        </div>
    );
}