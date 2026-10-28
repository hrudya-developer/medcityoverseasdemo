import Link from "next/link";
import { notFound } from "next/navigation";

import { eventsTablesMissing, formatEventTime, getEventAdmin, listRegistrations } from "@/lib/eventsAdmin";

import EventsTablesMissing from "../../../../components/EventsTablesMissing";

export const dynamic = "force-dynamic";

const SOURCES = { page: "Event page", popup: "Popup" };

async function load(id) {
    try {
        const event = await getEventAdmin(id);

        return { event, rows: event ? await listRegistrations(event.id) : [] };
    } catch (error) {
        if (eventsTablesMissing(error)) {
            return { missing: true, rows: [] };
        }

        throw error;
    }
}

export default async function EventRegistrationsPage({ params }) {
    const { id } = await params;
    const { event, rows, missing } = await load(id);

    if (missing) {
        return (
            <>
                <h1 className="text-2xl font-bold">Registrations</h1>
                <EventsTablesMissing />
            </>
        );
    }

    if (!event) {
        notFound();
    }

    return (
        <>
            <Link href="/admin/events" className="text-sm text-slate-500 hover:text-slate-900">
                All events
            </Link>

            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Registrations</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold">{event.title}</span>, {formatEventTime(event.startsAt)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        {rows.length === 1 ? "1 registration" : `${rows.length} registrations`}, newest first.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Link
                        href={`/admin/events/${event.id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
                    >
                        Edit event
                    </Link>
                    <a
                        href={`/api/admin/events/${event.id}/registrations`}
                        download
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Download CSV
                    </a>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Qualification</th>
                            <th className="px-4 py-3">City</th>
                            <th className="px-4 py-3">Source</th>
                            <th className="px-4 py-3">Registered</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-slate-500">
                                    No registrations yet.
                                </td>
                            </tr>
                        )}

                        {rows.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 align-top">
                                <td className="px-4 py-3 font-semibold">{row.name}</td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`} className="text-blue-700 hover:underline">
                                        {row.phone}
                                    </a>
                                </td>
                                <td className="px-4 py-3 text-slate-600">{row.email}</td>
                                <td className="px-4 py-3">{row.qualification}</td>
                                <td className="px-4 py-3">{row.city}</td>
                                <td className="px-4 py-3">{SOURCES[row.source] ?? row.source}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.when}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
