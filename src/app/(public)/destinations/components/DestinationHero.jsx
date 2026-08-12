import {
    Globe2,
    Plane,
    Sparkles,
} from "lucide-react";

const DestinationHero = () => {
    return (
        <section
            aria-labelledby="destinations-page-heading"
            className="relative isolate flex min-h-[430px] items-center overflow-hidden bg-gradient-to-br from-white via-[#fff9fb] to-[#edf6ff] px-4 py-16 sm:min-h-[480px] sm:px-6 lg:min-h-[520px] lg:px-8"
            style={{
                backgroundImage:
                    "url('/assets/mapBg.png')",
                backgroundSize: "cover",
                backgroundRepeat:
                    "no-repeat",
                backgroundPosition:
                    "center",
            }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-b from-white/40 via-white/65 to-white"
            />

            <div
                aria-hidden="true"
                className="absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute left-[8%] top-16 hidden h-28 w-28 opacity-[0.13] sm:block [background-image:radial-gradient(#c01f53_1.5px,transparent_1.5px)] [background-size:14px_14px]"
            />

            <div
                aria-hidden="true"
                className="absolute bottom-14 right-[8%] hidden h-28 w-28 opacity-[0.12] sm:block [background-image:radial-gradient(#0466af_1.5px,transparent_1.5px)] [background-size:14px_14px]"
            />

            <div
                className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
            >
                <div
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/90 p-1.5 pr-4 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                >
                    <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-[#034b82] text-white shadow-md shadow-secondary/20"
                    >
                        <Globe2 className="h-4 w-4" />
                    </span>

                    Explore · Learn · Succeed
                </div>

                <h1
                    id="destinations-page-heading"
                    className="mt-6 max-w-4xl font-nunito text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-darkPrimary sm:text-4xl lg:text-5xl"
                >
                    Explore Inspiring{" "}

                    <span
                        className="bg-gradient-to-r from-primary via-[#df376c] to-secondary bg-clip-text text-transparent"
                    >
                        Study Abroad Destinations
                    </span>
                </h1>

                <div
                    aria-hidden="true"
                    className="mt-5 flex items-center justify-center gap-2"
                >
                    <span className="h-1.5 w-16 rounded-full bg-primary" />
                    <span className="h-1.5 w-7 rounded-full bg-secondary" />
                    <span className="h-1.5 w-3 rounded-full bg-logoYellow" />
                </div>

                <p
                    className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg lg:leading-8"
                >
                    Discover world-class
                    education, diverse cultures
                    and rewarding international
                    opportunities across leading
                    global study destinations.
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <div
                        className="inline-flex items-center gap-2 rounded-xl border border-primary/10 bg-white/85 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur"
                    >
                        <Plane className="h-4 w-4 text-primary" />

                        Global education options
                    </div>

                    <div
                        className="inline-flex items-center gap-2 rounded-xl border border-secondary/10 bg-white/85 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur"
                    >
                        <Sparkles className="h-4 w-4 text-secondary" />

                        Expert application support
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DestinationHero;