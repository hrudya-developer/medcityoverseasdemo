import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, MapPin, Phone, Video } from "lucide-react";

import EventCountdown from "@/components/events/EventCountdown";
import EventRegistrationForm from "@/components/events/EventRegistrationForm";
import PageSchema from "@/components/seo/PageSchema";
import { sanitizeBlogHtml } from "@/lib/blogHtml";
import {
    eventDateLabel,
    eventDateTimeLabel,
    eventDurationLabel,
    eventEndIso,
    eventTimeLabel,
    telHref,
} from "@/lib/eventFormat";
import { absoluteEventUrl, getEventBySlug } from "@/lib/events";
import { withSeoOverrides } from "@/lib/pageSeo";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seoSchema";

// Read on every request, so closing registration in the admin applies at once.
export const dynamic = "force-dynamic";

const BRAND_SUFFIX = /\s*\|\s*Medcity Overseas\s*$/i;

async function pageGenerateMetadata({ params }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return {
            title: { absolute: "Event not found | Medcity Overseas" },
            robots: { index: false, follow: true },
        };
    }

    const title = `${event.title.replace(BRAND_SUFFIX, "")} | Medcity Overseas`;
    const description = event.summary || event.subtitle || `${event.title} on ${eventDateTimeLabel(event.startsAtIso)}.`;
    const image = event.poster
        ? [{ url: absoluteUrl(event.poster), width: 1080, height: 1440, alt: event.posterAlt }]
        : undefined;

    return {
        title: { absolute: title },
        description,
        alternates: { canonical: event.url },
        openGraph: {
            type: "website",
            locale: "en_IN",
            url: absoluteEventUrl(event),
            siteName: SITE_NAME,
            title,
            description,
            ...(image ? { images: image } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(image ? { images: [image[0].url] } : {}),
        },
    };
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);

function eventNode(event) {
    const url = absoluteEventUrl(event);
    const online = event.mode !== "offline";

    return {
        "@type": "Event",
        "@id": `${url}#event`,
        name: event.title,
        description: event.summary || event.subtitle || event.title,
        url,
        startDate: event.startsAtIso,
        endDate: eventEndIso(event),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: online
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
        location: online
            ? { "@type": "VirtualLocation", url }
            : {
                  "@type": "Place",
                  name: event.venue || SITE_NAME,
                  address: event.venue || "Kerala, India",
              },
        ...(event.poster ? { image: [absoluteUrl(event.poster)] } : {}),
        organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        isAccessibleForFree: true,
        offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "INR",
            url,
            availability: event.registrationOpen && !event.isPast ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        },
        inLanguage: "en-IN",
    };
}

function DetailRow({ icon: Icon, label, children }) {
    return (
        <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
                <dd className="mt-0.5 text-base font-semibold text-slate-900">{children}</dd>
            </div>
        </div>
    );
}

export default async function EventPage({ params }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    // The same event under a differently written address (capitals).
    if (slug !== event.slug) {
        permanentRedirect(event.url);
    }

    const open = event.registrationOpen && !event.isPast;
    const online = event.mode !== "offline";
    const description = sanitizeBlogHtml(event.description);
    const phoneHref = telHref(event.contactPhone);

    return (
        <div className="bg-gradient-to-b from-primary/[0.05] via-white to-white">
            <PageSchema
                path={event.url}
                name={event.title}
                description={event.summary}
                image={event.poster}
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Events", path: "/events" },
                    { name: event.title, path: event.url },
                ]}
                mainEntity={{ "@id": `${absoluteEventUrl(event)}#event` }}
                entities={[eventNode(event)]}
            />

            <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
                <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
                    <ol className="flex flex-wrap items-center gap-1.5">
                        <li>
                            <Link href="/" className="hover:text-primary">Home</Link>
                        </li>
                        <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
                        <li>
                            <Link href="/events" className="hover:text-primary">Events</Link>
                        </li>
                        <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
                        <li className="min-w-0 truncate font-medium text-slate-700" aria-current="page">
                            {event.title}
                        </li>
                    </ol>
                </nav>

                <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
                    {event.poster && (
                        <div className="mx-auto w-full max-w-md lg:max-w-none">
                            <Image
                                src={event.poster}
                                unoptimized={/^https?:/i.test(event.poster)}
                                alt={event.posterAlt}
                                width={1080}
                                height={1440}
                                priority
                                sizes="(min-width: 1024px) 460px, (min-width: 640px) 448px, calc(100vw - 32px)"
                                className="h-auto w-full rounded-3xl shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                            />
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                            {online ? <Video className="size-4" aria-hidden="true" /> : <MapPin className="size-4" aria-hidden="true" />}
                            {event.isPast ? "Past event" : online ? "Online event" : "In person event"}
                        </p>

                        <h1 className="mt-4 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary sm:text-4xl lg:text-[2.6rem]">
                            {event.title}
                        </h1>

                        {event.subtitle && (
                            <p className="mt-3 text-lg leading-8 text-slate-700">{event.subtitle}</p>
                        )}

                        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                            <DetailRow icon={CalendarDays} label="Date and time">
                                <time dateTime={event.startsAtIso}>
                                    {eventDateLabel(event.startsAtIso)}, {eventTimeLabel(event.startsAtIso)}
                                </time>
                            </DetailRow>
                            <DetailRow icon={Clock} label="Duration">
                                {eventDurationLabel(event.durationMinutes)}
                            </DetailRow>
                            <DetailRow icon={online ? Video : MapPin} label={online ? "Mode" : "Venue"}>
                                {event.venue || (online ? "Online" : "To be announced")}
                            </DetailRow>
                            <DetailRow icon={Phone} label="Questions? Call us">
                                <a href={phoneHref} className="text-primary underline-offset-4 hover:underline">
                                    {event.contactPhone}
                                </a>
                            </DetailRow>
                        </dl>

                        {open && <EventCountdown startsAtIso={event.startsAtIso} />}

                        {open && (
                            <a
                                href="#register"
                                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-white shadow-[0_14px_30px_rgba(192,31,83,0.25)] transition hover:bg-darkPrimary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:w-auto"
                            >
                                Register free
                            </a>
                        )}
                    </div>
                </div>

                <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
                    <section aria-labelledby="event-about" className="min-w-0">
                        <h2 id="event-about" className="font-nunito text-2xl font-extrabold text-darkPrimary sm:text-3xl">
                            About this event
                        </h2>
                        {description ? (
                            <div className="blog-body mt-5" dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <p className="mt-5 text-base leading-7 text-slate-700">{event.summary}</p>
                        )}
                    </section>

                    <section
                        id="register"
                        aria-labelledby="event-register"
                        className="scroll-mt-28 self-start rounded-[28px] border border-slate-100 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-7 lg:sticky lg:top-28"
                    >
                        {open ? (
                            <>
                                <h2 id="event-register" className="font-nunito text-2xl font-extrabold text-darkPrimary">
                                    Register for this event
                                </h2>
                                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                                    {eventDateTimeLabel(event.startsAtIso)}
                                </p>
                                <div className="mt-5">
                                    <EventRegistrationForm event={{ slug: event.slug }} source="page" />
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 id="event-register" className="font-nunito text-2xl font-extrabold text-darkPrimary">
                                    Registration is closed
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {event.isPast
                                        ? "This event has ended."
                                        : "Registration for this event is no longer open."}{" "}
                                    For help, contact our team.
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                    <a
                                        href={phoneHref}
                                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-darkPrimary"
                                    >
                                        <Phone className="size-4" aria-hidden="true" />
                                        {event.contactPhone}
                                    </a>
                                    <Link
                                        href="/contact-us"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary px-5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                                    >
                                        Contact us
                                    </Link>
                                </div>
                                <Link href="/events" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                                    See upcoming events
                                </Link>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
