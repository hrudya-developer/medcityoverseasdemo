import {
    MapPin,
    Navigation,
} from "lucide-react";

const BranchSectionHeader = () => {
    return (
        <header
            className="relative mx-auto mb-12 max-w-4xl text-center"
        >
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
            />

            <div
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1.5 shadow-lg"
            >
                <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
                >
                    <MapPin
                        aria-hidden="true"
                        className="h-4 w-4"
                    />
                </span>

                <span
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
                >
                    18 Branches Across South India
                </span>
            </div>

            <h2
                id="our-branches-heading"
                className="mt-7 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary md:text-4xl lg:text-5xl"
            >
                Find Your Nearest{" "}
                <span
                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                    Medcity Branch
                </span>
            </h2>

            <p
                className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
                Find a nearby Medcity branch for
                overseas education counselling,
                university applications, student
                visa guidance and personalised
                study abroad support.
            </p>

            <div
                aria-hidden="true"
                className="mt-8 flex items-center justify-center gap-4"
            >
                <span className="h-[2px] w-20 rounded-full bg-primary/20" />

                <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-darkPrimary text-white shadow-[0_10px_25px_rgba(192,31,83,0.25)]"
                >
                    <Navigation className="h-5 w-5" />
                </span>

                <span className="h-[2px] w-20 rounded-full bg-primary/20" />
            </div>
        </header>
    );
};

export default BranchSectionHeader;