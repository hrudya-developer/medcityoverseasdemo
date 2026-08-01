import { values } from "../aboutData";
import SectionHeading from "./SectionHeading";

const CoreValues = () => {
    return (
        <section
            aria-labelledby="core-values-heading"
            className="
                bg-gradient-to-b
                from-white
                to-[#f7faff]
                px-4 py-16
                sm:px-6 sm:py-20
                lg:px-8
            "
        >
            <div className="mx-auto max-w-[1600px]">
                <div id="core-values-heading">
                    <SectionHeading
                        eyebrow="Our Core Values"
                        title="The Values That Guide Everything We Do"
                        description="Our values shape how we support students, families and education partners throughout the study-abroad journey."
                        centered
                    />
                </div>

                <div
                    className="
                        mt-10 grid gap-4
                        sm:grid-cols-2
                        lg:grid-cols-5
                    "
                >
                    {values.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="
                                    group rounded-[24px]
                                    border border-slate-200/80
                                    bg-white p-5
                                    text-center
                                    shadow-[0_12px_30px_rgba(15,23,42,0.07)]
                                    transition-all duration-300
                                    hover:-translate-y-2
                                    hover:border-primary/20
                                    hover:shadow-[0_18px_38px_rgba(192,31,83,0.11)]
                                "
                            >
                                <span
                                    aria-hidden="true"
                                    className={`
                                        mx-auto flex h-14 w-14
                                        items-center justify-center
                                        rounded-2xl
                                        ${item.background}
                                        ${item.color}
                                        transition-transform duration-300
                                        group-hover:scale-110
                                    `}
                                >
                                    <Icon
                                        className="h-7 w-7"
                                        strokeWidth={2.1}
                                    />
                                </span>

                                <h3 className="mt-4 text-base font-black text-[#10204a]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-xs leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;