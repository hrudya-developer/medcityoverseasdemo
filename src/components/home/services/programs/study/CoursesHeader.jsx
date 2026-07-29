export default function CoursesHeader() {
    return (
        <header
            className="
                mx-auto
                mb-10
                max-w-3xl
                text-center
                sm:mb-12
            "
        >
            <p
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-primary/10
                    bg-primary/[0.06]
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-primary
                "
            >
                <span
                    aria-hidden="true"
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-primary
                        shadow-[0_0_10px_rgba(192,31,83,0.45)]
                    "
                />

                Explore Study Options
            </p>

            <h2
                id="popular-courses-heading"
                className="
                    mt-4
                    font-nunito
                    text-3xl
                    font-extrabold
                    leading-tight
                    text-darkPrimary
                    sm:text-4xl
                    lg:text-5xl
                "
            >
                Popular{" "}
                <span
                    className="
                        bg-gradient-to-r
                        from-primary
                        to-secondary
                        bg-clip-text
                        text-transparent
                    "
                >
                    Study Abroad
                </span>{" "}
                Courses
            </h2>
        </header>
    );
}