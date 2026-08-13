import {
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
    UserRoundCheck,
} from "lucide-react";

export default function ProfileHeader({
    email,
}) {
    return (
        <aside
            className="
                relative
                overflow-hidden

                bg-gradient-to-br
                from-[#280915]
                via-[#631A33]
                to-[#9e1b4a]

                px-6
                py-6

                text-white

                sm:px-8
                sm:py-7

                lg:flex
                lg:flex-col
                lg:justify-between
                lg:px-10
                lg:py-12
            "
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-20

                    h-72
                    w-72

                    rounded-full
                    bg-pink-300/20
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-20

                    hidden
                    h-72
                    w-72

                    rounded-full
                    bg-blue-500/20
                    blur-3xl

                    lg:block
                "
            />

            {/* Grid */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0

                    opacity-[0.08]

                    bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]
                    bg-[size:32px_32px]
                "
            />

            <div className="relative">
                {/* Desktop badge */}
                <div
                    className="
                        mb-6
                        hidden

                        items-center
                        gap-2

                        rounded-full

                        border
                        border-white/15

                        bg-white/10

                        px-3.5
                        py-2

                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]

                        backdrop-blur-xl

                        lg:inline-flex
                    "
                >
                    <Sparkles
                        size={13}
                        className="text-[#F7EC22]"
                    />

                    Student Registration
                </div>

                {/* Heading - visible on all screens */}
                <h1
                    className="
                        relative

                        text-2xl
                        font-black
                        leading-tight
                        tracking-[-0.035em]

                        sm:text-3xl

                        lg:max-w-md
                        lg:text-4xl
                        lg:leading-[1.08]

                        xl:text-[42px]
                    "
                >
                    Build your{" "}

                    <span
                        className="
                            text-[#F7EC22]

                            lg:block
                        "
                    >
                        student profile.
                    </span>
                </h1>

                {/* Everything below is desktop only */}
                <div className="hidden lg:block">
                    <p
                        className="
                            mt-5
                            max-w-md

                            text-sm
                            leading-7

                            text-white/65
                        "
                    >
                        Complete your personal
                        details once and continue
                        to your student dashboard.
                    </p>

                    {email && (
                        <div
                            className="
                                mt-7

                                flex
                                items-center
                                gap-3

                                rounded-2xl

                                border
                                border-white/15

                                bg-white/[0.08]

                                p-4

                                backdrop-blur-xl
                            "
                        >
                            <div
                                className="
                                    grid
                                    h-11
                                    w-11

                                    shrink-0
                                    place-items-center

                                    rounded-xl

                                    bg-emerald-400/15

                                    text-emerald-300
                                "
                            >
                                <ShieldCheck
                                    size={20}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p
                                    className="
                                        text-[9px]
                                        font-black
                                        uppercase
                                        tracking-[0.12em]

                                        text-white/45
                                    "
                                >
                                    Verified Login
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate

                                        text-sm
                                        font-bold

                                        text-white
                                    "
                                >
                                    {email}
                                </p>
                            </div>

                            <CheckCircle2
                                size={18}
                                className="
                                    shrink-0
                                    text-emerald-300
                                "
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop bottom features */}
            <div
                className="
                    relative
                    mt-10

                    hidden
                    space-y-3

                    lg:block
                "
            >
                <Feature
                    icon={UserRoundCheck}
                    title="Personalized account"
                    text="Your profile helps us tailor your student experience."
                />

                <Feature
                    icon={LockKeyhole}
                    title="Secure information"
                    text="Your details remain linked to your verified login session."
                />
            </div>
        </aside>
    );
}

function Feature({
    icon: Icon,
    title,
    text,
}) {
    return (
        <div
            className="
                flex
                items-start
                gap-3

                rounded-2xl

                border
                border-white/10

                bg-black/10

                p-4

                backdrop-blur-lg
            "
        >
            <div
                className="
                    grid
                    h-10
                    w-10

                    shrink-0
                    place-items-center

                    rounded-xl

                    bg-white/10

                    text-[#F7EC22]
                "
            >
                <Icon size={18} />
            </div>

            <div className="min-w-0">
                <p className="text-sm font-bold">
                    {title}
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        leading-5
                        text-white/50
                    "
                >
                    {text}
                </p>
            </div>
        </div>
    );
}