import {
    Globe2,
    ShieldCheck,
    UserCog,
    Users,
} from "lucide-react";

const items = [
    {
        title: "Secure",
        description:
            "Your data is protected with industry-leading security measures.",
        icon: ShieldCheck,
        wrapper:
            "bg-[#fff0f4]",
        iconColor:
            "text-primary",
    },
    {
        title: "Transparent",
        description:
            "We clearly explain how your information is used.",
        icon: Users,
        wrapper:
            "bg-[#eaf5ff]",
        iconColor:
            "text-secondary",
    },
    {
        title: "Your Control",
        description:
            "You have the right to access, update, or delete your information.",
        icon: UserCog,
        wrapper:
            "bg-[#e8faf3]",
        iconColor:
            "text-emerald-600",
    },
    {
        title: "A Brighter Future",
        description:
            "Your trust helps us support students worldwide.",
        icon: Globe2,
        wrapper:
            "bg-[#fff5dc]",
        iconColor:
            "text-amber-600",
    },
];

export default function PrivacyTrustGrid() {
    return (
        <div
            className="
                mt-10
                grid
                gap-8

                sm:grid-cols-2
                lg:grid-cols-4
            "
        >
            {items.map(
                ({
                    title,
                    description,
                    icon: Icon,
                    wrapper,
                    iconColor,
                }) => (
                    <article
                        key={title}
                        className="
                            text-center
                        "
                    >
                        <div
                            className={`
                                mx-auto
                                grid
                                h-16
                                w-16
                                place-items-center
                                rounded-full
                                ${wrapper}
                            `}
                        >
                            <Icon
                                size={30}
                                strokeWidth={1.9}
                                className={
                                    iconColor
                                }
                            />
                        </div>

                        <h3
                            className="
                                mt-4
                                text-sm
                                font-black
                                text-[#07365c]
                            "
                        >
                            {title}
                        </h3>

                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-[210px]
                                text-xs
                                font-medium
                                leading-5
                                text-slate-500
                            "
                        >
                            {description}
                        </p>
                    </article>
                )
            )}
        </div>
    );
}