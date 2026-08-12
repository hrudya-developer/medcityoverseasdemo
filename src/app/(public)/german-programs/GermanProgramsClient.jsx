import GermanCoursesLayout from "@/components/home/german-courses/GermanCoursesLayout";
import FAQ from "@/components/home/FAQ/FAQ";

export default function GermanProgramsClient() {
    return (
        <div className="overflow-hidden bg-white">
            <GermanProgramsHero />

            <section
                aria-labelledby="german-programs-list-heading"
                className="bg-white"
            >
                <h2
                    id="german-programs-list-heading"
                    className="sr-only"
                >
                    German study, Ausbildung and career programs
                </h2>

                <GermanCoursesLayout />
            </section>

            <section
                id="german-programs-faq"
                aria-labelledby="german-programs-faq-heading"
                className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
            >
                <h2
                    id="german-programs-faq-heading"
                    className="sr-only"
                >
                    German programs frequently asked questions
                </h2>

                <FAQ />
            </section>
        </div>
    );
}

function GermanProgramsHero() {
    return (
        <section
            aria-labelledby="german-programs-heading"
            className="relative overflow-hidden bg-gradient-to-br from-[#fff7fa] via-white to-[#eef7ff] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
            <div
                aria-hidden="true"
                className="absolute -left-28 top-10 size-72 rounded-full bg-primary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-28 bottom-10 size-72 rounded-full bg-secondary/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl text-center">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">
                    Study. Train. Build Your Career.
                </p>

                <h1
                    id="german-programs-heading"
                    className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-darkPrimary sm:text-5xl lg:text-6xl"
                >
                    German Study,{" "}
                    <span className="text-primary">
                        Ausbildung and Career Programs
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                    Explore university study options, Ausbildung vocational training
                    and career pathways for international students planning their
                    future in Germany.
                </p>
            </div>
        </section>
    );
}