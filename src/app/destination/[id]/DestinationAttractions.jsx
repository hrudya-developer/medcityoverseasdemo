import {
    Landmark,
    MapPin,
} from "lucide-react";

const normalizeAttraction = (
    attraction,
    index
) => {
    if (
        typeof attraction === "string" ||
        typeof attraction === "number"
    ) {
        return {
            id: `attraction-${index}`,
            name: String(attraction),
            description: "",
        };
    }

    return {
        id:
            attraction?.id ??
            attraction?.attraction_id ??
            `attraction-${index}`,

        name:
            attraction?.name ??
            attraction?.title ??
            attraction?.attraction_name ??
            attraction?.place ??
            "Popular attraction",

        description:
            attraction?.description ??
            attraction?.details ??
            attraction?.content ??
            "",
    };
};

export default function DestinationAttractions({
    attractions = [],
}) {
    if (!Array.isArray(attractions)) {
        return null;
    }

    const normalizedAttractions =
        attractions
            .map(normalizeAttraction)
            .filter(
                (attraction) =>
                    attraction.name
            );

    if (!normalizedAttractions.length) {
        return null;
    }

    return (
        <section
            aria-labelledby="destination-attractions-heading"
            className="
                bg-[#fffafb]
                py-12 sm:py-14
            "
        >
            <div
                className="
                    mx-auto max-w-7xl
                    px-4 sm:px-6 lg:px-8
                "
            >
                <header className="mx-auto max-w-3xl text-center">
                    <p
                        className="
                            text-xs font-black
                            uppercase tracking-[0.16em]
                            text-primary
                        "
                    >
                        Explore the Country
                    </p>

                    <h2
                        id="destination-attractions-heading"
                        className="
                            mt-3 text-3xl font-black
                            text-darkPrimary
                            sm:text-4xl
                        "
                    >
                        Popular Places and Attractions
                    </h2>
                </header>

                <div
                    className="
                        mt-9 grid gap-5
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {normalizedAttractions.map(
                        (attraction) => (
                            <article
                                key={attraction.id}
                                className="
                                    group rounded-[24px]
                                    border border-slate-200
                                    bg-white p-5
                                    shadow-sm
                                    transition-all
                                    hover:-translate-y-1
                                    hover:border-primary/20
                                    hover:shadow-xl
                                "
                            >
                                <span
                                    className="
                                        grid size-12
                                        place-content-center
                                        rounded-2xl
                                        bg-primary/10
                                        text-primary
                                        transition-all
                                        group-hover:bg-primary
                                        group-hover:text-white
                                    "
                                >
                                    <Landmark size={22} />
                                </span>

                                <h3
                                    className="
                                        mt-4 text-lg font-black
                                        text-darkPrimary
                                    "
                                >
                                    {String(
                                        attraction.name
                                    )}
                                </h3>

                                {attraction.description && (
                                    <p
                                        className="
                                            mt-2 text-sm
                                            leading-6
                                            text-slate-600
                                        "
                                    >
                                        {String(
                                            attraction.description
                                        )}
                                    </p>
                                )}

                                <div
                                    className="
                                        mt-4 flex items-center
                                        gap-2 text-xs font-bold
                                        text-primary
                                    "
                                >
                                    <MapPin size={14} />
                                    Popular destination
                                </div>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}