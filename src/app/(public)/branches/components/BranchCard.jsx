import Image from "next/image";

import {
    ArrowUpRight,
    BookOpenText,
    Building2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function BranchCard({
    center,
    index,
}) {
    const branchNumber = String(
        index + 1
    ).padStart(2, "0");

    return (
        <article
            className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_28px_70px_rgba(99,26,51,0.16)]"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-primary/15"
            />

            <div className="relative p-2.5">
                <div
                    className="relative h-[220px] overflow-hidden rounded-[22px] sm:h-[240px] lg:h-[225px]"
                >
                    <Image
                        src={center.image}
                        alt={`${center.name} branch`}
                        fill
                        sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 50vw,
              33vw
            "
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <span
                        className="absolute left-4 top-4 inline-flex h-11 min-w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/95 px-2.5 text-sm font-extrabold text-primary shadow-[0_10px_25px_rgba(15,23,42,0.18)] backdrop-blur-md"
                    >
                        {branchNumber}
                    </span>

                    <div
                        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                    >
                        <Building2 className="h-3.5 w-3.5" />
                        Medcity Center
                    </div>

                    {center.mapLink && (
                        <a
                            href={center.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${center.name} on Google Maps`}
                            className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_25px_rgba(15,23,42,0.25)] transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
                        >
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </div>

            <div className="relative flex flex-1 flex-col px-5 pb-5 pt-2">
                <div className="mb-4">
                    <p
                        className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
                    >
                        Visit our branch
                    </p>

                    <h2
                        className="text-xl font-extrabold leading-snug text-darkPrimary transition-colors duration-300 group-hover:text-primary"
                    >
                        {center.name}
                    </h2>

                    <div
                        aria-hidden="true"
                        className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-24"
                    />
                </div>

                <div className="space-y-3">
                    <div
                        className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3.5 py-3 transition-colors duration-300 hover:bg-primary/5"
                    >
                        <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                        >
                            <MapPin className="h-4 w-4" />
                        </span>

                        <address className="pt-1 text-sm not-italic leading-6 text-slate-600">
                            {center.address}
                        </address>
                    </div>

                    {center.phones?.length > 0 && (
                        <div
                            className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3.5 py-3 transition-colors duration-300 hover:bg-secondary/5"
                        >
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
                            >
                                <Phone className="h-4 w-4" />
                            </span>

                            <div className="flex flex-wrap gap-x-1 pt-1 text-sm leading-6">
                                {center.phones.map(
                                    (phone, phoneIndex) => (
                                        <span
                                            key={`${phone}-${phoneIndex}`}
                                        >
                                            <a
                                                href={`tel:${phone.replace(
                                                    /[^\d+]/g,
                                                    ""
                                                )}`}
                                                className="font-semibold text-secondary transition-colors hover:text-darkPrimary hover:underline"
                                            >
                                                {phone}
                                            </a>

                                            {phoneIndex <
                                                center.phones.length - 1 &&
                                                ", "}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {center.email && (
                        <div
                            className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3.5 py-3 transition-colors duration-300 hover:bg-primary/5"
                        >
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                            >
                                <Mail className="h-4 w-4" />
                            </span>

                            <a
                                href={`mailto:${center.email}`}
                                className="min-w-0 break-all pt-1 text-sm font-semibold leading-6 text-secondary transition-colors hover:text-darkPrimary hover:underline"
                            >
                                {center.email}
                            </a>
                        </div>
                    )}
                </div>

                <div
                    className="mt-5 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/[0.07] via-white to-secondary/[0.07] p-4"
                >
                    <div className="flex items-start gap-3">
                        <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm"
                        >
                            <BookOpenText className="h-4 w-4" />
                        </span>

                        <p className="text-xs leading-5 text-slate-600">
                            <span className="block font-bold text-slate-900">
                                Courses Offered
                            </span>

                            German, PTE, OET, IELTS, NCLEX-RN
                            and more.
                        </p>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-pink-500 to-secondary transition-transform duration-500 group-hover:scale-x-100"
            />
        </article>
    );
}