import {
    ShieldCheck,
} from "lucide-react";

export default function PrivacyHero() {
    return (
        <section
            className="
                relative
                isolate
                overflow-hidden
                bg-gradient-to-r
                from-[#fff4f8]
                via-[#f7f7ff]
                to-[#e8f5ff]
            "
        >
            {/* DECORATIVE BACKGROUND */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-40
                    h-[430px]
                    w-[430px]
                    rounded-full
                    bg-secondary/10
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-24
                    top-0
                    h-[310px]
                    w-[310px]
                    rotate-12
                    rounded-[80px]
                    bg-white/30
                    blur-sm
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    -bottom-24
                    left-[30%]
                    h-[230px]
                    w-[360px]
                    rounded-full
                    bg-primary/5
                    blur-[60px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    min-h-[330px]
                    max-w-[1450px]
                    items-center
                    gap-10
                    px-5
                    py-14

                    sm:px-8

                    lg:grid-cols-[1.15fr_0.85fr]
                    lg:px-12

                    xl:px-16
                "
            >
                {/* LEFT */}
                <div>
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <span
                            className="
                                h-[2px]
                                w-9
                                bg-primary
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.32em]
                                text-slate-700
                            "
                        >
                            Privacy Policy
                        </span>
                    </div>

                    <h1
                        className="
                            max-w-[640px]
                            text-4xl
                            font-black
                            leading-[1.04]
                            tracking-[-0.04em]
                            text-[#07365c]

                            sm:text-5xl
                            lg:text-[58px]
                        "
                    >
                        Your Privacy
                        <span
                            className="
                                mt-1
                                block
                                text-primary
                            "
                        >
                            Our Commitment
                        </span>
                    </h1>

                    <p
                        className="
                            mt-5
                            max-w-[620px]
                            text-[15px]
                            font-medium
                            leading-7
                            text-slate-600

                            sm:text-base
                        "
                    >
                        We respect your trust and are
                        committed to protecting your
                        personal information at every
                        step of your study abroad
                        journey.
                    </p>

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.28em]
                            text-[#164567]
                        "
                    >
                        <span>Safe</span>
                        <span className="text-primary">
                            •
                        </span>
                        <span>Transparent</span>
                        <span className="text-primary">
                            •
                        </span>
                        <span>Responsible</span>
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    className="
                        relative
                        hidden
                        min-h-[220px]

                        lg:block
                    "
                >
                    <div
                        className="
                            absolute
                            left-[8%]
                            top-[18%]
                            -rotate-6
                            text-center
                            font-medium
                            italic
                            text-secondary
                        "
                    >
                        <p
                            className="
                                text-2xl
                                leading-tight
                            "
                        >
                            Global Opportunities
                        </p>

                        <p
                            className="
                                text-2xl
                                leading-tight
                            "
                        >
                            Brighter Futures
                        </p>

                        <span
                            className="
                                mx-auto
                                mt-3
                                block
                                h-[3px]
                                w-24
                                -rotate-6
                                bg-primary
                            "
                        />
                    </div>

                    <div
                        className="
                            absolute
                            right-[8%]
                            top-[20%]
                            flex
                            items-center
                            gap-8
                        "
                    >
                        <div
                            className="
                                h-[145px]
                                w-px
                                bg-slate-300
                            "
                        />

                        <div
                            className="
                                space-y-4
                                text-sm
                                font-bold
                                text-[#174567]
                            "
                        >
                            <p>Your Data</p>
                            <p>Our Responsibility</p>
                            <p>A Safer Tomorrow</p>

                            <span
                                className="
                                    block
                                    h-[2px]
                                    w-10
                                    bg-primary
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}