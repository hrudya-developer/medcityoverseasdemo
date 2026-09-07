import {
    Clock3,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function BranchContactBar({
    center,
}) {
    return (
        <section className="relative z-10 -mt-4 px-5 sm:px-6">
            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-100
                    bg-white
                    shadow-xl
                    shadow-slate-900/5
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >
                <ContactItem
                    icon={Phone}
                    title={
                        center.phones?.[0] ||
                        "Contact Us"
                    }
                    subtitle="Call our branch"
                    href={
                        center.phones?.[0]
                            ? `tel:${center.phones[0].replace(
                                  /\s+/g,
                                  ""
                              )}`
                            : undefined
                    }
                />

                <ContactItem
                    icon={Mail}
                    title={
                        center.email ||
                        "Email Us"
                    }
                    subtitle="Send an enquiry"
                    href={
                        center.email
                            ? `mailto:${center.email}`
                            : undefined
                    }
                />

                <ContactItem
                    icon={Clock3}
                    title="Monday - Saturday"
                    subtitle="Branch working days"
                />

                <ContactItem
                    icon={MapPin}
                    title={center.city}
                    subtitle={`${center.district}, ${center.state}`}
                />
            </div>
        </section>
    );
}

function ContactItem({
    icon: Icon,
    title,
    subtitle,
    href,
}) {
    const content = (
        <>
            <span
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                "
            >
                <Icon size={20} />
            </span>

            <div className="min-w-0">
                <p
                    className="
                        break-words
                        text-sm
                        font-bold
                        text-darkPrimary
                    "
                >
                    {title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    {subtitle}
                </p>
            </div>
        </>
    );

    const classes = `
        flex
        items-center
        gap-4
        border-b
        border-slate-100
        p-6
        transition
        sm:border-r
        lg:border-b-0
    `;

    if (href) {
        return (
            <a
                href={href}
                className={`${classes} hover:bg-slate-50`}
            >
                {content}
            </a>
        );
    }

    return (
        <div className={classes}>
            {content}
        </div>
    );
}