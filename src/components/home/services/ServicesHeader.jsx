import {
    Sparkles,
    Star,
} from "lucide-react";

export default function ServicesHeader() {
    return (
        <header
            className="relative mx-auto max-w-4xl text-center"
            data-aos="fade-up"
        >
            <div
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary shadow-[0_10px_30px_rgba(99,26,51,0.08)] backdrop-blur-md sm:text-xs"
            >
                <Star
                    aria-hidden="true"
                    size={15}
                    className="fill-primary"
                />

                Overseas Education Consultants
            </div>

            <h1
                id="essential-services-title"
                className="mt-5 text-balance text-3xl font-black leading-tight tracking-[-0.035em] text-darkPrimary sm:text-4xl lg:text-5xl"
            >
                Complete Study Abroad Support,
                All in{" "}
                <span
                    className="bg-gradient-to-r from-primary via-[#e1477c] to-secondary bg-clip-text text-transparent"
                >
                    One Place
                </span>
            </h1>

            <p
                id="essential-services-description"
                className="mx-auto mt-5 max-w-3xl text-pretty text-sm leading-7 text-slate-600 sm:text-base lg:text-lg"
            >
                Medcity offers end-to-end study
                abroad guidance, including
                international university
                selection, scholarship assistance,
                student visa support and
                pre-departure services.
            </p>

            <div
                aria-hidden="true"
                className="mx-auto mt-7 flex items-center justify-center gap-2"
            >
                <span className="h-1.5 w-5 rounded-full bg-primary/25" />

                <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                    <Sparkles size={16} />
                </span>

                <span className="h-1.5 w-14 rounded-full bg-primary" />

                <span className="h-1.5 w-5 rounded-full bg-primary/25" />
            </div>
        </header>
    );
}