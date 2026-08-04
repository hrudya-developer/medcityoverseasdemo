import {
    Bell,
    Globe2,
    Heart,
    Megaphone,
    MessageCircle,
    Users,
} from "lucide-react";

const communityFeatures = [
    {
        id: "stories",
        icon: Users,
        title: "Real Stories",
        text: "From our community",
    },
    {
        id: "updates",
        icon: Megaphone,
        title: "Latest Updates",
        text: "News and opportunities",
    },
    {
        id: "network",
        icon: Globe2,
        title: "Global Network",
        text: "Connect and grow",
    },
];

export default function CommunityHero() {
    return (
        <section
            aria-labelledby="community-posts-heading"
            className="
                relative mx-auto
                max-w-[1600px]
                overflow-hidden
                bg-gradient-to-r
                from-pink-50
                via-rose-50
                to-pink-200
                px-4 py-12
                sm:px-6
                md:px-10
                lg:px-14
                lg:py-16
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute right-0 top-0
                    h-full w-1/2
                    bg-pink-300/20
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute bottom-0 right-0
                    h-24 w-2/3
                    rounded-tl-full
                    bg-pink-300/30
                "
            />

            <div
                className="
                    relative z-10
                    mx-auto grid
                    max-w-7xl
                    items-center gap-10
                    lg:grid-cols-[1.1fr_0.9fr]
                "
            >
                <div>
                    <div
                        className="
                            mb-4 inline-flex
                            items-center gap-2
                            rounded-full
                            border border-pink-300
                            bg-white/70
                            px-4 py-2
                            text-sm font-bold
                            text-pink-600
                            shadow-sm
                            backdrop-blur-sm
                        "
                    >
                        <Bell
                            size={16}
                            aria-hidden="true"
                        />

                        Stay Updated
                    </div>

                    <h1
                        id="community-posts-heading"
                        className="
                            text-3xl font-extrabold
                            leading-tight
                            text-[#6b123b]
                            md:text-5xl
                        "
                    >
                        Study Abroad{" "}
                        <span className="text-primary">
                            Community Posts
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4 max-w-2xl
                            text-base leading-7
                            text-slate-600
                            md:text-lg
                        "
                    >
                        Explore the latest study
                        abroad updates, student
                        stories, opportunities and
                        announcements shared by the
                        Medcity global community.
                    </p>

                    <div
                        className="
                            mt-8 grid gap-4
                            sm:grid-cols-3
                        "
                    >
                        {communityFeatures.map(
                            ({
                                id,
                                icon: Icon,
                                title,
                                text,
                            }) => (
                                <Feature
                                    key={id}
                                    icon={
                                        <Icon
                                            size={
                                                20
                                            }
                                            aria-hidden="true"
                                        />
                                    }
                                    title={
                                        title
                                    }
                                    text={text}
                                />
                            )
                        )}
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="
                        relative hidden
                        min-h-[300px]
                        lg:block
                    "
                >
                    <div
                        className="
                            absolute left-1/2
                            top-1/2
                            grid size-40
                            -translate-x-1/2
                            -translate-y-1/2
                            place-items-center
                            rounded-full
                            bg-white
                            shadow-2xl
                            shadow-pink-900/10
                        "
                    >
                        <div
                            className="
                                grid size-32
                                place-items-center
                                rounded-full
                                bg-gradient-to-br
                                from-pink-400
                                to-primary
                                text-white
                                shadow-lg
                            "
                        >
                            <Users size={56} />
                        </div>
                    </div>

                    <div
                        className="
                            absolute right-24 top-5
                            rotate-12
                            rounded-2xl
                            bg-white p-4
                            text-pink-500
                            shadow-xl
                        "
                    >
                        <Heart
                            size={27}
                            fill="currentColor"
                        />
                    </div>

                    <div
                        className="
                            absolute bottom-8
                            right-32
                            -rotate-6
                            rounded-2xl
                            bg-white p-4
                            text-pink-500
                            shadow-xl
                        "
                    >
                        <MessageCircle
                            size={27}
                            fill="currentColor"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

function Feature({
    icon,
    title,
    text,
}) {
    return (
        <article
            className="
                flex items-center gap-3
                rounded-2xl
                border border-white/80
                bg-white/70
                p-3 shadow-sm
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-md
            "
        >
            <div
                className="
                    grid size-11
                    shrink-0
                    place-items-center
                    rounded-full
                    bg-pink-100
                    text-pink-600
                "
            >
                {icon}
            </div>

            <div>
                <h2
                    className="
                        text-sm font-bold
                        text-[#6b123b]
                    "
                >
                    {title}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                    {text}
                </p>
            </div>
        </article>
    );
}