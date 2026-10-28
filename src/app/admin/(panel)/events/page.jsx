import Link from "next/link";

import { eventsTablesMissing, listEventsAdmin } from "@/lib/eventsAdmin";

import EventsTablesMissing from "../../components/EventsTablesMissing";

export const dynamic = "force-dynamic";

function Badge({ tone, children }) {
    const tones = {
        green: "bg-green-100 text-green-800",
        amber: "bg-amber-100 text-amber-800",
        slate: "bg-slate-100 text-slate-600",
        blue: "bg-blue-100 text-blue-800",
    };

    return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

async function loadEvents() {
    try {
        return { events: await listEventsAdmin() };
    } catch (error) {
        if (eventsTablesMissing(error)) {
            return { missing: true, events: [] };
        }

        throw error;
    }
}

export default async function AdminEventsPage({ searchParams }) {
    const { saved, deleted } = await searchParams;
    const { events, missing } = await loadEvents();

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Events</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Webinars and events with their registrations, newest date first.
                    </p>
                </div>

                {!missing && (
                    <Link
                        href="/admin/events/new"
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                    >
                        New event
                    </Link>
                )}
            </div>

            {saved && <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Saved.</p>}
            {deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Deleted.</p>}

            {missing ? (
                <EventsTablesMissing />
            ) : (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Date (India time)</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Popup</th>
                                <th className="px-4 py-3 text-right">Registrations</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-slate-500">
                                        No events yet.
                                    </td>
                                </tr>
                            )}

                            {events.map((event) => (
                                <tr key={event.id} className="border-t border-slate-100 align-top">
                                    <td className="px-4 py-3">
                                        <div className="font-semibold">{event.title}</div>
                                        <div className="text-xs text-slate-500">/events/{event.slug}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{event.when}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {event.published ? (
                                                <Badge tone="green">Published</Badge>
                                            ) : (
                                                <Badge tone="amber">Draft</Badge>
                                            )}
                                            {event.ended ? (
                                                <Badge tone="slate">Ended</Badge>
                                            ) : (
                                                !event.registrationOpen && <Badge tone="slate">Registration closed</Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {event.popupEnabled ? <Badge tone="blue">On</Badge> : <Badge tone="slate">Off</Badge>}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold">{event.registrations}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right">
                                        {event.published && (
                                            <a
                                                href={`/events/${event.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mr-4 text-slate-500 hover:text-slate-900"
                                            >
                                                View
                                            </a>
                                        )}
                                        <Link
                                            href={`/admin/events/${event.id}/registrations`}
                                            className="mr-4 font-semibold text-slate-700 hover:text-blue-700"
                                        >
                                            Registrations
                                        </Link>
                                        <Link href={`/admin/events/${event.id}`} className="font-semibold text-blue-700">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
