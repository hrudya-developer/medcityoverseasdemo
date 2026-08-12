import Image from "next/image";

import {
    Globe2,
} from "lucide-react";

export default function CountryFlag({
    country,
    flagImage,
}) {
    return (
        <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-[3px] border-white bg-white shadow-[0_12px_28px_rgba(0,0,0,0.30)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl"
        >
            {flagImage ? (
                <Image
                    src={flagImage}
                    alt={`${country} flag`}
                    fill
                    sizes="56px"
                    className="object-cover p-0.5"
                />
            ) : (
                <Globe2
                    aria-hidden="true"
                    className="h-6 w-6 text-secondary"
                />
            )}
        </div>
    );
}