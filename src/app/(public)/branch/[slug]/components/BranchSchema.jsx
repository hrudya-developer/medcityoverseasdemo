export default function BranchSchema({
    center,
}) {
    const SITE_URL =
        "https://medcityoverseas.com";

    const location =
        center.seoLocation ||
        center.city;

    const url =
        `${SITE_URL}/branch/${center.slug}`;

    const image =
        typeof center.image === "string"
            ? center.image
            : center.image?.src;

    const schema = {
        "@context":
            "https://schema.org",

        "@type":
            "EducationalOrganization",

        "@id":
            `${url}#branch`,

        name:
            center.name,

        url,

        description:
            center.seoDescription,

        ...(image && {
            image,
        }),

        telephone:
            center.phones?.[0],

        email:
            center.email,

        address: {
            "@type":
                "PostalAddress",

            streetAddress:
                center.address,

            addressLocality:
                center.city,

            addressRegion:
                center.state,

            postalCode:
                center.postalCode,

            addressCountry:
                "IN",
        },

        areaServed: [
            {
                "@type":
                    "City",
                name:
                    location,
            },
            {
                "@type":
                    "AdministrativeArea",
                name:
                    center.district,
            },
            {
                "@type":
                    "State",
                name:
                    center.state,
            },
        ],

        parentOrganization: {
            "@type":
                "EducationalOrganization",

            name:
                "Medcity Overseas",

            url:
                SITE_URL,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    JSON.stringify(
                        schema
                    ),
            }}
        />
    );
}