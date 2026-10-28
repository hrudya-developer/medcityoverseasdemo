import { eventsTablesMissing, listEventsAdmin } from "@/lib/eventsAdmin";

import EventForm from "../../../components/EventForm";
import EventsTablesMissing from "../../../components/EventsTablesMissing";

export const dynamic = "force-dynamic";

async function tablesReady() {
    try {
        await listEventsAdmin();
        return true;
    } catch (error) {
        if (eventsTablesMissing(error)) {
            return false;
        }

        throw error;
    }
}

export default async function NewEventPage() {
    const ready = await tablesReady();

    return (
        <>
            <h1 className="text-2xl font-bold">New event</h1>
            {ready ? (
                <EventForm
                    initial={{
                        durationMinutes: 60,
                        mode: "online",
                        venue: "Online (live webinar)",
                        contactPhone: "+91 90729 82555",
                        registrationOpen: true,
                    }}
                />
            ) : (
                <EventsTablesMissing />
            )}
        </>
    );
}
