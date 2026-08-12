import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
} from "lucide-react";

import {
    buildImageUrl,
    FALLBACK_IMAGE,
} from "./germanProgramsHelpers";

export default function GermanProgramCard({
    item,
    imagePath,
}) {
    const programName =
        item?.name ||
        "German Program";

    const mainImage =
        buildImageUrl(
            imagePath,
            item?.icon
        );

    const secondaryImage =
        item?.image
            ? buildImageUrl(
                imagePath,
                item.image
            )
            : "";

    return (
        <article
            className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(99,26,51,0.18)]"
        >
            <div
                className="relative h-56 overflow-hidden bg-slate-100 sm:h-64"
            >
                <Image
                    src={
                        mainImage ||
                        FALLBACK_IMAGE
                    }
                    alt={`${programName} German study program`}
                    fill
                    sizes="
                        (max-width: 639px) 100vw,
                        (max-width: 1023px) 50vw,
                        33vw
                    "
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />

                {secondaryImage && (
                    <div
                        className="absolute left-5 top-5 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl"
                    >
                        <Image
                            src={
                                secondaryImage
                            }
                            alt=""
                            fill
                            sizes="80px"
                            className="object-contain"
                        />
                    </div>
                )}
            </div>

            <div
                className="flex flex-1 flex-col p-6"
            >
                <h3
                    className="text-2xl font-extrabold text-slate-950"
                >
                    {programName}
                </h3>

                <div
                    aria-hidden="true"
                    className="mt-3 h-1 w-14 rounded-full bg-primary"
                />

                {item?.titleWhy && (
                    <p
                        className="mt-4 text-xs font-bold uppercase tracking-widest text-primary"
                    >
                        {item.titleWhy}
                    </p>
                )}

                {item?.why && (
                    <p
                        className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600"
                    >
                        {item.why}
                    </p>
                )}

                <Link
                    href={`/germanPrograms/${item?.id}`}
                    aria-label={`Explore ${programName}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-bold text-primary transition hover:text-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Explore Program

                    <ArrowRight
                        aria-hidden="true"
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </div>

            <div
                aria-hidden="true"
                className="h-2 bg-darkPrimary"
            />
        </article>
    );
}