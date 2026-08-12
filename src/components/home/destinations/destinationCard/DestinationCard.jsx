import Link from "next/link";

import DestinationContent from "./DestinationContent";
import DestinationImage from "./DestinationImage";

import {
    buildDestinationImageUrl,
    getDestinationId,
    getDestinationName,
} from "./destinationHelpers";

const FALLBACK_IMAGE =
    "/assets/destination-fallback.webp";

export default function DestinationCard({
    destination,
    imagePath,
    index,
}) {
    const country =
        getDestinationName(destination);

    const destinationId =
        getDestinationId(
            destination,
            index
        );

    const countryImage =
        buildDestinationImageUrl(
            imagePath,
            destination?.image
        ) || FALLBACK_IMAGE;

    const flagImage =
        buildDestinationImageUrl(
            imagePath,
            destination?.flag
        );

    const headingId =
        `destination-${destinationId}`;

    return (
        <Link
            href={`/destination/${destinationId}`}
            aria-label={`Explore study opportunities in ${country}`}
            className="block h-full py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        >
            <article
                aria-labelledby={headingId}
                className="group relative mx-auto flex h-full min-h-[470px] w-full max-w-[430px] flex-col overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.09)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_28px_70px_rgba(99,26,51,0.18)] sm:rounded-[30px]"
            >
                <DestinationImage
                    country={country}
                    countryImage={countryImage}
                    flagImage={flagImage}
                    index={index}
                />

                <DestinationContent
                    country={country}
                    headingId={headingId}
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-primary transition-transform duration-500 group-hover:scale-x-100"
                />
            </article>
        </Link>
    );
}