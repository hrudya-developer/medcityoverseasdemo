import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { offices } from "@/app/contact-us/data/offices";

const SITE_URL = "https://medcityoverseas.com";

const officesStructuredData = {
    "@context": "https://schema.org",
    "@graph": offices.map((office) => ({
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#office-${office.id}`,
        name: `${office.name} - ${office.type}`,

        parentOrganization: {
            "@id": `${SITE_URL}/#organization`,
        },

        telephone: office.phone,
        email: office.email,

        address: {
            "@type": "PostalAddress",
            streetAddress: office.address,
            addressLocality: office.locality,
            addressRegion: office.region,
            postalCode: office.postalCode,
            addressCountry: "IN",
        },
    })),
};

const ContactItem = ({
    icon: Icon,
    children,
    href,
    label,
    border = true,
}) => {
    const content = (
        <div
            className={`
        group flex items-start gap-4 py-4
        ${border
                    ? "border-b border-dashed border-primary/20"
                    : ""
                }
      `}
        >
            <span
                aria-hidden="true"
                className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-full
          bg-primary/10 text-primary
          transition-colors duration-300
          group-hover:bg-primary
          group-hover:text-white
        "
            >
                <Icon
                    className="h-5 w-5"
                    strokeWidth={2.2}
                />
            </span>

            <span className="pt-1 text-sm leading-6 text-slate-700 sm:text-base">
                {children}
            </span>
        </div>
    );

    if (!href) {
        return content;
    }

    return (
        <a
            href={href}
            aria-label={label}
            className="
        block rounded-lg
        transition-colors
        hover:text-primary
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
      "
        >
            {content}
        </a>
    );
};

const OfficeCard = ({ office }) => {
    return (
        <article
            className="
        group relative overflow-hidden
        rounded-2xl
        border border-primary/10
        bg-white
        shadow-[0_14px_35px_rgba(99,26,51,0.10)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(99,26,51,0.14)]
      "
        >
            <div className="relative min-h-[340px] sm:min-h-[360px]">
                <div className="relative z-10 px-5 py-6 sm:px-6 sm:py-7">
                    <div className="mb-3 flex items-center gap-2">
                        <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full bg-primary"
                        />

                        <p
                            className="
                text-[11px] font-extrabold
                uppercase tracking-[0.15em]
                text-primary
              "
                        >
                            {office.type}
                        </p>
                    </div>

                    <h3
                        className="
              text-xl font-extrabold
              leading-snug text-slate-900
              sm:text-2xl
            "
                    >
                        {office.name}
                    </h3>

                    <address className="mt-4 not-italic">
                        <ContactItem icon={MapPin}>
                            {office.address}
                        </ContactItem>

                        <ContactItem
                            icon={Phone}
                            href={`tel:${office.phoneLink}`}
                            label={`Call ${office.name}, ${office.type}`}
                        >
                            {office.phone}
                        </ContactItem>

                        <ContactItem
                            icon={Mail}
                            href={`mailto:${office.email}`}
                            label={`Email ${office.name}, ${office.type}`}
                            border={false}
                        >
                            {office.email}
                        </ContactItem>
                    </address>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="
          absolute inset-x-0 bottom-0
          h-1
          bg-gradient-to-r
          from-primary via-[#e1477c] to-darkPrimary
        "
            />
        </article>
    );
};

const ContactInfo = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        officesStructuredData
                    ).replace(/</g, "\\u003c"),
                }}
            />

            <section
                aria-labelledby="offices-heading"
                className="
          relative overflow-hidden
          bg-[#fffafb]
          px-4 py-16
          sm:px-6 sm:py-20
          lg:px-8
        "
            >
                <div
                    aria-hidden="true"
                    className="
            pointer-events-none absolute
            -left-24 -top-24
            h-80 w-80 rounded-full
            bg-primary/10 blur-3xl
          "
                />

                <div
                    aria-hidden="true"
                    className="
            pointer-events-none absolute
            -bottom-24 -right-24
            h-80 w-80 rounded-full
            bg-secondary/10 blur-3xl
          "
                />

                <div
                    aria-hidden="true"
                    className="
            pointer-events-none absolute
            left-4 top-8
            grid grid-cols-4 gap-2
            opacity-20
          "
                >
                    {Array.from({ length: 16 }).map(
                        (_, index) => (
                            <span
                                key={index}
                                className="h-2 w-2 rounded-full bg-primary"
                            />
                        )
                    )}
                </div>

                <div className="relative mx-auto max-w-6xl">
                    <header className="mx-auto mb-12 max-w-3xl text-center">
                        <h2
                            id="offices-heading"
                            className="
                text-3xl font-extrabold
                leading-tight text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
                        >
                            Our{" "}
                            <span className="text-primary">
                                Offices
                            </span>
                        </h2>

                        <div
                            aria-hidden="true"
                            className="
                mx-auto mt-4
                flex max-w-sm
                items-center gap-3
              "
                        >
                            <span className="h-px flex-1 bg-primary/25" />
                            <span className="h-3 w-3 rotate-45 bg-primary" />
                            <span className="h-px flex-1 bg-primary/25" />
                        </div>

                        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                            We’re here to support you throughout
                            your global education journey.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {offices.map((office) => (
                            <OfficeCard
                                key={office.id}
                                office={office}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactInfo;