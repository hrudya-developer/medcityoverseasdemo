import Link from "next/link";
import { notFound } from "next/navigation";

import { eventsTablesMissing, getEventAdmin } from "@/lib/eventsAdmin";

import EventForm from "../../../components/EventForm";
import EventsTablesMissing from "../../../components/EventsTablesMissing";

export const dynamic = "force-dynamic";

async function loadEvent(id) {
    try {
        return { event: await getEventAdmin(id) };
    } catch (error) {
        if (eventsTablesMissing(error)) {
            return { missing: true };
        }

        throw error;
    }
}

export default async function EditEventPage({ params }) {
    const { id } = await params;
    const { event, missing } = await loadEvent(id);

    if (missing) {
        return (
            <>
                <h1 className="text-2xl font-bold">Edit event</h1>
                <EventsTablesMissing />
            </>
        );
    }

    if (!event) {
        notFound();
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Edit event</h1>
                <Link
                    href={`/admin/events/${event.id}/registrations`}
                    className="text-sm font-semibold text-blue-700"
                >
                    Registrations
                </Link>
            </div>
            <EventForm id={event.id} initial={event} />
        </>
    );
}
