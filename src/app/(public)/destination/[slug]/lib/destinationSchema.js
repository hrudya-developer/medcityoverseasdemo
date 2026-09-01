import {
  SITE_URL,
} from "./destinationSeo";

export function createDestinationSchema({
  seo,
  country,
  universities = [],
}) {
  return {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "WebPage",

        "@id":
          `${seo.pageUrl}#webpage`,

        url:
          seo.pageUrl,

        name:
          seo.h2,

        headline:
          seo.h2,

        description:
          seo.description,

        inLanguage:
          "en-IN",

        primaryImageOfPage: {
          "@id":
            `${seo.pageUrl}#primaryimage`,
        },

        isPartOf: {
          "@id":
            `${SITE_URL}/#website`,
        },

        publisher: {
          "@id":
            `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id":
            `${seo.pageUrl}#breadcrumb`,
        },

        about: {
          "@id":
            `${seo.pageUrl}#country`,
        },

        ...(universities.length >
          0 && {
          mainEntity: {
            "@id":
              `${seo.pageUrl}#universities`,
          },
        }),
      },

      {
        "@type":
          "ImageObject",

        "@id":
          `${seo.pageUrl}#primaryimage`,

        url:
          seo.image,

        contentUrl:
          seo.image,

        caption:
          seo.imageAlt,
      },

      {
        "@type":
          "Country",

        "@id":
          `${seo.pageUrl}#country`,

        name:
          seo.countryName,

        description:
          seo.description,

        image:
          seo.image,

        ...(country?.capital &&
          country.capital !==
            "N/A" && {
          capital:
            country.capital,
        }),

        ...(country?.continent &&
          country.continent !==
            "N/A" && {
          containedInPlace: {
            "@type":
              "Continent",

            name:
              country.continent,
          },
        }),
      },

      {
        "@type":
          "BreadcrumbList",

        "@id":
          `${seo.pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type":
              "ListItem",

            position: 1,

            name: "Home",

            item:
              SITE_URL,
          },

          {
            "@type":
              "ListItem",

            position: 2,

            name:
              "Study Destinations",

            item:
              `${SITE_URL}/destinations`,
          },

          {
            "@type":
              "ListItem",

            position: 3,

            name:
              `Study in ${seo.countryName}`,

            item:
              seo.pageUrl,
          },
        ],
      },

      ...(universities.length >
      0
        ? [
            {
              "@type":
                "ItemList",

              "@id":
                `${seo.pageUrl}#universities`,

              name:
                `Universities in ${seo.countryName}`,

              description:
                `Explore universities and study opportunities in ${seo.countryName} for international students.`,

              numberOfItems:
                universities.length,

              itemListOrder:
                "https://schema.org/ItemListOrderUnordered",

              itemListElement:
                universities.map(
                  (
                    university,
                    index
                  ) => ({
                    "@type":
                      "ListItem",

                    position:
                      index + 1,

                    item: {
                      "@type":
                        "CollegeOrUniversity",

                      name:
                        university.name,

                      ...(university.location && {
                        address: {
                          "@type":
                            "PostalAddress",

                          addressLocality:
                            university.location,

                          addressCountry:
                            seo.countryName,
                        },
                      }),
                    },
                  })
                ),
            },
          ]
        : []),
    ],
  };
}

export function serializeJsonLd(
  data
) {
  return JSON.stringify(
    data
  ).replace(
    /</g,
    "\\u003c"
  );
}