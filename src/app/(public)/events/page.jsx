import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Phone, Video } from "lucide-react";

import PageSchema from "@/components/seo/PageSchema";
import { eventDateTimeLabel, eventShortDateLabel } from "@/lib/eventFormat";
import { absoluteEventUrl, getPublishedEvents } from "@/lib/events";
import { applySeoOverrides } from "@/lib/pageSeo";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, pageUrl } from "@/lib/seoSchema";

// New events and closed registrations show without a redeploy.
export const dynamic = "force-dynamic";

const PAGE_PATH = "/events";
const PAGE_TITLE = "Events and Webinars";
const PAGE_DESCRIPTION =
    "Upcoming events and live webinars by Medcity Overseas for students and nurses planning to study or work abroad. See the dates and register online.";

export async function generateMetadata() {
    return applySeoOverrides({
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        alternates: { canonical: PAGE_PATH },
        openGraph: {
            type: "website",
            locale: "en_IN",
            url: pageUrl(PAGE_PATH),
            siteName: "Medcity Overseas",
            title: `${PAGE_TITLE} | Medcity Overseas`,
            description: PAGE_DESCRIPTION,
        },
        twitter: {
            card: "summary_large_image",
            title: `${PAGE_TITLE} | Medcity Overseas`,
            description: PAGE_DESCRIPTION,
        },
    });
}

function EventCard({ event }) {
    const online = event.mode !== "offline";

    return (
        <li className="flex">
            <article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                <Link href={event.url} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
                    {event.poster && (
                        <Image
                            src={event.poster}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 32px)"
                            className={`object-cover object-top transition duration-500 group-hover:scale-[1.03] ${event.isPast ? "grayscale-[60%]" : ""}`}
                        />
                    )}
                    {event.isPast && (
                        <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            Past event
                        </span>
                    )}
                </Link>

                <div className="flex flex-1 flex-col p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <CalendarDays className="size-4" aria-hidden="true" />
                        <time dateTime={event.startsAtIso}>
                            {event.isPast ? eventShortDateLabel(event.startsAtIso) : eventDateTimeLabel(event.startsAtIso)}
                        </time>
                    </p>

                    <h3 className="mt-2 font-nunito text-xl font-extrabold leading-snug text-darkPrimary">
                        <Link href={event.url} className="hover:text-primary focus:outline-none focus-visible:underline">
                            {event.title}
                        </Link>
                    </h3>

                    {event.subtitle && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{event.subtitle}</p>}

                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                        {online ? <Video className="size-4" aria-hidden="true" /> : <MapPin className="size-4" aria-hidden="true" />}
                        {event.venue || (online ? "Online" : "Venue to be announced")}
                    </p>

                    <div className="mt-auto pt-5">
                        {event.isPast ? (
                            <Link
                                href={event.url}
                                aria-label={`View details: ${event.title}`}
                                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline"
                            >
                                View details
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        ) : (
                            <Link
                                href={event.registrationOpen ? `${event.url}#register` : event.url}
                                aria-label={`${event.registrationOpen ? "Register" : "View details"}: ${event.title}`}
                                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-darkPrimary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                            >
                                {event.registrationOpen ? "Register" : "View details"}
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                </div>
            </article>
        </li>
    );
}

function EventGrid({ events }) {
    return (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.slug} event={event} />
            ))}
        </ul>
    );
}

export default async function EventsPage() {
    const events = await getPublishedEvents();
    const upcoming = events.filter((event) => !event.isPast);
    const past = events.filter((event) => event.isPast);

    const itemList = {
        "@type": "ItemList",
        "@id": `${pageUrl(PAGE_PATH)}#events`,
        name: PAGE_TITLE,
        numberOfItems: events.length,
        itemListElement: events.map((event, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteEventUrl(event),
            name: event.title,
        })),
    };

    return (
        <div className="bg-gradient-to-b from-primary/[0.05] via-white to-white">
            <PageSchema
                path={PAGE_PATH}
                type="CollectionPage"
                name={PAGE_TITLE}
                description={PAGE_DESCRIPTION}
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Events", path: PAGE_PATH },
                ]}
                mainEntity={{ "@id": itemList["@id"] }}
                entities={[itemList]}
            />

            <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
                <header className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Medcity Overseas</p>
                    <h1 className="mt-3 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary sm:text-4xl lg:text-5xl">
                        Events and Webinars
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                        Join our live webinars and events to learn about studying and working abroad, ask our
                        counsellors your questions and plan your next steps. Register online for any upcoming event.
                    </p>
                </header>

                {events.length === 0 ? (
                    <div className="mt-10 rounded-3xl border border-dashed border-primary/30 bg-white p-8 text-center sm:p-12">
                        <CalendarDays className="mx-auto size-10 text-primary" aria-hidden="true" />
                        <h2 className="mt-4 font-nunito text-2xl font-extrabold text-darkPrimary">No events scheduled right now</h2>
                        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
                            New webinars are added here when they are announced. Meanwhile, our team is happy to answer
                            your questions.
                        </p>
                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href={`tel:${CONTACT_PHONE}`}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-darkPrimary"
                            >
                                <Phone className="size-4" aria-hidden="true" />
                                {CONTACT_PHONE_DISPLAY}
                            </a>
                            <Link
                                href="/contact-us"
                                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary px-5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <section aria-labelledby="events-upcoming" className="mt-10">
                            <h2 id="events-upcoming" className="font-nunito text-2xl font-extrabold text-darkPrimary sm:text-3xl">
                                Upcoming events
                            </h2>
                            {upcoming.length ? (
                                <EventGrid events={upcoming} />
                            ) : (
                                <p className="mt-4 text-base text-slate-600">
                                    No upcoming events right now. New webinars are added here when they are announced.
                                </p>
                            )}
                        </section>

                        {past.length > 0 && (
                            <section aria-labelledby="events-past" className="mt-14">
                                <h2 id="events-past" className="font-nunito text-2xl font-extrabold text-darkPrimary sm:text-3xl">
                                    Past events
                                </h2>
                                <EventGrid events={past} />
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
