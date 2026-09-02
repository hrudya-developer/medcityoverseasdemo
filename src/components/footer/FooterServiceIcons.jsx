import {
    BriefcaseBusiness,
    GraduationCap,
    Plane,
} from "lucide-react";

const footerIcons = [
    {
        id: 1,
        label: "Study abroad",
        icon: GraduationCap,
    },
    {
        id: 2,
        label: "Work abroad",
        icon: BriefcaseBusiness,
    },
    {
        id: 3,
        label: "Travel abroad",
        icon: Plane,
    },
];

export default function FooterServiceIcons() {
    return (
        <div
            className="
                mt-7
                flex
                items-center
                justify-center
                gap-3

                lg:justify-start
            "
            aria-label="Our services"
        >
            {footerIcons.map(
                (
                    item,
                    index
                ) => {
                    const Icon =
                        item.icon;

                    return (
                        <div
                            key={
                                item.id
                            }
                            className="contents"
                        >
                            <div
                                role="img"
                                aria-label={
                                    item.label
                                }
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-white
                                    text-darkPrimary
                                    shadow-lg
                                    shadow-black/20
                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:bg-logoYellow

                                    sm:h-12
                                    sm:w-12

                                    lg:h-14
                                    lg:w-14
                                "
                            >
                                <Icon
                                    aria-hidden="true"
                                    className="
                                        h-5
                                        w-5

                                        sm:h-6
                                        sm:w-6
                                    "
                                />
                            </div>

                            {index <
                                footerIcons.length -
                                    1 && (
                                <span
                                    aria-hidden="true"
                                    className="
                                        h-8
                                        w-px
                                        bg-white/20

                                        sm:h-10
                                    "
                                />
                            )}
                        </div>
                    );
                }
            )}
        </div>
    );
}