"use client";

import Image from "next/image";

import {
    ArrowUpRight,
    CheckCircle2,
    HandHelping,
    Sparkles,
} from "lucide-react";

const getServiceName = (service) =>
    String(
        service?.name ||
        service?.service ||
        service?.service_name ||
        service?.title ||
        service?.service_title ||
        "Study Abroad Support Service"
    ).trim();

const getServiceDescription = (
    service
) =>
    String(
        service?.description ||
        service?.service_description ||
        service?.short_description ||
        service?.details ||
        service?.content ||
        "Get professional support throughout your study abroad journey."
    ).trim();

export default function AddOnServiceCard({
    service,
    imageUrl = "",
    featured = false,
    priority = false,
    serviceId,
}) {
    const serviceName =
        getServiceName(service);

    const description =
        getServiceDescription(service);

    const hasImage = Boolean(imageUrl);

    return (
        <article
            id={serviceId}
            itemScope
            itemType="https://schema.org/Service"
            className="group relative flex h-full w-full max-w-[430px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_24px_60px_rgba(192,31,83,0.16)]"
        >
            <meta
                itemProp="provider"
                content="Medcity Study Abroad"
            />

            <div
                className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary/[0.06]"
            >
                {hasImage ? (
                    <Image
                        itemProp="image"
                        src={imageUrl}
                        alt={`${serviceName} by Medcity Study Abroad`}
                        fill
                        priority={priority}
                        unoptimized
                        sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            430px
                        "
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <ServiceFallback />
                )}

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/10 to-transparent"
                />

                <div
                    className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-xs font-bold text-darkPrimary shadow-md backdrop-blur-md"
                >
                    {featured ? (
                        <>
                            <Sparkles
                                aria-hidden="true"
                                className="size-3.5 text-primary"
                            />

                            Featured Service
                        </>
                    ) : (
                        <>
                            <CheckCircle2
                                aria-hidden="true"
                                className="size-3.5 text-secondary"
                            />

                            Student Support
                        </>
                    )}
                </div>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-14 -right-12 size-36 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
            </div>

            <div
                className="relative flex flex-1 flex-col p-6"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-secondary/[0.06] blur-3xl"
                />

                <h2
                    itemProp="name"
                    className="relative text-xl font-extrabold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-primary"
                >
                    {serviceName}
                </h2>

                <p
                    itemProp="description"
                    className="relative mt-3 line-clamp-4 text-sm leading-7 text-slate-600"
                >
                    {description}
                </p>

                <div
                    aria-label="Service benefits"
                    className="relative mt-5 flex flex-wrap gap-2"
                >
                    <span
                        className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                    >
                        Expert Guidance
                    </span>

                    <span
                        className="rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary"
                    >
                        Personal Support
                    </span>
                </div>

                <div className="relative mt-auto pt-6">
                    <a
                        href="tel:+918943280333"
                        aria-label={`Call Medcity Study Abroad about ${serviceName}`}
                        className="group/button flex w-full items-center justify-between rounded-2xl bg-darkPrimary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <span>
                            Connect With Us
                        </span>

                        <span
                            aria-hidden="true"
                            className="grid size-9 place-content-center rounded-xl bg-white/15 transition-all duration-300 group-hover/button:rotate-6 group-hover/button:bg-white/25"
                        >
                            <ArrowUpRight className="size-4" />
                        </span>
                    </a>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-secondary via-primary to-darkPrimary transition-all duration-500 group-hover:w-3/4"
            />
        </article>
    );
}

function ServiceFallback() {
    return (
        <div
            className="absolute inset-0 flex items-center justify-center"
        >
            <div
                className="grid size-24 place-content-center rounded-[28px] bg-primary/10 text-primary shadow-inner"
            >
                <HandHelping
                    className="size-12"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}