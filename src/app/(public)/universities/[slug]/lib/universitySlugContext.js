import {
    cache,
} from "react";

import {
    createSlug,
} from "@/lib/slug";

import {
    cleanId,
    getDestinationName,
    normalizeSlug,
} from "./universityHelpers";

import {
    getDestinations,
} from "./universityApi";
import {
    normalizeCountrySlug,
} from "./universityHelpers";

/* =========================================================
   NORMALIZE DESTINATIONS
========================================================= */

const getNormalizedDestinations =
    cache(
        async () => {
            const destinations =
                await getDestinations();

            return destinations
                .map(
                    (
                        destination
                    ) => {
                        const name =
                            getDestinationName(
                                destination
                            );

                        const slug =
                            normalizeCountrySlug(
                                name
                            );

                        const id =
                            cleanId(
                                destination?.d_id ??
                                destination?.id ??
                                destination
                                    ?.destination_id ??
                                destination
                                    ?.destinationId ??
                                ""
                            );

                        return {
                            id,
                            name,
                            slug,
                            destination,
                        };
                    }
                )
                .filter(
                    (
                        item
                    ) =>
                        item.name &&
                        item.slug
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b.slug.length -
                        a.slug.length
                );
        }
    );
/* =========================================================
   GET UNIVERSITY SLUG CONTEXT

   Example:

   griffith-college-australia

   becomes:

   {
       slug: "griffith-college-australia",
       nameSlug: "griffith-college",
       countrySlug: "australia",
       countryName: "Australia",
       countryId: "..."
   }

   Longest country slug is checked first.

   This is important for:
   new-zealand
   united-kingdom
   united-states
========================================================= */

export const getUniversitySlugContext =
    cache(
        async (
            rawSlug
        ) => {
            const slug =
                normalizeSlug(
                    rawSlug
                );

            if (!slug) {
                return null;
            }

            const countries =
                await getNormalizedDestinations();

            for (
                const country of
                countries
            ) {
                const suffix =
                    `-${country.slug}`;

                if (
                    !slug.endsWith(
                        suffix
                    )
                ) {
                    continue;
                }

                const nameSlug =
                    slug
                        .slice(
                            0,
                            -suffix.length
                        )
                        .replace(
                            /-+$/,
                            ""
                        );

                if (!nameSlug) {
                    continue;
                }

                return {
                    slug,

                    nameSlug,

                    countryId:
                        country.id,

                    countryName:
                        country.name,

                    countrySlug:
                        country.slug,

                    destination:
                        country.destination,
                };
            }

            /* =================================================
               LEGACY NAME-ONLY URL

               Example:
               /universities/griffith-college

               This may be ambiguous.
            ================================================= */

            return {
                slug,

                nameSlug:
                    slug,

                countryId:
                    "",

                countryName:
                    "",

                countrySlug:
                    "",

                destination:
                    null,
            };
        }
    );

/* =========================================================
   RESOLVE DESTINATION

   Allows:

   /universities/australia

   to be identified as a destination so page.jsx can
   redirect to:

   /universities-in-australia
========================================================= */

export const resolveDestination =
    cache(
        async (
            rawSlug
        ) => {
            const slug =
                normalizeSlug(
                    rawSlug
                );

            if (!slug) {
                return null;
            }

            const countries =
                await getNormalizedDestinations();

            const match =
                countries.find(
                    (
                        country
                    ) =>
                        country.slug ===
                        slug
                );

            if (!match) {
                return null;
            }

            if (
                !match.id ||
                !match.name
            ) {
                return null;
            }

            return {
                id:
                    match.id,

                name:
                    match.name,

                slug:
                    match.slug,

                destination:
                    match.destination,
            };
        }
    );