import {
    Plane,
} from "lucide-react";

export default function DestinationHeader() {
    return (
        <header
            className="mx-auto mb-9 max-w-3xl text-center sm:mb-11 lg:mb-12"
        >
            <p
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/10 bg-primary/[0.07] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.13em] text-primary shadow-sm sm:text-xs"
            >
                <Plane
                    aria-hidden="true"
                    className="h-4 w-4"
                />

                Explore. Learn. Grow
            </p>

            <h2
                id="destinations-heading"
                className="mt-4 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary sm:text-4xl lg:text-5xl"
            >
                Dream{" "}
                <span
                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                    Destinations
                </span>
            </h2>

            <p
                className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg"
            >
                Choose your ideal study abroad
                destination and discover leading
                universities, courses and global
                career opportunities.
            </p>

            <div
                aria-hidden="true"
                className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary"
            />
        </header>
    );
}