"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    ChevronDown,
    ChevronUp,
    HandHelping,
    Phone,
} from "lucide-react";

import AddOnServiceCard from "./components/AddOnServiceCard";
import FAQ from "@/components/home/FAQ/FAQ";
import AddOnServicesFAQ from "./components/AddOnServicesFAQ";

const INITIAL_VISIBLE_COUNT = 3;
const LOAD_COUNT = 3;

export default function AddOnServicesClient() {
    const [
        imageBaseUrl,
        setImageBaseUrl,
    ] = useState("");

    const [services, setServices] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [
        visibleCount,
        setVisibleCount,
    ] = useState(
        INITIAL_VISIBLE_COUNT
    );

    useEffect(() => {
        const controller =
            new AbortController();

        const fetchServices =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await fetch(
                            "/api/add-on-services",
                            {
                                method: "GET",
                                signal:
                                    controller.signal,
                                cache: "no-store",
                            }
                        );

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result?.message ||
                            "Unable to load services."
                        );
                    }

                    setImageBaseUrl(
                        result?.imageBaseUrl ||
                        ""
                    );

                    setServices(
                        Array.isArray(
                            result?.services
                        )
                            ? result.services
                            : []
                    );
                } catch (
                requestError
                ) {
                    if (
                        requestError?.name ===
                        "AbortError"
                    ) {
                        return;
                    }

                    console.error(
                        "Services request failed:",
                        requestError
                    );

                    setError(
                        requestError?.message ||
                        "Unable to load services at the moment."
                    );
                } finally {
                    if (
                        !controller.signal
                            .aborted
                    ) {
                        setLoading(false);
                    }
                }
            };

        fetchServices();

        return () =>
            controller.abort();
    }, []);

    useEffect(() => {
        setVisibleCount(
            INITIAL_VISIBLE_COUNT
        );
    }, []);

    const featuredServices =
        useMemo(
            () =>
                services.filter(
                    (service) => {
                        const value =
                            String(
                                service?.home ||
                                service?.featured ||
                                service?.is_featured ||
                                ""
                            ).toLowerCase();

                        return [
                            "yes",
                            "true",
                            "1",
                        ].includes(value);
                    }
                ),
            [services]
        );

    const visibleServices =
        useMemo(
            () =>
                services.slice(
                    0,
                    visibleCount
                ),
            [services, visibleCount]
        );

    const canLoadMore =
        visibleCount < services.length;

    const canShowLess =
        visibleCount >
        INITIAL_VISIBLE_COUNT;

    const getServiceId = (
        service,
        index
    ) =>
        service?.id ||
        service?.service_id ||
        service?.s_id ||
        `service-${index + 1}`;

    const getImageName = (service) =>
        service?.image ||
        service?.service_image ||
        service?.image_name ||
        service?.thumbnail ||
        service?.icon ||
        "";

    const getImageUrl = (service) => {
        const imageName =
            String(
                getImageName(service)
            ).trim();

        if (!imageName) {
            return "";
        }

        if (
            imageName.startsWith(
                "http://"
            ) ||
            imageName.startsWith(
                "https://"
            )
        ) {
            return imageName;
        }

        const baseUrl = String(
            imageBaseUrl
        ).replace(/\/+$/, "");

        const fileName =
            imageName.replace(
                /^\/+/,
                ""
            );

        return baseUrl
            ? `${baseUrl}/${fileName}`
            : "";
    };

    const handleLoadMore = () => {
        setVisibleCount(
            (currentCount) =>
                Math.min(
                    currentCount +
                    LOAD_COUNT,
                    services.length
                )
        );
    };

    const handleShowLess = () => {
        setVisibleCount(
            INITIAL_VISIBLE_COUNT
        );

        document
            .getElementById(
                "all-services-heading"
            )
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <main className="overflow-hidden bg-slate-50">
            <FeaturedServicesSection
                loading={loading}
                error={error}
                services={
                    featuredServices
                }
                getServiceId={
                    getServiceId
                }
                getImageUrl={
                    getImageUrl
                }
            />

            <section
                aria-labelledby="all-services-heading"
                className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-primary/[0.04] px-4 py-16 lg:px-8 lg:py-20"
            >
                <BackgroundDecorations />

                <div
                    className="container relative mx-auto max-w-9xl"
                >
                    <header
                        className="mx-auto mb-12 max-w-3xl text-center"
                    >
                        <p
                            className="text-sm font-bold uppercase tracking-[0.18em] text-primary"
                        >
                            Everything You Need
                        </p>

                        <h2
                            id="all-services-heading"
                            className="mt-3 text-4xl font-extrabold leading-tight text-secondary md:text-5xl"
                        >
                            Complete{" "}
                            <span className="text-primary">
                                Service Portfolio
                            </span>
                        </h2>

                        <p
                            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg"
                        >
                            Discover reliable
                            support for admissions,
                            documentation, finance,
                            accommodation, travel
                            and settling abroad.
                        </p>
                    </header>

                    {loading && (
                        <LoadingState />
                    )}

                    {!loading &&
                        error && (
                            <ErrorState
                                message={
                                    error
                                }
                            />
                        )}

                    {!loading &&
                        !error &&
                        services.length ===
                        0 && (
                            <EmptyState />
                        )}

                    {!loading &&
                        !error &&
                        services.length >
                        0 && (
                            <>
                                <div
                                    id="services-list"
                                    className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    {visibleServices.map(
                                        (
                                            service,
                                            index
                                        ) => {
                                            const serviceId =
                                                getServiceId(
                                                    service,
                                                    index
                                                );

                                            return (
                                                <AddOnServiceCard
                                                    key={
                                                        serviceId
                                                    }
                                                    service={
                                                        service
                                                    }
                                                    imageUrl={getImageUrl(
                                                        service
                                                    )}
                                                    priority={
                                                        index ===
                                                        0
                                                    }
                                                    serviceId={`service-${serviceId}`}
                                                />
                                            );
                                        }
                                    )}
                                </div>

                                <p
                                    className="sr-only"
                                    aria-live="polite"
                                >
                                    Showing{" "}
                                    {
                                        visibleServices.length
                                    }{" "}
                                    of{" "}
                                    {
                                        services.length
                                    }{" "}
                                    services.
                                </p>

                                {(canLoadMore ||
                                    canShowLess) && (
                                        <div
                                            className="mt-12 flex flex-wrap justify-center gap-3"
                                        >
                                            {canLoadMore && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleLoadMore
                                                    }
                                                    aria-controls="services-list"
                                                    className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
                                                >
                                                    View More

                                                    <ChevronDown
                                                        size={
                                                            18
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            )}

                                            {canShowLess && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleShowLess
                                                    }
                                                    aria-controls="services-list"
                                                    className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-primary bg-white px-6 py-3 font-semibold text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white"
                                                >
                                                    Show Less

                                                    <ChevronUp
                                                        size={
                                                            18
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    )}
                            </>
                        )}
                </div>
            </section>

            <ServicesCTA />

            <div
                className="mx-auto max-w-7xl px-4 pb-16 lg:px-8 lg:pb-20"
            >
                <AddOnServicesFAQ />
            </div>
        </main>
    );
}

function FeaturedServicesSection({
    loading,
    error,
    services,
    getServiceId,
    getImageUrl,
}) {
    return (
        <section
            aria-labelledby="featured-services-heading"
            className="relative px-4 py-16 lg:px-8 lg:py-20"
        >
            <BackgroundDecorations />

            <div
                className="container relative mx-auto max-w-7xl"
            >
                <header
                    className="mx-auto mb-12 max-w-3xl text-center"
                >
                    <span
                        aria-hidden="true"
                        className="mx-auto grid size-20 place-content-center rounded-full bg-primary/10 shadow-lg shadow-primary/10"
                    >
                        <HandHelping className="size-11 text-primary" />
                    </span>

                    <p
                        className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-primary"
                    >
                        Complete Student Support
                    </p>

                    <h1
                        id="featured-services-heading"
                        className="mt-3 text-4xl font-extrabold leading-tight text-secondary md:text-5xl"
                    >
                        Study Abroad{" "}
                        <span className="text-primary">
                            Add-On Services
                        </span>
                    </h1>

                    <p
                        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg"
                    >
                        Get expert assistance
                        with admissions, visas,
                        finance, accommodation,
                        travel and every important
                        stage of your overseas
                        education journey.
                    </p>
                </header>

                {!loading &&
                    !error &&
                    services.length > 0 && (
                        <div
                            className="grid justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {services.map(
                                (
                                    service,
                                    index
                                ) => {
                                    const serviceId =
                                        getServiceId(
                                            service,
                                            index
                                        );

                                    return (
                                        <AddOnServiceCard
                                            key={
                                                serviceId
                                            }
                                            service={
                                                service
                                            }
                                            imageUrl={getImageUrl(
                                                service
                                            )}
                                            featured
                                            priority={
                                                index ===
                                                0
                                            }
                                            serviceId={`featured-service-${serviceId}`}
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}

function BackgroundDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 top-10 size-72 rounded-full bg-secondary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 bottom-10 size-72 rounded-full bg-primary/10 blur-3xl"
            />
        </>
    );
}

function LoadingState() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="mx-auto max-w-md rounded-3xl bg-white px-6 py-14 text-center shadow-sm"
        >
            <div
                className="mx-auto size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
            />

            <p
                className="mt-4 font-semibold text-slate-500"
            >
                Loading services...
            </p>
        </div>
    );
}

function ErrorState({ message }) {
    return (
        <div
            role="alert"
            className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center font-semibold text-red-600"
        >
            {message}
        </div>
    );
}

function EmptyState() {
    return (
        <div
            className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-500 shadow-sm"
        >
            No services are currently available.
        </div>
    );
}

function ServicesCTA() {
    return (
        <section
            aria-labelledby="services-cta-heading"
            className="container mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20"
        >
            <div
                className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-secondary via-[#235f96] to-primary px-6 py-12 text-center text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-10"
            >
                <p
                    className="text-sm font-bold uppercase tracking-[0.18em] text-white/80"
                >
                    We Are Here to Help
                </p>

                <h2
                    id="services-cta-heading"
                    className="mt-3 text-3xl font-extrabold sm:text-4xl"
                >
                    Need Help with Any Service?
                </h2>

                <p
                    className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85"
                >
                    Speak with our experienced
                    team for personalised guidance
                    throughout your study abroad
                    journey.
                </p>

                <a
                    href="tel:+918943280333"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50"
                >
                    <Phone
                        size={18}
                        aria-hidden="true"
                    />

                    <span>
                        Call: +91 89432 80333
                    </span>
                </a>
            </div>
        </section>
    );
}