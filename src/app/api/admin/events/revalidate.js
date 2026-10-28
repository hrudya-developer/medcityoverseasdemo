import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

/*
 * After an event changes: expire the "events" cache tag at once (the
 * site-wide popup reads it), and the event pages.
 */
export function refreshEventPages(...slugs) {
    revalidateTag("events", { expire: 0 });
    revalidatePath("/events");

    for (const slug of new Set(slugs.filter(Boolean))) {
        revalidatePath(`/events/${slug}`);
    }
}
