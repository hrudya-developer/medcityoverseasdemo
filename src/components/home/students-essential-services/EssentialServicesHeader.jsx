import { Sparkles } from "lucide-react";

const EssentialServicesHeader = () => {
    return (
        <header className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
            <div
                className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md"
            >
                <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4"
                />

                Student Essential Services
            </div>

            <h2
                id="essential-services-heading"
                className="font-nunito text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-[56px]"
            >
                Everything You Need,
                <span className="mt-1 block text-primary">
                    We’ve Got You Covered
                </span>
            </h2>

            <p
                className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
            >
                From education loans to accommodation and travel,
                our essential services make your study abroad journey
                smoother, safer, and stress-free.
            </p>
        </header>
    );
};

export default EssentialServicesHeader;