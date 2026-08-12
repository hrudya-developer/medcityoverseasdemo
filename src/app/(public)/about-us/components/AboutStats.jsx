import cn from "@/lib/cn";

import {
    statistics,
} from "../aboutData";

const AboutStats = () => {
    return (
        <section
            aria-labelledby="about-statistics-heading"
            className="relative z-20 px-4 sm:px-6 lg:px-8"
        >
            <h2
                id="about-statistics-heading"
                className="sr-only"
            >
                Medcity Study Abroad
                statistics
            </h2>

            <div
                className="mx-auto -mt-4 grid w-full max-w-[1600px] overflow-hidden rounded-[28px] bg-gradient-to-r from-[#061d55] via-secondary to-secondary p-4 shadow-[0_22px_55px_rgba(6,29,85,0.22)] sm:grid-cols-2 sm:p-5 lg:grid-cols-5"
            >
                {statistics.map(
                    (item, index) => {
                        const Icon =
                            item.icon;

                        const hasBorder =
                            index !==
                            statistics.length -
                            1;

                        return (
                            <article
                                key={
                                    item.label
                                }
                                className={cn(`
                                    flex items-center gap-3
                                    px-3 py-4 text-white
                                    ${hasBorder
                                        ? "lg:border-r lg:border-white/15"
                                        : ""
                                    }
                                `)}
                            >
                                <span
                                    aria-hidden="true"
                                    className={cn(`
                                        flex h-12 w-12
                                        shrink-0 items-center
                                        justify-center rounded-full
                                        bg-gradient-to-br
                                        ${item.gradient}
                                    `)}
                                >
                                    <Icon
                                        className="h-6 w-6"
                                        strokeWidth={
                                            2.1
                                        }
                                    />
                                </span>

                                <div>
                                    <p className="text-xl font-black sm:text-2xl">
                                        {
                                            item.value
                                        }
                                    </p>

                                    <p className="mt-1 text-[10px] leading-4 text-white/80">
                                        {
                                            item.label
                                        }
                                    </p>
                                </div>
                            </article>
                        );
                    }
                )}
            </div>
        </section>
    );
};

export default AboutStats;