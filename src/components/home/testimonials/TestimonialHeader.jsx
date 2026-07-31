import {
    Quote,
    Sparkles,
} from "lucide-react";

const TestimonialHeader = () => {
    return (
        <header className="relative z-10 mx-auto max-w-4xl text-center">
            <div
                className="
                    inline-flex items-center
                    gap-2 rounded-full
                    border border-primary/20
                    bg-white/80 px-4 py-2
                    text-xs font-bold
                    uppercase
                    tracking-[0.16em]
                    text-primary
                    shadow-sm
                    backdrop-blur-md
                "
            >
                <Sparkles className="h-4 w-4" />

                Our Students, Their Success
                Stories
            </div>

            <h2
                id="testimonial-section-heading"
                className="
                    mt-5 font-nunito
                    text-3xl font-extrabold
                    leading-tight
                    text-darkPrimary
                    sm:text-4xl
                    lg:text-5xl
                "
            >
                What People Say{" "}
                <span
                    className="
                        bg-gradient-to-r
                        from-primary
                        to-secondary
                        bg-clip-text
                        text-transparent
                    "
                >
                    About Us
                </span>
            </h2>

            <p
                className="
                    mx-auto mt-4
                    max-w-2xl text-sm
                    leading-7 text-slate-600
                    sm:text-base
                    sm:leading-8
                "
            >
                Read real experiences from
                students who trusted Medcity
                Study Abroad for admissions,
                visa support and international
                education guidance.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-primary/30" />

                <div
                    className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                        text-primary
                    "
                >
                    <Quote className="h-5 w-5" />
                </div>

                <span className="h-px w-12 bg-primary/30" />
            </div>
        </header>
    );
};

export default TestimonialHeader;