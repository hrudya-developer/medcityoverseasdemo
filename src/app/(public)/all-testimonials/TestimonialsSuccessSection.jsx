export default function TestimonialsSuccessSection() {
    return (
        <section
            aria-labelledby="student-success-heading"
            className="
                relative
                isolate
                overflow-hidden

                bg-secondary

                px-4
                py-14

                sm:px-6
                sm:py-16

                lg:px-8
                lg:py-20
            "
        >
            {/* BACKGROUND GRID */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-20

                    bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)]
                    bg-[size:42px_42px]
                "
            />

            {/* DARK PRIMARY GLOW */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    -top-32
                    -z-10

                    size-[350px]
                    rounded-full

                    bg-darkPrimary/40

                    blur-[100px]

                    sm:size-[450px]
                "
            />

            {/* YELLOW GLOW */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -right-24
                    -z-10

                    size-[320px]
                    rounded-full

                    bg-logoYellow/15

                    blur-[90px]

                    lg:size-[430px]
                "
            />

            <div
                className="
                    mx-auto
                    grid
                    max-w-6xl
                    items-center
                    gap-10

                    lg:grid-cols-[0.9fr_1.1fr]
                    lg:gap-14

                    xl:gap-20
                "
            >
                {/* LEFT */}

                <div>
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-logoYellow/30

                            bg-logoYellow/10

                            px-3
                            py-1.5

                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.13em]
                            text-logoYellow

                            sm:px-4
                            sm:py-2
                            sm:text-xs
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                size-2
                                rounded-full
                                bg-logoYellow

                                shadow-[0_0_12px_rgba(247,236,34,0.65)]
                            "
                        />

                        Student Success
                    </div>

                    <h2
                        id="student-success-heading"
                        className="
                            mt-5
                            max-w-xl

                            font-nunito

                            text-[30px]
                            font-black
                            leading-[1.12]
                            tracking-[-0.025em]
                            text-white

                            sm:text-4xl

                            lg:text-[42px]

                            xl:text-[46px]
                        "
                    >
                        Study Abroad{" "}
                        <span className="text-logoYellow">
                            Success Stories
                        </span>{" "}
                        With Medcity Overseas
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-xl

                            text-[15px]
                            leading-7
                            text-white/80

                            sm:text-base
                            sm:leading-8
                        "
                    >
                        Every international education journey
                        is unique. The right guidance can make
                        choosing a course, applying to a
                        university and preparing for the visa
                        process easier to understand.
                    </p>

                    <div
                        aria-hidden="true"
                        className="
                            mt-7
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-1
                                w-12
                                rounded-full
                                bg-logoYellow
                            "
                        />

                        <span
                            className="
                                h-1
                                w-5
                                rounded-full
                                bg-white/40
                            "
                        />

                        <span
                            className="
                                h-1
                                w-2
                                rounded-full
                                bg-white/20
                            "
                        />
                    </div>
                </div>

                {/* RIGHT */}

                <div
                    className="
                        relative

                        rounded-[26px]

                        border
                        border-white/15

                        bg-white/[0.08]

                        p-3

                        shadow-[0_25px_70px_rgba(0,0,0,0.15)]

                        backdrop-blur-sm

                        sm:rounded-[30px]
                        sm:p-4

                        lg:rounded-[34px]
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -right-2
                            -top-2

                            size-16
                            rounded-2xl

                            bg-logoYellow

                            opacity-90

                            rotate-6

                            sm:size-20
                        "
                    />

                    <div
                        className="
                            relative
                            overflow-hidden

                            rounded-[22px]

                            bg-white

                            px-5
                            py-6

                            sm:rounded-[26px]
                            sm:px-7
                            sm:py-8

                            lg:px-8
                            lg:py-9
                        "
                    >
                        <div
                            aria-hidden="true"
                            className="
                                absolute
                                inset-x-0
                                top-0

                                h-1

                                bg-gradient-to-r
                                from-darkPrimary
                                via-primary
                                to-logoYellow
                            "
                        />

                        <div
                            aria-hidden="true"
                            className="
                                mb-5

                                flex
                                size-11
                                items-center
                                justify-center

                                rounded-xl

                                bg-darkPrimary

                                font-serif
                                text-3xl
                                font-black
                                leading-none
                                text-logoYellow

                                shadow-lg
                                shadow-darkPrimary/15

                                sm:size-12
                            "
                        >
                            “
                        </div>

                        <p
                            className="
                                text-[15px]
                                font-medium
                                leading-7
                                text-slate-600

                                sm:text-base
                                sm:leading-8
                            "
                        >
                            These student testimonials share
                            experiences from learners who
                            received{" "}
                            <strong className="font-extrabold text-darkPrimary">
                                study abroad guidance
                            </strong>{" "}
                            from Medcity Overseas.
                        </p>

                        <p
                            className="
                                mt-4

                                text-[15px]
                                leading-7
                                text-slate-600

                                sm:text-base
                                sm:leading-8
                            "
                        >
                            Their stories help prospective
                            students better understand the
                            overseas education journey and the
                            support available throughout the
                            process.
                        </p>

                        <div
                            className="
                                mt-6

                                grid
                                grid-cols-1
                                gap-2.5

                                min-[460px]:grid-cols-2
                            "
                        >
                            <SuccessPoint>
                                Course Selection
                            </SuccessPoint>

                            <SuccessPoint>
                                University Applications
                            </SuccessPoint>

                            <SuccessPoint>
                                Admission Guidance
                            </SuccessPoint>

                            <SuccessPoint>
                                Visa Support
                            </SuccessPoint>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SuccessPoint({
    children,
}) {
    return (
        <div
            className="
                group

                flex
                min-w-0
                items-center
                gap-2.5

                rounded-xl

                border
                border-slate-100

                bg-slate-50

                px-3
                py-2.5

                text-[13px]
                font-bold
                text-darkPrimary

                transition-all
                duration-300

                hover:border-logoYellow/60
                hover:bg-logoYellow/[0.08]

                sm:px-3.5
                sm:py-3
                sm:text-sm
            "
        >
            <span
                aria-hidden="true"
                className="
                    grid
                    size-5
                    shrink-0
                    place-items-center

                    rounded-full

                    bg-logoYellow

                    text-[11px]
                    font-black
                    text-darkPrimary

                    transition-transform
                    duration-300

                    group-hover:scale-110

                    sm:size-6
                    sm:text-xs
                "
            >
                ✓
            </span>

            <span className="min-w-0 leading-5">
                {children}
            </span>
        </div>
    );
}